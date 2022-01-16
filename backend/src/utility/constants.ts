export const env = {
  dev: process.env.DEV ? true : false,
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  seed: process.env.SEED ? true : false,
  secret_access_token: process.env.SECRET_ACCESS_TOKEN || "access",
  secret_refresh_token: process.env.SECRET_ACCESS_TOKEN || "refresh",
  expiry_access: "24h",
  expiry_refresh: "7d",
};
