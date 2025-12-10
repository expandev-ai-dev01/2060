/**
 * @summary
 * Validation schemas for Product entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/product/productValidation
 */

import { z } from 'zod';
import { PRODUCT_LIMITS, PRODUCT_CATEGORIES } from '@/constants';

/**
 * Schema for create request validation
 */
export const createSchema = z.object({
  name: z.string().min(1).max(PRODUCT_LIMITS.NAME_MAX_LENGTH),
  description: z.string().max(PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH).nullable(),
  mainImage: z.string().url(),
  images: z.array(z.string().url()).optional().default([]),
  price: z.number().positive().nullable(),
  category: z.enum([
    PRODUCT_CATEGORIES.LIVING_ROOM,
    PRODUCT_CATEGORIES.BEDROOM,
    PRODUCT_CATEGORIES.KITCHEN,
    PRODUCT_CATEGORIES.OFFICE,
    PRODUCT_CATEGORIES.BATHROOM,
    PRODUCT_CATEGORIES.OUTDOOR,
  ]),
  shortDescription: z.string().max(PRODUCT_LIMITS.SHORT_DESCRIPTION_MAX_LENGTH).nullable(),
  dimensions: z.string().max(PRODUCT_LIMITS.DIMENSIONS_MAX_LENGTH).nullable(),
  featured: z.boolean().optional().default(false),
  onSale: z.boolean().optional().default(false),
  available: z.boolean().optional().default(true),
});

/**
 * Schema for update request validation
 */
export const updateSchema = z.object({
  name: z.string().min(1).max(PRODUCT_LIMITS.NAME_MAX_LENGTH),
  description: z.string().max(PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH).nullable(),
  mainImage: z.string().url(),
  images: z.array(z.string().url()).optional().default([]),
  price: z.number().positive().nullable(),
  category: z.enum([
    PRODUCT_CATEGORIES.LIVING_ROOM,
    PRODUCT_CATEGORIES.BEDROOM,
    PRODUCT_CATEGORIES.KITCHEN,
    PRODUCT_CATEGORIES.OFFICE,
    PRODUCT_CATEGORIES.BATHROOM,
    PRODUCT_CATEGORIES.OUTDOOR,
  ]),
  shortDescription: z.string().max(PRODUCT_LIMITS.SHORT_DESCRIPTION_MAX_LENGTH).nullable(),
  dimensions: z.string().max(PRODUCT_LIMITS.DIMENSIONS_MAX_LENGTH).nullable(),
  featured: z.boolean(),
  onSale: z.boolean(),
  available: z.boolean(),
});

/**
 * Schema for ID parameter validation
 */
export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Schema for list query parameters validation
 */
export const listQuerySchema = z.object({
  category: z
    .enum([
      PRODUCT_CATEGORIES.LIVING_ROOM,
      PRODUCT_CATEGORIES.BEDROOM,
      PRODUCT_CATEGORIES.KITCHEN,
      PRODUCT_CATEGORIES.OFFICE,
      PRODUCT_CATEGORIES.BATHROOM,
      PRODUCT_CATEGORIES.OUTDOOR,
    ])
    .optional(),
  sort: z.enum(['newest', 'name-asc', 'name-desc', 'price-asc', 'price-desc']).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce
    .number()
    .int()
    .refine((val) => [12, 24, 36, 48].includes(val), {
      message: 'Page size must be 12, 24, 36, or 48',
    })
    .optional()
    .default(12),
  available: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  featured: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
});

/**
 * Inferred types from schemas
 */
export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
export type ListQueryInput = z.infer<typeof listQuerySchema>;
