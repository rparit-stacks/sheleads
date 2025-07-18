import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle, Calendar, Mail } from "lucide-react";

const Terms = () => {
  const lastUpdated = "January 15, 2025";

  const termsSections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using SHELeads India's website and services, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time, with changes effective immediately upon posting",
        "Your continued use of our services after changes constitutes acceptance of the new terms"
      ]
    },
    {
      title: "Use of Services",
      icon: Users,
      content: [
        "Our services are intended for women entrepreneurs and business professionals",
        "You must be at least 18 years old to use our services",
        "You agree to provide accurate and complete information when registering",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You agree not to use our services for any unlawful or unauthorized purpose"
      ]
    },
    {
      title: "Event and Training Registration",
      icon: Calendar,
      content: [
        "Registration for events and training programs is subject to availability",
        "Payment is required at the time of registration unless otherwise specified",
        "Cancellation policies vary by event and will be clearly stated",
        "We reserve the right to cancel or reschedule events due to unforeseen circumstances",
        "Refunds will be processed according to our refund policy"
      ]
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        "All content on our website is owned by SHELeads India or our licensors",
        "You may not reproduce, distribute, or create derivative works without permission",
        "Training materials and resources are for personal use only",
        "Sharing of proprietary content with non-registered users is prohibited",
        "We respect intellectual property rights and expect users to do the same"
      ]
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "SHELeads India provides services 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount paid for our services",
        "We are not responsible for third-party content or services",
        "Force majeure events may affect service delivery"
      ]
    },
    {
      title: "Privacy and Data Protection",
      icon: Shield,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy",
        "We collect and process personal data in accordance with applicable laws",
        "You consent to our collection and use of your information as described",
        "We implement appropriate security measures to protect your data",
        "You have rights regarding your personal information as outlined in our Privacy Policy"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: AlertTriangle,
      content: [
        "Using our services for any illegal or unauthorized purpose",
        "Attempting to gain unauthorized access to our systems",
        "Interfering with or disrupting our services",
        "Harassing, abusing, or harming other users",
        "Sharing false or misleading information",
        "Violating any applicable laws or regulations"
      ]
    },
    {
      title: "Termination",
      icon: Scale,
      content: [
        "We may terminate or suspend your access to our services at any time",
        "Termination may occur for violation of these terms or for any other reason",
        "Upon termination, your right to use our services ceases immediately",
        "Provisions that should survive termination will remain in effect",
        "You may terminate your account by contacting us"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="py-16 md:py-24 text-white relative bg-cover bg-center bg-no-repeat min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/market-place.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          margin: 0,
          padding: 0
        }}
      >
        {/* Light overlay for mobile, darker for desktop */}
        <div className="absolute inset-0 bg-black bg-opacity-10 md:bg-opacity-25"></div>
        
        <div className="w-full px-4 relative z-10 flex items-center min-h-[50vh] md:min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6 drop-shadow-2xl text-shadow-strong">
              Terms of Service
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-95 font-light leading-relaxed drop-shadow-xl text-shadow-medium max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
                Agreement to Terms
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                These Terms of Service ("Terms") govern your use of SHELeads India's website, services, and programs. 
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part 
                of these terms, you may not access our services.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use our services. By using our services, 
                you represent that you are at least 18 years old and have the legal capacity to enter into these Terms.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-8">
              {termsSections.map((section, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl text-foreground">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Governing Law */}
            <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground">
                  Governing Law and Dispute Resolution
                </CardTitle>
                <CardDescription className="text-lg">
                  These Terms are governed by and construed in accordance with the laws of India.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Jurisdiction</h4>
                    <p className="text-muted-foreground">
                      Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Dispute Resolution</h4>
                    <p className="text-muted-foreground">
                      We encourage resolution of disputes through good faith negotiation before pursuing legal action.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mt-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-lg">
                  If you have any questions about these Terms of Service, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">legal@sheleadsindia.com</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Address</h4>
                    <p className="text-muted-foreground">
                      SHELeads India<br />
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates Notice */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Changes to Terms
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to 
                provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will 
                be determined at our sole discretion. By continuing to access or use our services after any revisions become 
                effective, you agree to be bound by the revised terms.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms; 