import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Award, MapPin } from "lucide-react";

const SuccessStories = () => {
  const featuredStories = [
    {
      name: "Sangeeta",
      business: "From Atta Chakki to Shark Tank",
      city: "Maharashtra",
      results: "Traditional business to national TV platform",
      image: "/media/sangeeta sucess.avif",
      videoLink: "https://youtu.be/CfQk2FaS68A?si=LpxX3sAbJvNiorTj",
      story: "Sangeeta's journey from running a traditional atta chakki (flour mill) to pitching on Shark Tank India is a testament to the power of dreams and determination. She dives into the ups and downs of entrepreneurship, her experience pitching on a national platform, and the lessons she's learned along the way. Her story proves that with passion and hard work, even the most traditional businesses can achieve extraordinary success and recognition.",
      metrics: {
        achievement: "Featured on Shark Tank India",
        growth: "Traditional to tech-enabled business",
        inspiration: "Thousands inspired by her journey"
      }
    },
    {
      name: "Payaal Jain",
      business: "Professional Makeup Artist & Entrepreneur", 
      city: "Mumbai",
      results: "Carved unique path in beauty industry",
      image: "/api/placeholder/120/120",
      story: "Payaal's inspiring journey as a makeup artist showcases the beautiful blend of artistry and entrepreneurship. From starting as a passionate artist to building her own brand in the competitive beauty industry, she shares insights about creativity, business growth, and following your passion. This episode is a must-watch for anyone seeking inspiration, insights, or the motivation to carve their own path in the beauty industry!",
      metrics: {
        clients: "500+ satisfied clients",
        brand: "Award-winning makeup artist",
        community: "Inspiring next generation artists"
      }
    },
    {
      name: "Adv. Amruta Salunke",
      business: "RERA Expert, Lawyer & YouTuber",
      city: "Pune", 
      results: "Breaking barriers in law while building digital presence",
      image: "/media/Adv. Amruta Salunke.jpg",
      videoLink: "https://youtu.be/bsgUGK9pQ6U?si=TjyeC6LNDam_bNqm",
      story: "Meet Amruta, a remarkable lawyer specializing in RERA (Real Estate Regulatory Authority), a trailblazing entrepreneur, and a rising YouTuber. She opens up about her journey navigating a male-dominated industry, balancing a demanding career with personal life, and how she ventured into creating her own YouTube channel to share her knowledge and experiences. Her story demonstrates how women can excel professionally while building their personal brand and helping others.",
      metrics: {
        expertise: "RERA law specialist",
        platform: "Growing YouTube presence",
        impact: "Empowering through legal education"
      }
    }
  ];

  const quickTestimonials = [
    {
      quote: "The wisdom shared here doesn't just improve your business metrics—it transforms how you see yourself as a leader.",
      author: "Rajani Kulkarni",
      title: "Digital Marketing Agency Owner",
      city: "Pune"
    },
    {
      quote: "I found not just a business partner, but a sister who shares my vision. Together we're creating solutions our community needs.",
      author: "Kavitha Rao",
      title: "Tech Startup Co-founder",
      city: "Nagpur"
    },
    {
      quote: "The personal branding guidance helped me present my authentic self confidently. My ideal clients started finding me naturally.",
      author: "Sunita Joshi",
      title: "Business Consultant",
      city: "Nashik"
    },
    {
      quote: "From feeling lost as a freelancer to leading an agency with purpose. The mentorship program honored who I am while nurturing who I'm becoming.",
      author: "Pooja Mehta",
      title: "Digital Agency Founder",
      city: "Pune"
    },
    {
      quote: "The AI automation tools respect my time and family priorities. Technology serves my life's balance, not the other way around.",
      author: "Deepika Singh",
      title: "E-commerce Store Owner",
      city: "Nagpur"
    },
    {
      quote: "This sisterhood celebrates your uniqueness and supports your journey without judgment. It's sacred space for growth.",
      author: "Neha Agarwal",
      title: "Health & Wellness Coach",
      city: "Nashik"
    }
  ];

  const stats = [
    { number: "500+", label: "Women Transformed", icon: Users },
    { number: "₹2.5Cr+", label: "Revenue Generated", icon: TrendingUp },
    { number: "98%", label: "Success Rate", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, rgb(230, 0, 35), rgb(204, 0, 31))' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Courage Creates Change,
              <span className="block">Dreams Become Reality</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              These are not just business victories—they are stories of Indian women who chose to believe 
              in themselves, honoring their roots while reaching for their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-2xl shadow-elegant p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Journeys of Heart and Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the women who honored their dreams with courage and built businesses that celebrate both purpose and prosperity.
            </p>
          </div>

          <div className="space-y-16">
            {featuredStories.map((story, index) => (
              <Card key={index} className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-primary" />
                        <Badge variant="outline">{story.city}</Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{story.business}</p>
                      <div className="text-xl font-semibold text-primary mb-6">{story.results}</div>
                      
                      <blockquote className="text-foreground mb-6 italic leading-relaxed">
                        "{story.story}"
                      </blockquote>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {Object.entries(story.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
                            <div className="font-semibold text-primary">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="self-start group"
                        onClick={() => story.videoLink && window.open(story.videoLink, '_blank')}
                      >
                        Read Full Story
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                    
                    <div className="bg-gradient-section p-8 lg:p-12 flex items-center justify-center">
                      {story.name === "Sangeeta" ? (
                        <div className="w-full h-60 rounded-lg overflow-hidden flex items-center justify-center shadow-lg">
                          <img 
                            src={story.image} 
                            alt={story.name}
                            className="w-full h-full object-contain bg-white"
                          />
                        </div>
                      ) : story.name === "Adv. Amruta Salunke" ? (
                        <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                          <img 
                            src={story.image} 
                            alt={story.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-48 h-60 rounded-lg overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                          <img 
                            src={story.image} 
                            alt={story.name}
                            className="w-full h-full object-contain bg-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Testimonials Grid */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hundreds of women have transformed their businesses. Here's what they're saying.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
                      <div className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Your Success Story Starts Here
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every successful woman entrepreneur you just read about started exactly where you are now. 
              The only difference? They took action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                Start Your Transformation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Book Free Strategy Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;