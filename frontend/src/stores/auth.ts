import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apolloClient } from '@/lib/graphql/apollo'
import type { User, RegisterInput, LoginInput } from '@/types'
import { LOGIN, REGISTER } from '@/lib/graphql/mutations/Auth'

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

type RegisterMutationData = {
  register: {
    token: string
    refreshToken: string
    user: User
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (data: LoginInput) => Promise<boolean>
  signup: (data: RegisterInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (loginData: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
            mutation: LOGIN,
            variables: { data: { email: loginData.email, password: loginData.password } },
          })
          if (data?.login) {
            const { user, token } = data.login
            set({ user, token, isAuthenticated: true })
            return true
          }
          return false
        } catch (error) {
          console.log('Erro ao fazer o login')
          throw error
        }
      },
      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          })
          if (data?.register) {
            const { token, user } = data.register
            set({ user, token, isAuthenticated: true })
            return true
          }
          return false
        } catch (error) {
          console.log('Erro ao fazer o cadastro')
          throw error
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        apolloClient.clearStore()
      },
    }),
    { name: 'financy-auth-storage' }
  )
)
