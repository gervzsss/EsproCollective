import { type ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export default function AppShell({ children, className = "" }: AppShellProps) {
  return (
    <div
      className={`border-charcoal/5 bg-background-light dark:bg-background-dark relative mx-auto flex min-h-screen w-full max-w-120 flex-col overflow-x-hidden border-x shadow-2xl dark:border-white/10 ${className}`}
    >
      {children}
    </div>
  );
}
