import type {ReactNode} from 'react' //ReacNode es un tipo qeu en pocas recibe cualquier cosa que react pueda renderizar, texto, html, etc
import type {ButtonHTMLAttributes} from 'react'
type Variante = 'primario' | 'secundario' | 'peligro' | 'fantasma'

// el buttonhtmlatributes son los props de un botton normal, de esa forma podemso recibir lo que suele recibir un botton, el onclick ytodo eso
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variante? : Variante
}

const variantes: Record<Variante, string> = {
  primario: 'bg-naranja text-ink shadow-brutal presiona',
  secundario: 'bg-surface2 text-fg shadow-brutal presiona',
  peligro: 'bg-rojo text-ink shadow-brutal presiona',
  fantasma: 'bg-transparent text-fg hover:bg-surface2',
}

export function Button({ children, variante = 'primario', className = '', ...props }: Props) {
  return (
    <button
      className={`border-2 border-trazo font-mono font-bold uppercase px-4 py-3 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed ${variantes[variante]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
