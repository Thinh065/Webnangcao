"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useTranslation } from "@/hooks/use-translation"

export default function Header() {
  const { cart } = useCart()
  const { t, changeLanguage, currentLanguage } = useTranslation()

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Laptop Store
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button
              variant={currentLanguage === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => changeLanguage("en")}
            >
              EN
            </Button>
            <Button
              variant={currentLanguage === "vi" ? "default" : "outline"}
              size="sm"
              onClick={() => changeLanguage("vi")}
            >
              VI
            </Button>
          </div>

          <Link href="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

