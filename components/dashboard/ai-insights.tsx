"use client"

import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const insights = [
  {
    id: 1,
    type: "trend",
    title: "Market Opportunity",
    description: "Luxury condo prices in Miami Beach are up 15% this quarter. Consider targeting high-net-worth clients in the area.",
    icon: TrendingUp,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    action: "View Analysis",
  },
  {
    id: 2,
    type: "alert",
    title: "Follow-up Required",
    description: "3 leads have not been contacted in over 48 hours. Quick follow-up can increase conversion by 40%.",
    icon: AlertCircle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    action: "Contact Now",
  },
  {
    id: 3,
    type: "suggestion",
    title: "Listing Optimization",
    description: "Your Ocean View Penthouse listing could benefit from professional photography. Properties with pro photos sell 32% faster.",
    icon: Lightbulb,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    action: "Learn More",
  },
]

export function AIInsights() {
  return (
    <div className="glass-card rounded-xl p-5 relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              AI Insights
            </h3>
            <p className="text-xs text-muted-foreground">
              Powered by Realty Pulse AI
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className={cn(
                "rounded-lg border border-border/50 p-4 hover:border-primary/30 hover:bg-accent/30 transition-all duration-200 animate-fade-in"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    insight.iconBg
                  )}
                >
                  <insight.icon className={cn("h-4 w-4", insight.iconColor)} />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {insight.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-primary hover:text-primary/80"
                  >
                    {insight.action} →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 border-primary/30 text-primary hover:bg-primary/10"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate More Insights
        </Button>
      </div>
    </div>
  )
}
