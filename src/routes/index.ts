import * as express from "express"
import { body, check, validationResult, CustomValidator } from "express-validator";
import { AuthController } from "../controller/AuthController";
import { findUserByEmail } from "../services/user.service";
import UserRouter from "./user.router"
const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.send({
        success: true,
        msg: "Welcome to Cosmic Mobile API v1.0-beta"
    })
});

// This allows you to reuse the validator
const isValidUser: CustomValidator = value => {
    return findUserByEmail(value).then(user => {
        if (user) {
        return Promise.reject('E-mail already in use');
        }
    });
};

router.post('/sign-up',
    check('email', "Email name is mandatory").not().isEmpty(),
    body('email').custom(isValidUser),
    async (req, res, next) => {
        try {
            validationResult(req).throw()
            
            const userController = new AuthController()
            const response = await userController.signup(req, res, next)

            return res.status(response["code"]).send({
                code: response["code"], 
                success: response["success"],
                msg: response["msg"],
                errors: [],
                data: response["data"]
            })

        } catch (err) {
            return res.status(403).json({
                code: 403,
                success: false,
                errors: err['errors'],
                data: []
            })
        }
    }
);

router.post('/sign-in',
    check('email', "Email name is mandatory").not().isEmpty(),
    check('password', "Email name is mandatory").not().isEmpty(),
    async (req, res, next) => {
        try {
            validationResult(req).throw()

            const userController = new AuthController()
            const response = await userController.login(req, res, next)

            return res.status(response["code"]).send({
                code: response["code"], 
                success: response["success"],
                msg: response["msg"],
                errors: [],
                data: response["data"]
            })
        } catch (err) {
            return res.status(500).json({
                code: 500,
                success: false,
                errors: err['errors'],
                data: []
            })
        }

    }
);

router.post('/request/otp',
    check('phone', "phone number is mandatory").not().isEmpty(),
    async (req, res, next) => {
        try {
            validationResult(req).throw()
            
            const authController = new AuthController()
            const response = await authController.requestOtp(req, res, next)

            return res.status(response["code"]).send({
                code: response["code"], 
                success: response["success"],
                msg: response["msg"],
                errors: [],
                data: response["data"]
            })

        } catch (err) {
            return res.status(403).json({
                code: 403,
                success: false,
                errors: err['errors'],
                data: []
            })
        }
    }
);

router.post('/validate/otp',
    check('otp_code', "OTP Code is mandatory").not().isEmpty(),
    check('phone', "Phone number is mandatory").not().isEmpty(),
    async (req, res, next) => {
        try {
            validationResult(req).throw()
            
            const authController = new AuthController()
            const response = await authController.validateOTP(req, res, next)

            return res.status(response["code"]).send({
                code: response["code"], 
                success: response["success"],
                msg: response["msg"],
                errors: [],
                data: response["data"]
            })

        } catch (err) {
            return res.status(403).json({
                code: 403,
                success: false,
                errors: err['errors'],
                data: []
            })
        }
    }
);

router.use("/users", UserRouter)

export default router;
