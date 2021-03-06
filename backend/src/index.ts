import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { Bookmark } from "./entities/bookmark";
import { BookmarkResolver } from "./resolvers/bookmark";
import { Category } from "./entities/category";
import { CategoryResolver } from "./resolvers/category";
import { HelloWorldResolver } from "./resolvers/hello-world";
import { User } from "./entities/user";
import { UserResolver } from "./resolvers/user";
import { buildSchema } from "type-graphql";
import { cookieOptions } from "./utility/constants";
import { createConnection, getConnection } from "typeorm";
import { env } from "./utility/constants";
import { newAccessToken, newRefreshToken } from "./utility/token";
import { seed } from "./utility/mock";
import { verify } from "jsonwebtoken";

(async function main() {
  //^
  await createConnection({
    type: "sqlite",
    database: "./database/db.sqlite3",
    dropSchema: env.seed,
    entities: [Bookmark, Category, User],
    synchronize: true,
    logging: false,
  });

  if (env.seed) {
    await seed();
  }
  //$

  const app = express();

  const origin = ["https://studio.apollographql.com", "http://localhost:3000"];
  app.use(
    cors({
      origin: env.ngrok ? origin.concat(env.ngrok) : origin,
      credentials: true,
    })
  );
  app.use(cookieParser());

  //^
  app.get("/test", (req: Request, res: Response) => {
    res.json({
      message: "yes",
    });
  });

  app.post("/refresh", (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const bad = { ok: false, accessToken: "" };

    if (!refreshToken) return res.json(bad);

    let payload: any;
    try {
      payload = verify(refreshToken, env.secret_refresh_token);
    } catch (e) {
      console.log(e);
      return res.json(bad);
    }

    const newPayload = {
      userId: payload.userId,
      username: payload.username,
    };

    res.cookie("refreshToken", newRefreshToken(newPayload), cookieOptions);
    res.json({ ok: true, accessToken: newAccessToken(newPayload) });
  });

  app.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("refreshToken", cookieOptions);
    res.json({
      ok: true,
    });
  });
  //$

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

  server.applyMiddleware({ app, cors: false });

  app.listen(env.port, () => {
    console.log(`running on ${env.port}`);
  });
})();

// vim: fdm=marker fmr=//^,//$
