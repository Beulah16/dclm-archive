import { MediaPage } from "./MediaPage";

interface AudioPageProps {
  onMediaSelect: (mediaId: string, mediaType: 'video' | 'audio') => void;
  onSeriesPlayAll?: (seriesId: string, mediaType: 'video' | 'audio') => void;
  onCategoryPlayAll?: (categoryId: string, mediaType: 'video' | 'audio') => void;
  filters?: {
    categories: string[];
    series: string[];
  };
  onFilterChange?: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  activeTab?: {[key: string]: string};
  onTabChange?: (page: string, tab: string) => void;
}

export function AudioPage(props: AudioPageProps) {
  return <MediaPage {...props} mediaType="audio" />;
}