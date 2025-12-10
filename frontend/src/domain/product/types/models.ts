/**
 * Product domain type definitions
 * Represents the product entity and related types
 */

export interface Product {
  id: number;
  name: string;
  description: string | null;
  mainImage: string;
  images: string[];
  price: number | null;
  category: string;
  shortDescription: string | null;
  dimensions: string | null;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  available: boolean;
  dateCreated: string;
  dateModified: string;
}

export interface ProductListItem {
  id: number;
  name: string;
  mainImage: string;
  price: number | null;
  category: string;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  available: boolean;
}

export interface ProductFilters {
  category?: string;
  available?: boolean;
  featured?: boolean;
}

export interface ProductSort {
  sort?: 'newest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ProductListResponse {
  items: ProductListItem[];
  pagination: PaginationMeta;
}

export type ViewMode = 'grid' | 'list';

export interface CatalogState {
  filters: ProductFilters;
  sort: ProductSort['sort'];
  page: number;
  pageSize: number;
  viewMode: ViewMode;
  scrollPosition: number;
}
