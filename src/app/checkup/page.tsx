"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useI18n } from "@/lib/i18n-context";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { diseasesData } from "@/lib/diseases-data";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().transform(Number).pipe(z.number().min(1).max(120)),
  gender: z.string(),
  height: z.string().transform(Number).pipe(z.number().min(50).max(250)),
  weight: z.string().transform(Number).pipe(z.number().min(10).max(300)),
  contact_number: z.string().min(10),
  email: z.string().email(),
  existing_disease: z.string(),
  symptoms: z.string().optional(),
  lifestyle: z.string(),
});

export default function CheckupPage() {
  const { language, t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      gender: "Male",
      existing_disease: "None",
      lifestyle: "Active",
      symptoms: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("health_submissions").insert([values]);
      if (error) throw error;
      setSubmittedData(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getSuggestions = (data: any) => {
    const suggestions = {
      yoga: ["Surya Namaskar", "Pranayama"],
      diet: ["Eat more greens", "Hydrate well"],
      lifestyle: ["Sleep 7-8 hours", "Daily walking"],
    };

    if (data.existing_disease === "diabetes") {
      suggestions.yoga.push("Paschimottanasana");
      suggestions.diet.push("Low glycemic index foods");
    } else if (data.existing_disease === "blood-pressure") {
      suggestions.yoga.push("Shavasana");
      suggestions.diet.push("Reduce salt intake");
    }

    if (data.lifestyle === "Sedentary") {
      suggestions.lifestyle.push("Add 30 mins of moderate activity");
    }

    return suggestions;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">{t("checkup")}</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Complete the form for personalized health insights.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!submittedData ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mx-auto max-w-2xl"
          >
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("full_name")}</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("age")}</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("height")}</FormLabel>
                            <FormControl><Input type="number" placeholder="cm" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("weight")}</FormLabel>
                            <FormControl><Input type="number" placeholder="kg" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("gender")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact")}</FormLabel>
                            <FormControl><Input placeholder="+91..." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="existing_disease"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("existing_disease")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select disease" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="None">None</SelectItem>
                              {diseasesData.map((d) => (
                                <SelectItem key={d.id} value={d.id}>
                                  {language === "en" ? d.nameEn : d.nameHi}
                                </SelectItem>
                              ))}
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="symptoms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("symptoms")}</FormLabel>
                          <FormControl><Textarea placeholder="Describe your symptoms..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lifestyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("lifestyle")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select lifestyle" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">{t("active")}</SelectItem>
                              <SelectItem value="Sedentary">{t("sedentary")}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {t("submit")}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-8 flex items-center justify-center gap-4 text-emerald-600">
              <CheckCircle className="h-10 w-10" />
              <h2 className="text-3xl font-bold">{t("suggestions_title")}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border-emerald-500/20 bg-emerald-50 dark:bg-emerald-900/20">
                <CardHeader><CardTitle className="text-emerald-700 dark:text-emerald-300">🧘 {t("yoga")}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getSuggestions(submittedData).yoga.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">• {s}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-500/20 bg-orange-50 dark:bg-orange-900/20">
                <CardHeader><CardTitle className="text-orange-700 dark:text-orange-300">🍎 {t("diet")}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getSuggestions(submittedData).diet.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">• {s}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-blue-50 dark:bg-blue-900/20">
                <CardHeader><CardTitle className="text-blue-700 dark:text-blue-300">🏃 {t("lifestyle")}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getSuggestions(submittedData).lifestyle.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">• {s}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-none bg-amber-50 p-4 dark:bg-amber-900/20">
              <CardContent className="flex items-center gap-4 pt-4 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <p className="text-sm font-medium">{t("disclaimer")}</p>
              </CardContent>
            </Card>

            <div className="mt-10 flex justify-center">
              <Button onClick={() => setSubmittedData(null)} variant="outline">
                New Checkup
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
