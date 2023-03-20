import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { UserRepository } from '../repository/user.repository'

export class UserController {

    // private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const userRepo = new UserRepository
        let dataUser = userRepo.all()

        return dataUser
    }

    async signUp(request: Request, response: Response, next: NextFunction) {

        const userRepo = new UserRepository
        let saveUser = userRepo.save( request )

        return saveUser
    }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     let userToRemove = await this.userRepository.findOneBy({ id })

    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }

    //     await this.userRepository.remove(userToRemove)

    //     return "user has been removed"
    // }

}