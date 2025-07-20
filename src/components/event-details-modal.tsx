"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, IndianRupee } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { loadRazorpay, RAZORPAY_CONFIG } from "@/lib/razorpay"

interface Event {
  id: number
  title: string
  description: string
  location: string
  event_date: string
  event_time: string
  image_url: string
  max_attendees: number
  current_attendees: number
  price: number
  currency: string
  status: string
  event_type: string
}

interface EventDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
}

interface RegistrationData {
  name: string
  email: string
  phone: string
  company: string
  designation: string
  experienceLevel: string
  specialRequirements: string
}

export function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    experienceLevel: "",
    specialRequirements: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency === "INR" ? "INR" : "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    setLoading(true)

    try {
      if (event.price > 0) {
        // Paid event - process payment first
        const Razorpay = await loadRazorpay()

        const options = {
          key: RAZORPAY_CONFIG.keyId,
          amount: event.price * 100,
          currency: "INR",
          name: "Event Registration",
          description: `Registration for ${event.title}`,
          image: "/placeholder.svg?height=100&width=100&text=Logo",
          handler: async (response: any) => {
            // Save registration after successful payment
            await saveRegistration(response.razorpay_payment_id, "completed")
          },
          prefill: {
            name: registrationData.name,
            email: registrationData.email,
            contact: registrationData.phone,
          },
          theme: {
            color: "#ef4444",
          },
        }

        const rzp = new Razorpay(options)
        rzp.open()
      } else {
        // Free event - direct registration
        await saveRegistration(null, "completed")
      }
    } catch (error) {
      console.error("Error processing registration:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const saveRegistration = async (paymentId: string | null, paymentStatus: string) => {
    if (!event) return

    const { error } = await supabase.from("event_registrations").insert({
      event_id: event.id,
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      company: registrationData.company,
      designation: registrationData.designation,
      experience_level: registrationData.experienceLevel,
      special_requirements: registrationData.specialRequirements,
      payment_status: paymentStatus,
      payment_id: paymentId,
      amount_paid: event.price,
    })

    if (error) {
      console.error("Error saving registration:", error)
      alert("Registration failed. Please try again.")
    } else {
      alert("🎉 Registration successful! You will receive confirmation email shortly.")
      onClose()
      setShowRegistration(false)
      // Reset form
      setRegistrationData({
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        experienceLevel: "",
        specialRequirements: "",
      })
    }
  }

  if (!event) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event.title} size="xl">
      <div className="space-y-6">
        {!showRegistration ? (
          // Event Details View
          <>
            {/* Event Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <img
                src={event.image_url || "/placeholder.svg?height=300&width=600"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 capitalize">{event.event_type}</Badge>
                <Badge
                  className={`${
                    event.status === "published"
                      ? "bg-green-100 text-green-800"
                      : event.status === "ended"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {event.status}
                </Badge>
              </div>

              <p className="text-gray-700 leading-relaxed">{event.description}</p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{formatDate(event.event_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">{formatTime(event.event_time)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-gray-600">
                      {event.current_attendees || 0}/{event.max_attendees} registered
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Registration Fee</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{formatPrice(event.price, event.currency)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Close
              </Button>
              <Button
                onClick={() => setShowRegistration(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={event.status !== "published"}
              >
                Register Now
              </Button>
            </div>
          </>
        ) : (
          // Registration Form View
          <>
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Register for {event.title}</h3>
              <p className="text-gray-600">Please fill in your details to complete registration</p>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={registrationData.name}
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
                    value={registrationData.email}
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
                    value={registrationData.phone}
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
                    value={registrationData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    type="text"
                    value={registrationData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    placeholder="Your job title"
                  />
                </div>
                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={registrationData.experienceLevel}
                    onValueChange={(value) => handleInputChange("experienceLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                <Textarea
                  id="specialRequirements"
                  value={registrationData.specialRequirements}
                  onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                  placeholder="Any dietary restrictions, accessibility needs, or other requirements..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowRegistration(false)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {loading
                    ? "Processing..."
                    : event.price > 0
                      ? `Pay ${formatPrice(event.price, event.currency)}`
                      : "Register Free"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}
