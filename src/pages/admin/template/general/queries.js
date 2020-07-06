import { gql } from "apollo-boost";

export const GET_TEMPLATES = gql`
  query{
    templates{
      _id
      name
      code
      isActive
      demoImg
    }
  }
`

export const CREATE_TEMPLATES = gql`
  mutation Create($input: CreateTemplateInput){
    createTemplate(input: $input){
      _id
    }
  }
`

export const UPDATE_TEMPLATES = gql`
  mutation Update($input: UpdateTemplateInput){
    updateTemplate(input: $input){
      _id
    }
  }
`