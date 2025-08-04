import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import AppError from "./appError";

const handleAppError = (res: Response, error: AppError) => {

    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    })
}
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}, ERROR:`, error);

    if (error instanceof AppError) {
        handleAppError(res, error);
        return;
    }
    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
}

export default errorHandler;