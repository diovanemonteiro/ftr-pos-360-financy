import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { getTransactionIcon } from '@/lib/transaction-icon'
import type { Transaction } from '@/types'
import {CategoryBadge} from "@/pages/Categories/components/CategoryBadge.tsx";
import {getCategoryIcon} from "@/pages/Categories/components/categoryIcons.ts";

interface TransactionRowProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionRow({ transaction, onEdit, onDelete }: TransactionRowProps) {
    const isIncome = transaction.type === 'income'
  // const Icon = getTransactionIcon(transaction)
    const Icon = getCategoryIcon(transaction.category?.icon)
    const color = transaction.category?.color || '#6B7280'

  return (
    <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.7fr_0.9fr_0.8fr] items-center gap-4 border-b px-6 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1a` }}
        >
          <Icon className="size-4" style={{ color }} />
        </div>
        <p className="truncate text-base leading-6 font-medium">{transaction.description}</p>
      </div>

      <p className="text-sm leading-5 text-gray-600">
          {formatDate(transaction.createdAt)}
      </p>

      <div>
        <CategoryBadge name={transaction.category?.name} color={color} />
      </div>

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

      <p className="text-right text-sm font-semibold text-gray-800">
        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
      </p>

      <div className="flex items-center justify-end gap-2">
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
          <Pencil className="size-4" />
        </Button>
      </div>
    </div>
  )
}
