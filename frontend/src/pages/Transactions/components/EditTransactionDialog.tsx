import { useState, useEffect } from 'react'
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
import { UPDATE_TRANSACTION } from '@/lib/graphql/mutations/Transaction.ts'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category.ts'
import { toast } from 'sonner'
import type { Category, Transaction } from '@/types'
import {cn} from "@/lib/utils.ts";
import {ArrowDownCircle, ArrowUpCircle} from "lucide-react";

interface EditTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction | null
  onUpdated?: () => void
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  transaction,
  onUpdated,
}: EditTransactionDialogProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  const categories = categoriesData?.listCategories || []

  useEffect(() => {
    if (transaction) {
      setType(transaction.type)
      setCategoryId(transaction.categoryId)
      setDescription(transaction.description || '')
      setAmount(String(transaction.amount))
      setDate(transaction.createdAt.split('T')[0])
    }
  }, [transaction])

  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação atualizada com sucesso!')
      onOpenChange(false)
      onUpdated?.()
    },
    onError() {
      toast.error('Falha ao atualizar a transação.')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!transaction) return
    updateTransaction({
      variables: {
        id: transaction.id,
        data: {
          type,
          description: description || undefined,
          categoryId,
          amount: parseFloat(amount),
          date,
        },
      },
    })
  }

  const filteredCategories = categories.filter((c) => c.type === type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar transação</DialogTitle>
          <DialogDescription>Atualize os dados da transação</DialogDescription>
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
