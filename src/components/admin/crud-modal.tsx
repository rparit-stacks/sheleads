"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { supabase } from "@/lib/supabase"

interface CrudModalProps {
  isOpen: boolean
  onClose: () => void
  tableName: string
  record?: any
  mode: "add" | "edit"
  onSuccess: () => void
}

// Define field configurations for each table
const tableConfigs: { [key: string]: any } = {
  users: {
    fields: [
      { name: "name", type: "text", required: true, label: "Full Name" },
      { name: "email", type: "email", required: true, label: "Email Address" },
      { name: "phone", type: "text", label: "Phone Number" },
      { name: "company", type: "text", label: "Company" },
      { name: "designation", type: "text", label: "Designation" },
      {
        name: "experience_level",
        type: "select",
        label: "Experience Level",
        options: ["beginner", "intermediate", "advanced", "expert"],
      },
      {
        name: "business_type",
        type: "select",
        label: "Business Type",
        options: ["startup", "small-business", "enterprise", "freelancer", "agency", "consultant", "other"],
      },
    ],
  },
  pricing_plans: {
    fields: [
      { name: "name", type: "text", required: true, label: "Plan Name" },
      { name: "price", type: "number", required: true, label: "Price" },
      { name: "currency", type: "select", label: "Currency", options: ["INR", "USD"], default: "INR" },
      { name: "period", type: "select", label: "Period", options: ["month", "year"], default: "year" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "features", type: "array", label: "Features (one per line)" },
      { name: "is_popular", type: "boolean", label: "Popular Plan" },
      { name: "badge", type: "text", label: "Badge Text" },
    ],
  },
  events: {
    fields: [
      { name: "title", type: "text", required: true, label: "Event Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "location", type: "text", required: true, label: "Location" },
      { name: "event_date", type: "date", required: true, label: "Event Date" },
      { name: "event_time", type: "time", required: true, label: "Event Time" },
      { name: "image_url", type: "text", label: "Image URL" },
      { name: "max_attendees", type: "number", label: "Max Attendees" },
      { name: "price", type: "number", label: "Price", default: 0 },
      { name: "currency", type: "select", label: "Currency", options: ["INR", "USD"], default: "INR" },
      {
        name: "status",
        type: "select",
        label: "Status",
        options: ["published", "draft", "ended"],
        default: "published",
      },
      {
        name: "event_type",
        type: "select",
        label: "Event Type",
        options: ["workshop", "seminar", "webinar", "bootcamp", "meetup"],
        default: "workshop",
      },
      { name: "thank_you_message", type: "textarea", label: "Thank You Message" },
    ],
  },
  training_sessions: {
    fields: [
      { name: "title", type: "text", required: true, label: "Training Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "instructor", type: "text", label: "Instructor Name" },
      { name: "duration", type: "number", label: "Duration (minutes)" },
      { name: "level", type: "select", label: "Level", options: ["Beginner", "Intermediate", "Advanced"] },
      { name: "price", type: "number", label: "Price", default: 0 },
      { name: "currency", type: "select", label: "Currency", options: ["INR", "USD"], default: "INR" },
      { name: "max_participants", type: "number", label: "Max Participants" },
      { name: "start_date", type: "date", label: "Start Date" },
      { name: "end_date", type: "date", label: "End Date" },
      {
        name: "status",
        type: "select",
        label: "Status",
        options: ["upcoming", "ongoing", "completed", "cancelled"],
        default: "upcoming",
      },
      { name: "syllabus", type: "array", label: "Syllabus (one item per line)" },
      { name: "prerequisites", type: "textarea", label: "Prerequisites" },
      { name: "certificate_provided", type: "boolean", label: "Certificate Provided" },
    ],
  },
  blog_posts: {
    fields: [
      { name: "title", type: "text", required: true, label: "Post Title" },
      { name: "excerpt", type: "textarea", label: "Excerpt" },
      { name: "content", type: "textarea", label: "Content" },
      { name: "category", type: "text", label: "Category" },
      { name: "author", type: "text", label: "Author" },
      { name: "read_time", type: "number", label: "Read Time (minutes)" },
      { name: "image_url", type: "text", label: "Image URL" },
      { name: "published", type: "boolean", label: "Published", default: true },
      { name: "slug", type: "text", label: "URL Slug" },
      { name: "meta_description", type: "textarea", label: "Meta Description" },
      { name: "tags", type: "array", label: "Tags (one per line)" },
    ],
  },
  contact_inquiries: {
    fields: [
      { name: "name", type: "text", required: true, label: "Name" },
      { name: "email", type: "email", required: true, label: "Email" },
      { name: "phone", type: "text", label: "Phone" },
      { name: "subject", type: "text", label: "Subject" },
      { name: "message", type: "textarea", label: "Message" },
      {
        name: "inquiry_type",
        type: "select",
        label: "Inquiry Type",
        options: ["general", "pricing", "support", "partnership"],
        default: "general",
      },
      { name: "status", type: "select", label: "Status", options: ["new", "in_progress", "resolved"], default: "new" },
    ],
  },
  newsletter_subscriptions: {
    fields: [
      { name: "email", type: "email", required: true, label: "Email Address" },
      { name: "name", type: "text", label: "Name" },
      { name: "is_active", type: "boolean", label: "Active Subscription", default: true },
    ],
  },
}

export function CrudModal({ isOpen, onClose, tableName, record, mode, onSuccess }: CrudModalProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const config = tableConfigs[tableName]

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && record) {
        // Pre-fill form with existing data
        const initialData: { [key: string]: any } = {}
        config?.fields.forEach((field: any) => {
          if (field.type === "array" && Array.isArray(record[field.name])) {
            initialData[field.name] = record[field.name].join("\n")
          } else if (field.type === "date" && record[field.name]) {
            initialData[field.name] = record[field.name].split("T")[0]
          } else {
            initialData[field.name] = record[field.name] || field.default || ""
          }
        })
        setFormData(initialData)
      } else {
        // Initialize with default values for add mode
        const initialData: { [key: string]: any } = {}
        config?.fields.forEach((field: any) => {
          initialData[field.name] = field.default || ""
        })
        setFormData(initialData)
      }
      setErrors({})
    }
  }, [isOpen, mode, record, config])

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    config?.fields.forEach((field: any) => {
      if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === "")) {
        newErrors[field.name] = `${field.label} is required`
      }

      if (field.type === "email" && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = "Invalid email format"
        }
      }
    })

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
      // Process form data
      const processedData: { [key: string]: any } = {}

      config?.fields.forEach((field: any) => {
        let value = formData[field.name]

        if (field.type === "array" && typeof value === "string") {
          value = value
            .split("\n")
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0)
        } else if (field.type === "boolean") {
          value = Boolean(value)
        } else if (field.type === "number") {
          value = value ? Number(value) : null
        }

        if (value !== "" && value !== null && value !== undefined) {
          processedData[field.name] = value
        }
      })

      let result
      if (mode === "add") {
        result = await supabase.from(tableName).insert([processedData])
      } else {
        result = await supabase.from(tableName).update(processedData).eq("id", record.id)
      }

      if (result.error) {
        console.error("Error saving record:", result.error)
        alert(`Failed to ${mode} record: ${result.error.message}`)
        return
      }

      alert(`Record ${mode === "add" ? "added" : "updated"} successfully!`)
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving record:", error)
      alert(`Failed to ${mode} record`)
    } finally {
      setLoading(false)
    }
  }

  const renderField = (field: any) => {
    const value = formData[field.name] || ""

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            rows={4}
          />
        )

      case "select":
        return (
          <Select value={value} onValueChange={(val) => handleInputChange(field.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "boolean":
        return (
          <Select value={value.toString()} onValueChange={(val) => handleInputChange(field.name, val === "true")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        )

      case "array":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}, one per line`}
            rows={4}
          />
        )

      default:
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        )
    }
  }

  if (!config) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${mode === "add" ? "Add New" : "Edit"} ${tableName.replace(/_/g, " ").toUpperCase()}`}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((field: any) => (
            <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
              {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
            {loading ? "Saving..." : mode === "add" ? "Add Record" : "Update Record"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
