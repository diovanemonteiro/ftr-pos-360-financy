import { ArrowDownCircle, ArrowUpCircle, SquarePenIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction } from '@/types'
import {CategoryBadge} from "@/pages/Categories/components/CategoryBadge.tsx";
import {getCategoryIcon} from "@/pages/Categories/components/categoryIcons.ts";

interface TransactionCardProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionCard({ transaction, onEdit, onDelete }: TransactionCardProps) {
    const isIncome = transaction.type === 'income'
    const Icon = getCategoryIcon(transaction.category?.icon)
    const color = transaction.category?.color || '#6B7280'

  return (
    <div className="flex flex-col gap-3 border-b px-4 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}1a` }}
          >
            <Icon className="size-4" style={{ color }} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base leading-6 font-medium">{transaction.description}</p>
            <p className="text-sm leading-5 text-gray-600">{formatDate(transaction.createdAt)}</p>
          </div>
        </div>
        <p
          className={cn(
            'shrink-0 text-right text-sm font-semibold',
            isIncome ? 'text-green-600' : 'text-red-500'
          )}
        >
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge name={transaction.category?.name} color={color} />
          <div
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium',
              isIncome ? 'text-green-600' : 'text-red-500'
            )}
          >
            {isIncome ? (
              <ArrowUpCircle className="size-4" />
            ) : (
              <ArrowDownCircle className="size-4" />
            )}
            {isIncome ? 'Entrada' : 'Saída'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="border-gray-300 text-destructive hover:bg-gray-200 hover:text-destructive"
            onClick={() => onDelete(transaction)}
          >
            <Trash2 className="size-4" />
          </Button>
          <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onEdit(transaction)}
              className="text-gray-700 border-gray-300 hover:text-gray-700 hover:bg-gray-200"
          >
            <SquarePenIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}