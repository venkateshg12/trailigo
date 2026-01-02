import { UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    appAssert(token, UNAUTHORIZED, "Unauthorized User");
    const result = verifyToken(token);
    if (!("payload" in result)) {
        return res.status(401).json({ error: "Invalid token" });
    }
    req.user = result.payload;
    next();
};
