import { useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Premium Product Selection',
    excerpt: 'Discover how to choose the best premium products that match your lifestyle and budget. Expert tips and insights from industry professionals.',
    content: `
      <h2>Understanding Premium Quality</h2>
      <p>When it comes to selecting premium products, quality should always be your top priority. Premium items are characterized by superior materials, exceptional craftsmanship, and attention to detail that sets them apart from standard offerings.</p>
      
      <h3>Key Factors to Consider</h3>
      <ul>
        <li><strong>Material Quality:</strong> Premium products use high-grade materials that ensure durability and longevity.</li>
        <li><strong>Brand Reputation:</strong> Established brands with proven track records often deliver consistent quality.</li>
        <li><strong>User Reviews:</strong> Real customer experiences provide valuable insights into product performance.</li>
        <li><strong>Warranty and Support:</strong> Premium products typically come with comprehensive warranties and customer support.</li>
      </ul>

      <h3>Making the Right Choice</h3>
      <p>Before making a purchase, research thoroughly, compare options, and consider your specific needs. Don't just go for the most expensive option—look for the best value that aligns with your requirements.</p>

      <h3>Budget Considerations</h3>
      <p>While premium products may have higher upfront costs, they often provide better long-term value through durability and performance. Consider the total cost of ownership rather than just the initial price.</p>

      <h3>Final Thoughts</h3>
      <p>Investing in premium products is about making informed decisions that enhance your lifestyle and provide lasting satisfaction. Take your time, do your research, and choose wisely.</p>
    `,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    category: 'Shopping Guide',
    date: '2025-01-15',
    readTime: '5 min read',
    author: 'Sarah Johnson',
  },
  {
    id: 2,
    title: '2025 Fashion Trends: What\'s Hot This Season',
    excerpt: 'Stay ahead of the curve with our comprehensive guide to the hottest fashion trends of 2025. From colors to styles.',
    content: `
      <h2>Fashion Forward: 2025 Trends</h2>
      <p>The fashion landscape of 2025 is all about bold expressions, sustainable choices, and timeless elegance. Let's explore the key trends shaping this year's fashion scene.</p>
      
      <h3>Color Palettes</h3>
      <p>This season, we're seeing a beautiful blend of earthy tones and vibrant accents. Sage green, terracotta, and soft blues are dominating the color palette, while bold reds and electric blues add pop to any outfit.</p>

      <h3>Sustainable Fashion</h3>
      <p>Eco-conscious fashion continues to gain momentum. More brands are adopting sustainable practices, using recycled materials, and promoting circular fashion models.</p>

      <h3>Statement Pieces</h3>
      <p>Oversized blazers, wide-leg trousers, and bold accessories are making strong statements. Don't be afraid to mix and match to create your unique style.</p>

      <h3>Comfort Meets Style</h3>
      <p>The fusion of comfort and style remains strong. Athleisure continues to evolve, offering sophisticated options that work for both casual and semi-formal occasions.</p>
    `,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop',
    category: 'Fashion',
    date: '2025-01-10',
    readTime: '7 min read',
    author: 'Michael Chen',
  },
  {
    id: 3,
    title: 'Tech Essentials Every Modern Professional Needs',
    excerpt: 'Upgrade your workspace with these must-have tech gadgets and accessories that boost productivity and style.',
    content: `
      <h2>Your Modern Workspace Toolkit</h2>
      <p>In today's digital age, having the right tech essentials can significantly impact your productivity and professional success. Here's what every modern professional should consider.</p>
      
      <h3>Must-Have Devices</h3>
      <ul>
        <li><strong>Laptop:</strong> A powerful, portable laptop is the foundation of any modern workspace.</li>
        <li><strong>Wireless Headphones:</strong> Essential for focused work and virtual meetings.</li>
        <li><strong>External Monitor:</strong> Boost productivity with a dual-screen setup.</li>
        <li><strong>Mechanical Keyboard:</strong> Improve typing comfort and efficiency.</li>
      </ul>

      <h3>Productivity Enhancers</h3>
      <p>Invest in tools that streamline your workflow: cloud storage solutions, project management apps, and communication platforms that keep you connected with your team.</p>

      <h3>Ergonomic Considerations</h3>
      <p>Don't overlook ergonomics. A good chair, adjustable desk, and proper lighting can prevent long-term health issues and improve your overall work experience.</p>
    `,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
    category: 'Technology',
    date: '2025-01-05',
    readTime: '6 min read',
    author: 'Emily Rodriguez',
  },
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Aloomia Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="py-12 lg:py-20">
          <article className="container mx-auto px-4 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link to="/blog">
                <Button variant="ghost" className="group">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </motion.div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="mb-4">{post.category}</Badge>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-6 prose-li:text-muted-foreground prose-li:mb-2
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16 pt-8 border-t border-border"
              >
                <h3 className="text-2xl font-bold mb-8">More Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter(p => p.id !== post.id)
                    .slice(0, 2)
                    .map(relatedPost => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                        <Card className="h-full border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                            <h4 className="font-semibold text-foreground line-clamp-2 mb-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{relatedPost.readTime}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </motion.div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
