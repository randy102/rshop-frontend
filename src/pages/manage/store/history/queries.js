import { gql } from "apollo-boost";

export const GET_STORE_TRANSFER = gql`
  query StoreStransfer($idShop: String){
    storeTransfers(idShop: $idShop){
      _id
      src {name}
      des {name}
      type
      note
      items{
        stock {
          name
          product {name}
        }
        quantity
      }

      createdAt
      creator { 
        profile {fullName}
      }
    }
  }
`