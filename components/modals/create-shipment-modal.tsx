"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Truck, Package, MapPin } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function CreateShipmentModal() {
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState("")
  const [carrier, setCarrier] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [weight, setWeight] = useState("")
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" })
  const [insurance, setInsurance] = useState(false)
  const [insuranceValue, setInsuranceValue] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const readyToShipOrders = [
    {
      id: "ORD-12846",
      customer: "TechStart Inc",
      items: 12,
      total: "$1,245.00",
      address: "123 Tech Street, San Francisco, CA 94105",
    },
    {
      id: "ORD-12848",
      customer: "BuildCorp",
      items: 8,
      total: "$567.80",
      address: "456 Construction Ave, Chicago, IL 60601",
    },
    {
      id: "ORD-12849",
      customer: "Innovation Labs",
      items: 15,
      total: "$2,123.45",
      address: "789 Innovation Blvd, Austin, TX 78701",
    },
  ]

  const carriers = [
    { value: "fedex", label: "FedEx", services: ["Ground", "Express", "Overnight"] },
    { value: "ups", label: "UPS", services: ["Ground", "Next Day Air", "2nd Day Air"] },
    { value: "dhl", label: "DHL", services: ["Express", "Ground"] },
    { value: "usps", label: "USPS", services: ["Priority", "Express", "Ground"] },
  ]

  const selectedCarrierData = carriers.find((c) => c.value === carrier)

  const generateTrackingNumber = () => {
    const prefix = carrier.toUpperCase()
    const number = Math.random().toString().substr(2, 10)
    setTrackingNumber(`${prefix}${number}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const shipmentData = {
      orderId: selectedOrder,
      carrier,
      serviceType,
      trackingNumber,
      weight,
      dimensions,
      insurance,
      insuranceValue,
      specialInstructions,
    }
    console.log("Creating shipment:", shipmentData)

    // Reset form
    setSelectedOrder("")
    setCarrier("")
    setServiceType("")
    setTrackingNumber("")
    setWeight("")
    setDimensions({ length: "", width: "", height: "" })
    setInsurance(false)
    setInsuranceValue("")
    setSpecialInstructions("")
    setOpen(false)
  }

  const selectedOrderData = readyToShipOrders.find((order) => order.id === selectedOrder)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Shipment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Create New Shipment</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select an order and configure shipping details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Package className="h-5 w-5" />
                Select Order
              </CardTitle>
              <CardDescription className="text-muted-foreground">Choose from orders ready to ship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order" className="text-card-foreground">
                  Order *
                </Label>
                <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                  <SelectTrigger className="bg-background border-input text-foreground">
                    <SelectValue placeholder="Select an order to ship" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {readyToShipOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id} className="text-popover-foreground">
                        {order.id} - {order.customer} ({order.items} items)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedOrderData && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-card-foreground">{selectedOrderData.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrderData.items} items • {selectedOrderData.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Shipping Address:</p>
                      <p className="text-sm text-muted-foreground">{selectedOrderData.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carrier & Service */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Truck className="h-5 w-5" />
                  Carrier & Service
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Select shipping carrier and service type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="carrier" className="text-card-foreground">
                    Carrier *
                  </Label>
                  <Select value={carrier} onValueChange={setCarrier}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {carriers.map((carrierOption) => (
                        <SelectItem
                          key={carrierOption.value}
                          value={carrierOption.value}
                          className="text-popover-foreground"
                        >
                          {carrierOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCarrierData && (
                  <div className="space-y-2">
                    <Label htmlFor="service-type" className="text-card-foreground">
                      Service Type *
                    </Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger className="bg-background border-input text-foreground">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {selectedCarrierData.services.map((service) => (
                          <SelectItem
                            key={service}
                            value={service.toLowerCase().replace(/\s+/g, "-")}
                            className="text-popover-foreground"
                          >
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="tracking" className="text-card-foreground">
                    Tracking Number
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tracking"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter or generate tracking number"
                      className="bg-background border-input text-foreground"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateTrackingNumber}
                      disabled={!carrier}
                      className="border-input bg-transparent"
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Package className="h-5 w-5" />
                  Package Details
                </CardTitle>
                <CardDescription className="text-muted-foreground">Enter package weight and dimensions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-card-foreground">
                    Weight (lbs) *
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0.0"
                    required
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Dimensions (inches)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                      placeholder="Length"
                      className="bg-background border-input text-foreground"
                    />
                    <Input
                      type="number"
                      step="0.1"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                      placeholder="Width"
                      className="bg-background border-input text-foreground"
                    />
                    <Input
                      type="number"
                      step="0.1"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                      placeholder="Height"
                      className="bg-background border-input text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                        id="insurance"
                        checked={insurance}
                        onCheckedChange={(checked) => setInsurance(checked === true)}
                    />
                    <Label htmlFor="insurance" className="text-card-foreground">
                      Add shipping insurance
                    </Label>
                  </div>


                  {insurance && (
                    <div className="space-y-2">
                      <Label htmlFor="insurance-value" className="text-card-foreground">
                        Insurance Value ($)
                      </Label>
                      <Input
                        id="insurance-value"
                        type="number"
                        step="0.01"
                        value={insuranceValue}
                        onChange={(e) => setInsuranceValue(e.target.value)}
                        placeholder="0.00"
                        className="bg-background border-input text-foreground"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Instructions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <MapPin className="h-5 w-5" />
                Special Instructions
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Add any special delivery instructions or notes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Enter special delivery instructions, gate codes, or other notes..."
                rows={3}
                className="bg-background border-input text-foreground"
              />
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-input">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedOrder || !carrier || !serviceType || !weight}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Shipment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
