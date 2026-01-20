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
  title: "Stéphane Dedu - FullStack Developer | React, Node.js, TypeScript",
  description: "Portfolio of Stéphane Dedu, FullStack Developer specialized in React, Node.js, TypeScript, and modern web technologies. Discover my projects and skills.",
  keywords: ["FullStack Developer", "React", "Node.js", "TypeScript", "Tailwind CSS", "Web Development", "Three.js", "Next.js"],
  authors: [{ name: "Stéphane Dedu" }],
  creator: "Stéphane Dedu",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://stephane-dedu-devportfolio.vercel.app/",
    title: "Stéphane Dedu - FullStack Developer Portfolio",
    description: "Portfolio showcasing modern web applications built with React, Node.js, TypeScript, and cutting-edge technologies.",
    siteName: "Stéphane Dedu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stéphane Dedu - FullStack Developer",
    description: "Portfolio showcasing modern web applications and FullStack development skills",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
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
