"use client"

import { useState } from "react"
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  Filter,
  SlidersHorizontal,
  ChevronDown 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PropertyCard, Property } from "@/components/properties/property-card"

const properties: Property[] = [
  {
    id: 1,
    name: "Ocean View Penthouse",
    location: "Miami Beach, FL",
    price: 4200000,
    status: "available",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    agent: "Sarah Miller",
    agentInitials: "SM",
    type: "Penthouse",
  },
  {
    id: 2,
    name: "Palm Beach Mansion",
    location: "Palm Beach, FL",
    price: 8500000,
    status: "pending",
    bedrooms: 7,
    bathrooms: 6,
    sqft: 8200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    agent: "James Wilson",
    agentInitials: "JW",
    type: "Mansion",
  },
  {
    id: 3,
    name: "Sunset Villa",
    location: "Malibu, CA",
    price: 6800000,
    status: "available",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 5400,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    agent: "Emily Chen",
    agentInitials: "EC",
    type: "Villa",
  },
  {
    id: 4,
    name: "Downtown Luxury Condo",
    location: "New York, NY",
    price: 3200000,
    status: "sold",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    agent: "Michael Brown",
    agentInitials: "MB",
    type: "Condo",
  },
  {
    id: 5,
    name: "Beachfront Estate",
    location: "Laguna Beach, CA",
    price: 12500000,
    status: "available",
    bedrooms: 8,
    bathrooms: 7,
    sqft: 10500,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    agent: "Sarah Miller",
    agentInitials: "SM",
    type: "Estate",
  },
  {
    id: 6,
    name: "Harbor View Apartment",
    location: "San Diego, CA",
    price: 1850000,
    status: "rented",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    agent: "David Lee",
    agentInitials: "DL",
    type: "Apartment",
  },
  {
    id: 7,
    name: "Mountain Retreat",
    location: "Aspen, CO",
    price: 7200000,
    status: "available",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 6800,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    agent: "Emily Chen",
    agentInitials: "EC",
    type: "Retreat",
  },
  {
    id: 8,
    name: "Skyline Penthouse",
    location: "Chicago, IL",
    price: 4800000,
    status: "pending",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    agent: "James Wilson",
    agentInitials: "JW",
    type: "Penthouse",
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(property.status)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Properties
          </h1>
          <p className="text-muted-foreground">
            Manage your luxury property portfolio
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary/50 border-border"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status
                  {statusFilter.length > 0 && (
                    <span className="ml-1 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {statusFilter.length}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                {["available", "pending", "sold", "rented"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={(checked) => {
                      setStatusFilter(
                        checked
                          ? [...statusFilter, status]
                          : statusFilter.filter((s) => s !== status)
                      )
                    }}
                    className="capitalize"
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-high">Price: High</SelectItem>
                <SelectItem value="price-low">Price: Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex rounded-lg border border-border bg-secondary/50 p-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${viewMode === "grid" ? "bg-accent" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${viewMode === "list" ? "bg-accent" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredProperties.length} of {properties.length} properties
      </p>

      {/* Properties Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "space-y-4"
        }
      >
        {filteredProperties.map((property, index) => (
          <div
            key={property.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <PropertyCard property={property} viewMode={viewMode} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-lg font-medium text-foreground">
            No properties found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}
