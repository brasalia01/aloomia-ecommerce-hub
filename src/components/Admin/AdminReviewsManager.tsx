import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star, CheckCircle, XCircle, Eye, MessageSquare } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  photos: string[];
  is_approved: boolean;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  featured_testimonial?: boolean;
  profiles?: {
    full_name: string;
    email: string;
  };
  products?: {
    title: string;
  };
}

export default function AdminReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (full_name, email),
          products:product_id (title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (reviewId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: !currentStatus })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Review ${!currentStatus ? 'approved' : 'rejected'}`,
      });

      loadReviews();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleTestimonial = async (reviewId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ featured_testimonial: !currentStatus })
        .eq('id', reviewId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Review ${!currentStatus ? 'added to' : 'removed from'} testimonials`,
      });

      loadReviews();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Reviews & Testimonials
          </CardTitle>
          <CardDescription>
            Manage customer reviews and select testimonials for your homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reviews yet
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.profiles?.full_name}</div>
                          <div className="text-sm text-muted-foreground">{review.profiles?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{review.products?.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium text-sm truncate">{review.title}</div>
                          <div className="text-sm text-muted-foreground truncate">{review.body}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(review.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                            {review.is_approved ? 'Approved' : 'Pending'}
                          </Badge>
                          {review.featured_testimonial && (
                            <Badge variant="outline" className="bg-yellow-50">
                              Testimonial
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedReview(review)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={review.is_approved ? 'destructive' : 'default'}
                            onClick={() => toggleApproval(review.id, review.is_approved)}
                          >
                            {review.is_approved ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant={review.featured_testimonial ? 'secondary' : 'outline'}
                            onClick={() => toggleTestimonial(review.id, review.featured_testimonial || false)}
                            disabled={!review.is_approved}
                          >
                            {review.featured_testimonial ? '★' : '☆'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Details Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Full review information
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Customer</h4>
                <p>{selectedReview.profiles?.full_name} ({selectedReview.profiles?.email})</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Product</h4>
                <p>{selectedReview.products?.title}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Rating</h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < selectedReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Title</h4>
                <p>{selectedReview.title}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Review</h4>
                <p className="text-sm text-muted-foreground">{selectedReview.body}</p>
              </div>

              {selectedReview.photos && selectedReview.photos.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Photos</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedReview.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => {
                    toggleApproval(selectedReview.id, selectedReview.is_approved);
                    setSelectedReview(null);
                  }}
                  variant={selectedReview.is_approved ? 'destructive' : 'default'}
                >
                  {selectedReview.is_approved ? 'Reject' : 'Approve'}
                </Button>
                <Button
                  onClick={() => {
                    toggleTestimonial(selectedReview.id, selectedReview.featured_testimonial || false);
                    setSelectedReview(null);
                  }}
                  variant="outline"
                  disabled={!selectedReview.is_approved}
                >
                  {selectedReview.featured_testimonial ? 'Remove from Testimonials' : 'Add to Testimonials'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
