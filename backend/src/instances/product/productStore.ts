/**
 * @summary
 * In-memory store instance for Product entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/product/productStore
 */

import { PRODUCT_DEFAULTS } from '@/constants/product';

/**
 * Product record structure
 */
export interface ProductRecord {
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
 * In-memory store for Product records
 */
class ProductStore {
  private records: Map<number, ProductRecord> = new Map();
  private currentId: number = 0;

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all records
   */
  getAll(): ProductRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): ProductRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: ProductRecord): ProductRecord {
    if (this.records.size >= PRODUCT_DEFAULTS.MAX_RECORDS) {
      throw new Error('Maximum products limit reached');
    }
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<ProductRecord>): ProductRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size;
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of ProductStore
 */
export const productStore = new ProductStore();
