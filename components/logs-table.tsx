"use client"

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

interface LogsTableProps {
  logs: Log[]
}

const getStatusColor = (code: number) => {
  if (code >= 200 && code < 300) return "text-green-500"
  if (code >= 300 && code < 400) return "text-blue-500"
  if (code >= 400 && code < 500) return "text-yellow-500"
  return "text-red-500"
}

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-blue-500/10 text-blue-400"
    case "POST":
      return "bg-green-500/10 text-green-400"
    case "PUT":
      return "bg-orange-500/10 text-orange-400"
    default:
      return "bg-gray-500/10 text-gray-400"
  }
}

export function LogsTable({ logs }: LogsTableProps) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-accent/30">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Timestamp</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Method</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Endpoint</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Response (ms)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Service</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Region</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Req Size</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Resp Size</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Latency</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={log._id}
                className={`border-b border-border hover:bg-accent/30 transition-colors ${
                  index % 2 === 0 ? "bg-background/30" : ""
                }`}
              >
                <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{log._id.slice(0, 8)}...</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(log.http_method_enc)}`}>
                    {log.http_method_enc}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground truncate max-w-xs">{log.endpoint}</td>
                <td className={`px-4 py-3 text-sm font-semibold ${getStatusColor(log.status_code)}`}>
                  {log.status_code}
                </td>
                <td className="px-4 py-3 text-sm text-foreground font-mono">{log.response_time_ms}ms</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{log.service_name_enc}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{log.geo_location_enc}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{log.request_size_bytes} B</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{log.response_size_bytes} B</td>
                <td className="px-4 py-3 text-sm font-mono">
                  <div className="w-16 h-1 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-red-500"
                      style={{ width: `${Math.min(log.normalized_latency * 100, 100)}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
