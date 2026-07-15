import { prismaClient } from '../../prisma/prisma'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        amount: data.amount,
        userId,
        categoryId: data.categoryId,
      },
    })
  }

  async listTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
    })
  }

  async findById(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId },
    })
    if (!transaction) throw new Error('Transação não encontrada!')
    return transaction
  }

  async updateTransaction(id: string, data: UpdateTransactionInput, userId: string) {
    await this.findById(id, userId)
    return prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type,
        description: data.description,
        amount: data.amount,
        categoryId: data.categoryId,
      },
    })
  }

  async deleteTransaction(id: string, userId: string) {
    await this.findById(id, userId)
    await prismaClient.transaction.delete({ where: { id } })
    return true
  }
}
