import { LightMyRequestResponse } from "fastify"
import { expect } from "vitest"

export const expectResponseBodyObject = <T extends object>(
  response: LightMyRequestResponse
): T => {
  expect(response).toBeTypeOf("object")
  expect(response.json<unknown>()).toBeTypeOf("object")

  return response.json<T>()
}
