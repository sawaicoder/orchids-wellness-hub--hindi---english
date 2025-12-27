"use client";

import { useI18n } from "@/lib/i18n-context";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf, Droplets, Wind, Flame, Sun, Moon, Zap, User, Heart, Activity, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: Record<string, any> = {
  Droplets: <Droplets className="h-6 w-6 text-blue-500" />,
  Wind: <Wind className="h-6 w-6 text-emerald-500" />,
  Flame: <Flame className="h-6 w-6 text-red-500" />,
  Zap: <Zap className="h-6 w-6 text-yellow-500" />,
  User: <User className="h-6 w-6 text-orange-500" />,
  Sun: <Sun className="h-6 w-6 text-pink-500" />,
  Moon: <Moon className="h-6 w-6 text-indigo-400" />,
  Activity: <Activity className="h-6 w-6 text-green-500" />,
  Heart: <Heart className="h-6 w-6 text-red-400" />,
};

export default function RemediesPage() {
  const { language, t } = useI18n();
  const [remedies, setRemedies] = useState<any[]>([]);
  const [herbs, setHerbs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [remediesRes, herbsRes] = await Promise.all([
        supabase.from("remedies").select("*").order("id"),
        supabase.from("herbs").select("*").order("id"),
      ]);

      if (!remediesRes.error && remediesRes.data) setRemedies(remediesRes.data);
      if (!herbsRes.error && herbsRes.data) setHerbs(herbsRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-12"
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
          {language === "hi" ? "आयुर्वेदिक उपचार" : "Ayurvedic Remedies"}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {language === "hi" 
            ? "प्रकृति के खजाने से स्वस्थ जीवन के लिए सरल और प्रभावी घरेलू उपचार।"
            : "Simple and effective home remedies for a healthy life from nature's treasure."}
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {remedies.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-emerald-100 dark:border-emerald-900 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                  {iconMap[item.icon_name] || <Leaf className="h-6 w-6 text-emerald-600" />}
                </div>
                <CardTitle className="text-xl">
                  {language === "hi" ? item.title_hi : item.title_en}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(language === "hi" ? item.symptoms_hi : item.symptoms_en) && (
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {language === "hi" ? item.symptoms_hi : item.symptoms_en}
                  </p>
                )}
                <div className="space-y-2">
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">
                    {language === "hi" ? "उपचार:" : "Remedies:"}
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                    {(language === "hi" ? item.remedies_hi : item.remedies_en)?.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                {(language === "hi" ? item.avoid_hi : item.avoid_en) && (
                  <p className="text-sm italic text-red-500">
                    {language === "hi" ? item.avoid_hi : item.avoid_en}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-sm border border-emerald-50 dark:border-emerald-900"
      >
        <div className="flex items-center gap-3 mb-8">
          <Leaf className="h-8 w-8 text-emerald-600" />
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {language === "hi" ? "🌱 प्रमुख आयुर्वेदिक जड़ी-बूटियाँ" : "🌱 Key Ayurvedic Herbs"}
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-700">
                <th className="py-4 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                  {language === "hi" ? "जड़ी-बूटी" : "Herb"}
                </th>
                <th className="py-4 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                  {language === "hi" ? "उपयोग" : "Use"}
                </th>
              </tr>
            </thead>
            <tbody>
              {herbs.map((herb, index) => (
                <tr key={index} className="border-b border-zinc-50 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="py-4 px-4 font-medium">{language === "hi" ? herb.name_hi : herb.name_en}</td>
                  <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{language === "hi" ? herb.use_hi : herb.use_en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
