/**
 * Catalog state management with Zustand
 * Manages client-side catalog state (filters, view mode, pagination)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CatalogState, ProductFilters, ViewMode } from '../types/models';

interface CatalogStore extends CatalogState {
  setFilters: (filters: ProductFilters) => void;
  setSort: (sort: CatalogState['sort']) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setScrollPosition: (position: number) => void;
  clearFilters: () => void;
  resetPagination: () => void;
}

const initialState: CatalogState = {
  filters: {},
  sort: 'newest',
  page: 1,
  pageSize: 12,
  viewMode: 'grid',
  scrollPosition: 0,
};

export const useCatalogStore = create<CatalogStore>()(
  persist(
    (set) => ({
      ...initialState,

      setFilters: (filters) =>
        set(() => ({
          filters: { ...filters },
          page: 1, // Reset to first page when filters change
        })),

      setSort: (sort) =>
        set(() => ({
          sort,
          page: 1, // Reset to first page when sort changes
        })),

      setPage: (page) => set({ page }),

      setPageSize: (pageSize) =>
        set((state) => {
          // Calculate new page to maintain approximate position
          const firstItemIndex = (state.page - 1) * state.pageSize;
          const newPage = Math.floor(firstItemIndex / pageSize) + 1;
          return { pageSize, page: newPage };
        }),

      setViewMode: (viewMode) =>
        set(() => ({
          viewMode,
          pageSize: viewMode === 'grid' ? 12 : 8,
          page: 1, // Reset to first page when view mode changes
        })),

      setScrollPosition: (scrollPosition) => set({ scrollPosition }),

      clearFilters: () =>
        set(() => ({
          filters: {},
          page: 1,
        })),

      resetPagination: () =>
        set(() => ({
          page: 1,
        })),
    }),
    {
      name: 'catalog-store',
      partialize: (state) => ({
        filters: state.filters,
        sort: state.sort,
        viewMode: state.viewMode,
        pageSize: state.pageSize,
      }),
    }
  )
);
