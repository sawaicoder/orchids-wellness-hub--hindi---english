"use client";

import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Apple, Heart, Search, ClipboardCheck, Calculator } from "lucide-react";

export default function HomePage() {
  const { t } = useI18n();

  const features = [
    {
      title: t("yoga"),
      desc: t("benefits_yoga_desc"),
      icon: <Activity className="h-8 w-8 text-emerald-600" />,
      href: "/yoga",
    },
    {
      title: t("diseases"),
      desc: t("disease_info"),
      icon: <Heart className="h-8 w-8 text-red-600" />,
      href: "/diseases",
    },
    {
      title: t("diet"),
      desc: t("diet_guide"),
      icon: <Apple className="h-8 w-8 text-orange-600" />,
      href: "/diet",
    },
    {
      title: t("meditation"),
      desc: t("tip2"),
      icon: <Activity className="h-8 w-8 text-indigo-600" />,
      href: "/meditation",
    },
    {
      title: t("calculators"),
      desc: t("bmi_desc"),
      icon: <Calculator className="h-8 w-8 text-blue-600" />,
      href: "/calculators",
    },
    {
      title: t("checkup"),
      desc: t("health_checkup"),
      icon: <ClipboardCheck className="h-8 w-8 text-emerald-600" />,
      href: "/checkup",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-zinc-900 dark:text-white"
          >
            {t("welcome")}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            {t("intro")}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8">
              <Link href="/checkup">{t("checkup")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/calculators">{t("calculators")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation Cards */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="group h-full border-none shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-zinc-800">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-colors group-hover:bg-emerald-50 dark:bg-zinc-700">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {feature.desc}
                    </p>
                    <Button asChild variant="link" className="mt-6 p-0 text-emerald-600 font-semibold">
                      <Link href={feature.href}>Explore More →</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Daily Tips */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">{t("daily_tips")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-white p-6 shadow-sm border dark:bg-zinc-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <span className="text-xl font-bold">{i}</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300">
                {t(`tip${i}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits of Yoga */}
      <section className="bg-emerald-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">{t("benefits_yoga_title")}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-emerald-50 text-lg">
            {t("benefits_yoga_desc")}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="text-4xl font-bold">15+</div>
              <div className="text-emerald-100">Yoga Poses</div>
            </div>
            <div>
              <div className="text-4xl font-bold">10+</div>
              <div className="text-emerald-100">Disease Guides</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-emerald-100">Health Awareness</div>
            </div>
            <div>
              <div className="text-4xl font-bold">100%</div>
              <div className="text-emerald-100">Free Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
