import { useEffect, useState } from 'react';

type Props = {
  palabras: string[];
  className?: string;
};

const VELOCIDAD_ESCRITURA = 70;
const VELOCIDAD_BORRADO = 35;
const PAUSA_COMPLETA = 1800;

export function TituloEscrito({ palabras, className = '' }: Props) {
  const [indice, setIndice] = useState(0);
  const [texto, setTexto] = useState('');
  const [borrando, setBorrando] = useState(false);
  const [estatico, setEstatico] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEstatico(true);
      setTexto(palabras[0]);
    }
  }, [palabras]);

  useEffect(() => {
    if (estatico) return;

    const actual = palabras[indice % palabras.length];

    if (!borrando && texto === actual) {
      const espera = setTimeout(() => setBorrando(true), PAUSA_COMPLETA);
      return () => clearTimeout(espera);
    }

    if (borrando && texto === '') {
      setBorrando(false);
      setIndice((i) => (i + 1) % palabras.length);
      return;
    }

    const paso = setTimeout(
      () => {
        setTexto((prev) =>
          borrando ? actual.slice(0, prev.length - 1) : actual.slice(0, prev.length + 1),
        );
      },
      borrando ? VELOCIDAD_BORRADO : VELOCIDAD_ESCRITURA,
    );

    return () => clearTimeout(paso);
  }, [texto, borrando, indice, palabras, estatico]);

  return (
    <span className={className}>
      <span className="sr-only">{palabras.join(', ')}</span>
      <span aria-hidden="true">
        {texto}
        <span className="cursor-parpadeo text-acento">_</span>
      </span>
    </span>
  );
}
