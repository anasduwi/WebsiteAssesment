import fs from "node:fs";
import path from "node:path";

import * as XLSX from "xlsx";

import { QUESTION_BANK, type ExamQuestion } from "@/lib/question-bank";

const workbookPath = path.resolve(process.cwd(), "data", "Pertanyaan Assesment supervisor.xlsx");

function normalizeQuestionRow(row: unknown[]) {
  const values = row.map((value) => (typeof value === "string" ? value.trim() : value ?? ""));

  if (values.length < 5) {
    return null;
  }

  const questionNumber = Number(values[0]);
  const topic = String(values[1] ?? "").trim();
  const questionText = String(values[2] ?? "").trim();
  const optionText = String(values[3] ?? "").trim();

  if (!Number.isInteger(questionNumber) || questionNumber < 1 || !topic || !questionText || !optionText) {
    return null;
  }

  const linePattern = /(?:^|\n|\r\n)(?:[A-D]\.)\s*/g;
  const options = optionText
    .replace(/\r\n/g, "\n")
    .split(linePattern)
    .map((item) => item.replace(/^[A-D]\s*\.?\s*/, "").trim())
    .filter(Boolean);

  if (options.length !== 4) {
    throw new Error(`Question ${questionNumber} does not have four answer options.`);
  }

  const answerKey = String(values[4] ?? "").trim();
  if (!/^[A-D]$/.test(answerKey)) {
    throw new Error(`Question ${questionNumber} has an empty or invalid answer key.`);
  }

  return {
    question_number: questionNumber,
    topic,
    question_text: questionText,
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    correct_option: answerKey as ExamQuestion["correct_option"],
    explanation: values[5]?.toString?.() ?? "",
  } satisfies Partial<ExamQuestion>;
}

async function main() {
  if (!fs.existsSync(workbookPath)) {
    throw new Error(`Workbook not found at ${workbookPath}`);
  }

  const workbook = XLSX.readFile(workbookPath);
  const questionsSheet = workbook.Sheets["Soal Pilihan Ganda"];
  const answerSheet = workbook.Sheets["Kunci Jawaban"];

  if (!questionsSheet || !answerSheet) {
    throw new Error("Required sheet names were not found in the workbook.");
  }

  const questionRows = XLSX.utils.sheet_to_json(questionsSheet, { header: 1, raw: false, blankrows: false }) as unknown[][];
  const answerRows = XLSX.utils.sheet_to_json(answerSheet, { header: 1, raw: false, blankrows: false }) as unknown[][];

  const validQuestions: Array<Record<string, string | number>> = [];

  for (const row of questionRows.slice(4, 19)) {
    if (!row || row.length === 0) continue;
    const item = normalizeQuestionRow(row);
    if (!item) continue;
    validQuestions.push(item);
  }

  if (validQuestions.length !== 15) {
    throw new Error(`Expected 15 active questions. Found ${validQuestions.length}.`);
  }

  const duplicateNumbers = validQuestions
    .map((item) => item.question_number)
    .filter((number, index, arr) => arr.indexOf(number) !== index);

  if (duplicateNumbers.length > 0) {
    throw new Error(`Duplicate question numbers found: ${duplicateNumbers.join(", ")}`);
  }

  const correctAnswers = answerRows
    .slice(3, 18)
    .map((row) => ({ question_number: Number(row[0]), correct_option: String(row[2] ?? "").trim() }));

  const mismatched = validQuestions.filter((q) => {
    const answerEntry = correctAnswers.find((item) => item.question_number === q.question_number);
    return !answerEntry || answerEntry.correct_option !== q.correct_option;
  });

  if (mismatched.length > 0) {
    throw new Error(`Question-answer mismatch detected near question numbers: ${mismatched.map((item) => item.question_number).join(", ")}`);
  }

  // This import is designed to be safe for server-side execution via Supabase.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.log("Supabase credentials are not configured. Import validated locally only.");
    console.log(JSON.stringify(QUESTION_BANK.slice(0, 2), null, 2));
    return;
  }

  const supabase = await import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } }),
  );

  const rows = validQuestions.map((item) => ({
    question_number: item.question_number,
    topic: item.topic,
    question_text: item.question_text,
    option_a: item.option_a,
    option_b: item.option_b,
    option_c: item.option_c,
    option_d: item.option_d,
    correct_option: item.correct_option,
    explanation: item.explanation ?? "",
  }));

  const { error } = await supabase.from("exam_questions").upsert(rows, { onConflict: "question_number" });
  if (error) {
    throw error;
  }

  console.log(`Validated and imported ${rows.length} questions successfully.`);
}

main().catch((error: unknown) => {
  console.error("Question import failed:", error);
  process.exitCode = 1;
});
