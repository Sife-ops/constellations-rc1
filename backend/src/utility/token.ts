import { env } from "./constants";
import { sign } from "jsonwebtoken";

export const newAccessToken = (payload: any) => {
  return sign(payload, env.secret_access_token, {
    expiresIn: env.expiry_access,
  });
};

export const newRefreshToken = (payload: any) => {
  return sign(payload, env.secret_refresh_token, {
    expiresIn: env.expiry_refresh,
  });
};
