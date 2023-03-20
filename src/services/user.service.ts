import { AppDataSource } from '../data-source';
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async (email) => {
    return await userRepository.findOne({
        where: { email }
    })
};