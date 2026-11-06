"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isAdminEmail } from "@/lib/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function signInAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return { error: "Supabase belum dikonfigurasi. Isi variabel environment terlebih dahulu." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Kredensial admin tidak valid atau akun belum terdaftar." };
  }

  if (!isAdminEmail(data.user?.email)) {
    await supabase.auth.signOut();
    return { error: "Akun ini belum didaftarkan sebagai administrator." };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath("/admin");
  redirect("/admin");
}
