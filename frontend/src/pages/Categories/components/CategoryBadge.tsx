import { cn } from '@/lib/utils'
import { getCategoryColorClasses } from './categoryColors'

interface CategoryBadgeProps {
  name: string | null
  color?: string | null
}

export function CategoryBadge({ name, color }: CategoryBadgeProps) {
  const colorClasses = getCategoryColorClasses(color)

  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-sm font-medium leading-5',
        colorClasses.bg,
        colorClasses.text
      )}
    >
      {name}
    </span>
  )
}
