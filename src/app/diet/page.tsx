"use client";

import { useI18n } from "@/lib/i18n-context";
import { dietData } from "@/lib/diet-data";
import { diseasesData } from "@/lib/diseases-data";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle, 
  Coffee, 
  Sun, 
  CloudSun, 
  Moon, 
  Apple, 
  Beef, 
  Filter 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DietPage() {
  const { language, t } = useI18n();
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<string>("none");

  const healthyFoods = language === "en" ? dietData.healthy_foods.en : dietData.healthy_foods.hi;
  const avoidFoods = language === "en" ? dietData.avoid_foods.en : dietData.avoid_foods.hi;

  const currentDiseaseRecommendation = dietData.disease_diet.find(d => d.disease_id === selectedDisease);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          {t("diet")} Guide
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Personalized nutrition plans for your health goals.
        </p>
      </div>

      <div className="mb-12 flex flex-col items-center justify-center gap-8 rounded-3xl bg-zinc-50 p-8 lg:flex-row">
        <div className="flex items-center space-x-4">
          <Label className={`text-lg font-bold ${!isNonVeg ? "text-emerald-600" : "text-zinc-400"}`}>
            <div className="flex items-center gap-2">
              <Apple className="h-5 w-5" /> {t("veg")}
            </div>
          </Label>
          <Switch
            checked={isNonVeg}
            onCheckedChange={setIsNonVeg}
            className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-emerald-500"
          />
          <Label className={`text-lg font-bold ${isNonVeg ? "text-orange-600" : "text-zinc-400"}`}>
            <div className="flex items-center gap-2">
              <Beef className="h-5 w-5" /> {t("non_veg")}
            </div>
          </Label>
        </div>

        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-zinc-400" />
          <Select onValueChange={setSelectedDisease} defaultValue="none">
            <SelectTrigger className="w-[280px] h-11">
              <SelectValue placeholder="Filter by disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">General Diet</SelectItem>
              {diseasesData.map(d => (
                <SelectItem key={d.id} value={d.id}>
                  {language === "en" ? d.name_en : d.name_hi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedDisease !== "none" && currentDiseaseRecommendation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 rounded-2xl bg-blue-50 p-6 border border-blue-100"
        >
          <h3 className="mb-2 text-lg font-bold text-blue-800">Special Recommendation</h3>
          <p className="text-blue-900">
            {language === "en" ? currentDiseaseRecommendation.recommendation_en : currentDiseaseRecommendation.recommendation_hi}
          </p>
        </motion.div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Healthy vs Avoid */}
        <div className="grid gap-6">
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" /> {t("healthy_foods")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {healthyFoods.map((food, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-medium shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" /> {food}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="h-5 w-5" /> {t("avoid_foods")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {avoidFoods.map((food, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-medium shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-red-500" /> {food}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Plan */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Daily Meal Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="morning" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="morning"><Coffee className="h-4 w-4 mr-2 hidden sm:inline" /> {t("morning_diet")}</TabsTrigger>
                <TabsTrigger value="afternoon"><Sun className="h-4 w-4 mr-2 hidden sm:inline" /> {t("afternoon_diet")}</TabsTrigger>
                <TabsTrigger value="evening"><CloudSun className="h-4 w-4 mr-2 hidden sm:inline" /> {t("evening_diet")}</TabsTrigger>
                <TabsTrigger value="night"><Moon className="h-4 w-4 mr-2 hidden sm:inline" /> {t("night_diet")}</TabsTrigger>
              </TabsList>
              {dietData.daily_plans.map((plan) => (
                <TabsContent key={plan.time} value={plan.time}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border bg-zinc-50 p-6"
                  >
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                      Recommendation for {plan.time}
                    </h4>
                    <p className="text-lg leading-relaxed text-zinc-900 font-medium">
                      {language === "en" 
                        ? (isNonVeg ? plan.non_veg.en : plan.veg.en)
                        : (isNonVeg ? plan.non_veg.hi : plan.veg.hi)}
                    </p>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
