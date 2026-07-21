import { Pencil, TrashIcon, SquarePenIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Category } from '@/types'
import { CategoryBadge } from './CategoryBadge'
import { getCategoryIcon } from './categoryIcons'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const color = category.color || '#6366f1'
  const icons = { Icon: getCategoryIcon(category.icon) }

  return (
    <Card size="sm" className="gap-5 p-6 min-h-57.5">
      <div className="flex items-start justify-between">
        <div
          className="flex size-10 items-center justify-center rounded-md"
          style={{ backgroundColor: `${color}1a` }}
        >
          <icons.Icon className="size-4" style={{ color }} />
        </div>
        <div className="flex gap-2">
          <Button
              variant="outline"
              size="icon-sm"
              className="border-gray-300 text-destructive hover:bg-gray-200 hover:text-destructive"
              onClick={() => onDelete(category)}
          >
            <TrashIcon className="size-4" />
          </Button>
          <Button
              variant="outline"
              size="icon-sm"
              className="text-gray-700 border-gray-300 hover:text-gray-700 hover:bg-gray-200"
              onClick={() => onEdit(category)}
          >
            <SquarePenIcon className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <p className="text-base font-semibold leading-6 text-gray-800">
          {category.name}
        </p>
        {category.description && (
          <p className="line-clamp-2 text-sm font-normal leading-5 text-gray-600">
            {category.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <CategoryBadge name={category.name} color={color} />
        <span className="shrink-0 text-sm font-normal leading-5 text-gray-600">
          {category.itemsCount ?? 0} {category.itemsCount === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </Card>
  )
}
