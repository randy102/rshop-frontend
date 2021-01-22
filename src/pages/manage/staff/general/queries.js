import { gql } from "apollo-boost";

export const GET_STAFFS = gql`
  query Staffs($idShop: String){
    staffs(idShop: $idShop){
      _id
      name
      isMaster
      description
      user{
        _id
        profile{
          fullName
        }
        credential{
          email
        }
      }
      permissions{
        _id
        name
      }
    }
  }
`

export const CREATE_ROLE = gql`
  mutation CreateRole($idShop: String, $input: CreateRoleInput){
    createRole(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation CreateRole($idShop: String, $input: UpdateRoleInput){
    updateRole(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_ROLE = gql`
  mutation CreateRole($idShop: String, $id: String){
    deleteRole(idShop: $idShop, id: $id)
  }
`