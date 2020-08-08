import { gql } from "apollo-boost";

export const GET_BRANDS = gql`
  query Brands($idShop: String){
    brands(idShop: $idShop){
      _id
      name
      intro
      img
    }
  }
`

export const CREATE_BRAND = gql`
  mutation Create($idShop: String, $input: CreateBrandInput){
    createBrand(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_BRAND = gql`
  mutation Update($idShop: String, $input: UpdateBrandInput){
    updateBrand(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_BRAND = gql`
  mutation Delete($idShop: String, $ids: [String]){
    deleteBrand(idShop: $idShop, ids: $ids)
  }
`

