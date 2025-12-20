"use client";

import { useLanguage } from "./LanguageContext";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t bg-zinc-50 py-12 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-emerald-600">🌿 HealthWealth</h3>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              {t("intro")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">{t("home")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/yoga" className="hover:text-emerald-600">{t("yoga")}</Link></li>
              <li><Link href="/diseases" className="hover:text-emerald-600">{t("diseases")}</Link></li>
              <li><Link href="/diet" className="hover:text-emerald-600">{t("diet")}</Link></li>
              <li><Link href="/checkup" className="hover:text-emerald-600">{t("checkup")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">{t("admin")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/admin" className="hover:text-emerald-600">{t("admin")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} HealthWealth. {t("disclaimer")}
        </div>
      </div>
    </footer>
  );
}
