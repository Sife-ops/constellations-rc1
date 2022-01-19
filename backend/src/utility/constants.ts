import { CookieOptions } from "express";

export const env = {
  dev: process.env.DEV ? true : false,
  expiry_access: "24h",
  expiry_refresh: "7d",
  // expiry_access: "15s",
  // expiry_refresh: "30s",
  ngrok: process.env.REACT_APP_NGROK || null,
  port: process.env.DEV ? 4000 : 80,
  secret_access_token: process.env.SECRET_ACCESS_TOKEN || "access",
  secret_refresh_token: process.env.SECRET_ACCESS_TOKEN || "refresh",
  seed: process.env.SEED ? true : false,
};

export const cookieOptions: CookieOptions = {
  // secure: true,
  httpOnly: true,
  sameSite: "lax",
};
