import { z } from "zod"

export const contactSchema = (language: "en" | "fr") => {
  const messages = {
    en: {
      name: {
        required: "Name is required",
      },
      email: {
        required: "Email is required",
        invalid: "Invalid email address",
      },
      message: {
        required: "Message is required",
      },
    },
    fr: {
      name: {
        required: "Le nom est requis",
      },
      email: {
        required: "L'email est requis",
        invalid: "Adresse email invalide",
      },
      message: {
        required: "Un message est requis",
      },
    },
  }

  return z.object({
    name: z.string().min(1, { message: messages[language].name.required }),
    email: z
      .string()
      .email({ message: messages[language].email.invalid })
      .min(1, { message: messages[language].email.required }),
    message: z
      .string()
      .min(1, { message: messages[language].message.required }),
  })
}

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>
