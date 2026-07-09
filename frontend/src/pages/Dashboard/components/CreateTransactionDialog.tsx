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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/Transaction'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category'
import { toast } from 'sonner'
import type { Category } from '@/types'

interface CreateTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateTransactionDialogProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  const categories = categoriesData?.listCategories || []

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação criada com sucesso!')
      onOpenChange(false)
      onCreated?.()
      resetForm()
    },
    onError() {
      toast.error('Falha ao criar a transação.')
    },
  })

  const resetForm = () => {
    setTitle('')
    setAmount('')
    setType('expense')
    setDate(new Date().toISOString().split('T')[0])
    setDescription('')
    setCategoryId('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryId) {
      toast.error('Selecione uma categoria.')
      return
    }
    createTransaction({
      variables: {
        data: {
          title,
          amount: parseFloat(amount),
          type,
          date,
          description: description || undefined,
          categoryId,
        },
      },
    })
  }

  const filteredCategories = categories.filter((c) => c.type === type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova transação</DialogTitle>
          <DialogDescription>Preencha os dados da transação</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Salário, Supermercado..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(v) => { setType(v as 'income' | 'expense'); setCategoryId('') }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                    Nenhuma categoria de {type === 'income' ? 'receita' : 'despesa'}
                  </div>
                ) : (
                  filteredCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Adicione uma observação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
