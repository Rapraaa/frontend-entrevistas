import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { Select } from './Select';
import { TextArea } from './TextArea';

describe('Primitivas de formulario', () => {
  it('asocia la etiqueta con el input mediante htmlFor e id', () => {
    render(<Input label="Correo electrónico" placeholder="tu@email.com" />);
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
  });

  it('no reutiliza el mismo id entre dos inputs', () => {
    render(
      <>
        <Input label="Nombre" />
        <Input label="Apellido" />
      </>,
    );
    const nombre = screen.getByLabelText('Nombre');
    const apellido = screen.getByLabelText('Apellido');
    expect(nombre.id).not.toBe(apellido.id);
  });

  it('marca el campo como inválido y lo describe cuando hay error', () => {
    render(<Input label="Correo" error="El formato no es válido" />);
    const campo = screen.getByLabelText('Correo');
    expect(campo).toHaveAttribute('aria-invalid', 'true');
    expect(campo).toHaveAccessibleDescription('El formato no es válido');
  });

  it('asocia la etiqueta en Select', () => {
    render(
      <Select label="Seniority">
        <option value="junior">Junior</option>
      </Select>,
    );
    expect(screen.getByLabelText('Seniority')).toBeInTheDocument();
  });

  it('asocia la etiqueta en TextArea', () => {
    render(<TextArea label="Notas" />);
    expect(screen.getByLabelText('Notas')).toBeInTheDocument();
  });
});
