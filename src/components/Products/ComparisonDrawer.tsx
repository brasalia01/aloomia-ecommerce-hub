import { X, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Product } from './ProductCard';
import { useNavigate } from 'react-router-dom';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export const ComparisonDrawer = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onClear,
}: ComparisonDrawerProps) => {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Product Comparison</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center h-[80vh]">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No products to compare</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const allFeatures = Array.from(
    new Set(products.flatMap(p => p.features || []))
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-4xl p-0">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle>Compare Products ({products.length})</SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear All
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6">
            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 relative">
                  <button
                    onClick={() => onRemove(product.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">⭐ {product.rating}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      onClose();
                    }}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 font-semibold">Specifications</div>
              
              {/* Category */}
              <div className="grid grid-cols-4 border-b">
                <div className="p-4 font-medium bg-muted/50">Category</div>
                {products.map((product) => (
                  <div key={product.id} className="p-4 border-l">
                    <Badge>{product.category}</Badge>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="grid grid-cols-4 border-b">
                <div className="p-4 font-medium bg-muted/50">Rating</div>
                {products.map((product) => (
                  <div key={product.id} className="p-4 border-l">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-muted-foreground">/ 5</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="grid grid-cols-4 border-b">
                <div className="p-4 font-medium bg-muted/50">Price</div>
                {products.map((product) => (
                  <div key={product.id} className="p-4 border-l">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sale Status */}
              <div className="grid grid-cols-4 border-b">
                <div className="p-4 font-medium bg-muted/50">On Sale</div>
                {products.map((product) => (
                  <div key={product.id} className="p-4 border-l">
                    {product.onSale ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Minus className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              {/* New Status */}
              <div className="grid grid-cols-4 border-b">
                <div className="p-4 font-medium bg-muted/50">New Arrival</div>
                {products.map((product) => (
                  <div key={product.id} className="p-4 border-l">
                    {product.isNew ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Minus className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              {allFeatures.length > 0 && (
                <>
                  <div className="p-4 font-semibold bg-muted">Features</div>
                  {allFeatures.slice(0, 10).map((feature, idx) => (
                    <div key={idx} className="grid grid-cols-4 border-b">
                      <div className="p-4 text-sm bg-muted/50">{feature}</div>
                      {products.map((product) => (
                        <div key={product.id} className="p-4 border-l flex items-center justify-center">
                          {product.features?.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Minus className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};