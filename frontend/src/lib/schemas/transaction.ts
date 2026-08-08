import { z } from 'zod'

export const transactionFormSchema = z.object({
  type: z.enum(['income', 'expense']),
  description: z
    .string()
    .trim()
    .min(1, 'Informe uma descrição.')
    .max(120, 'A descrição deve ter no máximo 120 caracteres.'),
  amount: z
    .string()
    .trim()
    .min(1, 'Informe o valor.')
    .refine((value) => !Number.isNaN(Number(value)), 'Informe um valor numérico válido.')
    .refine((value) => Number(value) > 0, 'O valor deve ser maior que zero.'),
  date: z.string().trim().min(1, 'Informe a data.'),
  categoryId: z.string().trim().min(1, 'Selecione uma categoria.'),
})

export type TransactionFormValues = z.infer<typeof transactionFormSchema>

export type TransactionFormErrors = Partial<Record<keyof TransactionFormValues, string>>

export function parseTransactionForm(values: TransactionFormValues) {
  const result = transactionFormSchema.safeParse(values)

  if (result.success) {
    return { success: true as const, data: result.data }
  }

  const errors: TransactionFormErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof TransactionFormValues
    if (!errors[key]) errors[key] = issue.message
  }

  return { success: false as const, errors }
}
