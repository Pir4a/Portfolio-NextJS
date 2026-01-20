"use server"
import { z } from "zod"
import { contactSchema } from "./schemas"
import { Resend } from "resend"
import { EmailTemplate } from "../../emails/emailTemplate"

type ContactFormInput = z.infer<ReturnType<typeof contactSchema>>



export async function sendEmail(data: ContactFormInput) {
  const result = contactSchema("en").safeParse(data)
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY")
    }
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, message } = result.data
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["piralith@outlook.fr"],
      cc: "stephane.dedu@gmail.com",
      subject: "Contact Form Message",
      text: `Name ${name} \n Email ${email} \n Message ${message}`,
      react: await EmailTemplate({ name, email, message }),
    })
    if (!data || error) {
      throw new Error("Failed to send email")
    }
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { error: { email: ["Failed to send email"] } }
  }
}
