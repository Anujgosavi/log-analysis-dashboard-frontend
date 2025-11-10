"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FeatureSelectorProps {
  selectedFeature: string
  onFeatureChange: (feature: string) => void
}

export function FeatureSelector({ selectedFeature, onFeatureChange }: FeatureSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const features = [
    { value: "response_time", label: "Response Time" },
    { value: "status_code", label: "Status Code" },
    { value: "error_rate", label: "Error Rate" },
    { value: "latency", label: "Latency" },
  ]

  const selectedLabel = features.find((f) => f.value === selectedFeature)?.label

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-accent transition-colors"
      >
        <span className="text-sm font-medium">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
          {features.map((feature) => (
            <button
              key={feature.value}
              onClick={() => {
                onFeatureChange(feature.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                selectedFeature === feature.value
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
