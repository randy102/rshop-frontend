import { gql } from "apollo-boost";

export const GET_USERS = gql`
  query{
    users{
      _id
      credential {
        email
      }
      profile {
        fullName
      }
      isAdmin
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput){
    createUser(input: $input){
      credential{
        email
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateAdmin($input: UpdateAdminInput){
    updateAdmin(input: $input){
      credential{
        email
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($input: DeleteUserInput){
    deleteUser(input: $input)
  }
`