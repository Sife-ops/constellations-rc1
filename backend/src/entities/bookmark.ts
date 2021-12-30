import { Field, ObjectType, ID } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Category } from "./category";
import { User } from "./user";

@ObjectType()
@Entity()
export class Bookmark extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  url: string;

  @Field()
  @Column("text")
  description: string;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, (category) => category.bookmarks)
  @JoinTable()
  @TypeormLoader()
  categories: Category[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bookmarks)
  @TypeormLoader()
  user: User;
}
