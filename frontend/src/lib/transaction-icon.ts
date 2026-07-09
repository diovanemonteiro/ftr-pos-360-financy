import { Briefcase, Fuel, PiggyBank, ShoppingCart, Tag, UtensilsCrossed } from 'lucide-react'
import type { Transaction } from '@/types'

export function getTransactionIcon(transaction: Transaction) {
  const title = transaction.title.toLowerCase()
  if (title.includes('salário') || title.includes('salario')) return Briefcase
  if (title.includes('restaurante') || title.includes('jantar') || title.includes('almoço'))
    return UtensilsCrossed
  if (title.includes('gasolina') || title.includes('posto') || title.includes('combustível'))
    return Fuel
  if (title.includes('mercado') || title.includes('compra')) return ShoppingCart
  if (title.includes('investimento')) return PiggyBank
  return Tag
}
