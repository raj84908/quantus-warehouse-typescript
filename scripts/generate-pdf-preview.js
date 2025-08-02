import { jsPDF } from "jspdf"

async function generateQuantusPDF() {
  console.log("Starting PDF generation for Quantus Warehouse Management System...")

  // Create new PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // PDF dimensions
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2

  let yPosition = margin

  // Helper function to add new page if needed
  function checkPageBreak(requiredHeight) {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Helper function to add text with word wrap
  function addWrappedText(text, x, y, maxWidth, fontSize = 10) {
    pdf.setFontSize(fontSize)
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)
    return lines.length * (fontSize * 0.35) // Return height used
  }

  // Title Page
  pdf.setFillColor(59, 130, 246) // Blue background
  pdf.rect(0, 0, pageWidth, 60, "F")

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(28)
  pdf.setFont("helvetica", "bold")
  pdf.text("QUANTUS", pageWidth / 2, 25, { align: "center" })

  pdf.setFontSize(16)
  pdf.setFont("helvetica", "normal")
  pdf.text("Warehouse Management System", pageWidth / 2, 35, { align: "center" })

  pdf.setFontSize(12)
  pdf.text("Complete System Preview & Feature Overview", pageWidth / 2, 45, { align: "center" })

  // Reset text color
  pdf.setTextColor(0, 0, 0)
  yPosition = 80

  // Executive Summary
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  pdf.text("Executive Summary", margin, yPosition)
  yPosition += 10

  pdf.setFontSize(11)
  pdf.setFont("helvetica", "normal")
  const summaryText =
    "Quantus is a comprehensive warehouse management system designed to streamline inventory operations, order processing, and logistics management. The system provides real-time visibility into warehouse operations with advanced analytics and reporting capabilities."
  const summaryHeight = addWrappedText(summaryText, margin, yPosition, contentWidth, 11)
  yPosition += summaryHeight + 10

  // Key Statistics
  pdf.setFillColor(240, 248, 255)
  pdf.rect(margin, yPosition, contentWidth, 25, "F")

  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.text("8 Core Modules", margin + 10, yPosition + 8)
  pdf.text("100% Web-Based", margin + 70, yPosition + 8)
  pdf.text("24/7 Real-Time", margin + 140, yPosition + 8)

  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  pdf.text("Complete System", margin + 10, yPosition + 15)
  pdf.text("Modern Interface", margin + 70, yPosition + 15)
  pdf.text("Monitoring", margin + 140, yPosition + 15)

  yPosition += 35

  // System Modules Overview
  checkPageBreak(20)
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  pdf.text("System Modules Overview", margin, yPosition)
  yPosition += 15

  const modules = [
    {
      name: "Dashboard Overview",
      description: "Real-time KPIs, activity monitoring, and system overview with key metrics display.",
      features: ["Live inventory counts", "Order processing status", "Performance metrics", "Activity timeline"],
    },
    {
      name: "Inventory Management",
      description: "Complete stock tracking, product catalog management, and automated reorder alerts.",
      features: ["SKU tracking", "Stock level monitoring", "Low stock alerts", "Category management"],
    },
    {
      name: "Orders Processing",
      description: "End-to-end order management from receipt to fulfillment with priority handling.",
      features: ["Order workflow", "Customer management", "Priority processing", "Status tracking"],
    },
    {
      name: "Shipments Tracking",
      description: "Multi-carrier shipping integration with real-time tracking and delivery management.",
      features: ["Carrier integration", "Tracking numbers", "Delivery status", "Route optimization"],
    },
    {
      name: "Analytics Dashboard",
      description: "Business intelligence with comprehensive reporting and trend analysis.",
      features: ["Revenue analytics", "Performance KPIs", "Trend analysis", "Custom reports"],
    },
    {
      name: "Reports Center",
      description: "Automated report generation with customizable templates and scheduling.",
      features: ["Scheduled reports", "Multiple formats", "Custom templates", "Data export"],
    },
    {
      name: "Staff Management",
      description: "Employee directory, performance tracking, and workforce management tools.",
      features: ["Employee profiles", "Performance reviews", "Department management", "Role assignments"],
    },
    {
      name: "System Settings",
      description: "Comprehensive system configuration, security settings, and integration management.",
      features: ["User preferences", "Security controls", "API integrations", "System configuration"],
    },
  ]

  modules.forEach((module, index) => {
    checkPageBreak(40)

    // Module header
    pdf.setFillColor(249, 250, 251)
    pdf.rect(margin, yPosition, contentWidth, 8, "F")

    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text(`${index + 1}. ${module.name}`, margin + 5, yPosition + 6)
    yPosition += 12

    // Module description
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")
    const descHeight = addWrappedText(module.description, margin + 5, yPosition, contentWidth - 10, 10)
    yPosition += descHeight + 5

    // Features
    pdf.setFontSize(9)
    pdf.setFont("helvetica", "bold")
    pdf.text("Key Features:", margin + 5, yPosition)
    yPosition += 4

    pdf.setFont("helvetica", "normal")
    module.features.forEach((feature) => {
      pdf.text(`• ${feature}`, margin + 10, yPosition)
      yPosition += 4
    })

    yPosition += 5
  })

  // Technical Specifications
  checkPageBreak(60)
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  pdf.text("Technical Specifications", margin, yPosition)
  yPosition += 15

  // Frontend Technology
  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  pdf.text("Frontend Technology Stack:", margin, yPosition)
  yPosition += 8

  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  const techStack = [
    "React 18 with TypeScript for robust component architecture",
    "Next.js 14 App Router for optimal performance and SEO",
    "Tailwind CSS for responsive, modern styling",
    "Shadcn/ui component library for consistent UI elements",
    "Real-time data synchronization capabilities",
  ]

  techStack.forEach((tech) => {
    pdf.text(`• ${tech}`, margin + 5, yPosition)
    yPosition += 5
  })

  yPosition += 10

  // System Requirements
  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  pdf.text("System Requirements:", margin, yPosition)
  yPosition += 8

  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  const requirements = [
    "Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)",
    "Stable internet connection for real-time updates",
    "Minimum screen resolution: 1024x768 pixels",
    "JavaScript enabled for full functionality",
    "Optional: Barcode scanner for inventory management",
  ]

  requirements.forEach((req) => {
    pdf.text(`• ${req}`, margin + 5, yPosition)
    yPosition += 5
  })

  // Implementation Timeline
  checkPageBreak(80)
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  pdf.text("Implementation Roadmap", margin, yPosition)
  yPosition += 15

  const phases = [
    {
      phase: "Phase 1: Foundation Setup",
      duration: "Weeks 1-2",
      tasks: ["System architecture setup", "Database design", "Core infrastructure", "Development environment"],
    },
    {
      phase: "Phase 2: Core Development",
      duration: "Weeks 3-6",
      tasks: ["Module development", "UI/UX implementation", "Feature integration", "Initial testing"],
    },
    {
      phase: "Phase 3: Integration & Testing",
      duration: "Weeks 7-8",
      tasks: ["System integration", "Comprehensive testing", "Performance optimization", "Security validation"],
    },
    {
      phase: "Phase 4: Deployment & Training",
      duration: "Weeks 9-10",
      tasks: ["Production deployment", "Staff training", "Documentation", "Go-live support"],
    },
  ]

  phases.forEach((phase) => {
    checkPageBreak(25)

    pdf.setFillColor(239, 246, 255)
    pdf.rect(margin, yPosition, contentWidth, 6, "F")

    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")
    pdf.text(phase.phase, margin + 5, yPosition + 4)

    pdf.setFont("helvetica", "normal")
    pdf.text(phase.duration, pageWidth - margin - 30, yPosition + 4)
    yPosition += 10

    pdf.setFontSize(9)
    phase.tasks.forEach((task) => {
      pdf.text(`• ${task}`, margin + 10, yPosition)
      yPosition += 4
    })
    yPosition += 5
  })

  // Benefits Section
  checkPageBreak(50)
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  pdf.text("Key Benefits", margin, yPosition)
  yPosition += 15

  const benefits = [
    {
      title: "Operational Efficiency",
      description: "Streamlined workflows reduce processing time by up to 40%",
    },
    {
      title: "Real-Time Visibility",
      description: "Complete inventory and order visibility across all operations",
    },
    {
      title: "Cost Reduction",
      description: "Automated processes and optimized inventory reduce operational costs",
    },
    {
      title: "Scalability",
      description: "System grows with your business needs and volume requirements",
    },
    {
      title: "Data-Driven Decisions",
      description: "Comprehensive analytics enable informed business decisions",
    },
  ]

  benefits.forEach((benefit) => {
    checkPageBreak(15)

    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")
    pdf.text(`✓ ${benefit.title}`, margin, yPosition)
    yPosition += 6

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")
    const benefitHeight = addWrappedText(benefit.description, margin + 5, yPosition, contentWidth - 5, 10)
    yPosition += benefitHeight + 8
  })

  // Contact Information
  checkPageBreak(40)
  pdf.setFillColor(59, 130, 246)
  pdf.rect(margin, yPosition, contentWidth, 35, "F")

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(16)
  pdf.setFont("helvetica", "bold")
  pdf.text("Ready to Get Started?", margin + 10, yPosition + 10)

  pdf.setFontSize(11)
  pdf.setFont("helvetica", "normal")
  pdf.text(
    "Contact us to schedule a personalized demo and discuss your specific requirements.",
    margin + 10,
    yPosition + 20,
  )
  pdf.text("Email: info@quantus.com | Phone: +1 (555) 123-4567", margin + 10, yPosition + 28)

  // Footer
  pdf.setTextColor(128, 128, 128)
  pdf.setFontSize(8)
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()} | © 2024 Quantus Warehouse Management System`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" },
  )

  // Save the PDF
  const pdfBlob = pdf.output("blob")
  const url = URL.createObjectURL(pdfBlob)

  // Create download link
  const link = document.createElement("a")
  link.href = url
  link.download = "Quantus-Warehouse-Management-System-Preview.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up
  URL.revokeObjectURL(url)

  console.log("PDF generated successfully: Quantus-Warehouse-Management-System-Preview.pdf")
  console.log("File size:", (pdfBlob.size / 1024 / 1024).toFixed(2), "MB")

  return {
    success: true,
    filename: "Quantus-Warehouse-Management-System-Preview.pdf",
    size: pdfBlob.size,
  }
}

// Execute the PDF generation
generateQuantusPDF()
  .then((result) => {
    console.log("PDF generation completed:", result)
  })
  .catch((error) => {
    console.error("Error generating PDF:", error)
  })
