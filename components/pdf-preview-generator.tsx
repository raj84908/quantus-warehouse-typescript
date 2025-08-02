"use client"

import { useState } from "react"
import { Download, FileText, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function PDFPreviewGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)

    // In a real implementation, this would generate and download the PDF
    alert("PDF preview would be generated and downloaded here")
  }

  const previewSections = [
    {
      title: "Dashboard Overview",
      description: "Main dashboard with KPIs, recent activity, and order summary",
      features: ["Real-time metrics", "Activity feed", "Top products", "Recent orders table"],
      screenshot:
        "Dashboard with 4 KPI cards showing Total Items (12,847), Low Stock (23), Orders Today (156), and Warehouse Value ($2.4M)",
    },
    {
      title: "Inventory Management",
      description: "Complete inventory tracking and stock management",
      features: [
        "Product catalog",
        "Stock level monitoring",
        "Low stock alerts",
        "Category filtering",
        "Bulk operations",
      ],
      screenshot: "Inventory table with SKU, product names, stock levels, locations, and status badges",
    },
    {
      title: "Orders Processing",
      description: "Order management and fulfillment workflow",
      features: [
        "Order status tracking",
        "Customer information",
        "Priority management",
        "Fulfillment workflow",
        "Order history",
      ],
      screenshot: "Orders table with order IDs, customers, items, status badges, and priority levels",
    },
    {
      title: "Shipments Tracking",
      description: "Real-time shipment monitoring and logistics",
      features: [
        "Carrier integration",
        "Tracking numbers",
        "Delivery status",
        "Route optimization",
        "Performance metrics",
      ],
      screenshot: "Shipments table with tracking numbers, carriers, destinations, and delivery status",
    },
    {
      title: "Analytics Dashboard",
      description: "Business intelligence and performance analytics",
      features: [
        "Revenue trends",
        "Inventory turnover",
        "Performance KPIs",
        "Top products analysis",
        "Operational insights",
      ],
      screenshot: "Analytics dashboard with charts, performance metrics, and trend analysis",
    },
    {
      title: "Reports Center",
      description: "Automated reporting and data export",
      features: ["Scheduled reports", "Multiple formats", "Custom date ranges", "Report templates", "Data export"],
      screenshot: "Reports interface with report categories, generation options, and download capabilities",
    },
    {
      title: "Staff Management",
      description: "Employee directory and performance tracking",
      features: [
        "Employee profiles",
        "Department management",
        "Performance reviews",
        "Contact information",
        "Role assignments",
      ],
      screenshot: "Staff directory with employee photos, contact details, departments, and performance ratings",
    },
    {
      title: "System Settings",
      description: "Configuration and system preferences",
      features: ["User preferences", "Security settings", "Integrations", "Notifications", "System configuration"],
      screenshot: "Settings panel with tabs for general, account, notifications, security, and integrations",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quantus Warehouse Management System</h1>
            <p className="text-lg text-gray-600">Complete System Preview & Feature Overview</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Version 1.0
          </Badge>
          <Badge variant="outline">8 Core Modules</Badge>
          <Badge variant="outline">Professional Grade</Badge>
        </div>

        <Button onClick={handleGeneratePDF} disabled={isGenerating} size="lg" className="mt-4">
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate PDF Preview
            </>
          )}
        </Button>
      </div>

      <Separator />

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Quantus is a comprehensive warehouse management system designed to streamline inventory operations, order
            processing, and logistics management. The system provides real-time visibility into warehouse operations
            with advanced analytics and reporting capabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Core Modules</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">Web-Based</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Real-Time Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle>Key System Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Core Functionality</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Real-time inventory tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Automated order processing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Shipment tracking & logistics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Staff management & productivity
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Advanced Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Business intelligence & analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Automated reporting system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Multi-carrier shipping integration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Customizable dashboards
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Previews */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">System Module Previews</h2>

        {previewSections.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription className="mt-1">{section.description}</CardDescription>
                </div>
                <Badge variant="outline">Module {index + 1}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <ul className="space-y-2">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Interface Preview:</h4>
                  <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="text-sm text-gray-600 italic">📱 {section.screenshot}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      * Actual interface screenshots would be included in the PDF
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Frontend Technology</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• React 18 with TypeScript</li>
                <li>• Next.js 14 App Router</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Shadcn/ui component library</li>
                <li>• Responsive design (mobile-first)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">System Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Modern web browser (Chrome, Firefox, Safari)</li>
                <li>• Internet connection for real-time updates</li>
                <li>• Minimum 1024x768 screen resolution</li>
                <li>• JavaScript enabled</li>
                <li>• Optional: Barcode scanner integration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-600">Phase 1</div>
                <div className="text-sm text-gray-600 mt-1">Core Setup</div>
                <div className="text-xs text-gray-500 mt-2">Weeks 1-2</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600">Phase 2</div>
                <div className="text-sm text-gray-600 mt-1">Module Development</div>
                <div className="text-xs text-gray-500 mt-2">Weeks 3-6</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="font-semibold text-orange-600">Phase 3</div>
                <div className="text-sm text-gray-600 mt-1">Integration & Testing</div>
                <div className="text-xs text-gray-500 mt-2">Weeks 7-8</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-600">Phase 4</div>
                <div className="text-sm text-gray-600 mt-1">Deployment & Training</div>
                <div className="text-xs text-gray-500 mt-2">Weeks 9-10</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-blue-800">
              This preview demonstrates the comprehensive functionality of the Quantus Warehouse Management System. The
              system is ready for customization and deployment based on your specific requirements.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Schedule Demo</Button>
              <Button variant="outline">Request Customization</Button>
              <Button variant="outline">Get Quote</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-8 border-t">
        <p>© 2024 Quantus Warehouse Management System - Professional Grade Solution</p>
        <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}
