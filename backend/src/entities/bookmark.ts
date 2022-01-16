import { Category } from "./category";
import { Field, ObjectType, ID } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { User } from "./user";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";

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

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: "CASCADE" })
  @TypeormLoader()
  user: User;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, (category) => category.bookmarks)
  @JoinTable()
  @TypeormLoader()
  categories: Category[];
}
