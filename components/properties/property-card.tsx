"use client"

import Image from "next/image"
import { MapPin, Bed, Bath, Square, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Property {
  id: number
  name: string
  location: string
  price: number
  status: "available" | "pending" | "sold" | "rented"
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
  agent: string
  agentInitials: string
  type: string
}

interface PropertyCardProps {
  property: Property
  viewMode: "grid" | "list"
}

const statusColors = {
  available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  sold: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  rented: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

export function PropertyCard({ property, viewMode }: PropertyCardProps) {
  if (viewMode === "list") {
    return (
      <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 sm:h-32 sm:w-48 shrink-0 rounded-lg overflow-hidden">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge
            variant="outline"
            className={cn(
              "absolute top-2 left-2 capitalize text-[10px]",
              statusColors[property.status]
            )}
          >
            {property.status}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {property.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {property.location}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {property.bedrooms}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {property.bathrooms}
              </span>
              <span className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
            <p className="text-xl font-bold text-primary">
              ${(property.price / 1000000).toFixed(2)}M
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              {property.agent}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-200 cursor-pointer group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Badge
          variant="outline"
          className={cn(
            "absolute top-3 left-3 capitalize text-[10px]",
            statusColors[property.status]
          )}
        >
          {property.status}
        </Badge>
        <p className="absolute bottom-3 left-3 text-xl font-bold text-foreground">
          ${(property.price / 1000000).toFixed(2)}M
        </p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Square className="h-3.5 w-3.5" />
              {property.sqft.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
            {property.agentInitials}
          </div>
          <span>{property.agent}</span>
        </div>
      </div>
    </div>
  )
}
