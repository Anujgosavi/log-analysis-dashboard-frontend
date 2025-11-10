"use client"
import { useState } from "react"

interface FiltersProps {
  filters: any
  setFilters: (filters: any) => void
  logs: any[]
}

export function LogsFilters({ filters, setFilters, logs }: FiltersProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>("status")

  // Extract unique values for dropdowns
  const uniqueStatusCodes = [...new Set(logs.map((log) => log.status_code))].sort()
  const uniqueEndpoints = [...new Set(logs.map((log) => log.endpoint))]
  const uniqueServices = [...new Set(logs.map((log) => log.service_name_enc))]

  const toggleFilter = (filterName: string) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Date Range - From */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Date Range - To */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Status Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status Code</label>
          <select
            value={filters.statusCode}
            onChange={(e) => setFilters({ ...filters, statusCode: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              paddingRight: "28px",
            }}
          >
            <option value="">All Status Codes</option>
            {uniqueStatusCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* Endpoint */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Endpoint</label>
          <select
            value={filters.endpoint}
            onChange={(e) => setFilters({ ...filters, endpoint: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              paddingRight: "28px",
            }}
          >
            <option value="">All Endpoints</option>
            {uniqueEndpoints.map((endpoint) => (
              <option key={endpoint} value={endpoint}>
                {endpoint}
              </option>
            ))}
          </select>
        </div>

        {/* Service Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service</label>
          <select
            value={filters.serviceName}
            onChange={(e) => setFilters({ ...filters, serviceName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              paddingRight: "28px",
            }}
          >
            <option value="">All Services</option>
            {uniqueServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Response Time Range Slider */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Response Time Range</label>
          <span className="text-sm text-muted-foreground">
            {filters.responseTimeMin}ms - {filters.responseTimeMax}ms
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            value={filters.responseTimeMin}
            onChange={(e) =>
              setFilters({
                ...filters,
                responseTimeMin: Math.min(Number.parseInt(e.target.value), filters.responseTimeMax),
              })
            }
            className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={filters.responseTimeMax}
            onChange={(e) =>
              setFilters({
                ...filters,
                responseTimeMax: Math.max(Number.parseInt(e.target.value), filters.responseTimeMin),
              })
            }
            className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>
    </div>
  )
}
