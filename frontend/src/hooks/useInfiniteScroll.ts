// useInfiniteScroll.ts
import { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 } // Adjust the threshold as per your needs
    );

    if (observerRef.current) {
      observerRef.current.observe(document.querySelector('#infinite-scroll-trigger') as Element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback]);
};

export default useInfiniteScroll;
