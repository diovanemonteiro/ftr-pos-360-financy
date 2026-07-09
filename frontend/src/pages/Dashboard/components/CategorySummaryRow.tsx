import { formatCurrency } from '@/lib/utils'
import type { Category } from '@/types'

interface CategorySummaryRowProps {
  category: Category
  itemsCount: number
  total: number
}

export function CategorySummaryRow({ category, itemsCount, total }: CategorySummaryRowProps) {
  const color = category.color || '#6B7280'

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {category.name}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground">{itemsCount} itens</span>
      </div>
      <span className="shrink-0 text-sm font-semibold">{formatCurrency(total)}</span>
    </div>
  )
}
