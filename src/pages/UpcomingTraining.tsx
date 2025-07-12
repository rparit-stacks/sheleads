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

      {/* Training Sessions Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Available Training Sessions
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
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training, index) => {
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
                
                const badgeColors = [
                  'bg-blue-100 text-blue-700 border-blue-200',
                  'bg-purple-100 text-purple-700 border-purple-200',
                  'bg-green-100 text-green-700 border-green-200',
                  'bg-orange-100 text-orange-700 border-orange-200',
                  'bg-teal-100 text-teal-700 border-teal-200',
                  'bg-rose-100 text-rose-700 border-rose-200'
                ];
                
                const cardVariant = cardVariants[index % cardVariants.length];
                const iconColor = iconColors[index % iconColors.length];
                const badgeColor = badgeColors[index % badgeColors.length];
                
                return (
                  <div key={training.id} className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 ${cardVariant}`}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    
                    {training.image_url && (
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={training.image_url}
                          alt={training.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className={`${badgeColor} border font-medium`}>
                            <Award className="h-3 w-3 mr-1" />
                            {training.level}
                          </Badge>
                          <Badge className={`${badgeColor} border font-medium`}>
                            <Clock className="h-3 w-3 mr-1" />
                            {training.duration}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 flex-1">
                          {training.title}
                        </h3>
                        <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center ml-4 group-hover:scale-110 transition-transform duration-300`}>
                          <BookOpen className="h-6 w-6" />
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6 line-clamp-3 text-base leading-relaxed">
                        {training.description}
                      </p>
                      
                      {/* Info Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium truncate">{formatDate(training.start_date)}</span>
                          </div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{formatTime(training.start_time)}</span>
                          </div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium truncate">{training.location}</span>
                          </div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{training.max_participants} max</span>
                          </div>
                        </div>
                      </div>

                      {training.topics && training.topics.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-bold mb-3 text-gray-900">Topics covered:</p>
                          <div className="flex flex-wrap gap-2">
                            {training.topics.slice(0, 3).map((topic, topicIndex) => (
                              <Badge key={topicIndex} className="text-xs bg-white/70 text-gray-700 border border-white/30 hover:bg-white/80">
                                {topic}
                              </Badge>
                            ))}
                            {training.topics.length > 3 && (
                              <Badge className="text-xs bg-white/70 text-gray-700 border border-white/30 hover:bg-white/80">
                                +{training.topics.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button asChild className="flex-1 h-12 text-base font-semibold rounded-2xl bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <Link to={`/training/${training.id}`}>
                            View Details
                          </Link>
                        </Button>
                        {training.registration_enabled && (
                          <Button asChild className="h-12 px-6 rounded-2xl bg-white/80 hover:bg-white text-gray-900 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                            <Link to={`/training/${training.id}/register`}>
                              Register
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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