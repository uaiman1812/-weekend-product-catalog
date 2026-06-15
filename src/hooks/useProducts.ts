import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '../services/api';

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}