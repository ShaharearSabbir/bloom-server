import app from "./app";
import { env } from "./config/dotenv";

const PORT = env.PORT || 5000;

async function bootstrap() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Bloom server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
