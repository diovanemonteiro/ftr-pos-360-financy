import { cn } from '@/lib/utils'
import { CATEGORY_ICONS } from './categoryIcons'

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
  disabled?: boolean
}

export function IconPicker({ value, onChange, disabled }: IconPickerProps) {
  return (
    <div className="grid grid-cols-8 gap-2">
      {CATEGORY_ICONS.map(({ name, icon: Icon }) => (
        <button
          key={name}
          type="button"
          disabled={disabled}
          onClick={() => onChange(name)}
          className={cn(
            'flex size-10.5 items-center justify-center rounded-md border border-gray-300 transition-colors',
            name === value
              ? 'border-primary bg-primary/10'
              : 'border-input hover:bg-muted'
          )}
        >
          <Icon className={cn('size-5', name === value ? 'text-gray-600' : 'text-gray-500')} />
        </button>
      ))}
    </div>
  )
}
