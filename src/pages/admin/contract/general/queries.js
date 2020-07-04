import { gql } from "apollo-boost";

export const GET_CONTRACTS = gql`
  query{
    contracts{
      _id
      user{
        profile{
          fullName
        }
        credential{
          email
        }
      }
      plan{
        name
      }
      expDate
      signDate
    }
  }
`

export const PUBLISHED_PLANS = gql`
  query{
    publishedPlans{
      _id
      name
      duration
      price
    }
  }
`

export const CREATE_CONTRACT = gql`
  mutation Create($input: CreateContractInput){
    createContract(input: $input){
      _id
    }
  }
`