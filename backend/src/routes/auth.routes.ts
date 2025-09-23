import { Router } from "express";
import { getUserInfo, googleAuthCallback, googleAuthInitiate, loginHandler, logoutHandler, refreshHandler, registerHandler, verifyEmail } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/verify-email", verifyEmail);
authRoutes.post("/login", loginHandler);
authRoutes.post("/logout", logoutHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/user", getUserInfo);
authRoutes.get("/google", googleAuthInitiate);
authRoutes.get("/google/callback", googleAuthCallback);


export default authRoutes;