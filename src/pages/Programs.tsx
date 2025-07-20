import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Brain, Rocket, CheckCircle, Clock, Award, Target, Heart, TrendingUp, Zap } from "lucide-react";
import membershipImage from "@/assets/she-leads-membership.webp";
import PricingSection from "@/components/pricing-section"

const Programs = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "The Spark Plan",
      price: "₹2,600",
      period: "year",
      badge: "Getting Started",
      tagline: "For women just getting started, your first spark of success.",
      features: [
        "Weekly live training on digital marketing",
        "Access to our supportive WhatsApp community",
        "Learn. Connect. Begin."
      ],
      icon: Zap,
      color: "bg-yellow-100",
      highlight: false
    },
    {
      id: 2,
      name: "The Rise Plan",
      price: "₹25,000",
      period: "year",
      badge: "Most Popular",
      tagline: "You're done surviving. Now it's time to rise.",
      features: [
        "Everything in The Spark Plan",
        "Exclusive monthly meetings focused on implementation",
        "Your business featured on our podcast",
        "Unlimited access to all training session recordings",
        "Personal brand boost with peer collaborations"
      ],
      icon: TrendingUp,
      color: "bg-blue-100",
      highlight: true
    },
    {
      id: 3,
      name: "The Thrive Plan",
      price: "₹75,000",
      period: "year",
      badge: "Growing Business",
      tagline: "Your business is growing—and so is your leadership.",
      features: [
        "Everything in The Rise Plan",
        "One 1:1 strategy call/month with our senior mentor",
        "Exclusive discounts on digital tools",
        "Priority access to resources, templates, and expert sessions"
      ],
      icon: Rocket,
      color: "bg-green-100",
      highlight: false
    },
    {
      id: 4,
      name: "The Empire Plan",
      price: "₹2,50,000",
      period: "year",
      badge: "Elite",
      tagline: "You're the visionary—we're your execution team.",
      features: [
        "Everything in The Thrive Plan",
        "Done-for-you social media marketing",
        "Funnels built for lead generation & conversions",
        "Two high-impact strategy calls/month",
        "Complete backend marketing support to free your time for CEO-level moves"
      ],
      icon: Award,
      color: "bg-purple-100",
      highlight: false
    }
  ];

  const impactPoints = [
    "Bridge the gap between ambition and execution",
    "Provide hands-on marketing tools and strategies",
    "Build connections through business sisterhood",
    "Transform learning into real implementation"
  ];

  const planRecommendations = [
    {
      plan: "Spark Plan",
      description: "Perfect for solopreneurs and early-stage founders who want consistent training and community support."
    },
    {
      plan: "Rise Plan",
      description: "Ideal for existing businesses needing strategy and visibility with implementation guidance."
    },
    {
      plan: "Thrive Plan",
      description: "Best for growing businesses needing personalized mentorship and premium tool access."
    },
    {
      plan: "Empire Plan",
      description: "For established founders ready to outsource marketing and focus on scaling operations."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section 
        className="py-16 md:py-20 lg:py-24 text-white relative bg-cover bg-center bg-no-repeat min-h-[60vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/market-place.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="w-full px-4 relative z-10 flex items-center min-h-[50vh]">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight drop-shadow-xl" style={{
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              Empowering Women Entrepreneurs with MarTech Mastery
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl mb-6 opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
              }}>
                A movement for women entrepreneurs to scale businesses using modern marketing technology. 
                Creating India's largest business growth ecosystem for women-led ventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Vision Section - Better Organization */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-light mb-4 text-gray-900">
                Our Impact Vision
              </h2>
              <p className="text-lg text-gray-600">We aim to:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {impactPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-normal text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-primary/5 p-6 rounded-lg">
              <p className="text-lg font-normal text-primary">
                Our goal: Help women build brands, communities, and legacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Made Smaller */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl lg:text-3xl font-light mb-4 text-gray-900">
                  Founded by <span className="text-primary">Nikita Vora</span>
                </h2>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                  Digital marketing consultant and visionary behind SHELeadsIndia. With a decade of experience 
                  and commitment to empowering women, Nikita envisions this as the go-to business growth hub 
                  for every woman entrepreneur in India.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-base font-normal text-primary italic">
                    "Don't just learn marketing—implement it, automate it, and profit from it."
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img
                    src={membershipImage}
                    alt="Nikita Vora - SHELeadsIndia Founder"
                    className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
<PricingSection />


      {/* Plan Recommendations */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-light mb-8 text-center text-gray-900">
              Plan Recommendations
            </h2>
            
            <div className="space-y-4">
              {planRecommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-normal text-primary mb-2">{rec.plan}:</h3>
                      <p className="text-gray-700 leading-relaxed">{rec.description}</p>
              </div>
              </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section 
        className="py-16 md:py-20 text-white relative bg-cover bg-center bg-no-repeat w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/market-place.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="w-full px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-light mb-6 drop-shadow-xl" style={{
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              Ready to Lead?
            </h3>
            <p className="text-lg mb-8 opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
            }}>
              Pick your plan. Power your brand. SHELeadsIndia is here to walk with you—from spark to empire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-normal py-3 px-6 shadow-lg transition-all duration-200 bg-transparent"
                style={{
                  borderColor: 'white',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#E60023';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-normal py-3 px-6 shadow-lg transition-all duration-200 bg-transparent"
                style={{
                  borderColor: 'white',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#E60023';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span>Schedule a Call</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;