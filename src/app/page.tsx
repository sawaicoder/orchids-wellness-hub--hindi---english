"use client";

import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Apple, Heart, Search, ClipboardCheck } from "lucide-react";

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
      title: t("checkup"),
      desc: t("health_checkup"),
      icon: <ClipboardCheck className="h-8 w-8 text-blue-600" />,
      href: "/checkup",
    },
  ];

  return (
    <div className="flex flex-col gap-16 py-10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-900 dark:text-white"
        >
          {t("welcome")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
        >
          {t("intro")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/checkup">{t("checkup")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/yoga">{t("yoga")}</Link>
          </Button>
        </motion.div>
      </section>

      {/* Navigation Cards */}
      <section className="bg-zinc-50 py-16 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md transition-all hover:shadow-xl dark:bg-zinc-800">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature.desc}
                    </p>
                    <Button asChild variant="link" className="mt-4 p-0 text-emerald-600">
                      <Link href={feature.href}>{t("home")} →</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
