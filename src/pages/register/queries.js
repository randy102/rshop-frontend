import { gql } from "apollo-boost";

export const REQUEST_CONFIRM = gql`
  mutation RequestEmailConfirm($input: RequestEmailConfirmInput){
    requestEmailConfirm(input: $input)
  }
`
