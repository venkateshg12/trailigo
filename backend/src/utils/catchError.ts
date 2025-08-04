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
            next(error)
        }
    }
export default catchError;



// mongodb+srv://gvenkatesh7779:venkateshg@77797779@cluster0.bmeb2fd.mongodb.net/