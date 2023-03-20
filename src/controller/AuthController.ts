import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/user.repository";
import * as bcrypt from 'bcrypt';
import { jwtSign } from "../helper/jwt";

interface ObjectResponse {
    success: boolean,
    code: number,
    msg: string,
    data: object
}

let resp: ObjectResponse = {
    success: false,
    code: 500,
    msg: "Something went wrong!",
    data: []
}

export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const userRepo = new UserRepository
        let user = await userRepo.validate( req )

        if (!user) {
            resp.code = 404
            resp.msg = "User not found!"
            return resp
        }

        const { password } = req.body
        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            resp.code = 403
            resp.msg = "Username or password is wrong!"
            return resp
        }

        let token = await jwtSign(user.id, user.fullName, user.email)
        delete user.password
        user["sessionId"] = token

        var result = []
        result.push( user )

        resp.code = 200
        resp.success = true
        resp.msg = "Details Users"
        resp.data = result

        return resp
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepo = new UserRepository
            let user = await userRepo.save( req )

            delete user.password
            var array = []
            array.push( user )

            resp.code = 200
            resp.success = true
            resp.msg = "Details Users"
            resp.data = user

            return resp
        } catch (err) {
            return resp.msg = err
        }
    }


}