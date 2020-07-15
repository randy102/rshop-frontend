import { gql } from "apollo-boost";

export const SIGN_CONTRACT = gql`
  mutation Sign($input: SignContractInput){
    signContract(input: $input){
      _id
    }
  }
`