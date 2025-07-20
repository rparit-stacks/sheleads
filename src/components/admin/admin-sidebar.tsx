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
} from "lucide-react"
import { adminAuth } from "@/lib/admin-auth"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

// Update the menuItems array to include all tables:
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "pricing_plans", label: "Pricing Plans", icon: CreditCard },
  { id: "pricing_purchases", label: "Plan Purchases", icon: CreditCard },
  { id: "events", label: "Events", icon: Calendar },
  { id: "event_registrations", label: "Event Registrations", icon: Calendar },
  { id: "training_sessions", label: "Training Sessions", icon: GraduationCap },
  { id: "training_enrollments", label: "Training Enrollments", icon: GraduationCap },
  { id: "blog_posts", label: "Blog Posts", icon: FileText },
  { id: "contact_inquiries", label: "Contact Inquiries", icon: Users },
  { id: "newsletter_subscriptions", label: "Newsletter", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentUser = adminAuth.getCurrentUser()

  const handleLogout = () => {
    adminAuth.logout()
    onLogout()
  }

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-600">{currentUser?.name}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeSection === item.id ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
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
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              Admin
            </Badge>
            <Badge variant="outline" className="text-xs text-green-600">
              Online
            </Badge>
          </div>
          <Button variant="outline" className="w-full justify-start text-red-600 bg-transparent" onClick={handleLogout}>
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
