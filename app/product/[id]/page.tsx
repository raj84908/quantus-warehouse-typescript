// app/inventory/product/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

interface ProductItem {
  id: string
  name: string
  category: string
  stock: number
  location: string
  value: string
  status: string
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [item, setItem] = useState<ProductItem | null>(null)

  useEffect(() => {
    // Simulate fetching product data
    // Replace this with your actual API call
    const fetchData = async () => {
      try {
        // In a real application, you would fetch data from your API
        // const response = await fetch(`/api/products/${params.id}`)
        // const data = await response.json()
        
        // For now, we'll use mock data
        const mockItem: ProductItem = {
          id: params.id,
          name: "Widget Pro A",
          category: "Electronics",
          stock: 847,
          location: "A1-B2",
          value: "$25.99",
          status: "In Stock",
        }
        setItem(mockItem)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchData()
  }, [params.id])

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <Package className="w-8 h-8" />
          <div>
            <CardTitle>{item.name}</CardTitle>
            <p className="text-sm text-muted-foreground">SKU: {item.id}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{item.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{item.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Stock</p>
              <p className="font-medium">{item.stock}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Value</p>
              <p className="font-medium">{item.value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}