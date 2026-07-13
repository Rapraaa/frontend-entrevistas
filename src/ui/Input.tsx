import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  return (<input className="w-full bg-base border-2 border-ink px-3 py-2.5 font-mono text-sm text-fg placeholder:text-muted focus:outline-none" {...props} />)
}
