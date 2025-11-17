import { useState } from 'react';
import { Star, Quote, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const testimonials = [
  {
    id: 1,
    name: 'Kwame Mensah',
    role: 'Small Business Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    quote: 'Aloomia has completely transformed the way I shop for my business needs. The quality of products and customer service is exceptional. I especially love the quick delivery and the attention to detail.',
    category: 'Electronics',
    date: '2025-01-15',
    verified: true,
  },
  {
    id: 2,
    name: 'Ama Asante',
    role: 'Fashion Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    quote: 'I was skeptical about online shopping at first, but Aloomia proved me wrong. The fashion collection is stunning, and everything arrived exactly as shown. The customer support team is always ready to help!',
    category: 'Fashion',
    date: '2025-01-12',
    verified: true,
  },
  {
    id: 3,
    name: 'Kofi Boateng',
    role: 'Tech Professional',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 4,
    quote: 'Great selection of tech products! I bought my laptop and accessories here. The prices are competitive, and the product descriptions are accurate. Delivery was smooth and professional.',
    category: 'Electronics',
    date: '2025-01-10',
    verified: true,
  },
  {
    id: 4,
    name: 'Akua Owusu',
    role: 'Home Decorator',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    quote: 'I furnished my entire living room with products from Aloomia. The variety is impressive, and everything is of high quality. The team even helped me choose the right items for my space!',
    category: 'Home & Living',
    date: '2025-01-08',
    verified: true,
  },
  {
    id: 5,
    name: 'Yaw Appiah',
    role: 'Fitness Coach',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    rating: 5,
    quote: 'The sports and fitness section has everything I need! Quality products at great prices. I recommend Aloomia to all my clients. Fast shipping and excellent packaging.',
    category: 'Sports',
    date: '2025-01-05',
    verified: true,
  },
  {
    id: 6,
    name: 'Abena Serwaa',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    rating: 4,
    quote: 'As a student, I appreciate the affordable prices and quality products. I bought my textbooks and stationery here. The search functionality makes it easy to find what I need.',
    category: 'Books',
    date: '2025-01-03',
    verified: true,
  },
  {
    id: 7,
    name: 'Emmanuel Darko',
    role: 'Photographer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    rating: 5,
    quote: 'I purchase all my camera equipment from Aloomia. The product range is excellent, and the prices are fair. The detailed specifications help me make informed decisions.',
    category: 'Electronics',
    date: '2025-01-01',
    verified: true,
  },
  {
    id: 8,
    name: 'Efua Amoah',
    role: 'Chef',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
    rating: 5,
    quote: 'The kitchen appliances I ordered exceeded my expectations! Everything works perfectly, and the quality is restaurant-grade. Delivery was on time, and customer service was outstanding.',
    category: 'Home & Living',
    date: '2024-12-28',
    verified: true,
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books'];

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredTestimonials = testimonials.filter(testimonial => {
    const categoryMatch = selectedCategory === 'All' || testimonial.category === selectedCategory;
    const ratingMatch = selectedRating === null || testimonial.rating === selectedRating;
    return categoryMatch && ratingMatch;
  });

  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <>
      <Helmet>
        <title>Customer Testimonials & Reviews | Aloomia</title>
        <meta name="description" content={`Read ${testimonials.length} verified customer reviews and testimonials. Average rating: ${averageRating}/5 stars. See what our customers say about their shopping experience.`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Customer Testimonials
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Don't just take our word for it - hear from our satisfied customers
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{averageRating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(parseFloat(averageRating))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{testimonials.length}+</div>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Verified Purchases</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                    aria-label={`Filter by ${category}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Rating Filter */}
              <div className="flex gap-2 items-center">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Rating:</span>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    variant={selectedRating === rating ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    className="min-w-[60px]"
                    aria-label={`Filter by ${rating} stars`}
                  >
                    {rating} ★
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No testimonials found for the selected filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-elegant">
                      <CardContent className="p-6">
                        {/* Quote Icon */}
                        <Quote className="w-10 h-10 text-primary/20 mb-4" />

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          "{testimonial.quote}"
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                              {testimonial.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                          <Badge variant="outline">{testimonial.category}</Badge>
                          <span>{new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
