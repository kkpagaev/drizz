import "./glob"
import * as dotenv from "dotenv"
import { InferSelectModel } from "drizzle-orm"
import { users } from "./schema"
import { buildFastify } from "./fastify"
dotenv.config()

export type User = InferSelectModel<typeof users>

export type FastifyApp = Awaited<ReturnType<typeof buildFastify>>

async function main() {
  const f = await buildFastify()

  f.listen({ port: 3000 }, (err, address) => {
    if (err) {
      f.log.error(err)
      process.exit(1)
    }
    f.log.info(`server listening on ${address}`)
  })
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
