export const dietData = {
  healthy_foods: {
    en: ["Leafy Greens", "Whole Grains", "Fresh Fruits", "Nuts & Seeds", "Legumes", "Low-fat Dairy"],
    hi: ["हरी पत्तेदार सब्जियां", "साबुत अनाज", "ताजे फल", "मेवे और बीज", "फलियां", "कम वसा वाले डेयरी उत्पाद"],
  },
  avoid_foods: {
    en: ["Processed Sugar", "Deep Fried Foods", "Excessive Salt", "Carbonated Drinks", "Refined Flour (Maida)", "Trans Fats"],
    hi: ["प्रसंस्कृत चीनी", "ज्यादा तला हुआ खाना", "अत्यधिक नमक", "कार्बोनेटेड पेय", "मैदा", "ट्रांस फैट"],
  },
  daily_plans: [
    {
      time: "morning",
      veg: {
        en: "Oatmeal with fruits or Poha with vegetables. Herbal tea or lukewarm lemon water.",
        hi: "फलों के साथ ओट्स या सब्जियों के साथ पोहा। हर्बल चाय या गुनगुना नींबू पानी।",
      },
      non_veg: {
        en: "Boiled egg whites with whole grain toast. Fresh orange juice.",
        hi: "साबुत अनाज टोस्ट के साथ उबले अंडे की सफेदी। ताजा संतरे का रस।",
      },
    },
    {
      time: "afternoon",
      veg: {
        en: "Brown rice or 2 multigrain rotis, dal, seasonal vegetable, and a bowl of curd.",
        hi: "ब्राउन राइस या 2 मल्टीग्रेन रोटी, दाल, मौसमी सब्जी और एक कटोरी दही।",
      },
      non_veg: {
        en: "Grilled chicken or fish with a large portion of green salad and steamed vegetables.",
        hi: "हरी सलाद और उबली हुई सब्जियों के बड़े हिस्से के साथ ग्रिल्ड चिकन या मछली।",
      },
    },
    {
      time: "evening",
      veg: {
        en: "Roasted makhana or a handful of nuts. Green tea.",
        hi: "भुना हुआ मखाना या मुट्ठी भर मेवे। ग्रीन टी।",
      },
      non_veg: {
        en: "Chicken clear soup or small portion of tuna salad.",
        hi: "चिकन क्लियर सूप या टूना सलाद का छोटा हिस्सा।",
      },
    },
    {
      time: "night",
      veg: {
        en: "Light vegetable soup, 1 roti or small portion of khichdi. Finish 2-3 hours before sleep.",
        hi: "हल्का वेजिटेबल सूप, 1 रोटी या खिचड़ी का छोटा हिस्सा। सोने से 2-3 घंटे पहले समाप्त करें।",
      },
      non_veg: {
        en: "Baked fish or lean turkey with sautéed broccoli and asparagus.",
        hi: "सॉते की हुई ब्रोकली और शतावरी के साथ बेक्ड फिश या लीन टर्की।",
      },
    },
  ],
  disease_diet: [
    {
      disease_id: "diabetes",
      recommendation_en: "Focus on low glycemic index foods. High fiber, low sugar.",
      recommendation_hi: "कम ग्लाइसेमिक इंडेक्स वाले खाद्य पदार्थों पर ध्यान दें। उच्च फाइबर, कम चीनी।",
    },
    {
      disease_id: "bp",
      recommendation_en: "DASH diet. Low sodium, high potassium and magnesium.",
      recommendation_hi: "डैश आहार। कम सोडियम, उच्च पोटेशियम और मैग्नीशियम।",
    },
    {
      disease_id: "thyroid",
      recommendation_en: "Include iodine and selenium rich foods. Limit goitrogens.",
      recommendation_hi: "आयोडीन और सेलेनियम युक्त खाद्य पदार्थ शामिल करें। गोइट्रोजन्स को सीमित करें।",
    },
    {
      disease_id: "obesity",
      recommendation_en: "Calorie deficit. High protein, high fiber, lots of water.",
      recommendation_hi: "कैलोरी की कमी। उच्च प्रोटीन, उच्च फाइबर, बहुत सारा पानी।",
    },
  ],
};
