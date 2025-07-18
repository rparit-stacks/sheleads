import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, Users, FileText, Calendar } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "January 15, 2025";

  const privacySections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal information (name, email, phone number) when you register for events or training programs",
        "Payment information when you make purchases (processed securely through our payment partners)",
        "Usage data and analytics to improve our services",
        "Communication preferences and feedback you provide"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "To provide and improve our services and programs",
        "To communicate with you about events, training, and updates",
        "To process payments and manage registrations",
        "To send newsletters and promotional content (with your consent)",
        "To analyze usage patterns and improve user experience"
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share information with trusted service providers who assist in operating our website",
        "We may disclose information if required by law or to protect our rights",
        "Aggregated, anonymized data may be used for research and analytics"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement industry-standard security measures to protect your data",
        "All sensitive information is encrypted during transmission",
        "We regularly review and update our security practices",
        "Access to personal data is limited to authorized personnel only"
      ]
    },
    {
      title: "Your Rights",
      icon: Eye,
      content: [
        "Access and review your personal information",
        "Request corrections to inaccurate data",
        "Request deletion of your personal information",
        "Opt-out of marketing communications",
        "Withdraw consent for data processing"
      ]
    },
    {
      title: "Cookies and Tracking",
      icon: FileText,
      content: [
        "We use cookies to enhance your browsing experience",
        "Analytics cookies help us understand website usage",
        "You can control cookie settings through your browser",
        "Third-party services may use cookies for functionality"
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
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-95 font-light leading-relaxed drop-shadow-xl text-shadow-medium max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                Our Commitment to Privacy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At SHELeads India, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                register for events, or participate in our programs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this policy. 
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              {privacySections.map((section, index) => (
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

            {/* Contact Information */}
            <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground">
                  Contact Us
                </CardTitle>
                <CardDescription className="text-lg">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Email</h4>
                    <p className="text-muted-foreground">privacy@sheleadsindia.com</p>
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
                Updates to This Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy 
                Policy periodically for any changes.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy; 