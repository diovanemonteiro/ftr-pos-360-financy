import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMutation } from '@apollo/client/react'
import { UPDATE_CATEGORY } from '@/lib/graphql/mutations/Category'
import { toast } from 'sonner'
import type { Category } from '@/types'
import { IconPicker } from './IconPicker'
import { ColorPicker } from './ColorPicker'
import { DEFAULT_CATEGORY_ICON } from './categoryIcons'
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field.tsx";

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
  const [color, setColor] = useState('#6366f1')
  const [icon, setIcon] = useState(DEFAULT_CATEGORY_ICON)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setDescription(category.description || '')
      setType(category.type)
      setColor(category.color || '#6366f1')
      setIcon(category.icon || DEFAULT_CATEGORY_ICON)
    }
  }, [category])

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
    updateCategory({
      variables: {
        id: category.id,
        data: { name, description, type, color, icon },
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
                required
                disabled={loading}
            />
          </div>
          <Field className="gap-2">
            <FieldLabel htmlFor="cat-description">Descrição</FieldLabel>
            <Input
                id="cat-description"
                placeholder="Descriçao da categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
            />
            <FieldDescription className="text-xs leading-4 text-gray-500">Opcional</FieldDescription>
          </Field>
          <div className="space-y-1">
            <Label>Ícone</Label>
            <IconPicker value={icon} onChange={setIcon} disabled={loading} />
          </div>
          <div className="space-y-1">
            <Label>Cor</Label>
            <ColorPicker value={color} onChange={setColor} disabled={loading} />
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
