import { KPICard } from "@/components/dashboard/kpi-card"
import { RevenueChart, PropertyTypeChart, PerformanceChart } from "@/components/dashboard/dashboard-charts"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"
import { AIInsights } from "@/components/dashboard/ai-insights"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, James. Here&apos;s your real estate overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <KPICard
          title="Total Properties"
          value={248}
          change={12}
          iconName="building2"
          delay={0}
        />
        <KPICard
          title="Active Clients"
          value={1284}
          change={8}
          iconName="users"
          delay={100}
        />
        <KPICard
          title="Monthly Revenue"
          value="$2.4M"
          change={23}
          iconName="dollarSign"
          iconColor="text-emerald-500"
          delay={200}
        />
        <KPICard
          title="Closed Deals"
          value={47}
          change={15}
          iconName="handshake"
          delay={300}
        />
        <KPICard
          title="New Leads"
          value={156}
          change={32}
          iconName="userPlus"
          iconColor="text-blue-500"
          delay={400}
        />
        <KPICard
          title="Occupancy Rate"
          value="94%"
          change={5}
          iconName="percent"
          iconColor="text-amber-500"
          delay={500}
        />
        <KPICard
          title="Sales Growth"
          value="18%"
          change={7}
          iconName="trendingUp"
          iconColor="text-emerald-500"
          delay={600}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <PropertyTypeChart />
      </div>

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Bottom Section */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ActivityFeed />
        <UpcomingMeetings />
        <AIInsights />
      </div>
    </div>
  )
}
