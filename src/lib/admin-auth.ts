import { supabase } from "@/lib/supabase"

export interface AdminUser {
  id: number
  email: string
  name: string
  role: string
  is_active: boolean
}

export const adminAuth = {
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .eq("password_hash", password) // In production, use proper password hashing
        .eq("is_active", true)
        .single()

      if (error || !data) {
        return { success: false, error: "Invalid credentials" }
      }

      // Update last login
      await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", data.id)

      // Store in localStorage (in production, use secure session management)
      localStorage.setItem("admin_user", JSON.stringify(data))

      return { success: true, user: data }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  },

  async resetPassword(
    email: string,
    secretCode: string,
    newPassword: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .eq("secret_code", secretCode)
        .single()

      if (error || !data) {
        return { success: false, error: "Invalid email or secret code" }
      }

      const { error: updateError } = await supabase
        .from("admin_users")
        .update({ password_hash: newPassword, updated_at: new Date().toISOString() })
        .eq("id", data.id)

      if (updateError) {
        return { success: false, error: "Failed to update password" }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "Password reset failed" }
    }
  },

  getCurrentUser(): AdminUser | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem("admin_user")
    return userData ? JSON.parse(userData) : null
  },

  logout() {
    localStorage.removeItem("admin_user")
  },
}
