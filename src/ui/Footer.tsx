export function Footer() {
  return (
    <footer className="bg-surface border-t-[3px] border-ink px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-1">
      <span className="font-mono text-xs text-muted">
        SIM://ENTREVISTA_IA — Proyecto Integrador Programación 3
      </span>
      <span className="font-mono text-xs text-muted">
        © {new Date().getFullYear()} — Todos los derechos reservados
      </span>
    </footer>
  );
}
