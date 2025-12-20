import { Router } from "express";
import { processUserData } from "../controller/openai.controller";


const openaiRoutes = Router();

openaiRoutes.post("/", processUserData)

export default openaiRoutes;