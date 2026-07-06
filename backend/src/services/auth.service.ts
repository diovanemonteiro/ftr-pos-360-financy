import {prismaClient} from "../../prisma/prisma";
import type {RegisterInput} from "../dtos/input/auth.input";
import {comparePassword, hashPassword} from "../utils/hash";
import {signJwt} from "../utils/jwt";
import type {UserModel} from "../models/user.model";
import {LoginInput} from "../dtos/input/auth.input";

export class AuthService {

    async login(data: LoginInput) {
        const existingUser = await prismaClient.user.findUnique({
            where: { email: data.email },
        })
        if (!existingUser) throw new Error('Usuário não cadastrado!')
        const compare = await comparePassword(data.password, existingUser.password)
        if (!compare) throw new Error('Senha inválida!')
        return this.generateToken(existingUser)
    }

    async register(data: RegisterInput) {

        const existingUser = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hash = await hashPassword(data.password);

        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
            },
        });

        return this.generateToken(user);
    }

    generateToken(user: UserModel) {
        const token = signJwt({ id: user.id, email: user.email }, '15m');
        const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');
        return { token, refreshToken, user };
    }
}