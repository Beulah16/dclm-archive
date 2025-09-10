import { useState, useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage?: number;
  loadingDelay?: number;
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function useInfiniteScroll<T>({
  items,
  itemsPerPage = 12,
  loadingDelay = 500
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hasMore = currentPage * itemsPerPage < items.length;

  // Initialize with first page
  useEffect(() => {
    const initialItems = items.slice(0, itemsPerPage);
    setDisplayedItems(initialItems);
    setCurrentPage(1);
  }, [items, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // Simulate loading delay to show skeleton UI
    loadingTimeoutRef.current = setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * itemsPerPage;
      const newItems = items.slice(startIndex, endIndex);
      
      setDisplayedItems(newItems);
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, loadingDelay);
  }, [items, currentPage, itemsPerPage, isLoading, hasMore, loadingDelay]);

  const reset = useCallback(() => {
    const initialItems = items.slice(0, itemsPerPage);
    setDisplayedItems(initialItems);
    setCurrentPage(1);
    setIsLoading(false);
    
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
  }, [items, itemsPerPage]);

  // Set up intersection observer for auto-loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a sentinel element at the bottom
    const sentinel = document.createElement('div');
    sentinel.className = 'intersection-sentinel';
    sentinel.style.height = '20px';
    sentinel.style.visibility = 'hidden';
    container.appendChild(sentinel);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before the sentinel becomes visible
        threshold: 0.1
      }
    );

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (container.contains(sentinel)) {
        container.removeChild(sentinel);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return {
    displayedItems,
    isLoading,
    hasMore,
    loadMore,
    reset,
    containerRef
  };
}