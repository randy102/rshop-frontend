import { gql } from "apollo-boost";

export const GET_PRODUCTS = gql`
  query Get($idShop: String){
    products(idShop: $idShop){
      _id
      name
      description
      isActive

      category {
        _id
        name
        parent {
          name
          parent {
            name
          }
        }
      }
      brand {
        _id
        name
      }
      createdAt
      creator {
        profile {fullName}
      }
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation Create($idShop: String, $input: CreateProductInput){
    createProduct(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation Update($idShop: String, $input: UpdateProductInput){
    updateProduct(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation Delete($idShop: String, $ids: [String]){
    deleteProduct(idShop: $idShop, ids: $ids)
  }
`


export const GET_PRODUCT_STOCKS = gql`
  query Get($idShop: String, $idProduct: String){
    stocksByProduct(idShop: $idShop, idProduct: $idProduct){
      _id
      name
      salePrice
      imgs
      code
      info {
        long
        width
        height
        weight
      }
      createdAt
      creator {
        profile {fullName}
      }
    }
  }
`

export const CREATE_STOCK = gql`
  mutation Create($idShop: String, $input: CreateStockInput){
    createStock(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const UPDATE_STOCK = gql`
  mutation Update($idShop: String, $input: UpdateStockInput){
    updateStock(idShop: $idShop, input: $input){
      _id
    }
  }
`

export const DELETE_STOCK = gql`
  mutation Delete($idShop: String, $ids: [String]){
    deleteStock(idShop: $idShop, ids: $ids)
  }
`

export const GET_CATEGORIES = gql`
  query Categories($idShop: String){
    categories(idShop: $idShop){
      _id
      name
      parent {
        name
        parent {
          name
        }
      }
    }
  }
`

export const GET_BRANDS = gql`
query Brands($idShop: String){
  brands(idShop: $idShop){
    _id
    name
  }
}
`