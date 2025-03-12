"use client"

import useSWR from "swr"
import { getLaptops } from "@/lib/api"

export function useLaptops() {
  const { data, error, isLoading } = useSWR("laptops", getLaptops)

  return {
    laptops: data,
    isLoading,
    error,
  }
}

