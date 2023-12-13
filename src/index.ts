import * as dotenv from "dotenv"
import { InferSelectModel } from "drizzle-orm"
import { users } from "./schema"
import { client } from "./db"
dotenv.config()

export type User = InferSelectModel<typeof users>

function foo(a: number, b: number): number {
  return a + b
}

async function main() {
  await client.connect()

  console.log(foo(2, 3))
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
