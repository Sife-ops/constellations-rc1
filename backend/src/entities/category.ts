import { Bookmark } from "./bookmark";
import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { User } from "./user";

import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  name: string;

  @Field(() => [Bookmark], { nullable: true })
  @ManyToMany(() => Bookmark, (bookmark) => bookmark.categories)
  @TypeormLoader()
  bookmarks: Bookmark[];

  @ManyToOne(() => User, (user) => user.categories, { onDelete: "CASCADE" })
  @TypeormLoader()
  user: User;
}
