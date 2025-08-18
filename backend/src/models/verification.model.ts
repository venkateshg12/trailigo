import mongoose from "mongoose";
import verificationCodeTypes from "../constants/verificationCodeTypes";
import { tenMinutesFromNow } from "../utils/date";

/* interface inherits from Mongoose's built-in Document type. mongoose.Document adds default fields and methods like:
_id (document ID createdAt, updatedAt (if timestamps are used) methods like .save(), .remove(),*/

export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    code : string,
    type: verificationCodeTypes;
    createdAt: Date;
    expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    code : {type : String, required : true},
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true, default : tenMinutesFromNow, index:{expires : 0} },
})

const verificationCodeModel = mongoose.model<VerificationCodeDocument>(
    "VerificaionCode",
    verificationCodeSchema,
    "verification_codes"
)
export default verificationCodeModel;