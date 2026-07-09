import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useMutation } from '@apollo/client/react'
import { DELETE_TRANSACTION } from '@/lib/graphql/mutations/Transaction.ts'
import { toast } from 'sonner'
import type { Transaction } from '@/types'

interface DeleteTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction | null
  onDeleted?: () => void
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transaction,
  onDeleted,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success('Transação excluída com sucesso!')
      onOpenChange(false)
      onDeleted?.()
    },
    onError() {
      toast.error('Falha ao excluir a transação.')
    },
  })

  const handleConfirm = () => {
    if (!transaction) return
    deleteTransaction({ variables: { id: transaction.id } })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Excluir transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a transação{' '}
            <span className="font-medium text-foreground">"{transaction?.title}"</span>? Esta ação
            não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
