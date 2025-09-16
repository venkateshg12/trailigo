import jwt from "jsonwebtoken";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import sessionModel from "../models/session.model";
import { createAccount, loginUser } from "../services/auth.services";
import { verifyOTP } from "../services/verifyOtp.services";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError"
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "./auth.schema"
import userModel from "../models/user.model";
import AppError from "../utils/appError";
import mongoose from "mongoose";


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

export const authMiddleWare = catchError(async (req, res) => {
    const token = req.cookies.accessToken;
    console.log("token: ", token);
    // appAssert(!token, UNAUTHORIZED, "Unauthorized User");
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