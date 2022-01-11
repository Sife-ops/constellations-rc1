import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { Bookmark } from "./bookmark";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  username: string;

  @Column("text")
  password: string;

  @Field(() => [Bookmark], { nullable: true })
  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  @TypeormLoader()
  bookmarks: Bookmark[];
}
