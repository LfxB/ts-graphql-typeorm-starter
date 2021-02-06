import { Matches } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
@Index('username_unique_idx', { synchronize: false })
@Index('email_unique_idx', { synchronize: false })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Matches(/^(?![a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$)/gi)
  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  password: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true
  })
  email: string;

  @Field()
  @Column({
    type: 'boolean',
    default: false,
    nullable: false
  })
  emailConfirmed: boolean;

  @Field()
  @Column({
    type: 'boolean',
    default: false,
    nullable: false
  })
  isAdmin: boolean;
}
