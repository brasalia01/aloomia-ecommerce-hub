import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Star, Plus, Minus, Share2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/components/Products/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  if (!product) return null;

  // Mock additional images for demo
  const images = [
    product.image,
    product.image, // In real app, these would be different angles
    product.image,
  ];

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name} on Aloomia`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]"
        >
          {/* Image Section */}
          <div className="relative bg-muted/30">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-success text-success-foreground">New</Badge>
                )}
                {product.isSale && discountPercentage > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleToggleFavorite}
                  className="bg-background/90 hover:bg-background shadow-md"
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      isFavorite(product.id) ? "fill-destructive text-destructive" : ""
                    )}
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-background/90 hover:bg-background shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === index
                        ? "border-primary shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  {product.category}
                </p>
                <h1 className="text-2xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

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
              <span className="text-3xl font-bold text-primary">
                GH₵ {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  GH₵ {product.originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  Save {discountPercentage}%
                </Badge>
              )}
            </div>

            <Separator className="my-6" />

            {/* Product Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Experience premium quality with our {product.name}. Crafted with attention to detail
                and designed for excellence, this product delivers exceptional value and performance.
                Perfect for those who appreciate quality and style.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium text-lg">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground group"
              >
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Add {quantity > 1 ? `${quantity} items` : 'to Cart'} - GH₵ {(product.price * quantity).toFixed(2)}
              </Button>
              
              <div className="flex justify-center mt-4">
                <p className="text-xs text-muted-foreground">
                  ✓ Delivery available - fees calculated at cart
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};