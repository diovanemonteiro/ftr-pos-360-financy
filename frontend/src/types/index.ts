export type TransactionType = 'income' | 'expense'

export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface Category {
  id: string
  name: string
  color?: string | null
  icon?: string | null
  description?: string | null
  type: TransactionType
  userId: string
  itemsCount?: number
  createdAt: string
  updatedAt?: string
}

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  amount: number
  userId: string
  categoryId: string
  category?: Category
  createdAt: string
  updatedAt?: string
}
