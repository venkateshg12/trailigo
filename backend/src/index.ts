import express from "express";
import cors from "cors" // npm install --save-dev @types/cors
import cookieParser from "cookie-parser" // npm install --save-dev @types/cookie-parser
import "dotenv/config";
import { APP_ORIGIN } from "./constants/env";
import { OK } from "./constants/http";
import catchError from "./utils/catchError";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./utils/errorHandler";
import connectToMongoDB from "./config/db";
import mongoose from "mongoose";
const app = express();

// allows express server to parse json request bodies.
app.use(express.json());

//  built-in middleware in Express that parses incoming form data and makes it available under req.body.
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    // allow only requests from this frontend orign
    origin: APP_ORIGIN,

    // Allow the frontend to send cookies, authorization headers, or any credentials when making a request.
    credentials: true,
}))


// which lets your backend read cookies sent by the client (like the browser).
app.use(cookieParser());

app.get("/", catchError(
    async (req, res, next) => {
        res.status(OK).json({
            status : "healthy"
        })
    }
))
// .use() is a method in express that actually registers the middleware and connects the routes together.
app.use("/auth", authRoutes);

app.use(errorHandler)


app.listen(3000, async() =>{
    console.log('Server is running on port 3000');  
    await connectToMongoDB();
});
