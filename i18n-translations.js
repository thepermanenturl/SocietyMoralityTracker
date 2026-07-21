/**
 * Multilingual Translations for Society Morality Tracker
 * Languages Supported:
 * - English (en)
 * - Hindi (hi - हिंदी)
 * - Tamil (ta - தமிழ்)
 * - Bengali (bn - বাংলা)
 */
const I18N_TRANSLATIONS = {
  en: {
    siteTitle: "Society Morality Tracker",
    layerMinus1: "Meta-Rules",
    layer0: "Foundational Axioms",
    layer1: "Derived Principles",
    layer2: "Applied Ethics",
    layer3: "Complex Dilemmas",
    constitutionPromise: "Constitutional Guarantee",
    lenses: {
      constitution: "Indian Constitution",
      buddha: "Lived Human Story",
      critic: "Ground Failure & Foreign Success",
      dilemma: "Daily Citizen Dilemma"
    },
    indiaRank: "🇮🇳 India Global Index Rank",
    trustScore: "Media Trust Score",
    readAloud: "🔊 Read Aloud",
    shareCard: "📱 Share Story Card"
  },
  hi: {
    siteTitle: "समाज नैतिकता ट्रैकर",
    layerMinus1: "मेटा-नियम",
    layer0: "मौलिक स्वयंसिद्ध नियम (Axioms)",
    layer1: "व्युत्पन्न सिद्धांत",
    layer2: "व्यावहारिक नीतिशास्त्र",
    layer3: "जटिल धर्मसंकट",
    constitutionPromise: "संवैधानिक गारंटी",
    lenses: {
      constitution: "भारतीय संविधान",
      buddha: "जीवंत मानवीय कहानी",
      critic: "जमीनी विफलता और विदेशी उदाहरण",
      dilemma: "दैनिक नागरिक धर्मसंकट"
    },
    indiaRank: "🇮🇳 भारत वैश्विक सूचकांक रैंक",
    trustScore: "मीडिया विश्वसनीयता स्कोर",
    readAloud: "🔊 बोलकर सुनें",
    shareCard: "📱 कार्ड शेयर करें"
  },
  ta: {
    siteTitle: "சமூக அறநெறி கண்காணிப்பாளர்",
    layerMinus1: "மேல்-விதிகள்",
    layer0: "அடிப்படை மெய்ம்மைகள்",
    layer1: "காரணக் கோட்பாடுகள்",
    layer2: "செயல்முறை அறவியல்",
    layer3: "சிக்கலான தர்மசங்கடங்கள்",
    constitutionPromise: "அரசியலமைப்பு உத்தரவாதம்",
    lenses: {
      constitution: "இந்திய அரசியலமைப்பு",
      buddha: "வாழ்வியல் மனித கதை",
      critic: "அரசு தோல்வி & உலகளாவிய மாதிரி",
      dilemma: "தினசரி குடிமகன் குழப்பம்"
    },
    indiaRank: "🇮🇳 இந்திய உலகளாவிய தரவரிசை",
    trustScore: "ஊடக நம்பகத்தன்மை மதிப்பெண்",
    readAloud: "🔊 உரக்கப் படிக்கவும்",
    shareCard: "📱 கார்டைப் பகிரவும்"
  },
  bn: {
    siteTitle: "সমাজ নীতিবোধ ট্র্যাকার",
    layerMinus1: "মেটা-নিয়মাবলী",
    layer0: "মৌলিক সত্য (Axioms)",
    layer1: "প্রাপ্ত নীতিসমূহ",
    layer2: "প্রয়োগিক নৈতিকতা",
    layer3: "জটিল দ্বন্দ্ব",
    constitutionPromise: "সংবিধানিক প্রতিশ্রুতি",
    lenses: {
      constitution: "ভারতীয় সংবিধান",
      buddha: "বাস্তব মানবিক গল্প",
      critic: "বাস্তব ব্যর্থতা ও আন্তর্জাতিক উদাহরণ",
      dilemma: "দৈনন্দিন নাগরিক দ্বন্দ"
    },
    indiaRank: "🇮🇳 ভারত বৈশ্বিক সূচক র‍্যাঙ্ক",
    trustScore: "মিডিয়া বিশ্বাসযোগ্যতা স্কোর",
    readAloud: "🔊 মুখে শুনুন",
    shareCard: "📱 কার্ড শেয়ার করুন"
  }
};

if (typeof module !== "undefined") {
  module.exports = I18N_TRANSLATIONS;
} else if (typeof window !== "undefined") {
  window.I18N_TRANSLATIONS = I18N_TRANSLATIONS;
}
