import type { ProductFilters, ProductSort, PaginationParams } from '../../types/models';

export interface UseProductListOptions {
  filters?: ProductFilters;
  sort?: ProductSort['sort'];
  page?: number;
  pageSize?: number;
}

export type UseProductListParams = ProductFilters & ProductSort & PaginationParams;
