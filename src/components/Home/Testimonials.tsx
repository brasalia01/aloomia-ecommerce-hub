import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Antoinette Sey',
      role: 'Verified Customer',
      content: 'Amazing quality and fast delivery! The products exceeded my expectations. Aloomia has become my go-to store for premium items.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Bra Salia',
      role: 'Regular Customer',
      content: 'Excellent customer service and authentic products. The shopping experience is smooth and the packaging is always perfect.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Akosuah Ilem',
      role: 'Fashion Enthusiast',
      content: 'Love the variety and quality of products. The prices are reasonable and the style selections are always on-trend.',
      rating: 5,
    },
    {
      id: '4',
      name: 'Kwame Asante',
      role: 'Tech Professional',
      content: 'The subscription services are worth every penny. Apple Music and Netflix subscriptions delivered instantly!',
      rating: 5,
    },
    {
      id: '5',
      name: 'Ama Boateng',
      role: 'Small Business Owner',
      content: 'Their web development service helped transform my business. Professional, affordable, and delivered on time.',
      rating: 5,
    },
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Aloomia for their shopping needs
          </p>
        </div>

        {/* Testimonials Slideshow */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Main Testimonial Display */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="border-border hover:shadow-medium transition-all duration-300 bg-gradient-card">
                    <CardContent className="p-8 text-center">
                      {/* Quote Icon */}
                      <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-20" />

                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-5 h-5",
                              i < testimonial.rating
                                ? "fill-secondary text-secondary"
                                : "fill-muted text-muted"
                            )}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <blockquote className="text-lg text-foreground mb-8 leading-relaxed italic max-w-2xl mx-auto">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-foreground text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-muted-foreground">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted hover:bg-primary/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { label: 'Happy Customers', value: '10,000+' },
              { label: 'Products Sold', value: '50,000+' },
              { label: 'Countries', value: '25+' },
              { label: 'Satisfaction Rate', value: '99%' },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};