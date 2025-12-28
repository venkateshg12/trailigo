import axios from "axios";
import { GOOGLE_PLACE_API_KEY } from "../constants/env";

const BASE_URL =
    "https://places.googleapis.com/v1/places:searchText";

export const searchPlaces = async (placeName: string) => {
    const response = await axios.post(
        BASE_URL,
        {
            textQuery: placeName,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_PLACE_API_KEY,
                "X-Goog-FieldMask": [
                    'places.id',
                   'Places.photos',
                    'places.displayName',
                    'places.formattedAddress',
                    'places.priceLevel'
                ].join(","),
            },
        }
    );

    return response.data;
}