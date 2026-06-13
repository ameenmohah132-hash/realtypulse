"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TeamMember {
  id: number
  name: string
  role: string
  email: string
  phone: string
  initials: string
  avatar?: string
  status: "online" | "offline" | "away"
  deals: number
  revenue: number
  target: number
  listings: number
  attendance: number
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Miller",
    role: "Senior Agent",
    email: "sarah.m@realtypulse.ai",
    phone: "+1 (305) 555-0123",
    initials: "SM",
    status: "online",
    deals: 24,
    revenue: 4200000,
    target: 4000000,
    listings: 12,
    attendance: 98,
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Senior Agent",
    email: "james.w@realtypulse.ai",
    phone: "+1 (305) 555-0124",
    initials: "JW",
    status: "online",
    deals: 21,
    revenue: 3800000,
    target: 3500000,
    listings: 10,
    attendance: 95,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Agent",
    email: "emily.c@realtypulse.ai",
    phone: "+1 (305) 555-0125",
    initials: "EC",
    status: "away",
    deals: 18,
    revenue: 3200000,
    target: 3000000,
    listings: 8,
    attendance: 92,
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Agent",
    email: "michael.b@realtypulse.ai",
    phone: "+1 (305) 555-0126",
    initials: "MB",
    status: "online",
    deals: 15,
    revenue: 2800000,
    target: 3000000,
    listings: 7,
    attendance: 88,
  },
  {
    id: 5,
    name: "David Lee",
    role: "Junior Agent",
    email: "david.l@realtypulse.ai",
    phone: "+1 (305) 555-0127",
    initials: "DL",
    status: "offline",
    deals: 12,
    revenue: 2100000,
    target: 2500000,
    listings: 5,
    attendance: 90,
  },
  {
    id: 6,
    name: "Jessica Taylor",
    role: "Junior Agent",
    email: "jessica.t@realtypulse.ai",
    phone: "+1 (305) 555-0128",
    initials: "JT",
    status: "online",
    deals: 10,
    revenue: 1800000,
    target: 2000000,
    listings: 4,
    attendance: 94,
  },
]

const activities = [
  { id: 1, user: "Sarah Miller", action: "closed a deal", detail: "Ocean View Penthouse - $4.2M", time: "2 hours ago" },
  { id: 2, user: "James Wilson", action: "added a new listing", detail: "Palm Beach Mansion", time: "3 hours ago" },
  { id: 3, user: "Emily Chen", action: "scheduled a viewing", detail: "Sunset Villa - Tomorrow 2 PM", time: "4 hours ago" },
  { id: 4, user: "Michael Brown", action: "sent a proposal", detail: "To Robert Williams", time: "5 hours ago" },
  { id: 5, user: "David Lee", action: "completed training", detail: "Luxury Property Marketing", time: "6 hours ago" },
]

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  away: "bg-amber-500",
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Leaderboard - sorted by revenue
  const leaderboard = [...teamMembers].sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Team Management
          </h1>
          <p className="text-muted-foreground">
            Monitor performance and manage your team
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Total Team Members</p>
          <p className="text-3xl font-bold text-foreground mt-1">{teamMembers.length}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-xs text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {teamMembers.filter(m => m.status === "online").length} online
            </span>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Total Deals</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {teamMembers.reduce((acc, m) => acc + m.deals, 0)}
          </p>
          <span className="text-xs text-emerald-500">+18% vs last month</span>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            ${(teamMembers.reduce((acc, m) => acc + m.revenue, 0) / 1000000).toFixed(1)}M
          </p>
          <span className="text-xs text-emerald-500">+23% vs last month</span>
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-sm text-muted-foreground">Avg Attendance</p>
          <p className="text-3xl font-bold text-foreground mt-1">
            {Math.round(teamMembers.reduce((acc, m) => acc + m.attendance, 0) / teamMembers.length)}%
          </p>
          <span className="text-xs text-emerald-500">+2% vs last month</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Members Grid */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Team Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredMembers.map((member, index) => (
              <div
                key={member.id}
                className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-border">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background",
                        statusColors[member.status]
                      )} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Assign Task</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="text-lg font-semibold text-foreground">{member.deals}</p>
                    <p className="text-[10px] text-muted-foreground">Deals</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="text-lg font-semibold text-primary">
                      ${(member.revenue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-[10px] text-muted-foreground">Revenue</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="text-lg font-semibold text-foreground">{member.listings}</p>
                    <p className="text-[10px] text-muted-foreground">Listings</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Target Progress</span>
                    <span className="text-foreground">
                      {Math.round((member.revenue / member.target) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(member.revenue / member.target) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Leaderboard</h3>
            </div>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((member, index) => (
                <div key={member.id} className="flex items-center gap-3">
                  <span className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                    index === 0 && "bg-amber-500/20 text-amber-500",
                    index === 1 && "bg-gray-400/20 text-gray-400",
                    index === 2 && "bg-amber-700/20 text-amber-700",
                    index > 2 && "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </span>
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.deals} deals</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    ${(member.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-foreground">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
