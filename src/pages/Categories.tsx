import { Smartphone, Headphones, Watch, ShoppingBag, Home, Gamepad2, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  itemCount: number;
  color: string;
  href: string;
}

const Categories = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Latest gadgets, smartphones, tablets, and tech accessories',
      icon: Smartphone,
      itemCount: 156,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      href: '/products?category=Electronics',
    },
    {
      id: '2',
      name: 'Audio',
      description: 'Headphones, speakers, earbuds, and audio equipment',
      icon: Headphones,
      itemCount: 89,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      href: '/products?category=Audio',
    },
    {
      id: '3',
      name: 'Accessories',
      description: 'Watches, jewelry, bags, and fashion accessories',
      icon: Watch,
      itemCount: 124,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
      href: '/products?category=Accessories',
    },
    {
      id: '4',
      name: 'Fashion',
      description: 'Clothing, shoes, bags, and style essentials',
      icon: ShoppingBag,
      itemCount: 203,
      color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
      href: '/products?category=Fashion',
    },
    {
      id: '5',
      name: 'Home & Garden',
      description: 'Furniture, decor, appliances, and garden supplies',
      icon: Home,
      itemCount: 167,
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
      href: '/products?category=Home',
    },
    {
      id: '6',
      name: 'Gaming',
      description: 'Gaming consoles, accessories, and entertainment',
      icon: Gamepad2,
      itemCount: 78,
      color: 'bg-red-500/10 text-red-600 dark:text-red-400',
      href: '/products?category=Gaming',
    },
  ];

  const featuredCategories = categories.slice(0, 3);
  const popularBrands = [
    'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Canon', 'Dell'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Shop by Category
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Discover thousands of products organized by category. 
              Find exactly what you're looking for with ease.
            </p>
          </div>
        </section>

        {/* All Categories */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                All Categories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse through our comprehensive collection across all product categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category, index) => (
                <Card
                  key={category.id}
                  className={cn(
                    "group cursor-pointer border-border hover:border-primary/50",
                    "transition-all duration-300 hover:shadow-large hover:-translate-y-2",
                    "bg-gradient-card animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.location.href = category.href}
                >
                  <CardContent className="p-8">
                    <div
                      className={cn(
                        "w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center",
                        "transition-transform duration-300 group-hover:scale-110",
                        category.color
                      )}
                    >
                      <category.icon className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {category.itemCount} products
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured Categories
              </h2>
              <p className="text-lg text-muted-foreground">
                Our most popular product categories with the best deals
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category, index) => (
                <Card
                  key={category.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-large hover:shadow-glow transition-all duration-300"
                  onClick={() => window.location.href = category.href}
                >
                  <CardContent className="p-0">
                    <div className="bg-gradient-primary p-8 text-primary-foreground">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                          <category.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          <p className="text-primary-foreground/80">{category.itemCount} items</p>
                        </div>
                      </div>
                      <p className="text-primary-foreground/90 mb-6">
                        {category.description}
                      </p>
                      <Button variant="secondary" className="group-hover:scale-105 transition-transform">
                        Shop Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Brands */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Popular Brands
              </h2>
              <p className="text-lg text-muted-foreground">
                Shop from your favorite trusted brands
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {popularBrands.map((brand, index) => (
                <Card
                  key={brand}
                  className="group cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="font-bold text-lg">
                        {brand.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {brand}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Browse our complete product collection or get in touch with our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = '/products'}
              >
                View All Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;