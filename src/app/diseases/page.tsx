"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { diseasesData } from "@/lib/diseases-data";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DiseasesPage() {
  const { language, t } = useI18n();
  const [search, setSearch] = useState("");

  const filteredDiseases = diseasesData.filter((d) =>
    (language === "en" ? d.nameEn : d.nameHi).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">{t("diseases")}</h1>
        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <Input
              type="text"
              placeholder={t("search_diseases")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDiseases.map((disease, idx) => (
          <motion.div
            key={disease.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="flex h-full flex-col shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">
                  {language === "en" ? disease.nameEn : disease.nameHi}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {language === "en" ? disease.descEn : disease.descHi}
                </p>
                <Button asChild className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href={`/diseases/${disease.id}`}>{t("home")} →</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
