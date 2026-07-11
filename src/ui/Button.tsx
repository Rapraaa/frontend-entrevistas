import type {ReactNode} from 'react' //ReacNode es un tipo qeu en pocas recibe cualquier cosa que react pueda renderizar, texto, html, etc
import type {ButtonHTMLAttributes} from 'react'
type Variante = 'primario' | 'secundario'

// el buttonhtmlatributes son los props de un botton normal, de esa forma podemso recibir lo que suele recibir un botton, el onclick ytodo eso
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variante? : Variante
}

const variantes = {
  primario: 'bg-naranja text-ink',
  secundario: 'bg-surface2 text-fg',
}
export function Button({ children, variante = 'primario', ...props  }: Props) {
  return (<button className={`border-2 border-ink font-mono active:translate-x-1 active:translate-y-1 active:shadow-none transition font-bold shadow-brutal uppercase px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed ${variantes[variante]}`}{...props}>{ children }</button>)

}
