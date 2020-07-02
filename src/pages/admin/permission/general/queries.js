import { gql } from "apollo-boost";

export const GET_PERMISSION =  gql`
  query{
    permissions {
      _id
      name
      description
    }
  }
`

export const DELETE_PERMISSION = gql`
  mutation DeletePermission($input: DeletePermissionInput){
    deletePermission(input: $input)
  }
`

export const CREATE_PERMISSION = gql`
  mutation CreatePermission($input: CreatePermissionInput){
    createPermission(input: $input){
      _id
    }
  }
`

export const UPDATE_PERMISSION = gql`
  mutation updatePermission($input: UpdatePermissionInput){
    updatePermission(input: $input){
      _id
    }
  }
`