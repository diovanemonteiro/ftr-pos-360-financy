import { Field, Float, InputType } from 'type-graphql'
import { TransactionType } from '@prisma/client'

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  title!: string

  @Field(() => Float)
  amount!: number

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  date!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String)
  categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => Float, { nullable: true })
  amount?: number

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  date?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  categoryId?: string
}
