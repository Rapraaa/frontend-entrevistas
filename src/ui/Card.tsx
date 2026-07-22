import type { ReactNode, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

// Si quien usa la Card ya define su propio padding (p-0, p-4...), no aplicamos
// el p-6 por defecto: en Tailwind ambas clases compiten y gana la del CSS, no
// la del string, así que el conflicto se resuelve aquí.
const definePadding = (cls: string) => /(^|\s)p-\S+/.test(cls);

export function Card({ children, className = '', ...props }: Props) {
  const padding = definePadding(className) ? '' : 'p-6';
  return (
    <div
      className={`bg-surface border-[3px] border-ink shadow-brutal ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
