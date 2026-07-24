import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-surface border-t-[3px] border-trazo px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <Logo size="sm" />
        <span className="font-mono text-xs text-muted">
          Proyecto Integrador — Programación 3
        </span>
      </div>
      <span className="font-mono text-xs text-muted">
        © {new Date().getFullYear()} Praxis — Todos los derechos reservados
      </span>
    </footer>
  );
}
