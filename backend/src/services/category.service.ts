import { prismaClient } from '../../prisma/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input'

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        name: data.name,
        color: data.color,
        type: data.type,
        userId,
      },
    })
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findById(id: string, userId: string) {
    const category = await prismaClient.category.findFirst({
      where: { id, userId },
    })
    if (!category) throw new Error('Categoria não encontrada!')
    return category
  }

  async updateCategory(id: string, data: UpdateCategoryInput, userId: string) {
    await this.findById(id, userId)
    return prismaClient.category.update({
      where: { id },
      data: {
        name: data.name,
        color: data.color,
        type: data.type,
      },
    })
  }

  async deleteCategory(id: string, userId: string) {
    await this.findById(id, userId)
    await prismaClient.category.delete({ where: { id } })
    return true
  }
}
