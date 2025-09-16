import { Router } from "express";
import { authMiddleWare, loginHandler, logoutHandler, registerHandler, verifyEmail } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/verify-email", verifyEmail);
authRoutes.post("/login", loginHandler);
authRoutes.post("/logout", logoutHandler);
authRoutes.get("/user", authMiddleWare);


export default authRoutes;