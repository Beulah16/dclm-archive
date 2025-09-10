import { Filter, SortAsc, Grid, List, SlidersHorizontal, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

interface LocalFilterBarProps {
  // Filter values
  yearFilter?: string;
  locationFilter?: string;
  languageFilter?: string;
  ministerFilter?: string;
  mediaTypeFilter?: string;
  sortBy: string;
  
  // Filter options
  uniqueYears?: (string | number)[];
  uniqueLocations?: string[];
  uniqueLanguages?: string[];
  ministers?: { id: string; label: string }[];
  mediaTypes?: string[];
  
  // Filter handlers
  onYearChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
  onLanguageChange?: (value: string) => void;
  onMinisterChange?: (value: string) => void;
  onMediaTypeChange?: (value: string) => void;
  onSortChange: (value: string) => void;
  
  // View mode (optional)
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  
  // Clear filters
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  
  // Layout
  showViewModeToggle?: boolean;
  showMediaTypeFilter?: boolean;
}

export function LocalFilterBar({
  yearFilter = "all",
  locationFilter = "all", 
  languageFilter = "all",
  ministerFilter = "all",
  mediaTypeFilter = "all",
  sortBy,
  uniqueYears = [],
  uniqueLocations = [],
  uniqueLanguages = [],
  ministers = [],
  mediaTypes = [],
  onYearChange,
  onLocationChange,
  onLanguageChange,
  onMinisterChange,
  onMediaTypeChange,
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  hasActiveFilters = false,
  onClearFilters,
  showViewModeToggle = false,
  showMediaTypeFilter = false
}: LocalFilterBarProps) {
  return (
    <div className="bg-card rounded-lg p-3 md:p-4 border">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
        {/* Left side - Filters */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 flex-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Filters:</span>
          </div>
          
          {/* Media Type Filter - only show if enabled */}
          {showMediaTypeFilter && onMediaTypeChange && (
            <Select value={mediaTypeFilter} onValueChange={onMediaTypeChange}>
              <SelectTrigger className="w-24 md:w-28 h-8 text-xs">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {mediaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Year Filter */}
          {onYearChange && uniqueYears.length > 0 && (
            <Select value={yearFilter} onValueChange={onYearChange}>
              <SelectTrigger className="w-20 md:w-28 h-8 text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {uniqueYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Location Filter */}
          {onLocationChange && uniqueLocations.length > 0 && (
            <Select value={locationFilter} onValueChange={onLocationChange}>
              <SelectTrigger className="w-24 md:w-32 h-8 text-xs">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Minister Filter */}
          {onMinisterChange && ministers.length > 0 && (
            <Select value={ministerFilter} onValueChange={onMinisterChange}>
              <SelectTrigger className="w-28 md:w-36 h-8 text-xs">
                <SelectValue placeholder="Ministers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ministers</SelectItem>
                {ministers.map((minister) => (
                  <SelectItem key={minister.id} value={minister.id}>{minister.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Language Filter */}
          {onLanguageChange && uniqueLanguages.length > 0 && (
            <Select value={languageFilter} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-24 md:w-28 h-8 text-xs">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {uniqueLanguages.map((language) => (
                  <SelectItem key={language} value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Clear Filters Button */}
          {hasActiveFilters && onClearFilters && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>

        {/* Right side - Sort and View Mode */}
        <div className="flex items-center justify-between lg:justify-end gap-2 md:gap-3">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Sort:</span>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-28 md:w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="speaker">Speaker A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          {showViewModeToggle && onViewModeChange && (
            <div className="flex items-center space-x-1">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}