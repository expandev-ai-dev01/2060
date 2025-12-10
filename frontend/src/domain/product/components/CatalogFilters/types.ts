import type { ProductFilters } from '../../types/models';

export interface CatalogFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

export const CATEGORIES = [
  'Sala de estar',
  'Quarto',
  'Cozinha',
  'Escritório',
  'Banheiro',
  'Área externa',
] as const;
