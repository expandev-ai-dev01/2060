/**
 * @summary
 * Centralized service exports.
 * Provides single import point for all business logic services.
 *
 * @module services
 */

export {
  initExampleCreate,
  initExampleList,
  initExampleGet,
  initExampleUpdate,
  initExampleDelete,
} from './initExample';

export { productList, productGet, productCreate, productUpdate, productDelete } from './product';

export type {
  InitExampleEntity,
  InitExampleListResponse,
  InitExampleMetadata,
  InitExampleCreateRequest,
  InitExampleUpdateRequest,
} from './initExample';

export type {
  ProductEntity,
  ProductListItem,
  ProductListResponse,
  ProductCreateRequest,
  ProductUpdateRequest,
  ProductListFilters,
} from './product';

export type {
  CreateInput as InitExampleCreateInput,
  UpdateInput as InitExampleUpdateInput,
  ParamsInput as InitExampleParamsInput,
  MetadataInput as InitExampleMetadataInput,
} from './initExample';

export type {
  CreateInput as ProductCreateInput,
  UpdateInput as ProductUpdateInput,
  ParamsInput as ProductParamsInput,
  ListQueryInput as ProductListQueryInput,
} from './product';
