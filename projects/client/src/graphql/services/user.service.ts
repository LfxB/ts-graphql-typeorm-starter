import { gql } from '@apollo/client';
import graphqlClient from '../client';

export const LOGIN_QUERY = gql`
  query login($username: String) {
    login(username: $username) {
      username
      created
    }
  }
`;

export const login = (username: string) => {
  return graphqlClient.query({
    query: LOGIN_QUERY,
    variables: {
      username
    }
  });
};

export const CHECK_USER_QUERY = gql`
  query {
    checkUser {
      username
      created
    }
  }
`;

export const checkUser = () => {
  return graphqlClient.query({
    query: CHECK_USER_QUERY
  });
};

// Example usage in a react component
// const checkLoginComponent = (props: any) => {
//   useEffect(() => {
//     (async () => {
//       try {
//         const user = await checkUser();
//         // success, put user obj in global state, for example.
//       } catch (error) {
//         if (error.extensions.code === 'NO_USER_FOUND') {
//           props.navigate('/login') // navigate to user login page
//         }
//       }
//     })();
//   }, []);
//   return null;
// };
