import { useEffect, useRef } from 'react';

const options = {
  root: null,
  threshold: 1,
};

const useInfinityScroll = (handleIntersection) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);
    targetRef.current && observer.observe(targetRef.current);
    return () => {
      targetRef.current && observer.unobserve(targetRef.current);
    };
  }, [handleIntersection]);

  return targetRef;
};

export default useInfinityScroll;
