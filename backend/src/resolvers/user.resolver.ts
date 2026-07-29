import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import {CreateUserInput, UpdateUserInput} from "../dtos/input/user.input";
import {GqlUser} from "../graphql/decorators/user.decorator";

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

    @Mutation(() => UserModel)
    async updateUser(
        @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
        @GqlUser() user: UserModel
    ):Promise<UserModel> {
        return this.userService.updateUser(user.id, data)
    }

    @Query(() => UserModel)
    async getUser(
        @Arg('id', () => String) id: string
    ):Promise<UserModel> {
        return this.userService.findUser(id)
    }

    @Query(() => UserModel)
    async me(
        @GqlUser() user: UserModel
    ):Promise<UserModel> {
        return this.userService.findUser(user.id)
    }
}