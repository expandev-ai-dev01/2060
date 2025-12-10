/**
 * View Mode Toggle Component
 * Allows switching between grid and list view modes
 */

import { cn } from '@/core/lib/utils';
import { Button } from '@/core/components/button';
import { LayoutGridIcon, ListIcon } from 'lucide-react';
import type { ViewModeToggleProps } from './types';

function ViewModeToggle({ viewMode, onViewModeChange, className }: ViewModeToggleProps) {
  return (
    <div
      className={cn('flex items-center gap-1 rounded-lg border p-1', className)}
      role="group"
      aria-label="Modo de visualização"
    >
      <Button
        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
        size="icon-sm"
        onClick={() => onViewModeChange('grid')}
        aria-label="Visualização em grade"
        aria-pressed={viewMode === 'grid'}
      >
        <LayoutGridIcon />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
        size="icon-sm"
        onClick={() => onViewModeChange('list')}
        aria-label="Visualização em lista"
        aria-pressed={viewMode === 'list'}
      >
        <ListIcon />
      </Button>
    </div>
  );
}

export { ViewModeToggle };
