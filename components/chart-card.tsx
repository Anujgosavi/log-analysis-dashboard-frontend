"use client"

import type React from "react"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-accent/50 transition-all">
      <div className="mb-4">
        <h3 className="text-sm md:text-base font-semibold text-foreground text-balance">{title}</h3>
        {subtitle && <p className="text-xs md:text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="w-full overflow-x-auto scrollbar-hidden">{children}</div>
    </div>
  )
}
