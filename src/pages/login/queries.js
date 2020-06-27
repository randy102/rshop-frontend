import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput){
    loginUser(input: $input)
  }
`