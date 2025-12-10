/**
 * Catalog Pagination Component
 * Provides pagination controls for the product catalog
 */

import { cn } from '@/core/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/core/components/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import type { CatalogPaginationProps } from './types';
import { PAGE_SIZE_OPTIONS } from './types';

function CatalogPagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  className,
}: CatalogPaginationProps) {
  const { page, pageSize, total, totalPages, hasNext, hasPrevious } = pagination;

  // Generate page numbers to display (max 5 numbered links)
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={cn('flex flex-col items-center gap-4 sm:flex-row sm:justify-between', className)}
      role="navigation"
      aria-label="Paginação do catálogo"
    >
      {/* Results count */}
      <div className="text-muted-foreground text-sm">
        Mostrando {(page - 1) * pageSize + 1} a {Math.min(page * pageSize, total)} de {total}{' '}
        produtos
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Itens por página:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-[80px]" size="sm" aria-label="Selecionar itens por página">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => hasPrevious && onPageChange(page - 1)}
                aria-disabled={!hasPrevious}
                className={cn(!hasPrevious && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>

            {pageNumbers.map((pageNum, index) =>
              pageNum === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={pageNum === page}
                    aria-current={pageNum === page ? 'page' : undefined}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => hasNext && onPageChange(page + 1)}
                aria-disabled={!hasNext}
                className={cn(!hasNext && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export { CatalogPagination };
