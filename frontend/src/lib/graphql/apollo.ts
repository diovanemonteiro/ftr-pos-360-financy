import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { useAuthStore } from '../../stores/auth'
import { redirectToLogin } from '../navigation'

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
})

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const isAuthError = (error: unknown) => {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some((graphQLError) => graphQLError.message === 'Usuário não autenticado!')
  }
  return false
}

const errorLink = new ErrorLink(({ error }) => {
  if (isAuthError(error) && useAuthStore.getState().isAuthenticated) {
    useAuthStore.getState().logout()
    redirectToLogin()
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})
