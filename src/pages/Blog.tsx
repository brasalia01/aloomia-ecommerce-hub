import { useState, useMemo } from 'react';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const blogCategories = ['All', 'Shopping Guide', 'Fashion', 'Technology', 'Lifestyle', 'Tips & Tricks'];

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Premium Product Selection',
    excerpt: 'Discover how to choose the best premium products that match your lifestyle and budget. Expert tips and insights from industry professionals.',
    content: 'Full article content here...',
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
    content: 'Full article content here...',
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
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop',
    category: 'Technology',
    date: '2025-01-05',
    readTime: '6 min read',
    author: 'Emily Rodriguez',
  },
  {
    id: 4,
    title: 'Smart Shopping: How to Get the Best Deals Online',
    excerpt: 'Learn insider tips and tricks for finding amazing deals and saving money on your online purchases.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    category: 'Tips & Tricks',
    date: '2025-01-12',
    readTime: '4 min read',
    author: 'David Kim',
  },
  {
    id: 5,
    title: 'Sustainable Fashion: Making Eco-Friendly Choices',
    excerpt: 'Discover how to build a sustainable wardrobe without compromising on style or quality.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop',
    category: 'Fashion',
    date: '2025-01-08',
    readTime: '6 min read',
    author: 'Lisa Anderson',
  },
  {
    id: 6,
    title: 'Home Office Setup: Creating Your Perfect Workspace',
    excerpt: 'Transform your home office with these essential products and design tips for maximum productivity.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    category: 'Lifestyle',
    date: '2025-01-03',
    readTime: '8 min read',
    author: 'Mark Thompson',
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Blog - Latest Articles & Shopping Tips | Aloomia</title>
        <meta name="description" content="Explore our latest articles, shopping guides, fashion trends, and expert tips to help you make the best purchase decisions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Latest from Our Blog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Expert insights, trends, and tips to help you make the best choices
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg"
                  aria-label="Search blog articles"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {blogCategories.map((category) => (
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
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
            )}
          </div>
        </section>
      </div>
    </>
  );
}
