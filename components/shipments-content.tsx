"use client"

import { useState } from "react"
import { Truck, Search, Download, Eye, MapPin, Calendar, Package, MoreHorizontal, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CreateShipmentModal } from "@/components/modals/create-shipment-modal"
import { FiltersModal } from "@/components/modals/filters-modal"
import { ExportModal } from "@/components/modals/export-modal"

export function ShipmentsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const shipments = [
    {
      id: "SHP-001247",
      orderId: "ORD-12847",
      customer: "Acme Corp",
      destination: "New York, NY",
      carrier: "FedEx",
      trackingNumber: "1234567890123",
      status: "In Transit",
      items: 25,
      weight: "45.2 lbs",
      shippedDate: "Dec 27, 2024",
      estimatedDelivery: "Dec 29, 2024",
      actualDelivery: null,
    },
    {
      id: "SHP-001246",
      orderId: "ORD-12846",
      customer: "TechStart Inc",
      destination: "San Francisco, CA",
      carrier: "UPS",
      trackingNumber: "9876543210987",
      status: "Delivered",
      items: 12,
      weight: "23.8 lbs",
      shippedDate: "Dec 26, 2024",
      estimatedDelivery: "Dec 28, 2024",
      actualDelivery: "Dec 28, 2024",
    },
    {
      id: "SHP-001245",
      orderId: "ORD-12845",
      customer: "Global Solutions",
      destination: "Chicago, IL",
      carrier: "DHL",
      trackingNumber: "5555666677778",
      status: "Preparing",
      items: 8,
      weight: "12.5 lbs",
      shippedDate: null,
      estimatedDelivery: "Dec 30, 2024",
      actualDelivery: null,
    },
    {
      id: "SHP-001244",
      orderId: "ORD-12844",
      customer: "Innovation Labs",
      destination: "Austin, TX",
      carrier: "FedEx",
      trackingNumber: "1111222233334",
      status: "Out for Delivery",
      items: 45,
      weight: "78.9 lbs",
      shippedDate: "Dec 25, 2024",
      estimatedDelivery: "Dec 27, 2024",
      actualDelivery: null,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Preparing":
        return <Badge variant="secondary">Preparing</Badge>
      case "Ready to Ship":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Ready to Ship
          </Badge>
        )
      case "In Transit":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            In Transit
          </Badge>
        )
      case "Out for Delivery":
        return (
          <Badge variant="default" className="bg-orange-100 text-orange-800">
            Out for Delivery
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Delivered
          </Badge>
        )
      case "Exception":
        return <Badge variant="destructive">Exception</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search shipments..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready to Ship</SelectItem>
              <SelectItem value="transit">In Transit</SelectItem>
              <SelectItem value="delivery">Out for Delivery</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <FiltersModal type="shipments" />
        </div>
        <div className="flex items-center gap-2">
          <ExportModal type="shipments" />
          <CreateShipmentModal />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Currently shipping</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Successful deliveries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Delivery performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Shipments</CardTitle>
          <CardDescription>Track and manage all warehouse shipments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto font-medium text-blue-600">
                      {shipment.orderId}
                    </Button>
                  </TableCell>
                  <TableCell>{shipment.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{shipment.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      {shipment.trackingNumber}
                    </Button>
                  </TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell>{shipment.items} items</TableCell>
                  <TableCell>{shipment.weight}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{shipment.estimatedDelivery}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Track Shipment
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Print Label
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <MapPin className="h-4 w-4 mr-2" />
                          Update Address
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
