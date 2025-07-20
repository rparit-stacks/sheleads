"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { supabaseAdmin } from "@/lib/supabase"
import { Save, X, CreditCard } from "lucide-react"

interface PricingPlanModalProps {
  isOpen: boolean
  onClose: () => void
  record?: any
  mode: "add" | "edit"
  onSuccess: () => void
}

export function PricingPlanModal({ isOpen, onClose, record, mode, onSuccess }: PricingPlanModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    currency: "INR",
    period: "year",
    description: "",
    features: "",
    is_popular: false,
    badge: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && record) {
        setFormData({
          name: record.name || "",
          price: record.price?.toString() || "",
          currency: record.currency || "INR",
          period: record.period || "year",
          description: record.description || "",
          features: Array.isArray(record.features) ? record.features.join("\n") : "",
          is_popular: record.is_popular || false,
          badge: record.badge || "",
        })
      } else {
        setFormData({
          name: "",
          price: "",
          currency: "INR",
          period: "year",
          description: "",
          features: "",
          is_popular: false,
          badge: "",
        })
      }
      setErrors({})
    }
  }, [isOpen, mode, record])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required"
    }

    if (!formData.price || Number(formData.price) < 0) {
      newErrors.price = "Valid price is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const processedData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        currency: formData.currency,
        period: formData.period,
        description: formData.description.trim(),
        features: formData.features
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        is_popular: formData.is_popular,
        badge: formData.badge.trim() || null,
      }

      let result
      if (mode === "add") {
        result = await supabaseAdmin.from("pricing_plans").insert([processedData])
      } else {
        result = await supabaseAdmin.from("pricing_plans").update(processedData).eq("id", record.id)
      }

      if (result.error) {
        console.error("Error saving pricing plan:", result.error)
        alert(`Failed to ${mode} pricing plan: ${result.error.message}`)
        return
      }

      alert(`✅ Pricing plan ${mode === "add" ? "added" : "updated"} successfully!`)
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving pricing plan:", error)
      alert(`❌ Failed to ${mode} pricing plan`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          {mode === "add" ? "Add New" : "Edit"} Pricing Plan
          <Badge variant="outline">Pricing</Badge>
        </div>
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Plan Name */}
          <div className="md:col-span-2">
            <Label htmlFor="name">
              Plan Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., The Spark Plan"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">
              Price <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="e.g., 2600"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Currency */}
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Period */}
          <div>
            <Label htmlFor="period">Billing Period</Label>
            <Select value={formData.period} onValueChange={(value) => handleInputChange("period", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Badge */}
          <div>
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              value={formData.badge}
              onChange={(e) => handleInputChange("badge", e.target.value)}
              placeholder="e.g., Most Popular"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Plan description..."
              rows={3}
            />
          </div>

          {/* Features */}
          <div className="md:col-span-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => handleInputChange("features", e.target.value)}
              placeholder="Weekly live training on digital marketing&#10;Access to our supportive WhatsApp community&#10;Learn. Connect. Begin."
              rows={5}
            />
          </div>

          {/* Popular Plan */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_popular"
                checked={formData.is_popular}
                onCheckedChange={(checked) => handleInputChange("is_popular", checked)}
              />
              <Label htmlFor="is_popular">Mark as Popular Plan</Label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : mode === "add" ? "Add Plan" : "Update Plan"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
