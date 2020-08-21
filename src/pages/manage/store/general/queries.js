import { gql } from "apollo-boost";

export const GET_STORE = gql`
  query Stores($idShop: String){
    stores(idShop: $idShop){
      _id
      name
      address
      createdAt
      creator {
        profile {fullName}
      }
    }
  }
`

export const CREATE_STORE = gql`
  mutation Create($idShop: String, $input: CreateStoreInput){
    createStore(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_STORE = gql`
  mutation UpdateStore($idShop: String, $input: UpdateStoreInput){
    updateStore(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_STORE = gql`
  mutation DeleteStore($idShop: String, $ids: [String]){
    deleteStore(idShop: $idShop, ids: $ids)
  }
`

export const GET_STORE_STOCKS = gql`
  query StocksByStore($idShop: String, $idStore: String){
    stocksByStore(idShop: $idShop, idStore: $idStore){
      _id
      name
      code
      imgs
      product {
        name
        category {name}
        brand {name}
      }
      records {
        quantity
        store {_id}
        updatedAt
        createdAt
      }
      updatedAt
    }
  }
`
