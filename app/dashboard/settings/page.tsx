"use client"

import { useState } from "react"
import { 
  User, 
  Palette, 
  Bell, 
  CreditCard, 
  Key, 
  Shield,
  Moon,
  Sun,
  Globe,
  Mail,
  Smartphone,
  Check,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const integrations = [
  {
    name: "Stripe",
    description: "Payment processing and billing",
    icon: CreditCard,
    connected: true,
  },
  {
    name: "Google Calendar",
    description: "Sync meetings and appointments",
    icon: Globe,
    connected: true,
  },
  {
    name: "Mailchimp",
    description: "Email marketing campaigns",
    icon: Mail,
    connected: false,
  },
  {
    name: "Twilio",
    description: "SMS and WhatsApp messaging",
    icon: Smartphone,
    connected: true,
  },
]

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deals: true,
    leads: true,
    marketing: false,
    team: true,
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="glass-card p-1 flex-wrap h-auto">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Key className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>
              <div className="flex-1 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="James" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Davidson" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="james@realtypulse.ai" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (305) 555-0100" className="bg-secondary/50" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Bio</Label>
                  <Input defaultValue="Senior Real Estate Agent specializing in luxury properties" className="bg-secondary/50" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Theme Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {["dark", "light", "system"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={cn(
                        "flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                        theme === t
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {t === "dark" && <Moon className="h-5 w-5" />}
                      {t === "light" && <Sun className="h-5 w-5" />}
                      {t === "system" && <Globe className="h-5 w-5" />}
                      <span className="capitalize">{t}</span>
                      {theme === t && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Accent Color</Label>
                <div className="flex gap-3">
                  {[
                    { name: "Cyan", color: "bg-cyan-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Purple", color: "bg-purple-500" },
                    { name: "Pink", color: "bg-pink-500" },
                    { name: "Orange", color: "bg-orange-500" },
                  ].map((accent) => (
                    <button
                      key={accent.name}
                      className={cn(
                        "h-10 w-10 rounded-full transition-transform hover:scale-110",
                        accent.color,
                        accent.name === "Cyan" && "ring-2 ring-offset-2 ring-offset-background ring-primary"
                      )}
                      title={accent.name}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[200px] bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Email Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Push Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Categories</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "deals", label: "Deals & Transactions", description: "Get notified about deal updates" },
                    { key: "leads", label: "New Leads", description: "Alerts for new lead assignments" },
                    { key: "marketing", label: "Marketing", description: "Campaign performance updates" },
                    { key: "team", label: "Team Activity", description: "Team member actions and updates" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Subscription Plan</h3>
            
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Enterprise Plan</p>
                  <p className="text-xs text-muted-foreground">Unlimited users, all features</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">$299</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">Next billing date</p>
                  <p className="text-xs text-muted-foreground">February 15, 2024</p>
                </div>
                <Button variant="outline" size="sm">View Invoice</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">Payment Method</p>
                  <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline">Cancel Subscription</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">API Integrations</h3>
            
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <integration.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.connected ? (
                      <>
                        <span className="flex items-center gap-1 text-xs text-emerald-500">
                          <Check className="h-3 w-3" />
                          Connected
                        </span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </>
                    ) : (
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="mt-4 gap-2">
              <ExternalLink className="h-4 w-4" />
              Browse All Integrations
            </Button>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Security Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Password</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" className="bg-secondary/50" />
                  </div>
                  <div />
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input type="password" className="bg-secondary/50" />
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Update Password
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">2FA Enabled</p>
                      <p className="text-xs text-muted-foreground">
                        Your account is protected with two-factor authentication
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Sessions</h4>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Active Sessions</p>
                      <p className="text-xs text-muted-foreground">
                        You are logged in on 2 devices
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Sign Out All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
