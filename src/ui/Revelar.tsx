import type { ReactNode } from 'react';
import { useRevelar } from '../hooks/useRevelar';

type Props = {
  children: ReactNode;
  retraso?: number;
  className?: string;
};

export function Revelar({ children, retraso = 0, className = '' }: Props) {
  const { ref, visible } = useRevelar<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`revelar ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      {children}
    </div>
  );
}
