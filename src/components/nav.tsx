"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-6">
        <span className="text-sm font-bold tracking-widest">11</span>
        <div className="flex gap-4 text-xs">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-fg underline underline-offset-4"
                : "text-fg-muted hover:text-fg"
            }
          >
            DASHBOARD
          </Link>
          <Link
            href="/standings"
            className={
              pathname === "/standings"
                ? "text-fg underline underline-offset-4"
                : "text-fg-muted hover:text-fg"
            }
          >
            STANDINGS
          </Link>
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
}
