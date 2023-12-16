import * as jwt from "jsonwebtoken"

export interface JwtPayload extends jwt.JwtPayload {
  username: string
}
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, "secret")
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, "secret") as JwtPayload
}
