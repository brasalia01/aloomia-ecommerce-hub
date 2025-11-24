import { useEffect, useState } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Review {
  id: string;
  rating: number;
  title: string;
  body: string;
  photos: string[];
  helpful_count: number;
  is_verified: boolean;
  created_at: string;
  profiles: {
    full_name: string;
  };
  user_voted?: boolean;
}

interface ReviewListProps {
  productId: string;
}

type SortOption = 'most-helpful' | 'highest-rated' | 'most-recent';

export const ReviewList = ({ productId }: ReviewListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('most-helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [reviews, sortBy, filterRating]);

  const applyFiltersAndSort = () => {
    let filtered = [...reviews];

    // Apply rating filter
    if (filterRating !== null) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'most-helpful':
        filtered.sort((a, b) => b.helpful_count - a.helpful_count);
        break;
      case 'highest-rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'most-recent':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    setFilteredReviews(filtered);
  };

  const loadReviews = async () => {
    try {
      const { data: reviewsData, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get profile data separately
      const userIds = reviewsData?.map(r => r.user_id) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

      // Check if user has voted on reviews
      let votedReviewIds = new Set<string>();
      if (user) {
        const { data: votes } = await supabase
          .from('review_votes')
          .select('review_id')
          .eq('user_id', user.id);

        votedReviewIds = new Set(votes?.map(v => v.review_id) || []);
      }

      const formattedReviews: Review[] = (reviewsData || []).map(review => ({
        ...review,
        profiles: {
          full_name: profilesMap.get(review.user_id)?.full_name || 'Anonymous'
        },
        user_voted: votedReviewIds.has(review.id),
      }));
        
      setReviews(formattedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string, currentlyVoted: boolean) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to vote',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (currentlyVoted) {
        // Remove vote
        await supabase
          .from('review_votes')
          .delete()
          .eq('review_id', reviewId)
          .eq('user_id', user.id);

        // Decrement helpful count
        const { data: review } = await supabase
          .from('reviews')
          .select('helpful_count')
          .eq('id', reviewId)
          .single();

        if (review) {
          await supabase
            .from('reviews')
            .update({ helpful_count: Math.max(0, review.helpful_count - 1) })
            .eq('id', reviewId);
        }
      } else {
        // Add vote
        await supabase.from('review_votes').insert({
          review_id: reviewId,
          user_id: user.id,
          vote_type: 'helpful'
        });

        // Increment helpful count
        const { data: review } = await supabase
          .from('reviews')
          .select('helpful_count')
          .eq('id', reviewId)
          .single();

        if (review) {
          await supabase
            .from('reviews')
            .update({ helpful_count: review.helpful_count + 1 })
            .eq('id', reviewId);
        }
      }

      loadReviews();
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: 'Error',
        description: 'Failed to record vote',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterRating === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterRating(null)}
          >
            All Reviews
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filterRating === rating ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRating(rating)}
              className="gap-1"
            >
              {rating} <Star className="w-3 h-3 fill-current" />
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most-helpful">Most Helpful</SelectItem>
              <SelectItem value="highest-rated">Highest Rated</SelectItem>
              <SelectItem value="most-recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reviews match your filter criteria.</p>
        </div>
      ) : (
        <>
          {filteredReviews.map((review) => (
        <Card key={review.id} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">{review.profiles?.full_name || 'Anonymous'}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  {review.is_verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>

          <h4 className="font-semibold mb-2">{review.title}</h4>
          {review.body && <p className="text-sm text-muted-foreground mb-4">{review.body}</p>}

          {review.photos && review.photos.length > 0 && (
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {review.photos.map((photo, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <button className="flex-shrink-0">
                      <img
                        src={photo}
                        alt={`Review ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <img
                      src={photo}
                      alt={`Review ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleHelpful(review.id, review.user_voted || false)}
            className="gap-2"
          >
            <ThumbsUp className={`w-4 h-4 ${review.user_voted ? 'fill-current' : ''}`} />
            Helpful ({review.helpful_count})
          </Button>
        </Card>
          ))}
        </>
      )}
    </div>
  );
};