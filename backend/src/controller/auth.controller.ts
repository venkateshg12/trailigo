import { createAccount } from "../services/auth.services";
import catchError from "../utils/catchError"
import { registerSchema } from "./auth.schema"


export const registerHandler = catchError(async(req, res) =>{
    // validate request 
    const request  = registerSchema.parse({
        ...req.body,
        userAgent : req.headers["user-agent"],
    })

    // call service 

    const {user, refreshToken, accessToken} = await createAccount(request);

})