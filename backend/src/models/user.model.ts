import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    _v?: number,
    name: string,
    email: string,
    password: string,
    verified: boolean,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(val: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "name" | "email" | "password" | "verified" | "createdAt" | "updatedAt" | "_v">;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        verified: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
    }
);

// .pre is a mongoose middleware hook which runs before the document will be saved into mongoDB

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { 
        return next(); // Skip hashing if password wasn't changed.
    }
    this.password = await hashValue(this.password);
    next(); // I am done continue saving.
})

userSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password);
}

userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

// mongoose.model() is a function provided by Mongoose to create a model based on a schema.
// A model in Mongoose is the main way you interact with a MongoDB collection

const userModel = mongoose.model<UserDocument>("users", userSchema);
export default userModel;