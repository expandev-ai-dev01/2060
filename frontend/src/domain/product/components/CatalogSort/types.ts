export interface CatalogSortProps {
  sort: 'newest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
  onSortChange: (sort: CatalogSortProps['sort']) => void;
  className?: string;
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Mais recentes' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'price-asc', label: 'Preço (menor-maior)' },
  { value: 'price-desc', label: 'Preço (maior-menor)' },
] as const;
