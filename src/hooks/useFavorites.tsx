import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('aloomia-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (item: FavoriteItem) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
    localStorage.setItem('aloomia-favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('aloomia-favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};