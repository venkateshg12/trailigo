import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL } from '../constants/env';
import userModel, { UserDocument } from '../models/user.model';
import { Request } from 'express';

interface GoogleProfile extends Profile {
  emails: Array<{ value: string; verified: boolean }>;
  photos: Array<{ value: string }>;
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL!,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email found from Google profile."));

        let user = await userModel.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = profile.id;
                user.verified = true;
                await user.save();
            }
        } else {
            user = await userModel.create({
                name: profile.displayName,
                email: email,
                googleId: profile.id,
                verified: true,
                authProvider: 'google',
            });
        }
        return done(null, user);
    } catch (error) {
        return done(error as Error);
    }
}));

export default passport;