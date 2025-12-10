/**
 * @summary
 * Business logic for Product entity.
 * Handles CRUD operations with filtering, sorting, and pagination using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/product/productService
 */

import { PRODUCT_DEFAULTS } from '@/constants';
import { productStore } from '@/instances';
import { ServiceError } from '@/utils';
import {
  ProductEntity,
  ProductListResponse,
  ProductListItem,
  ProductListFilters,
} from './productTypes';
import { createSchema, updateSchema, paramsSchema, listQuerySchema } from './productValidation';

/**
 * @summary
 * Lists products with filtering, sorting, and pagination.
 *
 * @function productList
 * @module services/product
 *
 * @param {unknown} query - Raw query parameters to validate
 * @returns {Promise<ProductListResponse>} Paginated list of products
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When query parameters fail validation
 *
 * @example
 * const result = await productList({ category: 'sala de estar', page: 1, pageSize: 12 });
 * // Returns: { items: [...], pagination: { page: 1, pageSize: 12, total: 50, ... } }
 */
export async function productList(query: unknown): Promise<ProductListResponse> {
  const validation = listQuerySchema.safeParse(query);

  if (!validation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid query parameters',
      400,
      validation.error.errors
    );
  }

  const filters = validation.data;
  let products = productStore.getAll();

  /**
   * @rule {BR-001} Display all active products
   */
  // No filtering by active status needed - all products in store are active

  /**
   * @rule {BR-009} Apply filters immediately
   */
  // Filter by category
  if (filters.category) {
    products = products.filter((p) => p.category === filters.category);
  }

  // Filter by availability
  if (filters.available !== undefined) {
    products = products.filter((p) => p.available === filters.available);
  }

  // Filter by featured
  if (filters.featured !== undefined) {
    products = products.filter((p) => p.featured === filters.featured);
  }

  /**
   * @rule {BR-002} Featured products appear first
   * @rule {BR-012} Apply sorting
   */
  // Sort products
  const sortOrder = filters.sort || 'newest';
  products.sort((a, b) => {
    // Featured products always first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then apply selected sort
    switch (sortOrder) {
      case 'newest':
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      case 'price-desc':
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      default:
        return 0;
    }
  });

  /**
   * @rule {BR-004} Display 12 products per page in grid view
   * @rule {BR-011} Reset pagination when applying filters
   */
  const total = products.length;
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 12;
  const totalPages = Math.ceil(total / pageSize);
  const offset = (page - 1) * pageSize;

  const paginatedProducts = products.slice(offset, offset + pageSize);

  const items: ProductListItem[] = paginatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    mainImage: p.mainImage,
    price: p.price,
    category: p.category,
    featured: p.featured,
    isNew: p.isNew,
    onSale: p.onSale,
    available: p.available,
  }));

  return {
    items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

/**
 * @summary
 * Retrieves a specific product by its unique identifier.
 *
 * @function productGet
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<ProductEntity>} The found product entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product with given ID does not exist
 *
 * @example
 * const product = await productGet({ id: '1' });
 * // Returns: { id: 1, name: 'Sofá Moderno', ... }
 */
export async function productGet(params: unknown): Promise<ProductEntity> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const product = productStore.getById(id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  return product;
}

/**
 * @summary
 * Creates a new product entity with validated data.
 *
 * @function productCreate
 * @module services/product
 *
 * @param {unknown} body - Raw request body to validate against createSchema
 * @returns {Promise<ProductEntity>} The newly created product entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 *
 * @example
 * const newProduct = await productCreate({
 *   name: 'Sofá Moderno',
 *   description: 'Sofá confortável',
 *   mainImage: 'https://example.com/sofa.jpg',
 *   price: 2500.00,
 *   category: 'sala de estar'
 * });
 */
export async function productCreate(body: unknown): Promise<ProductEntity> {
  const validation = createSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;
  const now = new Date().toISOString();
  const id = productStore.getNextId();

  /**
   * @rule {RU-012} Product is considered new if created in last 30 days
   */
  const isNew = true; // New products are always marked as new on creation

  const newProduct: ProductEntity = {
    id,
    name: params.name,
    description: params.description,
    mainImage: params.mainImage,
    images: params.images || [],
    price: params.price,
    category: params.category,
    shortDescription: params.shortDescription,
    dimensions: params.dimensions,
    featured: params.featured ?? PRODUCT_DEFAULTS.FEATURED,
    isNew,
    onSale: params.onSale ?? PRODUCT_DEFAULTS.ON_SALE,
    available: params.available ?? PRODUCT_DEFAULTS.AVAILABLE,
    dateCreated: now,
    dateModified: now,
  };

  productStore.add(newProduct);
  return newProduct;
}

/**
 * @summary
 * Updates an existing product entity with new data.
 *
 * @function productUpdate
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @param {unknown} body - Raw request body with update data to validate
 * @returns {Promise<ProductEntity>} The updated product entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID or body fails validation
 * @throws {ServiceError} NOT_FOUND (404) - When product with given ID does not exist
 *
 * @example
 * const updated = await productUpdate({ id: '1' }, { name: 'Sofá Atualizado', price: 2800.00 });
 */
export async function productUpdate(params: unknown, body: unknown): Promise<ProductEntity> {
  const paramsValidation = paramsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = productStore.getById(id);

  if (!existing) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  const updateData = bodyValidation.data;

  /**
   * @rule {RU-012} Check if product is still new (within 30 days)
   */
  const createdDate = new Date(existing.dateCreated);
  const now = new Date();
  const daysSinceCreation = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isNew = daysSinceCreation <= 30;

  const updated = productStore.update(id, {
    name: updateData.name,
    description: updateData.description,
    mainImage: updateData.mainImage,
    images: updateData.images || existing.images,
    price: updateData.price,
    category: updateData.category,
    shortDescription: updateData.shortDescription,
    dimensions: updateData.dimensions,
    featured: updateData.featured,
    isNew,
    onSale: updateData.onSale,
    available: updateData.available,
    dateModified: now.toISOString(),
  });

  return updated as ProductEntity;
}

/**
 * @summary
 * Permanently deletes a product entity by its ID.
 *
 * @function productDelete
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<{ message: string }>} Success confirmation message
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product with given ID does not exist
 *
 * @example
 * const result = await productDelete({ id: '1' });
 * // Returns: { message: 'Product deleted successfully' }
 */
export async function productDelete(params: unknown): Promise<{ message: string }> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;

  if (!productStore.exists(id)) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  productStore.delete(id);
  return { message: 'Product deleted successfully' };
}
