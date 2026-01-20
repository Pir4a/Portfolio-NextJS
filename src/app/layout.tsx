import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Providers from "../../components/providers"
import { LanguageProvider } from "../../contexts/LanguageContext"
import MetaFooter from "../../components/MetaFooter"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Stéphane Dedu - SRE / Cloud Engineer",
  description: "Site Reliability Engineer Portfolio. Infrastructure as Code, CI/CD, and Cloud Architecture.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0a0a0a] min-h-screen relative pb-12`}
      >
        <Providers>
          <LanguageProvider>{children}<MetaFooter /></LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}
