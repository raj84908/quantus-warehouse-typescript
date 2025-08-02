"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Package, Barcode, DollarSign, MapPin } from "lucide-react"

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

export function AddItemModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    supplier: "",
    description: "",
    price: "",
    cost: "",
    stock: "",
    minStock: "",
    location: "",
    weight: "",
    dimensions: "",
    barcode: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new item:", formData)
    // Simulate API call
    setTimeout(() => {
      setOpen(false)
      setFormData({
        name: "",
        sku: "",
        category: "",
        supplier: "",
        description: "",
        price: "",
        cost: "",
        stock: "",
        minStock: "",
        location: "",
        weight: "",
        dimensions: "",
        barcode: "",
      })
    }, 1000)
  }

  const generateSKU = () => {
    const sku = `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setFormData({ ...formData, sku })
  }

  const generateBarcode = () => {
    const barcode = Math.random().toString().substr(2, 12)
    setFormData({ ...formData, barcode })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Add New Inventory Item</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the details for the new inventory item. All required fields must be completed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Package className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription className="text-muted-foreground">Essential product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-card-foreground">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku" className="text-card-foreground">
                      SKU *
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="SKU-XXXXX"
                        required
                        className="bg-background border-input text-foreground"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateSKU}
                        className="border-input bg-transparent"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-card-foreground">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="bg-background border-input text-foreground">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="electronics" className="text-popover-foreground">
                          Electronics
                        </SelectItem>
                        <SelectItem value="components" className="text-popover-foreground">
                          Components
                        </SelectItem>
                        <SelectItem value="kits" className="text-popover-foreground">
                          Kits
                        </SelectItem>
                        <SelectItem value="accessories" className="text-popover-foreground">
                          Accessories
                        </SelectItem>
                        <SelectItem value="tools" className="text-popover-foreground">
                          Tools
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-card-foreground">
                    Supplier
                  </Label>
                  <Select
                    value={formData.supplier}
                    onValueChange={(value) => setFormData({ ...formData, supplier: value })}
                  >
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="supplier1" className="text-popover-foreground">
                        TechCorp Industries
                      </SelectItem>
                      <SelectItem value="supplier2" className="text-popover-foreground">
                        Global Components Ltd
                      </SelectItem>
                      <SelectItem value="supplier3" className="text-popover-foreground">
                        Premium Parts Co
                      </SelectItem>
                      <SelectItem value="supplier4" className="text-popover-foreground">
                        Innovation Supplies
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-card-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                    className="bg-background border-input text-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Stock */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <DollarSign className="h-5 w-5" />
                  Pricing & Stock
                </CardTitle>
                <CardDescription className="text-muted-foreground">Financial and inventory details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-card-foreground">
                      Selling Price *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                      className="bg-background border-input text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost" className="text-card-foreground">
                      Cost Price
                    </Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      placeholder="0.00"
                      className="bg-background border-input text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock" className="text-card-foreground">
                      Initial Stock *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      required
                      className="bg-background border-input text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minStock" className="text-card-foreground">
                      Minimum Stock *
                    </Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                      placeholder="0"
                      required
                      className="bg-background border-input text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-card-foreground">
                    Storage Location
                  </Label>
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 mt-3 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., A1-B2, Shelf 3"
                      className="bg-background border-input text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-card-foreground">
                      Weight (lbs)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="0.0"
                      className="bg-background border-input text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensions" className="text-card-foreground">
                      Dimensions
                    </Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      placeholder="L x W x H"
                      className="bg-background border-input text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode" className="text-card-foreground">
                    Barcode
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="barcode"
                      value={formData.barcode}
                      onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                      placeholder="Enter or generate barcode"
                      className="bg-background border-input text-foreground"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateBarcode}
                      className="border-input bg-transparent"
                    >
                      <Barcode className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-input">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
