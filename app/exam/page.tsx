"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateScore } from "@/lib/scoring";
import { publicQuestionBank } from "@/lib/question-bank";

const EXAM_DURATION_SECONDS = 30 * 60;

type Screen = "identity" | "instructions" | "exam" | "result";

type Participant = {
  fullName: string;
  asmo: string;
};

export default function ExamPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("dms-participant");
      return stored ? "instructions" : "identity";
    }
    return "identity";
  });
  const [participant, setParticipant] = useState<Participant>(() => {
    if (typeof window === "undefined") {
      return { fullName: "", asmo: "" };
    }

    const stored = window.localStorage.getItem("dms-participant");
    return stored ? (JSON.parse(stored) as Participant) : { fullName: "", asmo: "" };
  });
  const [errors, setErrors] = useState<{ fullName?: string; asmo?: string }>({});
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_SECONDS);

  function validateParticipant() {
    const normalizedName = participant.fullName.trim().replace(/\s+/g, " ");
    const normalizedAsmo = participant.asmo.trim().replace(/\s+/g, " ");

    const nextErrors: { fullName?: string; asmo?: string } = {};

    if (!normalizedName || normalizedName.length < 3) {
      nextErrors.fullName = "Nama Lengkap minimal 3 karakter.";
    }
    if (!normalizedAsmo) {
      nextErrors.asmo = "ASMO Tempat Bekerja wajib diisi.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleIdentitySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateParticipant()) return;

    const normalizedName = participant.fullName.trim().replace(/\s+/g, " ");
    const normalizedAsmo = participant.asmo.trim().replace(/\s+/g, " ");

    const dailyKey = `${normalizedName.toLowerCase()}|${normalizedAsmo.toLowerCase()}|${new Date().toISOString().slice(0, 10)}`;
    const existing = window.localStorage.getItem("dms-exam-attempts");
    const records = existing ? (JSON.parse(existing) as string[]) : [];

    if (records.includes(dailyKey)) {
      window.alert("Anda sudah mengikuti ujian hari ini. Silakan kembali pada hari berikutnya untuk mengikuti ujian kembali.");
      return;
    }

    const nextParticipant = { fullName: normalizedName, asmo: normalizedAsmo };
    window.localStorage.setItem("dms-participant", JSON.stringify(nextParticipant));
    setParticipant(nextParticipant);
    setScreen("instructions");
  }

  function startExam() {
    const start = Date.now();
    setExpiresAt(start + EXAM_DURATION_SECONDS * 1000);
    setTimeRemaining(EXAM_DURATION_SECONDS);
    setScreen("exam");
  }

  function updateAnswer(option: string) {
    const nextAnswers = { ...answers, [publicQuestionBank[currentIndex].question_number]: option };
    setAnswers(nextAnswers);
    window.localStorage.setItem("dms-exam-answers", JSON.stringify(nextAnswers));
  }

  const allQuestionsAnswered = publicQuestionBank.every((question) => Boolean(answers[question.question_number]));

  const completeExam = useCallback(
    (timeout = false) => {
      if (!allQuestionsAnswered && !timeout) {
        window.alert("Silakan jawab semua soal sebelum submit ujian.");
        return;
      }

      const selectedAnswers = Object.fromEntries(
        Object.entries(answers).map(([key, value]) => [Number(key), value.toUpperCase() as "A" | "B" | "C" | "D"]),
      ) as Record<number, "A" | "B" | "C" | "D">;

      const summary = calculateScore(selectedAnswers);

      const query = new URLSearchParams({
        fullName: participant.fullName,
        asmo: participant.asmo,
        score: summary.finalScore.toFixed(2),
        passed: String(summary.passed),
        status: timeout ? "TIMEOUT" : "SUBMITTED",
      });

      const dailyKey = `${participant.fullName.toLowerCase()}|${participant.asmo.toLowerCase()}|${new Date().toISOString().slice(0, 10)}`;
      const existing = window.localStorage.getItem("dms-exam-attempts");
      const records = existing ? (JSON.parse(existing) as string[]) : [];
      if (!records.includes(dailyKey)) {
        window.localStorage.setItem("dms-exam-attempts", JSON.stringify([...records, dailyKey]));
      }

      window.localStorage.setItem(
        "dms-last-result",
        JSON.stringify({
          fullName: participant.fullName,
          asmo: participant.asmo,
          score: summary.finalScore,
          passed: summary.passed,
          status: timeout ? "TIMEOUT" : "SUBMITTED",
        }),
      );

      setTimeRemaining(0);
      router.push(`/exam/result?${query.toString()}`);
    },
    [allQuestionsAnswered, answers, participant, router],
  );

  useEffect(() => {
    if (screen !== "exam" || !expiresAt) return;

    const tick = () => {
      const nextRemaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setTimeRemaining(nextRemaining);

      if (nextRemaining <= 0) {
        completeExam(true);
      }
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [screen, expiresAt, completeExam]);

  const currentQuestion = publicQuestionBank[currentIndex];

  if (screen === "identity") {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-6 p-8">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Participant Identity</div>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">Exam Registration</h1>
            </div>
            <form onSubmit={handleIdentitySubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <Input
                  value={participant.fullName}
                  onChange={(event) => setParticipant((current) => ({ ...current, fullName: event.target.value }))}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.fullName ? <p className="mt-2 text-sm text-red-600">{errors.fullName}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">ASMO Tempat Bekerja</label>
                <Input
                  value={participant.asmo}
                  onChange={(event) => setParticipant((current) => ({ ...current, asmo: event.target.value }))}
                  placeholder="ASMO / Area"
                />
                {errors.asmo ? <p className="mt-2 text-sm text-red-600">{errors.asmo}</p> : null}
              </div>

              <Button type="submit" className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-700">
                Continue to Instructions
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (screen === "instructions") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-6 p-8">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Exam Instructions</div>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">Before You Start</h1>
            </div>
            <ul className="space-y-3 text-base text-slate-700">
              <li>• Jumlah soal: 15 sesuai bank soal aktif.</li>
              <li>• Waktu: 30 menit.</li>
              <li>• Bentuk soal: pilihan ganda.</li>
              <li>• Pilihan jawaban: A, B, C, D.</li>
              <li>• Setiap soal hanya memiliki satu jawaban.</li>
              <li>• Jawaban tersimpan otomatis.</li>
              <li>• Ujian hanya dapat diikuti sekali dalam sehari.</li>
              <li>• Ujian akan otomatis berakhir ketika waktu habis.</li>
            </ul>

            <Button onClick={startExam} className="rounded-full bg-slate-900 text-white hover:bg-slate-700">
              MULAI UJIAN
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Participant</div>
          <div className="font-semibold text-slate-900">{participant.fullName}</div>
          <div className="text-sm text-slate-600">ASMO: {participant.asmo}</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-slate-900 px-4 py-2 text-white">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Time Left</div>
            <div className="text-lg font-bold">{Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}</div>
          </div>
          <div className="min-w-[220px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Progress</div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${((currentIndex + 1) / publicQuestionBank.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-6 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Question {currentQuestion.question_number}
            </div>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{currentQuestion.question_text}</h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.question_number] === option.label;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => updateAnswer(option.label)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-base transition ${
                      selected
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current text-sm font-semibold">
                      {option.label}
                    </span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => currentIndex > 0 && setCurrentIndex((value) => value - 1)}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => currentIndex < publicQuestionBank.length - 1 && setCurrentIndex((value) => value + 1)}
                disabled={currentIndex === publicQuestionBank.length - 1}
              >
                Next
              </Button>

              {allQuestionsAnswered ? (
                <Button onClick={() => completeExam(false)} className="ml-auto rounded-full bg-amber-500 text-slate-900 hover:bg-amber-400">
                  Submit Exam
                </Button>
              ) : (
                <div className="ml-auto rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
                  Jawab semua soal sebelum submit
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Question Navigator</div>
          <div className="grid grid-cols-5 gap-2">
            {publicQuestionBank.map((question, index) => {
              const answered = Boolean(answers[question.question_number]);
              const active = index === currentIndex;
              return (
                <button
                  key={question.question_number}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`flex h-10 items-center justify-center rounded-md text-sm font-medium ${
                    active
                      ? "bg-slate-900 text-white"
                      : answered
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {question.question_number}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
