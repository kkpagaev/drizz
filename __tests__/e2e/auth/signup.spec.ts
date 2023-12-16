import { describe, expect, vi, test, beforeAll } from "vitest"
import { FastifyApp } from "../../../src"
import { buildFastify } from "../../../src/fastify"
import { z } from "zod"
import { userSignupSchema } from "../../../src/api/auth"

vi.mock("../../../src/services/email", () => {
  const emailServiceMock = {
    sendMail: () => {}
  }
  return emailServiceMock
})

describe("signup", () => {
  let fastify: FastifyApp

  beforeAll(async () => {
    fastify = await buildFastify()
  })
  test("signup", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/auth/signup",
      headers: {
        "content-type": "application/json"
      },
      payload: {
        email: "test",
        fullName: "test",
        password: "test",
        phone: "test",
        username: "test"
      } satisfies z.infer<typeof userSignupSchema>
    })

    expect(response.statusCode).toBe(200)
  })
})
