import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewFormProps {
  productId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ReviewForm = ({ productId, onSuccess, onCancel }: ReviewFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).slice(0, 5 - photos.length);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to leave a review',
        variant: 'destructive',
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a star rating',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const photoUrls: string[] = [];

      // Upload photos if any
      if (photos.length > 0) {
        for (const photo of photos) {
          const fileExt = photo.name.split('.').pop();
          const fileName = `${user.id}/${Date.now()}-${Math.random()}.${fileExt}`;
          
          const { error: uploadError, data } = await supabase.storage
            .from('review-photos')
            .upload(fileName, photo);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('review-photos')
            .getPublicUrl(fileName);

          photoUrls.push(publicUrl);
        }
      }

      // Create review
      const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        user_id: user.id,
        rating,
        title,
        body,
        photos: photoUrls,
      });

      if (error) throw error;

      toast({
        title: 'Review submitted',
        description: 'Thank you for your feedback!',
      });

      onSuccess();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Rating *</Label>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="title">Review Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience"
          required
          maxLength={100}
        />
      </div>

      <div>
        <Label htmlFor="body">Review</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts about this product..."
          rows={5}
          maxLength={1000}
        />
      </div>

      <div>
        <Label>Photos (Optional)</Label>
        <div className="mt-2 space-y-3">
          {photos.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Review ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {photos.length < 5 && (
            <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="w-5 h-5" />
              <span className="text-sm">Add photos ({photos.length}/5)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={uploading} className="flex-1">
          {uploading ? 'Submitting...' : 'Submit Review'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};