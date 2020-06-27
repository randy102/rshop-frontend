import { gql } from "apollo-boost";

export const GET_USERS = gql`
  query{
    users{
      _id
      credential {
        email
      }
      profile {
        fullName
      }
      isAdmin
    }
  }
`