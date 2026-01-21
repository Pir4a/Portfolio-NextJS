"use client"
import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
export default function providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  )
}
function ToasterProvider() {
  return <Toaster position="top-center" />
}
