import { useState, useMemo } from "react";
import { MediaCard } from "./MediaCard";
import { MediaCardSkeletonGrid } from "./MediaCardSkeleton";
import { LocalFilterBar } from "./LocalFilterBar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { EmptyState } from "./ui/empty-state";
import { X } from "lucide-react";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

interface MediaItem {
  type: "sermon";
  id: string;
  title: string;
  speaker: string;
  speakerAvatar?: string;
  category: string;
  duration: string;
  views: string;
  date: string;
  location: string;
  thumbnail: string;
  isLiked: boolean;
  series?: string;
  language?: string;
  year?: string;
}

interface MediaListProps {
  mediaData: MediaItem[];
  title: string;
  description: string;
  onMediaSelect: (mediaId: string, mediaType: 'video' | 'audio') => void;
  mediaType: 'video' | 'audio';
  selectedSeries?: string;
  sidebarFilters?: {
    categories: string[];
    series: string[];
  };
  onFilterChange?: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  onToggleFavorite?: (mediaId: string, isLiked: boolean) => void;
  onAddToPlaylist?: (mediaId: string) => void;
  onDownload?: (mediaId: string) => void;
}

export function MediaList({ 
  mediaData, 
  title, 
  description, 
  onMediaSelect, 
  mediaType,
  selectedSeries,
  sidebarFilters,
  onFilterChange,
  onClearAllFilters,
  onToggleFavorite,
  onAddToPlaylist,
  onDownload
}: MediaListProps) {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [ministerFilter, setMinisterFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Extract unique ministers from media data
  const ministers = useMemo(() => {
    const uniqueMinisters = new Set(mediaData.map(item => item.speaker));
    return Array.from(uniqueMinisters).map(minister => ({
      id: minister.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      label: minister
    })).sort((a, b) => a.label.localeCompare(b.label));
  }, [mediaData]);

  // Extract unique filter values
  const uniqueYears = useMemo(() => {
    const years = new Set(mediaData.map(item => new Date(item.date).getFullYear().toString()));
    return Array.from(years).sort().reverse();
  }, [mediaData]);

  const uniqueLocations = useMemo(() => {
    const locations = new Set(mediaData.map(item => item.location));
    return Array.from(locations).sort();
  }, [mediaData]);

  const uniqueLanguages = useMemo(() => {
    // Extract languages from media data if available, otherwise use basic language mapping
    const languageMap: { [key: string]: string } = {
      "ENG": "English",
      "ENG-YOR": "English-Yoruba",
      "ENG-ELEME": "English-Eleme",
      "ENG-IKWERRE": "English-Ikwerre", 
      "ENG-ITSEKIRI": "English-Itsekiri",
      "ENG-EDO": "English-Edo"
    };
    
    // For now, we'll work with the common languages found in DCLM archives
    return ["English", "English-Yoruba", "English-Eleme", "English-Ikwerre", "English-Itsekiri", "English-Edo"];
  }, []);

  // Check if there are any active filters (including sidebar and top bar filters)
  const hasActiveFilters = useMemo(() => {
    const hasSidebarFilters = (sidebarFilters?.categories.length || 0) > 0 || 
                             (sidebarFilters?.series.length || 0) > 0;
    const hasTopBarFilters = yearFilter !== "all" || 
                            locationFilter !== "all" || 
                            languageFilter !== "all" || 
                            ministerFilter !== "all";
    return hasSidebarFilters || hasTopBarFilters;
  }, [sidebarFilters, yearFilter, locationFilter, languageFilter, ministerFilter]);

  // Handle filter changes
  const handleMinisterFilterChange = (value: string) => {
    setMinisterFilter(value);
  };

  const handleYearFilterChange = (value: string) => {
    setYearFilter(value);
  };

  const handleLocationFilterChange = (value: string) => {
    setLocationFilter(value);
  };

  const handleLanguageFilterChange = (value: string) => {
    setLanguageFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    // Clear top bar filters
    setYearFilter("all");
    setLocationFilter("all");
    setLanguageFilter("all");
    setMinisterFilter("all");
    
    // Clear sidebar filters
    if (onClearAllFilters) {
      onClearAllFilters();
    }
  };

  // Filter and sort media data
  const filteredAndSortedMedia = useMemo(() => {
    let filtered = mediaData.filter(item => {
      // Series filter from sidebar
      if (sidebarFilters?.series.length && !sidebarFilters.series.includes(item.series || '')) {
        return false;
      }
      
      // Category filter from sidebar - convert category names to filter format
      if (sidebarFilters?.categories.length) {
        const categoryMatches = sidebarFilters.categories.some(filterCat => {
          // Handle different category name formats
          const itemCategoryFormatted = item.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
          return filterCat === itemCategoryFormatted || 
                 filterCat === item.category.toLowerCase() ||
                 filterCat.replace('-', ' ') === item.category.toLowerCase() ||
                 filterCat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) === item.category;
        });
        if (!categoryMatches) {
          return false;
        }
      }

      // Top bar minister filter
      if (ministerFilter !== "all") {
        // Find the selected minister by ID
        const selectedMinister = ministers.find(m => m.id === ministerFilter);
        if (selectedMinister && item.speaker !== selectedMinister.label) {
          return false;
        }
      }
      
      // Year filter
      if (yearFilter !== "all" && new Date(item.date).getFullYear().toString() !== yearFilter) {
        return false;
      }
      
      // Location filter
      if (locationFilter !== "all" && item.location !== locationFilter) {
        return false;
      }
      
      // Language filter (mock implementation)
      if (languageFilter !== "all") {
        // In real app, items would have language property
        return true;
      }
      
      return true;
    });

    // Sort filtered results
    switch (sortBy) {
      case "newest":
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "oldest":
        return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "most-viewed":
        return filtered.sort((a, b) => parseInt(b.views.replace(',', '')) - parseInt(a.views.replace(',', '')));
      case "title":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "speaker":
        return filtered.sort((a, b) => a.speaker.localeCompare(b.speaker));
      default:
        return filtered;
    }
  }, [mediaData, selectedSeries, sidebarFilters, yearFilter, locationFilter, languageFilter, ministerFilter, sortBy, ministers]);

  // Use infinite scroll hook
  const {
    displayedItems,
    isLoading,
    hasMore,
    containerRef,
    reset
  } = useInfiniteScroll({
    items: filteredAndSortedMedia,
    itemsPerPage: 12,
    loadingDelay: 300
  });

  // Reset infinite scroll when filters change
  useMemo(() => {
    reset();
  }, [filteredAndSortedMedia, reset]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {hasActiveFilters && onClearAllFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearAllFilters}
              className="h-7 px-2 text-xs text-destructive hover:text-destructive/80 hover:bg-destructive/10"
            >
              <X className="h-3 w-3 mr-1" />
              Clear All Filters
            </Button>
          )}
        </div>
        <Badge variant="outline">
          {filteredAndSortedMedia.length} {mediaType === 'video' ? 'videos' : 'audio'}
        </Badge>
      </div>
      {description && (
        <p className="text-muted-foreground -mt-2">{description}</p>
      )}

      {/* Filter Controls */}
      <LocalFilterBar
        yearFilter={yearFilter}
        locationFilter={locationFilter}
        languageFilter={languageFilter}
        ministerFilter={ministerFilter}
        sortBy={sortBy}
        uniqueYears={uniqueYears}
        uniqueLocations={uniqueLocations}
        uniqueLanguages={uniqueLanguages}
        ministers={ministers}
        onYearChange={handleYearFilterChange}
        onLocationChange={handleLocationFilterChange}
        onLanguageChange={handleLanguageFilterChange}
        onMinisterChange={handleMinisterFilterChange}
        onSortChange={handleSortChange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearAllFilters}
      />

      {/* Media Grid with Infinite Scroll */}
      <div ref={containerRef} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayedItems.map((media) => (
            <MediaCard 
              key={media.id} 
              {...media} 
              mediaType={mediaType}
              onClick={() => onMediaSelect(media.id, mediaType)}
              onToggleFavorite={onToggleFavorite}
              onAddToPlaylist={onAddToPlaylist}
              onDownload={onDownload}
            />
          ))}
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <MediaCardSkeletonGrid count={6} />
        )}

        {/* Load more indicator */}
        {hasMore && !isLoading && displayedItems.length > 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Scroll down to load more...</p>
          </div>
        )}
      </div>

      {filteredAndSortedMedia.length === 0 && (
        <EmptyState message={`No ${mediaType === 'video' ? 'videos' : 'audio'} found matching your filters.`} />
      )}
    </div>
  );
}