import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "appTitle": "Misinformation Guardian",
      "pasteText": "Paste message or link here",
      "language": "Language",
      "checkButton": "Check for Misinformation",
      "loading": "Analyzing...",
      "riskScore": "Risk Score",
      "highRisk": "High Risk",
      "teachMe": "Teach Me",
      "shareReport": "Share Report",
      "quizQuestion": "What is a red flag for health misinformation?",
      "quizOption1": "Miracle cures",
      "quizOption2": "Official sources",
      "quizCorrect": "Correct! Miracle cures are often false.",
      "quizIncorrect": "Try again!"
    }
  },
  hi: {
    translation: {
      "appTitle": "गलत जानकारी गार्डियन",
      "pasteText": "संदेश या लिंक यहां पेस्ट करें",
      "language": "भाषा",
      "checkButton": "गलत जानकारी की जांच करें",
      "loading": "विश्लेषण कर रहे हैं...",
      "riskScore": "जोखिम स्कोर",
      "highRisk": "उच्च जोखिम",
      "teachMe": "मुझे सिखाएं",
      "shareReport": "रिपोर्ट साझा करें",
      "quizQuestion": "स्वास्थ्य गलत जानकारी के लिए क्या खतरे का संकेत है?",
      "quizOption1": "चमत्कारिक इलाज",
      "quizOption2": "आधिकारिक स्रोत",
      "quizCorrect": "सही! चमत्कारिक इलाज अक्सर झूठे होते हैं।",
      "quizIncorrect": "फिर से प्रयास करें!"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;