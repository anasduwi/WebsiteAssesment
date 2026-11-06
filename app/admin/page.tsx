import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Administrator Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6 pt-0">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <Input placeholder="admin@dms.local" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-700">Login</Button>
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
