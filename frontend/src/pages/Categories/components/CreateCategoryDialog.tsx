import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field'
import { useMutation } from '@apollo/client/react'
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/Category'
import { toast } from 'sonner'
import { IconPicker } from './IconPicker'
import { ColorPicker } from './ColorPicker'
import { DEFAULT_CATEGORY_ICON } from './categoryIcons'

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [color, setColor] = useState('#6366f1')
  const [icon, setIcon] = useState(DEFAULT_CATEGORY_ICON)

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted() {
      toast.success('Categoria criada com sucesso!')
      onOpenChange(false)
      onCreated?.()
      setName('')
      setDescription('')
      setType('expense')
      setColor('#6366f1')
      setIcon(DEFAULT_CATEGORY_ICON)
    },
    onError() {
      toast.error('Falha ao criar a categoria.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createCategory({
      variables: {
        data: { name, description, type, color, icon },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-base font-semibold leading-6 text-gray-800">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-5 text-gray-600">
            Crie uma nova categoria para organizar suas transações
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Nome</Label>
            <Input
              id="cat-name"
              placeholder="Ex: Alimentação"
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
