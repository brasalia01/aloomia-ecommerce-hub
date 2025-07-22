import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/Products/ProductCard';
import productWatch from '@/assets/product-watch.jpg';
import productHeadphones from '@/assets/product-headphones.jpg';
import productPhone from '@/assets/product-phone.jpg';
import productBag from '@/assets/product-bag.jpg';

export const FeaturedProducts = () => {
  // Mock data - in real app this would come from API
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Luxury Watch',
      price: 299.99,
      originalPrice: 399.99,
      image: productWatch,
      rating: 4.8,
      reviewCount: 124,
      category: 'Accessories',
      isSale: true,
      isNew: false,
    },
    {
      id: '2',
      name: 'Wireless Pro Headphones',
      price: 199.99,
      image: productHeadphones,
      rating: 4.9,
      reviewCount: 89,
      category: 'Electronics',
      isNew: true,
    },
    {
      id: '3',
      name: 'Smartphone Pro Max',
      price: 899.99,
      originalPrice: 999.99,
      image: productPhone,
      rating: 4.7,
      reviewCount: 256,
      category: 'Electronics',
      isSale: true,
    },
    {
      id: '4',
      name: 'Premium Leather Bag',
      price: 149.99,
      image: productBag,
      rating: 4.6,
      reviewCount: 67,
      category: 'Fashion',
      isNew: true,
    },
  ]);

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // TODO: Implement cart functionality
  };

  const handleToggleWishlist = (product: Product) => {
    console.log('Toggle wishlist:', product);
    // TODO: Implement wishlist functionality
  };

  const handleQuickView = (product: Product) => {
    console.log('Quick view:', product);
    // TODO: Implement quick view modal
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine quality, 
            style, and exceptional value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={handleQuickView}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" className="group">
            View All Products
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};