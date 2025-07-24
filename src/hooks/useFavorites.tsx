import { useState, useEffect } from 'react';
import { supabase, type Product, type Favorite } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch favorites from Supabase
  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const addToFavorites = async (product: Product) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add favorites.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          product_id: product.id,
        });

      if (error) throw error;

      // Add to local state
      const newFavorite: Favorite = {
        id: crypto.randomUUID(),
        user_id: user.id,
        product_id: product.id,
        created_at: new Date().toISOString(),
        product,
      };
      setFavorites(prev => [...prev, newFavorite]);

      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add to favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      // Remove from local state
      setFavorites(prev => prev.filter(fav => fav.product_id !== productId));

      toast({
        title: "Removed from favorites",
        description: "Item has been removed from your favorites.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.product_id === productId);
  };

  const toggleFavorite = async (product: Product) => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    fetchFavorites,
  };
};