import { ApolloError } from 'apollo-server-express';
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware
} from 'type-graphql';
import { User } from '../entity/User';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { CRUDAction } from '../type/CRUDAction';
import { Message } from '../type/Message';
import { MyContext } from '../type/MyContext';
import { RoomChatEvent } from '../type/RoomChatEvent';
import { UNEXPECTED_ERROR } from '../utils/error-codes';
import { RoomChatEventTopic } from '../utils/subscription-topics';

@Resolver()
export class ExampleResolver {
  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async getMe(@Ctx() ctx: MyContext): Promise<User> {
    return ctx.user;
  }

  @Mutation(() => Number)
  @UseMiddleware(isAuthenticated)
  async enterRoom(
    @Arg('roomId') roomId: number,
    @Ctx() ctx: MyContext
  ): Promise<number> {
    ctx.req.session.roomId = roomId;
    return roomId;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async sendMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('text') text: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    try {
      const message: Message = {
        message: text,
        username: 'me',
        sendTime: new Date().getTime()
      };
      const payload: RoomChatEvent = {
        action: CRUDAction.CREATED,
        message: message
      };
      pubSub.publish(RoomChatEventTopic(ctx.roomId), payload);
    } catch (error) {
      throw new ApolloError(UNEXPECTED_ERROR.message, UNEXPECTED_ERROR.code);
    }
    return true;
  }

  @Subscription(() => RoomChatEvent, {
    topics: ({ context }) => {
      return RoomChatEventTopic(context.roomId);
    },
    filter: ({ context, args }) => {
      return args.roomId === context.roomId;
    }
  })
  @UseMiddleware(isAuthenticated)
  subscriptionChatEvent(
    //CRUD event
    @Arg('topic') topic: string,
    @Arg('roomId') roomId: number,
    @Root() chatEvent: RoomChatEvent
  ): RoomChatEvent {
    return chatEvent;
  }
}
