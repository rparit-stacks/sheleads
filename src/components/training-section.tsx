"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, Users, GraduationCap } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface TrainingSession {
  id: number
  title: string
  description: string
  instructor: string
  duration: number
  level: string
  price: number
  currency: string
  max_participants: number
  current_participants: number
  start_date: string
  end_date: string
  status: string
  certificate_provided: boolean
}

export default function TrainingSection() {
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("training_sessions")
        .select("*")
        .eq("status", "upcoming")
        .gte("start_date", new Date().toISOString().split("T")[0])
        .order("start_date", { ascending: true })

      if (error) {
        console.error("Error fetching sessions:", error)
        return
      }

      setSessions(data || [])
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency === "INR" ? "INR" : "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <section className="py-12 px-4 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loading Training Sessions...</h2>
            <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Training Sessions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated training programs designed to accelerate your business growth.
          </p>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No upcoming training sessions</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Check back soon for new training opportunities and skill-building workshops!
            </p>
            <Button className="bg-red-500 hover:bg-red-600 text-white">Get Notified</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session) => (
              <Card key={session.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={`${
                        session.level === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : session.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {session.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      {session.certificate_provided && (
                        <Badge variant="outline" className="text-xs">
                          Certificate
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {session.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{session.description}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Instructor: {session.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{session.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>
                        {formatDate(session.start_date)} - {formatDate(session.end_date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>
                        {session.current_participants || 0}/{session.max_participants} enrolled
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-red-500">
                      {formatPrice(session.price, session.currency)}
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
