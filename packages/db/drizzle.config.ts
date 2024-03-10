import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config()
export default {
  schema: "./schemas",
  driver:"turso",
  out: "./migrations",
  dbCredentials:{
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  verbose:true,
  strict:true
} satisfies Config;