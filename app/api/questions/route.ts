import { NextResponse } from "next/server";

import { publicQuestionBank } from "@/lib/question-bank";

export async function GET() {
  return NextResponse.json({
    totalQuestions: publicQuestionBank.length,
    questions: publicQuestionBank,
  });
}
