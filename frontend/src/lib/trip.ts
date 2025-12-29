import API from "@/config/appClient"

type saveTripPayload = {
    tripId: string,
    trip_plan: any
}

export const saveTrip = async ({ tripId, trip_plan }: saveTripPayload) => {
    const response = await API.post("/trip/save", { tripId, trip_plan });
    return response.data;
}

export const getGoogleInfo = async () => {
    
}