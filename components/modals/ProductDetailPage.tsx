// app/inventory/product/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
  // In your real application, you would fetch this data from your backend
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching product data
    // Replace this with your actual API call
    const item = {
      id: params.id,
      name: "Widget Pro A",
      category: "Electronics",
      stock: 847,
      location: "A1-B2",
      value: "$25.99",
      status: "In Stock",
    };
    setItem(item);
  }, [params.id]);

  if (!item) return <div>Loading...</div>;

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
  );
}