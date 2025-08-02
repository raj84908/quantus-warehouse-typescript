"use client"

import { BarcodeScanner } from "@/components/barcode-scanner"
import { BarcodeIntegrationDemo } from "@/components/barcode-integration-demo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BarcodeDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="scanner" className="space-y-8">
          <div className="text-center">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="scanner">Live Scanner</TabsTrigger>
              <TabsTrigger value="integration">Integration Guide</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="scanner">
            <BarcodeScanner />
          </TabsContent>

          <TabsContent value="integration">
            <BarcodeIntegrationDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
