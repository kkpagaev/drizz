import * as jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET || "secret"

export interface JwtPayload extends jwt.JwtPayload {
  userId: number
}
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, secret)
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload
}
