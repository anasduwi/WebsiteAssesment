import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminEmail } from "@/lib/admin";
import { signOutAdmin } from "./actions";

const overviewMetrics = [
  { label: "Total Participants", value: "126" },
  { label: "Total Completed Exams", value: "98" },
  { label: "Average Score", value: "78.40" },
  { label: "Passed Participants", value: "72" },
  { label: "Failed Participants", value: "26" },
  { label: "Total ASMO", value: "18" },
];

const participants = [
  { name: "Ayu Ningsih", asmo: "ASMO 01", date: "2026-11-06", score: 86.67, status: "PASSED", certificate: "Yes" },
  { name: "Rizky Pratama", asmo: "ASMO 03", date: "2026-11-06", score: 73.33, status: "PASSED", certificate: "Yes" },
  { name: "Dewi Kartika", asmo: "ASMO 07", date: "2026-11-06", score: 60, status: "FAILED", certificate: "Yes" },
  { name: "Eko Purnomo", asmo: "ASMO 02", date: "2026-11-05", score: 80, status: "PASSED", certificate: "Yes" },
];

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border-amber-200 bg-amber-50 shadow-sm">
          <CardContent className="p-6">
            <p className="font-medium text-amber-900">Konfigurasi Supabase belum lengkap.</p>
            <p className="mt-2 text-sm text-amber-800">
              Isi variabel NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, dan ADMIN_ALLOWED_EMAILS di file .env.local sebelum login admin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthorized = Boolean(user && isAdminEmail(user.email));

  if (!user || !isAuthorized) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Administrator Access</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <AdminLoginForm />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {overviewMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{metric.label}</div>
                    <div className="mt-3 text-3xl font-bold text-slate-950">{metric.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Administrator Dashboard</div>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Welcome, {user.email}</h1>
        </div>
        <form action={signOutAdmin}>
          <Button type="submit" variant="outline" className="rounded-full border-slate-200 bg-white text-slate-900">
            Logout
          </Button>
        </form>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Administrator Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-0">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              Login berhasil. Akun admin terverifikasi.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {overviewMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{metric.label}</div>
                  <div className="mt-3 text-3xl font-bold text-slate-950">{metric.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Participant Database</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="mb-5 flex flex-wrap gap-3">
            <Input className="max-w-xs" placeholder="Search participant" />
            <Input className="max-w-xs" placeholder="Filter ASMO" />
            <Input className="max-w-xs" placeholder="Filter date" />
            <Input className="max-w-xs" placeholder="Filter score" />
            <Button variant="outline">Export CSV</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3">Nama Peserta</th>
                  <th className="px-4 py-3">ASMO</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Nilai</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Sertifikat</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((row) => (
                  <tr key={row.name} className="border-b border-slate-200">
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.asmo}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.score}</td>
                    <td className="px-4 py-3">{row.status}</td>
                    <td className="px-4 py-3">{row.certificate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
