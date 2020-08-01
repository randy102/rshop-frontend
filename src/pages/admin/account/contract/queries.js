import { gql } from "apollo-boost";

export const GET_ACTIVE_CONTRACT = gql`
  query{
    activeContract{
      _id
      plan {
        name
        duration
      }
      expDate
      signDate
    }
  }
`