import type { ReactNode } from 'react';
import { Logo } from './Logo';

type Props = {
  children?: ReactNode;
  /** Contenido antes del logo (ej. el botón de menú en móvil) */
  inicio?: ReactNode;
};

export function Navbar({ children, inicio }: Props) {
  return (
    <nav className="flex items-center justify-between gap-3 bg-surface border-b-[3px] border-trazo px-4 md:px-6 py-3">
      <div className="flex items-center gap-3">
        {inicio}
        <Logo />
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </nav>
  );
}
