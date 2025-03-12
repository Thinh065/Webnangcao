import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/hooks/use-cart"
import { TranslationProvider } from "@/hooks/use-translation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Laptop Store",
  description: "The best place to buy laptops online",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TranslationProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <footer className="py-6 border-t">
                  <div className="container mx-auto text-center text-muted-foreground">
                    © 2025 Laptop Store. All rights reserved.
                  </div>
                </footer>
              </div>
            </CartProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

