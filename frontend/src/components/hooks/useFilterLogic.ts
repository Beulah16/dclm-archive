import { useMemo } from "react";
import { filterMediaItems, matchesFilter } from "../../utils/filterUtils";

interface UseFilterLogicProps<T> {
  data: T[];
  filters?: {
    categories?: string[];
    series?: string[];
  };
  getCategory: (item: T) => string;
  getSeries?: (item: T) => string | undefined;
  getId?: (item: T) => string;
  getName?: (item: T) => string;
}

export function useFilterLogic<T>({
  data,
  filters,
  getCategory,
  getSeries,
  getId,
  getName
}: UseFilterLogicProps<T>) {
  
  const filteredData = useMemo(() => {
    if (!filters || (!filters.categories?.length && !filters.series?.length)) {
      return data;
    }

    return data.filter(item => {
      // Category filter
      if (filters.categories?.length) {
        const categoryMatches = filters.categories.some(filterCat => 
          matchesFilter(filterCat, getCategory(item))
        );
        if (!categoryMatches) return false;
      }
      
      // Series filter
      if (filters.series?.length && getSeries) {
        const itemSeries = getSeries(item);
        if (!itemSeries) return false;
        
        const seriesMatches = filters.series.some(filterSeries => {
          // Try ID match if available
          if (getId && filterSeries === getId(item)) return true;
          // Try name match if available
          if (getName && matchesFilter(filterSeries, getName(item))) return true;
          // Try series match
          return matchesFilter(filterSeries, itemSeries);
        });
        if (!seriesMatches) return false;
      }
      
      return true;
    });
  }, [data, filters, getCategory, getSeries, getId, getName]);

  const hasActiveFilters = useMemo(() => 
    (filters?.categories?.length || 0) > 0 || (filters?.series?.length || 0) > 0
  , [filters]);

  return {
    filteredData,
    hasActiveFilters
  };
}