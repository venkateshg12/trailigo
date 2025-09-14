import { CREATED } from "../constants/http";
import { createAccount } from "../services/auth.services";
import { verifyOTP } from "../services/verifyOtp.services";
import catchError from "../utils/catchError"
import { setAuthCookies } from "../utils/cookies";
import { registerSchema } from "./auth.schema"


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