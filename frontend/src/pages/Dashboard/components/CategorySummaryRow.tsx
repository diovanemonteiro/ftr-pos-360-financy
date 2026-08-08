import { formatCurrency } from '@/lib/utils'
import type { Category } from '@/types'
import {CategoryBadge} from "@/pages/Categories/components/CategoryBadge.tsx";

interface CategorySummaryRowProps {
  category: Category
  itemsCount: number
  total: number
}

export function CategorySummaryRow({ category, itemsCount, total }: CategorySummaryRowProps) {
  return (
    <div className="flex items-center gap-1 h-7">

        <div className="w-27 flex-1">
            <CategoryBadge
                name={category.name}
                color={category.color}
            />
        </div>

        <div className="w-31 flex-1">
            <span className="flex justify-end text-sm font-normal leading-5 text-gray-600">
                {itemsCount} itens
            </span>
        </div>

        <div className="w-22 flex-none">
            <span className="flex items-center justify-end text-sm font-semibold leading-5 text-gray-800">
                {formatCurrency(total)}
            </span>
        </div>

    </div>
  )
}
