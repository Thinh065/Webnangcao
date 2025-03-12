"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/translations"

const TranslationContext = createContext()

export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  // Load language preference from localStorage on initial render
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language")
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage)
      }
    } catch (error) {
      console.error("Failed to load language from localStorage:", error)
    }
  }, [])

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("language", currentLanguage)
    } catch (error) {
      console.error("Failed to save language to localStorage:", error)
    }
  }, [currentLanguage])

  const changeLanguage = (language) => {
    setCurrentLanguage(language)
  }

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  return (
    <TranslationContext.Provider
      value={{
        t,
        changeLanguage,
        currentLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

