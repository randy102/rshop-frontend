import { gql } from "apollo-boost";

export const CREATE_SHOP = gql`
  mutation Create($input: CreateShopInput){
    createShop(input: $input){
      _id
    }
  }
`

export const GET_TEMPLATES = gql`
  query{
    activeTemplates{
      _id
      name
      demoImg
    }
  }
`