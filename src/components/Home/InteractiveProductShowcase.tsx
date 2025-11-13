import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export const InteractiveProductShowcase = () => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Get first 4 products for showcase
  const showcaseProducts = allProducts.slice(0, 4);

  const handleQuickAdd = (product: any) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <section id="showcase" className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Badge className="mb-4 text-xs md:text-sm">Featured Products</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            Trending This Week
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of top-rated products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {showcaseProducts.map((product, index) => {
            const discountPercent = product.isSale && product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(product.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Link to={`/product/${product.id}`}>
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredId === product.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>
                      )}
                      {product.isSale && discountPercent > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          -{discountPercent}%
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions - Appear on Hover */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ 
                        opacity: hoveredId === product.id ? 1 : 0,
                        x: hoveredId === product.id ? 0 : 20
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col gap-2"
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 md:h-9 md:w-9 rounded-full shadow-lg backdrop-blur-sm"
                        onClick={() => toggleFavorite(product)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-destructive text-destructive' : ''}`} 
                        />
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 md:h-9 md:w-9 rounded-full shadow-lg backdrop-blur-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Quick Add Button - Appears on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredId === product.id ? 1 : 0,
                        y: hoveredId === product.id ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-3 md:p-4"
                    >
                      <Button
                        onClick={() => handleQuickAdd(product)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-xs md:text-sm"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Quick Add
                      </Button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 md:p-4 space-y-2">
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                    
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-1 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg md:text-xl font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.isSale && product.originalPrice && (
                        <span className="text-xs md:text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="text-sm md:text-base">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
