import ApolloClient from 'apollo-boost'
import { Jwt } from 'utils/jwt'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  headers: {
    token: Jwt.get()
  }
})

export {client}