"use client"

import { useEffect, useState } from "react"
import { AnomalyCard } from "@/components/anomaly-card"
import { ChartsGrid } from "@/components/charts-grid"
import { FeatureSelector } from "@/components/feature-selector"

interface Anomaly {
  _id: string
  timestamp: string
  service_name_enc: string
  endpoint_enc: string
  response_time_ms: number
  status_code: number
  severity: "high" | "medium" | "low"
}

export default function Dashboard() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [selectedFeature, setSelectedFeature] = useState("response_time")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockAnomalies: Anomaly[] = [
      {
        _id: "1",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        service_name_enc: "auth-service",
        endpoint_enc: "/api/v1/auth/login",
        response_time_ms: 2500,
        status_code: 500,
        severity: "high",
      },
      {
        _id: "2",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        service_name_enc: "payment-service",
        endpoint_enc: "/api/v1/payments/process",
        response_time_ms: 3100,
        status_code: 504,
        severity: "high",
      },
      {
        _id: "3",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        service_name_enc: "user-service",
        endpoint_enc: "/api/v1/users/profile",
        response_time_ms: 1800,
        status_code: 200,
        severity: "medium",
      },
      {
        _id: "4",
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        service_name_enc: "notification-service",
        endpoint_enc: "/api/v1/notifications/send",
        response_time_ms: 1200,
        status_code: 200,
        severity: "low",
      },
      {
        _id: "5",
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        service_name_enc: "analytics-service",
        endpoint_enc: "/api/v1/analytics/track",
        response_time_ms: 2200,
        status_code: 429,
        severity: "medium",
      },
    ]
    setAnomalies(mockAnomalies)
    setLoading(false)
  }, [])

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">System Anomaly Insights</h1>
        <p className="text-muted-foreground text-base md:text-lg">Real-time API & Service Anomalies Overview</p>
      </div>

      {/* Anomaly Cards */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">Detected Anomalies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {loading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">Loading anomalies...</div>
          ) : anomalies.length > 0 ? (
            anomalies.map((anomaly) => <AnomalyCard key={anomaly._id} anomaly={anomaly} />)
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">No anomalies detected</div>
          )}
        </div>
      </div>

      {/* Feature Selector & Charts */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Visualizations & Analytics</h2>
          <FeatureSelector selectedFeature={selectedFeature} onFeatureChange={setSelectedFeature} />
        </div>
        <ChartsGrid selectedFeature={selectedFeature} />
      </div>
    </div>
  )
}

// Placeholder API functions
async function fetchAnomalies() {
  // TODO: Connect to MongoDB when backend is ready
}

async function fetchFeatureAnomalies(featureName: string) {
  // TODO: Connect to MongoDB when backend is ready
}
