import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-3 text-lg font-semibold text-white">DMS Supervisor Examination</div>
          <p className="max-w-sm text-sm text-slate-400">
            Online assessment platform for Training On Site Supervisor personnel.
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">
            Navigation
          </div>
          <div className="space-y-2 text-sm text-slate-400">
            <div><Link href="/">Home</Link></div>
            <div><Link href="/about">About Me</Link></div>
            <div><Link href="/admin">Administrator</Link></div>
          </div>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-300">
            About Me
          </div>
          <p className="text-sm text-slate-400">
            Professional portfolio focused on marketing support, data analytics, dashboard delivery, and business insights.
          </p>
        </div>
      </div>
    </footer>
  );
}
