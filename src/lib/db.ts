import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

export const sql = postgres(connectionString, {
  ssl: "require",
  prepare: false,
});
