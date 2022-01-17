import { MiddlewareFn } from "type-graphql";
import { Request, Response } from "express";
import { env } from "./constants";
import { verify } from "jsonwebtoken";

export interface AuthContext {
  req: Request;
  res: Response;
  payload?: any;
}

export const auth: MiddlewareFn<AuthContext> = async ({ context }, next) => {
  const auth = context.req.headers["authorization"] as string;
  if (!auth) throw new Error("no authorization header");

  try {
    const accessToken = auth.split(" ")[1];
    const payload = verify(accessToken, env.secret_access_token);
    context.payload = payload as any;
  } catch (e) {
    console.log(e);
    throw new Error("bad token");
  }

  return next();
};

