import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioProjects } from "@/lib/site-data";

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = portfolioProjects.find((item) => item.slug === params.slug);

  if (!project) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center">Project not found.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Portfolio Project</div>
          <h1 className="mt-2 text-4xl font-bold text-slate-950">{project.title}</h1>
        </div>
        <Link href="/about">
          <Button variant="outline" className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-100">
            Back to About Me
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <div className="h-64 bg-gradient-to-br from-slate-900 via-slate-700 to-amber-200 p-4 text-white">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-200">{project.previewLabel}</div>
            <div className="grid grid-cols-3 gap-2 text-[10px] opacity-90">
              {project.metrics.map((metric, index) => (
                <div key={metric} className="rounded bg-white/15 p-2">
                  {index + 1}. {metric}
                </div>
              ))}
            </div>
          </div>
          <CardContent className="space-y-4 p-6">
            <div>
              <div className="text-sm uppercase tracking-[0.14em] text-slate-500">Project Overview</div>
              <p className="mt-3 text-slate-600">{project.description}</p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.14em] text-slate-500">Business Problem</div>
              <p className="mt-3 text-slate-600">
                This project addresses performance visibility, operational monitoring, and decision support through a structured dashboard approach.
              </p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.14em] text-slate-500">Analytical Approach</div>
              <p className="mt-3 text-slate-600">
                Data was organized, standardized, and transformed to support KPI monitoring, trend review, and actionable insight generation for business stakeholders.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 text-sm uppercase tracking-[0.14em] text-slate-500">KPI & Metrics</div>
              <ul className="space-y-2 text-sm text-slate-700">
                {project.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-500" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 text-sm uppercase tracking-[0.14em] text-slate-500">Key Insights</div>
              <p className="text-sm text-slate-600">
                The dashboard helps expose performance gaps, highlight trends, and guide management decisions using summarized indicators that are easy to interpret.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 text-sm uppercase tracking-[0.14em] text-slate-500">Tools Used</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
