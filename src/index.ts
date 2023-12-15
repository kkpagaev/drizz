import * as dotenv from "dotenv"
import { InferSelectModel } from "drizzle-orm"
import { users } from "./schema"
import Fastify, { HTTPMethods } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { client, db } from "./db"
import { ZodSchema, z } from "zod"
dotenv.config()

export type User = InferSelectModel<typeof users>

function build() {
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

  f.get("/users", async () => {
    const usrs = await db.select().from(users)

    return usrs
  })

  return f.withTypeProvider<ZodTypeProvider>()
}
type FastifyApp = ReturnType<typeof build>

type Role = "admin" | "user"

type RouteParamAdditional = {
  auth?: "try" | "admin" | "user"
  role?: Role
}

type RouteParam = Parameters<FastifyApp["route"]>[0]

type CreateRouteParam = Omit<RouteParam, "url" | "method"> &
  RouteParamAdditional

function createRoute(route: CreateRouteParam) {
  const r = route as RouteParam
  return (fastify: FastifyApp, url: string, method: HTTPMethods) => {
    r.url = url
    r.method = method
    fastify.route(r)
  }
}

createRoute({
  schema: {
    body: z.object({
      username: z.string().max(32).describe("Some description for username"),
      password: z.string().max(32)
    })
  },
  handler: async (req, res) => {}
})

async function main() {
  await client.connect()
  const f = build()
  const LOGIN_SCHEMA = z.object({
    username: z.string().max(32).describe("Some description for username"),
    password: z.string().max(32)
  })
  f.route({
    method: "POST",
    url: "/login",
    schema: { body: LOGIN_SCHEMA },
    handler: async (req, res) => {
      await res.send("ok")
    }
  })

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
