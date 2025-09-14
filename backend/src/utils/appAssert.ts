import assert from "node:assert"
import { HttpStatusCode } from "../constants/http"
import AppError from "./appError";

/*
assert is a built-in Node.js module used for runtime assertions.
Its purpose: verify that something is true during code execution.

*/
type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
) => asserts condition

const appAssert: AppAssert = (
    condition,
    httpStatusCode,
    message
) => assert(condition, new AppError(httpStatusCode, message));

export default appAssert;