import { useEffect, useRef, useState } from 'react';

export function useRevelar<T extends HTMLElement = HTMLDivElement>(margen = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            setVisible(true);
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: margen, threshold: 0.1 },
    );

    observador.observe(nodo);

    const red = setTimeout(() => setVisible(true), 2500);

    return () => {
      observador.disconnect();
      clearTimeout(red);
    };
  }, [margen]);

  return { ref, visible };
}
