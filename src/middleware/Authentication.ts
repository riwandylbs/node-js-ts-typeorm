import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../helper/jwt";


export const authentication = async (req: Request, res: Response, next: NextFunction) => {

    // Exclude this endpoint authenticate by middleware
    // const nonSecureEndpoint = ['/', '/sign-in', '/sign-up'];
    const nonSecureEndpoint = ['/'];
    if (nonSecureEndpoint.includes(req.path)) return next()

    // Check the request has an mandatory api-key
    if(!req.header("API-KEY")) {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid client", data: []});
    }
    
    // Authenticate the api-key
    let apiKey = req.header("API-KEY")
    if (apiKey != "12345") {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid client", data:[] });
    }

    const nonSecureEndPointWithJWT = ['/'];
    if (nonSecureEndPointWithJWT.includes(req.path)) return next()

    // Authenticate JWT value
    if (!req.headers.authorization) {
        return res.status(400)
            .json({code: 400, success: false, error: "Invalid header authentication", data:[] });
    }

    let bearer = req.headers.authorization.split(' ')[1]
    const verifyToken = jwtVerify(bearer)
    console.log( verifyToken )

    next()
}