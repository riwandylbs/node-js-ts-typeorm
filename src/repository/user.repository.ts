import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserRepository {

    private userRepository = AppDataSource.getRepository(User)

    // get all users
    async all() {
        return this.userRepository.find()
    }

    async save(req) {
        const { firstName, lastName, age } = req.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }
}