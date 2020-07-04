import { gql } from "apollo-boost";

export const GET_PLANS =gql`
  query{
    plans{
      _id
      name
      duration
      price
      state
      description
    }
  }
`

export const CREATE_PLAN = gql`
  mutation Create($input: CreateDraftPlanInput){
    createDraftPlan(input: $input){
      _id
    }
  }
`

export const UPDATE_PLAN = gql`
  mutation Update($input: UpdateDraftPlanInput){
    updateDraftPlan(input: $input){
      _id
    }
  }
`

export const DELETE_PLAN = gql`
  mutation Delete($ids: [String]){
    deleteDraftPlan(ids: $ids)
  }
`

export const PUBLISH_PLAN = gql`
  mutation Puplish($id: String){
    publishPlan(id: $id){
      _id
    }
  }
`

export const SUPPRESS_PLAN = gql`
  mutation Suppress($id: String){
    suppressPlan(id: $id){
      _id
    }
  }
`

