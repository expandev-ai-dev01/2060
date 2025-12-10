import type { ViewMode } from '../../types/models';

export interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
  className?: string;
}
