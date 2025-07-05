import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Start Here", href: "/start-here" },
    { name: "Programs", href: "/programs" },
    { name: "Resources", href: "/resources" },
    { name: "Success Stories", href: "/success-stories" },
  ];

  const cities = [
    { name: "Pune", href: "/pune" },
    { name: "Nagpur", href: "/nagpur" },
    { name: "Nashik", href: "/nashik" },
  ];

  const resources = [
    { name: "Growth Planner", href: "/resources/growth-planner" },
    { name: "Brand Quiz", href: "/resources/brand-quiz" },
    { name: "Launch Checklist", href: "/resources/launch-checklist" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join 500+ Women Entrepreneurs
            </h3>
            <p className="text-background/80 mb-8">
              Get weekly strategies, success stories, and exclusive resources 
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-hero text-primary-foreground font-bold text-xl px-2 py-1 rounded">
                SHE
              </div>
              <span className="font-bold text-lg text-background">LeadsIndia</span>
            </Link>
            <p className="text-background/80 mb-6">
              Empowering women entrepreneurs across India with digital marketing 
              mastery and AI-powered business strategies.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Cities</h4>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.name}>
                  <Link
                    to={city.href}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    to={resource.href}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-6 text-sm text-background/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Pune, Nagpur, Nashik</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@shelleadsindia.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <p className="text-sm text-background/60">
              © 2024 SHELeadsIndia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;