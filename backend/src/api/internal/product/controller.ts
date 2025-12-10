/**
 * @summary
 * API controller for Product entity.
 * Handles catalog display operations with filtering, sorting, and pagination.
 *
 * @module api/internal/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  productList,
  productGet,
  productCreate,
  productUpdate,
  productDelete,
} from '@/services/product';

/**
 * @api {get} /api/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 *
 * @apiQuery {String} [category] Filter by category
 * @apiQuery {String} [sort] Sort order (newest | name-asc | name-desc | price-asc | price-desc)
 * @apiQuery {Number} [page=1] Page number
 * @apiQuery {Number} [pageSize=12] Items per page (12, 24, 36, 48)
 * @apiQuery {Boolean} [available] Filter by availability
 * @apiQuery {Boolean} [featured] Filter by featured products
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data.items List of products
 * @apiSuccess {Number} data.items.id Unique identifier
 * @apiSuccess {String} data.items.name Product name
 * @apiSuccess {String} data.items.mainImage Main image URL
 * @apiSuccess {Number|null} data.items.price Product price
 * @apiSuccess {String} data.items.category Product category
 * @apiSuccess {Boolean} data.items.featured Featured status
 * @apiSuccess {Boolean} data.items.isNew New product status
 * @apiSuccess {Boolean} data.items.onSale On sale status
 * @apiSuccess {Boolean} data.items.available Availability status
 * @apiSuccess {Number} data.pagination.page Current page
 * @apiSuccess {Number} data.pagination.pageSize Items per page
 * @apiSuccess {Number} data.pagination.total Total items
 * @apiSuccess {Number} data.pagination.totalPages Total pages
 * @apiSuccess {Boolean} data.pagination.hasNext Has next page
 * @apiSuccess {Boolean} data.pagination.hasPrevious Has previous page
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productList(req.query);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/product/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String|null} data.description Product description
 * @apiSuccess {String} data.mainImage Main image URL
 * @apiSuccess {String[]} data.images Additional images
 * @apiSuccess {Number|null} data.price Product price
 * @apiSuccess {String} data.category Product category
 * @apiSuccess {String|null} data.shortDescription Short description
 * @apiSuccess {String|null} data.dimensions Product dimensions
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {Boolean} data.isNew New product status
 * @apiSuccess {Boolean} data.onSale On sale status
 * @apiSuccess {Boolean} data.available Availability status
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/product Create Product
 * @apiName CreateProduct
 * @apiGroup Product
 *
 * @apiBody {String} name Product name (1-60 chars)
 * @apiBody {String|null} description Product description (max 500 chars)
 * @apiBody {String} mainImage Main image URL
 * @apiBody {String[]} [images] Additional images
 * @apiBody {Number|null} price Product price
 * @apiBody {String} category Product category
 * @apiBody {String|null} shortDescription Short description (max 150 chars)
 * @apiBody {String|null} dimensions Product dimensions
 * @apiBody {Boolean} [featured=false] Featured status
 * @apiBody {Boolean} [onSale=false] On sale status
 * @apiBody {Boolean} [available=true] Availability status
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String|null} data.description Product description
 * @apiSuccess {String} data.mainImage Main image URL
 * @apiSuccess {String[]} data.images Additional images
 * @apiSuccess {Number|null} data.price Product price
 * @apiSuccess {String} data.category Product category
 * @apiSuccess {String|null} data.shortDescription Short description
 * @apiSuccess {String|null} data.dimensions Product dimensions
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {Boolean} data.isNew New product status
 * @apiSuccess {Boolean} data.onSale On sale status
 * @apiSuccess {Boolean} data.available Availability status
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productCreate(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/product/:id Update Product
 * @apiName UpdateProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Product ID
 *
 * @apiBody {String} name Product name (1-60 chars)
 * @apiBody {String|null} description Product description (max 500 chars)
 * @apiBody {String} mainImage Main image URL
 * @apiBody {String[]} [images] Additional images
 * @apiBody {Number|null} price Product price
 * @apiBody {String} category Product category
 * @apiBody {String|null} shortDescription Short description (max 150 chars)
 * @apiBody {String|null} dimensions Product dimensions
 * @apiBody {Boolean} featured Featured status
 * @apiBody {Boolean} onSale On sale status
 * @apiBody {Boolean} available Availability status
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String|null} data.description Product description
 * @apiSuccess {String} data.mainImage Main image URL
 * @apiSuccess {String[]} data.images Additional images
 * @apiSuccess {Number|null} data.price Product price
 * @apiSuccess {String} data.category Product category
 * @apiSuccess {String|null} data.shortDescription Short description
 * @apiSuccess {String|null} data.dimensions Product dimensions
 * @apiSuccess {Boolean} data.featured Featured status
 * @apiSuccess {Boolean} data.isNew New product status
 * @apiSuccess {Boolean} data.onSale On sale status
 * @apiSuccess {Boolean} data.available Availability status
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 * @apiSuccess {String} data.dateModified ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/product/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.message Confirmation message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
