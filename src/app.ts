import express, { Application } from "express";
import { env } from "./config";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorRoutes } from "./modules/tutor/tutor.routes";
import { categoryRoutes } from "./modules/category/category.routes";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: [env.FRONTEND_URL, env.BETTER_AUTH_URL],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).send(`${env.APP_NAME} Server is running`);
});

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/tutors", tutorRoutes);

app.use("/api/categories", categoryRoutes);

export default app;
