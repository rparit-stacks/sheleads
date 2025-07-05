import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProgramsShowcase from "@/components/ProgramsShowcase";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Award, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

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
  const testimonials = [
    {
      quote: "SHELeadsIndia transformed my small business into a six-figure enterprise in just 8 months. The AI marketing tools alone saved me 20 hours per week!",
      author: "Priya Sharma",
      title: "Founder, Eco-Friendly Home Products",
      city: "Pune"
    },
    {
      quote: "The community support is incredible. I found my business partner through a SHE networking event, and we've since launched two successful ventures together.",
      author: "Anita Desai",
      title: "Co-founder, Tech Solutions",
      city: "Nagpur"
    },
    {
      quote: "From zero digital presence to 50k Instagram followers in 6 months. The strategies taught here actually work in the real world.",
      author: "Meera Patel",
      title: "Fashion Brand Owner",
      city: "Nashik"
    }
  ];

  const leadMagnets = [
    {
      title: "5-Day Business Growth Planner",
      description: "Daily action plans to accelerate your business growth with proven strategies.",
      icon: TrendingUp
    },
    {
      title: "Brand Confidence Quiz",
      description: "Discover your brand personality and get personalized recommendations.",
      icon: Award
    },
    {
      title: "Pre-Launch Success Checklist",
      description: "Everything you need to launch your business or product successfully.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Programs Section */}
      <ProgramsShowcase />

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
              Real Women,
              <span className="block text-primary">Real Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See how women entrepreneurs 
              across Maharashtra are transforming their businesses.
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
              <Button variant="hero" size="xl" className="group">
                Read More Success Stories
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lead Magnets Section */}
      <motion.section 
        className="py-20 bg-gradient-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Journey
              <span className="block text-primary">With Free Resources</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to our most valuable business-building tools 
              and start seeing results today.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
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
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{magnet.title}</h3>
                  <p className="text-muted-foreground mb-6">{magnet.description}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="outline" className="group">
                      <Download className="h-4 w-4 mr-2" />
                      Download Free
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Final CTA */}
          <motion.div 
            className="text-center bg-background rounded-2xl p-12 shadow-card" 
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of women entrepreneurs who've already taken control of their 
              digital destiny. Your success story starts with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="hero" size="xl" className="group">
                  Start Your Journey Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="outline" size="xl">
                  Book Free Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
