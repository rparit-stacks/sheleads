import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Lightbulb, Star, Building2, Heart, Target, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JourneyModal: React.FC<JourneyModalProps> = ({ isOpen, onClose }) => {
  const journeyOptions = [
    {
      title: "I'm a Woman Entrepreneur",
      subtitle: "I run a business and want to grow digitally.",
      description: "You'll find programs, AI trainings, and a powerful community.",
      icon: Target,
      image: "/media/Mentoring.JPG",
      buttonText: "Explore Programs",
      buttonLink: "/programs",
      features: ["Digital Marketing Programs", "AI Training Workshops", "Business Community", "Mentorship"]
    },
    {
      title: "I'm Just Exploring",
      subtitle: "I want to understand what SHE Leads India is and how it helps.",
      description: "Learn our story, see the impact, and feel the vibe.",
      icon: Lightbulb,
      image: "/media/DSC02058.JPG",
      buttonText: "Watch Our Intro",
      buttonLink: "/success-stories",
      features: ["Success Stories", "Our Mission", "Impact Stories", "Community Vibe"]
    },
    {
      title: "I'm a Trainer or Expert",
      subtitle: "I want to contribute or collaborate.",
      description: "Let's co-create value through workshops, sessions, and mentoring.",
      icon: Star,
      image: "/media/DSC02132.JPG",
      buttonText: "Partner With Us",
      buttonLink: "/about",
      features: ["Workshop Opportunities", "Mentoring Programs", "Expert Sessions", "Collaboration"]
    },
    {
      title: "I Represent a Brand or Organisation",
      subtitle: "We want to collaborate or support women-led growth.",
      description: "Discover our partnership opportunities and upcoming events.",
      icon: Building2,
      image: "/media/market-place.JPG",
      buttonText: "Connect With Us",
      buttonLink: "/events",
      features: ["Partnership Programs", "Event Sponsorship", "Corporate Training", "CSR Initiatives"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>

            {/* Hero Section */}
            <motion.section 
              className="py-8 sm:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
              </div>

              <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-6"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, -1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    CLARITY AWAITS
                    <Sparkles className="h-4 w-4" />
                  </motion.div>

                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
                    You're not lost.
                    <span className="block text-lg sm:text-xl md:text-2xl mt-2 opacity-90">
                      You're just one step away from clarity.
                    </span>
                  </h1>
                  
                  <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
                    Let's help you choose the right path.
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Journey Options */}
            <motion.section 
              className="py-8 sm:py-16 px-4 sm:px-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {journeyOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -4,
                        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                                           <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full overflow-hidden group">
                       {/* Image Header */}
                       <div className="relative h-24 sm:h-32 overflow-hidden">
                         <img 
                           src={option.image} 
                           alt={option.title}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                           <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                             <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                           </div>
                         </div>
                       </div>

                       {/* Content */}
                       <div className="p-4 sm:p-6">
                         <div className="mb-3 sm:mb-4">
                           <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                             {option.title}
                           </h3>
                           <p className="text-xs text-gray-600 italic">
                             "{option.subtitle}"
                           </p>
                         </div>

                         {/* Description */}
                         <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                           {option.description}
                         </p>

                         {/* Features */}
                         <div className="mb-4 sm:mb-6">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                             {option.features.map((feature, featureIndex) => (
                               <div key={featureIndex} className="flex items-center gap-1 text-xs text-gray-600">
                                 <Heart className="h-2 w-2 text-red-500" />
                                 <span>{feature}</span>
                               </div>
                             ))}
                           </div>
                         </div>

                         {/* CTA Button */}
                         <motion.div
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="mt-auto"
                         >
                                                    <Button 
                           asChild 
                           size="sm" 
                           className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg text-xs sm:text-sm transition-all duration-300"
                           onClick={onClose}
                         >
                             <Link to={option.buttonLink}>
                               <ArrowRight className="h-4 w-4 mr-2" />
                               {option.buttonText}
                             </Link>
                           </Button>
                         </motion.div>
                       </div>
                     </div>
                    </motion.div>
                  );
                })}
              </div>

                             {/* Bottom CTA */}
               <motion.div 
                 className="text-center mt-8 sm:mt-12"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.8 }}
               >
                 <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                     Still unsure about your path?
                   </h3>
                   <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm">
                     Let's have a conversation. We're here to guide you to the right starting point.
                   </p>
                   <Button 
                     asChild 
                     variant="outline" 
                     size="sm" 
                     className="border-2 border-red-600 text-red-600 bg-white hover:bg-red-50 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm"
                     onClick={onClose}
                   >
                    <Link to="/about">
                      <Users className="h-4 w-4 mr-2" />
                      Let's Talk
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JourneyModal; 