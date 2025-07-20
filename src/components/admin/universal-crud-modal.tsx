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
import { Calendar, Clock, Save, X } from "lucide-react"

interface UniversalCrudModalProps {
  isOpen: boolean
  onClose: () => void
  tableName: string
  record?: any
  mode: "add" | "edit"
  onSuccess: () => void
}

// Enhanced field configurations for all tables
const getFieldConfig = (columnName: string, dataType: string, tableName: string) => {
  const name = columnName.toLowerCase()

  // Skip auto-generated fields
  if (name === "id" || name.includes("created_at") || name.includes("updated_at")) {
    return null
  }

  // Specific configurations for pricing_plans table
  if (tableName === "pricing_plans") {
    switch (name) {
      case "name":
        return { type: "text", required: true, placeholder: "e.g., The Spark Plan" }
      case "price":
        return { type: "number", required: true, min: 0, placeholder: "e.g., 2600" }
      case "currency":
        return { type: "select", options: ["INR", "USD"], default: "INR" }
      case "period":
        return { type: "select", options: ["month", "year"], default: "year" }
      case "description":
        return { type: "textarea", placeholder: "Plan description..." }
      case "features":
        return { type: "array", placeholder: "Enter features, one per line" }
      case "is_popular":
        return { type: "boolean", default: false }
      case "badge":
        return { type: "text", placeholder: "e.g., Most Popular" }
    }
  }

  // Specific configurations for events table
  if (tableName === "events") {
    switch (name) {
      case "title":
        return { type: "text", required: true, placeholder: "Event title" }
      case "description":
        return { type: "textarea", placeholder: "Event description..." }
      case "location":
        return { type: "text", required: true, placeholder: "e.g., Online, Mumbai" }
      case "event_date":
        return { type: "date", required: true }
      case "event_time":
        return { type: "time", required: true }
      case "image_url":
        return { type: "url", placeholder: "https://example.com/image.jpg" }
      case "max_attendees":
        return { type: "number", min: 1, placeholder: "e.g., 50" }
      case "current_attendees":
        return { type: "number", min: 0, default: 0 }
      case "price":
        return { type: "number", min: 0, default: 0, placeholder: "0 for free events" }
      case "currency":
        return { type: "select", options: ["INR", "USD"], default: "INR" }
      case "status":
        return { type: "select", options: ["published", "draft", "ended"], default: "published" }
      case "event_type":
        return {
          type: "select",
          options: ["workshop", "seminar", "webinar", "bootcamp", "meetup"],
          default: "workshop",
        }
      case "registration_fields":
        return { type: "json", placeholder: '{"fields": ["name", "email", "phone"]}' }
      case "thank_you_message":
        return { type: "textarea", placeholder: "Thank you message after registration..." }
    }
  }

  // Generic field types based on name patterns
  if (name.includes("email")) {
    return { type: "email", required: true }
  }

  if (name.includes("password")) {
    return { type: "password", required: true }
  }

  if (name.includes("phone")) {
    return { type: "tel", placeholder: "+91-9876543210" }
  }

  if (name.includes("url") || name.includes("image")) {
    return { type: "url", placeholder: "https://example.com" }
  }

  if (name.includes("date") && !name.includes("updated") && !name.includes("created")) {
    return { type: "date", required: true }
  }

  if (name.includes("time") && !name.includes("updated") && !name.includes("created")) {
    return { type: "time", required: true }
  }

  if (
    name.includes("price") ||
    name.includes("amount") ||
    name.includes("duration") ||
    name.includes("max_") ||
    name.includes("current_") ||
    name.includes("read_time")
  ) {
    return { type: "number", min: 0 }
  }

  if (
    name.includes("is_") ||
    name.includes("published") ||
    name.includes("active") ||
    name.includes("certificate_provided")
  ) {
    return { type: "boolean", default: false }
  }

  // Status fields with predefined options
  if (name === "status") {
    const statusOptions = {
      events: ["published", "draft", "ended"],
      training_sessions: ["upcoming", "ongoing", "completed", "cancelled"],
      pricing_purchases: ["pending", "completed", "failed"],
      contact_inquiries: ["new", "in_progress", "resolved"],
      blog_posts: ["published", "draft"],
    }
    return {
      type: "select",
      options: statusOptions[tableName as keyof typeof statusOptions] || ["active", "inactive"],
      default: statusOptions[tableName as keyof typeof statusOptions]?.[0] || "active",
    }
  }

  // Array fields (features, tags, syllabus)
  if (name === "features" || name === "tags" || name === "syllabus") {
    return { type: "array", placeholder: "Enter items, one per line" }
  }

  // Long text fields
  if (
    name.includes("description") ||
    name.includes("content") ||
    name.includes("message") ||
    name.includes("excerpt") ||
    name.includes("prerequisites") ||
    name.includes("thank_you")
  ) {
    return { type: "textarea", placeholder: "Enter detailed text..." }
  }

  // JSON fields
  if (name.includes("registration_fields") || name.includes("registration_data") || name.includes("details")) {
    return { type: "json", placeholder: '{"key": "value"}' }
  }

  // Default to text
  return { type: "text", placeholder: `Enter ${name.replace(/_/g, " ")}` }
}

export function UniversalCrudModal({ isOpen, onClose, tableName, record, mode, onSuccess }: UniversalCrudModalProps) {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [columns, setColumns] = useState<any[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchTableSchema()
    }
  }, [isOpen, tableName])

  useEffect(() => {
    if (columns.length > 0) {
      initializeFormData()
    }
  }, [columns, record, mode])

  const fetchTableSchema = async () => {
    try {
      const { data: schemaData } = await supabaseAdmin
        .from("information_schema.columns")
        .select("column_name, data_type, is_nullable, column_default")
        .eq("table_name", tableName)
        .eq("table_schema", "public")
        .order("ordinal_position")

      setColumns(schemaData || [])
    } catch (error) {
      console.error("Error fetching schema:", error)
    }
  }

  const initializeFormData = () => {
    const initialData: { [key: string]: any } = {}

    columns.forEach((column) => {
      const fieldConfig = getFieldConfig(column.column_name, column.data_type, tableName)
      if (!fieldConfig) return // Skip auto-generated fields

      if (mode === "edit" && record) {
        // Pre-fill with existing data
        let value = record[column.column_name]

        if (fieldConfig.type === "array" && Array.isArray(value)) {
          value = value.join("\n")
        } else if (fieldConfig.type === "json" && typeof value === "object") {
          value = JSON.stringify(value, null, 2)
        } else if (fieldConfig.type === "date" && value) {
          value = value.split("T")[0]
        }

        initialData[column.column_name] = value || ""
      } else {
        // Default values for add mode
        if (fieldConfig.type === "boolean") {
          initialData[column.column_name] = false
        } else if (fieldConfig.type === "number") {
          initialData[column.column_name] = fieldConfig.min || 0
        } else {
          initialData[column.column_name] = ""
        }
      }
    })

    setFormData(initialData)
    setErrors({})
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    columns.forEach((column) => {
      const fieldConfig = getFieldConfig(column.column_name, column.data_type, tableName)
      if (!fieldConfig) return

      const value = formData[column.column_name]

      // Only check required for explicitly required fields
      if (fieldConfig.required && (!value || value.toString().trim() === "")) {
        newErrors[column.column_name] = `${column.column_name.replace(/_/g, " ")} is required`
      }

      if (fieldConfig.type === "email" && value && value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors[column.column_name] = "Invalid email format"
        }
      }

      if (fieldConfig.type === "json" && value && value.trim()) {
        try {
          JSON.parse(value)
        } catch {
          newErrors[column.column_name] = "Invalid JSON format"
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
      const processedData: { [key: string]: any } = {}

      columns.forEach((column) => {
        const fieldConfig = getFieldConfig(column.column_name, column.data_type, tableName)
        if (!fieldConfig) return

        let value = formData[column.column_name]

        // Skip empty values unless it's a boolean or number with default
        if (value === "" || value === null || value === undefined) {
          if (fieldConfig.type === "boolean") {
            value = fieldConfig.default || false
          } else if (fieldConfig.type === "number" && fieldConfig.default !== undefined) {
            value = fieldConfig.default
          } else {
            return // Skip empty values
          }
        }

        // Process different field types
        if (fieldConfig.type === "array" && typeof value === "string") {
          value = value
            .split("\n")
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0)
        } else if (fieldConfig.type === "json" && typeof value === "string") {
          try {
            value = JSON.parse(value)
          } catch {
            value = {} // Default to empty object for invalid JSON
          }
        } else if (fieldConfig.type === "boolean") {
          value = Boolean(value)
        } else if (fieldConfig.type === "number") {
          value = value ? Number(value) : fieldConfig.default || 0
        }

        processedData[column.column_name] = value
      })

      let result
      if (mode === "add") {
        result = await supabaseAdmin.from(tableName).insert([processedData])
      } else {
        result = await supabaseAdmin.from(tableName).update(processedData).eq("id", record.id)
      }

      if (result.error) {
        console.error("Error saving record:", result.error)
        alert(`Failed to ${mode} record: ${result.error.message}`)
        return
      }

      alert(`✅ Record ${mode === "add" ? "added" : "updated"} successfully!`)
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving record:", error)
      alert(`❌ Failed to ${mode} record`)
    } finally {
      setLoading(false)
    }
  }

  const renderField = (column: any) => {
    const fieldConfig = getFieldConfig(column.column_name, column.data_type, tableName)
    if (!fieldConfig) return null

    const value = formData[column.column_name] || ""
    const label = column.column_name.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
    const isRequired = column.is_nullable === "NO" && !column.column_default

    switch (fieldConfig.type) {
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(column.column_name, e.target.value)}
            placeholder={fieldConfig.placeholder || `Enter ${label.toLowerCase()}`}
            rows={4}
          />
        )

      case "select":
        return (
          <Select value={value} onValueChange={(val) => handleInputChange(column.column_name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={Boolean(value)}
              onCheckedChange={(checked) => handleInputChange(column.column_name, checked)}
            />
            <span className="text-sm">{Boolean(value) ? "Yes" : "No"}</span>
          </div>
        )

      case "array":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(column.column_name, e.target.value)}
            placeholder={fieldConfig.placeholder || `Enter ${label.toLowerCase()}, one per line`}
            rows={4}
          />
        )

      case "json":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(column.column_name, e.target.value)}
            placeholder={fieldConfig.placeholder || `Enter valid JSON for ${label.toLowerCase()}`}
            rows={6}
            className="font-mono text-sm"
          />
        )

      default:
        return (
          <Input
            type={fieldConfig.type}
            value={value}
            onChange={(e) => handleInputChange(column.column_name, e.target.value)}
            placeholder={fieldConfig.placeholder || `Enter ${label.toLowerCase()}`}
            min={fieldConfig.min}
          />
        )
    }
  }

  const editableColumns = columns.filter(
    (column) => getFieldConfig(column.column_name, column.data_type, tableName) !== null,
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          {mode === "add" ? <Save className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {mode === "add" ? "Add New" : "Edit"} {tableName.replace(/_/g, " ").toUpperCase()}
          <Badge variant="outline">{editableColumns.length} fields</Badge>
        </div>
      }
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {editableColumns.map((column) => {
            const fieldConfig = getFieldConfig(column.column_name, column.data_type, tableName)
            const label = column.column_name.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
            const isRequired = column.is_nullable === "NO" && !column.column_default

            return (
              <div
                key={column.column_name}
                className={fieldConfig?.type === "textarea" || fieldConfig?.type === "json" ? "md:col-span-2" : ""}
              >
                <Label htmlFor={column.column_name} className="flex items-center gap-2">
                  {fieldConfig?.type === "date" && <Calendar className="w-4 h-4" />}
                  {fieldConfig?.type === "time" && <Clock className="w-4 h-4" />}
                  {label}
                  {isRequired && <span className="text-red-500">*</span>}
                  <Badge variant="outline" className="text-xs">
                    {column.data_type}
                  </Badge>
                </Label>
                {renderField(column)}
                {errors[column.column_name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[column.column_name]}</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : mode === "add" ? "Add Record" : "Update Record"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
