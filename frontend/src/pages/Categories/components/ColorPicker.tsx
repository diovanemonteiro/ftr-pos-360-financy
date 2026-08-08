import { cn } from '@/lib/utils'
import { COLORS } from './categoryColors'

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
          key={color.value}
          type="button"
          title={color.value}
          disabled={disabled}
          onClick={() => onChange(color.value)}
          className={cn(
            'h-5 w-10 p-1 rounded-sm border-2 border-gray-100 transition-transform',
            color.className,
            color.value === value
              ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
              : 'border-transparent hover:scale-110'
          )}
        />
      ))}
    </div>
  )
}
