"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { 
  Plus, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Mail,
  Sparkles,
  Eye,
  MousePointer,
  Users,
  Calendar,
  Clock,
  MoreVertical,
  Play,
  Pause,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const campaignData = [
  { name: "Week 1", impressions: 45000, clicks: 2800, conversions: 145 },
  { name: "Week 2", impressions: 52000, clicks: 3200, conversions: 178 },
  { name: "Week 3", impressions: 48000, clicks: 2950, conversions: 156 },
  { name: "Week 4", impressions: 61000, clicks: 4100, conversions: 210 },
]

const emailPerformance = [
  { name: "Mon", opened: 245, clicked: 89 },
  { name: "Tue", opened: 312, clicked: 124 },
  { name: "Wed", opened: 278, clicked: 98 },
  { name: "Thu", opened: 356, clicked: 142 },
  { name: "Fri", opened: 289, clicked: 105 },
  { name: "Sat", opened: 198, clicked: 67 },
  { name: "Sun", opened: 167, clicked: 52 },
]

interface Campaign {
  id: number
  name: string
  platform: "instagram" | "facebook" | "linkedin" | "twitter" | "email"
  status: "active" | "paused" | "scheduled" | "completed"
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  startDate: string
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Luxury Miami Beach Collection",
    platform: "instagram",
    status: "active",
    budget: 5000,
    spent: 3250,
    impressions: 125000,
    clicks: 4800,
    conversions: 156,
    startDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Q1 Property Showcase",
    platform: "facebook",
    status: "active",
    budget: 3500,
    spent: 2100,
    impressions: 89000,
    clicks: 3200,
    conversions: 98,
    startDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Investor Newsletter",
    platform: "email",
    status: "completed",
    budget: 500,
    spent: 500,
    impressions: 12500,
    clicks: 2100,
    conversions: 245,
    startDate: "2024-01-10",
  },
  {
    id: 4,
    name: "LinkedIn Luxury Network",
    platform: "linkedin",
    status: "paused",
    budget: 2500,
    spent: 1200,
    impressions: 45000,
    clicks: 1800,
    conversions: 42,
    startDate: "2024-01-05",
  },
  {
    id: 5,
    name: "Spring Collection Launch",
    platform: "instagram",
    status: "scheduled",
    budget: 8000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    startDate: "2024-02-01",
  },
]

const scheduledPosts = [
  {
    id: 1,
    content: "Discover the epitome of luxury living at Ocean View Penthouse...",
    platform: "instagram",
    scheduledFor: "Today, 2:00 PM",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80",
  },
  {
    id: 2,
    content: "Just listed: Stunning Palm Beach Mansion with private beach access...",
    platform: "facebook",
    scheduledFor: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80",
  },
  {
    id: 3,
    content: "Market insight: Why Miami Beach remains a top luxury destination...",
    platform: "linkedin",
    scheduledFor: "Wed, 9:00 AM",
    image: null,
  },
]

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

const platformColors = {
  instagram: "text-pink-500 bg-pink-500/10",
  facebook: "text-blue-600 bg-blue-600/10",
  linkedin: "text-blue-500 bg-blue-500/10",
  twitter: "text-sky-500 bg-sky-500/10",
  email: "text-amber-500 bg-amber-500/10",
}

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  completed: "bg-muted text-muted-foreground border-border",
}

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Marketing Center
          </h1>
          <p className="text-muted-foreground">
            Campaign management and social media automation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Ad Generator
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Impressions", value: "246K", change: "+12%", icon: Eye },
          { label: "Total Clicks", value: "9.8K", change: "+8%", icon: MousePointer },
          { label: "Conversions", value: "541", change: "+23%", icon: TrendingUp },
          { label: "Audience Reach", value: "182K", change: "+15%", icon: Users },
        ].map((stat, index) => (
          <div key={index} className="glass-card rounded-xl p-5 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <span className="text-xs text-emerald-500">{stat.change} vs last month</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
            <p className="text-sm text-muted-foreground">Weekly overview</p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={campaignData}>
                <defs>
                  <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.75 0.15 180)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.75 0.15 180)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.15 0.01 260 / 0.9)",
                    border: "1px solid oklch(0.25 0.02 260)",
                    borderRadius: "8px",
                  }}
                />
                <Area type="monotone" dataKey="impressions" stroke="oklch(0.75 0.15 180)" strokeWidth={2} fill="url(#impressionsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Email Performance</h3>
            <p className="text-sm text-muted-foreground">Open & click rates</p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.15 0.01 260 / 0.9)",
                    border: "1px solid oklch(0.25 0.02 260)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="opened" fill="oklch(0.75 0.15 180)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicked" fill="oklch(0.7 0.17 155)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Campaigns & Scheduled Posts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Campaigns */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Campaigns</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {campaigns.map((campaign) => {
              const Icon = platformIcons[campaign.platform]
              return (
                <div key={campaign.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", platformColors[campaign.platform])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{campaign.name}</p>
                      <Badge variant="outline" className={cn("text-[10px] capitalize", statusColors[campaign.status])}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{campaign.impressions.toLocaleString()} impressions</span>
                      <span>{campaign.clicks.toLocaleString()} clicks</span>
                      <span>{campaign.conversions} conversions</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-foreground">${campaign.spent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">of ${campaign.budget.toLocaleString()}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card">
                      <DropdownMenuItem>
                        {campaign.status === "active" ? (
                          <><Pause className="h-4 w-4 mr-2" /> Pause</>
                        ) : (
                          <><Play className="h-4 w-4 mr-2" /> Resume</>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scheduled Posts */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Scheduled Posts</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {scheduledPosts.map((post) => {
              const Icon = platformIcons[post.platform]
              return (
                <div key={post.id} className="p-3 rounded-lg bg-secondary/30 space-y-2">
                  <div className="flex items-start gap-3">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="" 
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">{post.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs", platformColors[post.platform])}>
                      <Icon className="h-3 w-3" />
                      <span className="capitalize">{post.platform}</span>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.scheduledFor}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <Button variant="outline" className="w-full mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Schedule Post
          </Button>
        </div>
      </div>
    </div>
  )
}
