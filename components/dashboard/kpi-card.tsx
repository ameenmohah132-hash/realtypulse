"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  ArrowUp,
  ArrowDown,
  Building2,
  Users,
  DollarSign,
  Handshake,
  UserPlus,
  Percent,
  TrendingUp,
  Home,
  Calendar,
  BarChart3,
} from "lucide-react"

const iconMap = {
  building2: Building2,
  users: Users,
  dollarSign: DollarSign,
  handshake: Handshake,
  userPlus: UserPlus,
  percent: Percent,
  trendingUp: TrendingUp,
  home: Home,
  calendar: Calendar,
  barChart3: BarChart3,
} as const

type IconName = keyof typeof iconMap

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  iconName: IconName
  iconColor?: string
  delay?: number
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  iconName,
  iconColor = "text-primary",
  delay = 0,
}: KPICardProps) {
  const Icon = iconMap[iconName]
  const [isVisible, setIsVisible] = useState(false)
  const [displayValue, setDisplayValue] = useState<string | number>(
    typeof value === "number" ? 0 : value
  )

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible || typeof value !== "number") return

    const duration = 1000
    const steps = 30
    const stepValue = value / steps
    let current = 0

    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [isVisible, value])

  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] glow-hover",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {typeof displayValue === "number"
              ? displayValue.toLocaleString()
              : displayValue}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                  isPositive && "bg-emerald-500/10 text-emerald-500",
                  isNegative && "bg-red-500/10 text-red-500",
                  !isPositive && !isNegative && "bg-muted text-muted-foreground"
                )}
              >
                {isPositive && <ArrowUp className="h-3 w-3" />}
                {isNegative && <ArrowDown className="h-3 w-3" />}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10",
            iconColor
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>
    </div>
  )
}
