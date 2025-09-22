import { Request, Response } from "express"
import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from "../constants/http"
import verificationCodeTypes from "../constants/verificationCodeTypes"
import sessionModel from "../models/session.model"
import userModel from "../models/user.model"
import verificationCodeModel from "../models/verification.model"
import appAssert from "../utils/appAssert"
import { ONE_DAY_MS, tenMinutesFromNow, thirtyDaysFromNow } from "../utils/date"
import { RefreshTokenPayload, refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt"
import { otp } from "../utils/otp"
import { sendVerificationEmail } from "../utils/sendVerificationEmail"
import jwt  from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../constants/env"

type createAccountParams = {
    name: string,
    email: string,
    password: string,
    userAgent?: string,
}

export const createAccount = async (data: createAccountParams) => {

    // verifying existing user doesn't exist
    const existingUser = await userModel.exists({
        email: data.email,
    })
    appAssert(!existingUser, CONFLICT, "Email is already in use");

    // create user
    const user = await userModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
    })

    // send verification code +
    const verificationCode = await verificationCodeModel.create({
        userId: user._id,
        email: user.email,
        code: otp,
        type: verificationCodeTypes.EmailVerification,
        expiresAt: tenMinutesFromNow(),
    })

    try {
        await sendVerificationEmail(user.email, otp);
    } catch (error) {
        appAssert(false, 500, "Failed to send OTP email");
    }



    // create sesssions 
    const session = await sessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    })

    // sign access token && refresh token
    const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions)
    const accessToken = signToken({ userId: user._id, sessionId: session._id });
    // return user & tokens
    return {
        user: user.omitPassword(),
        refreshToken,
        accessToken,
    };
}

type LoginParams = {
    email: string,
    password: string,
    userAgent?: string,
}

export const loginUser = async ({ email, password, userAgent }: LoginParams) => {
    // check the email is valid or invaild
    const user = await userModel.findOne({ email });
    appAssert(user, UNAUTHORIZED, "Invalid email or password");

    // validate password from the request
    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

    const session = await sessionModel.create({
        userId: user._id,
        userAgent,
    });

    const sessionInfo = { sessionId: session._id, }
    //sign accessToken & refreshToken

    const accessToken = signToken({
        userId: user._id,
        ...sessionInfo,
    })
    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)

    // return user & Tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    }
}

export const refreshUserAccessToken = async (refreshToken: string) => {

    const payload = verifyToken<RefreshTokenPayload>(refreshToken, {secret: refreshTokenSignOptions.secret}) 
    console.log(payload);
    appAssert(payload, UNAUTHORIZED, "Invalid refresh Token");

    const session = await sessionModel.findById(payload?.sessionId);
    const now = Date.now();
    appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, "Session Expired");

    // refresh sessions if it expires it in 24 hours.
    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

    if (sessionNeedsRefresh) {
        session.expiresAt = thirtyDaysFromNow();
        await session.save();
    }

    const newRefreshToken = sessionNeedsRefresh ? signToken({
        sessionId: session._id,
    },
        refreshTokenSignOptions
    ) : undefined;

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id,
    })

    return {
        accessToken,
        newRefreshToken,
    }
}