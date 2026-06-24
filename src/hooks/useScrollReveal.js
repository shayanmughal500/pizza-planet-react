import { useEffect, useRef } from 'react';

export default function useScrollReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const init = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible');
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
      );

      document.querySelectorAll('.reveal').forEach(el => {
        observerRef.current?.observe(el);
      });
    };

    const timer = setTimeout(init, 400);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);
}