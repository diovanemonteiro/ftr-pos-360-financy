import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transaction'
import { formatCurrency } from '@/lib/utils'
import type { Transaction } from '@/types'
import { TransactionCard } from './components/TransactionCard'
import { CreateTransactionDialog } from './components/CreateTransactionDialog'
import { EditTransactionDialog } from './components/EditTransactionDialog'
import { DeleteTransactionDialog } from './components/DeleteTransactionDialog'

export function Dashboard() {
  const [openCreate, setOpenCreate] = useState(false)
  const [editTarget, setEditTarget] = useState<Transaction | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null)

  const { data, loading, refetch } = useQuery<{ listTransactions: Transaction[] }>(
    LIST_TRANSACTIONS
  )

  const transactions = data?.listTransactions || []

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-primary">Transações</h1>
          <Button onClick={() => setOpenCreate(true)}>
            <Plus className="h-4 w-4" />
            Nova transação
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatCurrency(balance)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-16 rounded-lg border border-dashed border-muted-foreground/30 animate-pulse"
              />
            ))}
          {!loading && transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Wallet className="h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">Nenhuma transação encontrada</p>
              <p className="text-sm">Clique em "Nova transação" para começar</p>
            </div>
          )}
          {!loading &&
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
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
