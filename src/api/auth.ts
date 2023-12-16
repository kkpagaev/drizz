import { z } from "zod"
import { FastifyApp } from ".."
import { authService } from "../services"

const userSignupSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  fullName: z.string(),
  phone: z.string()
})

const userSigninSchema = z.object({
  username: z.string(),
  password: z.string()
})

export default async (f: FastifyApp) => {
  f.route({
    method: "POST",
    url: "/signup",
    schema: {
      body: userSignupSchema
    },
    handler: async (req) => {
      const user = await authService.signup(req.body)

      return user
    }
  })

  f.route({
    method: "POST",
    url: "/signin",
    schema: {
      body: userSigninSchema
    },
    handler: async (req) => {
      const token = await authService.signin(req.body)

      return {
        token
      }
    }
  })
}
