"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { supabase } from "@/lib/supabase"
import { loadRazorpay, RAZORPAY_CONFIG } from "@/lib/razorpay"

interface PricingPlan {
  id: number
  name: string
  price: number
  currency: string
  period: string
  description: string
  features: string[]
}

interface PricingPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  plan: PricingPlan | null
}

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  businessType: string
  experienceLevel: string
}

export function PricingPurchaseModal({ isOpen, onClose, plan }: PricingPurchaseModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    experienceLevel: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!plan) return

    setLoading(true)

    try {
      // First, save user data
      const { data: userData, error: userError } = await supabase
        .from("users")
        .upsert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          business_type: formData.businessType,
          experience_level: formData.experienceLevel,
        })
        .select()

      if (userError) {
        console.error("Error saving user:", userError)
      }

      // Process payment
      const Razorpay = await loadRazorpay()

      const options = {
        key: RAZORPAY_CONFIG.keyId,
        amount: plan.price * 100, // Convert to paise
        currency: "INR",
        name: "Pricing Plan Purchase",
        description: `${plan.name} - ${plan.period}ly subscription`,
        image: "/placeholder.svg?height=100&width=100&text=Logo",
        handler: async (response: any) => {
          console.log("Payment successful:", response)

          // Calculate plan dates
          const startDate = new Date()
          const endDate = new Date()
          if (plan.period === "year") {
            endDate.setFullYear(endDate.getFullYear() + 1)
          } else {
            endDate.setMonth(endDate.getMonth() + 1)
          }

          // Save purchase to database
          const { error: purchaseError } = await supabase.from("pricing_purchases").insert({
            plan_id: plan.id,
            user_name: formData.name,
            user_email: formData.email,
            user_phone: formData.phone,
            company: formData.company,
            business_type: formData.businessType,
            payment_status: "completed",
            payment_id: response.razorpay_payment_id,
            amount_paid: plan.price,
            plan_start_date: startDate.toISOString().split("T")[0],
            plan_end_date: endDate.toISOString().split("T")[0],
          })

          if (purchaseError) {
            console.error("Error saving purchase:", purchaseError)
          } else {
            alert(`🎉 Welcome to ${plan.name}! Your subscription is now active. Check your email for details.`)
            onClose()
            // Reset form
            setFormData({
              name: "",
              email: "",
              phone: "",
              company: "",
              businessType: "",
              experienceLevel: "",
            })
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#ef4444",
        },
      }

      const rzp = new Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Error processing purchase:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency === "INR" ? "INR" : "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (!plan) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Subscribe to ${plan.name}`} size="lg">
      <div className="space-y-6">
        {/* Plan Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-3">{plan.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-red-500">{formatPrice(plan.price, plan.currency)}</span>
            <span className="text-gray-600">/{plan.period}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                placeholder="+91-9876543210"
              />
            </div>
            <div>
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="small-business">Small Business</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="agency">Agency</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => handleInputChange("experienceLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-red-500 hover:bg-red-600">
              {loading ? "Processing..." : `Pay ${formatPrice(plan.price, plan.currency)}`}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
