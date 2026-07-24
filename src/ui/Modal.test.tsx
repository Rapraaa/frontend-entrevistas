import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Modal } from './Modal';

function abrir(onClose = vi.fn()) {
  const utils = render(
    <Modal isOpen onClose={onClose} title="Confirmar borrado">
      <button type="button">Cancelar</button>
      <button type="button">Aceptar</button>
    </Modal>,
  );
  return { ...utils, onClose };
}

describe('Modal', () => {
  it('se anuncia como diálogo con nombre accesible', () => {
    abrir();
    const dialogo = screen.getByRole('dialog');
    expect(dialogo).toHaveAttribute('aria-modal', 'true');
    expect(dialogo).toHaveAccessibleName('Confirmar borrado');
  });

  it('cierra con la tecla Escape', () => {
    const { onClose } = abrir();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('mueve el foco al primer elemento enfocable del diálogo al abrirse', () => {
    abrir();
    const cerrar = screen.getByRole('button', { name: 'Cerrar' });
    expect(cerrar).toHaveFocus();
    expect(screen.getByRole('dialog')).toContainElement(cerrar);
  });

  it('mantiene el foco atrapado al tabular desde el último elemento', () => {
    abrir();
    const aceptar = screen.getByRole('button', { name: 'Aceptar' });
    aceptar.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Cerrar' })).toHaveFocus();
  });

  it('vuelve hacia atrás con Shift+Tab desde el primer elemento', () => {
    abrir();
    screen.getByRole('button', { name: 'Cerrar' }).focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'Aceptar' })).toHaveFocus();
  });

  it('bloquea el scroll del fondo mientras está abierto', () => {
    const { unmount } = abrir();
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
  });

  it('no renderiza nada cuando está cerrado', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Oculto">
        <p>contenido</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
