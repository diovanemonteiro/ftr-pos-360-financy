import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { useMutation, useQuery } from '@apollo/client/react'
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/Transaction.ts'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category.ts'
import { toast } from 'sonner'
import type { Category } from '@/types'
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { cn } from '@/lib/utils.ts'

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
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

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
    setType('expense')
    setDescription('')
    setCategoryId('')
    setAmount('')
    setDate(new Date().toISOString().split('T')[0])
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
          description,
          amount: parseFloat(amount),
          type,
          date,
          categoryId,
        },
      },
    })
  }

  const filteredCategories = categories.filter((c) => c.type === type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-base font-semibold leading-6 text-gray-800">
            Nova transação
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-5 text-gray-600">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 rounded-md border border-gray-200 p-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => { setType('expense'); setCategoryId('') }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-sm font-medium transition-colors',
                  type === 'expense'
                    ? 'border-destructive bg-destructive/10 text-destructive'
                    : 'border-input text-muted-foreground hover:bg-muted'
                )}
              >
                <ArrowDownCircle className="h-4 w-4" />
                Despesa
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => { setType('income'); setCategoryId('') }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-sm font-medium transition-colors',
                  type === 'income'
                    ? 'border-emerald-600 bg-emerald-600/10 text-emerald-600'
                    : 'border-input text-muted-foreground hover:bg-muted'
                )}
              >
                <ArrowUpCircle className="h-4 w-4" />
                Receita
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Ex: Salário, Supermercado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
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
              <div className="space-y-2">
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
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                  items={filteredCategories.map((cat) => ({ value: cat.id, label: cat.name }))}
                  value={categoryId}
                  onValueChange={setCategoryId}
              >
                <SelectTrigger size="md" className="w-full">
                  <SelectValue
                      placeholder="Selecione uma categoria"
                      className="text-base fonte-normal leading-4.5 text-gray-800"
                  />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  {filteredCategories.map((cat) => (
                  <SelectItem
                      key={cat.id}
                      value={cat.id}
                      className="px-3 py-2 text-base fonte-normal leading-4.5 text-gray-800"
                  >
                    {cat.name}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
                type="submit"
                size="md"
                className="w-full"
                disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
