"use client";

import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Droplets, Flame, Scale } from "lucide-react";

export default function CalculatorsPage() {
  const { t } = useI18n();
  const [bmi, setBmi] = useState<string | null>(null);
  const [bmr, setBmr] = useState<string | null>(null);
  const [water, setWater] = useState<string | null>(null);

  // Form states
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = Number(height) / 100;
    const w = Number(weight);
    const result = w / (h * h);
    setBmi(result.toFixed(1));
  };

  const calculateBMR = () => {
    if (!height || !weight || !age) return;
    const h = Number(height);
    const w = Number(weight);
    const a = Number(age);
    
    // Mifflin-St Jeor Equation
    let result = 10 * w + 6.25 * h - 5 * a;
    if (gender === "male") result += 5;
    else result -= 161;
    
    setBmr(result.toFixed(0));
  };

  const calculateWater = () => {
    if (!weight) return;
    const w = Number(weight);
    // Rough estimate: 35ml per kg
    const result = (w * 35) / 1000;
    setWater(result.toFixed(1));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Calculator className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {t("calc_title")}
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Simple tools to help you track and maintain your fitness goals.
          </p>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* BMI Calculator */}
        <Card className="flex flex-col border-none shadow-md transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Scale className="h-5 w-5" />
            </div>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>{t("bmi_desc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>{t("height")}</Label>
              <Input 
                type="number" 
                placeholder="cm" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("weight")}</Label>
              <Input 
                type="number" 
                placeholder="kg" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button onClick={calculateBMI} className="w-full bg-blue-600 hover:bg-blue-700">
              {t("calculate")}
            </Button>
            {bmi && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-600">{t("result")}</p>
                <p className="text-3xl font-bold text-blue-900">{bmi}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* BMR Calculator */}
        <Card className="flex flex-col border-none shadow-md transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <Flame className="h-5 w-5" />
            </div>
            <CardTitle>{t("bmr_title")}</CardTitle>
            <CardDescription>{t("bmr_desc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>{t("age")}</Label>
              <Input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("gender")}</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={calculateBMR} className="w-full bg-orange-600 hover:bg-orange-700">
              {t("calculate")}
            </Button>
            {bmr && (
              <div className="mt-4 rounded-lg bg-orange-50 p-4 text-center">
                <p className="text-sm text-orange-600">{t("result")}</p>
                <p className="text-3xl font-bold text-orange-900">{bmr} kcal</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Water Intake Calculator */}
        <Card className="flex flex-col border-none shadow-md transition-all hover:shadow-lg md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
              <Droplets className="h-5 w-5" />
            </div>
            <CardTitle>{t("water_title")}</CardTitle>
            <CardDescription>{t("water_desc")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>{t("weight")}</Label>
              <Input 
                type="number" 
                placeholder="kg" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <Button onClick={calculateWater} className="w-full bg-cyan-600 hover:bg-cyan-700">
              {t("calculate")}
            </Button>
            {water && (
              <div className="mt-4 rounded-lg bg-cyan-50 p-4 text-center">
                <p className="text-sm text-cyan-600">{t("result")}</p>
                <p className="text-3xl font-bold text-cyan-900">{water} Liters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
