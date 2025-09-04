import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/Products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { allProducts } from '@/data/products';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || categoryName;
  
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products by category
  const categoryProducts = useMemo(() => {
    if (!urlCategory) return allProducts;
    
    return allProducts.filter(product => 
      product.category.toLowerCase() === urlCategory.toLowerCase()
    );
  }, [urlCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...categoryProducts];
    
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [categoryProducts, sortBy]);

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'electronics': return '📱';
      case 'audio': return '🎧';
      case 'accessories': return '⌚';
      case 'fashion': return '👕';
      case 'home & garden': return '🏠';
      case 'gaming': return '🎮';
      case 'jerseys': return '👔';
      default: return '🛍️';
    }
  };

  if (!urlCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested category could not be found.</p>
          <Link to="/categories">
            <Button>Browse All Categories</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Breadcrumb and Header */}
        <section className="bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/categories" className="hover:text-foreground">Categories</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{urlCategory}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/categories">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Categories
                  </Button>
                </Link>
                
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <span className="text-2xl">{getCategoryIcon(urlCategory)}</span>
                    {urlCategory}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <Filter className="w-3 h-3 mr-2" />
                  {categoryProducts.length} Results
                </Badge>
                
                {categoryProducts.some(p => p.isSale) && (
                  <Badge variant="destructive" className="px-3 py-1">
                    Sale Items Available
                  </Badge>
                )}
                
                {categoryProducts.some(p => p.isNew) && (
                  <Badge className="px-3 py-1">
                    New Arrivals
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any products in the {urlCategory} category.
                </p>
                <Link to="/products">
                  <Button>Browse All Products</Button>
                </Link>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard 
                      product={product} 
                      layout={viewMode}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        {sortedProducts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Explore More Categories
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Electronics', 'Audio', 'Accessories', 'Fashion', 'Home & Garden', 'Gaming', 'Jerseys']
                  .filter(cat => cat.toLowerCase() !== urlCategory?.toLowerCase())
                  .slice(0, 6)
                  .map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="group"
                    >
                      <div className="bg-card rounded-lg p-4 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                        <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {category}
                        </h3>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;