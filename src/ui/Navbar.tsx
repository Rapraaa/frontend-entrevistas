import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function Navbar({ children }: Props) {
  return (
    <nav className="flex items-center justify-between bg-surface border-b-[3px] border-ink px-6 py-3">
      <span className="font-mono font-bold text-lg text-fg">SIM://ENTREVISTA_IA</span>
      <div className="flex items-center gap-2">{children}</div>
    </nav>
  );
}
