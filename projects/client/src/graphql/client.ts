import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  credentials: 'include'
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_WS || '',
  options: {
    reconnect: true,
    lazy: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const graphqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include'
});

export default graphqlClient;
