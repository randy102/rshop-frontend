import { gql } from "apollo-boost";

export const GET_CATEGORIES = gql`
  query Categories($idShop: String){
    categories(idShop: $idShop){
      _id
      name
      idParent
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation Create($idShop: String, $input: CreateCategoryInput){
    createCategory(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation Update($idShop: String, $input: UpdateCategoryInput){
    updateCategory(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation Create($idShop: String, $id: String){
    deleteCategory(idShop: $idShop, id: $id)
  }
`