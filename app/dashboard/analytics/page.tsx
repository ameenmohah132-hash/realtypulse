"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  Users,
  Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", revenue: 420000, target: 400000, lastYear: 380000 },
  { month: "Feb", revenue: 380000, target: 420000, lastYear: 350000 },
  { month: "Mar", revenue: 510000, target: 450000, lastYear: 420000 },
  { month: "Apr", revenue: 620000, target: 500000, lastYear: 480000 },
  { month: "May", revenue: 480000, target: 520000, lastYear: 450000 },
  { month: "Jun", revenue: 750000, target: 550000, lastYear: 520000 },
  { month: "Jul", revenue: 680000, target: 580000, lastYear: 550000 },
  { month: "Aug", revenue: 820000, target: 600000, lastYear: 600000 },
]

const agentPerformance = [
  { name: "Sarah Miller", deals: 24, revenue: 4200000, conversion: 68 },
  { name: "James Wilson", deals: 21, revenue: 3800000, conversion: 62 },
  { name: "Emily Chen", deals: 18, revenue: 3200000, conversion: 58 },
  { name: "Michael Brown", deals: 15, revenue: 2800000, conversion: 55 },
  { name: "David Lee", deals: 12, revenue: 2100000, conversion: 48 },
]

const marketTrends = [
  { month: "Jan", miami: 2.8, malibu: 3.2, newYork: 2.5, aspen: 4.1 },
  { month: "Feb", miami: 2.9, malibu: 3.1, newYork: 2.6, aspen: 4.0 },
  { month: "Mar", miami: 3.1, malibu: 3.4, newYork: 2.7, aspen: 4.2 },
  { month: "Apr", miami: 3.2, malibu: 3.5, newYork: 2.8, aspen: 4.3 },
  { month: "May", miami: 3.4, malibu: 3.7, newYork: 2.9, aspen: 4.5 },
  { month: "Jun", miami: 3.5, malibu: 3.9, newYork: 3.0, aspen: 4.6 },
  { month: "Jul", miami: 3.7, malibu: 4.1, newYork: 3.1, aspen: 4.8 },
  { month: "Aug", miami: 3.9, malibu: 4.3, newYork: 3.2, aspen: 5.0 },
]

const leadSourceData = [
  { source: "Website", leads: 156, conversion: 32 },
  { source: "Referrals", leads: 98, conversion: 48 },
  { source: "Social Media", leads: 87, conversion: 22 },
  { source: "Events", leads: 65, conversion: 38 },
  { source: "Paid Ads", leads: 124, conversion: 18 },
]

const metrics = [
  {
    title: "Total Revenue",
    value: "$4.66M",
    change: 23,
    positive: true,
    icon: DollarSign,
    iconColor: "text-emerald-500",
  },
  {
    title: "Properties Sold",
    value: "47",
    change: 15,
    positive: true,
    icon: Home,
    iconColor: "text-primary",
  },
  {
    title: "New Clients",
    value: "156",
    change: 8,
    positive: true,
    icon: Users,
    iconColor: "text-blue-500",
  },
  {
    title: "Conversion Rate",
    value: "32%",
    change: -2,
    positive: false,
    icon: Target,
    iconColor: "text-amber-500",
  },
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
            {typeof entry.value === "number" && entry.name?.toLowerCase().includes("revenue")
              ? `$${(entry.value / 1000000).toFixed(2)}M`
              : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("ytd")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Advanced insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] gap-2">
              <Calendar className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-5 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <div className="flex items-center gap-1">
                  {metric.positive ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      metric.positive ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {metric.positive ? "+" : ""}{metric.change}%
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className={cn("h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center", metric.iconColor)}>
                <metric.icon className={cn("h-5 w-5", metric.iconColor)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue vs Target */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Revenue vs Target</h3>
              <p className="text-sm text-muted-foreground">Monthly comparison</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-chart-1" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-chart-4" />
                Target
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.75 0.15 180)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.75 0.15 180)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.75 0.15 180)" strokeWidth={2} fill="url(#revenueGrad)" />
                <Line type="monotone" dataKey="target" stroke="oklch(0.8 0.15 85)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Trends */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Market Trends</h3>
              <p className="text-sm text-muted-foreground">Price per sqft by region ($M)</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} tickFormatter={(v) => `$${v}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-xs text-muted-foreground capitalize">{value}</span>} />
                <Line type="monotone" dataKey="miami" stroke="oklch(0.75 0.15 180)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="malibu" stroke="oklch(0.7 0.17 155)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="newYork" stroke="oklch(0.6 0.2 250)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="aspen" stroke="oklch(0.8 0.15 85)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Agent Performance & Lead Sources */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agent Performance */}
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Agent Performance</h3>
            <p className="text-sm text-muted-foreground">Top performers this period</p>
          </div>
          <div className="space-y-4">
            {agentPerformance.map((agent, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground w-4">
                  {index + 1}
                </span>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {agent.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{agent.name}</p>
                    <p className="text-sm font-semibold text-primary">
                      ${(agent.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{agent.deals} deals</span>
                    <span className="text-xs text-muted-foreground">{agent.conversion}% conv.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Lead Sources</h3>
            <p className="text-sm text-muted-foreground">Conversion by channel</p>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" fill="oklch(0.75 0.15 180)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
