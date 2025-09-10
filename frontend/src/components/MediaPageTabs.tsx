import { MediaList } from "./MediaList";
import { CategoryCard } from "./CategoryCard";
import { SeriesCard } from "./SeriesCard";
import { SectionHeader } from "./ui/section-header";
import { EmptyState } from "./ui/empty-state";

interface MediaPageTabsProps {
  mediaType: 'video' | 'audio';
  formattedSermons: any[];
  formattedSeries: any[];
  formattedCategories: any[];
  onMediaSelect: (mediaId: string, mediaType: 'video' | 'audio') => void;
  filters?: {
    categories: string[];
    series: string[];
  };
  onFilterChange?: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  onToggleFavorite: (mediaId: string, isLiked: boolean) => void;
  onAddToPlaylist: (mediaId: string) => void;
  onDownload: (mediaId: string) => void;
  onSeriesSelect: (seriesId: string) => void;
  onSeriesPlayAll: (seriesId: string) => void;
  onAddSeriesToPlaylist: (seriesId: string) => void;
  onDownloadAll: (seriesId: string) => void;
  onCategorySelect: (categoryId: string) => void;
  onCategoryPlayAll: (categoryId: string) => void;
  onCategoryViewSeries: (categoryId: string) => void;
  onCategoryViewAllMedia?: (categoryId: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export function MediaPageTabs({
  mediaType,
  formattedSermons,
  formattedSeries,
  formattedCategories,
  onMediaSelect,
  filters,
  onFilterChange,
  onClearAllFilters,
  onToggleFavorite,
  onAddToPlaylist,
  onDownload,
  onSeriesSelect,
  onSeriesPlayAll,
  onAddSeriesToPlaylist,
  onDownloadAll,
  onCategorySelect,
  onCategoryPlayAll,
  onCategoryViewSeries,
  onCategoryViewAllMedia,
  onNavigateToTab,
}: MediaPageTabsProps) {
  const mediaTypeCapitalized = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);

  // Check if there are any active filters
  const hasActiveFilters = (filters?.categories.length || 0) > 0 || (filters?.series.length || 0) > 0;

  return [
    {
      value: "sermons",
      label: "Sermons",
      content: (
        <MediaList
          mediaData={formattedSermons}
          title={`${mediaTypeCapitalized} Sermons`}
          description=""
          onMediaSelect={onMediaSelect}
          mediaType={mediaType}
          sidebarFilters={filters}
          onFilterChange={onFilterChange}
          onClearAllFilters={onClearAllFilters}
          onToggleFavorite={onToggleFavorite}
          onAddToPlaylist={onAddToPlaylist}
          onDownload={onDownload}
        />
      )
    },
    {
      value: "series",
      label: "Series",
      content: (
        <div className="space-y-6">
          <SectionHeader
            title={`${mediaTypeCapitalized} Series`}
            count={formattedSeries.length}
            countLabel="series"
            hasActiveFilters={hasActiveFilters}
            onClearFilters={onClearAllFilters}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {formattedSeries.map((series) => (
              <SeriesCard
                key={series.id}
                {...series}
                context={mediaType}
                onClick={() => onSeriesSelect(series.id)}
                onPlayAll={() => onSeriesPlayAll(series.id)}
                onAddToPlaylist={() => onAddSeriesToPlaylist(series.id)}
                onDownloadAll={() => onDownloadAll(series.id)}
              />
            ))}
          </div>
          {formattedSeries.length === 0 && (
            <EmptyState message="No series found matching your filters." />
          )}
        </div>
      )
    },
    {
      value: "categories",
      label: "Categories",
      content: (
        <div className="space-y-6">
          <SectionHeader
            title={`${mediaTypeCapitalized} Categories`}
            count={formattedCategories.length}
            countLabel="categories"
            hasActiveFilters={hasActiveFilters}
            onClearFilters={onClearAllFilters}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {formattedCategories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                context={mediaType}
                onClick={() => onCategorySelect(category.id)}
                onPlayAll={() => onCategoryPlayAll(category.id)}
                onViewSeries={() => onCategoryViewSeries(category.id)}
                onViewAllMultimedia={() => {
                  // Navigate to sermons tab with category filter for any context
                  onNavigateToTab?.('sermons');
                  onFilterChange?.('categories', category.title, true);
                }}
                onViewAllVideos={mediaType === 'video' ? () => {
                  // Navigate to sermons tab with category filter
                  onNavigateToTab?.('sermons');
                  onFilterChange?.('categories', category.title, true);
                } : undefined}
                onViewAllAudios={mediaType === 'audio' ? () => {
                  // Navigate to sermons tab with category filter
                  onNavigateToTab?.('sermons');
                  onFilterChange?.('categories', category.title, true);
                } : undefined}
              />
            ))}
          </div>
          {formattedCategories.length === 0 && (
            <EmptyState message="No categories found matching your filters." />
          )}
        </div>
      )
    }
  ];
}