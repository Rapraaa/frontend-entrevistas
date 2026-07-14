import { render, screen } from '@testing-library/react';
import { InterviewScreen } from './InterviewScreen';

describe('InterviewScreen', () => {
  it('renderiza el encabezado de la entrevista técnica', () => {
    render(<InterviewScreen />);

    expect(
      screen.getByRole('heading', { name: /entrevista técnica/i }),
    ).toBeInTheDocument();
  });

  it('muestra el editor de código y el botón de enviar solución', () => {
    render(<InterviewScreen />);

    expect(screen.getByText('solucion.ts')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /enviar solución/i }),
    ).toBeInTheDocument();
  });
});
