import { gql } from "apollo-boost"

export const GET_STOCKS = gql`
  query Stocks($idShop: String){
    stocks(idShop: $idShop){
      _id
      name
      code
      imgs
      product {
        name
        category {name}
        brand {name}
      }
      records(idShop: $idShop) {
        quantity
        store {name,_id}
        updatedAt
      }
      updatedAt
    }
  }
`

export const TRANSFER_STORE = gql`
  mutation TransferStore($idShop: String, $input: TransferStoreInput){
    transferStore(idShop: $idShop, input: $input){
      _id
    }
  }
`