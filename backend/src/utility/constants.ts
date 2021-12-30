export const env = {
  dev: process.env.DEV ? true : false,
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  seed: process.env.SEED ? true : false,
};
