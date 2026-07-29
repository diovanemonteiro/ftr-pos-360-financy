import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client/react'
import { LogOut, Mail, User } from 'lucide-react'
import { toast } from 'sonner'
import { Page } from '@/components/Page'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { ME } from '@/lib/graphql/queries/User'
import { UPDATE_USER } from '@/lib/graphql/mutations/User'
import { useAuthStore } from '@/stores/auth'
import { getInitials } from '@/lib/utils'
import type { User as UserType } from '@/types'

type MeQueryData = {
  me: UserType
}

type UpdateUserMutationData = {
  updateUser: UserType
}

export function Profile() {
  const { user, setUser, logout } = useAuthStore()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? '')

  const { data } = useQuery<MeQueryData>(ME, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data?.me) {
      setUser(data.me)
      setName(data.me.name)
    }
  }, [data, setUser])

  const [updateUser, { loading }] = useMutation<UpdateUserMutationData, { data: { name: string } }>(
    UPDATE_USER,
    {
      onCompleted(result) {
        setUser(result.updateUser)
        toast.success('Perfil atualizado com sucesso!')
      },
      onError() {
        toast.error('Erro ao atualizar o perfil.')
      },
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({ variables: { data: { name: name.trim() } } })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Page>
      <Card className="mx-auto w-full max-w-md rounded-lg py-8">
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="size-16">
              <AvatarFallback className="bg-gray-200 text-xl font-medium text-gray-800">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h1 className="text-xl leading-7 font-bold text-gray-800">{user?.name}</h1>
              <p className="text-base leading-6 font-normal text-gray-600">{user?.email}</p>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-9"
                  required
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user?.email ?? ''}
                  className="px-9 disabled:opacity-100 disabled:text-muted-foreground"
                  disabled
                  readOnly
                />
              </div>
              <FieldDescription>O e-mail não pode ser alterado</FieldDescription>
            </Field>

            <Button type="submit" size="md" className="w-full" disabled={loading || !name.trim()}>
              <span className="text-base leading-6 font-medium text-background">
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </span>
            </Button>
          </form>

          <Button variant="outline" size="md" className="w-full" onClick={handleLogout}>
            <LogOut className="size-4 text-destructive" />
            <span className="text-base leading-6 font-medium text-gray-700">Sair da conta</span>
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
