import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Users, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const quickLinks = [
    {
      title: "Start Here",
      description: "Begin your journey with SHELeadsIndia",
      icon: Home,
      href: "/start-here"
    },
    {
      title: "Our Programs",
      description: "Discover digital marketing & AI training",
      icon: BookOpen,
      href: "/programs"
    },
    {
      title: "Success Stories",
      description: "Be inspired by women entrepreneurs",
      icon: Users,
      href: "/success-stories"
    },
    {
      title: "Upcoming Events",
      description: "Join our workshops and training",
      icon: Calendar,
      href: "/upcoming-training"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/she-leads-logo.png" 
            alt="SHE Leads India" 
            className="h-20 w-auto object-contain"
          />
        </motion.div>

        {/* Main 404 Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. But don't worry! 
            We have plenty of amazing content to help you on your entrepreneurial journey.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link to="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/start-here">
              <Search className="h-5 w-5 mr-2" />
              Start Your Journey
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Popular Pages You Might Like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link 
                  to={link.href}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-red-200"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <link.icon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {link.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:hello@sheleadsindia.in" 
              className="text-red-600 hover:text-red-700 font-medium"
            >
              hello@sheleadsindia.in
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a 
              href="tel:+919876543210" 
              className="text-red-600 hover:text-red-700 font-medium"
            >
              +91 98765 43210
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
