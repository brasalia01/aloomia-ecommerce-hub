import { useState, useEffect } from 'react';
import { X, Plus, Check, Minus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useProductComparison } from '@/hooks/useProductComparison';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

export default function Compare() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare } = useProductComparison();

  const allFeatures = Array.from(
    new Set(
      compareList.flatMap(product => 
        product.features ? product.features.map(f => f.toLowerCase()) : []
      )
    )
  ).sort();

  if (compareList.length === 0) {
    return (
      <>
        <Helmet>
          <title>Compare Products | Aloomia</title>
          <meta name="description" content="Compare products side by side to make the best purchase decision. Compare specifications, prices, and features." />
        </Helmet>

        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">No Products to Compare</h2>
            <p className="text-muted-foreground mb-8">
              Start adding products to your comparison list to see them side by side.
            </p>
            <Button 
              onClick={() => navigate('/products')}
              size="lg"
              aria-label="Browse products to compare"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Compare Products - {compareList.map(p => p.name).join(' vs ')} | Aloomia</title>
        <meta name="description" content={`Compare ${compareList.map(p => p.name).join(', ')} side by side. See specifications, prices, and features.`} />
      </Helmet>

      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Product Comparison
                </h1>
                <p className="text-muted-foreground mt-1">
                  Compare {compareList.length} product{compareList.length !== 1 ? 's' : ''} side by side
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={clearCompare}
              aria-label="Clear all products from comparison"
            >
              Clear All
            </Button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Product Cards */}
              <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(280px, 1fr))` }}>
                {compareList.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => removeFromCompare(product.id)}
                        aria-label={`Remove ${product.name} from comparison`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl font-bold text-primary">
                            GH₵{product.price.toFixed(2)}
                          </span>
                          {product.onSale && product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              GH₵{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({product.rating})</span>
                        </div>
                        <Button
                          className="w-full mt-4"
                          onClick={() => navigate(`/products/${product.id}`)}
                          aria-label={`View details for ${product.name}`}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Table */}
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <tbody>
                      {/* Category Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-semibold bg-muted/50 sticky left-0 z-10">Category</td>
                        {compareList.map((product) => (
                          <td key={product.id} className="p-4 text-center">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                        ))}
                      </tr>

                      {/* Rating Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-semibold bg-muted/50 sticky left-0 z-10">Rating</td>
                        {compareList.map((product) => (
                          <td key={product.id} className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span className="font-semibold">{product.rating}</span>
                              <span className="text-muted-foreground text-sm">/5</span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Price Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-semibold bg-muted/50 sticky left-0 z-10">Price</td>
                        {compareList.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <div className="font-bold text-lg text-primary">
                            GH₵{product.price.toFixed(2)}
                          </div>
                          {product.onSale && product.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              GH₵{product.originalPrice.toFixed(2)}
                            </div>
                          )}
                          </td>
                        ))}
                      </tr>

                      {/* On Sale Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-semibold bg-muted/50 sticky left-0 z-10">On Sale</td>
                        {compareList.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          {product.onSale ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                          </td>
                        ))}
                      </tr>

                      {/* New Arrival Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-semibold bg-muted/50 sticky left-0 z-10">New Arrival</td>
                        {compareList.map((product) => (
                          <td key={product.id} className="p-4 text-center">
                            {product.isNew ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Features Rows */}
                      {allFeatures.length > 0 && (
                        <>
                          <tr className="border-b border-border bg-muted/30">
                            <td colSpan={compareList.length + 1} className="p-4 font-semibold text-center">
                              Features
                            </td>
                          </tr>
                          {allFeatures.map((feature) => (
                            <tr key={feature} className="border-b border-border">
                              <td className="p-4 font-semibold bg-muted/50 sticky left-0 z-10 capitalize">
                                {feature}
                              </td>
                              {compareList.map((product) => (
                                <td key={product.id} className="p-4 text-center">
                                  {product.features?.some(f => f.toLowerCase() === feature) ? (
                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                  ) : (
                                    <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Add More Products */}
              {compareList.length < 4 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/products')}
                    aria-label="Add more products to comparison"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add More Products ({4 - compareList.length} slots available)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
