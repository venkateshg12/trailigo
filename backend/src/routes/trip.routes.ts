import { Router } from "express";
import { saveTripPlan } from "../controller/trip.controller";

const tripRoutes = Router();

tripRoutes.post("/save", saveTripPlan);
export default tripRoutes;