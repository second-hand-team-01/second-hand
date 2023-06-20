import { useEffect, useRef, useState } from 'react';

const options = {
  root: null,
  threshold: 1,
};

export const useIntersectionObserver = (handleIntersection) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);
    target && observer.observe(target);
    return () => {
      target && observer.unobserve(target);
    };
  }, [target]);

  return setTarget;
};
