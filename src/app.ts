import express from "express";
import { env } from "./config";


const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`${env.APP_NAME} Server is running`);
});

export default app;
