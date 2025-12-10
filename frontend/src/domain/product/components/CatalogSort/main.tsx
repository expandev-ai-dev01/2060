/**
 * Catalog Sort Component
 * Provides sorting options for the product catalog
 */

import { cn } from '@/core/lib/utils';
import { Label } from '@/core/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import type { CatalogSortProps } from './types';
import { SORT_OPTIONS } from './types';

function CatalogSort({ sort, onSortChange, className }: CatalogSortProps) {
  return (
    <div
      className={cn('flex items-center gap-3', className)}
      role="group"
      aria-label="Ordenação do catálogo"
    >
      <Label htmlFor="sort-select" className="whitespace-nowrap">
        Ordenar por:
      </Label>
      <Select
        value={sort}
        onValueChange={(value) => onSortChange(value as CatalogSortProps['sort'])}
      >
        <SelectTrigger id="sort-select" className="w-[200px]" aria-label="Selecionar ordenação">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { CatalogSort };
