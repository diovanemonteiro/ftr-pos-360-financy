import { gql } from '@apollo/client'

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      title
      amount
      type
      date
      description
      userId
      categoryId
      category {
        id
        name
        color
        type
      }
      createdAt
      updatedAt
    }
  }
`
