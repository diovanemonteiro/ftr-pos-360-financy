import { Arg, Mutation, Resolver } from "type-graphql";
import {RegisterOutput} from "../dtos/output/auth.output.js";
import {RegisterInput} from "../dtos/input/auth.input.js";
import type {AuthService} from "../services/auth.service.js";

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    @Mutation(() => RegisterOutput)
    async register(
        @Arg('data', () => RegisterInput) data: RegisterInput
    ): Promise<RegisterOutput> {
        return this.authService.register(data);
    }

}