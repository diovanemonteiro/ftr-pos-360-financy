import { Field, Float, GraphQLISODateTime, ID, ObjectType } from 'type-graphql'
import { TransactionType } from '@prisma/client'
import { UserModel } from './user.model'
import { CategoryModel } from './category.model'

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  description!: string

  @Field(() => Float)
  amount!: number

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => String)
  categoryId!: string

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
