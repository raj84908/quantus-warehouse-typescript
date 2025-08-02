"use client"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X, Printer, Download, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface QRLabelModalProps {
  isOpen: boolean
  onClose: () => void
  item: any
}

type LabelSize = "small" | "medium" | "large"
type LabelTemplate = "basic" | "detailed" | "compact"

export function QRLabelModal({ isOpen, onClose, item }: QRLabelModalProps) {
  const [labelSize, setLabelSize] = useState<LabelSize>("medium")
  const [labelTemplate, setLabelTemplate] = useState<LabelTemplate>("detailed")
  const [copies, setCopies] = useState(1)
  const [includeDate, setIncludeDate] = useState(true)
  const printRef = useRef<HTMLDivElement>(null)

  const labelSizes = {
    small: { width: "2.5in", height: "1.5in", qrSize: 60 },
    medium: { width: "4in", height: "2.5in", qrSize: 100 },
    large: { width: "4in", height: "3in", qrSize: 120 }
  }

  const currentSize = labelSizes[labelSize]

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML
      const originalContent = document.body.innerHTML
      
      // Create print styles
      const printStyles = `
        <style>
          @media print {
            body { margin: 0; padding: 20px; }
            .print-label { 
              width: ${currentSize.width}; 
              height: ${currentSize.height}; 
              page-break-after: always; 
              border: 1px solid #ccc;
              margin-bottom: 10px;
            }
            .no-print { display: none !important; }
          }
          .print-label {
            width: ${currentSize.width};
            height: ${currentSize.height};
            border: 2px solid #000;
            padding: 8px;
            font-family: Arial, sans-serif;
            display: flex;
            box-sizing: border-box;
            margin-bottom: 10px;
          }
        </style>
      `
      
      document.body.innerHTML = printStyles + printContent
      window.print()
      document.body.innerHTML = originalContent
      window.location.reload()
    }
  }

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
    } else if (stock <= minStock) {
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">Low Stock</Badge>
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800 text-xs">In Stock</Badge>
    }
  }

  const BasicLabel = () => (
    <div className="print-label flex items-center gap-4 bg-white">
      <div className="flex-shrink-0">
        <QRCodeSVG
          value={JSON.stringify({
            id: item.id,
            name: item.name,
            location: item.location
          })}
          size={currentSize.qrSize}
          level="M"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-lg truncate">{item.name}</div>
        <div className="text-sm text-gray-600">SKU: {item.id}</div>
        <div className="text-sm text-gray-600">Location: {item.location}</div>
        <div className="text-sm font-medium">Stock: {item.stock}</div>
      </div>
    </div>
  )

  const DetailedLabel = () => (
    <div className="print-label bg-white p-2" style={{ flexDirection: 'column' }}>
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-shrink-0">
          <QRCodeSVG
            value={JSON.stringify({
              id: item.id,
              name: item.name,
              location: item.location,
              category: item.category,
              value: item.value
            })}
            size={currentSize.qrSize}
            level="M"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-base mb-1 leading-tight">{item.name}</div>
          <div className="text-xs text-gray-600 mb-1">SKU: {item.id}</div>
          <div className="text-xs text-gray-600 mb-1">Category: {item.category}</div>
          <div className="text-xs text-gray-600 mb-1">Value: {item.value}</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-600">Status:</span>
            {getStatusBadge(item.status, item.stock, item.minStock)}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-2 mt-auto">
        <div className="flex justify-between items-center">
          <div className="text-xs">
            <div className="font-medium">Stock: {item.stock} / Min: {item.minStock}</div>
            <div className="text-gray-600">Location: {item.location}</div>
          </div>
          {includeDate && (
            <div className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const CompactLabel = () => (
    <div className="print-label flex items-center gap-2 bg-white p-1">
      <div className="flex-shrink-0">
        <QRCodeSVG
          value={JSON.stringify({
            id: item.id,
            location: item.location
          })}
          size={currentSize.qrSize}
          level="M"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">{item.name}</div>
        <div className="text-xs text-gray-600">SKU: {item.id}</div>
        <div className="text-xs text-gray-600">Loc: {item.location}</div>
        <div className="text-xs font-medium">Qty: {item.stock}</div>
        <div className="text-xs text-gray-500">{item.value}</div>
      </div>
    </div>
  )

  const renderLabel = () => {
    switch (labelTemplate) {
      case "basic":
        return <BasicLabel />
      case "detailed":
        return <DetailedLabel />
      case "compact":
        return <CompactLabel />
      default:
        return <DetailedLabel />
    }
  }

  const renderMultipleLabels = () => {
    return Array.from({ length: copies }, (_, index) => (
      <div key={index} className="mb-4">
        {renderLabel()}
      </div>
    ))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Generate QR Label - {item?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Label Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 p-4 bg-gray-50 rounded-lg">
                    <div ref={printRef}>
                      {renderMultipleLabels()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Size: {currentSize.width} × {currentSize.height} • Template: {labelTemplate} • Copies: {copies}
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePrint} className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Print Labels
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Label Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="label-size">Label Size</Label>
                      <Select value={labelSize} onValueChange={(value: LabelSize) => setLabelSize(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (2.5" × 1.5")</SelectItem>
                          <SelectItem value="medium">Medium (4" × 2.5")</SelectItem>
                          <SelectItem value="large">Large (4" × 3")</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="label-template">Template</Label>
                      <Select value={labelTemplate} onValueChange={(value: LabelTemplate) => setLabelTemplate(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Info</SelectItem>
                          <SelectItem value="detailed">Detailed Info</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="copies">Number of Copies</Label>
                      <Input
                        id="copies"
                        type="number"
                        min="1"
                        max="10"
                        value={copies}
                        onChange={(e) => setCopies(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="include-date"
                        checked={includeDate}
                        onChange={(e) => setIncludeDate(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="include-date" className="text-sm">
                        Include print date
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Item Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">SKU:</span>
                        <div className="font-medium">{item?.id}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <div className="font-medium">{item?.category}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Stock:</span>
                        <div className="font-medium">{item?.stock}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <div className="font-medium">{item?.location}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Value:</span>
                        <div className="font-medium">{item?.value}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <div className="mt-1">
                          {item && getStatusBadge(item.status, item.stock, item.minStock)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Labels
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}