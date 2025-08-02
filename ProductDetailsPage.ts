// app/product/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // In a real application, you would fetch the product data from your API
    // For now, we'll use mock data
    const mockProduct = {
      id: params.id,
      name: "Widget Pro A",
      category: "Electronics",
      stock: 847,
      location: "A1-B2",
      value: "$25.99",
    };
    setProduct(mockProduct);
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>SKU:</strong> {product.id}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Current Stock:</strong> {product.stock}</p>
          <p><strong>Location:</strong> {product.location}</p>
          <p><strong>Value:</strong> {product.value}</p>
        </div>
      </CardContent>
    </Card>
  );
}