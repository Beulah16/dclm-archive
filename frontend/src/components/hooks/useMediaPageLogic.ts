import { useState, useMemo, useEffect } from "react";
import {
  getMediaByType,
  seriesData,
  categoryData,
  MediaItem
} from "../../data/mediaData";
import { useSmoothScroll } from "./useSmoothScroll";
import { useMediaActions } from "./useMediaActions";
import { filterMediaItems, matchesFilter } from "../../utils/filterUtils";
import { toast } from "sonner";

interface MediaPageFilters {
  categories: string[];
  series: string[];
}

interface MediaPageProps {
  onMediaSelect: (mediaId: string, mediaType: 'video' | 'audio') => void;
  onSeriesPlayAll?: (seriesId: string, mediaType: 'video' | 'audio') => void;
  onCategoryPlayAll?: (categoryId: string, mediaType: 'video' | 'audio') => void;
  filters?: MediaPageFilters;
  onFilterChange?: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  activeTab?: { [key: string]: string };
  onTabChange?: (page: string, tab: string) => void;
}

export function useMediaPageLogic(
  mediaType: 'video' | 'audio',
  props: MediaPageProps
) {
  const {
    onMediaSelect,
    onSeriesPlayAll,
    onCategoryPlayAll,
    filters,
    onFilterChange,
    onClearAllFilters,
    activeTab: externalActiveTab,
    onTabChange: externalTabChange
  } = props;

  const [internalActiveTab, setInternalActiveTab] = useState("sermons");

  // Use external activeTab if provided, otherwise use internal state
  const currentPage = mediaType === 'video' ? 'videos' : 'audios';
  const activeTab = externalActiveTab?.[currentPage] || internalActiveTab;
  const [shouldScrollToContent, setShouldScrollToContent] = useState(false);

  const mediaTypeUpper = mediaType.toUpperCase() as 'VIDEO' | 'AUDIO';

  // Set up smooth scroll for content area
  const { elementRef: contentRef, scrollToElement } = useSmoothScroll({
    trigger: shouldScrollToContent,
    offset: 100 // Account for navbar height
  });

  // Get media data filtered by type
  const mediaData = useMemo(() => getMediaByType(mediaTypeUpper), [mediaTypeUpper]);

  // Use media actions hook
  const { handleToggleFavorite, handleAddToPlaylist, handleDownload } = useMediaActions({
    mediaData,
    mediaType
  });

  const filteredSeries = useMemo(() =>
    seriesData.filter(series =>
      series.mediaItems.some(item => item.type === mediaTypeUpper)
    ), [mediaTypeUpper]
  );

  const filteredCategories = useMemo(() =>
    categoryData.filter(category =>
      category.mediaItems.some(item => item.type === mediaTypeUpper)
    ), [mediaTypeUpper]
  );

  // Unified filtering functions using utilities
  const getFilteredSermons = (sermons: MediaItem[]) => {
    return filterMediaItems(sermons, filters || {});
  };

  const getFilteredSeriesData = (series: typeof filteredSeries) => {
    return series.filter(seriesItem => {
      // Category filter - show series that belong to selected categories
      if (filters?.categories.length) {
        const categoryMatches = filters.categories.some(filterCat =>
          matchesFilter(filterCat, seriesItem.category)
        );
        if (!categoryMatches) return false;
      }

      // Series filter - show series that match selected series
      if (filters?.series.length) {
        const seriesMatches = filters.series.some(filterSeries =>
          filterSeries === seriesItem.id ||
          matchesFilter(filterSeries, seriesItem.name)
        );
        if (!seriesMatches) return false;
      }

      return true;
    });
  };

  const getFilteredCategoriesData = (categories: typeof filteredCategories) => {
    if (!filters?.categories.length && !filters?.series.length) {
      return categories;
    }

    return categories.filter(category => {
      // Category filter - show only selected categories
      if (filters?.categories.length) {
        const categoryMatches = filters.categories.some(filterCat =>
          filterCat === category.id ||
          matchesFilter(filterCat, category.name)
        );
        if (!categoryMatches) return false;
      }

      // Series filter - show categories that contain the selected series
      if (filters?.series.length) {
        const hasMatchingSeries = filteredSeries.some(series =>
          filters.series!.some(filterSeries => {
            const seriesMatch = filterSeries === series.id ||
              matchesFilter(filterSeries, series.name);
            return seriesMatch && series.category === category.name;
          })
        );
        if (!hasMatchingSeries) return false;
      }

      return true;
    });
  };

  // Unified scroll trigger function
  const triggerSmoothScroll = () => {
    setShouldScrollToContent(true);
    setTimeout(() => setShouldScrollToContent(false), 800);
  };

  // Trigger scroll when filters change
  useEffect(() => {
    if (filters?.categories.length || filters?.series.length) {
      triggerSmoothScroll();
    }
  }, [filters]);

  // Custom tab change handler that ensures smooth scroll
  const handleTabChange = (newTab: string) => {
    // Always scroll to content area when tab changes
    if (activeTab !== newTab) {
      if (externalTabChange) {
        externalTabChange(currentPage, newTab);
      } else {
        setInternalActiveTab(newTab);
      }
      triggerSmoothScroll();
    }
  };

  // Event handlers
  const handleSeriesSelect = (seriesId: string) => {
    const seriesName = filteredSeries.find(series => series.id === seriesId)?.name || seriesId;

    if (onFilterChange) {
      onFilterChange("series", seriesName, true);
    }
    if (externalTabChange) {
      externalTabChange(currentPage, "sermons");
    } else {
      setInternalActiveTab("sermons");
    }

    // Trigger smooth scroll to content
    triggerSmoothScroll();
  };

  const handleSeriesPlayAll = (seriesId: string) => {
    if (onSeriesPlayAll) {
      onSeriesPlayAll(seriesId, mediaType);
    }
  };

  const handleAddSeriesToPlaylist = (seriesId: string) => {
    const series = filteredSeries.find(s => s.id === seriesId);
    const seriesName = series?.name || 'Series';
    toast.success(`Added "${seriesName}" to playlist`, {
      description: `All ${mediaType} episodes will be available in your playlist.`,
    });
  };

  const handleDownloadAll = (seriesId: string) => {
    const series = filteredSeries.find(s => s.id === seriesId);
    const seriesName = series?.name || 'Series';
    toast.success(`Preparing download for "${seriesName}"`, {
      description: `All ${mediaType} episodes are being prepared for download.`,
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    const categoryName = filteredCategories.find(cat => cat.id === categoryId)?.name || categoryId;

    if (onFilterChange) {
      onFilterChange("categories", categoryName, true);
    }
    if (externalTabChange) {
      externalTabChange(currentPage, "sermons");
    } else {
      setInternalActiveTab("sermons");
    }

    // Trigger smooth scroll to content
    triggerSmoothScroll();
  };

  const handleCategoryPlayAll = (categoryId: string) => {
    if (onCategoryPlayAll) {
      onCategoryPlayAll(categoryId, mediaType);
    }
  };

  const handleCategoryViewSeries = (categoryId: string) => {
    const categoryName = filteredCategories.find(cat => cat.id === categoryId)?.name || categoryId;

    if (onFilterChange) {
      onFilterChange("categories", categoryName, true);
    }
    if (externalTabChange) {
      externalTabChange(currentPage, "series");
    } else {
      setInternalActiveTab("series");
    }

    // Trigger smooth scroll to content
    triggerSmoothScroll();
  };

  // Media actions are now handled by the useMediaActions hook

  // Apply filters
  const finalFilteredSermons = useMemo(() => getFilteredSermons(mediaData), [mediaData, filters]);
  const finalFilteredSeries = useMemo(() => getFilteredSeriesData(filteredSeries), [filteredSeries, filters]);
  const finalFilteredCategories = useMemo(() => getFilteredCategoriesData(filteredCategories), [filteredCategories, filters]);

  // Data transformations
  const formattedSermons = useMemo(() =>
    finalFilteredSermons.map(item => ({
      type: "sermon" as const,
      id: item.id,
      title: item.title,
      speaker: item.minister,
      speakerAvatar: "https://images.unsplash.com/photo-1610414961792-b7fffebddd14?w=100&h=100&fit=crop&crop=face",
      category: item.category,
      duration: item.duration,
      views: item.views.toLocaleString(),
      date: item.date,
      location: item.city ? `${item.city}, ${item.state}` : item.country,
      language: item.language,
      thumbnail: item.thumbnail,
      isLiked: item.isFavorite,
      series: item.series,
      seriesSlug: item.series.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    })), [finalFilteredSermons]
  );

  const formattedSeries = useMemo(() =>
    finalFilteredSeries.map(series => {
      const videoCount = series.mediaItems.filter(item => item.type === 'VIDEO').length;
      const audioCount = series.mediaItems.filter(item => item.type === 'AUDIO').length;

      return {
        id: series.id,
        title: series.name,
        description: series.description,
        category: series.category,
        episodeCount: series.totalEpisodes,
        videoCount,
        audioCount,
        totalDuration: `${Math.floor(series.totalEpisodes * 45 / 60)} hrs`,
        startDate: "2024",
        thumbnail: series.thumbnail,
        speakers: series.ministers,
      };
    }), [finalFilteredSeries]
  );

  const formattedCategories = useMemo(() =>
    finalFilteredCategories.map(category => {
      const videoCount = category.mediaItems.filter(item => item.type === 'VIDEO').length;
      const audioCount = category.mediaItems.filter(item => item.type === 'AUDIO').length;

      return {
        id: category.id,
        title: category.name,
        description: category.description,
        thumbnail: category.thumbnail,
        sermonCount: category.totalContent,
        videoCount,
        audioCount,
        seriesCount: filteredSeries.filter(s => s.category === category.name).length,
        totalViews: `${Math.floor(Number(category.totalViews || 0) / 1000)}K+ ${mediaType === 'video' ? 'VIEWS' : 'LISTENS'}`,
        totalDuration: `${Math.floor(category.totalContent * 45 / 60)} hrs`,
        bgColor: category.color === "#003A7C" ? "blue" as const :
          category.color === "#87CEFA" ? "orange" as const :
            category.color === "#FFC107" ? "gold" as const :
              category.color === "#E68800" ? "teal" as const : "purple" as const
      };
    }), [finalFilteredCategories, mediaType, filteredSeries]
  );

  return {
    activeTab,
    setActiveTab: handleTabChange,
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
    scrollToElement,
  };
}