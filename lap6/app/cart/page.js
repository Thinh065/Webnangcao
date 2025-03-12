"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useTranslation } from "@/hooks/use-translation"

export default function Cart() {
  const { t } = useTranslation()
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 15 : 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    // In a real app, this would process payment and create an order
    clearCart()
    setCheckoutSuccess(true)
  }

  if (checkoutSuccess) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t("orderSuccess")}</h1>
          <p className="text-muted-foreground mb-6">{t("orderSuccessMessage")}</p>
          <Link href="/">
            <Button>{t("continueShopping")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">{t("shoppingCart")}</h1>
        <div className="text-center py-12 border rounded-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{t("emptyCart")}</h2>
          <p className="text-muted-foreground mb-6">{t("emptyCartMessage")}</p>
          <Link href="/">
            <Button>{t("startShopping")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("shoppingCart")}</h1>
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("continueShopping")}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-2 py-1"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-0"
                    />
                    <button className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">{t("orderSummary")}</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span>${shipping.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>{t("total")}</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleCheckout}>
              {t("checkout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

