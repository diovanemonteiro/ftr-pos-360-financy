import { Pencil, Trash2, TrendingDown, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Transaction } from '@/types'

interface TransactionCardProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionCard({ transaction, onEdit, onDelete }: TransactionCardProps) {
  const isIncome = transaction.type === 'income'

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full',
            isIncome ? 'bg-green-100' : 'bg-red-100'
          )}
        >
          {isIncome ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{transaction.title}</p>
          <p className="text-xs text-muted-foreground">
            {transaction.category?.name} · {formatDate(transaction.date)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'font-semibold text-sm',
            isIncome ? 'text-green-600' : 'text-red-500'
          )}
        >
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => onEdit(transaction)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(transaction)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  )
}
