import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../type/MyContext';
import { TemporaryUser } from '../type/TemporaryUser';
import { NO_USER_FOUND } from '../utils/error-codes';
import { cacheStores } from '../utils/global-store/cache-store';

@Resolver()
export class UserResolver {
  @Query(() => TemporaryUser)
  async login(
    @Arg('username') username: string,
    @Ctx() ctx: MyContext
  ): Promise<TemporaryUser> {
    let tempUser: TemporaryUser = cacheStores.userSessionStore.get(
      ctx.req.session.id
    );
    if (!tempUser) {
      tempUser = {
        username,
        created: Date.now()
      };
      ctx.req.session.tempUser = tempUser;
      cacheStores.userSessionStore.set(ctx.req.session.id, tempUser);
    }
    return tempUser;
  }

  @Query(() => TemporaryUser)
  async checkUser(@Ctx() ctx: MyContext): Promise<TemporaryUser> {
    const tempUser: TemporaryUser = cacheStores.userSessionStore.get(
      ctx.req.session.id
    );
    if (!tempUser) {
      throw new ApolloError(NO_USER_FOUND.message, NO_USER_FOUND.code);
    }
    return tempUser;
  }
}
