import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expertiseAreas, portfolioExperience, portfolioProfile, portfolioProjects, tools } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex justify-center">
            <div className="flex h-72 w-72 items-center justify-center rounded-full border-[10px] border-amber-200 bg-slate-200 text-5xl font-bold text-slate-700 shadow-xl">
              {portfolioProfile.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("")}
            </div>
          </div>

          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
              {portfolioProfile.title}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {portfolioProfile.fullName}
            </h1>
            <p className="mt-4 text-xl font-medium text-slate-700">{portfolioProfile.tagline}</p>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-8 text-slate-600">
              {portfolioProfile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="rounded-full bg-slate-900 px-6 text-white hover:bg-slate-700">VIEW PORTFOLIO</Button>
              <Button variant="outline" className="rounded-full border-slate-200 bg-white px-6 text-slate-900 hover:bg-slate-100">
                CONTACT ME
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Areas of Expertise</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Core Capabilities</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {expertiseAreas.map((area) => (
            <Card key={area.title} className="border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Tools & Technologies</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Analytics & Business Tools</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div key={tool} className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-slate-700 shadow-sm">
              {tool}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Selected Portfolio Projects</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Dashboard Showcase</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <Card key={project.slug} className="overflow-hidden border-slate-200 bg-white shadow-sm">
              <div className="h-40 bg-gradient-to-br from-slate-800 via-slate-700 to-amber-200 p-4 text-white">
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-200">{project.previewLabel}</div>
                <div className="grid grid-cols-3 gap-2 text-[10px] opacity-90">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="rounded bg-white/15 p-2">
                      {project.metrics[index % project.metrics.length]}
                    </div>
                  ))}
                </div>
              </div>
              <CardContent className="space-y-4 p-5">
                <div>
                  <div className="text-sm uppercase tracking-[0.12em] text-slate-500">{project.category}</div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{project.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
                <Link href={`/about/projects/${project.slug}`} className="inline-block text-sm font-semibold text-slate-900 underline decoration-amber-500 underline-offset-4">
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Professional Experience</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Career Journey</h2>
        </div>
        <div className="space-y-6">
          {portfolioExperience.map((experience) => (
            <Card key={experience.company} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">{experience.company}</div>
                    <div className="text-sm text-slate-600">{experience.position}</div>
                  </div>
                  <div className="text-sm font-medium text-slate-500">{experience.period}</div>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {experience.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experience.projects.map((item) => (
                    <span key={item} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 p-8 text-white">
          <div className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Contact Me</div>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm text-slate-400">Email</div>
              <div className="mt-1 text-lg font-medium">{portfolioProfile.email}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">LinkedIn</div>
              <div className="mt-1 text-lg font-medium">{portfolioProfile.linkedin}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">WhatsApp</div>
              <div className="mt-1 text-lg font-medium">{portfolioProfile.whatsapp}</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-slate-300">Location: {portfolioProfile.location}</div>
          <div className="mt-6">
            <Button className="rounded-full bg-amber-500 px-6 text-slate-950 hover:bg-amber-400">LET&apos;S CONNECT</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
