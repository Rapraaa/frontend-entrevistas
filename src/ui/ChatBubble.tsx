import type {ReactNode} from 'react'

type Props = {
  variante?: 'ia' | 'user',
  childen?: ReactNode
}

const estilos = {
  ia: { fondo: 'bg-lila', etiqueta: 'ENTREVISTADOR', colorEtiqueta: 'text-ink', colorTexto: 'text-ink' },
  user: { fondo: 'bg-surface2', etiqueta: 'TÚ', colorEtiqueta: 'text-muted', colorTexto: 'text-fg' }
}


export function ChatBubble({ children, variante = 'ia' }: Props) {
  const e = estilos[variante];
  return (
    <div className={`border-2 border-ink shadow-brutal p-3 ${e.fondo}`}>
      <p className={`text-[10px] font-bold uppercase mb-1 ${e.colorEtiqueta}`}> {e.etiqueta} </p>
      <p className={`text-sm leading-relaxed ${e.colorTexto}`}> {children} </p>
    </div>

  );
}
