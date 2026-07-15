import { Field, Float, InputType } from 'type-graphql'
import { TransactionType } from '@prisma/client'

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  description?: string

  @Field(() => Float)
  amount!: number

  @Field(() => String)
  categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String)
  description?: string

  @Field(() => Float, { nullable: true })
  amount?: number

  @Field(() => String, { nullable: true })
  categoryId?: string
}
