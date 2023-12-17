import { FastifyApp } from ".."
import { requireAuth } from "../hooks/require-auth"

export default async (f: FastifyApp) => {
  f.route({
    method: "POST",
    url: "/user",
    handler: async (_req, res) => {
      await res.send("ok")
    }
  })

  f.route({
    method: "GET",
    url: "/user",
    handler: async (_req, res) => {
      await res.send("ok")
    }
  })

  f.route({
    method: "GET",
    url: "/me",
    preHandler: [requireAuth],
    handler: async (req) => {
      return req.user!
    }
  })
}
