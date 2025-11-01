import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, Check, X, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  is_approved: boolean;
  is_verified: boolean;
  featured_testimonial?: boolean;
  helpful_count: number;
  photos: string[];
  created_at: string;
  updated_at: string;
}

export const AdminReviewsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data as Review[]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reviews',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (
    reviewId: string,
    updates: { 
      is_approved?: boolean; 
      is_verified?: boolean; 
      featured_testimonial?: boolean 
    }
  ) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, ...updates } : r
      ));

      toast({
        title: 'Success',
        description: 'Review updated successfully',
      });
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: 'Error',
        description: 'Failed to update review',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Review Management</h2>
        <Badge variant="outline">
          {reviews.filter(r => !r.is_approved).length} Pending
        </Badge>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>User ID: {review.user_id.slice(0, 8)}...</span>
                    <span>•</span>
                    <span>Product ID: {review.product_id}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {review.is_approved && (
                    <Badge variant="default">Approved</Badge>
                  )}
                  {review.is_verified && (
                    <Badge variant="secondary">Verified</Badge>
                  )}
                  {review.featured_testimonial && (
                    <Badge variant="default" className="gap-1">
                      <Award className="w-3 h-3" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'fill-primary text-primary'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm">{review.body}</p>

              {review.photos && review.photos.length > 0 && (
                <div className="flex gap-2">
                  {review.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt={`Review photo ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {!review.is_approved && (
                  <Button
                    size="sm"
                    onClick={() => updateReview(review.id, { is_approved: true })}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                )}
                {review.is_approved && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateReview(review.id, { is_approved: false })}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Unapprove
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => 
                    updateReview(review.id, { is_verified: !review.is_verified })
                  }
                >
                  {review.is_verified ? 'Remove Verified' : 'Mark Verified'}
                </Button>

                <Button
                  size="sm"
                  variant={review.featured_testimonial ? "default" : "outline"}
                  onClick={() => 
                    updateReview(review.id, { 
                      featured_testimonial: !review.featured_testimonial 
                    })
                  }
                >
                  <Award className="w-4 h-4 mr-1" />
                  {review.featured_testimonial ? 'Remove Featured' : 'Feature'}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Created: {new Date(review.created_at).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No reviews yet
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
