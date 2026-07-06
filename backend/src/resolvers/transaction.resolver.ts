import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { TransactionModel } from '../models/transaction.model'
import { UserModel } from '../models/user.model'
import { CategoryModel } from '../models/category.model'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'
import { TransactionService } from '../services/transaction.service'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { IsAuth } from '../middlewares/auth.middleware'
import { prismaClient } from '../../prisma/prisma'

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    return this.transactionService.deleteTransaction(id, user.id)
  }

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: UserModel): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id)
  }

  @FieldResolver(() => UserModel, { nullable: true })
  async user(@Root() transaction: TransactionModel): Promise<UserModel | null> {
    return prismaClient.user.findUnique({ where: { id: transaction.userId } })
  }

  @FieldResolver(() => CategoryModel, { nullable: true })
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel | null> {
    return prismaClient.category.findUnique({ where: { id: transaction.categoryId } })
  }
}
