import { Field, InputType } from 'type-graphql'
import { TransactionType } from '@prisma/client'

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string

  @Field(() => String, { nullable: true })
  color?: string

  @Field(() => TransactionType)
  type!: TransactionType
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  color?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType
}
