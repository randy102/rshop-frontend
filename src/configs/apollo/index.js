import { ApolloClient } from 'apollo-client'
import { Jwt } from 'utils/jwt'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-boost';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI
});
const authLink = setContext((_, { headers }) => {
  
  const token = Jwt.get();
 
  return {
    headers: {
      ...headers,
      token,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export {client}