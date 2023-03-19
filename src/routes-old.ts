import { body, param } from "express-validator"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [
        param("id").isInt()
    ]
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    validation: [
        body("firstName").isString().withMessage("Your name at least 5 characters")
    ]
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]