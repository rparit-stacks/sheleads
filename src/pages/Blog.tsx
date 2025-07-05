import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User, TrendingUp, Brain, Users, Target } from "lucide-react";

const Blog = () => {
  const categories = [
    { name: "Digital Marketing", count: 25, icon: TrendingUp },
    { name: "AI & Technology", count: 18, icon: Brain },
    { name: "Business Growth", count: 32, icon: Target },
    { name: "Success Stories", count: 15, icon: Users },
  ];

  const featuredPosts = [
    {
      title: "10 AI Tools Every Woman Entrepreneur Must Know in 2024",
      excerpt: "Discover the game-changing AI tools that can automate your marketing, streamline operations, and accelerate business growth.",
      category: "AI & Technology",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      author: "SHELeads Team",
      featured: true,
      image: "/api/placeholder/600/400"
    },
    {
      title: "From Zero to Six Figures: A Complete Digital Marketing Roadmap",
      excerpt: "The exact step-by-step strategy our most successful members use to scale their businesses using digital marketing.",
      category: "Digital Marketing",
      readTime: "12 min read",
      date: "Dec 10, 2024",
      author: "Priya Sharma",
      featured: true,
      image: "/api/placeholder/600/400"
    },
    {
      title: "Building Your Personal Brand as a Woman Entrepreneur",
      excerpt: "Why personal branding is crucial for business success and how to build an authentic brand that attracts your ideal customers.",
      category: "Business Growth",
      readTime: "6 min read",
      date: "Dec 5, 2024",
      author: "Anita Desai",
      featured: true,
      image: "/api/placeholder/600/400"
    }
  ];

  const recentPosts = [
    {
      title: "5 Mistakes That Kill Your Social Media Engagement",
      excerpt: "Avoid these common pitfalls that prevent your content from reaching and converting your ideal audience.",
      category: "Digital Marketing",
      readTime: "5 min read",
      date: "Dec 1, 2024",
      author: "Marketing Team"
    },
    {
      title: "How to Price Your Services as a Female Entrepreneur",
      excerpt: "Stop undervaluing yourself. Learn the psychology of pricing and how to charge what you're truly worth.",
      category: "Business Growth",
      readTime: "7 min read",
      date: "Nov 28, 2024",
      author: "Business Mentor"
    },
    {
      title: "Creating Systems That Scale: Automation for Busy Entrepreneurs",
      excerpt: "Build business systems that work without you, giving you freedom while growing your revenue.",
      category: "AI & Technology",
      readTime: "9 min read",
      date: "Nov 25, 2024",
      author: "Tech Specialist"
    },
    {
      title: "Networking Like a Pro: Building Meaningful Business Relationships",
      excerpt: "Transform networking from awkward small talk into genuine relationship building that grows your business.",
      category: "Business Growth",
      readTime: "6 min read",
      date: "Nov 22, 2024",
      author: "Community Manager"
    },
    {
      title: "Email Marketing That Actually Converts: Templates and Strategies",
      excerpt: "Turn your email list into a revenue-generating machine with proven templates and conversion strategies.",
      category: "Digital Marketing",
      readTime: "10 min read",
      date: "Nov 18, 2024",
      author: "Email Expert"
    },
    {
      title: "From Idea to Launch: The 30-Day Business Validation Framework",
      excerpt: "Validate your business idea and get your first customers in just 30 days with this proven framework.",
      category: "Business Growth",
      readTime: "8 min read",
      date: "Nov 15, 2024",
      author: "Startup Advisor"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Business Growth
              <span className="block">Insights & Strategies</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Practical advice, proven strategies, and inspiring stories to help you 
              build and scale your business in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-2xl shadow-elegant p-8">
            <div className="grid md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={index} className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Featured Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular and impactful content to accelerate your business growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:scale-105 group cursor-pointer">
                <div className="aspect-video bg-gradient-section flex items-center justify-center">
                  <div className="text-primary/30">
                    <Brain className="h-16 w-16" />
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full group/btn">
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest business tips, strategies, and success stories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="group/btn">
                    Read More
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group">
              View All Articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Never Miss an Insight
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get our latest articles, exclusive tips, and business strategies 
              delivered directly to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Join 2,000+ entrepreneurs. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;