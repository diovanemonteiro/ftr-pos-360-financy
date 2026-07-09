import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { getTransactionIcon } from '@/lib/transaction-icon'
import type { Transaction } from '@/types'

interface RecentTransactionRowProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function RecentTransactionRow({
  transaction,
  onEdit,
  onDelete,
}: RecentTransactionRowProps) {
  const isIncome = transaction.type === 'income'
  const Icon = getTransactionIcon(transaction)
  const color = transaction.category?.color || '#6B7280'

  return (
    <div
      className="group flex cursor-pointer items-center justify-between gap-3 py-4"
      onClick={() => onEdit(transaction)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{transaction.title}</p>
          <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {transaction.category?.name}
        </span>
        <span
          className={cn(
            'flex items-center gap-1 text-sm font-semibold',
            isIncome ? 'text-green-600' : 'text-red-500'
          )}
        >
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
          {isIncome ? (
            <ArrowUpCircle className="h-4 w-4" />
          ) : (
            <ArrowDownCircle className="h-4 w-4" />
          )}
        </span>
        <button
          type="button"
          className="text-muted-foreground/30 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(transaction)
          }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
