"use client"

import { AlertCircle, Clock, ServerIcon, LinkIcon } from "lucide-react"

interface AnomalyCardProps {
  anomaly: {
    _id: string
    timestamp: string
    service_name_enc: string
    endpoint_enc: string
    response_time_ms: number
    status_code: number
    severity: "high" | "medium" | "low"
  }
}

export function AnomalyCard({ anomaly }: AnomalyCardProps) {
  const severityColors = {
    high: "bg-red-500/10 border-red-500/30 text-red-600",
    medium: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600",
    low: "bg-blue-500/10 border-blue-500/30 text-blue-600",
  }

  const timeDiff = Math.floor((Date.now() - new Date(anomaly.timestamp).getTime()) / 60000)

  return (
    <div
      className={`p-4 rounded-2xl border border-border bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300 space-y-3 ${severityColors[anomaly.severity]} group hover:shadow-lg hover:scale-105`}
    >
      {/* Severity Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="text-xs md:text-sm font-semibold capitalize">{anomaly.severity} Severity</span>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-background/50 text-muted-foreground font-mono">
          {anomaly.status_code}
        </span>
      </div>

      {/* Service Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <ServerIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium truncate">{anomaly.service_name_enc}</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <LinkIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{anomaly.endpoint_enc}</span>
        </div>
      </div>

      {/* Response Time */}
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span>{anomaly.response_time_ms}ms response time</span>
      </div>

      {/* Timestamp */}
      <div className="text-xs text-muted-foreground">{timeDiff === 0 ? "just now" : `${timeDiff}m ago`}</div>
    </div>
  )
}
