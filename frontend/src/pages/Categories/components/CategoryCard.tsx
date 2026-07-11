import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Category } from '@/types'
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
    <Card size="sm" className="gap-3">
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${color}1a` }}
        >
          <icons.Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon-sm" onClick={() => onEdit(category)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(category)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <p className="font-semibold">{category.name}</p>
        {category.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {category.name}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground">
          {category.itemsCount ?? 0} {category.itemsCount === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </Card>
  )
}
