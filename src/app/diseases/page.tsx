"use client";

import { useI18n } from "@/lib/i18n-context";
import { diseasesData } from "@/lib/diseases-data";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DiseasesPage() {
  const { language, t } = useI18n();
  const [search, setSearch] = useState("");

  const filteredDiseases = diseasesData.filter((d) => {
    const name = language === "en" ? d.name_en : d.name_hi;
    return (name || "").toLowerCase().includes((search || "").toLowerCase());
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          {t("diseases")} Information
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Learn about various health conditions, their causes, and natural remedies.
        </p>
      </div>

      <div className="mx-auto mb-10 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder={t("search_diseases") || "Search..."}
            className="pl-10 h-12 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDiseases.map((disease, idx) => (
          <motion.div
            key={disease.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={`/diseases/${disease.id}`}>
              <Card className="h-full transition-all hover:shadow-md hover:border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {language === "en" ? disease.name_en : disease.name_hi}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 line-clamp-2">
                    {language === "en" ? disease.description_en : disease.description_hi}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
