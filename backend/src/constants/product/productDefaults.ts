/**
 * @summary
 * Default values and constants for Product entity.
 * Provides centralized configuration for product creation, validation limits,
 * and category definitions.
 *
 * @module constants/product/productDefaults
 */

/**
 * @interface ProductDefaultsType
 * @description Default configuration values applied when creating new Product entities.
 *
 * @property {boolean} AVAILABLE - Default availability status for new products (true)
 * @property {boolean} FEATURED - Default featured status for new products (false)
 * @property {boolean} ON_SALE - Default on sale status for new products (false)
 * @property {number} MAX_RECORDS - Maximum number of products allowed in memory storage (10000)
 */
export const PRODUCT_DEFAULTS = {
  /** Default availability status for new products */
  AVAILABLE: true,
  /** Default featured status for new products */
  FEATURED: false,
  /** Default on sale status for new products */
  ON_SALE: false,
  /** Maximum allowed products in memory */
  MAX_RECORDS: 10000,
} as const;

/** Type representing the PRODUCT_DEFAULTS constant */
export type ProductDefaultsType = typeof PRODUCT_DEFAULTS;

/**
 * @interface ProductCategoriesType
 * @description Available product categories for furniture catalog.
 *
 * @property {string} LIVING_ROOM - Living room furniture category ('sala de estar')
 * @property {string} BEDROOM - Bedroom furniture category ('quarto')
 * @property {string} KITCHEN - Kitchen furniture category ('cozinha')
 * @property {string} OFFICE - Office furniture category ('escritório')
 * @property {string} BATHROOM - Bathroom furniture category ('banheiro')
 * @property {string} OUTDOOR - Outdoor furniture category ('área externa')
 */
export const PRODUCT_CATEGORIES = {
  LIVING_ROOM: 'sala de estar',
  BEDROOM: 'quarto',
  KITCHEN: 'cozinha',
  OFFICE: 'escritório',
  BATHROOM: 'banheiro',
  OUTDOOR: 'área externa',
} as const;

/** Type representing the PRODUCT_CATEGORIES constant */
export type ProductCategoriesType = typeof PRODUCT_CATEGORIES;

/** Union type of all valid category values */
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

/**
 * @interface ProductLimitsType
 * @description Validation constraints for Product entity fields.
 *
 * @property {number} NAME_MAX_LENGTH - Maximum characters for name field (60)
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description field (500)
 * @property {number} SHORT_DESCRIPTION_MAX_LENGTH - Maximum characters for short description (150)
 * @property {number} DIMENSIONS_MAX_LENGTH - Maximum characters for dimensions field (50)
 * @property {number} IMAGE_MAX_SIZE_MB - Maximum image file size in MB (2)
 * @property {number} IMAGE_MIN_WIDTH - Minimum image width in pixels (800)
 * @property {number} IMAGE_MIN_HEIGHT - Minimum image height in pixels (600)
 */
export const PRODUCT_LIMITS = {
  NAME_MAX_LENGTH: 60,
  DESCRIPTION_MAX_LENGTH: 500,
  SHORT_DESCRIPTION_MAX_LENGTH: 150,
  DIMENSIONS_MAX_LENGTH: 50,
  IMAGE_MAX_SIZE_MB: 2,
  IMAGE_MIN_WIDTH: 800,
  IMAGE_MIN_HEIGHT: 600,
} as const;

/** Type representing the PRODUCT_LIMITS constant */
export type ProductLimitsType = typeof PRODUCT_LIMITS;
