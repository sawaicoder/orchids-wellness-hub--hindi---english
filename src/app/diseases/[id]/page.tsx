"use client";

import { useI18n } from "@/lib/i18n-context";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, AlertCircle, Info, Wind, HeartPulse, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DiseaseDetailPage() {
  const { language, t } = useI18n();
  const params = useParams();
  const router = useRouter();
  const [disease, setDisease] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDisease() {
      const { data, error } = await supabase
        .from("diseases")
        .select("*")
        .eq("id", params.id)
        .single();
      
      if (!error && data) {
        setDisease(data);
      }
      setLoading(false);
    }
    fetchDisease();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Disease not found</h1>
        <Button onClick={() => router.push("/diseases")} className="mt-4 bg-emerald-600 hover:bg-emerald-700">
          Go Back
        </Button>
      </div>
    );
  }

  const sections = [
    {
      title: t("causes"),
      icon: <Info className="h-5 w-5 text-blue-500" />,
      content: language === "en" ? disease.causes_en : disease.causes_hi,
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: t("symptoms"),
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      content: language === "en" ? disease.symptoms_en : disease.symptoms_hi,
      color: "bg-amber-50 border-amber-100",
    },
    {
      title: t("remedies"),
      icon: <HeartPulse className="h-5 w-5 text-emerald-500" />,
      content: language === "en" ? disease.remedies_en : disease.remedies_hi,
      color: "bg-emerald-50 border-emerald-100",
    },
    {
      title: "Yoga for this Disease",
      icon: <Wind className="h-5 w-5 text-purple-500" />,
      content: language === "en" ? disease.yoga_en : disease.yoga_hi,
      color: "bg-purple-50 border-purple-100",
    },
  ];

  const dos = (language === "en" ? disease.dos_en : disease.dos_hi)?.split(", ") || [];
  const donts = (language === "en" ? disease.donts_en : disease.donts_hi)?.split(", ") || [];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Button
        variant="ghost"
        onClick={() => router.push("/diseases")}
        className="mb-8 flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Diseases
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          {language === "en" ? disease.name_en : disease.name_hi}
        </h1>
        <p className="mt-4 text-xl text-zinc-600">
          {language === "en" ? disease.description_en : disease.description_hi}
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={`h-full border ${section.color}`}>
              <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                {section.icon}
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700">{section.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Do's */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-emerald-50 p-8 border border-emerald-100"
        >
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-emerald-700">
            <CheckCircle2 className="h-6 w-6" /> {t("dos")}
          </h3>
          <ul className="space-y-4">
            {dos.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-emerald-900">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Don'ts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-red-50 p-8 border border-red-100"
        >
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-red-700">
            <AlertCircle className="h-6 w-6" /> {t("donts")}
          </h3>
          <ul className="space-y-4">
            {donts.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-red-900">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 rounded-3xl bg-zinc-900 p-8 text-white sm:p-12"
      >
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 text-3xl">
            👨‍⚕️
          </div>
          <div>
            <h3 className="text-2xl font-bold">{t("consult_doctor")}</h3>
            <p className="mt-2 text-zinc-400">
              {language === "en" ? disease.consult_doctor_en : disease.consult_doctor_hi}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
