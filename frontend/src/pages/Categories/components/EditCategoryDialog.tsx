import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from '@apollo/client/react'
import { UPDATE_CATEGORY } from '@/lib/graphql/mutations/Category'
import { toast } from 'sonner'
import type { Category } from '@/types'
import { IconPicker } from './IconPicker'
import { ColorPicker } from './ColorPicker'
import { DEFAULT_CATEGORY_ICON } from './categoryIcons'
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import { parseCategoryForm, type CategoryFormErrors } from '@/lib/schemas/category'

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onUpdated?: () => void
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onUpdated,
}: EditCategoryDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [color, setColor] = useState('blue')
  const [icon, setIcon] = useState(DEFAULT_CATEGORY_ICON)
  const [prevCategory, setPrevCategory] = useState(category)
  const [errors, setErrors] = useState<CategoryFormErrors>({})

  if (category !== prevCategory) {
    setPrevCategory(category)
    if (category) {
      setName(category.name)
      setDescription(category.description || '')
      setType(category.type)
      setColor(category.color || 'blue')
      setIcon(category.icon || DEFAULT_CATEGORY_ICON)
      setErrors({})
    }
  }

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted() {
      toast.success('Categoria atualizada com sucesso!')
      onOpenChange(false)
      onUpdated?.()
    },
    onError() {
      toast.error('Falha ao atualizar a categoria.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!category) return

    const result = parseCategoryForm({ name, description, type, color, icon })
    if (!result.success) {
      setErrors(result.errors)
      return
    }
    setErrors({})

    updateCategory({
      variables: {
        id: category.id,
        data: result.data,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-base font-semibold leading-6 text-gray-800">
            Editar categoria
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-5 text-gray-600">
            Atualize os dados da categoria
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Nome</Label>
            <Input
                id="cat-name"
                placeholder="Ex: Alimentação, Salário..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                disabled={loading}
            />
            <FieldError errors={[errors.name ? { message: errors.name } : undefined]} />
          </div>
          <Field className="gap-2">
            <FieldLabel htmlFor="cat-description">Descrição</FieldLabel>
            <Input
                id="cat-description"
                placeholder="Descriçao da categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-invalid={!!errors.description}
                disabled={loading}
            />
            <FieldDescription className="text-xs leading-4 text-gray-500">Opcional</FieldDescription>
            <FieldError errors={[errors.description ? { message: errors.description } : undefined]} />
          </Field>
          <div className="space-y-1">
            <Label>Ícone</Label>
            <IconPicker value={icon} onChange={setIcon} disabled={loading} />
            <FieldError errors={[errors.icon ? { message: errors.icon } : undefined]} />
          </div>
          <div className="space-y-1">
            <Label>Cor</Label>
            <ColorPicker value={color} onChange={setColor} disabled={loading} />
            <FieldError errors={[errors.color ? { message: errors.color } : undefined]} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="submit" size="md" disabled={loading} className="w-full">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
