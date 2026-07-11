import { cn } from '@/lib/utils'

const COLORS = [
  { name: 'blue-base', value: '#2563EB' },
  { name: 'purple-base', value: '#9333EA' },
  { name: 'pink-base', value: '#DB2777' },
  { name: 'red-base', value: '#DC2626' },
  { name: 'orange-base', value: '#EA580C' },
  { name: 'yellow-base', value: '#CA8A04' },
  { name: 'green-base', value: '#16A34A' },
]

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  disabled?: boolean
}

export function ColorPicker({ value, onChange, disabled }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((color) => (
        <button
          key={color.name}
          type="button"
          title={color.name}
          disabled={disabled}
          onClick={() => onChange(color.value)}
          style={{ backgroundColor: color.value }}
          className={cn(
            'h-5 w-10 p-1 rounded-sm border-2 border-gray-100 transition-transform',
            color.value === value
              ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
              : 'border-transparent hover:scale-110'
          )}
        />
      ))}
    </div>
  )
}
