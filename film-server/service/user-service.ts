import prisma from "../prisma/prismaClient";
import { UserRegister } from "../types/auth";

class UserService {
    async getById(id: string) {

    }
    async getByEmail(email: string) {
        return await prisma.user.findFirst({ where: { email } })
    }
    async create(userData: UserRegister) {
        const newUser = await prisma.user.create({ data: userData })
        return newUser
    }
}

export default new UserService()