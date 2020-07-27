import { gql } from "apollo-boost";

export const GET_ACTIVE_CONTRACT = gql`
  query{
    activeContract{
      _id
    }
  }
`
export const GET_USER_SHOPS = gql`
  query{
    userShops{
      _id
      name
      domain
      isActive
      brandImg
      template{
        _id
        name
        code
      }
    }
  }
`