"use client"
import { useRouter } from "next/navigation"
import { useLaptops } from "@/hooks/use-laptops"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Eye } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { useCart } from "@/hooks/use-cart"

export default function Home() {
  const { t } = useTranslation()
  const { laptops, isLoading, error } = useLaptops()
  const { addToCart } = useCart()
  const router = useRouter()

  if (isLoading) return <div className="container mx-auto p-4 text-center">{t("loading")}</div>
  if (error) return <div className="container mx-auto p-4 text-center">{t("error")}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("productList")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {laptops?.map((laptop) => (
          <Card key={laptop.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{laptop.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-video relative mb-4">
                <img
                  src={laptop.image || "/placeholder.svg"}
                  alt={laptop.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <p className="text-lg font-bold text-primary">${laptop.price.toLocaleString()}</p>
              <p className="line-clamp-2 text-muted-foreground mt-2">{laptop.shortDescription}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => router.push(`/product/${laptop.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                {t("viewDetails")}
              </Button>
              <Button className="flex-1" onClick={() => addToCart(laptop)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("addToCart")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

