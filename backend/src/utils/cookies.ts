import { Response } from "express";
import { CookieOptions } from "express";
import { NODE_ENV } from "../constants/env"
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATHS = "/auth/refresh";
const secure = NODE_ENV !== "development"
const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure: true,
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow(),
})

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATHS,
})

type Params = {
    res: Response,
    accessToken: string,
    refreshToken: string,

}
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
    // res.cookie(...) → tells Express to send a Set-Cookie header in the HTTP response.
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
    res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
}

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken").clearCookie("refreshToken", {
        path: REFRESH_PATHS,
    });
}