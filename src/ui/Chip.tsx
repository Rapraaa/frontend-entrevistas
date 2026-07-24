import type { ReactNode } from 'react'
import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  tono?: Tono
}

type Tono = 'lila' | 'verde' | 'rojo' | 'neutro'

const tonos = {
  lila: 'bg-lila text-ink',
  verde: 'bg-verde text-ink',
  rojo: 'bg-rojo text-ink',
  neutro: 'bg-surface2 text-fg'
}
export function Chip({ children, tono = 'lila', className = "", ...props }: Props) {
  return (<span className={`inline-flex items-center border-2 px-2 py-1 font-mono border-trazo uppercase font-bold text-[10px] ${tonos[tono]} ${className}`} {...props}>{children}</span>)
}
