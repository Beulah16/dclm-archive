import { MediaPage } from "./MediaPage";

interface VideoPageProps {
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

export function VideoPage(props: VideoPageProps) {
  return <MediaPage {...props} mediaType="video" />;
}