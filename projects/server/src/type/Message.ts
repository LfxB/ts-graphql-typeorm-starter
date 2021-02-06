import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Message {
  @Field() username: string;
  @Field() message: string;
  @Field() sendTime: number;
}
