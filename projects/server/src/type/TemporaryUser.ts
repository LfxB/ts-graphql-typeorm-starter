import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class TemporaryUser {
  @Field() username: string;
  @Field() created: number;
}
