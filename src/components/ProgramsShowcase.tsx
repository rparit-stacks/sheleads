import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, Rocket, ArrowRight } from "lucide-react";

const ProgramsShowcase = () => {
  const programs = [
    {
      icon: Zap,
      title: "The Spark Plan",
      description: "For women just getting started, your first spark of success. Weekly live training on digital marketing with access to our supportive WhatsApp community.",
      features: ["Weekly live training on digital marketing", "Access to our supportive WhatsApp community", "Learn. Connect. Begin.", "Perfect for solopreneurs and early-stage founders"],
      cta: "Begin Your Journey",
      highlight: "Getting Started"
    },
    {
      icon: TrendingUp,
      title: "The Rise Plan",
      description: "You're done surviving. Now it's time to rise. Exclusive monthly meetings focused on implementation with unlimited access to all training session recordings.",
      features: ["Everything in The Spark Plan", "Exclusive monthly implementation meetings", "Your business featured on our podcast", "Unlimited access to training recordings"],
      cta: "Embrace Growth",
      highlight: "Most Popular"
    },
    {
      icon: Rocket,
      title: "The Thrive Plan",
      description: "Your business is growing—and so is your leadership. One 1:1 strategy call/month with our senior mentor and exclusive discounts on digital tools.",
      features: ["Everything in The Rise Plan", "One 1:1 strategy call/month", "Exclusive discounts on digital tools", "Priority access to resources and templates"],
      cta: "Scale Your Business",
      highlight: "Growing Business"
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Programs Designed for
            <span className="block text-primary">The Indian Woman's Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every program honors who you are while nurturing who you're becoming. 
            Choose the path that resonates with your heart and aligns with your dreams.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                {program.highlight && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {program.highlight}
                  </div>
                )}
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={program.highlight === "Most Popular" ? "hero" : "outline"} 
                    className="w-full group"
                  >
                    {program.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Image Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Why Digital Wisdom Is Your
              <span className="block text-primary">Sacred Advantage</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              In our rapidly evolving world, digital fluency isn't just practical—it's empowering. 
              Our programs blend ancient wisdom with modern tools, giving you the confidence to lead 
              authentically in the digital space while staying true to your roots.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <span>Honor your budget while maximizing impact with smart automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <span>Reach hearts across India without compromising your authenticity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <span>Build sustainable systems that respect your life's priorities</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/media/_PAS5285.JPG"
              alt="Digital Wisdom Training"
              className="rounded-lg shadow-card"
            />
            <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(to top, rgba(230, 0, 35, 0.2), transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsShowcase;