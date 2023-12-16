import { FastifyApp } from ".."

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
}
