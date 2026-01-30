import express from "express";
import { env } from "./config";
import { toNodeHandler } from "better-auth/node";
import auth from "./lib/auth";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`${env.APP_NAME} Server is running`);
});

app.all("/api/auth/*splat", toNodeHandler(auth));

export default app;
