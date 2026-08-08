import { ArrowDownCircle, ArrowUpCircle, Trash2, SquarePenIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import type { Transaction } from '@/types'
import {CategoryBadge} from "@/pages/Categories/components/CategoryBadge.tsx";
import {getCategoryIcon} from "@/pages/Categories/components/categoryIcons.ts";
import {getCategoryColorClasses} from "@/pages/Categories/components/categoryColors.ts";

interface TransactionRowProps {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionRow({ transaction, onEdit, onDelete }: TransactionRowProps) {
    const isIncome = transaction.type === 'income'
    const icons = { Icon: getCategoryIcon(transaction.category?.icon) }
    const color = transaction.category?.color
    const colorClasses = getCategoryColorClasses(color)

  return (
    <tr className="border-b last:border-b-0">
      <td className="px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg',
              colorClasses.bg
            )}
          >
            <icons.Icon className={cn('size-4', colorClasses.text)} />
          </div>
          <p className="truncate text-base leading-6 font-medium">{transaction.description}</p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm leading-5 text-gray-600">
        {formatDate(transaction.createdAt)}
      </td>

      <td className="px-6 py-4">
        <CategoryBadge name={transaction.category?.name} color={color} />
      </td>

      <td className="px-6 py-4">
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
      </td>

      <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
      </td>

      <td className="px-6 py-4">
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
            <SquarePenIcon className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  )
}