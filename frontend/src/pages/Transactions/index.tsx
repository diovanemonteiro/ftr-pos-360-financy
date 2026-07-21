import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ChevronLeft, ChevronRight, Plus, Search, Wallet } from 'lucide-react'
import { Page } from '@/components/Page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/Transaction'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/Category'
import { CreateTransactionDialog } from '@/pages/Transactions/components/CreateTransactionDialog.tsx'
import { EditTransactionDialog } from '@/pages/Transactions/components/EditTransactionDialog.tsx'
import { DeleteTransactionDialog } from '@/pages/Transactions/components/DeleteTransactionDialog.tsx'
import type { Category, Transaction } from '@/types'
import { TransactionRow } from './components/TransactionRow'

const PAGE_SIZE = 10

function periodKey(date: string) {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function periodLabel(key: string) {
  const [year, month] = key.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date)
  return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} / ${year}`
}

export function Transactions() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [page, setPage] = useState(1)

  const [openCreate, setOpenCreate] = useState(false)
  const [editTarget, setEditTarget] = useState<Transaction | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null)

  const { data, loading, refetch } = useQuery<{ listTransactions: Transaction[] }>(
    LIST_TRANSACTIONS
  )
  const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)

  const transactions = data?.listTransactions || []
  const categories = categoriesData?.listCategories || []

  const periods = useMemo(() => {
    const keys = new Set(transactions.map((t) => periodKey(t.createdAt)))
    return Array.from(keys).sort((a, b) => (a < b ? 1 : -1))
  }, [transactions])

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
      .filter((t) => typeFilter === 'all' || t.type === typeFilter)
      .filter((t) => categoryFilter === 'all' || t.categoryId === categoryFilter)
      .filter((t) => periodFilter === 'all' || periodKey(t.createdAt) === periodFilter)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [transactions, search, typeFilter, categoryFilter, periodFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const updateFilter = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    setPage(1)
  }

  return (
    <Page>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-8">Transações</h1>
            <p className="text-base font-normal text-gray-600 leading-6">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Button onClick={() => setOpenCreate(true)}>
            <Plus className="h-4 w-4" />
            Nova transação
          </Button>
        </div>

        <div className="grid gap-4 rounded-xl border bg-card p-6 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Buscar</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por descrição"
                className="pl-8"
                value={search}
                onChange={(e) => updateFilter(setSearch)(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={typeFilter} onValueChange={updateFilter(setTypeFilter)}>
              <SelectTrigger size="md" className="w-full">
                <SelectValue>
                  {(value: string) =>
                    ({ all: 'Todos', income: 'Receita', expense: 'Despesa' })[value]
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
                value={categoryFilter}
                onValueChange={updateFilter(setCategoryFilter)}
            >
              <SelectTrigger size="md" className="w-full">
                <SelectValue>
                  {(value: string) =>
                    value === 'all'
                      ? 'Todas'
                      : categories.find((c) => c.id === value)?.name
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                      key={category.id}
                      value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Período</Label>
            <Select value={periodFilter} onValueChange={updateFilter(setPeriodFilter)}>
              <SelectTrigger size="md" className="w-full">
                <SelectValue>
                  {(value: string) => (value === 'all' ? 'Todos os períodos' : periodLabel(value))}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="all">Todos os períodos</SelectItem>
                {periods.map((key) => (
                  <SelectItem key={key} value={key}>
                    {periodLabel(key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.7fr_0.9fr_0.8fr] gap-4 border-b px-6 py-5 text-xs font-semibold leading-4 tracking-wider text-gray-500 uppercase">
            <span>Descrição</span>
            <span>Data</span>
            <span>Categoria</span>
            <span>Tipo</span>
            <span className="text-right">Valor</span>
            <span className="text-right">Ações</span>
          </div>

          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="border-b px-6 py-4 last:border-b-0">
                <div className="h-10 animate-pulse rounded-lg bg-muted/50" />
              </div>
            ))}

          {!loading && paginated.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Wallet className="mb-4 h-12 w-12 opacity-30" />
              <p className="text-lg font-medium">Nenhuma transação encontrada</p>
              <p className="text-sm">Ajuste os filtros ou crie uma nova transação</p>
            </div>
          )}

          {!loading &&
            paginated.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}

          {!loading && filtered.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-sm text-muted-foreground">
                {(currentPage - 1) * PAGE_SIZE + 1} a{' '}
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} | {filtered.length} resultados
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="icon-sm"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
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
