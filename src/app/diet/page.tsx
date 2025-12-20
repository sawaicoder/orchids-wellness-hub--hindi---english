"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { diseasesData } from "@/lib/diseases-data";

const generalDiet = {
  veg: {
    morning: ["Oats with fruits", "Sprouted moong dal", "Green tea"],
    afternoon: ["Whole grain roti", "Green leafy vegetables", "Dal", "Curd"],
    evening: ["Roasted makhana", "Herbal tea", "Walnuts"],
    night: ["Vegetable soup", "Grilled paneer", "Light salad"],
  },
  nonVeg: {
    morning: ["Boiled eggs", "Whole wheat toast", "Fruit juice"],
    afternoon: ["Grilled chicken", "Brown rice", "Salad", "Steamed veggies"],
    evening: ["Tuna salad", "Almonds", "Black coffee"],
    night: ["Baked fish", "Mixed vegetable soup", "Light stir-fry"],
  }
};

export default function DietPage() {
  const { language, t } = useI18n();
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("general");

  const diet = isNonVeg ? generalDiet.nonVeg : generalDiet.veg;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">{t("diet")}</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Personalized nutrition for a healthier you.
        </p>
      </div>

      <div className="mb-12 flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex items-center space-x-2">
          <Label htmlFor="diet-mode" className={!isNonVeg ? "font-bold text-emerald-600" : ""}>{t("veg")}</Label>
          <Switch
            id="diet-mode"
            checked={isNonVeg}
            onCheckedChange={setIsNonVeg}
          />
          <Label htmlFor="diet-mode" className={isNonVeg ? "font-bold text-red-600" : ""}>{t("non_veg")}</Label>
        </div>

        <div className="w-full max-w-xs">
          <Select onValueChange={setSelectedDisease} defaultValue="general">
            <SelectTrigger>
              <SelectValue placeholder={t("existing_disease")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Health</SelectItem>
              {diseasesData.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {language === "en" ? d.nameEn : d.nameHi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(diet).map(([meal, items], idx) => (
          <motion.div
            key={meal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full border-t-4 border-t-emerald-500 shadow-sm">
              <CardHeader>
                <CardTitle className="capitalize text-emerald-600">
                  {t(`${meal}_diet`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-emerald-500">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <span className="text-2xl">🥗</span> {t("healthy_foods")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 text-sm text-emerald-800 dark:text-emerald-200">
              <li>• Green Vegetables</li>
              <li>• Fresh Fruits</li>
              <li>• Whole Grains</li>
              <li>• Nuts & Seeds</li>
              <li>• Low-fat Dairy</li>
              <li>• Lean Proteins</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <span className="text-2xl">🍕</span> {t("avoid_foods")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 text-sm text-red-800 dark:text-red-200">
              <li>• Processed Sugar</li>
              <li>• Deep Fried Foods</li>
              <li>• Carbonated Drinks</li>
              <li>• Excess Salt</li>
              <li>• Refined Flour</li>
              <li>• Trans Fats</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {selectedDisease !== "general" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-dashed border-emerald-500/30"
        >
          <h3 className="text-2xl font-bold mb-4">
            Special Recommendations for {diseasesData.find(d => d.id === selectedDisease)?.nameEn}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            For {selectedDisease}, focus on anti-inflammatory foods and maintain consistent meal timing. 
            Consult with a dietitian for a precise calorie-counted plan.
          </p>
        </motion.div>
      )}
    </div>
  );
}
