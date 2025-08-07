//  npm install jsonwebtoken  
// npm install --save-dev @types/jsonwebtoken

import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_REFRESH_KEY, JWT_SECRET_KEY } from "../constants/env"
import Audience from "./audience";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";


export type RefreshTokenPayload = {
    sessionId: SessionDocument["_id"];
}

export type AccessTokenPayload = {
    userId: UserDocument["_id"];
    sessionId: SessionDocument["_id"];
}

type SignOptionsAndSecret = SignOptions & {
    secret: string;
}
const accessTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: "15m",
    secret: JWT_SECRET_KEY,
}

const defaults: SignOptions = {
    audience: [Audience.User]
}

export const refreshTokenSignOptions: SignOptionsAndSecret = {
    expiresIn: "15m",
    secret: JWT_REFRESH_KEY,
}
export const signToken = (
    payload : AccessTokenPayload | RefreshTokenPayload,
    options ? : SignOptionsAndSecret,
) =>{
    const {secret, ...signOpts} = options || accessTokenSignOptions
    return jwt.sign(payload, secret, {...defaults, ...signOpts})
}