"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface FiltersModalProps {
  type: "inventory" | "orders" | "shipments" | "staff"
}

export function FiltersModal({ type }: FiltersModalProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const getFilterConfig = () => {
    switch (type) {
      case "inventory":
        return {
          title: "Inventory Filters",
          description: "Filter inventory items by various criteria",
          filters: [
            {
              key: "stockStatus",
              label: "Stock Status",
              type: "select",
              options: [
                { value: "in-stock", label: "In Stock" },
                { value: "low-stock", label: "Low Stock" },
                { value: "out-of-stock", label: "Out of Stock" },
              ],
            },
            {
              key: "category",
              label: "Category",
              type: "select",
              options: [
                { value: "electronics", label: "Electronics" },
                { value: "components", label: "Components" },
                { value: "kits", label: "Kits" },
                { value: "accessories", label: "Accessories" },
              ],
            },
            {
              key: "stockRange",
              label: "Stock Range",
              type: "range",
              fields: ["minStock", "maxStock"],
            },
            {
              key: "location",
              label: "Location",
              type: "input",
              placeholder: "e.g., A1-B2",
            },
          ],
        }
      case "orders":
        return {
          title: "Order Filters",
          description: "Filter orders by status, priority, and date range",
          filters: [
            {
              key: "status",
              label: "Order Status",
              type: "checkbox",
              options: [
                { value: "pending", label: "Pending" },
                { value: "processing", label: "Processing" },
                { value: "ready", label: "Ready to Ship" },
                { value: "shipped", label: "Shipped" },
                { value: "delivered", label: "Delivered" },
                { value: "cancelled", label: "Cancelled" },
              ],
            },
            {
              key: "priority",
              label: "Priority",
              type: "checkbox",
              options: [
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ],
            },
            {
              key: "dateRange",
              label: "Date Range",
              type: "range",
              fields: ["startDate", "endDate"],
              inputType: "date",
            },
            {
              key: "orderValue",
              label: "Order Value Range",
              type: "range",
              fields: ["minValue", "maxValue"],
              inputType: "number",
            },
          ],
        }
      case "shipments":
        return {
          title: "Shipment Filters",
          description: "Filter shipments by carrier, status, and destination",
          filters: [
            {
              key: "status",
              label: "Shipment Status",
              type: "checkbox",
              options: [
                { value: "preparing", label: "Preparing" },
                { value: "ready", label: "Ready to Ship" },
                { value: "transit", label: "In Transit" },
                { value: "delivery", label: "Out for Delivery" },
                { value: "delivered", label: "Delivered" },
              ],
            },
            {
              key: "carrier",
              label: "Carrier",
              type: "checkbox",
              options: [
                { value: "fedex", label: "FedEx" },
                { value: "ups", label: "UPS" },
                { value: "dhl", label: "DHL" },
                { value: "usps", label: "USPS" },
              ],
            },
            {
              key: "destination",
              label: "Destination Region",
              type: "select",
              options: [
                { value: "northeast", label: "Northeast" },
                { value: "southeast", label: "Southeast" },
                { value: "midwest", label: "Midwest" },
                { value: "southwest", label: "Southwest" },
                { value: "west", label: "West" },
              ],
            },
          ],
        }
      case "staff":
        return {
          title: "Staff Filters",
          description: "Filter staff by department, status, and performance",
          filters: [
            {
              key: "status",
              label: "Employment Status",
              type: "checkbox",
              options: [
                { value: "active", label: "Active" },
                { value: "on-leave", label: "On Leave" },
                { value: "inactive", label: "Inactive" },
              ],
            },
            {
              key: "department",
              label: "Department",
              type: "checkbox",
              options: [
                { value: "warehouse", label: "Warehouse" },
                { value: "operations", label: "Operations" },
                { value: "shipping", label: "Shipping" },
                { value: "quality", label: "Quality Control" },
              ],
            },
            {
              key: "performance",
              label: "Performance Rating",
              type: "checkbox",
              options: [
                { value: "excellent", label: "Excellent" },
                { value: "good", label: "Good" },
                { value: "average", label: "Average" },
                { value: "needs-improvement", label: "Needs Improvement" },
              ],
            },
          ],
        }
      default:
        return { title: "Filters", description: "", filters: [] }
    }
  }

  const config = getFilterConfig()

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Update active filters
    const active = Object.keys(newFilters).filter((k) => {
      const val = newFilters[k]
      return val && (Array.isArray(val) ? val.length > 0 : val !== "")
    })
    setActiveFilters(active)
  }

  const clearAllFilters = () => {
    setFilters({})
    setActiveFilters([])
  }

  const applyFilters = () => {
    console.log("Applying filters:", filters)
    setOpen(false)
  }

  const renderFilter = (filter: any) => {
    switch (filter.type) {
      case "select":
        return (
          <Select value={filters[filter.key] || ""} onValueChange={(value) => handleFilterChange(filter.key, value)}>
            <SelectTrigger className="bg-background border-input text-foreground">
              <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {filter.options.map((option: any) => (
                <SelectItem key={option.value} value={option.value} className="text-popover-foreground">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "checkbox":
        return (
          <div className="space-y-2">
            {filter.options.map((option: any) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.key}-${option.value}`}
                  checked={(filters[filter.key] || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const current = filters[filter.key] || []
                    const updated = checked
                      ? [...current, option.value]
                      : current.filter((v: string) => v !== option.value)
                    handleFilterChange(filter.key, updated)
                  }}
                />
                <Label htmlFor={`${filter.key}-${option.value}`} className="text-card-foreground">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )

      case "range":
        return (
          <div className="grid grid-cols-2 gap-2">
            {filter.fields.map((field: string, index: number) => (
              <div key={field} className="space-y-1">
                <Label className="text-xs text-muted-foreground">{index === 0 ? "From" : "To"}</Label>
                <Input
                  type={filter.inputType || "text"}
                  value={filters[field] || ""}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  placeholder={index === 0 ? "Min" : "Max"}
                  className="bg-background border-input text-foreground"
                />
              </div>
            ))}
          </div>
        )

      case "input":
        return (
          <Input
            value={filters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            placeholder={filter.placeholder}
            className="bg-background border-input text-foreground"
          />
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-input bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
              {activeFilters.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">{config.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{config.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-96 overflow-y-auto">
          {config.filters.map((filter, index) => (
            <div key={filter.key}>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-card-foreground">{filter.label}</Label>
                {renderFilter(filter)}
              </div>
              {index < config.filters.length - 1 && <Separator className="mt-4 bg-border" />}
            </div>
          ))}
        </div>

        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filterKey) => (
                <Badge key={filterKey} variant="secondary" className="bg-primary/10 text-primary">
                  {config.filters.find((f) => f.key === filterKey)?.label || filterKey}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-2"
                    onClick={() => handleFilterChange(filterKey, "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={clearAllFilters} className="border-input bg-transparent">
            Clear All
          </Button>
          <Button onClick={applyFilters} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
