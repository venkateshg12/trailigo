import mongoose from "mongoose"
import { date, string } from "zod"
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId : {
        ref : "users",
        type : mongoose.Schema.Types.ObjectId,
        index : true,
    },
    userAgent : {type : String},
    createdAt : {type : Date, required : true, default : Date.now},
    expiresAt : {type : Date, default : thirtyDaysFromNow, index : {expires : 0}},
})

const sessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default sessionModel;