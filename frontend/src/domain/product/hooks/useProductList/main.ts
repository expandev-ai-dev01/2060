/**
 * Product list hook with React Query integration
 * Manages server state for product catalog
 */

import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions } from './types';

export const useProductList = (options: UseProductListOptions = {}) => {
  const { filters, sort = 'newest', page = 1, pageSize = 12 } = options;

  const queryKey = ['products', { filters, sort, page, pageSize }];

  const query = useQuery({
    queryKey,
    queryFn: () => productService.list({ ...filters, sort, page, pageSize }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    products: query.data?.items ?? [],
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
