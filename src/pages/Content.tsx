import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, Users, Calendar, Shield, Heart, Target, Award, CheckCircle, AlertTriangle } from "lucide-react";

const Content = () => {
  const lastUpdated = "January 15, 2025";

  const contentSections = [
    {
      title: "Content Guidelines",
      icon: FileText,
      content: [
        "All content must be original or properly attributed to the original source",
        "Content should be relevant to women entrepreneurship and business growth",
        "We encourage diverse perspectives and inclusive language",
        "Content should be accurate, well-researched, and up-to-date",
        "We maintain high standards for grammar, spelling, and clarity"
      ]
    },
    {
      title: "User-Generated Content",
      icon: Users,
      content: [
        "We welcome contributions from our community members",
        "All submissions are reviewed for quality and relevance",
        "Contributors retain ownership of their original content",
        "We may edit submissions for clarity and consistency",
        "By submitting content, you grant us license to publish and distribute it"
      ]
    },
    {
      title: "Copyright and Attribution",
      icon: Shield,
      content: [
        "We respect intellectual property rights and expect the same from our users",
        "Proper attribution must be given for all quoted or referenced material",
        "Images and media must be used with appropriate permissions",
        "We do not tolerate plagiarism or copyright infringement",
        "If you believe your work has been used without permission, please contact us"
      ]
    },
    {
      title: "Content Categories",
      icon: BookOpen,
      content: [
        "Success Stories: Real experiences from women entrepreneurs",
        "Business Tips: Practical advice for growing your business",
        "Industry Insights: Analysis of market trends and opportunities",
        "Training Resources: Educational content and learning materials",
        "Community Spotlights: Features on our network members"
      ]
    },
    {
      title: "Content Moderation",
      icon: CheckCircle,
      content: [
        "We reserve the right to moderate all content on our platform",
        "Content that violates our guidelines may be removed",
        "We do not publish content that is discriminatory or harmful",
        "Commercial content must be clearly marked as promotional",
        "We maintain editorial independence in our content decisions"
      ]
    },
    {
      title: "Content Quality Standards",
      icon: Award,
      content: [
        "All content must be factually accurate and well-researched",
        "We prioritize actionable, practical advice over generic information",
        "Content should be accessible to our diverse audience",
        "We encourage evidence-based approaches and real-world examples",
        "Regular updates ensure content remains current and relevant"
      ]
    }
  ];

  const prohibitedContent = [
    "Content that promotes discrimination or harassment",
    "False or misleading information",
    "Spam, advertising, or promotional content without permission",
    "Content that violates intellectual property rights",
    "Personal attacks or defamatory statements",
    "Content that could harm our community or reputation"
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
              Content Policy
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-95 font-light leading-relaxed drop-shadow-xl text-shadow-medium max-w-3xl mx-auto">
              Our commitment to quality, authentic content that empowers women entrepreneurs.
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
                Our Content Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At SHELeads India, we believe in the power of authentic, valuable content that truly serves our community. 
                Our content policy reflects our commitment to quality, inclusivity, and the empowerment of women entrepreneurs 
                across India.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We curate and create content that is practical, actionable, and rooted in real experiences. Our platform 
                serves as a trusted resource for women looking to grow their businesses and build meaningful connections.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {contentSections.map((section, index) => (
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

            {/* Prohibited Content */}
            <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-foreground">
                    Prohibited Content
                  </CardTitle>
                </div>
                <CardDescription className="text-lg">
                  The following types of content are not allowed on our platform:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prohibitedContent.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Content Submission */}
            <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground">
                  Submit Your Content
                </CardTitle>
                <CardDescription className="text-lg">
                  We welcome contributions from our community. Here's how to submit your content:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Submission Process</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Review our content guidelines</li>
                      <li>• Prepare your content in the required format</li>
                      <li>• Submit via email with proper attribution</li>
                      <li>• Allow 2-3 weeks for review and response</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
                    <p className="text-muted-foreground">
                      Email: content@sheleadsindia.com<br />
                      Subject: Content Submission<br />
                      Include: Your name, bio, and content details
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Our Values */}
            <Card className="mt-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground">
                  Our Content Values
                </CardTitle>
                <CardDescription className="text-lg">
                  These principles guide everything we publish and share.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Authenticity</h4>
                    <p className="text-sm text-muted-foreground">
                      Real stories, real experiences, real impact
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Actionability</h4>
                    <p className="text-sm text-muted-foreground">
                      Practical advice you can implement today
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Inclusivity</h4>
                    <p className="text-sm text-muted-foreground">
                      Diverse voices and perspectives welcome
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates Notice */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Policy Updates
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This content policy may be updated periodically to reflect our evolving standards and community needs. 
                We will notify users of significant changes through our newsletter and website announcements. 
                Continued use of our platform after policy updates constitutes acceptance of the new guidelines.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Content; 