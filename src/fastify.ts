import { ZodTypeProvider } from "fastify-type-provider-zod"
import Fastify from "fastify"
import { ZodSchema } from "zod"
import api from "./api"
import { client } from "./db"

export async function buildFastify() {
  await client.connect()

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

  await f.register(api, {
    prefix: "/api"
  })

  return f.withTypeProvider<ZodTypeProvider>()
}
