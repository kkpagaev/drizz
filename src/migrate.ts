import { db, client } from "./db"
import { migrate } from "drizzle-orm/node-postgres/migrator"

async function run_migration() {
  await client.connect()

  await migrate(db, { migrationsFolder: "./drizzle/migrations" })

  await client.end()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run_migration()
