import { gql } from "apollo-boost";

export const CREATE_SHOP = gql`
  mutation Create($input: CreateShopInput){
    createShop(input: $input){
      _id
      name
      isActive
      domain
      brandImg
      template {
        _id
        name
        code
      }
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