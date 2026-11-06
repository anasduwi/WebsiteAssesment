"use client";

import { useState } from "react";

import { signInAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="space-y-4"
      action={async (formData) => {
        setIsSubmitting(true);
        setError(null);

        const result = await signInAdmin(formData);

        if (result?.error) {
          setError(result.error);
        }

        setIsSubmitting(false);
      }}
    >
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-slate-700">
          Email Administrator
        </label>
        <Input id="admin-email" name="email" type="email" placeholder="admin@dms.local" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>
        <Input id="admin-password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-700" disabled={isSubmitting}>
        {isSubmitting ? "Memproses login..." : "Login"}
      </Button>
    </form>
  );
}
