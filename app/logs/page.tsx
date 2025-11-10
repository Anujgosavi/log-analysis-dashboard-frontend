"use client"

import { useState, useEffect } from "react"
import { LogsTable } from "@/components/logs-table"
import { LogsFilters } from "@/components/logs-filters"
import { Search, RotateCcw } from "lucide-react"

interface Log {
  _id: string
  timestamp: string
  endpoint: string
  http_method_enc: string
  status_code: number
  response_time_ms: number
  request_size_bytes: number
  response_size_bytes: number
  service_name_enc: string
  geo_location_enc: string
  req_resp_ratio: number
  normalized_latency: number
  log_response_time: number
}

interface Filters {
  dateFrom: string
  dateTo: string
  statusCode: string
  endpoint: string
  serviceName: string
  responseTimeMin: number
  responseTimeMax: number
  searchQuery: string
}

const ITEMS_PER_PAGE = 10

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([])
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filters>({
    dateFrom: "",
    dateTo: "",
    statusCode: "",
    endpoint: "",
    serviceName: "",
    responseTimeMin: 0,
    responseTimeMax: 5000,
    searchQuery: "",
  })

  useEffect(() => {
    const mockLogs: Log[] = Array.from({ length: 45 }, (_, i) => ({
      _id: `log-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      endpoint: ["/api/v1/auth/login", "/api/v1/users/profile", "/api/v1/payments/process"][
        Math.floor(Math.random() * 3)
      ],
      http_method_enc: ["GET", "POST", "PUT"][Math.floor(Math.random() * 3)],
      status_code: [200, 400, 404, 500][Math.floor(Math.random() * 4)],
      response_time_ms: Math.floor(Math.random() * 2000) + 50,
      request_size_bytes: Math.floor(Math.random() * 5000) + 100,
      response_size_bytes: Math.floor(Math.random() * 10000) + 500,
      service_name_enc: ["auth-service", "user-service", "payment-service"][Math.floor(Math.random() * 3)],
      geo_location_enc: ["US", "EU", "APAC", "LATAM"][Math.floor(Math.random() * 4)],
      req_resp_ratio: Math.random() * 2 + 0.5,
      normalized_latency: Math.random() * 1,
      log_response_time: Math.floor(Math.random() * 3000),
    }))
    setLogs(mockLogs)
    setFilteredLogs(mockLogs)
    setLoading(false)
  }, [])

  // Apply filters
  useEffect(() => {
    let result = logs

    if (filters.statusCode) {
      result = result.filter((log) => log.status_code === Number.parseInt(filters.statusCode))
    }

    if (filters.endpoint) {
      result = result.filter((log) => log.endpoint.includes(filters.endpoint))
    }

    if (filters.serviceName) {
      result = result.filter((log) => log.service_name_enc === filters.serviceName)
    }

    result = result.filter(
      (log) => log.response_time_ms >= filters.responseTimeMin && log.response_time_ms <= filters.responseTimeMax,
    )

    if (searchQuery) {
      result = result.filter(
        (log) =>
          log.endpoint.includes(searchQuery) ||
          log.service_name_enc.includes(searchQuery) ||
          log._id.includes(searchQuery),
      )
    }

    setFilteredLogs(result)
    setCurrentPage(1)
  }, [filters, logs, searchQuery])

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleResetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      statusCode: "",
      endpoint: "",
      serviceName: "",
      responseTimeMin: 0,
      responseTimeMax: 5000,
      searchQuery: "",
    })
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Logs Explorer</h1>
        <p className="text-muted-foreground text-base md:text-lg">Search and filter all system logs</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by endpoint, service, or log ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <button
          onClick={handleResetFilters}
          className="px-4 py-3 rounded-lg bg-card border border-border text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filters */}
      <LogsFilters filters={filters} setFilters={setFilters} logs={logs} />

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm text-muted-foreground">
          Showing {paginatedLogs.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)} of {filteredLogs.length} logs
        </p>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading logs...</div>
      ) : paginatedLogs.length > 0 ? (
        <>
          <LogsTable logs={paginatedLogs} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs md:text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 md:px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Previous
              </button>
              <div className="flex items-center gap-1 md:gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 md:px-3 py-2 rounded-lg transition-colors text-sm ${
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground hover:bg-accent"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 md:px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">No logs found matching your filters</div>
      )}
    </div>
  )
}

// Placeholder API function
async function fetchLogs(filters: any) {
  // TODO: Connect to MongoDB when backend is ready
}
