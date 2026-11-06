import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ExamResultPage({
  searchParams,
}: {
  searchParams?: {
    fullName?: string;
    asmo?: string;
    score?: string;
    passed?: string;
    status?: string;
  };
}) {
  const fullName = searchParams?.fullName ?? "Peserta";
  const asmo = searchParams?.asmo ?? "-";
  const score = Number(searchParams?.score ?? "0");
  const passed = searchParams?.passed === "true";
  const status = searchParams?.status ?? "SUBMITTED";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-6 p-8">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-500">EXAMINATION RESULT</div>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">{fullName}</h1>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">ASMO</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{asmo}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Status</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{status}</div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-300">FINAL SCORE</div>
            <div className="mt-3 text-4xl font-bold">{score.toFixed(2)} / 100</div>
            <div className="mt-4 text-xl font-semibold text-amber-300">STATUS: {passed ? "PASSED" : "NOT PASSED"}</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-700">DOWNLOAD CERTIFICATE</Button>
            <Link href="/">
              <Button variant="outline" className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-100">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
