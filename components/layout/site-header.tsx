import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT ME" },
  { href: "/admin", label: "ADMINISTRATOR" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            DMS
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Supervisor</div>
            <div className="text-sm font-semibold text-slate-900">Examination</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-[0.08em] text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/exam">
          <Button className="rounded-full bg-slate-900 px-5 text-white hover:bg-slate-700">
            START EXAMINATION
          </Button>
        </Link>
      </div>
    </header>
  );
}
