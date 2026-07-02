import {Field, ObjectType} from "type-graphql";
import type {UserModel} from "../../models/user.model.js";

@ObjectType()
export class RegisterOutput {

    @Field(() => String)
    token!: string

    @Field(() => String)
    refreshToken!: string

    @Field(() => UserModel)
    user!: UserModel

}