import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Informe o nome.')
    .max(60, 'O nome deve ter no máximo 60 caracteres.'),
  description: z
    .string()
    .trim()
    .max(200, 'A descrição deve ter no máximo 200 caracteres.')
    .optional(),
  type: z.enum(['income', 'expense']),
  color: z.string().trim().min(1, 'Selecione uma cor.'),
  icon: z.string().trim().min(1, 'Selecione um ícone.'),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>

export type CategoryFormErrors = Partial<Record<keyof CategoryFormValues, string>>

export function parseCategoryForm(values: CategoryFormValues) {
  const result = categoryFormSchema.safeParse(values)

  if (result.success) {
    return { success: true as const, data: result.data }
  }

  const errors: CategoryFormErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof CategoryFormValues
    if (!errors[key]) errors[key] = issue.message
  }

  return { success: false as const, errors }
}
