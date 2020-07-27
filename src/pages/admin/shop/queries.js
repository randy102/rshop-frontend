import { gql } from "apollo-boost";

export const GET_SHOPS = gql`
  query{
    shops{
      _id
      name
      domain
      isActive
      brandImg
      createdAt
      master{
        credential{
          email
        }
        profile{
          fullName
        }
      }
      template{
        _id
        name
        code
      }
    }
  }
`