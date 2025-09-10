import { useState } from "react";
import { SimpleHeroSection } from "./SimpleHeroSection";
import { TabComponent } from "./TabComponent";
import { MediaList } from "./MediaList";
import { MediaCard } from "./MediaCard";
import { SeriesCard } from "./SeriesCard";
import { CategoryCard } from "./CategoryCard";
import { LocalFilterBar } from "./LocalFilterBar";
import { Button } from "./ui/button";
import { SectionHeader } from "./ui/section-header";
import { EmptyState } from "./ui/empty-state";
import { mediaItems, seriesData, categoryData } from "../data/mediaData";
import { useMediaActions } from "./hooks/useMediaActions";
import { filterMediaItems, sortMediaItems } from "../utils/filterUtils";
import { toast } from "sonner";
import { X } from "lucide-react";

interface HomePageProps {
  onMediaSelect: (mediaId: string, mediaType: 'video' | 'audio') => void;
  onSeriesPlayAll: (seriesId: string, mediaType: 'video' | 'audio') => void;
  onCategoryPlayAll: (categoryId: string, mediaType: 'video' | 'audio') => void;
  onNavigateWithFilter: (page: string, filterType: string, filterValue: string) => void;
  filters: {
    categories: string[];
    series: string[];
  };
  onFilterChange: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters: () => void;
  activeTab: { [key: string]: string };
  onTabChange: (page: string, tab: string) => void;
}

export function HomePage({
  onMediaSelect,
  onSeriesPlayAll,
  onCategoryPlayAll,
  onNavigateWithFilter,
  filters,
  onFilterChange,
  onClearAllFilters,
  activeTab,
  onTabChange
}: HomePageProps) {
  const currentActiveTab = activeTab.home || "sermons";
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMediaType, setSelectedMediaType] = useState("all");

  // Get all media items (both videos and audios) with safety checks
  const allMediaItems = (mediaItems || []).map(item => ({
    ...item,
    mediaType: (item.type || 'VIDEO').toLowerCase() as 'video' | 'audio'
  })).filter(item => item && item.id);

  // Use media actions hook
  const { handleToggleFavorite, handleAddToPlaylist, handleDownload } = useMediaActions({
    mediaData: allMediaItems,
    mediaType: 'media'
  });

  // Get unique values for filters with safety checks
  const uniqueLanguages = [...new Set(allMediaItems.map(item => item.language).filter(Boolean))].sort();
  const uniqueYears = [...new Set(allMediaItems.map(item => item.year).filter(Boolean))].sort((a, b) => b - a);
  const uniqueMediaTypes = [...new Set(allMediaItems.map(item => item.mediaType).filter(Boolean))].sort();

  // Apply local filters first
  const localFilteredItems = allMediaItems.filter(item => {
    if (!item) return false;

    const matchesLanguage = selectedLanguage === "all" || (item.language || '') === selectedLanguage;
    const matchesYear = selectedYear === "all" || (item.year || '').toString() === selectedYear;
    const matchesMediaType = selectedMediaType === "all" || (item.mediaType || '') === selectedMediaType;

    return matchesLanguage && matchesYear && matchesMediaType;
  });

  // Apply sidebar filters using utility
  const filteredItems = filterMediaItems(localFilteredItems, filters);

  // Sort items using utility
  const sortedItems = sortMediaItems(filteredItems, sortBy);

  const handleMediaCardClick = (item: any) => {
    onMediaSelect(item.id, item.mediaType);
  };

  // Media action handlers are now provided by useMediaActions hook

  const clearLocalFilters = () => {
    setSelectedLanguage("all");
    setSelectedYear("all");
    setSelectedMediaType("all");
    setLocalSearchTerm("");
  };

  // Helper function to get media counts for series
  const getSeriesMediaCounts = (seriesName: string) => {
    const seriesItems = allMediaItems.filter(item => item.series === seriesName);
    return {
      videoCount: seriesItems.filter(item => item.mediaType === 'video').length,
      audioCount: seriesItems.filter(item => item.mediaType === 'audio').length,
      totalCount: seriesItems.length
    };
  };

  // Helper function to get media counts for categories
  const getCategoryMediaCounts = (categoryName: string) => {
    const categoryItems = allMediaItems.filter(item => item.category === categoryName);
    return {
      videoCount: categoryItems.filter(item => item.mediaType === 'video').length,
      audioCount: categoryItems.filter(item => item.mediaType === 'audio').length,
      totalCount: categoryItems.length
    };
  };

  // Apply sidebar filters to series and categories
  const getFilteredSeries = () => {
    return seriesData.filter(series => {
      // Category filter - show series that belong to selected categories
      if (filters.categories.length > 0) {
        const categoryMatches = filters.categories.some(filterCat => {
          return filterCat === series.category ||
            filterCat.toLowerCase() === series.category.toLowerCase() ||
            filterCat.replace(/[-_]/g, ' ').toLowerCase() === series.category.toLowerCase();
        });
        if (!categoryMatches) return false;
      }

      // Series filter - show only selected series
      if (filters.series.length > 0) {
        const seriesMatches = filters.series.some(filterSeries => {
          return filterSeries === series.id ||
            filterSeries === series.name ||
            filterSeries.toLowerCase() === series.name.toLowerCase() ||
            filterSeries.replace(/[-_]/g, ' ').toLowerCase() === series.name.toLowerCase();
        });
        if (!seriesMatches) return false;
      }

      return true;
    });
  };

  const getFilteredCategories = () => {
    return categoryData.filter(category => {
      // Category filter - show only selected categories
      if (filters.categories.length > 0) {
        const categoryMatches = filters.categories.some(filterCat => {
          return filterCat === category.name ||
            filterCat === category.id ||
            filterCat.toLowerCase() === category.name.toLowerCase() ||
            filterCat.replace(/[-_]/g, ' ').toLowerCase() === category.name.toLowerCase();
        });
        if (!categoryMatches) return false;
      }

      // Series filter - show categories that contain the selected series
      if (filters.series.length > 0) {
        const hasMatchingSeries = seriesData.some(series =>
          filters.series.some(filterSeries => {
            const seriesMatch = filterSeries === series.id ||
              filterSeries === series.name ||
              filterSeries.toLowerCase() === series.name.toLowerCase() ||
              filterSeries.replace(/[-_]/g, ' ').toLowerCase() === series.name.toLowerCase();
            return seriesMatch && series.category === category.name;
          })
        );
        if (!hasMatchingSeries) return false;
      }

      return true;
    });
  };

  // Get filtered data
  const filteredSeriesData = getFilteredSeries();
  const filteredCategoryData = getFilteredCategories();

  // Check if there are any active filters
  const hasActiveFilters = (filters.categories.length || 0) > 0 || (filters.series.length || 0) > 0;

  const tabData = [
    {
      value: "sermons",
      label: "All Sermons",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">
                  All Sermons ({sortedItems.length})
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearAllFilters}
                    className="h-7 px-2 text-xs text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear All Filters
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{sortedItems.filter(item => item.mediaType === 'video').length} Videos</span>
                <span>•</span>
                <span>{sortedItems.filter(item => item.mediaType === 'audio').length} Audios</span>
              </div>
            </div>

            {/* Local Filters */}
            <LocalFilterBar
              languageFilter={selectedLanguage}
              yearFilter={selectedYear}
              mediaTypeFilter={selectedMediaType}
              sortBy={sortBy}
              uniqueLanguages={uniqueLanguages}
              uniqueYears={uniqueYears}
              mediaTypes={uniqueMediaTypes}
              onLanguageChange={setSelectedLanguage}
              onYearChange={setSelectedYear}
              onMediaTypeChange={setSelectedMediaType}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showViewModeToggle={true}
              showMediaTypeFilter={true}
              hasActiveFilters={selectedLanguage !== "all" || selectedYear !== "all" || selectedMediaType !== "all"}
              onClearFilters={clearLocalFilters}
            />

            {/* Media Grid/List */}
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              : "space-y-4"
            }>
              {sortedItems.map((item) => (
                <MediaCard
                  key={item.id}
                  type="sermon"
                  id={item.id}
                  title={item.title}
                  speaker={item.minister}
                  category={item.category}
                  duration={item.duration}
                  date={item.date}
                  location={item.city ? `${item.city}, ${item.state}` : item.country}
                  language={item.language}
                  thumbnail={item.thumbnail}
                  views={(item.views || 0).toString()}
                  series={item.series}
                  mediaType={item.mediaType}
                  isLiked={item.isFavorite}
                  onClick={() => handleMediaCardClick(item)}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToPlaylist={handleAddToPlaylist}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <EmptyState message="No sermons found matching your criteria." />
                <Button variant="outline" className="mt-4" onClick={() => {
                  clearLocalFilters();
                  onClearAllFilters();
                }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      value: "series",
      label: "All Series",
      content: (
        <div className="space-y-6">
          <SectionHeader
            title="All Series"
            count={filteredSeriesData.length}
            countLabel="series"
            hasActiveFilters={hasActiveFilters}
            onClearFilters={onClearAllFilters}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredSeriesData.map((series) => {
              const mediaCounts = getSeriesMediaCounts(series.name);
              return (
                <SeriesCard
                  key={series.id}
                  type="series"
                  id={series.id}
                  title={series.name}
                  description={series.description}
                  thumbnail={series.thumbnail}
                  episodeCount={mediaCounts.totalCount}
                  videoCount={mediaCounts.videoCount}
                  audioCount={mediaCounts.audioCount}
                  totalDuration={series.totalDuration}
                  startDate={series.startDate}
                  category={series.category}
                  speakers={series.speakers}
                  context="home"
                  onClick={() => {
                    // Navigate to videos page with series filter applied
                    onNavigateWithFilter('videos', 'series', series.name);
                  }}
                  onPlayAll={() => {
                    // Play all media in series (prefer video if available)
                    const seriesMedia = allMediaItems.filter(item => item.series === series.name);
                    if (seriesMedia.length > 0) {
                      const firstVideo = seriesMedia.find(item => item.mediaType === 'video');
                      const mediaToPlay = firstVideo || seriesMedia[0];
                      onMediaSelect(mediaToPlay.id, mediaToPlay.mediaType);
                    }
                  }}
                  onAddToPlaylist={() => {
                    toast.success(`Added "${series.name}" series to playlist`, {
                      description: `All episodes will be available in your playlist.`,
                    });
                  }}
                  onDownloadAll={() => {
                    toast.success(`Preparing download for "${series.name}"`, {
                      description: `All episodes are being prepared for download.`,
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
      ),
    },
    {
      value: "categories",
      label: "All Categories",
      content: (
        <div className="space-y-6">
          <SectionHeader
            title="All Categories"
            count={filteredCategoryData.length}
            countLabel="categories"
            hasActiveFilters={hasActiveFilters}
            onClearFilters={onClearAllFilters}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCategoryData.map((category) => {
              const mediaCounts = getCategoryMediaCounts(category.name);
              return (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  title={category.name}
                  description={category.description}
                  thumbnail={category.thumbnail}
                  sermonCount={mediaCounts.totalCount}
                  videoCount={mediaCounts.videoCount}
                  audioCount={mediaCounts.audioCount}
                  seriesCount={category.seriesCount}
                  totalViews={category.totalViews}
                  totalDuration={category.totalDuration}
                  bgColor={category.bgColor}
                  context="home"
                  onViewAllMultimedia={() => {
                    // Navigate to sermons tab in home page with category filter applied
                    onTabChange('home', 'sermons');
                    onFilterChange('categories', category.name, true);
                  }}
                  onViewSeries={() => {
                    // Navigate to series tab with category filter applied
                    onTabChange('home', 'series');
                    onFilterChange('categories', category.name, true);
                  }}
                  onPlayAll={() => {
                    // Play all media in category (prefer video if available)
                    const categoryMedia = allMediaItems.filter(item => item.category === category.name);
                    if (categoryMedia.length > 0) {
                      const firstVideo = categoryMedia.find(item => item.mediaType === 'video');
                      const mediaToPlay = firstVideo || categoryMedia[0];
                      onMediaSelect(mediaToPlay.id, mediaToPlay.mediaType);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <SimpleHeroSection
        title="DCLM Media Archive"
        subtitle="Access thousands of sermons, teachings, and inspirational content"
        onVideoClick={() => {
          const firstVideo = allMediaItems.find(item => item.mediaType === 'video');
          if (firstVideo) onMediaSelect(firstVideo.id, firstVideo.mediaType);
        }}
        onAudioClick={() => {
          const firstAudio = allMediaItems.find(item => item.mediaType === 'audio');
          if (firstAudio) onMediaSelect(firstAudio.id, firstAudio.mediaType);
        }}
      />

      {/* Media Tabs */}
      <TabComponent
        activeTab={currentActiveTab}
        onTabChange={(tab) => onTabChange('home', tab)}
        tabs={tabData}
      />
    </div>
  );
}