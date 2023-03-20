import { jwtSecret } from "../config"
import { jwtExpiry } from "../config"

var jwt = require('jsonwebtoken')

export const jwtSign =async (userId: number, name:string, email: string) => {
    // let token = jwt.sign({user_id: userId, name: name, email: email}, 
    //     jwtSecret,
    //     { expiresIn: jwtExpiry }
    // )

    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 1),
        data: {user_id: userId, name: name, email: email}
      }, jwtSecret);

    return token
}

export const jwtVerify =async (token: string) => {
    let decodeToken = jwt.verify(token, jwtSecret)
    return decodeToken;
}