import { jwtSecret } from "../config"
var jwt = require('jsonwebtoken')

export const jwtSign =async (userId: number, name:string, email: string) => {
    let token = jwt.sign({user_id: userId, name: name, email: email}, 
        jwtSecret,
        { expiresIn: '1h' }
    )

    return token
}

export const jwtVerify =async (token: string) => {
    let decodeToken = jwt.verify(jwtSecret, token)

    return decodeToken;
}