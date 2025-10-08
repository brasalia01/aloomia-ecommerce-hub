-- Add photo support to reviews table
ALTER TABLE public.reviews
ADD COLUMN photos text[] DEFAULT '{}';

-- Create storage bucket for review photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'review-photos',
  'review-photos',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for review photos
CREATE POLICY "Anyone can view review photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'review-photos');

CREATE POLICY "Authenticated users can upload review photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'review-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own review photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'review-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add helpful_count for review voting
ALTER TABLE public.reviews
ADD COLUMN helpful_count integer DEFAULT 0;

-- Create review_votes table for tracking who found reviews helpful
CREATE TABLE public.review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(review_id, user_id)
);

ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view review votes"
ON public.review_votes
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can vote on reviews"
ON public.review_votes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their votes"
ON public.review_votes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add comparison tracking table
CREATE TABLE public.product_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  product_ids uuid[] NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.product_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their comparisons"
ON public.product_comparisons
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Guest users can manage their comparisons by session"
ON public.product_comparisons
FOR ALL
USING (session_id IS NOT NULL)
WITH CHECK (session_id IS NOT NULL);