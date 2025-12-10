import type { PaginationMeta } from '../../types/models';

export interface CatalogPaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
}

export const PAGE_SIZE_OPTIONS = [12, 24, 36, 48] as const;
