import { useEffect, useState } from "react";
import { fetchTrainings, Training } from "@/lib/trainingService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, BookOpen, Award, Target, Brain, Zap, TrendingUp, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function UpcomingTraining() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        // Only show published trainings to public
        const publishedTrainings = data.filter(training => training.status === 'published');
        setTrainings(publishedTrainings);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load training sessions");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const whyAttendReasons = [
    {
      icon: Target,
      title: "Expert-Led Training",
      description: "Learn from industry professionals with hands-on experience in digital marketing and business growth."
    },
    {
      icon: Brain,
      title: "Practical Skills",
      description: "Gain actionable skills and strategies that you can implement immediately in your business."
    },
    {
      icon: Users,
      title: "Networking Opportunities",
      description: "Connect with like-minded women entrepreneurs and build lasting professional relationships."
    },
    {
      icon: Award,
      title: "Certification",
      description: "Receive certificates of completion to showcase your new skills and expertise."
    },
    {
      icon: Zap,
      title: "Interactive Sessions",
      description: "Engage in hands-on workshops, Q&A sessions, and real-time problem-solving exercises."
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Discover proven strategies to scale your business and increase your market presence."
    }
  ];

  const successMetrics = [
    { number: "500+", label: "Women Trained" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Sessions Conducted" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading training sessions...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p style={{ color: '#E60023' }}>{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section 
        className="py-12 md:py-16 lg:py-20 text-white relative bg-cover bg-center bg-no-repeat min-h-[40vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/IMG_0011.JPG)',
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
              Upcoming Training Sessions
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl mb-6 opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
              }}>
                Join our expert-led training sessions designed to empower women entrepreneurs 
                with the skills and knowledge needed to succeed in today's digital landscape.
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

      {/* Why Attend Our Training Sessions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Attend Our Training Sessions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the unique advantages of joining our comprehensive training programs designed specifically for women entrepreneurs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyAttendReasons.map((reason, index) => {
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

      {/* Training Sessions Carousel */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Upcoming Training Sessions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our carefully curated training programs designed to accelerate your business growth.
            </p>
          </div>

          {trainings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No upcoming training sessions</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Check back soon for new training opportunities and skill-building workshops!
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Carousel Container */}
              <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
                {trainings.map((training, index) => {
                  const cardThemes = [
                    {
                      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
                      accent: 'from-blue-400 to-blue-500',
                      text: 'text-blue-50',
                      border: 'border-blue-200',
                      shadow: 'shadow-blue-500/20'
                    },
                    {
                      gradient: 'from-purple-500 via-purple-600 to-pink-600',
                      accent: 'from-purple-400 to-purple-500',
                      text: 'text-purple-50',
                      border: 'border-purple-200',
                      shadow: 'shadow-purple-500/20'
                    },
                    {
                      gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
                      accent: 'from-emerald-400 to-emerald-500',
                      text: 'text-emerald-50',
                      border: 'border-emerald-200',
                      shadow: 'shadow-emerald-500/20'
                    },
                    {
                      gradient: 'from-orange-500 via-orange-600 to-red-600',
                      accent: 'from-orange-400 to-orange-500',
                      text: 'text-orange-50',
                      border: 'border-orange-200',
                      shadow: 'shadow-orange-500/20'
                    },
                    {
                      gradient: 'from-rose-500 via-rose-600 to-pink-600',
                      accent: 'from-rose-400 to-rose-500',
                      text: 'text-rose-50',
                      border: 'border-rose-200',
                      shadow: 'shadow-rose-500/20'
                    },
                    {
                      gradient: 'from-violet-500 via-violet-600 to-purple-600',
                      accent: 'from-violet-400 to-violet-500',
                      text: 'text-violet-50',
                      border: 'border-violet-200',
                      shadow: 'shadow-violet-500/20'
                    }
                  ];
                  
                  const theme = cardThemes[index % cardThemes.length];
                  
                  return (
                    <div key={training.id} className="flex-shrink-0 w-full max-w-md">
                      <div className={`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-6 bg-gradient-to-br ${theme.gradient} ${theme.shadow} border ${theme.border}`}>
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 blur-lg"></div>
                        
                        {/* Header Section with Image */}
                        <div className="relative h-48 overflow-hidden rounded-t-3xl">
                          {training.image_url ? (
                            <img
                              src={training.image_url}
                              alt={training.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                              <BookOpen className="h-16 w-16 text-white/60" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
                          
                          {/* Floating Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <Badge className={`bg-white/90 text-gray-800 border-0 font-semibold shadow-lg`}>
                              <Award className="h-3 w-3 mr-1" />
                              {training.level}
                            </Badge>
                            <Badge className={`bg-white/90 text-gray-800 border-0 font-semibold shadow-lg`}>
                              <Clock className="h-3 w-3 mr-1" />
                              {training.duration}
                            </Badge>
                          </div>
                          
                          {/* Price Tag */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                              <div className="text-2xl font-bold text-gray-900">₹{training.price}</div>
                              <div className="text-xs text-gray-600">Complete Program</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="relative p-8">
                          {/* Title and Icon */}
                          <div className="flex items-start justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300 flex-1 leading-tight">
                              {training.title}
                            </h3>
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ml-4 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                              <BookOpen className="h-7 w-7 text-white" />
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-white/90 mb-6 line-clamp-3 text-base leading-relaxed">
                            {training.description}
                          </p>
                          
                          {/* Info Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                              <div className="flex items-center gap-2 text-sm text-white">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium truncate">{formatDate(training.start_date)}</span>
                              </div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                              <div className="flex items-center gap-2 text-sm text-white">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium">{formatTime(training.start_time)}</span>
                              </div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                              <div className="flex items-center gap-2 text-sm text-white">
                                <MapPin className="h-4 w-4" />
                                <span className="font-medium truncate">{training.location}</span>
                              </div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                              <div className="flex items-center gap-2 text-sm text-white">
                                <Users className="h-4 w-4" />
                                <span className="font-medium">{training.max_participants} max</span>
                              </div>
                            </div>
                          </div>

                          {/* What's Included Section */}
                          <div className="mb-6">
                            <h4 className="text-lg font-bold mb-4 text-white">What's Included:</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <span className="text-white/90 text-base font-medium">Hands-on Canva design session</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <span className="text-white/90 text-base font-medium">AI-powered content writing</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <span className="text-white/90 text-base font-medium">Take-home materials</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                                <span className="text-white/90 text-base font-medium">Networking opportunities</span>
                              </div>
                            </div>
                          </div>

                          {/* Topics */}
                          {training.topics && training.topics.length > 0 && (
                            <div className="mb-6">
                              <p className="text-sm font-bold mb-3 text-white/90">Topics covered:</p>
                              <div className="flex flex-wrap gap-2">
                                {training.topics.slice(0, 3).map((topic, topicIndex) => (
                                  <Badge key={topicIndex} className="text-xs bg-white/30 text-white border border-white/40 hover:bg-white/40 backdrop-blur-sm">
                                    {topic}
                                  </Badge>
                                ))}
                                {training.topics.length > 3 && (
                                  <Badge className="text-xs bg-white/30 text-white border border-white/40 hover:bg-white/40 backdrop-blur-sm">
                                    +{training.topics.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Button asChild className="flex-1 h-12 text-base font-semibold rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                              <Link to={`/training/${training.id}`}>
                                View Details
                              </Link>
                            </Button>
                            {training.registration_enabled && (
                              <Button asChild className="h-12 px-6 rounded-2xl bg-white hover:bg-white/90 text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                                <Link to={`/training/${training.id}/register`}>
                                  Register Now
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Scroll Indicators */}
              <div className="flex justify-center mt-8 gap-2">
                {trainings.map((_, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary transition-colors duration-300 cursor-pointer"
                  ></div>
                ))}
              </div>
            </div>
          )}
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful women entrepreneurs who have accelerated their business growth through our expert training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#E60023' }}>
                Browse All Programs
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold rounded-xl border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                Schedule a Consultation
              </Button>
            </div>
            
            {/* Additional trust indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Expert Instructors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Practical Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Lifetime Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Certification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 