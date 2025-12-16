import { NextFunction, Request, Response } from "express";

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const catchError = (controller: AsyncController): AsyncController =>
    async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            /* 
            whenever error occurs the next function directly jumps to the errorHandler function which we written for error handler
            this is the feature of express middleware and any function with having 4 parameters(error, req, res, next) is a error handling function
            */
            next(error)
        }
    }
export default catchError;