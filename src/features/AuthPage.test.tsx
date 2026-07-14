import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthPage } from './AuthPage';

describe('AuthPage', () => {
  it('muestra el formulario de inicio de sesión por defecto', () => {
    render(<AuthPage />);

    expect(
      screen.getByRole('heading', { name: /iniciar sesión/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('dev@correo.com')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Ada Lovelace'),
    ).not.toBeInTheDocument();
  });

  it('cambia a registro al pulsar "Regístrate" y muestra el campo de nombre', async () => {
    const user = userEvent.setup();
    render(<AuthPage />);

    await user.click(screen.getByRole('button', { name: /regístrate/i }));

    expect(
      screen.getByRole('heading', { name: /crear cuenta/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ada Lovelace')).toBeInTheDocument();
  });
});
