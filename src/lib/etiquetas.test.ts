import { etiqueta } from './etiquetas';

describe('etiqueta', () => {
  it('traduce los slugs del catálogo al español', () => {
    expect(etiqueta('technical')).toBe('Técnica');
    expect(etiqueta('backend')).toBe('Backend Developer');
    expect(etiqueta('trainee')).toBe('Trainee');
  });

  it('no distingue mayúsculas ni separadores', () => {
    expect(etiqueta('TECHNICAL')).toBe('Técnica');
    expect(etiqueta('semi senior')).toBe('Semi Senior');
    expect(etiqueta('semi_senior')).toBe('Semi Senior');
  });

  it('capitaliza cualquier valor desconocido en vez de perderlo', () => {
    expect(etiqueta('rust')).toBe('Rust');
    expect(etiqueta('el pepe')).toBe('El pepe');
  });

  it('devuelve cadena vacía para valores ausentes', () => {
    expect(etiqueta(null)).toBe('');
    expect(etiqueta(undefined)).toBe('');
    expect(etiqueta('')).toBe('');
  });
});
