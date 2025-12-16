import jwt from "jsonwebtoken";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import sessionModel from "../models/session.model";
import { createAccount, loginUser, refreshUserAccessToken } from "../services/auth.services";
import { verifyOTP } from "../services/verifyOtp.services";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError"
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../utils/cookies";
import { refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "./auth.schema"
import userModel from "../models/user.model";
import AppError from "../utils/appError";
import mongoose from "mongoose";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { APP_ORIGIN } from "../constants/env";


export const registerHandler = catchError(async (req, res) => {
    // validate request 
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    })

    // call service 
    const { user, refreshToken, accessToken } = await createAccount(request);

    // return response 
    setAuthCookies({ res, accessToken, refreshToken });
    return res.status(CREATED).json({
        user
    });

})

export const verifyEmail = catchError(async (req, res) => {
    const { userId, code } = req.body;
    const result = await verifyOTP({ userId, code });
    return res.status(OK).json(result);
})

export const loginHandler = catchError(async (req, res) => {
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    })
    const { accessToken, refreshToken } = await loginUser(request);
    setAuthCookies({ res, accessToken, refreshToken })
    return res.status(OK).json({ message: "Login successfull" })
})

export const logoutHandler = catchError(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);
    const result = verifyToken(accessToken || " ");
    if ("payload" in result) {
        const payload = result.payload as any;
        await sessionModel.findByIdAndDelete(payload.sessionId);
    }
    clearAuthCookies(res);
    return res.status(OK).json({
        message: "Logout Successful",
    })
})

export const refreshHandler = catchError(async (req, res) => {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
    }
    return res.status(OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({
        message: "Acces token refreshed",
    })
})

export const getUserInfo = catchError(async (req, res) => {
    const token = req.cookies.accessToken as string | undefined
    appAssert(token, UNAUTHORIZED, "Unauthorized User");
    // verify token
    const result = verifyToken(token || " ");
    if ("payload" in result) {
        const payload = result.payload as any;
        console.log(payload.userId);
        const user = await userModel.findById(payload.userId).select('-password');
        console.log(user);
        //  appAssert(!user, NOT_FOUND, "User not found")
        const userData = {
            id: user!._id,
            email: user!.email,
            name: user!.name,
            verified: user!.verified
        };
        return res.status(OK).json(userData);
    }
})

export const googleAuthInitiate = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { session: false }, async (err: any, user: any) => {
        if (err || !user) {
            return res.redirect(`${APP_ORIGIN}/login?error=oauth_failed`);
        }
        try {
            const session = await sessionModel.create({
                userId: user._id,
                userAgent: req.headers['user-agent'],
            })
            // sign access token && refresh token
            const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions)
            const accessToken = signToken({ userId: user._id, sessionId: session._id });

            setAuthCookies({ res, accessToken, refreshToken });
            return res.redirect(`${APP_ORIGIN}/home`);
        } catch (error) {
            return res.redirect(`${APP_ORIGIN}/?error=session_failed`);
        }
    })(req, res, next);
};