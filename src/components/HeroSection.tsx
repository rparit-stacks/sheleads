import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-women-entrepreneurs.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Empowering Women Entrepreneurs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl text-background">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-background px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Pune • Nagpur • Nashik</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Transform Your
            <span className="block text-primary">Business Dreams</span>
            Into Digital Success
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-background/90">
            Join India's most empowering community of women entrepreneurs mastering 
            digital marketing and AI to scale their businesses beyond boundaries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group">
              Start Your Journey
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="white" size="xl">
              Watch Success Stories
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-background/20">
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-background/80">Women Empowered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-background/80">Cities & Growing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-background/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;