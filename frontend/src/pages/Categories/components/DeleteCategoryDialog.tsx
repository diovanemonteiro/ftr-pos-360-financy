import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMutation } from '@apollo/client/react'
import { DELETE_CATEGORY } from '@/lib/graphql/mutations/Category'
import { toast } from 'sonner'
import type { Category } from '@/types'

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onDeleted?: () => void
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  onDeleted,
}: DeleteCategoryDialogProps) {
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      toast.success('Categoria excluída com sucesso!')
      onOpenChange(false)
      onDeleted?.()
    },
    onError() {
      toast.error('Falha ao excluir a categoria.')
    },
  })

  const handleConfirm = () => {
    if (!category) return
    deleteCategory({ variables: { id: category.id } })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Excluir categoria</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a categoria{' '}
            <span className="font-medium text-foreground">"{category?.name}"</span>? Esta ação não
            pode ser desfeita.
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
