import { TabComponent } from "./TabComponent";
import { MediaPageTabs } from "./MediaPageTabs";
import { useMediaPageLogic } from "./hooks/useMediaPageLogic";

interface MediaPageProps {
  mediaType: 'video' | 'audio';
  onMediaSelect: (mediaId: string, mediaType: 'video' | 'audio') => void;
  onSeriesPlayAll?: (seriesId: string, mediaType: 'video' | 'audio') => void;
  onCategoryPlayAll?: (categoryId: string, mediaType: 'video' | 'audio') => void;
  filters?: {
    categories: string[];
    series: string[];
  };
  onFilterChange?: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  activeTab?: { [key: string]: string };
  onTabChange?: (page: string, tab: string) => void;
}



export function MediaPage(props: MediaPageProps) {
  const { mediaType } = props;

  const {
    activeTab,
    setActiveTab,
    mediaData,
    filteredSeries,
    filteredCategories,
    formattedSermons,
    formattedSeries,
    formattedCategories,
    handleSeriesSelect,
    handleSeriesPlayAll,
    handleAddSeriesToPlaylist,
    handleDownloadAll,
    handleCategorySelect,
    handleCategoryPlayAll,
    handleCategoryViewSeries,
    handleToggleFavorite,
    handleAddToPlaylist,
    handleDownload,
    contentRef,
  } = useMediaPageLogic(mediaType, props);

  const tabs = MediaPageTabs({
    mediaType,
    formattedSermons,
    formattedSeries,
    formattedCategories,
    onMediaSelect: props.onMediaSelect,
    filters: props.filters,
    onFilterChange: props.onFilterChange,
    onClearAllFilters: props.onClearAllFilters,
    onToggleFavorite: handleToggleFavorite,
    onAddToPlaylist: handleAddToPlaylist,
    onDownload: handleDownload,
    onSeriesSelect: handleSeriesSelect,
    onSeriesPlayAll: handleSeriesPlayAll,
    onAddSeriesToPlaylist: handleAddSeriesToPlaylist,
    onDownloadAll: handleDownloadAll,
    onCategorySelect: handleCategorySelect,
    onCategoryPlayAll: handleCategoryPlayAll,
    onCategoryViewSeries: handleCategoryViewSeries,
    onNavigateToTab: setActiveTab,
  });

  return (
    <div ref={contentRef as React.RefObject<HTMLDivElement>}>
      <TabComponent
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}