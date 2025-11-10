"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Bell } from "lucide-react"

export function TopBar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 bg-card/50 border-b border-border backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            System: <span className="text-green-500 font-semibold">Healthy</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-accent/20 transition-colors duration-200 relative">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-accent/20 transition-all duration-200 text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}
