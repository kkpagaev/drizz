import { emailService, jwtService, userService } from "./"
import { CreateUser } from "./user"
import * as hash from "bcrypt"

export async function signup(dto: CreateUser) {
  const user = await userService.create(dto)

  await emailService.sendMail(
    dto.email,
    "Welcome",
    "Hello",
    "<p>code is 1111</p>"
  )

  return user
}

export type SigninDto = {
  username: string
  password: string
}
export async function signin(dto: SigninDto) {
  const user = await userService.getByUsername(dto.username)

  if (!user) {
    throw new Error("User not found")
  }

  if (!(await hash.compare(dto.password, user.password))) {
    throw new Error("Wrong password")
  }

  const token = jwtService.generateToken({ username: user.username! })

  return token
}
