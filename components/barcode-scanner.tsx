"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, X, Check, AlertCircle, Package, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScannedItem {
  barcode: string
  sku: string
  name: string
  currentStock: number
  location: string
  lastUpdated: string
}

interface ScanResult {
  success: boolean
  item?: ScannedItem
  error?: string
}

export function BarcodeScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanMode, setScanMode] = useState<"lookup" | "receive" | "pick" | "count">("lookup")
  const [quantity, setQuantity] = useState("1")
  const [manualBarcode, setManualBarcode] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Mock barcode database
  const mockDatabase: Record<string, ScannedItem> = {
    "123456789012": {
      barcode: "123456789012",
      sku: "WPA-001",
      name: "Widget Pro A",
      currentStock: 847,
      location: "A1-B2",
      lastUpdated: "2 hours ago",
    },
    "234567890123": {
      barcode: "234567890123",
      sku: "CX-205",
      name: "Component X",
      currentStock: 623,
      location: "B3-C1",
      lastUpdated: "4 hours ago",
    },
    "345678901234": {
      barcode: "345678901234",
      sku: "PK-150",
      name: "Premium Kit",
      currentStock: 12,
      location: "C2-D4",
      lastUpdated: "1 hour ago",
    },
  }

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)

        // Start barcode detection simulation
        setTimeout(() => {
          simulateBarcodeDetection()
        }, 2000)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setScanResult({
        success: false,
        error: "Camera access denied. Please enable camera permissions or use manual entry.",
      })
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const simulateBarcodeDetection = () => {
    // Simulate barcode detection after 2 seconds
    const barcodes = Object.keys(mockDatabase)
    const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)]
    processBarcode(randomBarcode)
  }

  const processBarcode = (barcode: string) => {
    const item = mockDatabase[barcode]

    if (item) {
      setScanResult({
        success: true,
        item: item,
      })
      stopScanning()
    } else {
      setScanResult({
        success: false,
        error: `Item not found for barcode: ${barcode}`,
      })
    }
  }

  const handleManualEntry = () => {
    if (manualBarcode.trim()) {
      processBarcode(manualBarcode.trim())
      setManualBarcode("")
    }
  }

  const handleInventoryAction = () => {
    if (!scanResult?.item) return

    const qty = Number.parseInt(quantity)
    const item = scanResult.item

    switch (scanMode) {
      case "receive":
        // Simulate receiving inventory
        console.log(`Receiving ${qty} units of ${item.name}`)
        alert(`✅ Received ${qty} units of ${item.name}\nNew stock: ${item.currentStock + qty}`)
        break
      case "pick":
        // Simulate picking for order
        console.log(`Picking ${qty} units of ${item.name}`)
        if (qty <= item.currentStock) {
          alert(`✅ Picked ${qty} units of ${item.name}\nRemaining stock: ${item.currentStock - qty}`)
        } else {
          alert(`❌ Insufficient stock! Only ${item.currentStock} units available`)
        }
        break
      case "count":
        // Simulate cycle count
        console.log(`Cycle count: ${qty} units of ${item.name}`)
        const difference = qty - item.currentStock
        alert(
          `📊 Cycle Count Recorded\nSystem: ${item.currentStock} | Counted: ${qty}\nDifference: ${difference > 0 ? "+" : ""}${difference}`,
        )
        break
      default:
        // Lookup mode - just display info
        break
    }

    // Reset for next scan
    setScanResult(null)
    setQuantity("1")
  }

  const getScanModeDescription = () => {
    switch (scanMode) {
      case "lookup":
        return "View item information and current stock levels"
      case "receive":
        return "Add received inventory to stock levels"
      case "pick":
        return "Remove items from inventory for order fulfillment"
      case "count":
        return "Perform cycle counting and inventory audits"
      default:
        return ""
    }
  }

  const getScanModeColor = () => {
    switch (scanMode) {
      case "lookup":
        return "bg-blue-100 text-blue-800"
      case "receive":
        return "bg-green-100 text-green-800"
      case "pick":
        return "bg-orange-100 text-orange-800"
      case "count":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Scanner Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Barcode Scanner
          </CardTitle>
          <CardDescription>Scan barcodes for inventory management operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scan-mode">Scan Mode</Label>
            <Select value={scanMode} onValueChange={(value: any) => setScanMode(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lookup">🔍 Lookup - View Item Info</SelectItem>
                <SelectItem value="receive">📦 Receive - Add Inventory</SelectItem>
                <SelectItem value="pick">📤 Pick - Remove for Orders</SelectItem>
                <SelectItem value="count">📊 Count - Cycle Counting</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{getScanModeDescription()}</p>
          </div>

          <Badge className={getScanModeColor()}>{scanMode.toUpperCase()} MODE</Badge>
        </CardContent>
      </Card>

      {/* Camera Scanner */}
      <Card>
        <CardHeader>
          <CardTitle>Camera Scanner</CardTitle>
          <CardDescription>Use your device camera to scan barcodes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning ? (
            <Button onClick={startScanning} className="w-full" size="lg">
              <Camera className="h-4 w-4 mr-2" />
              Start Camera Scanner
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-64 bg-black rounded-lg object-cover" />
                <canvas ref={canvasRef} className="hidden" />

                {/* Scanner overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-32 border-2 border-red-500 border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                      Align barcode here
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={stopScanning} variant="outline" className="w-full bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Stop Scanner
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Entry</CardTitle>
          <CardDescription>Enter barcode manually if camera scanning is not available</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter barcode number..."
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleManualEntry()}
            />
            <Button onClick={handleManualEntry} disabled={!manualBarcode.trim()}>
              <Search className="h-4 w-4 mr-2" />
              Lookup
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Try: 123456789012, 234567890123, or 345678901234</p>
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {scanResult.success ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              Scan Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scanResult.success && scanResult.item ? (
              <div className="space-y-4">
                {/* Item Information */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">SKU</Label>
                    <p className="font-mono">{scanResult.item.sku}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Barcode</Label>
                    <p className="font-mono">{scanResult.item.barcode}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">Product Name</Label>
                    <p className="font-semibold">{scanResult.item.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Current Stock</Label>
                    <p className="text-lg font-bold text-blue-600">{scanResult.item.currentStock}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p>{scanResult.item.location}</p>
                  </div>
                </div>

                {/* Quantity Input for Actions */}
                {scanMode !== "lookup" && (
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}

                {/* Action Button */}
                <div className="flex gap-2">
                  {scanMode === "lookup" ? (
                    <Button onClick={() => setScanResult(null)} className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      Scan Another Item
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleInventoryAction} className="flex-1">
                        <Check className="h-4 w-4 mr-2" />
                        {scanMode === "receive" && "Receive Items"}
                        {scanMode === "pick" && "Pick Items"}
                        {scanMode === "count" && "Record Count"}
                      </Button>
                      <Button onClick={() => setScanResult(null)} variant="outline">
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{scanResult.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Select Scan Mode</p>
                <p className="text-muted-foreground">Choose the type of operation you want to perform</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Scan or Enter Barcode</p>
                <p className="text-muted-foreground">Use camera scanner or manual entry</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Review & Confirm</p>
                <p className="text-muted-foreground">Verify item details and enter quantity if needed</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </div>
              <div>
                <p className="font-medium">Complete Action</p>
                <p className="text-muted-foreground">Execute the inventory operation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
