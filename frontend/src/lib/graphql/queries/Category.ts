import { gql } from '@apollo/client'

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      name
      color
      icon
      description
      type
      userId
      itemsCount
      createdAt
      updatedAt
    }
  }
`
