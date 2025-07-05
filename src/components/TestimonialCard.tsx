import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  city: string;
  image?: string;
  rating?: number;
}

const TestimonialCard = ({ 
  quote, 
  author, 
  title, 
  city, 
  image, 
  rating = 5 
}: TestimonialCardProps) => {
  return (
    <Card className="bg-background shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
      <CardContent className="p-6">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-foreground mb-6 font-medium leading-relaxed">
          "{quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {image && (
            <img
              src={image}
              alt={author}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <div className="font-semibold text-foreground">{author}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-sm text-primary font-medium">{city}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;