import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowLeft, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ProductCard } from '@/components/Products/ProductCard';
import { ReviewSection } from '@/components/Reviews/ReviewSection';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getProductDetails, getSimilarProducts, DetailedProduct, ProductVariant } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!id) {
      navigate('/products');
      return;
    }

    const productDetails = getProductDetails(id);
    if (!productDetails) {
      navigate('/products');
      return;
    }

    setProduct(productDetails);
    setSimilarProducts(getSimilarProducts(id, productDetails.category));

    // Set default selections
    if (productDetails.variants.length > 0) {
      setSelectedColor(productDetails.variants[0].id);
      if (productDetails.variants[0].sizes.length > 0) {
        setSelectedSize(productDetails.variants[0].sizes[0]);
      }
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.id === selectedColor);
  const currentStock = selectedVariant && selectedSize ? selectedVariant.stock[selectedSize] : selectedVariant ? Object.values(selectedVariant.stock).reduce((sum, stock) => sum + stock, 0) : 0;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    const cartItem = {
      ...product,
      selectedColor: selectedVariant?.color,
      selectedSize,
      quantity
    };
    
    addToCart(cartItem);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={selectedVariant?.images[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedVariant && selectedVariant.images.length > 1 && (
              <div className="flex gap-2">
                {selectedVariant.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "aspect-square w-16 rounded-md overflow-hidden border-2",
                      selectedImageIndex === index ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <Badge className="bg-secondary text-secondary-foreground">New</Badge>
              )}
              {product.isSale && (
                <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>
              )}
              {isOutOfStock && (
                <Badge variant="outline" className="text-destructive border-destructive">Out of Stock</Badge>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "fill-secondary text-secondary"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  GH₵ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    GH₵ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {selectedVariant && product.variants.length > 1 && (
              <div className="space-y-3">
                <h3 className="font-medium">Color: {selectedVariant?.color}</h3>
                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedColor(variant.id);
                        setSelectedImageIndex(0);
                        if (variant.sizes.length > 0) {
                          setSelectedSize(variant.sizes[0]);
                        }
                      }}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        selectedColor === variant.id
                          ? "border-primary scale-110"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: variant.colorHex }}
                      title={variant.color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {selectedVariant && selectedVariant.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Size</h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedVariant.sizes.map((size) => (
                      <SelectItem 
                        key={size} 
                        value={size}
                        disabled={selectedVariant.stock[size] === 0}
                      >
                        {size} {selectedVariant.stock[size] === 0 && '(Out of Stock)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Stock Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isOutOfStock ? "bg-destructive" : currentStock < 5 ? "bg-yellow-500" : "bg-green-500"
                )} />
                <span className="text-sm font-medium">
                  {isOutOfStock 
                    ? "Out of Stock" 
                    : currentStock < 5 
                    ? `Only ${currentStock} left` 
                    : "In Stock"
                  }
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    disabled={quantity >= currentStock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleFavorite(product)}
                  className="h-11 w-11"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      isFavorite(product.id) ? "fill-destructive text-destructive" : ""
                    )}
                  />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-6 border-t">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span className="text-sm">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Reviews Section */}
        <ReviewSection
          productId={product.id}
          averageRating={product.rating}
          totalReviews={product.reviewCount}
          ratingDistribution={[
            { stars: 5, count: Math.floor(product.reviewCount * 0.6) },
            { stars: 4, count: Math.floor(product.reviewCount * 0.2) },
            { stars: 3, count: Math.floor(product.reviewCount * 0.1) },
            { stars: 2, count: Math.floor(product.reviewCount * 0.05) },
            { stars: 1, count: Math.floor(product.reviewCount * 0.05) },
          ]}
        />

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Similar Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  onAddToCart={(product) => {
                    addToCart(product);
                    toast({
                      title: "Added to Cart",
                      description: `${product.name} added to your cart.`,
                    });
                  }}
                  onToggleWishlist={toggleFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;