import { gql } from "apollo-boost";

export const GET_ACTIVE_PLANS = gql`
  query{
    publishedPlans{
      _id
      name
      duration
      price
      description
    }
  }
`