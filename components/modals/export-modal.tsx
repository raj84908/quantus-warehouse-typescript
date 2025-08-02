"use client"

import { useState } from "react"
import { Download, FileText, CheckCircle } from "lucide-react"

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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExportModalProps {
  type: "inventory" | "orders" | "shipments" | "staff"
}

export function ExportModal({ type }: ExportModalProps) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState("csv")
  const [dateRange, setDateRange] = useState("all")
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)

  const getExportConfig = () => {
    switch (type) {
      case "inventory":
        return {
          title: "Export Inventory Data",
          description: "Export your inventory items to various formats",
          fields: [
            { key: "sku", label: "SKU", default: true },
            { key: "name", label: "Product Name", default: true },
            { key: "category", label: "Category", default: true },
            { key: "stock", label: "Current Stock", default: true },
            { key: "minStock", label: "Minimum Stock", default: true },
            { key: "location", label: "Location", default: true },
            { key: "value", label: "Unit Value", default: true },
            { key: "supplier", label: "Supplier", default: false },
            { key: "lastUpdated", label: "Last Updated", default: false },
          ],
        }
      case "orders":
        return {
          title: "Export Orders Data",
          description: "Export order information and details",
          fields: [
            { key: "orderId", label: "Order ID", default: true },
            { key: "customer", label: "Customer", default: true },
            { key: "items", label: "Items Count", default: true },
            { key: "total", label: "Order Total", default: true },
            { key: "status", label: "Status", default: true },
            { key: "priority", label: "Priority", default: true },
            { key: "date", label: "Order Date", default: true },
            { key: "dueDate", label: "Due Date", default: true },
            { key: "assignedTo", label: "Assigned To", default: false },
          ],
        }
      case "shipments":
        return {
          title: "Export Shipments Data",
          description: "Export shipment tracking and delivery information",
          fields: [
            { key: "shipmentId", label: "Shipment ID", default: true },
            { key: "orderId", label: "Order ID", default: true },
            { key: "customer", label: "Customer", default: true },
            { key: "destination", label: "Destination", default: true },
            { key: "carrier", label: "Carrier", default: true },
            { key: "trackingNumber", label: "Tracking Number", default: true },
            { key: "status", label: "Status", default: true },
            { key: "shippedDate", label: "Shipped Date", default: true },
            { key: "estimatedDelivery", label: "Estimated Delivery", default: true },
          ],
        }
      case "staff":
        return {
          title: "Export Staff Data",
          description: "Export employee information and details",
          fields: [
            { key: "employeeId", label: "Employee ID", default: true },
            { key: "name", label: "Full Name", default: true },
            { key: "email", label: "Email", default: true },
            { key: "department", label: "Department", default: true },
            { key: "position", label: "Position", default: true },
            { key: "status", label: "Status", default: true },
            { key: "hireDate", label: "Hire Date", default: true },
            { key: "phone", label: "Phone Number", default: false },
            { key: "performance", label: "Performance Rating", default: false },
          ],
        }
      default:
        return { title: "Export Data", description: "", fields: [] }
    }
  }

  const config = getExportConfig()

  // Initialize selected fields with defaults
  useState(() => {
    const defaultFields = config.fields.filter((field) => field.default).map((field) => field.key)
    setSelectedFields(defaultFields)
  })

  const handleFieldToggle = (fieldKey: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldKey) ? prev.filter((key) => key !== fieldKey) : [...prev, fieldKey],
    )
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsExporting(false)
          setExportComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate file generation
    setTimeout(() => {
      console.log("Export completed:", {
        type,
        format,
        dateRange,
        includeHeaders,
        selectedFields,
      })
    }, 2000)
  }

  const downloadFile = () => {
    // Simulate file download
    const filename = `${type}_export_${new Date().toISOString().split("T")[0]}.${format}`
    console.log("Downloading file:", filename)

    // Reset modal state
    setExportComplete(false)
    setExportProgress(0)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-input bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">{config.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{config.description}</DialogDescription>
        </DialogHeader>

        {!exportComplete ? (
          <div className="space-y-6">
            {/* Export Format */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Export Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="bg-background border-input text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="csv" className="text-popover-foreground">
                    CSV (Comma Separated)
                  </SelectItem>
                  <SelectItem value="xlsx" className="text-popover-foreground">
                    Excel (.xlsx)
                  </SelectItem>
                  <SelectItem value="pdf" className="text-popover-foreground">
                    PDF Report
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-background border-input text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all" className="text-popover-foreground">
                    All Time
                  </SelectItem>
                  <SelectItem value="today" className="text-popover-foreground">
                    Today
                  </SelectItem>
                  <SelectItem value="week" className="text-popover-foreground">
                    This Week
                  </SelectItem>
                  <SelectItem value="month" className="text-popover-foreground">
                    This Month
                  </SelectItem>
                  <SelectItem value="quarter" className="text-popover-foreground">
                    This Quarter
                  </SelectItem>
                  <SelectItem value="year" className="text-popover-foreground">
                    This Year
                  </SelectItem>
                  <SelectItem value="custom" className="text-popover-foreground">
                    Custom Range
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-card-foreground">Start Date</Label>
                  <Input type="date" className="bg-background border-input text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-card-foreground">End Date</Label>
                  <Input type="date" className="bg-background border-input text-foreground" />
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Export Options</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-headers" checked={includeHeaders} onCheckedChange={setIncludeHeaders} />
                <Label htmlFor="include-headers" className="text-card-foreground">
                  Include column headers
                </Label>
              </div>
            </div>

            {/* Field Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">
                Select Fields ({selectedFields.length} of {config.fields.length})
              </Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-md bg-background">
                {config.fields.map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.key}
                      checked={selectedFields.includes(field.key)}
                      onCheckedChange={() => handleFieldToggle(field.key)}
                    />
                    <Label htmlFor={field.key} className="text-sm text-card-foreground">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Progress */}
            {isExporting && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-card-foreground">Export Progress</Label>
                <Progress value={exportProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Exporting {type} data... {exportProgress}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-card-foreground">Export Complete!</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your {type} data has been successfully exported
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-card-foreground">
                  {type}_export_{new Date().toISOString().split("T")[0]}.{format}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedFields.length} fields • {format.toUpperCase()} format
                </p>
              </div>
              <Button onClick={downloadFile} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Download File
              </Button>
            </CardContent>
          </Card>
        )}

        {!exportComplete && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isExporting} className="border-input">
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || selectedFields.length === 0}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isExporting ? "Exporting..." : "Export Data"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
