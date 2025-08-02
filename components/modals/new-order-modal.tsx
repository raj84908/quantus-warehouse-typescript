"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search, Trash2, User, Package, Calendar } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface OrderItem {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
  stock: number
}

export function NewOrderModal() {
  const [open, setOpen] = useState(false)
  const [customerSearch, setCustomerSearch] = useState("")
  const [itemSearch, setItemSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [notes, setNotes] = useState("")

  const customers = [
    { id: "1", name: "Acme Corp", email: "orders@acme.com", phone: "+1 (555) 123-4567" },
    { id: "2", name: "TechStart Inc", email: "procurement@techstart.com", phone: "+1 (555) 234-5678" },
    { id: "3", name: "Global Solutions", email: "supply@globalsol.com", phone: "+1 (555) 345-6789" },
    { id: "4", name: "Innovation Labs", email: "orders@innovlabs.com", phone: "+1 (555) 456-7890" },
  ]

  const availableItems = [
    { id: "WPA-001", name: "Widget Pro A", sku: "WPA-001", price: 25.99, stock: 847 },
    { id: "CX-205", name: "Component X", sku: "CX-205", price: 12.5, stock: 623 },
    { id: "PK-150", name: "Premium Kit", sku: "PK-150", price: 89.99, stock: 12 },
    { id: "AC-450", name: "Accessory Pack", sku: "AC-450", price: 8.75, stock: 234 },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase()),
  )

  const filteredItems = availableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      item.sku.toLowerCase().includes(itemSearch.toLowerCase()),
  )

  const addItemToOrder = (item: any) => {
    const existingItem = orderItems.find((orderItem) => orderItem.id === item.id)
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        ),
      )
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }])
    }
    setItemSearch("")
  }

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromOrder(itemId)
    } else {
      setOrderItems(orderItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const removeItemFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const orderData = {
      customer: selectedCustomer,
      items: orderItems,
      priority,
      dueDate,
      notes,
      total: calculateTotal(),
    }
    console.log("Creating new order:", orderData)

    // Reset form
    setSelectedCustomer(null)
    setOrderItems([])
    setPriority("medium")
    setDueDate("")
    setNotes("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Create New Order</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add customer information and select items for the new order
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                <CardDescription className="text-muted-foreground">Select or search for a customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-search" className="text-card-foreground">
                    Search Customer
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="customer-search"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      placeholder="Search by name or email..."
                      className="pl-10 bg-background border-input text-foreground"
                    />
                  </div>
                </div>

                {selectedCustomer ? (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-card-foreground">{selectedCustomer.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCustomer(null)}
                        className="border-input"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className="p-2 border border-border rounded cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <p className="font-medium text-card-foreground">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Calendar className="h-5 w-5" />
                  Order Details
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Set priority and delivery requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-card-foreground">
                    Priority
                  </Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="low" className="text-popover-foreground">
                        Low
                      </SelectItem>
                      <SelectItem value="medium" className="text-popover-foreground">
                        Medium
                      </SelectItem>
                      <SelectItem value="high" className="text-popover-foreground">
                        High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due-date" className="text-card-foreground">
                    Due Date
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-card-foreground">
                    Order Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special instructions or notes..."
                    rows={3}
                    className="bg-background border-input text-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Item Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
              <CardDescription className="text-muted-foreground">Search and add items to the order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-search" className="text-card-foreground">
                  Search Items
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="item-search"
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    placeholder="Search by name or SKU..."
                    className="pl-10 bg-background border-input text-foreground"
                  />
                </div>
              </div>

              {itemSearch && (
                <div className="max-h-32 overflow-y-auto space-y-2 border border-border rounded-lg p-2 bg-background">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => addItemToOrder(item)}
                    >
                      <div>
                        <p className="font-medium text-card-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.sku} • ${item.price} • {item.stock} in stock
                        </p>
                      </div>
                      <Badge variant="outline" className="border-border">
                        Add
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {orderItems.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-card-foreground">Selected Items</Label>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-card-foreground">Item</TableHead>
                        <TableHead className="text-card-foreground">Price</TableHead>
                        <TableHead className="text-card-foreground">Quantity</TableHead>
                        <TableHead className="text-card-foreground">Total</TableHead>
                        <TableHead className="text-card-foreground"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems.map((item) => (
                        <TableRow key={item.id} className="border-border">
                          <TableCell className="text-card-foreground">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.sku}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-card-foreground">${item.price}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) => updateItemQuantity(item.id, Number.parseInt(e.target.value))}
                              className="w-20 bg-background border-input text-foreground"
                            />
                          </TableCell>
                          <TableCell className="text-card-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItemFromOrder(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-end pt-4 border-t border-border">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-card-foreground">
                        Total: ${calculateTotal().toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {orderItems.reduce((total, item) => total + item.quantity, 0)} items
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-input">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedCustomer || orderItems.length === 0}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
