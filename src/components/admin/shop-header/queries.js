import { gql } from "apollo-boost";

export const GET_USER_SHOPS = gql`
  query{
    userShops{
      _id
      name
      isActive
    }
  }
`