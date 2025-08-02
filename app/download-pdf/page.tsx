"use client"

import { PDFDownloadButton } from "@/components/pdf-download-button"

export default function DownloadPDFPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quantus Warehouse Management System</h1>
          <p className="text-lg text-gray-600">Download the complete system preview for your customer presentation</p>
        </div>

        <PDFDownloadButton />
      </div>
    </div>
  )
}
