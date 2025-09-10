import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from "lucide-react";
import { 
  getUniqueCategories, 
  getUniqueSeries, 
  getUniqueInitisters, 
  categoryData, 
  seriesData 
} from "../data/mediaData";

interface FilterSidebarProps {
  selectedFilters: {
    categories: string[];
    series: string[];
  };
  onFilterChange: (type: string, value: string, checked: boolean) => void;
  onClearAllFilters?: () => void;
  onSeeAll?: (type: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({ 
  selectedFilters, 
  onFilterChange, 
  onClearAllFilters, 
  onSeeAll,
  isOpen = true,
  onToggle,
  isMobile = false
}: FilterSidebarProps) {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreSeries, setShowMoreSeries] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Check if there are any active filters
  const hasActiveFilters = selectedFilters.categories.length > 0 || 
                         selectedFilters.series.length > 0;

  // Get real data from our media data - use the exact format expected by filtering
  const categories = categoryData.map(category => ({
    id: category.name, // Use actual category name as ID for direct matching
    label: category.name,
    count: category.totalContent
  }));

  const allSeries = seriesData.map(series => ({
    id: series.name, // Use actual series name as ID for direct matching
    label: series.name,
    count: series.totalEpisodes,
    category: series.category // Keep original category name for matching
  }));



  // Enhanced series ordering: selected series first, then same category, then rest
  const getOrderedSeries = () => {
    const selectedSeries = [];
    const sameCategorySeries = [];
    const otherSeries = [];

    allSeries.forEach(series => {
      // Check if this series is selected
      const isSelected = selectedFilters.series.some(selectedSeriesId => 
        selectedSeriesId === series.id ||
        selectedSeriesId === series.label ||
        selectedSeriesId.toLowerCase() === series.label.toLowerCase() ||
        selectedSeriesId.replace(/[-_]/g, ' ').toLowerCase() === series.label.toLowerCase()
      );

      if (isSelected) {
        selectedSeries.push(series);
        return;
      }

      // If we have selected series, find series in the same category as any selected series
      if (selectedFilters.series.length > 0) {
        const selectedSeriesCategories = selectedFilters.series.map(selectedSeriesId => {
          const matchingSeries = allSeries.find(s => 
            selectedSeriesId === s.id ||
            selectedSeriesId === s.label ||
            selectedSeriesId.toLowerCase() === s.label.toLowerCase() ||
            selectedSeriesId.replace(/[-_]/g, ' ').toLowerCase() === s.label.toLowerCase()
          );
          return matchingSeries?.category;
        }).filter(Boolean);

        const isInSameCategoryAsSelected = selectedSeriesCategories.some(selectedCategory =>
          selectedCategory === series.category ||
          selectedCategory?.toLowerCase() === series.category.toLowerCase() ||
          selectedCategory?.replace(/[-_]/g, ' ').toLowerCase() === series.category.toLowerCase()
        );

        if (isInSameCategoryAsSelected) {
          sameCategorySeries.push(series);
          return;
        }
      }

      // If we have selected categories, check if series belongs to selected categories
      if (selectedFilters.categories.length > 0) {
        const categoryMatches = selectedFilters.categories.some(selectedCat => 
          selectedCat === series.category ||
          selectedCat.toLowerCase() === series.category.toLowerCase() ||
          selectedCat.replace(/[-_]/g, ' ').toLowerCase() === series.category.toLowerCase()
        );
        
        if (categoryMatches) {
          sameCategorySeries.push(series);
          return;
        }
      }

      otherSeries.push(series);
    });

    return [...selectedSeries, ...sameCategorySeries, ...otherSeries];
  };

  const series = getOrderedSeries();



  const renderFilterSection = (
    title: string,
    items: Array<{ id: string; label: string; count: number }>,
    filterType: string,
    selectedItems: string[],
    showMore: boolean,
    setShowMore: (show: boolean) => void,
    initialCount: number = 5
  ) => {
    const displayItems = showMore ? items : items.slice(0, initialCount);
    const hasMore = items.length > initialCount;

    return (
      <AccordionItem value={filterType}>
        <AccordionTrigger className="hover:no-underline py-2">
          <span className="flex items-center justify-between w-full">
            {title}
            <span className="text-sm text-muted-foreground mr-4">
              {items.length}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pt-1">
            {displayItems.map((item, index) => {
              // Check if this is a selected series
              const isSelectedSeries = filterType === 'series' && 
                selectedFilters.series.some(selectedSeriesId => 
                  selectedSeriesId === item.id ||
                  selectedSeriesId === item.label ||
                  selectedSeriesId.toLowerCase() === item.label.toLowerCase() ||
                  selectedSeriesId.replace(/[-_]/g, ' ').toLowerCase() === item.label.toLowerCase()
                );

              // Check if this is a relevant series (same category as selected or selected categories)
              const isRelevantSeries = filterType === 'series' && 
                !isSelectedSeries &&
                (
                  // Same category as selected series
                  (selectedFilters.series.length > 0 && 'category' in item && 
                    selectedFilters.series.some(selectedSeriesId => {
                      const matchingSeries = allSeries.find(s => 
                        selectedSeriesId === s.id ||
                        selectedSeriesId === s.label ||
                        selectedSeriesId.toLowerCase() === s.label.toLowerCase() ||
                        selectedSeriesId.replace(/[-_]/g, ' ').toLowerCase() === s.label.toLowerCase()
                      );
                      return matchingSeries?.category === (item as any).category;
                    })
                  ) ||
                  // Or belongs to selected categories
                  (selectedFilters.categories.length > 0 && 'category' in item && 
                    selectedFilters.categories.some(selectedCat => 
                      selectedCat === (item as any).category ||
                      selectedCat.toLowerCase() === (item as any).category.toLowerCase() ||
                      selectedCat.replace(/[-_]/g, ' ').toLowerCase() === (item as any).category.toLowerCase()
                    )
                  )
                );
              
              // Check if this is the first non-relevant series (to add separator)
              const isFirstNonRelevantSeries = filterType === 'series' && 
                (selectedFilters.categories.length > 0 || selectedFilters.series.length > 0) && 
                index > 0 && 
                !isRelevantSeries && 
                !isSelectedSeries &&
                (
                  // Previous item was selected
                  selectedFilters.series.some(selectedSeriesId => 
                    selectedSeriesId === (displayItems[index - 1] as any).id ||
                    selectedSeriesId === (displayItems[index - 1] as any).label
                  ) ||
                  // Previous item was relevant (same category)
                  ('category' in displayItems[index - 1] && 
                    (
                      selectedFilters.series.some(selectedSeriesId => {
                        const matchingSeries = allSeries.find(s => 
                          selectedSeriesId === s.id || selectedSeriesId === s.label
                        );
                        return matchingSeries?.category === (displayItems[index - 1] as any).category;
                      }) ||
                      selectedFilters.categories.some(selectedCat => 
                        selectedCat === (displayItems[index - 1] as any).category ||
                        selectedCat.toLowerCase() === (displayItems[index - 1] as any).category.toLowerCase() ||
                        selectedCat.replace(/[-_]/g, ' ').toLowerCase() === (displayItems[index - 1] as any).category.toLowerCase()
                      )
                    )
                  )
                );
              
              return (
                <div key={item.id}>
                  {isFirstNonRelevantSeries && (
                    <div className="flex items-center my-2">
                      <div className="flex-1 h-px bg-border"></div>
                      <span className="px-2 text-xs text-muted-foreground">Other Series</span>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>
                  )}
                  <div className={`
                    flex items-center space-x-2 
                    ${isSelectedSeries ? 'bg-primary/10 border border-primary/30 rounded px-2 py-1' : ''}
                    ${isRelevantSeries ? 'bg-primary/5 rounded px-1' : ''}
                  `}>
                    <Checkbox
                      id={item.id}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) =>
                        onFilterChange(filterType, item.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={item.id}
                      className="flex-1 cursor-pointer flex items-center justify-between text-sm py-1"
                    >
                      <span className={`
                        ${isSelectedSeries ? 'text-primary font-semibold' : ''}
                        ${isRelevantSeries && !isSelectedSeries ? 'text-primary font-medium' : ''}
                      `}>
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.count}
                      </span>
                    </label>
                  </div>
                </div>
              );
            })}
            
            {hasMore && (
              <div className="flex flex-col gap-1 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMore(!showMore)}
                  className="h-7 px-2 text-xs text-primary hover:text-primary-foreground hover:bg-primary/90 justify-start"
                >
                  {showMore ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Show {items.length - initialCount} More
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {/* Always show See All button */}
            {onSeeAll && (
              <div className="pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSeeAll(filterType)}
                  className="h-7 px-2 text-xs text-accent hover:text-accent-foreground hover:bg-accent/90 justify-start"
                >
                  See All {title}
                </Button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } top-14`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-[#003A7C]"></div>
                <h2 className="font-semibold text-[#003A7C] dark:text-[#87CEFA]">Filters</h2>
              </div>
              <div className="flex items-center space-x-2">
                {hasActiveFilters && onClearAllFilters && (
                  <button
                    onClick={onClearAllFilters}
                    className="text-xs text-destructive hover:text-destructive/80 transition-colors px-2 py-1 rounded border border-destructive/20 hover:bg-destructive/5"
                  >
                    Clear All
                  </button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Mobile Content */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-4">
              <Accordion type="multiple" defaultValue={["categories", "series"]} className="space-y-1">
                {renderFilterSection(
                  "Categories",
                  categories,
                  "categories",
                  selectedFilters.categories,
                  showMoreCategories,
                  setShowMoreCategories,
                  5
                )}
                
                <Separator className="my-2" />
                
                {renderFilterSection(
                  "Series",
                  series,
                  "series",
                  selectedFilters.series,
                  showMoreSeries,
                  setShowMoreSeries,
                  5
                )}
              </Accordion>
              </ScrollArea>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`fixed left-0 top-16 bg-sidebar border-r border-sidebar-border h-[calc(100vh-64px)] z-30 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex flex-col h-full">
        {/* Desktop Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="h-2 w-2 rounded-full bg-[#003A7C]"></div>
            {!isCollapsed && (
              <h2 className="font-semibold text-[#003A7C] dark:text-[#87CEFA]">Filters</h2>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {!isCollapsed && hasActiveFilters && onClearAllFilters && (
              <button
                onClick={onClearAllFilters}
                className="text-xs text-destructive hover:text-destructive/80 transition-colors px-2 py-1 rounded border border-destructive/20 hover:bg-destructive/5"
              >
                Clear All
              </button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 h-8 w-8"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Desktop Content */}
        {!isCollapsed && (
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-4">
            <Accordion type="multiple" defaultValue={["categories", "series"]} className="space-y-1">
              {renderFilterSection(
                "Categories",
                categories,
                "categories",
                selectedFilters.categories,
                showMoreCategories,
                setShowMoreCategories,
                5
              )}
              
              <Separator className="my-2" />
              
              {renderFilterSection(
                "Series",
                series,
                "series",
                selectedFilters.series,
                showMoreSeries,
                setShowMoreSeries,
                5
              )}
            </Accordion>
          </ScrollArea>
          </div>
        )}

        {/* Collapsed state indicators */}
        {isCollapsed && (
          <div className="flex-1 p-2 space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="text-xs text-center text-muted-foreground">
                {selectedFilters.categories.length > 0 && (
                  <div className="w-2 h-2 bg-primary rounded-full mx-auto mb-1"></div>
                )}
                Cat
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-secondary/10 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              </div>
              <div className="text-xs text-center text-muted-foreground">
                {selectedFilters.series.length > 0 && (
                  <div className="w-2 h-2 bg-secondary rounded-full mx-auto mb-1"></div>
                )}
                Ser
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}