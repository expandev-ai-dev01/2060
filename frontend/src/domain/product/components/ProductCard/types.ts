import type { ProductListItem } from '../../types/models';

export interface ProductCardProps {
  product: ProductListItem;
  viewMode?: 'grid' | 'list';
  className?: string;
}
