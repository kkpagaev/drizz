import "./glob"
import * as dotenv from "dotenv"
import { InferSelectModel } from "drizzle-orm"
import { users } from "./schema"
import Fastify from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { client } from "./db"
import { ZodSchema } from "zod"
import api from "./api"
dotenv.config()

export type User = InferSelectModel<typeof users>

async function build() {
  const f = Fastify({
    logger: true
  })

  f.setValidatorCompiler<ZodSchema>((param) => {
    return (data) => {
      const result = param.schema.safeParse(data)
      if (result.success === true) {
        return {
          value: result.data
        }
      } else {
        return {
          error: result.error
        }
      }
    }
  }).setSerializerCompiler(({ schema }: { schema: ZodSchema }) => {
    return (data) => {
      const result = schema.safeParse(data)
      if (result.success) {
        return JSON.stringify(result.data)
      }

      return JSON.stringify({
        error: result.error
      })
    }
  })
  f.setErrorHandler<Error>(async (error, request, reply) => {
    f.log.error(error)
    return reply.status(400).send({
      status: 400,
      message: error.message
    })
  })

  return f.withTypeProvider<ZodTypeProvider>()
}

export type FastifyApp = Awaited<ReturnType<typeof build>>

async function main() {
  await client.connect()
  const f = await build()

  await f.register(api)

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
