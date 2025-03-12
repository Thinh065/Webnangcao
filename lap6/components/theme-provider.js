"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
})

export function ThemeProvider({ children, defaultTheme = "light", attribute = "class" }) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", theme)

    // Apply theme to document
    const root = window.document.documentElement

    // Remove old theme class
    root.classList.remove("light", "dark")

    // Add new theme class
    if (attribute === "class") {
      root.classList.add(theme)
    } else {
      root.setAttribute(attribute, theme)
    }
  }, [theme, attribute])

  const value = {
    theme,
    setTheme: (newTheme) => setTheme(newTheme),
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}