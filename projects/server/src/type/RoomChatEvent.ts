import { Field, ObjectType } from 'type-graphql';
import { CRUDAction } from './CRUDAction';
import { Message } from './Message';

@ObjectType()
export class RoomChatEvent {
  @Field()
  action: CRUDAction;

  @Field()
  message: Message;
}
