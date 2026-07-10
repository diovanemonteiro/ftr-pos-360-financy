import { cn } from '@/lib/utils'

const ICONS = [
  '🍜', '🛒', '🚗', '❤️', '🎫', '🐷', '💼', '🎁',
  '⚡', '📱', '🏠', '✈️', '🎓', '🐾', '☕', '🎮',
  '💡', '🧾', '💳', '🎵', '📚', '🧴', '🧢', '🎉',
]

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
  disabled?: boolean
}

export function IconPicker({ value, onChange, disabled }: IconPickerProps) {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {ICONS.map((icon) => (
        <button
          key={icon}
          type="button"
          disabled={disabled}
          onClick={() => onChange(icon)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-md border text-lg transition-colors',
            icon === value
              ? 'border-primary bg-primary/10'
              : 'border-input hover:bg-muted'
          )}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}
