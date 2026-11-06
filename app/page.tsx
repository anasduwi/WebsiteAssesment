import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteSettings } from "@/lib/site-data";

const featureItems = [
  "Jumlah soal: 15 soal aktif",
  "Durasi ujian: 30 menit",
  "Satu kali ujian per hari",
  "Penilaian otomatis dan server-side",
];

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-700">
              DMS SUPERVISOR EXAMINATION
            </div>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {siteSettings.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-slate-700">{siteSettings.subtitle}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{siteSettings.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/exam">
                <Button size="lg" className="rounded-full bg-slate-900 px-8 text-lg text-white hover:bg-slate-700">
                  START EXAMINATION
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full border-slate-300 bg-white px-8 text-lg text-slate-900 hover:bg-slate-100">
                  ABOUT ME
                </Button>
              </Link>
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200 bg-white shadow-md">
            <div className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Assessment</div>
              <div className="mt-2 text-2xl font-semibold">Training On Site Supervisor</div>
            </div>
            <CardContent className="space-y-4 p-6">
              {featureItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div className="text-sm text-slate-700">{item}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Total Questions</div>
            <div className="mt-4 text-4xl font-bold text-slate-950">15</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Duration</div>
            <div className="mt-4 text-4xl font-bold text-slate-950">30</div>
            <div className="text-sm text-slate-600">minutes</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Exam Rule</div>
            <div className="mt-4 text-xl font-bold text-slate-950">One attempt/day</div>
          </div>
        </div>
      </section>
    </div>
  );
}
