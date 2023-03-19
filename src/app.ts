import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
// import { Routes } from "./routes"
import * as morgan from 'morgan'
import { authentication } from "./middleware/Authentication"
import router from "./routes"


// create express app
const app = express()
app.use(authentication)
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use(router);

// // register express routes from defined application routes and implementing asyncronous
// Routes.forEach(route => {
//     (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
//         try {
//             const result = await (new (route.controller as any))[route.action](req, res, next)
//             res.json(result)
//         } catch (error) {
//             next(error)
//         }
//     })
// })

export default app;