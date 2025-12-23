"use client";

import { useI18n } from "@/lib/i18n-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Sparkles, Brain, Moon, Sun, Wind } from "lucide-react";

const meditationData = [
  {
    id: "mindfulness",
    titleEn: "Mindfulness Meditation",
    titleHi: "सचेतन ध्यान",
    videoId: "inpok4MKVLM", // Example: 10-Minute Mindfulness
    descriptionEn: "Focus on the present moment without judgment. Great for reducing stress and improving focus.",
    descriptionHi: "बिना किसी निर्णय के वर्तमान क्षण पर ध्यान केंद्रित करें। तनाव कम करने और ध्यान सुधारने के लिए बेहतरीन है।",
    icon: <Brain className="h-6 w-6 text-blue-500" />
  },
  {
    id: "sleep",
    titleEn: "Deep Sleep Meditation",
    titleHi: "गहरी नींद का ध्यान",
    videoId: "aEqlQvczNJQ",
    descriptionEn: "Guided relaxation to help you fall into a peaceful and deep sleep.",
    descriptionHi: "आपको शांतिपूर्ण और गहरी नींद में जाने में मदद करने के लिए निर्देशित विश्राम।",
    icon: <Moon className="h-6 w-6 text-indigo-500" />
  },
  {
    id: "anxiety",
    titleEn: "Anxiety Relief",
    titleHi: "चिंता से राहत",
    videoId: "WWovodeugO8",
    descriptionEn: "Calm your nervous system and release tension from the body.",
    descriptionHi: "अपने तंत्रिका तंत्र को शांत करें और शरीर से तनाव मुक्त करें।",
    icon: <Wind className="h-6 w-6 text-emerald-500" />
  },
  {
    id: "morning",
    titleEn: "Morning Energy",
    titleHi: "सुबह की ऊर्जा",
    videoId: "ZToicYcHIOU",
    descriptionEn: "Start your day with positive intentions and vibrant energy.",
    descriptionHi: "सकारात्मक इरादों और जीवंत ऊर्जा के साथ अपने दिन की शुरुआत करें।",
    icon: <Sun className="h-6 w-6 text-orange-500" />
  }
];

export default function MeditationPage() {
  const { language, t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          {language === "en" ? "Guided Meditation" : "निर्देशित ध्यान"}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {t("tip2")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {meditationData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl dark:bg-zinc-900">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={item.titleEn}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {language === "en" ? item.titleEn : item.titleHi}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {language === "en" ? item.descriptionEn : item.descriptionHi}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
