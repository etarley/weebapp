
import { createClient } from "@libsql/client";
import dotenv from 'dotenv';
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

dotenv.config()

const env = process.env


const runMigrate = async () => {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  });

  const db = drizzle(client);

  try {
    console.log("⏳ Running migrations...");
    const start = Date.now();

    await migrate(db, {
      migrationsFolder: "./drizzle",
    });

    const end = Date.now();
    console.log(`✅ Migrations completed in ${end - start}ms`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed");
    console.error("Error details:", error);

    if (error instanceof Error) {
      const match = error.message.match(/at \((\d+), (\d+)\)/);
      if (match) {
        const [_, line, column] = match;
        console.error(`Error location: line ${line}, column ${column}`);
      }
    }

    process.exit(1);
  } finally {
    await client.close();
  }
};

runMigrate();