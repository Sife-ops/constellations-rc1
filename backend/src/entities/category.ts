import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Bookmark } from "./bookmark";

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
}
