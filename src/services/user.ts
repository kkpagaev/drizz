import { eq } from "drizzle-orm"
import { db } from "../db"
import { schema } from "../glob"
import { hash } from "bcrypt"

export type CreateUser = {
  username: string
  password: string
  email: string
  fullName: string
  phone: string
}
export async function create(dto: CreateUser) {
  const password = await hash(dto.password, 10)

  const user = await db
    .insert(schema.users)
    .values({
      username: dto.username,
      password: password,
      email: dto.email,
      fullName: dto.fullName,
      phone: dto.phone
    })
    .returning()

  return user
}

export async function getByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.username, username)
  })

  return user
}
