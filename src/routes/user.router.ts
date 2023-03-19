import * as express from "express"
import { check, validationResult } from "express-validator";
import { UserController } from "../controller/UserController";

const router = express.Router();

router.get('/', async (req, res, next) => {
    const userController = new UserController()
    const response = await userController.all(req, res, next)

    return res.send({
        code: 200, 
        msg: "All users Data",
        error: [],
        data: response
    })
});

router.post('/save', 
    check('firstName').exists().withMessage("First name is mandatory"),
    async (req, res, next) => {
        try {

            // validate request
            validationResult(req).throw()

            const userController = new UserController()
            const response = await userController.signUp(req, res, next)
    
            return res.send({
                code: 200, 
                msg: "All users Data",
                error: [],
                data: response
            })
        } catch (err) {
            return res.status(400).json(err)
        }
    }
);

export default router;