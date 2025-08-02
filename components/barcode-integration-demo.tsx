"use client"

import { useState } from "react"
import { Package, Truck, Users, BarChart3, QrCode, Camera, Smartphone, Wifi } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BarcodeIntegrationDemo() {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null)

  const workflows = [
    {
      id: "receiving",
      title: "Receiving Workflow",
      icon: Package,
      description: "Streamlined process for receiving new inventory",
      steps: [
        "Scan incoming shipment barcode",
        "Verify items against purchase order",
        "Scan individual item barcodes",
        "Update inventory quantities automatically",
        "Generate receiving report",
      ],
      benefits: ["95% faster data entry", "99.8% accuracy rate", "Real-time inventory updates"],
    },
    {
      id: "picking",
      title: "Order Picking Workflow",
      icon: Truck,
      description: "Efficient order fulfillment with barcode guidance",
      steps: [
        "Scan order barcode to start picking",
        "System displays pick list with locations",
        "Scan item barcodes to confirm picks",
        "Verify quantities automatically",
        "Complete order with final scan",
      ],
      benefits: ["40% faster picking", "Reduced picking errors", "Optimized pick routes"],
    },
    {
      id: "counting",
      title: "Cycle Counting Workflow",
      icon: BarChart3,
      description: "Accurate inventory auditing with mobile scanning",
      steps: [
        "Generate cycle count assignments",
        "Scan location barcode to start count",
        "Scan each item barcode found",
        "Enter actual quantities counted",
        "System calculates variances automatically",
      ],
      benefits: ["Daily cycle counts possible", "Real-time variance detection", "Improved inventory accuracy"],
    },
    {
      id: "staff",
      title: "Staff Productivity Tracking",
      icon: Users,
      description: "Monitor and optimize warehouse staff performance",
      steps: [
        "Staff scan personal ID barcode to clock in",
        "Scan task barcodes to start activities",
        "System tracks time per operation",
        "Automatic productivity calculations",
        "Generate performance reports",
      ],
      benefits: ["Individual performance metrics", "Task time optimization", "Productivity insights"],
    },
  ]

  const integrationFeatures = [
    {
      title: "Multi-Format Support",
      description: "Supports all major barcode formats including UPC, EAN, Code 128, QR codes",
      icon: QrCode,
    },
    {
      title: "Mobile Integration",
      description: "Works with smartphones, tablets, and dedicated barcode scanners",
      icon: Smartphone,
    },
    {
      title: "Camera Scanning",
      description: "Use device cameras for scanning when dedicated scanners aren't available",
      icon: Camera,
    },
    {
      title: "Offline Capability",
      description: "Continue scanning operations even without internet connection",
      icon: Wifi,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Barcode Integration in Warehouse Management</h1>
        <p className="text-lg text-muted-foreground">
          See how barcode scanning transforms inventory operations with real-time accuracy and efficiency
        </p>
      </div>

      {/* Integration Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrationFeatures.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="text-center">
              <feature.icon className="h-8 w-8 mx-auto text-blue-600" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Demonstrations */}
      <Card>
        <CardHeader>
          <CardTitle>Barcode Workflows</CardTitle>
          <CardDescription>Click on each workflow to see how barcode scanning integrates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={`cursor-pointer transition-all ${
                  activeWorkflow === workflow.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                }`}
                onClick={() => setActiveWorkflow(activeWorkflow === workflow.id ? null : workflow.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <workflow.icon className="h-5 w-5" />
                    {workflow.title}
                  </CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Active Workflow Details */}
          {activeWorkflow && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                {(() => {
                  const workflow = workflows.find((w) => w.id === activeWorkflow)
                  if (!workflow) return null

                  return (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <workflow.icon className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-semibold text-blue-900">{workflow.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Steps */}
                        <div>
                          <h4 className="font-semibold mb-3 text-blue-900">Process Steps:</h4>
                          <ol className="space-y-2">
                            {workflow.steps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </span>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h4 className="font-semibold mb-3 text-blue-900">Key Benefits:</h4>
                          <ul className="space-y-2">
                            {workflow.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Technical Implementation */}
      <Tabs defaultValue="hardware" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hardware">Hardware Options</TabsTrigger>
          <TabsTrigger value="integration">System Integration</TabsTrigger>
          <TabsTrigger value="benefits">ROI & Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="hardware" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Handheld Scanners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline">Recommended</Badge>
                <ul className="text-sm space-y-1">
                  <li>• Zebra DS2208 / DS4608</li>
                  <li>• Honeywell Voyager 1400g</li>
                  <li>• Datalogic QuickScan QD2400</li>
                </ul>
                <p className="text-xs text-muted-foreground">Professional-grade scanners for high-volume operations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mobile Devices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="secondary">Flexible</Badge>
                <ul className="text-sm space-y-1">
                  <li>• Zebra TC21/TC26 Mobile Computers</li>
                  <li>• Honeywell CT30 XP</li>
                  <li>• Standard smartphones/tablets</li>
                </ul>
                <p className="text-xs text-muted-foreground">All-in-one devices with built-in scanning and computing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fixed Scanners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline">Automated</Badge>
                <ul className="text-sm space-y-1">
                  <li>• Conveyor belt scanners</li>
                  <li>• Overhead scanning systems</li>
                  <li>• Portal scanners for pallets</li>
                </ul>
                <p className="text-xs text-muted-foreground">Hands-free scanning for high-throughput areas</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integration Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Data Flow Process:</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>Barcode scanner captures data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>Data transmitted to Quantus system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>System validates against database</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Inventory updated in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        5
                      </span>
                      <span>Confirmation sent to user device</span>
                    </li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Technical Features:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Real-time API integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Offline data synchronization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Error handling & validation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Audit trail logging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Multi-format barcode support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Operational Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Entry Speed</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      +95% Faster
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Inventory Accuracy</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      99.8% Accurate
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Order Picking Speed</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      +40% Faster
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training Time</span>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      -60% Reduced
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Labor Cost Reduction</span>
                    <span className="font-semibold text-green-600">-25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error-Related Costs</span>
                    <span className="font-semibold text-green-600">-80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Inventory Carrying Costs</span>
                    <span className="font-semibold text-green-600">-15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ROI Timeline</span>
                    <span className="font-semibold text-blue-600">6-12 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
