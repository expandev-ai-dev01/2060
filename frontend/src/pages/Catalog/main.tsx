/**
 * Catalog Page
 * Main product catalog page with filters, sorting, and pagination
 */

import { useEffect } from 'react';
import { cn } from '@/core/lib/utils';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from '@/core/components/empty';
import { Skeleton } from '@/core/components/skeleton';
import { PackageIcon, FilterIcon } from 'lucide-react';
import { Button } from '@/core/components/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/core/components/sheet';
import {
  ProductCard,
  CatalogFilters,
  CatalogSort,
  CatalogPagination,
  ViewModeToggle,
  useProductList,
  useCatalogStore,
} from '@/domain/product/_module';

function CatalogPage() {
  const {
    filters,
    sort,
    page,
    pageSize,
    viewMode,
    scrollPosition,
    setFilters,
    setSort,
    setPage,
    setPageSize,
    setViewMode,
    setScrollPosition,
    clearFilters,
  } = useCatalogStore();

  const { products, pagination, isLoading, isError } = useProductList({
    filters,
    sort,
    page,
    pageSize,
  });

  // Restore scroll position when returning to catalog
  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  // Save scroll position before navigating away
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollPosition]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <Empty className="min-h-[400px]">
        <EmptyHeader>
          <EmptyTitle>Ocorreu um erro ao carregar os produtos</EmptyTitle>
          <EmptyDescription>
            Por favor, tente novamente ou entre em contato com o suporte se o problema persistir.
          </EmptyDescription>
        </EmptyHeader>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </Empty>
    );
  }

  // No products state
  if (!products || products.length === 0) {
    const hasFilters = Object.values(filters).some((value) => value !== undefined);

    return (
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <FilterIcon />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CatalogFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <PackageIcon className="size-12 text-muted-foreground mx-auto" />
            <EmptyTitle>
              {hasFilters
                ? 'Nenhum produto encontrado com os filtros selecionados'
                : 'Não há produtos disponíveis no momento'}
            </EmptyTitle>
            <EmptyDescription>
              {hasFilters ? (
                <>
                  Tente ajustar seus critérios de busca ou{' '}
                  <button
                    onClick={clearFilters}
                    className="text-primary underline underline-offset-4 hover:no-underline"
                  >
                    clique aqui para limpar os filtros
                  </button>
                  .
                </>
              ) : (
                'Novos produtos serão adicionados em breve.'
              )}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
        <div className="flex items-center gap-3">
          <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <FilterIcon />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <CatalogFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CatalogSort sort={sort ?? 'newest'} onSortChange={setSort} />
        {pagination && (
          <div className="text-muted-foreground text-sm">
            {pagination.total} {pagination.total === 1 ? 'produto' : 'produtos'} encontrado
            {pagination.total !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Filters sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 sm:block">
          <CatalogFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
        </aside>

        {/* Products grid/list */}
        <div className="flex-1">
          <div
            className={cn(
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            )}
            role="list"
            aria-label="Lista de produtos"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8">
              <CatalogPagination
                pagination={pagination}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { CatalogPage };
