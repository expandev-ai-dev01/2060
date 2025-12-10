/**
 * Product domain module exports
 * Central export point for all product-related functionality
 */

// Components
export * from './components';

// Services
export * from './services';

// Hooks
export * from './hooks';

// Stores
export * from './stores';

// Types (explicit exports with renames to avoid collisions)
export type {
  Product,
  ProductListItem,
  ProductFilters as ProductFiltersType,
  ProductSort,
  PaginationParams,
  PaginationMeta,
  ProductListResponse,
  ViewMode,
  CatalogState,
} from './types';
