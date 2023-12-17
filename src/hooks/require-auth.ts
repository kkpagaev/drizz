import { preHandlerHookHandler } from "fastify"
import { User } from ".."
import { jwtService, userService } from "../services"

declare module "fastify" {
  interface FastifyRequest {
    user?: User
  }
}

export const requireAuth: preHandlerHookHandler = async (request, reply) => {
  const jwtHeader = request.headers.authorization

  if (!jwtHeader) {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }

  const bearer = jwtHeader.split(" ")

  if (bearer[0] !== "Bearer") {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }

  const token = bearer[1]

  if (!token) {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }

  const payload = jwtService.verifyToken(token)

  if (!payload) {
    return reply.status(401).send({
      message: "Unauthorized"
    })
  }
  const user = await userService.getById(payload.userId)
  request.user = user
}
