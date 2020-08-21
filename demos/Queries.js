import { gql } from "apollo-boost";

export const GET_ = gql`
  query Get($idShop: String){
    (idShop: $idShop){
      _id
      
    }
  }
`

export const CREATE_ = gql`
  mutation Create($idShop: String, $input: CreateInput){
    create(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_ = gql`
  mutation Update($idShop: String, $input: UpdateInput){
    update(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_ = gql`
  mutation Delete($idShop: String, $ids: [String]){
    delete(idShop: $idShop, ids: $ids)
  }
`

