import { ArrowDownCircle, ArrowUpCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { getTransactionIcon } from '@/lib/transaction-icon'
import type { Transaction } from '@/types'

interface TransactionRowProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionRow({ transaction, onEdit, onDelete }: TransactionRowProps) {
  const isIncome = transaction.type === 'income'
  const Icon = getTransactionIcon(transaction)
  const color = transaction.category?.color || '#6B7280'

  return (
    <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.7fr_0.9fr_0.8fr] items-center gap-4 border-b px-6 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1a` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <p className="truncate text-sm font-medium">{transaction.description}</p>
      </div>

      <p className="text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</p>

      <div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {transaction.category?.name}
        </span>
      </div>

      <div
        className={cn(
          'flex items-center gap-1.5 text-sm font-medium',
          isIncome ? 'text-green-600' : 'text-red-500'
        )}
      >
        {isIncome ? (
          <ArrowUpCircle className="h-4 w-4" />
        ) : (
          <ArrowDownCircle className="h-4 w-4" />
        )}
        {isIncome ? 'Entrada' : 'Saída'}
      </div>

      <p
        className={cn(
          'text-right text-sm font-semibold',
          isIncome ? 'text-green-600' : 'text-red-500'
        )}
      >
        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
      </p>

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          className="border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(transaction)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={() => onEdit(transaction)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
