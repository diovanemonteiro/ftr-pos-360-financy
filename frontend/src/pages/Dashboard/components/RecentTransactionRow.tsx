import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction } from '@/types'
import {getCategoryIcon} from "@/pages/Categories/components/categoryIcons";
import {CategoryBadge} from "@/pages/Categories/components/CategoryBadge.tsx";

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
  const color = transaction.category?.color || '#6B7280'
  const Icon = getCategoryIcon(transaction.category?.icon)

  return (
    <div
      className="group flex cursor-pointer items-center justify-between gap-3"
      onClick={() => onEdit(transaction)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 px-6">

          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}1a` }}
          >
            <Icon className="size-4" style={{ color }} />
          </div>

          <div className="gap-0.5">
            <p className="truncate text-base font-medium leading-6 text-gray-800">
              {transaction.description}
            </p>
            <p className="text-sm leading-5 text-gray-600">
              {formatDate(transaction.createdAt)}
            </p>
          </div>

        </div>
      </div>

      <div className="w-40 h-20 flex-none flex items-center justify-center">
        <CategoryBadge name={transaction.category?.name} color={color} />
      </div>

      <div className="w-50 h-20 flex-none flex items-center justify-end px-6">

          <span
              className={cn(
                  'flex items-center justify-end gap-2 text-sm font-semibold leading-5 text-gray-800',
                  isIncome ? 'text-green-600' : 'text-red-500'
              )}
          >
            {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
              {isIncome ? (
                  <ArrowUpCircle className="size-4" />
              ) : (
                  <ArrowDownCircle className="size-4" />
              )}
          </span>

          {/*<button*/}
          {/*    type="button"*/}
          {/*    className="text-muted-foreground/30 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"*/}
          {/*    onClick={(e) => {*/}
          {/*      e.stopPropagation()*/}
          {/*      onDelete(transaction)*/}
          {/*    }}*/}
          {/*>*/}
          {/*  <Trash2 className="h-4 w-4" />*/}
          {/*</button>*/}

      </div>

    </div>
  )
}
