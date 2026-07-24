import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error no controlado en la interfaz', error, info.componentStack);
  }

  private reiniciar = () => {
    this.setState({ error: null });
    window.location.assign('/');
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-base patron-puntos flex items-center justify-center p-6">
        <div className="w-full max-w-lg border-[3px] border-trazo bg-surface shadow-brutal p-10 flex flex-col items-center text-center gap-5">
          <div className="border-[3px] border-trazo bg-naranja shadow-brutal p-5">
            <AlertTriangle size={40} strokeWidth={2.5} className="text-ink" />
          </div>
          <h1 className="font-mono font-bold text-xl text-fg uppercase">
            Algo salió mal
          </h1>
          <p className="font-mono text-sm text-muted">
            Ocurrió un error inesperado. Puedes volver al inicio e intentarlo de nuevo.
          </p>
          <button
            type="button"
            onClick={this.reiniciar}
            className="border-[3px] border-trazo bg-naranja text-ink font-mono font-bold uppercase px-5 py-3 shadow-brutal cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <RotateCcw size={18} strokeWidth={3} />
              Volver al inicio
            </span>
          </button>
        </div>
      </div>
    );
  }
}
