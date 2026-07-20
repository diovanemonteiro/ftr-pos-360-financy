import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      type
      description
      amount
      userId
      categoryId
      category {
        id
        name
        type
        icon
        color
      }
      createdAt
      updatedAt
    }
  }
`
