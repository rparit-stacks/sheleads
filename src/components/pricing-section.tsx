"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { PricingPurchaseModal } from "@/components/pricing-purchase-modal"

interface PricingPlan {
  id: number
  name: string
  price: number
  currency: string
  period: string
  description: string
  features: string[]
  is_popular: boolean
  badge: string
}

export default function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase.from("pricing_plans").select("*").order("price", { ascending: true })

      if (error) {
        console.error("Error fetching plans:", error)
        return
      }

      setPlans(data || [])
    } catch (error) {
      console.error("Error fetching plans:", error)
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

  if (loading) {
    return (
      <section className="py-12 px-4 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loading Pricing Plans...</h2>
            <div className="animate-pulse flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 h-96 w-72 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 md:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Power Play Pricing Model</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose a plan that matches your momentum:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative h-full flex flex-col ${
                plan.is_popular ? "border-2 border-red-500 shadow-lg scale-105" : "border border-gray-200"
              }`}
            >
              {plan.badge && (
                <Badge
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs font-medium ${
                    plan.is_popular ? "bg-red-500 text-white" : "bg-gray-800 text-white"
                  }`}
                >
                  {plan.badge}
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    plan.name.includes("Spark")
                      ? "bg-yellow-100"
                      : plan.name.includes("Rise")
                        ? "bg-blue-100"
                        : plan.name.includes("Thrive")
                          ? "bg-green-100"
                          : "bg-purple-100"
                  }`}
                >
                  <span className="text-2xl">
                    {plan.name.includes("Spark")
                      ? "⚡"
                      : plan.name.includes("Rise")
                        ? "📈"
                        : plan.name.includes("Thrive")
                          ? "🚀"
                          : "👑"}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-red-500">{formatPrice(plan.price, plan.currency)}</span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.is_popular
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white border border-red-500 text-red-500 hover:bg-red-50"
                  }`}
                  onClick={() => {
                    setSelectedPlan(plan)
                    setShowPurchaseModal(true)
                  }}
                >
                  Choose Plan →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <PricingPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => {
          setShowPurchaseModal(false)
          setSelectedPlan(null)
        }}
        plan={selectedPlan}
      />
    </section>
  )
}
