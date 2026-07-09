import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Plus, Tag } from 'lucide-react'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category'
import type { Category } from '@/types'
import { CategoryCard } from './components/CategoryCard'
import { CreateCategoryDialog } from './components/CreateCategoryDialog'
import { EditCategoryDialog } from './components/EditCategoryDialog'
import { DeleteCategoryDialog } from './components/DeleteCategoryDialog'

export function Categories() {
  const [openCreate, setOpenCreate] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)

  const categories = data?.listCategories || []
  const incomeCategories = categories.filter((c) => c.type === 'income')
  const expenseCategories = categories.filter((c) => c.type === 'expense')

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-primary">Categorias</h1>
          <Button onClick={() => setOpenCreate(true)}>
            <Plus className="h-4 w-4" />
            Nova categoria
          </Button>
        </div>

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-16 rounded-lg border border-dashed border-muted-foreground/30 animate-pulse"
            />
          ))}

        {!loading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Tag className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">Nenhuma categoria encontrada</p>
            <p className="text-sm">Clique em "Nova categoria" para começar</p>
          </div>
        )}

        {!loading && incomeCategories.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Receitas
            </h2>
            {incomeCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}

        {!loading && expenseCategories.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Despesas
            </h2>
            {expenseCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      <CreateCategoryDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreated={refetch}
      />
      <EditCategoryDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        category={editTarget}
        onUpdated={refetch}
      />
      <DeleteCategoryDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        category={deleteTarget}
        onDeleted={refetch}
      />
    </Page>
  )
}
