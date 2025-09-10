// Utility functions for consistent filter matching across the application

/**
 * Matches a filter value against an item value with various formatting options
 */
export function matchesFilter(
  filterValue: string, 
  itemValue: string, 
  options: {
    exactMatch?: boolean;
    caseInsensitive?: boolean;
    allowFormatted?: boolean;
  } = {}
): boolean {
  const { 
    exactMatch = false, 
    caseInsensitive = true, 
    allowFormatted = true 
  } = options;

  // Try exact match first
  if (filterValue === itemValue) return true;
  
  if (!caseInsensitive && exactMatch) {
    return filterValue === itemValue;
  }

  if (caseInsensitive) {
    const filterLower = filterValue.toLowerCase();
    const itemLower = itemValue.toLowerCase();
    
    // Direct case-insensitive match
    if (filterLower === itemLower) return true;
    
    if (allowFormatted) {
      // Try formatted versions (replace spaces and special chars with dashes)
      const itemFormatted = itemValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const filterFormatted = filterValue.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      if (filterFormatted === itemFormatted) return true;
      
      // Try replacing dashes/underscores with spaces
      const filterSpaced = filterValue.replace(/[-_]/g, ' ').toLowerCase();
      if (filterSpaced === itemLower) return true;
    }
  }
  
  return false;
}

/**
 * Filters an array of media items based on category filters
 */
export function filterByCategories<T extends { category: string }>(
  items: T[], 
  categoryFilters: string[]
): T[] {
  if (!categoryFilters.length) return items;
  
  return items.filter(item => 
    categoryFilters.some(filterCat => 
      matchesFilter(filterCat, item.category)
    )
  );
}

/**
 * Filters an array of media items based on series filters
 */
export function filterBySeries<T extends { series?: string }>(
  items: T[], 
  seriesFilters: string[]
): T[] {
  if (!seriesFilters.length) return items;
  
  return items.filter(item => 
    item.series && seriesFilters.some(filterSeries => 
      matchesFilter(filterSeries, item.series!)
    )
  );
}

/**
 * Unified filter function for media items
 */
export function filterMediaItems<T extends { category: string; series?: string }>(
  items: T[],
  filters: {
    categories?: string[];
    series?: string[];
  }
): T[] {
  let filtered = items;
  
  if (filters.categories?.length) {
    filtered = filterByCategories(filtered, filters.categories);
  }
  
  if (filters.series?.length) {
    filtered = filterBySeries(filtered, filters.series);
  }
  
  return filtered;
}

/**
 * Sorts media items by various criteria
 */
export function sortMediaItems<T extends { date: string; title: string; year?: number; views?: number; minister?: string; speaker?: string }>(
  items: T[],
  sortBy: string
): T[] {
  const sorted = [...items];
  
  switch (sortBy) {
    case "newest":
    case "latest":
      return sorted.sort((a, b) => {
        if (a.year && b.year && a.year !== b.year) {
          return b.year - a.year;
        }
        return b.date.localeCompare(a.date);
      });
      
    case "oldest":
      return sorted.sort((a, b) => {
        if (a.year && b.year && a.year !== b.year) {
          return a.year - b.year;
        }
        return a.date.localeCompare(b.date);
      });
      
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
      
    case "speaker":
    case "minister":
      return sorted.sort((a, b) => {
        const aName = a.speaker || a.minister || '';
        const bName = b.speaker || b.minister || '';
        return aName.localeCompare(bName);
      });
      
    case "most-viewed":
    case "views":
      return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      
    default:
      return sorted;
  }
}