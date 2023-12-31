import { FastifyApp } from ".."
import auth from "./auth"
import user from "./user"

export default async (f: FastifyApp) => {
  await f.register(user, {
    prefix: "/user"
  })
  await f.register(auth, {
    prefix: "/auth"
  })
}
