import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import {CreateUserInput} from "../dtos/input/user.input";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {

    private userService = new UserService()

    @Mutation(() => UserModel)
    async createUser(
        @Arg('input', () => CreateUserInput) input: CreateUserInput
    ):Promise<UserModel> {
        return this.userService.createUser(input)
    }

    @Query(() => UserModel)
    async getUser(
        @Arg('id', () => String) id: string
    ):Promise<UserModel> {
        return this.userService.findUser(id)
    }
}