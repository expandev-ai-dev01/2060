/**
 * @summary
 * Type definitions for Product entity.
 *
 * @module services/product/productTypes
 */

/**
 * @interface ProductEntity
 * @description Represents a product entity in the catalog
 */
export interface ProductEntity {
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

/**
 * @interface ProductListItem
 * @description Product data for catalog list view
 */
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

/**
 * @interface ProductListResponse
 * @description Response structure for product listing with pagination
 */
export interface ProductListResponse {
  items: ProductListItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * @interface ProductCreateRequest
 * @description Request payload for creating a product
 */
export interface ProductCreateRequest {
  name: string;
  description: string | null;
  mainImage: string;
  images?: string[];
  price: number | null;
  category: string;
  shortDescription: string | null;
  dimensions: string | null;
  featured?: boolean;
  onSale?: boolean;
  available?: boolean;
}

/**
 * @interface ProductUpdateRequest
 * @description Request payload for updating a product
 */
export interface ProductUpdateRequest {
  name: string;
  description: string | null;
  mainImage: string;
  images?: string[];
  price: number | null;
  category: string;
  shortDescription: string | null;
  dimensions: string | null;
  featured: boolean;
  onSale: boolean;
  available: boolean;
}

/**
 * @interface ProductListFilters
 * @description Filters for product listing
 */
export interface ProductListFilters {
  category?: string;
  sort?: 'newest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
  available?: boolean;
  featured?: boolean;
}
