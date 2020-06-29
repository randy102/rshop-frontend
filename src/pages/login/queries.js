import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput){
    loginUser(input: $input){
      token
      user {
        _id
        isAdmin
        profile {
          avatar
          fullName
          dob
          phone
          address
        }
        credential {
          email
        }
      }
    }
  }
`