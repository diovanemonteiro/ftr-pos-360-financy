interface CategoryBadgeProps {
  name: string
  color: string
}

export function CategoryBadge({ name, color }: CategoryBadgeProps) {
  return (
    <span
      className="rounded-full px-3 py-1 text-sm font-medium leading-5"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      {name}
    </span>
  )
}
