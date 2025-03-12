"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useCart } from "@/hooks/use-cart"
import { useTranslation } from "@/hooks/use-translation"
import { getLaptopById } from "@/lib/api"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function ProductDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const [laptop, setLaptop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        setLoading(true)
        const data = await getLaptopById(id)
        setLaptop(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchLaptop()
    }
  }, [id])

  if (loading) return <div className="container mx-auto p-4 text-center">{t("loading")}</div>
  if (error)
    return (
      <div className="container mx-auto p-4 text-center">
        {t("error")}: {error}
      </div>
    )
  if (!laptop) return <div className="container mx-auto p-4 text-center">{t("productNotFound")}</div>

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("backToProducts")}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden"
          >
            {laptop.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-video">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${laptop.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{laptop.name}</h1>
          <p className="text-2xl font-bold text-primary mb-4">${laptop.price.toLocaleString()}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t("specifications")}</h2>
            <ul className="space-y-2">
              {laptop.specs?.map((spec, index) => (
                <li key={index} className="flex">
                  <span className="font-medium min-w-32">{spec.name}:</span>
                  <span>{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{t("description")}</h2>
            <p className="text-muted-foreground">{laptop.description}</p>
          </div>

          <Button size="lg" className="w-full" onClick={() => addToCart(laptop)}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t("addToCart")}
          </Button>
        </div>
      </div>
    </div>
  )
}

