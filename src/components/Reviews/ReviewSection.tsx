import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ReviewSectionProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { stars: number; count: number }[];
}

export const ReviewSection = ({
  productId,
  averageRating,
  totalReviews,
  ratingDistribution,
}: ReviewSectionProps) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <section className="mt-12">
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
          <TabsTrigger value="ratings">Rating Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold">Customer Reviews</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="ml-1 font-semibold">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground">
                  ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>
            {user && (
              <Button onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            )}
          </div>

          <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Write Your Review</DialogTitle>
              </DialogHeader>
              <ReviewForm
                productId={productId}
                onSuccess={handleReviewSuccess}
                onCancel={() => setShowReviewForm(false)}
              />
            </DialogContent>
          </Dialog>

          <ReviewList key={refreshKey} productId={productId} />
        </TabsContent>

        <TabsContent value="ratings" className="mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalReviews} reviews
                </p>
              </div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const distribution = ratingDistribution.find(d => d.stars === stars);
                  const count = distribution?.count || 0;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm w-12">{stars} stars</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};