/**
 * @service Product Service
 * @domain product
 * @type REST API Integration
 *
 * Handles all product-related API operations for the catalog
 */

import { authenticatedClient } from '@/core/lib/api';
import type {
  ProductListResponse,
  Product,
  ProductFilters,
  ProductSort,
  PaginationParams,
} from '../types/models';

export const productService = {
  /**
   * List products with filters, sorting, and pagination
   */
  async list(
    params?: ProductFilters & ProductSort & PaginationParams
  ): Promise<ProductListResponse> {
    const { data } = await authenticatedClient.get('/product', { params });
    return data.data;
  },

  /**
   * Get single product by ID
   */
  async getById(id: number): Promise<Product> {
    const { data } = await authenticatedClient.get(`/product/${id}`);
    return data.data;
  },
};
