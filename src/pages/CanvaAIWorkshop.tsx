import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, Clock, CheckCircle, Star, ArrowRight, Play, Sparkles, Zap, Target, Award, Coffee, Heart, Users as UsersIcon, BookOpen, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const CanvaAIWorkshop = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const ticketIncludes = [
    "A hands-on Canva design session",
    "AI-powered content writing techniques", 
    "Real-time practice with guided prompts",
    "Worksheets, tools, and takeaways",
    "Community networking with growth-focused women",
    "Lunch and hi-tea"
  ];

  const whyAttend = [
    "Learn practical, ready-to-use Canva and AI skills",
    "Build content with clarity and confidence", 
    "Network with inspiring women entrepreneurs",
    "Get the knowledge you can immediately apply to grow your brand"
  ];

  const previousEventPhotos = [
    "/media/DSC02058.JPG",
    "/media/DSC02132.JPG", 
    "/media/DSC02153.JPG",
    "/media/DSC02211.JPG",
    "/media/IMG_0013.JPG",
    "/media/IMG_0137.JPG",
    "/media/networking.JPG",
    "/media/Mentoring.JPG"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/media/IMG_0011.JPG"
            alt="Empowering Women Entrepreneurs"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center',
              height: '100vh',
              width: '100%',
              maxWidth: '100vw'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto text-white" variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              EXCLUSIVE WORKSHOP
              <Sparkles className="h-4 w-4" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              CANVA & AI WORKSHOP
            </h1>
            
            <p className="text-2xl md:text-3xl font-semibold text-red-400 mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
              Design Bold. Write Smart. Build Consistently.
            </p>
            
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
              An in-person workshop for women entrepreneurs, freelancers, and content creators 
              ready to upskill using digital and AI tools.
            </p>

            {/* Key Event Details */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
              variants={staggerContainer}
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:border-red-300 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Calendar className="h-8 w-8 text-red-400 mb-3 mx-auto" />
                <p className="font-semibold text-white">1st August 2025</p>
                <p className="text-sm text-white/80">Save the Date</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:border-red-300 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <MapPin className="h-8 w-8 text-red-400 mb-3 mx-auto" />
                <p className="font-semibold text-white">Nashik</p>
                <p className="text-sm text-white/80">Venue details post-registration</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:border-red-300 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Clock className="h-8 w-8 text-red-400 mb-3 mx-auto" />
                <p className="font-semibold text-white">11 AM – 4 PM</p>
                <p className="text-sm text-white/80">5 Hours of Learning</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:border-red-300 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="w-8 h-8 text-red-400 mb-3 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold">₹</span>
                </div>
                <p className="font-semibold text-white">₹1500/-</p>
                <p className="text-sm text-white/80">All inclusive</p>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                asChild 
                size="xl" 
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl"
              >
                <a href="https://rzp.io/rzp/TmsWQUS" target="_blank" rel="noopener noreferrer">
                  <Zap className="h-6 w-6 mr-3" />
                  Secure Your Spot Now
                  <ArrowRight className="h-6 w-6 ml-3" />
                </a>
              </Button>
            </motion.div>
            
            <p className="text-sm text-white/90 mt-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
              <strong>⚡ Seats are limited. Registration closes soon.</strong>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Meet Your Leaders Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Meet Your <span className="text-red-600">Inspiring Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from experienced women entrepreneurs who've mastered digital tools 
              and built successful businesses.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {/* City Leader Brinda */}
            <motion.div 
              className="text-center group"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-red-200 group-hover:border-red-300 transition-all duration-300">
                  <img 
                    src="/media/city leader brinda.jpg" 
                    alt="City Leader Brinda" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  City Leader
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Brinda</h3>
              <p className="text-red-600 font-semibold mb-3">SHELeads Nashik City Leader</p>
              <p className="text-gray-600 leading-relaxed">
                Leading entrepreneur and mentor who has guided hundreds of women 
                in building their digital presence and growing their businesses.
              </p>
            </motion.div>

            {/* Founder Nikita Vora */}
            <motion.div 
              className="text-center group"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-red-200 group-hover:border-red-300 transition-all duration-300">
                  <img 
                    src="/media/founder-nikita.webp" 
                    alt="Nikita Vora - Founder" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Founder
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nikita Vora</h3>
              <p className="text-red-600 font-semibold mb-3">SHELeads India Founder</p>
              <p className="text-gray-600 leading-relaxed">
                Visionary entrepreneur and AI enthusiast who has empowered thousands of women 
                to leverage technology for business growth and digital transformation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* What Your Ticket Includes */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              What Your <span className="text-red-600">Ticket Includes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get everything you need for a complete learning experience, 
              plus delicious meals and networking opportunities.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {ticketIncludes.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-red-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why You Should Attend */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Why You <span className="text-red-600">Should Attend</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This isn't just another workshop. It's your gateway to mastering 
              the digital tools that will transform your business.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {whyAttend.map((reason, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-red-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium text-lg leading-relaxed">{reason}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Previous Events Gallery */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              See Our <span className="text-red-600">Previous Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of women who have already transformed their businesses 
              through our workshops and events.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
            variants={staggerContainer}
          >
            {previousEventPhotos.map((photo, index) => (
              <motion.div 
                key={index}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <img
                  src={photo}
                  alt={`Previous event ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center" variants={fadeInUp}>
            <p className="text-lg text-gray-600 mb-8">
              <strong>Join our community of 500+ successful women entrepreneurs!</strong>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="py-20 bg-red-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto" variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4" />
              LIMITED SEATS AVAILABLE
              <Star className="h-4 w-4" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Don't miss this opportunity to master Canva and AI tools that will 
              revolutionize how you create content and grow your brand.
            </p>

            <motion.div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  asChild 
                  size="xl" 
                  className="bg-white text-red-600 hover:bg-gray-100 px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl"
                >
                  <a href="https://rzp.io/rzp/TmsWQUS" target="_blank" rel="noopener noreferrer">
                    <Heart className="h-6 w-6 mr-3" />
                    Book My Seat - ₹1500/-
                    <ArrowRight className="h-6 w-6 ml-3" />
                  </a>
                </Button>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Lunch & Hi-tea included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Take-home materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Networking opportunities</span>
                </div>
              </div>

              <p className="text-lg opacity-90">
                <strong>🔥 Early Bird Special: Book now and get exclusive bonus materials!</strong>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default CanvaAIWorkshop; 