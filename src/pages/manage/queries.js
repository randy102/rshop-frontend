import { gql } from "apollo-boost";

export const GET_ACTIVE_CONTRACT_AND_USER_SHOPS = gql`
  query{
    activeContract{
      _id
    }

    userShops{
      _id
    }
  }
`