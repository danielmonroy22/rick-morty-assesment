import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // You can change this if needed
  cache: new InMemoryCache(),
});
