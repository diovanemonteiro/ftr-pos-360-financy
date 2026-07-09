import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Link } from 'react-router-dom'
import { ArrowDownCircle, ArrowUpCircle, ChevronRight, Plus, Wallet } from 'lucide-react'
import { Page } from '@/components/Page'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transaction'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category'
import { formatCurrency } from '@/lib/utils'
import type { Category, Transaction } from '@/types'
import { RecentTransactionRow } from './components/RecentTransactionRow'
import { CategorySummaryRow } from './components/CategorySummaryRow'
import { CreateTransactionDialog } from '@/pages/Transactions/components/CreateTransactionDialog.tsx'
import { EditTransactionDialog } from '@/pages/Transactions/components/EditTransactionDialog.tsx'
import { DeleteTransactionDialog } from '@/pages/Transactions/components/DeleteTransactionDialog.tsx'

export function Dashboard() {
  const [openCreate, setOpenCreate] = useState(false)
  const [editTarget, setEditTarget] = useState<Transaction | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null)

  const { data, loading, refetch } = useQuery<{ listTransactions: Transaction[] }>(
    LIST_TRANSACTIONS
  )
  const { data: categoriesData, loading: loadingCategories } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

  const transactions = data?.listTransactions || []
  const categories = categoriesData?.listCategories || []

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const categorySummaries = categories
    .map((category) => {
      const categoryTransactions = transactions.filter((t) => t.categoryId === category.id)
      return {
        category,
        itemsCount: categoryTransactions.length,
        total: categoryTransactions.reduce((sum, t) => sum + t.amount, 0),
      }
    })
    .filter((summary) => summary.itemsCount > 0)

  return (
    <Page>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <Wallet className="h-4 w-4 text-purple-base" />
                Saldo total
              </div>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <ArrowUpCircle className="h-4 w-4 text-green-600" />
                Receitas do mês
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <ArrowDownCircle className="h-4 w-4 text-red-500" />
                Despesas do mês
              </div>
              <p className="text-2xl font-bold">{formatCurrency(totalExpense)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Transações recentes
              </CardTitle>
              <span className="flex items-center gap-1 text-sm font-medium text-primary">
                Ver todas
                <ChevronRight className="h-4 w-4" />
              </span>
            </CardHeader>
            <CardContent className="divide-y">
              {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`skeleton-transaction-${i}`}
                    className="h-16 animate-pulse rounded-lg bg-muted/50"
                  />
                ))}
              {!loading && recentTransactions.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nenhuma transação encontrada
                </p>
              )}
              {!loading &&
                recentTransactions.map((transaction) => (
                  <RecentTransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={setEditTarget}
                    onDelete={setDeleteTarget}
                  />
                ))}
            </CardContent>
            <CardFooter className="justify-center border-t">
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                onClick={() => setOpenCreate(true)}
              >
                <Plus className="h-4 w-4" />
                Nova transação
              </button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Categorias
              </CardTitle>
              <Link
                to="/categories"
                className="flex items-center gap-1 text-sm font-medium text-primary"
              >
                Gerenciar
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent className="divide-y">
              {loadingCategories &&
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`skeleton-category-${i}`}
                    className="h-10 animate-pulse rounded-lg bg-muted/50"
                  />
                ))}
              {!loadingCategories && categorySummaries.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nenhuma categoria com transações
                </p>
              )}
              {!loadingCategories &&
                categorySummaries.map(({ category, itemsCount, total }) => (
                  <CategorySummaryRow
                    key={category.id}
                    category={category}
                    itemsCount={itemsCount}
                    total={total}
                  />
                ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateTransactionDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreated={refetch}
      />
      <EditTransactionDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        transaction={editTarget}
        onUpdated={refetch}
      />
      <DeleteTransactionDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        transaction={deleteTarget}
        onDeleted={refetch}
      />
    </Page>
  )
}
