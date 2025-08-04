import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/Products/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Link } from 'react-router-dom';
import productWatch from '@/assets/product-watch.jpg';
import productHeadphones from '@/assets/product-headphones.jpg';
import productPhone from '@/assets/product-phone.jpg';
import productBag from '@/assets/product-bag.jpg';
import productSnacks from '@/assets/product-snacks.jpg';
import productAppleServices from '@/assets/product-apple-services.jpg';
import productNetflix from '@/assets/product-netflix.jpg';
import productGiftCards from '@/assets/product-gift-cards.jpg';
import productWebServices from '@/assets/product-web-services.jpg';
import productCvDesign from '@/assets/product-cv-design.jpg';
import productBranding from '@/assets/product-branding.jpg';

export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toggleFavorite } = useFavorites();
  
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
    {
      id: '5',
      name: 'Gourmet Snack Collection',
      price: 29.99,
      originalPrice: 39.99,
      image: productSnacks,
      rating: 4.5,
      reviewCount: 45,
      category: 'Food & Snacks',
      isSale: true,
    },
    {
      id: '6',
      name: 'Apple Services Bundle',
      price: 19.99,
      image: productAppleServices,
      rating: 4.8,
      reviewCount: 312,
      category: 'Subscriptions',
      isNew: true,
    },
    {
      id: '7',
      name: 'Netflix Premium Subscription',
      price: 15.99,
      image: productNetflix,
      rating: 4.7,
      reviewCount: 1024,
      category: 'Subscriptions',
    },
    {
      id: '8',
      name: 'Universal Gift Cards',
      price: 50.00,
      image: productGiftCards,
      rating: 4.9,
      reviewCount: 89,
      category: 'Gift Cards',
      isNew: true,
    },
    {
      id: '9',
      name: 'Web Development Service',
      price: 999.99,
      originalPrice: 1299.99,
      image: productWebServices,
      rating: 4.9,
      reviewCount: 156,
      category: 'Services',
      isSale: true,
    },
    {
      id: '10',
      name: 'Professional CV Design',
      price: 49.99,
      image: productCvDesign,
      rating: 4.8,
      reviewCount: 78,
      category: 'Services',
      isNew: true,
    },
    {
      id: '11',
      name: 'Branding & Design Package',
      price: 499.99,
      originalPrice: 699.99,
      image: productBranding,
      rating: 4.9,
      reviewCount: 92,
      category: 'Services',
      isSale: true,
    },
  ]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleToggleWishlist = (product: Product) => {
    toggleFavorite(product);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
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
          <Link to="/products">
            <Button size="lg" className="group">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};