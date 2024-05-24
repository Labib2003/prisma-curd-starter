import app from "./app";
import { env } from "./env";

async function main() {
  app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
}

main();
