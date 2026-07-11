import type {ReactNode, HTMLAttributes} from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, ...props }: Props) {
  return (
    <div className="bg-surface border-[3px] border-ink shadow-brutal p-6" {...props}>
      {children}
    </div>
  );
}
