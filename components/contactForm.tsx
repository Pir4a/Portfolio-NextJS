"use client"

import { useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { contactSchema } from "../src/lib/schemas"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import { z } from "zod"
import { sendEmail } from "@/lib/actions"

export default function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null)

  const { language } = useLanguage()
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle")

  const t = translations[language as keyof typeof translations].contact

  type FormData = z.infer<ReturnType<typeof contactSchema>>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema(language as "en" | "fr")),
  })

  const processForm: SubmitHandler<FormData> = async (data) => {
    const result = await sendEmail(data)
    if (result?.error) {
      setFormStatus("error")
      toast.error(result.error.email?.[0] || "An error occurred")
    } else {
      setFormStatus("sent")
      reset()
    }
  }

  return (
    <>
      <div
        id="contact"
        className="w-full xl:mt-0 mt-10 h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent "
      />
      <div className="xl:py-20 flex h-full flex-col items-center xl:items-start  xl:flex-row">
        <motion.div className="min-w-[40%] flex justify-center">
          <h2 className="text-6xl font-light text-center mb-8 pt-10  tracking-tight text-gray-800  dark:text-gray-200">
            {t.title}
          </h2>
        </motion.div>
        <motion.div
          ref={formRef}
          className="min-w-[60%] max-w-2xl p-8 rounded-xl relative z-10"
          style={{
            backgroundImage: `linear-gradient(
    55deg,
    transparent,
    rgba(255, 255, 255, 0.1) 10%,
    transparent
  )`,
          }}
        >
          <motion.div className="relative overflow-hidden rounded-lg border p-8 bg-white/80 dark:bg-black/80 shadow-xl">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-b from-[#1A1A1A]/20 to-transparent" />

            {/* Pink border glow */}
            <div className="absolute inset-0 z-0 rounded-lg border via-pink-300/60 shadow-[0_0_10px_rgba(236,72,153,0.1)]" />

            <form
              onSubmit={handleSubmit(processForm)}
              className="space-y-6 relative z-10"
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t.form.name}
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t.form.name}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50  focus:border-transparent transition-all duration-300 relative z-20"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t.form.email}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.form.email}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50  focus:border-transparent transition-all duration-300 relative z-20"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t.form.message}
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  name="message"
                  placeholder={t.form.message}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50   transition-all duration-300 resize-none relative z-20"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 relative z-20
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-400/80 hover:bg-pink-500/80 cursor-pointer"
              }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t.form.sending}
                  </span>
                ) : formStatus === "sent" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {t.form.sent}
                  </span>
                ) : formStatus === "error" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {t.form.error}
                  </span>
                ) : (
                  t.form.submit
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
