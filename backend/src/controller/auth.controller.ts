import { CREATED, OK } from "../constants/http";
import sessionModel from "../models/session.model";
import { createAccount } from "../services/auth.services";
import { verifyOTP } from "../services/verifyOtp.services";
import catchError from "../utils/catchError"
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import { loginSchema, registerSchema } from "./auth.schema"


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
    return res.status(200).json(result);
})

export const loginHandler = catchError(async(req, res) =>{
    const request = loginSchema.parse({
        ...req.body,
        userAgent : req.headers["user-agent"],
    })
})

export const logoutHandler = catchError(async (req, res) => {
    const accessToken = req.cookies.accessToken;
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