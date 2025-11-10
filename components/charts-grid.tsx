"use client"

import { ChartCard } from "./chart-card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface ChartsGridProps {
  selectedFeature: string
}

export function ChartsGrid({ selectedFeature }: ChartsGridProps) {
  // Sample data for charts
  const injectionAttempts = [
    { time: "00:00", attempts: 2 },
    { time: "04:00", attempts: 5 },
    { time: "08:00", attempts: 3 },
    { time: "12:00", attempts: 8 },
    { time: "16:00", attempts: 4 },
    { time: "20:00", attempts: 6 },
  ]

  const errorRate = [
    { time: "00:00", rate: 2.1 },
    { time: "06:00", rate: 3.5 },
    { time: "12:00", rate: 1.8 },
    { time: "18:00", rate: 4.2 },
    { time: "24:00", rate: 2.9 },
  ]

  const responseTime = [
    { service: "Auth", avg: 245 },
    { service: "Payment", avg: 389 },
    { service: "User", avg: 156 },
    { service: "Notification", avg: 203 },
  ]

  const traffic = [
    { name: "/api/v1/auth/login", value: 35 },
    { name: "/api/v1/payments/process", value: 25 },
    { name: "/api/v1/users/profile", value: 20 },
    { name: "/api/v1/analytics/track", value: 20 },
  ]

  const regionData = [
    { region: "North America", requests: 4500 },
    { region: "Europe", requests: 3200 },
    { region: "Asia", requests: 2800 },
    { region: "South America", requests: 1500 },
  ]

  const latencyDist = [
    { range: "0-100ms", count: 320 },
    { range: "100-200ms", count: 450 },
    { range: "200-500ms", count: 280 },
    { range: "500-1000ms", count: 120 },
    { range: "1000+ms", count: 45 },
  ]

  const reqRespSize = [
    { reqSize: 150, respSize: 450 },
    { reqSize: 200, respSize: 380 },
    { reqSize: 180, respSize: 520 },
    { reqSize: 220, respSize: 410 },
    { reqSize: 170, respSize: 390 },
    { reqSize: 210, respSize: 480 },
  ]

  const normalizedLatency = [
    { time: "00:00", value: 0.2 },
    { time: "04:00", value: 0.35 },
    { time: "08:00", value: 0.18 },
    { time: "12:00", value: 0.52 },
    { time: "16:00", value: 0.28 },
    { time: "20:00", value: 0.41 },
  ]

  const peakHours = [
    { hour: "0h", value: 85 },
    { hour: "4h", value: 45 },
    { hour: "8h", value: 95 },
    { hour: "12h", value: 88 },
    { hour: "16h", value: 92 },
    { hour: "20h", value: 78 },
  ]

  const dayPerformance = [
    { day: "Mon", performance: 88 },
    { day: "Tue", performance: 85 },
    { day: "Wed", performance: 92 },
    { day: "Thu", performance: 86 },
    { day: "Fri", performance: 89 },
    { day: "Sat", performance: 78 },
    { day: "Sun", performance: 75 },
  ]

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  const COLORS = colors

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
      {/* 1. SQL Injection Attempt Rate */}
      <ChartCard title="SQL Injection Attempt Rate" subtitle="Detected attempts over 24 hours">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={injectionAttempts}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="attempts"
              stroke="var(--color-danger)"
              strokeWidth={2}
              dot={{ fill: "var(--color-danger)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 2. Error Rate Over Time */}
      <ChartCard title="Error Rate Over Time" subtitle="Last 24 hours">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={errorRate}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="rate" fill="var(--color-warning)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 3. Average Response Time per Service */}
      <ChartCard title="Average Response Time" subtitle="Per service (ms)">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={responseTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="service" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="avg" fill="var(--color-chart-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 4. Top Endpoints by Traffic */}
      <ChartCard title="Top Endpoints by Traffic" subtitle="Request distribution">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={traffic}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {traffic.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 5. Requests by Region */}
      <ChartCard title="Requests by Region" subtitle="Geographic distribution">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: 200, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis type="number" stroke="var(--color-muted-foreground)" />
            <YAxis dataKey="region" type="category" stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="requests" fill="var(--color-chart-secondary)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 6. Latency Distribution */}
      <ChartCard title="Latency Distribution" subtitle="Histogram analysis">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={latencyDist}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="range" stroke="var(--color-muted-foreground)" angle={-45} height={80} />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="var(--color-chart-accent)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 7. Request vs Response Size */}
      <ChartCard title="Request vs Response Size" subtitle="Correlation analysis">
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="reqSize" name="Request Size" stroke="var(--color-muted-foreground)" />
            <YAxis dataKey="respSize" name="Response Size" stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Scatter name="Requests" data={reqRespSize} fill="var(--color-chart-primary)" />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 8. Normalized Latency Trend */}
      <ChartCard title="Normalized Latency Trend" subtitle="24-hour trend">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={normalizedLatency}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" domain={[0, 1]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-secondary)"
              strokeWidth={2}
              dot={{ fill: "var(--color-chart-secondary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 9. Peak Hours */}
      <ChartCard title="Peak Hours Analysis" subtitle="Traffic patterns">
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={peakHours}>
            <PolarGrid stroke="var(--color-border)" />
            <PolarAngleAxis dataKey="hour" stroke="var(--color-muted-foreground)" />
            <PolarRadiusAxis stroke="var(--color-muted-foreground)" />
            <Radar
              name="Traffic"
              dataKey="value"
              stroke="var(--color-chart-primary)"
              fill="var(--color-chart-primary)"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 10. Day-of-Week Performance */}
      <ChartCard title="Day-of-Week Performance" subtitle="Weekly breakdown">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dayPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="performance" fill="var(--color-chart-secondary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
