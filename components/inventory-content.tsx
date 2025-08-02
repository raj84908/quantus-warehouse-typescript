"use client"

import { useState } from "react"
import { Package, Search, AlertTriangle, Edit, Trash2, MoreHorizontal, QrCode, Maximize2, Minimize2, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QRLabelModal } from "@/components/modals/qr-label-modal"
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
import { cn } from "@/lib/utils"

import { AddItemModal } from "@/components/modals/add-item-modal"
import { FiltersModal } from "@/components/modals/filters-modal"
import { ExportModal } from "@/components/modals/export-modal"
import { ImportModal } from "@/components/modals/import-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { WarehouseMap } from "@/components/ui/WarehouseMap"
export function InventoryContent() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [selectedQRItem, setSelectedQRItem] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
const [selectedItem, setSelectedItem] = useState<any>(null)
const [isDetailOpen, setIsDetailOpen] = useState(false)
const [isExpanded, setIsExpanded] = useState(false)

// In your InventoryContent component where the dropdown menu is defined:

// Add these state declarations at the top of your component:

  const inventoryItems = [
    {
      id: "WPA-001",
      name: "Widget Pro A",
      category: "Electronics",
      stock: 847,
      minStock: 100,
      location: "A1-B2",
      value: "$25.99",
      status: "In Stock",
      lastUpdated: "2 hours ago",
    },
    {
      id: "CX-205",
      name: "Component X",
      category: "Components",
      stock: 623,
      minStock: 50,
      location: "B3-C1",
      value: "$12.50",
      status: "In Stock",
      lastUpdated: "4 hours ago",
    },
    {
      id: "PK-150",
      name: "Premium Kit",
      category: "Kits",
      stock: 12,
      minStock: 25,
      location: "C2-D4",
      value: "$89.99",
      status: "Low Stock",
      lastUpdated: "1 hour ago",
    },
    {
      id: "WB-300",
      name: "Widget Basic",
      category: "Electronics",
      stock: 0,
      minStock: 75,
      location: "A2-B1",
      value: "$15.99",
      status: "Out of Stock",
      lastUpdated: "6 hours ago",
    },
    {
      id: "AC-450",
      name: "Accessory Pack",
      category: "Accessories",
      stock: 234,
      minStock: 30,
      location: "D1-E2",
      value: "$8.75",
      status: "In Stock",
      lastUpdated: "3 hours ago",
    },
  ]

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock <= minStock) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      )
    }
  }

const handleOpenDetail = (item: any) => {
  setSelectedItem(item)
  setIsDetailOpen(true)
}

// Find your dropdown menu item and update it:

  // Add the QRLabelModal at the bottom of your return statement:
  return (
    <div>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="pl-10 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="components">Components</SelectItem>
              <SelectItem value="kits">Kits</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <FiltersModal type="inventory" />
        </div>
        <div className="flex items-center gap-2">
          <ExportModal type="inventory" />
          <ImportModal type="inventory" />
          <AddItemModal />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,716</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Items unavailable</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
{isExpanded ? (
  <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
    <DialogContent className="max-w-[90vw] w-full h-[90vh] flex flex-col">
      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <DialogTitle>Inventory Items</DialogTitle>
          <CardDescription>Manage your warehouse inventory and stock levels</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
          <Minimize2 className="h-4 w-4" />
        </Button>
      </DialogHeader>
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Min Stock</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow 
                key={item.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleOpenDetail(item)}
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={item.stock <= item.minStock ? "text-orange-600 font-medium" : ""}>
                      {item.stock}
                    </span>
                    {item.stock <= item.minStock && item.stock > 0 && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                    {item.stock === 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                </TableCell>
                <TableCell>{item.minStock}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{getStatusBadge(item.status, item.stock, item.minStock)}</TableCell>
                <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    {/* In your normal table view dropdown menu */}
<DropdownMenuContent align="end">
  <DropdownMenuLabel>Actions</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    <Edit className="h-4 w-4 mr-2" />
    Edit Item
  </DropdownMenuItem>
  <DropdownMenuItem
    onClick={(e) => {
      e.stopPropagation()
      setSelectedQRItem(item)
      setIsQRModalOpen(true)
    }}
  >
    <QrCode className="h-4 w-4 mr-2" />
    Generate QR Code
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Printer className="h-4 w-4 mr-2" />
    Print Label
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem className="text-red-600">
    <Trash2 className="h-4 w-4 mr-2" />
    Delete Item
  </DropdownMenuItem>
</DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  </Dialog>
) : (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <div>
        <CardTitle>Inventory Items</CardTitle>
        <CardDescription>Manage your warehouse inventory and stock levels</CardDescription>
      </div>
      <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
        <Maximize2 className="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Min Stock</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryItems.map((item) => (
            <TableRow 
              key={item.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleOpenDetail(item)}
            >
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={item.stock <= item.minStock ? "text-orange-600 font-medium" : ""}>
                    {item.stock}
                  </span>
                  {item.stock <= item.minStock && item.stock > 0 && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                  {item.stock === 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </div>
              </TableCell>
              <TableCell>{item.minStock}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell>{getStatusBadge(item.status, item.stock, item.minStock)}</TableCell>
              <TableCell className="text-muted-foreground">{item.lastUpdated}</TableCell>
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
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Item
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="h-4 w-4 mr-2" />
                      Adjust Stock
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Item
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
)}
<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle>Inventory Item Details</DialogTitle>
    </DialogHeader>

    {selectedItem && (
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stock">Stock History</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-medium">{selectedItem.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{selectedItem.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Value</span>
                  <span className="font-medium">{selectedItem.value}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Stock Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Stock</span>
                  <span className="font-medium">{selectedItem.stock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Stock</span>
                  <span className="font-medium">{selectedItem.minStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  {getStatusBadge(selectedItem.status, selectedItem.stock, selectedItem.minStock)}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{selectedItem.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Warehouse Location</p>
                    <p className="font-medium">{selectedItem.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Aisle</p>
                    <p className="font-medium">{selectedItem.location.split('-')[0]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shelf</p>
                    <p className="font-medium">{selectedItem.location.split('-')[1]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Stock History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <p className="font-medium">Stock Adjustment</p>
                    <p className="text-sm text-muted-foreground">Added 100 units</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <p className="font-medium">Order Fulfillment</p>
                    <p className="text-sm text-muted-foreground">Removed 50 units</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Yesterday, 11:20 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

<TabsContent value="location" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle className="text-sm">Warehouse Map</CardTitle>
      <CardDescription>
        Visual representation of item location in the warehouse
      </CardDescription>
    </CardHeader>
    <CardContent>
      {selectedItem?.location ? (
        <WarehouseMap location={selectedItem.location} />
      ) : (
        <div className="text-muted-foreground">No location data available</div>
      )}
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader>
      <CardTitle className="text-sm">Nearby Items</CardTitle>
      <CardDescription>Other items stored in the same aisle</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryItems
            .filter(item => item.location[0] === selectedItem.location[0] && item.id !== selectedItem.id)
            .slice(0, 3)
            .map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>Stock In</TableCell>
                    <TableCell>+100</TableCell>
                    <TableCell>PO-2024-001</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-03-14</TableCell>
                    <TableCell>Stock Out</TableCell>
                    <TableCell>-50</TableCell>
                    <TableCell>ORD-2024-123</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    )}
  </DialogContent>
</Dialog>
{/* ... your existing content ... */}
      
{selectedQRItem && (
  <QRLabelModal
    isOpen={isQRModalOpen}
    onClose={() => {
      setIsQRModalOpen(false)
      setSelectedQRItem(null)
    }}
    item={selectedQRItem}
  />
)}
{/* Add this before the closing </div> of your component */}
{selectedQRItem && (
  <QRLabelModal
    isOpen={isQRModalOpen}
    onClose={() => {
      setIsQRModalOpen(false)
      setSelectedQRItem(null)
    }}
    item={selectedQRItem}
  />
)}
    </div>
  )
}