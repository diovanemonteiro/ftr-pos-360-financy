import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from 'type-graphql'
import { TransactionType } from '@prisma/client'
import { UserModel } from './user.model'

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Type of transaction: income or expense',
})

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String, { nullable: true })
  color?: string

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
