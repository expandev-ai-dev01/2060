/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as productController from '@/api/internal/product/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Product routes - /api/internal/product
 */
router.get('/product', productController.listHandler);
router.post('/product', productController.createHandler);
router.get('/product/:id', productController.getHandler);
router.put('/product/:id', productController.updateHandler);
router.delete('/product/:id', productController.deleteHandler);

export default router;
