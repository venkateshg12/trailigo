import { CONFLICT } from "../constants/http"
import verificationCodeTypes from "../constants/verificationCodeTypes"
import sessionModel from "../models/session.model"
import userModel from "../models/user.model"
import verificationCodeModel from "../models/verification.model"
import appAssert from "../utils/appAssert"
import { tenMinutesFromNow } from "../utils/date"
import { refreshTokenSignOptions, signToken } from "../utils/jwt"
import { otp } from "../utils/otp"
import { sendVerificationEmail } from "../utils/sendVerificationEmail"

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
        email : user.email,
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
    const refreshToken = signToken({sessionId: session._id}, refreshTokenSignOptions)
    const accessToken = signToken({ userId: user._id, sessionId: session._id  });
    // return user & tokens
    return {
        user: user.omitPassword(),
        refreshToken,
        accessToken,
    };
}