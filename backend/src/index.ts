import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";
import { env } from "./utility/constants";
import { seed } from "./utility/mock";

import { Bookmark } from "./entities/bookmark";
import { BookmarkResolver } from "./resolvers/bookmark";
import { Category } from "./entities/category";
import { CategoryResolver } from "./resolvers/category";
import { HelloWorldResolver } from "./resolvers/hwResolver";
import { User } from "./entities/user";
import { UserResolver } from "./resolvers/user";

(async function main() {
  const db = await createConnection({
    type: "sqlite",
    database: "./db.sqlite3",
    dropSchema: env.dev,
    entities: [
      //
      Bookmark,
      Category,
      User,
    ],
    synchronize: true,
    logging: false,
  });

  if (env.dev) {
    await seed();
  }

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        BookmarkResolver,
        CategoryResolver,
        HelloWorldResolver,
        UserResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(env.port, () => {
    console.log(`running on ${env.port}`);
  });
})();
