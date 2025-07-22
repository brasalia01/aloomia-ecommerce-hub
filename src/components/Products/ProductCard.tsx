import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  isWishlisted?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  className,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border hover:shadow-large transition-all duration-300",
        "hover:-translate-y-1 bg-gradient-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-secondary text-secondary-foreground">New</Badge>
        )}
        {product.isSale && discountPercentage > 0 && (
          <Badge className="bg-destructive text-destructive-foreground">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div
        className={cn(
          "absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        )}
      >
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9 bg-background/90 hover:bg-background shadow-md"
          onClick={() => onToggleWishlist?.(product)}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              product.isWishlisted ? "fill-destructive text-destructive" : ""
            )}
          />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9 bg-background/90 hover:bg-background shadow-md"
          onClick={() => onQuickView?.(product)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            "group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Quick Add Button - Shows on Hover */}
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-medium text-foreground mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-secondary text-secondary"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};