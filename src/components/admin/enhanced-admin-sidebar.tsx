"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  CreditCard,
  Calendar,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  MessageSquare,
  Mail,
  Activity,
  Database,
  UserCheck,
} from "lucide-react"
import { adminAuth } from "@/lib/admin-auth"

interface EnhancedAdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

// Complete menu items for all tables
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, category: "Overview" },

  // User Management
  { id: "users", label: "Users", icon: Users, category: "User Management" },
  { id: "admin_users", label: "Admin Users", icon: UserCheck, category: "User Management" },
  { id: "admin_sessions", label: "Admin Sessions", icon: Activity, category: "User Management" },
  { id: "admin_activity_logs", label: "Activity Logs", icon: Activity, category: "User Management" },

  // Business Content
  { id: "pricing_plans", label: "Pricing Plans", icon: CreditCard, category: "Business" },
  { id: "pricing_purchases", label: "Plan Purchases", icon: CreditCard, category: "Business" },
  { id: "events", label: "Events", icon: Calendar, category: "Business" },
  { id: "event_registrations", label: "Event Registrations", icon: Calendar, category: "Business" },
  { id: "training_sessions", label: "Training Sessions", icon: GraduationCap, category: "Business" },
  { id: "training_enrollments", label: "Training Enrollments", icon: GraduationCap, category: "Business" },
  { id: "blog_posts", label: "Blog Posts", icon: FileText, category: "Business" },

  // Communications
  { id: "contact_inquiries", label: "Contact Inquiries", icon: MessageSquare, category: "Communications" },
  { id: "newsletter_subscriptions", label: "Newsletter", icon: Mail, category: "Communications" },

  // System
  { id: "database_export", label: "Database Export", icon: Database, category: "System" },
  { id: "settings", label: "Settings", icon: Settings, category: "System" },
]

export function EnhancedAdminSidebar({ activeSection, onSectionChange, onLogout }: EnhancedAdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentUser = adminAuth.getCurrentUser()

  const handleLogout = () => {
    adminAuth.logout()
    onLogout()
  }

  // Group menu items by category
  const groupedItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof menuItems>,
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-red-50">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-600">{currentUser?.name}</p>
            <Badge className="bg-green-100 text-green-800 text-xs mt-1">Live Database</Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeSection === item.id
                          ? "bg-red-600 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        onSectionChange(item.id)
                        setIsOpen(false)
                      }}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              Admin
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
            <Badge variant="outline" className="text-xs">
              v2.0
            </Badge>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:bg-red-50 border-red-200 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
