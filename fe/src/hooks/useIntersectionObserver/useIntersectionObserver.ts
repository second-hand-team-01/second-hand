import { useEffect, useState } from 'react';

const options = {
  root: null,
  threshold: 0,
};

export const useIntersectionObserver = (handleIntersection) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);
    target && observer.observe(target);
    return () => {
      target && observer.unobserve(target);
    };
  }, [handleIntersection]);

  return setTarget;
};
