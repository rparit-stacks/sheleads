import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProgramsShowcase from "@/components/ProgramsShowcase";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Award, TrendingUp, Mic, Play, ChevronLeft, ChevronRight, Camera, Calendar, Zap, Heart, Star, CheckCircle, Clock, MapPin } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Podcast carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Media carousel state
  const [mediaCurrentSlide, setMediaCurrentSlide] = useState(0);
  const [isMediaAutoPlaying, setIsMediaAutoPlaying] = useState(true);
  
  // Reviews carousel state
  const [currentReview, setCurrentReview] = useState(0);
  
  // Events carousel state
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  
  const podcastEpisodes = [
    {
      id: 1,
      title: "From Atta Chakki to Shark Tank | SHELeads India",
      description: "Sangeeta dives into the ups and downs of entrepreneurship, her experience pitching on a national platform, and the lessons she's learned along the way.",
      embedUrl: "https://www.youtube.com/embed/CfQk2FaS68A",
      thumbnail: "https://img.youtube.com/vi/CfQk2FaS68A/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "Inspiring journey of a makeup artist | SHELeads India", 
      description: "This episode is a must-watch for anyone seeking inspiration, insights, or the motivation to carve their own path!",
      embedUrl: "https://www.youtube.com/embed/Cjtxwlz4uUI",
      thumbnail: "https://img.youtube.com/vi/Cjtxwlz4uUI/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "The twenty year old solopreneur | SHELeads India",
      description: "Meet an inspiring young entrepreneur who's building her empire at just twenty years old. Discover her secrets to success.",
      embedUrl: "https://www.youtube.com/embed/tZxTcIwGpTA",
      thumbnail: "https://img.youtube.com/vi/tZxTcIwGpTA/maxresdefault.jpg"
    },
    {
      id: 4,
      title: "Her Legacy: A Lawyer's Impact on RERA and Entrepreneurship | SHELeads India",
      description: "Meet Adv. Amruta Salunke: Lawyer, RERA Expert, and Women Entrepreneur. A remarkable journey in a male-dominated industry.",
      embedUrl: "https://www.youtube.com/embed/bsgUGK9pQ6U",
      thumbnail: "https://img.youtube.com/vi/bsgUGK9pQ6U/maxresdefault.jpg"
    }
  ];

  const mediaFeatures = [
    {
      name: "United News of India",
      url: "https://www.uniindia.com/empowerher24-of-sheleads-on-the-mission-to-transfoming-future-of-women-entrepreneurs/business-wire-india/news/3349214.html",
      logo: "/media/united news of india.jpg"
    },
    {
      name: "WN.com",
      url: "https://article.wn.com/view/2024/12/19/EmpowerHER24_of_SHELeads_On_the_Mission_to_Transfoming_Futur/",
      logo: "/media/wn logo.png"
    },
    {
      name: "Ad Hoc News",
      url: "https://www.ad-hoc-news.de/boerse/news/marktberichte/empowerher24-of-sheleads-on-the-mission-to-transforming-future-of-women/66321549",
      logo: "/media/ad hoc news logo.jpg"
    },
    {
      name: "Kalkine Media",
      url: "https://kalkinemedia.com/in/business/healthcare/empowerher24-of-sheleads-on-the-mission-to-transfoming-future-of-women-entrepreneurs",
      logo: "/media/kalkine media logo.png"
    },
    {
      name: "Times Tech",
      url: "https://timestech.in/businesswire/?for=N&Value=vEFxp6Mfc84tqvQIfqcl5QgsAe3llrbC%2fwjjK%2fc81l8bIQhJPPqb97lHYwI%3d",
      logo: "/media/times tech logo.png"
    },
    {
      name: "IANS Wire Service",
      url: "https://www.ians.in/business-wire-detail/empowerher24-of-sheleads-on-the-mission-to-transfoming-future-of-women-entrepreneurs-19-12-2024",
      logo: "/media/ians wire service  logo.png"
    },
    {
      name: "Business News This Week",
      url: "https://businessnewsthisweek.com/business-wire-listing/?for=N&Value=i%2bty63agk4y3eEYhhJ%2fIwAi9%2fjSGNJ6X4gi0UE8CfEgdDwjJIx4JqC6j%2fAI%3d",
      logo: "/media/business news this week logo.jpg"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
      setIsPlaying(false); // Reset play state when slide changes
    }, 3000); // 3 seconds per slide
    
    return () => clearInterval(timer);
  }, [podcastEpisodes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
    setIsPlaying(false); // Reset play state
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + podcastEpisodes.length) % podcastEpisodes.length);
    setIsPlaying(false); // Reset play state
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false); // Reset play state
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // Media carousel auto-rotation
  useEffect(() => {
    if (!isMediaAutoPlaying) return;
    
    const mediaTimer = setInterval(() => {
      setMediaCurrentSlide((prev) => (prev + 1) % mediaFeatures.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(mediaTimer);
  }, [isMediaAutoPlaying, mediaFeatures.length]);

  // Reviews carousel auto-rotation
  useEffect(() => {
    const reviewsTimer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % 3);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(reviewsTimer);
  }, []);

  // Events carousel auto-rotation
  useEffect(() => {
    const eventsTimer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % 3);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(eventsTimer);
  }, []);

  // Get visible media items for carousel (3 at a time on desktop, middle one changes)
  const getVisibleMediaItems = () => {
    const leftIndex = (mediaCurrentSlide - 1 + mediaFeatures.length) % mediaFeatures.length;
    const centerIndex = mediaCurrentSlide;
    const rightIndex = (mediaCurrentSlide + 1) % mediaFeatures.length;
    
    return [
      mediaFeatures[leftIndex],
      mediaFeatures[centerIndex],
      mediaFeatures[rightIndex]
    ];
  };

  // Media navigation functions
  const goToMediaSlide = (index: number) => {
    setMediaCurrentSlide(index);
  };

  const nextMediaSlide = () => {
    setMediaCurrentSlide((prev) => (prev + 1) % mediaFeatures.length);
  };

  const prevMediaSlide = () => {
    setMediaCurrentSlide((prev) => (prev - 1 + mediaFeatures.length) % mediaFeatures.length);
  };

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

  // Podcast slide animation variants
  const slideVariants = {
    enter: {
      scale: 0.95,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 25,
        opacity: { duration: 0.4 }
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const testimonials = [
    {
      quote: "From running a traditional atta chakki to pitching on Shark Tank India - SHELeadsIndia helped me transform my business and navigate entrepreneurship challenges. This incredible journey taught me that with passion and determination, dreams truly have no limits!",
      author: "Sangeeta",
      title: "From Atta Chakki to Shark Tank",
      city: "Mumbai"
    },
    {
      quote: "Building my makeup artistry brand in the competitive beauty industry was challenging until SHELeadsIndia showed me how to blend creativity with smart business strategies. Now I'm living my passion while inspiring the next generation of artists!",
      author: "Payaal Jain",
      title: "Professional Makeup Artist & Entrepreneur",
      city: "Pune"
    },
    {
      quote: "Breaking into the male-dominated legal industry while building my YouTube presence felt impossible until SHELeadsIndia showed me the path forward. Now I successfully balance my RERA expertise with content creation, empowering women through legal education every single day!",
      author: "Adv. Amruta Salunke",
      title: "RERA Expert, Lawyer & YouTuber",
      city: "Pune"
    }
  ];

  const leadMagnets = [
    {
      title: "5-Day Sacred Business Journey",
      description: "Transform your business dreams into reality with daily intention-setting practices designed by inspiring Indian women entrepreneurs.",
      icon: TrendingUp
    },
    {
      title: "Discover Your Authentic Brand Heart",
      description: "Uncover your unique brand essence and receive personalized guidance for expressing your truth with confidence.",
      icon: Award
    },
    {
      title: "Mindful Launch Success Ritual",
      description: "Everything you need to birth your venture with grace, ensuring every sacred step is honored in your business journey.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      <style>
        {`
          @keyframes popupSubtle {
            0%, 100% { 
              transform: scale(1) translateY(0px); 
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            50% { 
              transform: scale(1.05) translateY(-5px); 
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(230, 0, 35, 0.2);
            }
          }
        `}
      </style>
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Community Reach Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              You're Not Alone in This.
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
              <span className="font-bold text-red-600">Over 10,000 women</span> across India have already started building their digital growth stories with us.
            </p>
            <p className="text-lg md:text-xl text-gray-600">
              Across Pune, Nashik, Nagpur, and now expanding city by city.
            </p>
          </motion.div>

          {/* Map and Testimonials Section */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-24 items-start max-w-7xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Left Side - Clean Map Only */}
            <motion.div 
              className="flex flex-col items-start lg:pr-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-6 text-center lg:text-left">
                Our Presence Across India
              </h3>
              
              {/* Clean Map - No Dots */}
              <img 
                src="/media/india map.jpg" 
                alt="India Map - SHELeads presence" 
                className="w-full max-w-sm h-auto"
              />
            </motion.div>

            {/* Right Side - Testimonials */}
            <motion.div 
              className="space-y-8 lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What Our <span className="text-red-600">Community</span> Says
              </h3>
              
              {/* Testimonial 1 - Pune */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src="/media/IMG_20250101_201136 - Gopi V.jpg" 
                    alt="Gopi Vishrolia Joshi"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-red-600 text-lg">Gopi Vishrolia Joshi</h4>
                    <p className="text-gray-900 text-sm font-medium">Digital Entrepreneur</p>
                    <p className="text-gray-600 text-sm">Pune</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "SHELeadsIndia has been a game-changer! From learning AI tools and Canva to mastering social media management, their sessions have helped streamline my work and provided very good inputs to boost my brand visibility."
                </p>
              </div>
              
              {/* Testimonial 2 - Pune */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src="/media/IMG_6764 - Manjusha Bhaskarwar.jpeg" 
                    alt="Manjusha Ravi Bhaskarwar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-red-600 text-lg">Manjusha Ravi Bhaskarwar</h4>
                    <p className="text-gray-900 text-sm font-medium">Content Creator</p>
                    <p className="text-gray-600 text-sm">Pune</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "SHELeadsIndia helped me by providing regular AI tools, and challenging me with the YouTube and Instagram challenges, along with more Canva learning. Since joining, I've updated my channel and social media with better content and quality."
                </p>
              </div>
              
              {/* Testimonial 3 - Nashik */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src="/media/png_20230407_202102_0000 - Ankita Creation.png" 
                    alt="Anjali Arvikar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-red-600 text-lg">Anjali Arvikar</h4>
                    <p className="text-gray-900 text-sm font-medium">Social Media Expert</p>
                    <p className="text-gray-600 text-sm">Nashik</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "SHELeadsIndia helped me in many areas through their trainings. I learned about many social media tools and, of course, gained confidence."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Upcoming Events Carousel Section */}
      <motion.section 
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black">
              Upcoming <span className="text-red-600">Events</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our transformative events designed specifically for women entrepreneurs
            </p>
          </div>

          {/* Events Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
                >
                  {/* Event 1: CANVA & AI WORKSHOP */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200 group h-[320px] md:h-[380px]">
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-15">
                        <img 
                          src="/media/IMG_0011.JPG" 
                          alt="Hero Background" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-3 md:p-4 h-full flex flex-col">
                        {/* Header with Brand Colors */}
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <div className="flex items-center gap-2 md:gap-3 flex-1">
                            <div className="relative">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Zap className="h-4 w-4 md:h-5 md:w-5 text-white" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">🔥</span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg md:text-xl font-bold text-black mb-1">CANVA & AI WORKSHOP</h3>
                              <p className="text-red-600 font-semibold text-xs md:text-sm">Design Bold. Write Smart.</p>
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1">₹1500</div>
                            <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">includes lunch & kit</div>
                          </div>
                        </div>
                        
                        {/* Event Details with Brand Colors */}
                        <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 md:p-2 text-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                            </div>
                            <div className="font-semibold text-black text-xs md:text-sm">1st August 2025</div>
                            <div className="text-xs text-gray-600">Workshop Day</div>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 md:p-2 text-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                            </div>
                            <div className="font-semibold text-black text-xs md:text-sm">11 AM – 4 PM</div>
                            <div className="text-xs text-gray-600">5 Hours Intensive</div>
                          </div>
                        </div>
                        
                        {/* Focus Areas with Brand Colors */}
                        <div className="mb-3 md:mb-4 flex-1">
                          <h4 className="font-bold text-xs md:text-sm mb-2 text-black flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                            What's Included:
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">Canva design session</span>
                            </div>
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">AI content writing</span>
                            </div>
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">Take-home materials</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Brand Color Button */}
                        <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 mt-auto text-xs md:text-sm">
                          <a href="https://rzp.io/rzp/TmsWQUS" target="_blank" rel="noopener noreferrer">
                            Register Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Event 2: Weekly Free Training */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200 group h-[320px] md:h-[380px]">
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-15">
                        <img 
                          src="/media/market place.JPG" 
                          alt="Market Place Background" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-3 md:p-4 h-full flex flex-col">
                        {/* Header with Brand Colors */}
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <div className="flex items-center gap-2 md:gap-3 flex-1">
                            <div className="relative">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Play className="h-4 w-4 md:h-5 md:w-5 text-white" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">FREE</span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg md:text-xl font-bold text-black mb-1">Weekly Free Training</h3>
                              <p className="text-red-600 font-semibold text-xs md:text-sm">Online Session</p>
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1">FREE</div>
                            <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">weekly session</div>
                          </div>
                        </div>
                        
                        {/* Event Details with Brand Colors */}
                        <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 md:p-2 text-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                            </div>
                            <div className="font-semibold text-black text-xs md:text-sm">Tuesday, 23rd July</div>
                            <div className="text-xs text-gray-600">Weekly Session</div>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 md:p-2 text-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                            </div>
                            <div className="font-semibold text-black text-xs md:text-sm">5 PM – 6 PM</div>
                            <div className="text-xs text-gray-600">1 Hour Session</div>
                          </div>
                        </div>
                        
                        {/* Focus Areas with Brand Colors */}
                        <div className="mb-3 md:mb-4 flex-1">
                          <h4 className="font-bold text-xs md:text-sm mb-2 text-black flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                            This Week's Topic:
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">Instagram Growth for Women Entrepreneurs</span>
                            </div>
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">Master social media marketing</span>
                            </div>
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">Zoom platform access</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Brand Color Button */}
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 mt-auto text-xs md:text-sm">
                          Join Free
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Event 3: 5-Day Challenge */}
                  <div className="w-full flex-shrink-0 px-4">
                    <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200 group h-[320px] md:h-[380px]">
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-15">
                        <img 
                          src="/media/Mentoring.JPG" 
                          alt="Mentoring Background" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-3 md:p-4 h-full flex flex-col">
                        {/* Header with Brand Colors */}
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <div className="flex items-center gap-2 md:gap-3 flex-1">
                            <div className="relative">
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                <div className="text-base md:text-lg font-bold text-white">5</div>
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">⚡</span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg md:text-xl font-bold text-black mb-1">5-Day Challenge</h3>
                              <p className="text-red-600 font-semibold text-xs md:text-sm">Content That Converts</p>
                            </div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="text-xl md:text-2xl font-bold text-red-600 mb-1">₹1500</div>
                            <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full">complete program</div>
                          </div>
                        </div>
                        
                        {/* Event Details with Brand Colors */}
                        <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 md:p-2 text-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                            </div>
                            <div className="font-semibold text-black text-xs md:text-sm">Starts 5th August</div>
                            <div className="text-xs text-gray-600">5-Day Program</div>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 md:p-2 text-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                              <div className="w-3 h-3 md:w-4 md:h-4 text-red-600">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="font-semibold text-black text-xs md:text-sm">WhatsApp + Live Zoom</div>
                            <div className="text-xs text-gray-600">Hybrid Format</div>
                          </div>
                        </div>
                        
                        {/* Focus Areas with Brand Colors */}
                        <div className="mb-3 md:mb-4 flex-1">
                          <h4 className="font-bold text-xs md:text-sm mb-2 text-black flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                            Focus Areas:
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">AI-powered content calendar</span>
                            </div>
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">Lead magnets creation</span>
                            </div>
                            <div className="flex items-center gap-2 p-1 bg-white/90 backdrop-blur-sm rounded-lg">
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                              <span className="font-medium text-xs">CTA writing techniques</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Brand Color Button */}
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 mt-auto text-xs md:text-sm">
                          Join Challenge
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEventIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentEventIndex === index ? 'bg-red-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why We Exist Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-6">
                <img 
                  src="/she-leads-logo.png" 
                  alt="SHE Leads India Logo" 
                  className="h-16 md:h-20 object-contain"
                />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Why We Exist
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Content Grid - Problem on Left, Solution on Right */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Problem */}
              <motion.div 
                className="space-y-8 h-full"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Problem Image */}
                <div className="relative mb-8">
                  <img 
                    src="/media/IMG_0013.JPG" 
                    alt="Women entrepreneurs facing challenges" 
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      The Problem
                    </h3>
                  </div>
                </div>
                
                {/* Problem Points */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        <span className="text-red-600 font-bold">There's no shortage of women with ideas</span> - brilliant, innovative, world-changing ideas
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        <span className="text-red-600 font-bold">But most don't get the support, tools, or tribe</span> to turn those ideas into income
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        <span className="text-red-600 font-bold">They lack the ecosystem</span> needed to build sustainable businesses
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Side - Solution */}
              <motion.div 
                className="space-y-8 h-full"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Solution Image */}
                <div className="relative mb-8">
                  <img 
                    src="/media/DSC02153.JPG" 
                    alt="Women entrepreneurs succeeding together" 
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Our Solution
                    </h3>
                  </div>
                </div>
                
                {/* Solution Content */}
                <div className="space-y-6">
                  <div className="mb-6">
                    <p className="text-4xl font-bold mb-3">
                      <span className="text-gray-900">SHE</span> 
                      <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"> Leads India</span>
                    </p>
                    <p className="text-xl text-gray-700 font-medium">is here to change that.</p>
                  </div>
                  
                  {/* Solution Features */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-semibold text-lg">AI-powered tools & training</span>
                    </div>
                    <div className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-semibold text-lg">Digital marketing mastery</span>
                    </div>
                    <div className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-semibold text-lg">Community support network</span>
                    </div>
                    <div className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-semibold text-lg">All built for Indian businesswomen</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Mission Statement */}
            <motion.div 
              className="text-center mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-2xl md:text-3xl text-gray-900 font-semibold mb-4 italic">
                Because when <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-bold">she</span> learns, <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent font-bold">she</span> leads.
              </p>
              <p className="text-2xl md:text-3xl text-gray-900 font-semibold">
                And when she leads, we all rise.
              </p>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div 
              className="flex justify-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/about">
                  Learn More About Our Work
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Red Separator */}
      <div className="w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>

      {/* What We Do Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <img 
                  src="/she-leads-logo.png" 
                  alt="SHE Leads India Logo" 
                  className="h-16 md:h-20 object-contain"
                />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gray-900">What We </span>
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Do</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-8"></div>
              
              <p className="text-xl md:text-2xl font-semibold mb-6">
                <span className="text-gray-900">Practical. </span>
                <span className="text-red-600">Personal. </span>
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Powered by Purpose.</span>
              </p>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                At <span className="text-red-600 font-semibold">SHELeadsIndia</span>, we don't just teach theory — we give you the <span className="text-red-600 font-semibold">tools</span>, <span className="text-red-600 font-semibold">confidence</span>, and <span className="text-red-600 font-semibold">community</span> to take real action in your business.
              </p>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
                Here's how we help <span className="text-red-600 font-semibold">women entrepreneurs</span> grow — <span className="italic text-gray-700">one step, one story at a time.</span>
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 1. Hands-on Trainings */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hands-on Trainings</h3>
                </div>
                <div className="mb-6">
                  <img 
                    src="/media/IMG_0137.JPG" 
                    alt="Women learning digital skills" 
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">We break down digital marketing, AI tools, and content creation into simple, doable steps.</p>
                  <p className="text-lg">Our trainings are built for women who are juggling home, business, and everything in between.</p>
                  <p className="text-lg">Whether it's learning how to automate your WhatsApp, create content using AI, or build a lead magnet — you'll walk out with skills, not confusion.</p>
                </div>
              </motion.div>

              {/* 2. Weekly Challenges */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Weekly Challenges</h3>
                </div>
                <div className="mb-6">
                  <img 
                    src="/media/IMG_0011.JPG" 
                    alt="Women collaborating and networking" 
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">These aren't just tasks — they're momentum-builders.</p>
                  <p className="text-lg">Our 5-day and 7-day challenges help you stay consistent, push past tech fear, and actually <em>launch</em> that idea you've been sitting on.</p>
                  <p className="text-lg">Each challenge comes with guidance, checklists, and group energy that keeps you going.</p>
                </div>
              </motion.div>

              {/* 3. Offline + Online Events */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Offline + Online Events</h3>
                </div>
                <div className="mb-6">
                  <img 
                    src="/media/Mentoring.JPG" 
                    alt="Women mentoring and learning together" 
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">We believe in hugs and high-fives <em>as much as</em> hacks and how-tos.</p>
                  <p className="text-lg">Our in-person sessions in cities like Pune, Nashik, and Nagpur give women a chance to connect beyond the screen — while our virtual events make sure no one is left out.</p>
                  <p className="text-lg">From strategy workshops to panel discussions, we curate experiences that spark both learning and collaboration.</p>
                </div>
              </motion.div>

              {/* 4. Community & Collaboration */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Community & Collaboration</h3>
                </div>
                <div className="mb-6">
                  <img 
                    src="/media/market place.JPG" 
                    alt="Women entrepreneurs collaborating" 
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">This is not a Facebook group with ghost members.</p>
                  <p className="text-lg">This is a curated space where women business owners ask questions, share wins, hire each other, and build confidence together.</p>
                  <p className="text-lg">You're not just joining a platform. You're becoming part of a circle that genuinely wants you to win — and shows up to help you do it.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <ProgramsShowcase />

      {/* Community Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header with SHE Leads Logo */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <img 
                  src="/she-leads-logo.png" 
                  alt="SHE Leads India Logo" 
                  className="h-16 md:h-20 object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                You Don't Need to Figure It All Out Alone
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-8"></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
              {/* Left Side - Text Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-4">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Inside our community, you'll find women just like you — building, learning, failing, rising, and helping each other grow.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    This isn't just a chat group.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    It's where collaborations happen, tools are exchanged, wins are celebrated, and businesses grow — together.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Whether you're just starting out or scaling up, there's space for you here.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Benefits Content */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-left mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg">💡</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What You Get Inside:</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">Access to members-only WhatsApp groups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">Priority invites to events and trainings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">Peer support + accountability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">Early access to tools, resources, and deals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">Visibility through SHE Leads India platforms</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                    <a href="https://digitalstepup.kit.com/ceb549565c" target="_blank" rel="noopener noreferrer">
                      Become a Member
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild variant="outline" className="border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                    <a href="https://digitalstepup.kit.com/ceb549565c" target="_blank" rel="noopener noreferrer">
                      Join the Community
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* Social Proof Section */}
      <motion.section 
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Stories of Courage,
              <span className="block text-primary">Journeys of Triumph</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every success story here represents a brave woman who chose to believe in herself. 
              These are the voices of determination, the proof that your dreams are not just possible—they're inevitable.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div className="text-center" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/success-stories">
                  Read More Success Stories
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* Podcast Section */}
      <motion.section 
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                <Mic className="h-8 w-8" style={{ color: '#E60023' }} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Heartfelt Conversations – 
              <span className="block text-primary">Voices That Inspire</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Listen to the authentic stories of Indian women entrepreneurs who turned their dreams into reality. 
              Real journeys, genuine struggles, and beautiful victories that will touch your heart and fuel your courage.
            </p>
          </motion.div>

          {/* Video Carousel */}
          <motion.div 
            className="relative max-w-lg mx-auto mb-12"
            variants={fadeInUp}
          >
            {/* Animated Video Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-background"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div 
                  className="aspect-video relative bg-cover bg-center bg-no-repeat rounded-t-3xl overflow-hidden cursor-pointer"
                  style={{ 
                    backgroundImage: `url(${podcastEpisodes[currentSlide].thumbnail})` 
                  }}
                  onClick={handlePlayClick}
                >
                  {/* Show iframe only when playing */}
                  {isPlaying ? (
                    <iframe
                      src={`${podcastEpisodes[currentSlide].embedUrl}?autoplay=1`}
                      title={podcastEpisodes[currentSlide].title}
                      className="w-full h-full absolute inset-0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    /* Play button overlay */
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>
                
                {/* Video Info */}
                <motion.div 
                  className="p-4 bg-background"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {podcastEpisodes[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {podcastEpisodes[currentSlide].description}
                  </p>
                </motion.div>

                {/* Episode Counter */}
                <motion.div 
                  className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  {currentSlide + 1} / {podcastEpisodes.length}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-1">
              {podcastEpisodes.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-primary scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

          </motion.div>

          {/* CTA to Full Podcast Page */}
          <motion.div className="text-center" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/podcast">
                  <Mic className="h-5 w-5 mr-2" />
                  Explore All Episodes
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* SHELeads Platform Section */}
      <motion.section 
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              <div className="mb-6">
                <img 
                  src="/she-leads-logo.png" 
                  alt="SHELeads" 
                  className="h-16 md:h-20 w-auto"
                />
              </div>
              <p className="text-lg text-gray-700 mb-8">
                SHELeads has created a business solution specially designed for women entrepreneurs 
                and professionals with an offering that aims to help them set up their businesses 
                in the digital world.
              </p>
              
              <h3 className="text-2xl font-semibold mb-6">What makes it different?</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <span className="text-foreground">Created Exclusively for Women to grow in business</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <span className="text-foreground">Empowering Women To Take their Business to the next level and help them create great Success Stories</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                This solution and platform is a Win-Win situation for all women entrepreneurs that gives 
                women entrepreneurs an independent platform to manage and develop their online E-commerce 
                business under the guidance and training of expert professionals while also giving them 
                their own e-commerce web store to do business and direct interact with customers without 
                any third party involvement.
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">The platform provides access to:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>A Networking Platform with other entrepreneurs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>A Digital Market Place exclusively for women entrepreneurs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Website Development at a Nominal Charge</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - What We Do Grid */}
            <motion.div variants={fadeInUp}>
              <div className="grid grid-cols-2 gap-6">
                {/* 1. Hands-on Trainings */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/IMG_0137.JPG" 
                      alt="Women learning digital skills" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.75) contrast(1.15) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Hands-on Trainings</h3>
                  <p className="text-sm text-gray-800">We break down digital marketing, AI tools, and content creation into simple, doable steps.</p>
                </motion.div>

                {/* 2. Weekly Challenges */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/IMG_0011.JPG" 
                      alt="Women collaborating and networking" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.7) contrast(1.2) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Weekly Challenges</h3>
                  <p className="text-sm text-gray-800">These aren't just tasks — they're momentum-builders that help you stay consistent.</p>
                </motion.div>

                {/* 3. Offline + Online Events */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/Mentoring.JPG" 
                      alt="Women mentoring and learning together" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.75) contrast(1.15) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Offline + Online Events</h3>
                  <p className="text-sm text-gray-800">We believe in hugs and high-fives as much as hacks and how-tos.</p>
                </motion.div>

                {/* 4. Community & Collaboration */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/market place.JPG" 
                      alt="Women entrepreneurs collaborating" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.75) contrast(1.15) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Community & Collaboration</h3>
                  <p className="text-sm text-gray-800">This is a curated space where women business owners ask questions, share wins, and build confidence together.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* Media Coverage & Recognition */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Media Coverage & Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our work has been recognized by leading publications and organizations 
              across India.
            </p>
          </motion.div>

          {/* Media Carousel */}
          <motion.div 
            className="relative"
            variants={fadeInUp}
            onMouseEnter={() => setIsMediaAutoPlaying(false)}
            onMouseLeave={() => setIsMediaAutoPlaying(true)}
          >
            {/* Carousel Content */}
            <div className="overflow-visible py-8">
              <div className="flex transition-transform duration-500 ease-in-out">
                {/* Desktop View - 3 items */}
                <div className="hidden lg:flex w-full gap-8 items-center justify-center">
                  {getVisibleMediaItems().map((publication, index) => (
                    <motion.a 
                      key={`${mediaCurrentSlide}-${index}`}
                      href={publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 block group border border-gray-100 hover:border-primary/30"
                      style={index === 1 ? {
                        animation: 'popupSubtle 3s ease-in-out infinite'
                      } : {}}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full h-20 mb-4 flex items-center justify-center">
                          <img 
                            src={publication.logo} 
                            alt={publication.name}
                            className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className={`font-medium text-sm transition-colors duration-300 ${
                          index === 1 ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
                        }`}>
                          {publication.name}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile/Tablet View - 1 item */}
                <div className="lg:hidden flex justify-center w-full py-4">
                  {[mediaFeatures[mediaCurrentSlide]].map((publication, index) => (
                    <motion.a 
                      key={`mobile-${mediaCurrentSlide}-${index}`}
                      href={publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 block group border border-gray-100 hover:border-primary/30 max-w-md w-full"
                      style={{
                        animation: 'popupSubtle 3s ease-in-out infinite'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full h-20 mb-4 flex items-center justify-center">
                          <img 
                            src={publication.logo} 
                            alt={publication.name}
                            className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="font-medium text-sm text-primary transition-colors duration-300">
                          {publication.name}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevMediaSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={nextMediaSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {mediaFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMediaSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === mediaCurrentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* Event Gallery Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Photos of Our Events
              <span className="block text-primary">Creating Memories Together</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Glimpses from our inspiring workshops, networking events, and community gatherings
            </p>
          </motion.div>

          {/* Gallery Grid - 4 photos + Join Event CTA */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Photo 1 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/DSC02058.JPG"
                alt="SHELeadsIndia workshop participants learning digital marketing skills"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Photo 2 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/DSC02132.JPG"
                alt="Women entrepreneurs collaborating during SHELeadsIndia training session"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Photo 3 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/IMG_0013.JPG"
                alt="SHELeadsIndia founder addressing women entrepreneurs at workshop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Photo 4 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/DSC02233.JPG"
                alt="Women entrepreneurs celebrating success at SHELeadsIndia event"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Join Next Event CTA */}
            <motion.div 
              className="aspect-square bg-gradient-to-br from-primary to-primary/80 rounded-lg flex flex-col items-center justify-center text-white shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => window.location.href = '/events-gallery'}
            >
              <Calendar className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-center text-sm font-medium px-4 leading-tight">
                Join Our
                <br />
                <span className="font-bold">Next Event</span>
              </p>
              <ArrowRight className="h-4 w-4 mt-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </motion.div>

          {/* Watch All Photos Button */}
          <motion.div className="text-center" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/events-gallery">
                  <Camera className="h-5 w-5 mr-2" />
                  Watch All Photos
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lead Magnets Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Sacred Tools to Begin
              <span className="block text-primary">Your Beautiful Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Embrace these carefully crafted resources designed to honor your dreams 
              and guide your first steps toward entrepreneurial success.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {leadMagnets.map((magnet, index) => {
              const IconComponent = magnet.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-background rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col h-full group"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    y: -4
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{magnet.title}</h3>
                    <p className="text-gray-600 mb-8 flex-1">{magnet.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="mt-auto"
                    >
                      <Button variant="outline" className="group w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Free
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>


        </div>
      </motion.section>

      {/* Internal Links Section for SEO */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore More Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive resources to support your entrepreneurial journey
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <motion.div variants={fadeInUp}>
              <Link 
                to="/programs" 
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  Digital Marketing Programs
                </h3>
                <p className="text-sm text-gray-600">Master digital marketing strategies</p>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link 
                to="/upcoming-training" 
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  AI Training Workshops
                </h3>
                <p className="text-sm text-gray-600">Learn AI tools for business growth</p>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link 
                to="/success-stories" 
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  Women Success Stories
                </h3>
                <p className="text-sm text-gray-600">Be inspired by real entrepreneurs</p>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link 
                to="/resources" 
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  Business Resources
                </h3>
                <p className="text-sm text-gray-600">Free tools and guides</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
