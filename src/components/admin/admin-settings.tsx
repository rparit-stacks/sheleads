"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { adminAuth } from "@/lib/admin-auth"
import { supabase } from "@/lib/supabase"
import { Settings, User, Lock, Shield, Database } from "lucide-react"

export function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const currentUser = adminAuth.getCurrentUser()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match")
      return
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      // Verify current password
      const { data: user, error: verifyError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", currentUser?.email)
        .eq("password_hash", currentPassword)
        .single()

      if (verifyError || !user) {
        setMessage("Current password is incorrect")
        setLoading(false)
        return
      }

      // Update password
      const { error: updateError } = await supabase
        .from("admin_users")
        .update({
          password_hash: newPassword,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (updateError) {
        setMessage("Failed to update password")
      } else {
        setMessage("Password updated successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      setMessage("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <Settings className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>
          <p className="text-gray-600">Manage your admin account and system settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={currentUser?.name || ""} disabled />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={currentUser?.email || ""} disabled />
            </div>
            <div>
              <Label>Role</Label>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-100 text-red-800">{currentUser?.role || "Admin"}</Badge>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <div className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Secret Code</span>
              <Badge variant="outline">Protected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Login</span>
              <span className="text-sm">
                {currentUser?.last_login ? new Date(currentUser.last_login).toLocaleString("en-IN") : "Never"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Account Status</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Gateway</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Admin Panel Version</span>
              <span className="text-sm">v1.0.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
