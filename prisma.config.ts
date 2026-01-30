import { env } from "./src/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./src/prisma/schema",
  migrations: {
    path: "./src/prisma/generated/migrations",
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});
