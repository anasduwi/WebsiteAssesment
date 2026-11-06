import { z } from "zod";

export const participantIdentitySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Nama Lengkap minimal 3 karakter.")
    .refine((value) => value.replace(/\s+/g, " ").length > 0, {
      message: "Nama Lengkap tidak boleh hanya berisi spasi.",
    }),
  asmo: z
    .string()
    .trim()
    .min(2, "ASMO Tempat Bekerja wajib diisi.")
    .refine((value) => value.replace(/\s+/g, " ").length > 0, {
      message: "ASMO tidak boleh hanya berisi spasi.",
    }),
});

export const questionImportSchema = z.object({
  question_number: z.number().int().positive(),
  topic: z.string().min(1),
  question_text: z.string().min(1),
  option_a: z.string().min(1),
  option_b: z.string().min(1),
  option_c: z.string().min(1),
  option_d: z.string().min(1),
  correct_option: z.enum(["A", "B", "C", "D"]),
  explanation: z.string().optional().default(""),
});

export const settingsSchema = z.object({
  websiteTitle: z.string().min(1),
  examDurationMinutes: z.number().int().positive().max(180),
  passingGrade: z.number().min(0).max(100),
  examActive: z.boolean(),
  certificatePolicy: z.enum(["all", "passed-only"]),
});
