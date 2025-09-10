import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar";
import { FilterSidebar } from "./components/FilterSidebar";
import { HomePage } from "./components/HomePage";
import { VideoPage } from "./components/VideoPage";
import { AudioPage } from "./components/AudioPage";
import { AdminPage } from "./components/AdminPage";
import { VideoPlayer } from "./components/VideoPlayer";
import { AudioPlayer } from "./components/AudioPlayer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<'video' | 'audio' | null>(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<{ [key: string]: string }>({
    home: "sermons",
    videos: "sermons",
    audios: "sermons"
  });
  const [filters, setFilters] = useState({
    categories: [],
    series: [],
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    setFilters(prev => {
      let newFilters = { ...prev };

      if (checked) {
        // When selecting a filter, clear the other filter types
        if (type === 'categories') {
          newFilters = {
            categories: [...prev.categories, value],
            series: [], // Clear series when selecting categories
          };
        } else if (type === 'series') {
          newFilters = {
            categories: [], // Clear categories when selecting series
            series: [...prev.series, value],
          };
        }
      } else {
        // When unchecking, just remove the item
        newFilters = {
          ...prev,
          [type]: prev[type as keyof typeof prev].filter(item => item !== value)
        };
      }

      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      series: [],
    });
  };

  const handleSeeAll = (type: string) => {
    // Navigate to the appropriate tab based on filter type and current page
    if (type === "categories") {
      setActiveTab(prev => ({ ...prev, [currentPage]: "categories" }));
    } else if (type === "series") {
      setActiveTab(prev => ({ ...prev, [currentPage]: "series" }));
    }

    // Close mobile sidebar
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Reset media selection when navigating to different pages
    setSelectedMediaId(null);
    setSelectedMediaType(null);
    setSelectedSeriesId(null);

    // Close sidebar on mobile when navigating
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMediaSelect = (mediaId: string, mediaType: 'video' | 'audio') => {
    setSelectedMediaId(mediaId);
    setSelectedMediaType(mediaType);
    setSelectedSeriesId(null); // Clear series when selecting individual media
    if (mediaType === 'video') {
      setCurrentPage('video-player');
    } else {
      setCurrentPage('audio-player');
    }
  };

  const handleSeriesPlayAll = (seriesId: string, mediaType: 'video' | 'audio') => {
    setSelectedSeriesId(seriesId);
    setSelectedMediaType(mediaType);
    // Find the first video/audio in the series and set it as selected
    // For now, we'll use a placeholder mediaId - this would be improved with real data
    setSelectedMediaId(`${seriesId}-episode-1`);
    if (mediaType === 'video') {
      setCurrentPage('video-player');
    } else {
      setCurrentPage('audio-player');
    }
  };

  const handleCategoryPlayAll = (categoryId: string, mediaType: 'video' | 'audio') => {
    // Import the media data to find the latest media in the category
    const { getMediaByType, categoryData } = require('./data/mediaData');

    // Find the category by ID or title
    const category = categoryData.find((cat: any) => cat.id === categoryId || cat.name === categoryId);

    if (category && category.mediaItems.length > 0) {
      // Filter by media type and get the latest one (most recent date)
      const mediaInCategory = category.mediaItems.filter((item: any) => item.type === mediaType.toUpperCase());

      if (mediaInCategory.length > 0) {
        // Sort by year and date to get the latest
        const latestMedia = mediaInCategory.sort((a: any, b: any) => {
          if (a.year !== b.year) return b.year - a.year;
          return b.date.localeCompare(a.date);
        })[0];

        setSelectedMediaId(latestMedia.id);
        setSelectedMediaType(mediaType);
        setSelectedSeriesId(latestMedia.series); // Use the actual series name

        if (mediaType === 'video') {
          setCurrentPage('video-player');
        } else {
          setCurrentPage('audio-player');
        }
      }
    }
  };

  const handleBackToMedia = () => {
    // Always go back to home page from players
    setCurrentPage('home');
    setSelectedMediaId(null);
    setSelectedMediaType(null);
    setSelectedSeriesId(null);
  };

  const handleNavigateWithFilter = (page: string, filterType: string, filterValue: string) => {
    // Clear current filters and set new ones
    setFilters({
      categories: filterType === 'categories' ? [filterValue] : [],
      series: filterType === 'series' ? [filterValue] : [],
    });

    // Navigate to the appropriate page
    if (page === 'videos') {
      setCurrentPage('videos');
    } else if (page === 'audios') {
      setCurrentPage('audios');
    }

    // Close mobile sidebar if open
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleTabChange = (page: string, tab: string) => {
    setActiveTab(prev => ({ ...prev, [page]: tab }));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onMediaSelect={handleMediaSelect} onSeriesPlayAll={handleSeriesPlayAll} onCategoryPlayAll={handleCategoryPlayAll} onNavigateWithFilter={handleNavigateWithFilter} filters={filters} onFilterChange={handleFilterChange} onClearAllFilters={handleClearAllFilters} activeTab={activeTab} onTabChange={handleTabChange} />;
      case "videos":
        return <VideoPage onMediaSelect={handleMediaSelect} onSeriesPlayAll={handleSeriesPlayAll} onCategoryPlayAll={handleCategoryPlayAll} filters={filters} onFilterChange={handleFilterChange} onClearAllFilters={handleClearAllFilters} activeTab={activeTab} onTabChange={handleTabChange} />;
      case "audios":
        return <AudioPage onMediaSelect={handleMediaSelect} onSeriesPlayAll={handleSeriesPlayAll} onCategoryPlayAll={handleCategoryPlayAll} filters={filters} onFilterChange={handleFilterChange} onClearAllFilters={handleClearAllFilters} activeTab={activeTab} onTabChange={handleTabChange} />;
      case "video-player":
        return selectedMediaId ? (
          <VideoPlayer videoId={selectedMediaId} seriesId={selectedSeriesId} onBack={handleBackToMedia} />
        ) : (
          <HomePage onMediaSelect={handleMediaSelect} onSeriesPlayAll={handleSeriesPlayAll} onCategoryPlayAll={handleCategoryPlayAll} onNavigateWithFilter={handleNavigateWithFilter} filters={filters} onFilterChange={handleFilterChange} onClearAllFilters={handleClearAllFilters} activeTab={activeTab} onTabChange={handleTabChange} />
        );
      case "audio-player":
        return selectedMediaId ? (
          <AudioPlayer audioId={selectedMediaId} onBack={handleBackToMedia} />
        ) : (
          <HomePage onMediaSelect={handleMediaSelect} onSeriesPlayAll={handleSeriesPlayAll} onCategoryPlayAll={handleCategoryPlayAll} onNavigateWithFilter={handleNavigateWithFilter} filters={filters} onFilterChange={handleFilterChange} onClearAllFilters={handleClearAllFilters} activeTab={activeTab} onTabChange={handleTabChange} />
        );
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage onMediaSelect={handleMediaSelect} onSeriesPlayAll={handleSeriesPlayAll} onCategoryPlayAll={handleCategoryPlayAll} onNavigateWithFilter={handleNavigateWithFilter} filters={filters} onFilterChange={handleFilterChange} onClearAllFilters={handleClearAllFilters} activeTab={activeTab} onTabChange={handleTabChange} />;
    }
  };

  const showSidebar = currentPage === "home" || currentPage === "videos" || currentPage === "audios";
  const isPlayerPage = currentPage === "video-player" || currentPage === "audio-player";
  const isAdminPage = currentPage === "admin";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onToggleSidebar={toggleSidebar}
        showSidebarToggle={showSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {showSidebar && (
          <FilterSidebar
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
            onClearAllFilters={handleClearAllFilters}
            onSeeAll={handleSeeAll}
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            isMobile={isMobile}
          />
        )}

        {/* Mobile overlay */}
        {isMobile && isSidebarOpen && showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 transition-all duration-300 ${isPlayerPage ? '' : ''
          } ${showSidebar && isSidebarOpen && !isMobile ? 'lg:ml-80' : ''
          } ${isAdminPage ? 'overflow-hidden' : ''
          }`}>
          {isPlayerPage ? (
            <div className="p-3 md:p-6 h-full overflow-auto">
              {renderCurrentPage()}
            </div>
          ) : isAdminPage ? (
            <div className="h-full flex flex-col">
              {renderCurrentPage()}
            </div>
          ) : (
            <div className="container mx-auto max-w-7xl p-3 md:p-6">
              {renderCurrentPage()}
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
}