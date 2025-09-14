import { Router } from "express";
import { registerHandler, verifyEmail } from "../controller/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/verify-email", verifyEmail);


export default authRoutes;