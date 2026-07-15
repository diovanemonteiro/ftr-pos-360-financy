import { PrismaClient, TransactionType } from '@prisma/client'
import { hashPassword } from '../src/utils/hash'

const prisma = new PrismaClient()

const CATEGORIES: {
  name: string
  color: string
  icon: string
  description: string
  type: TransactionType
}[] = [
  { name: 'Salário', color: '#22c55e', icon: 'briefcase', description: 'Renda mensal do trabalho', type: 'income' },
  { name: 'Freelance', color: '#84cc16', icon: 'tool-case', description: 'Trabalhos autônomos', type: 'income' },
  { name: 'Investimentos', color: '#14b8a6', icon: 'piggy-bank', description: 'Rendimentos de investimentos', type: 'income' },
  { name: 'Alimentação', color: '#f97316', icon: 'utensils', description: 'Restaurantes e supermercado', type: 'expense' },
  { name: 'Transporte', color: '#3b82f6', icon: 'car-front', description: 'Combustível e transporte público', type: 'expense' },
  { name: 'Moradia', color: '#8b5cf6', icon: 'house', description: 'Aluguel e contas da casa', type: 'expense' },
  { name: 'Saúde', color: '#ef4444', icon: 'heart-pulse', description: 'Consultas e farmácia', type: 'expense' },
  { name: 'Lazer', color: '#ec4899', icon: 'ticket', description: 'Entretenimento e passeios', type: 'expense' },
  { name: 'Compras', color: '#eab308', icon: 'shopping-cart', description: 'Roupas e itens diversos', type: 'expense' },
  { name: 'Educação', color: '#06b6d4', icon: 'book-open', description: 'Cursos e material de estudo', type: 'expense' },
]

const TRANSACTION_DESCRIPTIONS: Record<string, string[]> = {
  Salário: ['Salário mensal'],
  Freelance: ['Projeto de site', 'Consultoria pontual'],
  Investimentos: ['Dividendos', 'Rendimento CDB'],
  Alimentação: ['Supermercado', 'Restaurante', 'Delivery'],
  Transporte: ['Combustível', 'Uber', 'Manutenção do carro'],
  Moradia: ['Aluguel', 'Conta de luz', 'Conta de água', 'Internet'],
  Saúde: ['Consulta médica', 'Farmácia', 'Plano de saúde'],
  Lazer: ['Cinema', 'Show', 'Assinatura de streaming'],
  Compras: ['Roupas', 'Eletrônicos', 'Presente'],
  Educação: ['Curso online', 'Livros'],
}

function randomAmount(type: TransactionType) {
  const value = type === 'income' ? 1000 + Math.random() * 4000 : 20 + Math.random() * 500
  return Math.round(value * 100) / 100
}

function randomDateWithinLastMonths(months: number) {
  const now = new Date()
  const past = new Date()
  past.setMonth(now.getMonth() - months)
  const timestamp = past.getTime() + Math.random() * (now.getTime() - past.getTime())
  return new Date(timestamp)
}

async function main() {
  const password = await hashPassword('123456')

  const user = await prisma.user.upsert({
    where: { email: 'diovane@example.com' },
    update: {},
    create: {
      name: 'Diovane Monteiro',
      email: 'diovane@example.com',
      password,
    },
  })

  await prisma.transaction.deleteMany({ where: { userId: user.id } })
  await prisma.category.deleteMany({ where: { userId: user.id } })

  const categories = await Promise.all(
    CATEGORIES.map((category) =>
      prisma.category.create({
        data: { ...category, userId: user.id },
      })
    )
  )

  const transactionsData = categories.flatMap((category) => {
    const descriptions = TRANSACTION_DESCRIPTIONS[category.name] ?? [category.name]
    const count = category.type === 'income' ? 3 : 6

    return Array.from({ length: count }, () => ({
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: randomAmount(category.type),
      type: category.type,
      userId: user.id,
      categoryId: category.id,
    }))
  })

  await prisma.transaction.createMany({ data: transactionsData })

  console.log(`Seed concluída: 1 usuário, ${categories.length} categorias, ${transactionsData.length} transações.`)
  console.log(`Login de teste -> email: ${user.email} | senha: 123456`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
