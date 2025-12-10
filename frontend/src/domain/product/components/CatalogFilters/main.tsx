/**
 * Catalog Filters Component
 * Provides filtering options for the product catalog
 */

import { cn } from '@/core/lib/utils';
import { Button } from '@/core/components/button';
import { Checkbox } from '@/core/components/checkbox';
import { Label } from '@/core/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Separator } from '@/core/components/separator';
import { XIcon } from 'lucide-react';
import type { CatalogFiltersProps } from './types';
import { CATEGORIES } from './types';

function CatalogFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: CatalogFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  return (
    <div
      className={cn('flex flex-col gap-6 rounded-lg border p-6', className)}
      role="search"
      aria-label="Filtros do catálogo"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            aria-label="Limpar todos os filtros"
          >
            <XIcon />
            Limpar
          </Button>
        )}
      </div>

      <Separator />

      {/* Category Filter */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="category-filter">Categoria</Label>
        <Select
          value={filters.category ?? 'all'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              category: value === 'all' ? undefined : value,
            })
          }
        >
          <SelectTrigger id="category-filter" aria-label="Selecionar categoria">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Availability Filter */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="available-filter"
          checked={filters.available ?? false}
          onCheckedChange={(checked) =>
            onFiltersChange({
              ...filters,
              available: checked === true ? true : undefined,
            })
          }
          aria-label="Filtrar apenas produtos disponíveis"
        />
        <Label htmlFor="available-filter" className="cursor-pointer">
          Apenas disponíveis
        </Label>
      </div>

      {/* Featured Filter */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="featured-filter"
          checked={filters.featured ?? false}
          onCheckedChange={(checked) =>
            onFiltersChange({
              ...filters,
              featured: checked === true ? true : undefined,
            })
          }
          aria-label="Filtrar apenas produtos em destaque"
        />
        <Label htmlFor="featured-filter" className="cursor-pointer">
          Apenas destaques
        </Label>
      </div>
    </div>
  );
}

export { CatalogFilters };
