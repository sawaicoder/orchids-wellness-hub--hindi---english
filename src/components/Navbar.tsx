"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { language, setLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/yoga", label: t("yoga") },
    { href: "/diseases", label: t("diseases") },
    { href: "/diet", label: t("diet") },
    { href: "/checkup", label: t("checkup") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600">
          <span className="text-2xl">🌿</span>
          <span className="hidden sm:inline">HealthWise</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-emerald-600"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
          >
            <Languages className="h-4 w-4" />
            {language === "en" ? "Hindi" : "English"}
          </Button>
          <Link href="/admin">
            <Button variant="outline" size="sm">{t("admin")}</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {language === "en" ? "HI" : "EN"}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4 dark:bg-zinc-950">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
              {t("admin")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
