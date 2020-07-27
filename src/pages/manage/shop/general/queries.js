import { gql } from "apollo-boost";

export const GET_SHOP = gql`
  query ShopByDomain($domain: String){
    shopByDomain(domain: $domain){
      _id
      name
      domain
      isActive
      brandImg
      template {
        _id
        name
        demoImg
      }
    }
  }
`

export const UPDATE_SHOP = gql`
  mutation UpdateShop($input: UpdateShopInput){
    updateShop(input: $input){
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