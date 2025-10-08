import { useState, useEffect } from 'react';
import { Product } from '@/components/Products/ProductCard';

const COMPARISON_KEY = 'aloomia-comparison';
const MAX_COMPARE = 4;

export const useProductComparison = () => {
  const [compareList, setCompareList] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(COMPARISON_KEY);
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading comparison list:', error);
      }
    }
  }, []);

  const saveToStorage = (products: Product[]) => {
    localStorage.setItem(COMPARISON_KEY, JSON.stringify(products));
    setCompareList(products);
  };

  const addToCompare = (product: Product) => {
    if (compareList.length >= MAX_COMPARE) {
      return { success: false, message: `You can only compare up to ${MAX_COMPARE} products` };
    }
    
    if (compareList.find(p => p.id === product.id)) {
      return { success: false, message: 'Product already in comparison' };
    }

    const newList = [...compareList, product];
    saveToStorage(newList);
    return { success: true, message: 'Added to comparison' };
  };

  const removeFromCompare = (productId: string) => {
    const newList = compareList.filter(p => p.id !== productId);
    saveToStorage(newList);
  };

  const clearCompare = () => {
    saveToStorage([]);
  };

  const isInCompare = (productId: string) => {
    return compareList.some(p => p.id === productId);
  };

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    canAddMore: compareList.length < MAX_COMPARE,
    count: compareList.length,
  };
};