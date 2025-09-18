import passport, { Profile } from "passport"
import { CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constants/env";
import { VerifyCallback } from "passport-google-oauth20";

var GoogleStrategy = require('passport-google-oauth20').Strategy;

export const googleAuth = () => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
    },
        function (accessToken: String, refreshToken: String | undefined, profile: Profile, cb: VerifyCallback) {
            return cb(null, profile);
        }
    ));
}

export const loginAuth = () => {
    passport.authenticate(
        'google',
        { scope: ['profile', 'email'] }
    );
}

export const callbackAuth = () => {
    passport.authenticate('google',
        {
            failureRedirect: "/",
            successRedirect: "/create-trip"
        }
    )
}