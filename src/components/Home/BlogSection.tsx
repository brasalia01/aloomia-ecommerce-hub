import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Premium Product Selection',
    excerpt: 'Discover how to choose the best premium products that match your lifestyle and budget. Expert tips and insights from industry professionals.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    category: 'Shopping Guide',
    date: '2025-01-15',
    readTime: '5 min read',
    author: 'Sarah Johnson',
  },
  {
    id: 2,
    title: '2025 Fashion Trends: What\'s Hot This Season',
    excerpt: 'Stay ahead of the curve with our comprehensive guide to the hottest fashion trends of 2025. From colors to styles.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop',
    category: 'Fashion',
    date: '2025-01-10',
    readTime: '7 min read',
    author: 'Michael Chen',
  },
  {
    id: 3,
    title: 'Tech Essentials Every Modern Professional Needs',
    excerpt: 'Upgrade your workspace with these must-have tech gadgets and accessories that boost productivity and style.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop',
    category: 'Technology',
    date: '2025-01-05',
    readTime: '6 min read',
    author: 'Emily Rodriguez',
  },
];

export const BlogSection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert insights, trends, and tips to help you make the best choices
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-elegant group overflow-hidden">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">By {post.author}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group-hover:text-primary"
                      onClick={() => window.location.href = `/blog/${post.id}`}
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2"
            onClick={() => window.location.href = '/blog'}
            aria-label="View all blog articles"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};