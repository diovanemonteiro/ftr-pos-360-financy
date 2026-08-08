export const COLORS = [
  { value: 'blue', className: 'bg-blue-base', bgClassName: 'bg-blue-light', textClassName: 'text-blue-base' },
  { value: 'purple', className: 'bg-purple-base', bgClassName: 'bg-purple-light', textClassName: 'text-purple-base' },
  { value: 'pink', className: 'bg-pink-base', bgClassName: 'bg-pink-light', textClassName: 'text-pink-base' },
  { value: 'red', className: 'bg-red-base', bgClassName: 'bg-red-light', textClassName: 'text-red-base' },
  { value: 'orange', className: 'bg-orange-base', bgClassName: 'bg-orange-light', textClassName: 'text-orange-base' },
  { value: 'yellow', className: 'bg-yellow-base', bgClassName: 'bg-yellow-light', textClassName: 'text-yellow-base' },
  { value: 'green', className: 'bg-green-base', bgClassName: 'bg-green-light', textClassName: 'text-green-base' },
]

export function getCategoryColorClasses(value?: string | null) {
  const color = COLORS.find((c) => c.value === value) ?? COLORS[0]

  return { bg: color.bgClassName, text: color.textClassName }
}
