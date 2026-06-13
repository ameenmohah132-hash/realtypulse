"use client"

import {
  AreaChart,
  Area,
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
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 420000, deals: 8 },
  { month: "Feb", revenue: 380000, deals: 6 },
  { month: "Mar", revenue: 510000, deals: 10 },
  { month: "Apr", revenue: 620000, deals: 12 },
  { month: "May", revenue: 480000, deals: 9 },
  { month: "Jun", revenue: 750000, deals: 14 },
  { month: "Jul", revenue: 680000, deals: 13 },
  { month: "Aug", revenue: 820000, deals: 16 },
]

const propertyTypeData = [
  { name: "Luxury Homes", value: 35, color: "oklch(0.75 0.15 180)" },
  { name: "Condos", value: 28, color: "oklch(0.7 0.17 155)" },
  { name: "Penthouses", value: 18, color: "oklch(0.6 0.2 250)" },
  { name: "Villas", value: 12, color: "oklch(0.8 0.15 85)" },
  { name: "Commercial", value: 7, color: "oklch(0.65 0.2 15)" },
]

const performanceData = [
  { name: "Mon", leads: 24, viewings: 18, closings: 4 },
  { name: "Tue", leads: 32, viewings: 22, closings: 6 },
  { name: "Wed", leads: 28, viewings: 20, closings: 5 },
  { name: "Thu", leads: 36, viewings: 28, closings: 8 },
  { name: "Fri", leads: 42, viewings: 32, closings: 10 },
  { name: "Sat", leads: 38, viewings: 26, closings: 7 },
  { name: "Sun", leads: 22, viewings: 14, closings: 3 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 shadow-xl border border-border/50">
        <p className="text-xs font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            <span style={{ color: entry.color }} className="font-medium">
              {entry.name}:
            </span>{" "}
            {typeof entry.value === "number" && entry.name?.includes("revenue")
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  return (
    <div className="glass-card rounded-xl p-5 h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Revenue Overview
          </h3>
          <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-1" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-2" />
            Deals
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.75 0.15 180)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="oklch(0.75 0.15 180)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="oklch(0.75 0.15 180)"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PropertyTypeChart() {
  return (
    <div className="glass-card rounded-xl p-5 h-[350px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Property Distribution
        </h3>
        <p className="text-sm text-muted-foreground">By property type</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={propertyTypeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {propertyTypeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="glass-card rounded-lg p-3 shadow-xl border border-border/50">
                    <p className="text-xs font-medium text-foreground">
                      {data.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.value}% of portfolio
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-xs text-muted-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PerformanceChart() {
  return (
    <div className="glass-card rounded-xl p-5 h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Weekly Performance
          </h3>
          <p className="text-sm text-muted-foreground">
            Leads, viewings & closings
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-3" />
            Leads
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-1" />
            Viewings
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-2" />
            Closings
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="leads" fill="oklch(0.6 0.2 250)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="viewings" fill="oklch(0.75 0.15 180)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="closings" fill="oklch(0.7 0.17 155)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
