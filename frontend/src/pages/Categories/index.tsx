import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Plus, Tag, ArrowUpDown } from 'lucide-react'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category'
import type { Category } from '@/types'
import { CategoryCard } from './components/CategoryCard'
import { CreateCategoryDialog } from './components/CreateCategoryDialog'
import { EditCategoryDialog } from './components/EditCategoryDialog'
import { DeleteCategoryDialog } from './components/DeleteCategoryDialog'
import { getCategoryIcon } from './components/categoryIcons'

export function Categories() {
  const [openCreate, setOpenCreate] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)

  const categories = data?.listCategories || []
  const totalTransactions = categories.reduce((sum, c) => sum + (c.itemsCount ?? 0), 0)
  const mostUsed = categories.reduce<Category | null>((top, c) => {
    if (!top || (c.itemsCount ?? 0) > (top.itemsCount ?? 0)) return c
    return top
  }, null)
  const icons = { MostUsed: getCategoryIcon(mostUsed?.icon) }

  return (
    <Page>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-8">Categorias</h1>
            <p className="text-base font-normal text-gray-600 leading-6">
              Organize suas transações por categorias
            </p>
          </div>
          <Button onClick={() => setOpenCreate(true)} className="text-sm font-medium text-white leading-5">
            <Plus className="h-4 w-4" />
            Nova categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card size="sm" className="flex-row items-start gap-4 p-6">
            <Tag className="size-6 text-gray-700 mt-2" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold leading-8 text-gray-800">{categories.length}</p>
              <p className="text-xs uppercase font-medium leading-4 tracking-wider text-gray-500">
                Total de categorias
              </p>
            </div>
          </Card>
          <Card size="sm" className="flex-row items-start gap-4 p-6">
            <ArrowUpDown className="size-6 text-purple-base mt-2" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold leading-8 text-gray-800">{totalTransactions}</p>
              <p className="text-xs uppercase font-medium leading-4 tracking-wider text-gray-500">
                Total de transações
              </p>
            </div>
          </Card>
          <Card size="sm" className="flex-row items-start gap-4 p-6">
            <icons.MostUsed className="size-6 text-red-base mt-2" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold leading-8 text-gray-800">{mostUsed?.name || '-'}</p>
              <p className="text-xs uppercase font-medium leading-4 tracking-wider text-gray-500">
                Categoria mais utilizada
              </p>
            </div>
          </Card>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-40 rounded-lg border border-dashed border-muted-foreground/30 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Tag className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">Nenhuma categoria encontrada</p>
            <p className="text-sm">Clique em "Nova categoria" para começar</p>
          </div>
        )}

        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
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
