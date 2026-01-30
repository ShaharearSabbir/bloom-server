import app from "./app.js";
import { env } from "./config";

const port = env.PORT;

app.listen(port, () => {
  console.log(`${env.APP_NAME} server is running on http://localhost:${port}`);
});
