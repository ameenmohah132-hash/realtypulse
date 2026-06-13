"use client"

import { useState } from "react"
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MessageCircle, 
  Star,
  MoreVertical,
  Filter,
  ChevronDown,
  Clock,
  DollarSign,
  Calendar
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
import { cn } from "@/lib/utils"

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  initials: string
  avatar?: string
  status: "hot" | "warm" | "cold" | "closed"
  leadScore: number
  lastContact: string
  budget: string
  interests: string[]
  nextFollowUp?: string
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (305) 555-0123",
    initials: "SJ",
    status: "hot",
    leadScore: 95,
    lastContact: "2 hours ago",
    budget: "$3M - $5M",
    interests: ["Penthouse", "Ocean View", "Miami Beach"],
    nextFollowUp: "Today, 4:00 PM",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@company.com",
    phone: "+1 (212) 555-0456",
    initials: "MC",
    status: "hot",
    leadScore: 88,
    lastContact: "Yesterday",
    budget: "$5M - $10M",
    interests: ["Mansion", "Palm Beach", "Waterfront"],
    nextFollowUp: "Tomorrow, 10:00 AM",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@gmail.com",
    phone: "+1 (415) 555-0789",
    initials: "ER",
    status: "warm",
    leadScore: 72,
    lastContact: "3 days ago",
    budget: "$2M - $3M",
    interests: ["Villa", "Malibu", "Modern"],
  },
  {
    id: 4,
    name: "Robert Williams",
    email: "rwilliams@corp.com",
    phone: "+1 (312) 555-0234",
    initials: "RW",
    status: "warm",
    leadScore: 65,
    lastContact: "5 days ago",
    budget: "$4M - $6M",
    interests: ["Commercial", "Downtown", "Investment"],
  },
  {
    id: 5,
    name: "Jennifer Lee",
    email: "jlee@business.com",
    phone: "+1 (617) 555-0567",
    initials: "JL",
    status: "cold",
    leadScore: 45,
    lastContact: "2 weeks ago",
    budget: "$1M - $2M",
    interests: ["Condo", "City View", "New York"],
  },
  {
    id: 6,
    name: "David Thompson",
    email: "dthompson@email.com",
    phone: "+1 (858) 555-0890",
    initials: "DT",
    status: "closed",
    leadScore: 100,
    lastContact: "1 week ago",
    budget: "$8M",
    interests: ["Estate", "Beachfront", "Laguna Beach"],
  },
]

const statusColors = {
  hot: "bg-red-500/10 text-red-500 border-red-500/20",
  warm: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  cold: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  closed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0])

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Contacts CRM
          </h1>
          <p className="text-muted-foreground">
            Manage your client relationships and leads
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="flex gap-6 h-[calc(100vh-14rem)]">
        {/* Contacts List */}
        <div className="w-full lg:w-96 flex flex-col glass-card rounded-xl overflow-hidden">
          {/* Search & Filter */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Filter className="h-3 w-3" />
                Filter
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Badge variant="secondary" className="text-xs">
                All ({contacts.length})
              </Badge>
              <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-500">
                Hot ({contacts.filter(c => c.status === "hot").length})
              </Badge>
            </div>
          </div>

          {/* Contacts */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  "w-full text-left p-4 border-b border-border/50 hover:bg-accent/50 transition-colors",
                  selectedContact?.id === contact.id && "bg-accent/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {contact.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground truncate">
                        {contact.name}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] capitalize", statusColors[contact.status])}
                      >
                        {contact.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {contact.lastContact}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Score: {contact.leadScore}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        {selectedContact && (
          <div className="hidden lg:flex flex-1 flex-col glass-card rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                      {selectedContact.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-foreground">
                        {selectedContact.name}
                      </h2>
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusColors[selectedContact.status])}
                      >
                        {selectedContact.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card">
                      <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-green-500 border-green-500/30 hover:bg-green-500/10">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Lead Score */}
              <div className="glass-card rounded-xl p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Lead Score</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${selectedContact.leadScore}%` }}
                    />
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {selectedContact.leadScore}
                  </span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs">Budget</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {selectedContact.budget}
                  </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Last Contact</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {selectedContact.lastContact}
                  </p>
                </div>
              </div>

              {/* Next Follow-up */}
              {selectedContact.nextFollowUp && (
                <div className="glass-card rounded-xl p-4 border-l-2 border-l-amber-500">
                  <div className="flex items-center gap-2 text-amber-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-medium">Next Follow-up</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {selectedContact.nextFollowUp}
                  </p>
                </div>
              )}

              {/* Interests */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Timeline placeholder */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Activity Timeline</h3>
                <div className="space-y-3">
                  {[
                    { action: "Email sent", detail: "Follow-up on property viewing", time: "2 hours ago" },
                    { action: "Call completed", detail: "Discussed Ocean View Penthouse", time: "Yesterday" },
                    { action: "Property viewed", detail: "Palm Beach Mansion tour", time: "3 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div>
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.detail}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
