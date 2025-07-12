import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User, TrendingUp, Brain, Users, Target, BookOpen, Star, CheckCircle, Zap, Lightbulb } from "lucide-react";
import { fetchBlogPosts, BlogPost } from "@/lib/blogService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blog posts.");
        setLoading(false);
      });
  }, []);

  const categoryIcons = {
    "Digital Marketing": TrendingUp,
    "AI & Technology": Brain,
    "Business Growth": Target,
    "Success Stories": Users,
  };

  const handlePostClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  // Get categories with counts
  const categories = Array.from(
    posts.reduce((acc, post) => {
      acc.set(post.category, (acc.get(post.category) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }));

  // Featured and recent posts
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 6);

  const whyReadReasons = [
    {
      icon: Lightbulb,
      title: "Expert Insights",
      description: "Get proven strategies and actionable tips from successful women entrepreneurs and industry experts."
    },
    {
      icon: TrendingUp,
      title: "Growth Strategies",
      description: "Discover practical techniques to scale your business and increase your market presence effectively."
    },
    {
      icon: Brain,
      title: "Digital Expertise",
      description: "Stay ahead with the latest digital marketing trends, AI tools, and technology solutions for business."
    },
    {
      icon: Users,
      title: "Success Stories",
      description: "Learn from real entrepreneurs who've built successful businesses and overcome common challenges."
    },
    {
      icon: Target,
      title: "Focused Content",
      description: "Content specifically designed for women entrepreneurs facing unique challenges in business growth."
    },
    {
      icon: Zap,
      title: "Quick Wins",
      description: "Implementable tips and strategies you can apply immediately to see results in your business."
    }
  ];

  const successMetrics = [
    { number: "500+", label: "Articles Published" },
    { number: "50K+", label: "Monthly Readers" },
    { number: "95%", label: "Reader Satisfaction" },
    { number: "4.9/5", label: "Content Rating" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section 
        className="py-12 md:py-16 lg:py-20 text-white relative bg-cover bg-center bg-no-repeat min-h-[40vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/IMG_0137.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="w-full px-4 relative z-10 flex items-center min-h-[35vh]">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight drop-shadow-xl" style={{
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              Business Growth
              <span className="block">Insights & Strategies</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl mb-6 opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
              }}>
                Practical advice, proven strategies, and inspiring stories to help you 
                build and scale your business in the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {successMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary mb-2">{metric.number}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find content that matches your specific business needs and interests.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || TrendingUp;
              const colors = [
                'bg-blue-50 border-blue-200 text-blue-700',
                'bg-purple-50 border-purple-200 text-purple-700',
                'bg-green-50 border-green-200 text-green-700',
                'bg-orange-50 border-orange-200 text-orange-700'
              ];
              const iconColors = [
                'text-blue-600 bg-blue-100',
                'text-purple-600 bg-purple-100',
                'text-green-600 bg-green-100',
                'text-orange-600 bg-orange-100'
              ];
              return (
                <div key={index} className={`p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${colors[index % colors.length]}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${iconColors[index % iconColors.length]}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2 text-center">{category.name}</h3>
                  <p className="text-sm text-center opacity-75">{category.count} articles</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Read Our Blog */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Read Our Blog?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover why thousands of women entrepreneurs trust our content to grow their businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyReadReasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <Card key={index} className="group p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">{reason.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our most popular and impactful content to accelerate your business growth.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <p className="text-lg text-gray-600">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: '#E60023' }}>{error}</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => {
                const cardVariants = [
                  'bg-gradient-to-br from-blue-50 to-indigo-100 border-l-4 border-blue-500',
                  'bg-gradient-to-br from-purple-50 to-pink-100 border-l-4 border-purple-500',
                  'bg-gradient-to-br from-green-50 to-emerald-100 border-l-4 border-green-500'
                ];
                
                const iconColors = [
                  'text-blue-600 bg-blue-100',
                  'text-purple-600 bg-purple-100',
                  'text-green-600 bg-green-100'
                ];
                
                const cardVariant = cardVariants[index % cardVariants.length];
                const iconColor = iconColors[index % iconColors.length];
                
                return (
                  <div key={post.id} className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer ${cardVariant}`} onClick={() => handlePostClick(post.id)}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge className="mb-4 bg-white/70 text-gray-700 border border-white/30">
                            {post.category}
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-4">
                            {post.title}
                          </h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center ml-4 group-hover:scale-110 transition-transform duration-300`}>
                          <BookOpen className="h-6 w-6" />
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6 text-base leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      {/* Info Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <User className="h-4 w-4" />
                            <span className="font-medium truncate">{post.author}</span>
                          </div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{post.read_time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 h-12 text-base font-semibold rounded-2xl bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          Read Article
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with our latest business tips, strategies, and success stories.
            </p>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center" style={{ color: '#E60023' }}>{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => {
                const cardVariants = [
                  'bg-gradient-to-br from-blue-50 to-indigo-100 border-l-4 border-blue-500',
                  'bg-gradient-to-br from-purple-50 to-pink-100 border-l-4 border-purple-500',
                  'bg-gradient-to-br from-green-50 to-emerald-100 border-l-4 border-green-500',
                  'bg-gradient-to-br from-orange-50 to-red-100 border-l-4 border-orange-500',
                  'bg-gradient-to-br from-teal-50 to-cyan-100 border-l-4 border-teal-500',
                  'bg-gradient-to-br from-rose-50 to-pink-100 border-l-4 border-rose-500'
                ];
                
                const iconColors = [
                  'text-blue-600 bg-blue-100',
                  'text-purple-600 bg-purple-100',
                  'text-green-600 bg-green-100',
                  'text-orange-600 bg-orange-100',
                  'text-teal-600 bg-teal-100',
                  'text-rose-600 bg-rose-100'
                ];
                
                const cardVariant = cardVariants[index % cardVariants.length];
                const iconColor = iconColors[index % iconColors.length];
                
                return (
                  <div key={post.id} className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer ${cardVariant}`} onClick={() => handlePostClick(post.id)}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge className="mb-3 bg-white/70 text-gray-700 border border-white/30 text-xs">
                            {post.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 mb-3">
                            {post.title}
                          </h3>
                        </div>
                        <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center ml-3 group-hover:scale-110 transition-transform duration-300`}>
                          <BookOpen className="h-5 w-5" />
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Info Cards */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                          <div className="flex items-center gap-1 text-xs text-gray-700">
                            <User className="h-3 w-3" />
                            <span className="font-medium truncate">{post.author}</span>
                          </div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                          <div className="flex items-center gap-1 text-xs text-gray-700">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium">{post.read_time}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full h-10 text-sm font-semibold rounded-xl bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-16">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#E60023' }}>
              View All Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl border border-primary/10">
            <div className="flex justify-center mb-8">
              <div className="p-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 shadow-lg">
                <Star className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Never Miss an Insight
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get our latest articles, exclusive tips, and business strategies 
              delivered directly to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-4 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
              <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-xl" style={{ backgroundColor: '#E60023' }}>
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-8">
              Join 2,000+ entrepreneurs. No spam, unsubscribe anytime.
            </p>
            
            {/* Additional trust indicators */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Expert Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Practical Tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Success Stories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;