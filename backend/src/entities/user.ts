import { Bookmark } from "./bookmark";
import { Category } from "./category";
import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

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

  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, (category) => category.user)
  @TypeormLoader()
  category: Category[];
}
