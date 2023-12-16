import { createTransport } from "nodemailer"

export const transporter = createTransport({
  host: "localhost",
  port: 5026,
  secure: false
})
