import * as express from "express"
import UserRouter from "./user.router"
const router = express.Router();

router.get('/', async (req, res, next) => {
    return res.send({
        success: true,
        msg: "Welcome to Cosmic Mobile API v1.0-beta"
    })
});

router.post('/sign-up',
    async (req, res, next) => {
        return res.send({
            success: true,
            msg: "Welcome to Cosmic Mobile API v1.0-beta"
        })
    }
);

router.post('/sign-in',
    async (req, res, next) => {
        return res.send({
            success: true,
            msg: "Welcome to Cosmic Mobile API v1.0-beta"
        })
    }
);

router.use("/users", UserRouter)

export default router;
