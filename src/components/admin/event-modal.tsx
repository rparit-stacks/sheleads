"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { supabaseAdmin } from "@/lib/supabase"
import { Save, X, Calendar } from "lucide-react"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  record?: any
  mode: "add" | "edit"
  onSuccess: () => void
}

export function EventModal({ isOpen, onClose, record, mode, onSuccess }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    event_time: "",
    image_url: "",
    max_attendees: "",
    price: "",
    currency: "INR",
    status: "published",
    event_type: "workshop",
    thank_you_message: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && record) {
        setFormData({
          title: record.title || "",
          description: record.description || "",
          location: record.location || "",
          event_date: record.event_date ? record.event_date.split("T")[0] : "",
          event_time: record.event_time || "",
          image_url: record.image_url || "",
          max_attendees: record.max_attendees?.toString() || "",
          price: record.price?.toString() || "0",
          currency: record.currency || "INR",
          status: record.status || "published",
          event_type: record.event_type || "workshop",
          thank_you_message: record.thank_you_message || "",
        })
      } else {
        setFormData({
          title: "",
          description: "",
          location: "",
          event_date: "",
          event_time: "",
          image_url: "",
          max_attendees: "",
          price: "0",
          currency: "INR",
          status: "published",
          event_type: "workshop",
          thank_you_message: "",
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

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.event_date) {
      newErrors.event_date = "Event date is required"
    }

    if (!formData.event_time) {
      newErrors.event_time = "Event time is required"
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
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        event_date: formData.event_date,
        event_time: formData.event_time,
        image_url: formData.image_url.trim() || null,
        max_attendees: formData.max_attendees ? Number(formData.max_attendees) : null,
        price: Number(formData.price) || 0,
        currency: formData.currency,
        status: formData.status,
        event_type: formData.event_type,
        thank_you_message: formData.thank_you_message.trim() || null,
        current_attendees: 0,
      }

      let result
      if (mode === "add") {
        result = await supabaseAdmin.from("events").insert([processedData])
      } else {
        result = await supabaseAdmin.from("events").update(processedData).eq("id", record.id)
      }

      if (result.error) {
        console.error("Error saving event:", result.error)
        alert(`Failed to ${mode} event: ${result.error.message}`)
        return
      }

      alert(`✅ Event ${mode === "add" ? "added" : "updated"} successfully!`)
      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving event:", error)
      alert(`❌ Failed to ${mode} event`)
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
          <Calendar className="w-5 h-5" />
          {mode === "add" ? "Add New" : "Edit"} Event
          <Badge variant="outline">Events</Badge>
        </div>
      }
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Event Title */}
          <div className="md:col-span-2">
            <Label htmlFor="title">
              Event Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., CANVA & AI WORKSHOP"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., Online, Mumbai, Delhi"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Event Type */}
          <div>
            <Label htmlFor="event_type">Event Type</Label>
            <Select value={formData.event_type} onValueChange={(value) => handleInputChange("event_type", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="bootcamp">Bootcamp</SelectItem>
                <SelectItem value="meetup">Meetup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Date */}
          <div>
            <Label htmlFor="event_date">
              Event Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="event_date"
              type="date"
              value={formData.event_date}
              onChange={(e) => handleInputChange("event_date", e.target.value)}
            />
            {errors.event_date && <p className="text-red-500 text-sm mt-1">{errors.event_date}</p>}
          </div>

          {/* Event Time */}
          <div>
            <Label htmlFor="event_time">
              Event Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="event_time"
              type="time"
              value={formData.event_time}
              onChange={(e) => handleInputChange("event_time", e.target.value)}
            />
            {errors.event_time && <p className="text-red-500 text-sm mt-1">{errors.event_time}</p>}
          </div>

          {/* Max Attendees */}
          <div>
            <Label htmlFor="max_attendees">Max Attendees</Label>
            <Input
              id="max_attendees"
              type="number"
              min="1"
              value={formData.max_attendees}
              onChange={(e) => handleInputChange("max_attendees", e.target.value)}
              placeholder="e.g., 50"
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="0 for free events"
            />
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

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange("image_url", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Event description..."
              rows={4}
            />
          </div>

          {/* Thank You Message */}
          <div className="md:col-span-2">
            <Label htmlFor="thank_you_message">Thank You Message</Label>
            <Textarea
              id="thank_you_message"
              value={formData.thank_you_message}
              onChange={(e) => handleInputChange("thank_you_message", e.target.value)}
              placeholder="Thank you message after registration..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : mode === "add" ? "Add Event" : "Update Event"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
