import {prismaClient} from "../../prisma/prisma";
import {CreateUserInput} from "../dtos/input/user.input";

export class UserService {

    async createUser(input: CreateUserInput) {

        const findUser = prismaClient.user.findUnique({
            where: {
                email: input.email
            }
        })

        if (findUser) throw new Error('Usuario ja existe')

        return await prismaClient.user.create({
            data: {
                name: input.name,
                email: input.email
            }
        })
    }

    async findUser(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        })

        if (!user) throw new Error('Usuario nao existe')

        return user
    }
}