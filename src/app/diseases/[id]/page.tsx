"use client";

import { use } from "react";
import { useI18n } from "@/lib/i18n-context";
import { diseasesData } from "@/lib/diseases-data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, AlertCircle, Info, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DiseaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { language, t } = useI18n();
  const disease = diseasesData.find((d) => d.id === id);

  if (!disease) {
    notFound();
  }

  const sections = [
    { title: t("causes"), items: language === "en" ? disease.causesEn : disease.causesHi, icon: <Info className="text-blue-500" /> },
    { title: t("symptoms"), items: language === "en" ? disease.symptomsEn : disease.symptomsHi, icon: <AlertCircle className="text-amber-500" /> },
    { title: t("remedies"), items: language === "en" ? disease.remediesEn : disease.remediesHi, icon: <CheckCircle2 className="text-emerald-500" /> },
    { title: t("yoga"), items: language === "en" ? disease.yogaEn : disease.yogaHi, icon: <Activity className="text-purple-500" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/diseases" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("home")}
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          {language === "en" ? disease.nameEn : disease.nameHi}
        </h1>
        <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
          {language === "en" ? disease.descEn : disease.descHi}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {sections.map((section, idx) => (
          <Card key={idx} className="border-none bg-zinc-50 shadow-sm dark:bg-zinc-800">
            <CardHeader className="flex flex-row items-center gap-4">
              {section.icon}
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle>{t("dos")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
              {(language === "en" ? disease.dosEn : disease.dosHi).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle>{t("donts")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
              {(language === "en" ? disease.dontsEn : disease.dontsHi).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 border-none bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300">
            {t("consult_doctor")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600 dark:text-blue-400">
            {language === "en" ? disease.consultEn : disease.consultHi}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
