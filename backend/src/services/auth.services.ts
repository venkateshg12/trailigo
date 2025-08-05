import { CONFLICT } from "../constants/http"
import userModel from "../models/user.model"
import appAssert from "../utils/appAssert"

type createAccountParams = {
    name : string,
    email : string,
    password : string,
    userAgent ?: string,
}

export const createAccount = async (data : createAccountParams) =>{

    // verifying existing user doesn't exist
    const existingUser = await userModel.exists({
        email : data.email,
    })
    appAssert(!existingUser , CONFLICT, "Email is already in use");

    // create user
    const user = await userModel.create({
        name : data.name,
        email : data.email,
        password : data.password,
    })

}