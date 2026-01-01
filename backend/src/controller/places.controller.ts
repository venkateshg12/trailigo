import { BAD_REQUEST, OK, UNAUTHORIZED } from "../constants/http";
import { searchPlaces } from "../services/googlePlaces";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";

export const placesInfo = catchError(async (req, res) => {
    const { placeName } = req.body;
  appAssert(placeName, BAD_REQUEST, "Place name is required");

    const data = await searchPlaces(placeName);
    return res.status(OK).json({ data });
})