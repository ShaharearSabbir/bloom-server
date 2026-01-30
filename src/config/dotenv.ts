import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVariables = [
  "APP_NAME",
  "VERSION",
  "PORT",
  "DATABASE_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "FRONTEND_URL",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
] as const;

type Env = Record<(typeof envVariables)[number], string>;

export let env: Env = {} as Env;

envVariables.forEach((environment) => {
  if (typeof process.env[environment] !== "string") {
    throw new Error(`Please add ${environment} on environment variables`);
  }
  env[environment] = process.env[environment];
});
