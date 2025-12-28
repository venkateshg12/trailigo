import mongoose from "mongoose";
import { string } from "zod";


export interface TripDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    _v?: number
    user: mongoose.Types.ObjectId;
    tripId: string,
    tripPlan: Record<string, any>,
    createdAt: Date,
    updatedAt: Date,
}

const tripSchema = new mongoose.Schema<TripDocument>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        tripId: {
            type: String,
            required: true,
        },
        tripPlan: {
            type: Object,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const tripModel = mongoose.model<TripDocument>("trips", tripSchema);
export default tripModel;
