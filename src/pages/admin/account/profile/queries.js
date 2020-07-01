import { gql } from "apollo-boost";

export const GET_USER_PROFILE = gql`
  query{
    currentUser{
      _id
      profile{
        dob
        address
        fullName
        phone
        avatar
      }
      credential{
        email
      }
    }
  }
`

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateProfileInput){
    updateUserProfile(input: $input){
      fullName
    }
  }
`