"use client"

import { cn } from "@/lib/utils"
import { 
  Home, 
  UserPlus, 
  DollarSign, 
  Calendar, 
  MessageSquare,
  TrendingUp
} from "lucide-react"

const activities = [
  {
    id: 1,
    type: "deal",
    title: "Deal Closed",
    description: "Palm Beach Mansion sold for $4.2M",
    time: "2 hours ago",
    icon: DollarSign,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    id: 2,
    type: "lead",
    title: "New Lead",
    description: "Sarah Johnson interested in luxury condos",
    time: "3 hours ago",
    icon: UserPlus,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    type: "viewing",
    title: "Viewing Scheduled",
    description: "Ocean View Penthouse - Tomorrow 3 PM",
    time: "4 hours ago",
    icon: Calendar,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    type: "property",
    title: "Property Listed",
    description: "Sunset Villa added to portfolio - $2.8M",
    time: "5 hours ago",
    icon: Home,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 5,
    type: "message",
    title: "Client Message",
    description: "Michael Chen sent a contract inquiry",
    time: "6 hours ago",
    icon: MessageSquare,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: 6,
    type: "insight",
    title: "AI Insight",
    description: "Market prices up 12% in your area",
    time: "8 hours ago",
    icon: TrendingUp,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
]

export function ActivityFeed() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in",
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                activity.iconBg
              )}
            >
              <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
