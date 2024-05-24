"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const http_status_1 = __importDefault(require("http-status"));
const env_1 = require("../env");
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const globalErrorHandler = (error, _, res, __) => {
    console.log(`Error: `, { error });
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR, message = "Internal server error", errors = undefined;
    if (error instanceof zod_1.ZodError) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = "Validation error";
        errors = error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
        }));
        console.log(error.errors, error.stack);
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errors,
        stack: env_1.env.nodeEnv !== "development" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
