import { gql } from "apollo-boost";

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput){
    registerUser(input: $input){
      credential {
        email
      }
    }
  }
`