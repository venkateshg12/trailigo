import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    _v?: number, // __v is a version key that Mongoose adds automatically to each document.
    name: string,
    email: string,
    password?: string,
    verified: boolean,
    googleId?: string,
    avatar?: string,
    authProvider ? : 'email' | 'google',
    createdAt: Date,
    updatedAt: Date,
    comparePassword(val: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "name" | "email" | "password" | "verified" | "createdAt" | "updatedAt" | "_v" | "googleId" | "authProvider" | "avatar">;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { 
            type: String, 
            required: function(this: UserDocument) {
                return this.authProvider === 'email'
            }
         },
         avatar : {type: String, default : null},
        verified: { type: Boolean, required: true, default: false },
        googleId: {
            type : String,
            sparse : true, // Allow null values but create unique index for non-null values
            unique : true
        },
        authProvider : {
            type : String,
            enum : ['email', 'google'],
            required : true,
            default : 'email'
        }
    },
    {
        timestamps: true,
    }
);

// .pre is a mongoose middleware hook which runs before the document will be saved into mongoDB

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || this.authProvider === 'google') {
        return next(); // Skip hashing if password wasn't changed.
    }
    if(this.password){
        this.password = await hashValue(this.password);
    }
    next(); // I am done, continue saving.
})

userSchema.methods.comparePassword = async function (val: string) {
    if(!this.password) return false;
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