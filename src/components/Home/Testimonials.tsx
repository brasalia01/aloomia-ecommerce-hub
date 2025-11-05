import { useEffect, useState } from 'react';
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Antoinette Sey",
    role: "Verified Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    quote: "Amazing quality and fast delivery! The products exceeded my expectations. Aloomia has become my go-to store for premium items.",
  },
  {
    name: "Bra Salia",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    quote: "Excellent customer service and authentic products. The shopping experience is smooth and the packaging is always perfect.",
  },
  {
    name: "Akosuah Ilem",
    role: "Fashion Enthusiast",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    quote: "Love the variety and quality of products. The prices are reasonable and the style selections are always on-trend.",
  },
  {
    name: "Kwame Asante",
    role: "Tech Professional",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    quote: "The subscription services are worth every penny. Apple Music and Netflix subscriptions delivered instantly!",
  },
  {
    name: "Ama Boateng",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    rating: 5,
    quote: "Their web development service helped transform my business. Professional, affordable, and delivered on time.",
  },
];

export const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    // Auto-rotate every 5 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-elegant">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Auto-rotating every 5 seconds
          </p>
        </div>
      </div>
    </section>
  );
};