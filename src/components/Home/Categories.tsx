import { Smartphone, Headphones, Watch, ShoppingBag, Home, Gamepad2, Shirt } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  itemCount: number;
  color: string;
}

export const Categories = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      icon: Smartphone,
      itemCount: 156,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    {
      id: '2',
      name: 'Audio',
      icon: Headphones,
      itemCount: 89,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      id: '3',
      name: 'Accessories',
      icon: Watch,
      itemCount: 124,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    {
      id: '4',
      name: 'Fashion',
      icon: ShoppingBag,
      itemCount: 203,
      color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    },
    {
      id: '5',
      name: 'Home & Garden',
      icon: Home,
      itemCount: 167,
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    },
    {
      id: '6',
      name: 'Gaming',
      icon: Gamepad2,
      itemCount: 78,
      color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    {
      id: '7',
      name: 'Jerseys',
      icon: Shirt,
      itemCount: 145,
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our diverse collection of products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to="/categories">
              <Card
                className={cn(
                  "group cursor-pointer border-border hover:border-primary/50",
                  "transition-all duration-300 hover:shadow-medium hover:-translate-y-1",
                  "bg-gradient-card animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={cn(
                      "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center",
                      "transition-transform duration-300 group-hover:scale-110",
                      category.color
                    )}
                  >
                    <category.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {category.itemCount} items
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Can't find what you're looking for?{' '}
            <Link to="/products" className="text-primary hover:underline font-medium">
              Browse all products
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};