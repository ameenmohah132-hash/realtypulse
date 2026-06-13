"use client"

import { Calendar, Clock, MapPin, Video, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const meetings = [
  {
    id: 1,
    title: "Property Viewing - Ocean View Penthouse",
    client: "Sarah Johnson",
    clientInitials: "SJ",
    time: "Today, 3:00 PM",
    location: "123 Ocean Drive, Miami",
    type: "in-person",
    urgent: true,
  },
  {
    id: 2,
    title: "Contract Review Meeting",
    client: "Michael Chen",
    clientInitials: "MC",
    time: "Tomorrow, 10:00 AM",
    location: "Zoom",
    type: "virtual",
    urgent: false,
  },
  {
    id: 3,
    title: "Team Strategy Session",
    client: "Sales Team",
    clientInitials: "ST",
    time: "Tomorrow, 2:00 PM",
    location: "Conference Room A",
    type: "in-person",
    urgent: false,
  },
  {
    id: 4,
    title: "New Listing Presentation",
    client: "Robert Williams",
    clientInitials: "RW",
    time: "Wed, 11:00 AM",
    location: "Client Office",
    type: "in-person",
    urgent: false,
  },
]

export function UpcomingMeetings() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Upcoming Meetings
        </h3>
        <Button variant="ghost" size="sm" className="text-primary">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar
        </Button>
      </div>
      <div className="space-y-3">
        {meetings.map((meeting, index) => (
          <div
            key={meeting.id}
            className={cn(
              "group relative rounded-lg border border-border/50 p-4 hover:border-primary/30 hover:bg-accent/30 transition-all duration-200 cursor-pointer animate-fade-in",
              meeting.urgent && "border-l-2 border-l-amber-500"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={`/avatars/${meeting.id}.jpg`} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {meeting.clientInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {meeting.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {meeting.client}
                    </span>
                  </div>
                </div>
              </div>
              {meeting.urgent && (
                <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                  Today
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {meeting.time}
              </span>
              <span className="flex items-center gap-1">
                {meeting.type === "virtual" ? (
                  <Video className="h-3 w-3" />
                ) : (
                  <MapPin className="h-3 w-3" />
                )}
                {meeting.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
