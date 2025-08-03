import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

const errorHandler : ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}, ERROR:`, error);

    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
}

export default errorHandler;