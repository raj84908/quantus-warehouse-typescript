"use client"

import { useState } from "react"
import {
  Package,
  Users,
  ShoppingCart,
  Search,
  Bell,
  Settings,
  BarChart3,
  FileText,
  Truck,
  Home,
  User,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DashboardContent } from "@/components/dashboard-content"
import { InventoryContent } from "@/components/inventory-content"
import { OrdersContent } from "@/components/orders-content"
import { ShipmentsContent } from "@/components/shipments-content"
import { AnalyticsContent } from "@/components/analytics-content"
import { ReportsContent } from "@/components/reports-content"
import { StaffContent } from "@/components/staff-content"
import { SettingsContent } from "@/components/settings-content"
import { ProfileContent } from "@/components/profile-content"

export function WarehouseDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleProfileClick = () => {
    setActiveTab("profile")
  }

  const handleSettingsClick = () => {
    setActiveTab("settings")
  }

  const handleSignOut = () => {
    // In a real app, this would handle authentication logout
    console.log("Signing out...")
    // You could redirect to login page or clear auth tokens here
    alert("Sign out functionality would be implemented here")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-card overflow-y-auto border-r border-border">
          <div className="flex items-center flex-shrink-0 px-4">
            <Package className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-foreground">Quantus</span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "inventory"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("inventory")}
              >
                <Package className="mr-3 h-5 w-5" />
                Inventory
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "orders"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Orders
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "shipments"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("shipments")}
              >
                <Truck className="mr-3 h-5 w-5" />
                Shipments
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "analytics"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Analytics
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "reports"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <FileText className="mr-3 h-5 w-5" />
                Reports
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "staff"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("staff")}
              >
                <Users className="mr-3 h-5 w-5" />
                Staff
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>
              <Link
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "settings"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-foreground capitalize">{activeTab}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="pl-10 w-64 bg-background border-input"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      width="32"
                      height="32"
                      className="rounded-full"
                      alt="User avatar"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover border-border w-56">
                  <DropdownMenuLabel className="text-popover-foreground">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Smith</p>
                      <p className="text-xs leading-none text-muted-foreground">john.smith@quantus.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="text-popover-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-popover-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={handleSettingsClick}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="text-popover-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "inventory" && <InventoryContent />}
          {activeTab === "orders" && <OrdersContent />}
          {activeTab === "shipments" && <ShipmentsContent />}
          {activeTab === "analytics" && <AnalyticsContent />}
          {activeTab === "reports" && <ReportsContent />}
          {activeTab === "staff" && <StaffContent />}
          {activeTab === "profile" && <ProfileContent />}
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  )
}
