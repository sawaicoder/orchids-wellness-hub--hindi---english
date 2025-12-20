"use client";

import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t bg-zinc-50 py-12 dark:bg-zinc-950">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-2 text-xl font-bold text-emerald-600">
          <span>🌿</span> HealthWise
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} HealthWise. {t("disclaimer")}
        </p>
      </div>
    </footer>
  );
}
