import { ApolloError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../type/MyContext';
import { UNAUTHENTICATED } from '../utils/error-codes';

export const isAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  // if (!context.user) {
  //   throw new ApolloError(UNAUTHENTICATED.message, UNAUTHENTICATED.code);
  // }
  return next();
};
