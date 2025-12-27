"use client";

import { useI18n } from "@/lib/i18n-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const yogaData = [
    {
      id: "morning",
      titleKey: "morning_yoga",
      videoId: "OMu6OKF5Z1k", // Yoga Morning Fresh
      poses: [
        { nameEn: "Sun Salutation (Surya Namaskar)", nameHi: "सूर्य नमस्कार", benefitEn: "Energizes the body", benefitHi: "शरीर को ऊर्जावान बनाता है" },
        { nameEn: "Child's Pose", nameHi: "बालासन", benefitEn: "Calms the mind", benefitHi: "मन को शांत करता है" },
      ],
    },
    {
      id: "weight-loss",
      titleKey: "weight_loss",
      videoId: "digpucxFbMo", // Yoga For Weight Loss - 20 min
      poses: [
        { nameEn: "Plank Pose", nameHi: "फलकासन", benefitEn: "Strengthens core", benefitHi: "कोर को मजबूत करता है" },
        { nameEn: "Warrior II", nameHi: "वीरभद्रासन II", benefitEn: "Tones legs and arms", benefitHi: "पैरों और हाथों को टोन करता है" },
      ],
    },
    {
      id: "diabetes",
      titleKey: "diabetes_yoga",
      videoId: "fmh58tykgpo", // Yoga for Diabetes
      poses: [
        { nameEn: "Seated Forward Bend", nameHi: "पश्चिमोत्तानासन", benefitEn: "Massages abdominal organs", benefitHi: "पेट के अंगों की मालिश करता है" },
        { nameEn: "Spinal Twist", nameHi: "अर्ध मत्स्येंद्रासन", benefitEn: "Regulates insulin levels", benefitHi: "इंसुलिन स्तर को नियंत्रित करता है" },
      ],
    },
    {
      id: "back-pain",
      titleKey: "back_pain_yoga",
      videoId: "ulvc5Gd6INcf4GiG", // Yoga for Lower Back Pain
      poses: [
        { nameEn: "Cat-Cow Pose", nameHi: "मार्जरीआसन", benefitEn: "Improves spinal flexibility", benefitHi: "रीढ़ की हड्डी के लचीलेपन में सुधार करता है" },
        { nameEn: "Cobra Pose", nameHi: "भुजंगासन", benefitEn: "Relieves lower back stiffness", benefitHi: "पीठ के निचले हिस्से की जकड़न को दूर करता है" },
      ],
    },
    {
      id: "stress",
      titleKey: "stress_yoga",
      videoId: "sTANio_2E0Q", // Yoga for Stress Relief
      poses: [
        { nameEn: "Legs Up the Wall", nameHi: "विपरीत करणी", benefitEn: "Reduces anxiety", benefitHi: "चिंता कम करता है" },
        { nameEn: "Corpse Pose", nameHi: "शवासन", benefitEn: "Deep relaxation", benefitHi: "गहरी विश्राम" },
      ],
    },
];

export default function YogaPage() {
  const { language, t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">{t("yoga")}</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {t("benefits_yoga_desc")}
        </p>
      </motion.div>

      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="mb-8 flex flex-wrap justify-center bg-transparent gap-2 h-auto">
          {yogaData.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="rounded-full border data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              {t(item.titleKey)}
            </TabsTrigger>
          ))}
        </TabsList>

        {yogaData.map((item) => (
          <TabsContent key={item.id} value={item.id} className="mt-0">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={t(item.titleKey)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-emerald-600">{t(item.titleKey)}</h2>
                <div className="space-y-6">
                  {item.poses.map((pose, idx) => (
                    <Card key={idx} className="border-none bg-zinc-50 dark:bg-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {language === "en" ? pose.nameEn : pose.nameHi}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold text-emerald-600">
                          {t("benefits")}:
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          {language === "en" ? pose.benefitEn : pose.benefitHi}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
