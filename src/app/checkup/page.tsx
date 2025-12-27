"use client";

import { useI18n } from "@/lib/i18n-context";
import { diseasesData } from "@/lib/diseases-data";
import { dietData } from "@/lib/diet-data";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Stethoscope, 
  Loader2, 
  Sparkles, 
  Info, 
  Wind, 
  Utensils, 
  Activity 
} from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Please select gender"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  contact_number: z.string().min(10, "Valid contact number required"),
  email: z.string().email("Invalid email address"),
  existing_disease: z.string().optional(),
  symptoms: z.string().min(5, "Please describe your symptoms"),
  lifestyle: z.string().min(1, "Please select lifestyle"),
});

type FormInput = z.infer<typeof formSchema>;

export default function CheckupPage() {
  const { language, t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [diseases, setDiseases] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDiseases() {
      const { data } = await supabase.from("diseases").select("id, name_en, name_hi");
      if (data) setDiseases(data);
    }
    fetchDiseases();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      lifestyle: "Active",
      existing_disease: "none",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const numAge = Number(data.age);
      const numHeight = Number(data.height);
      const numWeight = Number(data.weight);

      // Generate Smart Suggestions
      const diseaseId = data.existing_disease;
      const diseaseInfo = diseasesData.find(d => d.id === diseaseId);
      const dietInfo = dietData.disease_diet.find(d => d.disease_id === diseaseId);

      // BMI calculation
      const heightInMeters = numHeight / 100;
      const bmi = numWeight / (heightInMeters * heightInMeters);
      
      let bmiStatus = "Healthy";
      if (bmi < 18.5) bmiStatus = "Underweight";
      else if (bmi >= 25 && bmi < 30) bmiStatus = "Overweight";
      else if (bmi >= 30) bmiStatus = "Obese";

      const results = {
        bmi: bmi.toFixed(1),
        bmiStatus,
        disease: diseaseInfo,
        diet: dietInfo,
        general: [
          "Stay hydrated: Drink 3-4 liters of water daily.",
          "Sleep: Ensure 7-8 hours of quality sleep.",
          data.lifestyle === "Sedentary" ? "Activity: Start with 20 mins of daily walking." : "Activity: Maintain your active lifestyle with strength training.",
        ],
      };

      // Save to Supabase (if keys are set, otherwise skip)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { error } = await supabase.from("health_submissions").insert([
          {
            ...data,
            age: numAge,
            height: data.height,
            weight: data.weight,
            suggestions: results
          },
        ]);
        if (error) console.error("Supabase error:", error);
      }

      setSuggestions(results);
      toast.success("Assessment complete!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (suggestions) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {t("suggestions_title")}
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Based on your profile, here are our recommendations for you.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8">
          {/* BMI Card */}
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Your BMI Score</CardTitle>
                <CardDescription>Body Mass Index assessment</CardDescription>
              </div>
              <div className="text-3xl font-bold text-emerald-700">{suggestions.bmi}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-3 w-3 rounded-full ${
                  suggestions.bmiStatus === "Healthy" ? "bg-emerald-500" : "bg-orange-500"
                }`} />
                <span className="font-semibold text-zinc-900">{suggestions.bmiStatus}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                {suggestions.bmiStatus === "Healthy" 
                  ? "Great job! You are in the healthy weight range." 
                  : "We recommend consulting a nutritionist for personalized weight management."}
              </p>
            </CardContent>
          </Card>

          {/* Yoga Recommendation */}
          {suggestions.disease && (
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Wind className="h-6 w-6 text-purple-600" />
                <CardTitle>Recommended Yoga</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-zinc-900">
                  {language === "en" ? suggestions.disease.yoga_en : suggestions.disease.yoga_hi}
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  These poses are specifically chosen to help manage {language === "en" ? suggestions.disease.name_en : suggestions.disease.name_hi}.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Diet Recommendation */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Utensils className="h-6 w-6 text-orange-600" />
              <CardTitle>Diet Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {suggestions.diet ? (
                <p className="text-lg font-medium text-zinc-900">
                  {language === "en" ? suggestions.diet.recommendation_en : suggestions.diet.recommendation_hi}
                </p>
              ) : (
                <ul className="list-inside list-disc space-y-2 text-zinc-900 font-medium">
                  {suggestions.general.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            <Info className="h-5 w-5 shrink-0 text-white" />
            <p className="text-sm italic">{t("disclaimer")}</p>
          </div>

          <Button 
            onClick={() => setSuggestions(null)} 
            variant="outline" 
            className="mx-auto"
          >
            Submit Another Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <Stethoscope className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("checkup")} Form
        </h1>
        <p className="mt-2 text-zinc-600">
          Get a personalized health analysis in just 2 minutes.
        </p>
      </div>

      <Card className="border-zinc-200 shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">{t("full_name")}</Label>
                <Input id="full_name" {...register("full_name")} placeholder="John Doe" />
                {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="age">{t("age")}</Label>
                <Input id="age" type="number" {...register("age")} />
                {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">{t("gender")}</Label>
                <Select onValueChange={(val) => setValue("gender", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_number">{t("contact")}</Label>
                <Input id="contact_number" {...register("contact_number")} />
                {errors.contact_number && <p className="text-xs text-red-500">{errors.contact_number.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="height">{t("height")}</Label>
                <Input id="height" type="number" {...register("height")} placeholder="cm" />
                {errors.height && <p className="text-xs text-red-500">{errors.height.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">{t("weight")}</Label>
                <Input id="weight" type="number" {...register("weight")} placeholder="kg" />
                {errors.weight && <p className="text-xs text-red-500">{errors.weight.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existing_disease">{t("existing_disease")}</Label>
              <Select onValueChange={(val) => setValue("existing_disease", val)} defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Select disease" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {diseasesData.map(d => (
                    <SelectItem key={d.id} value={d.id}>
                      {language === "en" ? d.name_en : d.name_hi}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">{t("symptoms")}</Label>
              <Textarea 
                id="symptoms" 
                {...register("symptoms")} 
                placeholder="Describe how you're feeling..."
                className="min-h-[100px]"
              />
              {errors.symptoms && <p className="text-xs text-red-500">{errors.symptoms.message}</p>}
            </div>

            <div className="space-y-4">
              <Label>{t("lifestyle")}</Label>
              <RadioGroup defaultValue="Active" onValueChange={(val) => setValue("lifestyle", val)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Active" id="active" />
                  <Label htmlFor="active">{t("active")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sedentary" id="sedentary" />
                  <Label htmlFor="sedentary">{t("sedentary")}</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" /> {t("submit")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
