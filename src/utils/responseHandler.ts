import { Response } from "express";

interface ObjectResponse {
    success: boolean,
    msg: string,
    data: []
}

export class ResponseUtil {
    static sendResponse<T>(
        res: ResponseUtil,
        message: string,
        data: T,
        statusCode = 200
    ): Response<T> {
        return res.status(statusCode).send({
            success: true,
            code: statusCode,
            message,
            data,
        });
    }

    static sendError(
        res: Response,
        message: string,
        statusCode = 500,
        errors: any = null
    ): Response {
        return res.status(statusCode).send({
            success: false,
            code: statusCode,
            message,
            errors,
        });
    }
}