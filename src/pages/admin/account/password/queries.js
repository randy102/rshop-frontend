import { gql } from "apollo-boost";

export const CHANGE_USER_PASSWORD = gql`
  mutation ChangeUserPassword($input: ChangePasswordInput){
    changeUserPassword(input: $input)
  }
`
