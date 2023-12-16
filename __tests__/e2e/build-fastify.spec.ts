import { expect, describe, test, beforeAll } from "vitest"
import { FastifyInstance } from "fastify"

import { expectResponseBodyObject } from "../helpers/expect-response"
import { buildFastify } from "../../src/fastify"

describe("index", () => {
  let fastify: FastifyInstance

  beforeAll(async () => {
    fastify = await buildFastify()
  })

  test("fastify", async () => {
    const response = await fastify.inject("/api/")
    expect(response.statusCode).toBe(404)
    // const body = expectResponseBodyObject<{ locale: string }>(response)

    // expect(body.locale).toBeTypeOf("string")
    // expect(body.locale).toBe("en")
  })
})
