"use client"

import { useState } from "react"
import { ShoppingCart, Search, Download, Eye, Edit, Truck, MoreHorizontal, Calendar, User, Package } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { NewOrderModal } from "@/components/modals/new-order-modal"
import { FiltersModal } from "@/components/modals/filters-modal"
import { ExportModal } from "@/components/modals/export-modal"

export function OrdersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const allOrders = [
    {
      id: "ORD-12847",
      customer: "Acme Corp",
      customerEmail: "orders@acme.com",
      items: 25,
      total: "$2,847.50",
      status: "Processing",
      priority: "High",
      date: "Dec 27, 2024",
      dueDate: "Dec 29, 2024",
      assignedTo: "John Smith",
    },
    {
      id: "ORD-12846",
      customer: "TechStart Inc",
      customerEmail: "procurement@techstart.com",
      items: 12,
      total: "$1,245.00",
      status: "Ready to Ship",
      priority: "Medium",
      date: "Dec 27, 2024",
      dueDate: "Dec 28, 2024",
      assignedTo: "Sarah Johnson",
    },
    {
      id: "ORD-12845",
      customer: "Global Solutions",
      customerEmail: "supply@globalsol.com",
      items: 8,
      total: "$567.80",
      status: "Shipped",
      priority: "Low",
      date: "Dec 26, 2024",
      dueDate: "Dec 27, 2024",
      assignedTo: "Mike Davis",
    },
    {
      id: "ORD-12844",
      customer: "Innovation Labs",
      customerEmail: "orders@innovlabs.com",
      items: 45,
      total: "$4,123.75",
      status: "Pending",
      priority: "High",
      date: "Dec 26, 2024",
      dueDate: "Dec 30, 2024",
      assignedTo: "Lisa Chen",
    },
    {
      id: "ORD-12843",
      customer: "BuildCorp",
      customerEmail: "materials@buildcorp.com",
      items: 18,
      total: "$1,876.25",
      status: "Cancelled",
      priority: "Medium",
      date: "Dec 25, 2024",
      dueDate: "Dec 28, 2024",
      assignedTo: "Tom Wilson",
    },
    {
      id: "ORD-12848",
      customer: "DataFlow Systems",
      customerEmail: "orders@dataflow.com",
      items: 32,
      total: "$3,456.90",
      status: "Processing",
      priority: "Medium",
      date: "Dec 27, 2024",
      dueDate: "Dec 30, 2024",
      assignedTo: "Emma Wilson",
    },
    {
      id: "ORD-12849",
      customer: "CloudTech Solutions",
      customerEmail: "procurement@cloudtech.com",
      items: 15,
      total: "$1,789.25",
      status: "Ready to Ship",
      priority: "High",
      date: "Dec 27, 2024",
      dueDate: "Dec 28, 2024",
      assignedTo: "Alex Chen",
    },
    {
      id: "ORD-12850",
      customer: "NextGen Industries",
      customerEmail: "supply@nextgen.com",
      items: 28,
      total: "$2,134.60",
      status: "Pending",
      priority: "Low",
      date: "Dec 27, 2024",
      dueDate: "Dec 31, 2024",
      assignedTo: "Ryan Martinez",
    },
    {
      id: "ORD-12851",
      customer: "FutureTech Corp",
      customerEmail: "orders@futuretech.com",
      items: 19,
      total: "$1,567.40",
      status: "Shipped",
      priority: "Medium",
      date: "Dec 26, 2024",
      dueDate: "Dec 28, 2024",
      assignedTo: "Sophie Davis",
    },
  ]

  // Filter orders based on status and search term
  const filterOrders = (status: string) => {
    let filtered = allOrders

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((order) => {
        switch (status) {
          case "pending":
            return order.status === "Pending"
          case "processing":
            return order.status === "Processing"
          case "ready":
            return order.status === "Ready to Ship"
          case "shipped":
            return order.status === "Shipped"
          case "delivered":
            return order.status === "Delivered"
          case "cancelled":
            return order.status === "Cancelled"
          default:
            return true
        }
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Processing":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Processing
          </Badge>
        )
      case "Ready to Ship":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Ready to Ship
          </Badge>
        )
      case "Shipped":
        return <Badge variant="outline">Shipped</Badge>
      case "Delivered":
        return (
          <Badge
            variant="default"
            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
          >
            Delivered
          </Badge>
        )
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const renderOrdersTable = (orders: typeof allOrders, title: string, description: string) => {
    if (orders.length === 0) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No orders found matching the current filters</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description} ({orders.length} orders)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell>{order.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{order.assignedTo}</span>
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
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Create Shipment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Print Invoice
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
    )
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
              placeholder="Search orders..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="ready">Ready to Ship</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <FiltersModal type="orders" />
        </div>
        <div className="flex items-center gap-2">
          <ExportModal type="orders" />
          <NewOrderModal />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOrders.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOrders.filter((o) => o.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Ship</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOrders.filter((o) => o.status === "Ready to Ship").length}</div>
            <p className="text-xs text-muted-foreground">Prepared for shipment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124.5K</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending ({allOrders.filter((o) => o.status === "Pending").length})</TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({allOrders.filter((o) => o.status === "Processing").length})
          </TabsTrigger>
          <TabsTrigger value="ready">
            Ready to Ship ({allOrders.filter((o) => o.status === "Ready to Ship").length})
          </TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({allOrders.filter((o) => o.status === "Shipped").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderOrdersTable(filterOrders("all"), "All Orders", "Complete list of warehouse orders")}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {renderOrdersTable(filterOrders("pending"), "Pending Orders", "Orders awaiting processing")}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {renderOrdersTable(filterOrders("processing"), "Processing Orders", "Orders currently being processed")}
        </TabsContent>

        <TabsContent value="ready" className="space-y-4">
          {renderOrdersTable(filterOrders("ready"), "Ready to Ship", "Orders prepared for shipment")}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4">
          {renderOrdersTable(filterOrders("shipped"), "Shipped Orders", "Orders that have been shipped")}
        </TabsContent>
      </Tabs>
    </>
  )
}
