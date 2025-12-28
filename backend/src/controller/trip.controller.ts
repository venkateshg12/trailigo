import { BAD_REQUEST, OK, UNAUTHORIZED } from "../constants/http";
import tripModel from "../models/trip.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";
import { verifyToken } from "../utils/jwt";

export const saveTripPlan = catchError(async (req, res) => {
    const token = req.cookies.accessToken as string | undefined;
    appAssert(token, UNAUTHORIZED, "Unauthorized User");

    const result = verifyToken(token || " ");

    if (!("payload" in result)) {
        return res.status(UNAUTHORIZED).json({ error: "Invalid token" });
    }

    const payload = result.payload as any;
    const userId = payload.userId;
    const { tripId, trip_plan } = req.body;
    appAssert(tripId, BAD_REQUEST, "tripId is required");
    appAssert(trip_plan, BAD_REQUEST, "trip_plan is required");
    const trip = await tripModel.create({ user: userId, tripId, tripPlan: trip_plan });
    return res.status(OK).json({ message: "trip saved successfully" });
});