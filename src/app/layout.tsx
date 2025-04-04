import type { Metadata } from "next"
import { M_PLUS_Rounded_1c } from "next/font/google"
import "./globals.css"
import Providers from "../../components/providers"
import { LanguageProvider } from "../../contexts/LanguageContext"

const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Stephane Dedu PortFolio",
  description: "Stephane Dedu PortFolio NextJS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${mPlusRounded1c.className} antialiased overflow-x-hidden scroll-smooth`}
      >
        <Providers>
          <LanguageProvider>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}
