import { useEffect, useRef } from "react";

interface UseSmoothScrollProps {
  trigger?: boolean;
  offset?: number;
}

export function useSmoothScroll({ 
  trigger = false, 
  offset = 120
}: UseSmoothScrollProps = {}) {
  const elementRef = useRef<HTMLElement | null>(null);

  const scrollToElement = (customElement?: HTMLElement | null) => {
    const element = customElement || elementRef.current;
    if (!element) return;

    // Use native smooth scroll - simpler and more reliable
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (trigger && elementRef.current) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        scrollToElement();
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [trigger, offset]);

  return {
    elementRef,
    scrollToElement
  };
}