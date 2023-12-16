import { getTestMessageUrl } from "nodemailer"
import { transporter } from "../nodemailer"

export async function sendMail(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  const info = await transporter.sendMail({
    from: "GQbN6@example.com",
    to,
    subject,
    text,
    html
  })

  console.log("Message sent: %s", info.messageId)

  console.log("Preview URL: %s", getTestMessageUrl(info))

  return
}
