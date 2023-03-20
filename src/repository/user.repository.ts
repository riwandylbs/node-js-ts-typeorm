import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserRepository {

    private userRepository = AppDataSource.getRepository(User)

    // get all users
    async all() {
        return this.userRepository.find()
    }

    async save(req) {
        const { fullName, phone, password, email, icNumber, nationality, bod, race, gender, postCode, state, city } = req.body;
        console.log( fullName )
        let status = "unverified"
        let userRole = "visitors"
        const user = Object.assign(new User(), {
            fullName,
            phone,
            password,
            email,
            icNumber,
            nationality,
            bod,
            race,
            status,
            userRole,
            gender,
            postCode,
            state, 
            city
        })

        return this.userRepository.save(user)
    }

    async validate(req) {
        const { email } = req.body;
        
        const user = await this.userRepository.findOne({
            where: { email }
        })

        return user
    }
}
