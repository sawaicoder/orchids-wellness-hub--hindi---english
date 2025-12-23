"use client";

import { useI18n } from "@/lib/i18n-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf, Droplets, Wind, Flame, Sun, Moon, Zap, User } from "lucide-react";

export default function RemediesPage() {
  const { language, t } = useI18n();

  const remedies = [
    {
      id: "1",
      title: "1️⃣ सर्दी–जुकाम (Cold & Cough)",
      titleEn: "1. Cold & Cough",
      symptoms: "लक्षण: छींक, नाक बहना, गले में खराश",
      symptomsEn: "Symptoms: Sneezing, runny nose, sore throat",
      remedies: [
        "अदरक + शहद: 1 चम्मच दिन में 2 बार",
        "तुलसी की चाय: 5–6 पत्ते उबालकर",
        "हल्दी वाला दूध: रात में 1 गिलास"
      ],
      remediesEn: [
        "Ginger + Honey: 1 tsp twice a day",
        "Tulsi Tea: Boil 5-6 leaves",
        "Turmeric Milk: 1 glass at night"
      ],
      avoid: "क्या न खाएं: ठंडा पानी, आइसक्रीम",
      avoidEn: "Avoid: Cold water, Ice cream",
      icon: <Droplets className="h-6 w-6 text-blue-500" />
    },
    {
      id: "2",
      title: "2️⃣ खांसी (Cough)",
      titleEn: "2. Cough",
      remedies: [
        "काली मिर्च + शहद (½ चम्मच)",
        "मुलेठी चूसना",
        "भाप लेना (Steam)"
      ],
      remediesEn: [
        "Black Pepper + Honey (½ tsp)",
        "Suck on Mulethi (Liquorice)",
        "Steam inhalation"
      ],
      icon: <Wind className="h-6 w-6 text-emerald-500" />
    },
    {
      id: "3",
      title: "3️⃣ बुखार (Fever)",
      titleEn: "3. Fever",
      remedies: [
        "तुलसी + अदरक का काढ़ा",
        "गुनगुना पानी पीते रहें",
        "शरीर को आराम दें"
      ],
      remediesEn: [
        "Tulsi + Ginger Decoction (Kadha)",
        "Keep drinking lukewarm water",
        "Rest the body"
      ],
      avoid: "परहेज: तला-भुना भोजन",
      avoidEn: "Avoid: Fried & greasy food",
      icon: <Flame className="h-6 w-6 text-red-500" />
    },
    {
      id: "4",
      title: "4️⃣ सिरदर्द (Headache)",
      titleEn: "4. Headache",
      remedies: [
        "लौंग पीसकर माथे पर लगाएं",
        "अदरक की चाय",
        "10–15 मिनट ध्यान"
      ],
      remediesEn: [
        "Apply ground cloves to the forehead",
        "Ginger tea",
        "10-15 minutes meditation"
      ],
      icon: <Zap className="h-6 w-6 text-yellow-500" />
    },
    {
      id: "5",
      title: "5️⃣ पेट दर्द (Stomach Pain)",
      titleEn: "5. Stomach Pain",
      remedies: [
        "अजवाइन + काला नमक",
        "हींग को गुनगुने पानी में",
        "सादा भोजन"
      ],
      remediesEn: [
        "Ajwain (Carom seeds) + Black salt",
        "Hing (Asafoetida) in lukewarm water",
        "Simple/Plain food"
      ],
      icon: <User className="h-6 w-6 text-orange-500" />
    },
    {
      id: "6",
      title: "6️⃣ गैस और अपच (Gas & Indigestion)",
      titleEn: "6. Gas & Indigestion",
      remedies: [
        "सौंफ चबाएं",
        "जीरा पानी",
        "छाछ (मट्ठा)"
      ],
      remediesEn: [
        "Chew Saunf (Fennel seeds)",
        "Jeera (Cumin) water",
        "Buttermilk (Chaas)"
      ],
      icon: <Wind className="h-6 w-6 text-blue-400" />
    },
    {
      id: "7",
      title: "7️⃣ कब्ज (Constipation)",
      titleEn: "7. Constipation",
      remedies: [
        "त्रिफला चूर्ण (रात में)",
        "गर्म पानी सुबह",
        "फल और फाइबर"
      ],
      remediesEn: [
        "Triphala powder (at night)",
        "Warm water in the morning",
        "Fruits and fiber-rich food"
      ],
      icon: <Droplets className="h-6 w-6 text-emerald-400" />
    },
    {
      id: "8",
      title: "8️⃣ दस्त (Loose Motion)",
      titleEn: "8. Loose Motion",
      remedies: [
        "अनार का छिलका उबालकर",
        "दही + मिश्री",
        "ORS"
      ],
      remediesEn: [
        "Boiled pomegranate peel",
        "Curd + Mishri (Rock sugar)",
        "ORS"
      ],
      icon: <Droplets className="h-6 w-6 text-cyan-500" />
    },
    {
      id: "9",
      title: "9️⃣ मुंह के छाले (Mouth Ulcer)",
      titleEn: "9. Mouth Ulcer",
      remedies: [
        "शहद लगाएं",
        "नारियल पानी",
        "मसालेदार खाना बंद"
      ],
      remediesEn: [
        "Apply Honey",
        "Coconut water",
        "Stop spicy food"
      ],
      icon: <Sun className="h-6 w-6 text-pink-500" />
    },
    {
      id: "10",
      title: "🔟 दांत दर्द (Toothache)",
      titleEn: "10. Toothache",
      remedies: [
        "लौंग दबाएं",
        "नमक + सरसों का तेल",
        "नीम की दातून"
      ],
      remediesEn: [
        "Press a clove on the tooth",
        "Salt + Mustard oil",
        "Neem twig (Datun)"
      ],
      icon: <Zap className="h-6 w-6 text-gray-500" />
    },
    {
      id: "11",
      title: "1️⃣1️⃣ त्वचा रोग (Skin Problems)",
      titleEn: "11. Skin Problems",
      remedies: [
        "हल्दी + नीम पेस्ट",
        "एलोवेरा जेल",
        "साफ पानी से धोना"
      ],
      remediesEn: [
        "Turmeric + Neem paste",
        "Aloe Vera gel",
        "Wash with clean water"
      ],
      icon: <Sun className="h-6 w-6 text-yellow-400" />
    },
    {
      id: "12",
      title: "1️⃣2️⃣ बालों का झड़ना (Hair Fall)",
      titleEn: "12. Hair Fall",
      remedies: [
        "नारियल तेल + आंवला",
        "हफ्ते में 2 बार मालिश",
        "प्रोटीन युक्त आहार"
      ],
      remediesEn: [
        "Coconut oil + Amla",
        "Massage twice a week",
        "Protein-rich diet"
      ],
      icon: <Moon className="h-6 w-6 text-indigo-400" />
    },
    {
      id: "13",
      title: "1️⃣3️⃣ मोटापा (Weight Loss)",
      titleEn: "13. Weight Loss",
      remedies: [
        "गुनगुना नींबू पानी",
        "त्रिफला",
        "रोज़ योग/चलना"
      ],
      remediesEn: [
        "Lukewarm lemon water",
        "Triphala",
        "Daily yoga/walking"
      ],
      icon: <Activity className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Activity>
    },
    {
      id: "14",
      title: "1️⃣4️⃣ कमजोरी (Weakness)",
      titleEn: "14. Weakness",
      remedies: [
        "अश्वगंधा",
        "शहद + दूध",
        "पर्याप्त नींद"
      ],
      remediesEn: [
        "Ashwagandha",
        "Honey + Milk",
        "Adequate sleep"
      ],
      icon: <Zap className="h-6 w-6 text-orange-400" />
    },
    {
      id: "15",
      title: "1️⃣5️⃣ डायबिटीज (Sugar Control)",
      titleEn: "15. Diabetes (Sugar Control)",
      remedies: [
        "मेथी दाना भिगोकर",
        "करेला जूस",
        "मीठा कम करें"
      ],
      remediesEn: [
        "Soaked Fenugreek (Methi) seeds",
        "Bitter gourd (Karela) juice",
        "Reduce sweets"
      ],
      icon: <Heart className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></Heart>
    }
  ];

  const herbs = [
    { name: "अदरक", nameEn: "Ginger", use: "पाचन, सर्दी", useEn: "Digestion, Cold" },
    { name: "हल्दी", nameEn: "Turmeric", use: "सूजन, घाव", useEn: "Inflammation, Wounds" },
    { name: "तुलसी", nameEn: "Tulsi", use: "इम्युनिटी", useEn: "Immunity" },
    { name: "नीम", nameEn: "Neem", use: "त्वचा", useEn: "Skin" },
    { name: "आंवला", nameEn: "Amla", use: "बाल, आँखें", useEn: "Hair, Eyes" },
    { name: "सौंफ", nameEn: "Saunf", use: "गैस", useEn: "Gas" },
    { name: "अजवाइन", nameEn: "Ajwain", use: "पेट दर्द", useEn: "Stomach Pain" },
    { name: "लौंग", nameEn: "Cloves", use: "दांत दर्द", useEn: "Toothache" }
  ];

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
                  {item.icon}
                </div>
                <CardTitle className="text-xl">
                  {language === "hi" ? item.title : item.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(item.symptoms || item.symptomsEn) && (
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {language === "hi" ? item.symptoms : item.symptomsEn}
                  </p>
                )}
                <div className="space-y-2">
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">
                    {language === "hi" ? "उपचार:" : "Remedies:"}
                  </p>
                  <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                    {(language === "hi" ? item.remedies : item.remediesEn).map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                {(item.avoid || item.avoidEn) && (
                  <p className="text-sm italic text-red-500">
                    {language === "hi" ? item.avoid : item.avoidEn}
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
                  <td className="py-4 px-4 font-medium">{language === "hi" ? herb.name : herb.nameEn}</td>
                  <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{language === "hi" ? herb.use : herb.useEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}

// Support components for missing icons
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function Heart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
