// Global language variable
window._lang = "en";

// LANGUAGE DATA
const LANG = {
  en: {
    buyHomeTitle: "Buyer Home Page",
    searchPlaceholder: "Search crops, farmers, markets...",
    speakerMsgHome: "Welcome to your buyer dashboard.",
    newsTitle: "Agriculture News",
    priceUpdates: "Live Crop Prices",
    navChat: "Chat with Farmers",
    navShop: "Shop Now",
    navSubs: "Subscription Plans",
    navHelp: "Help"
  },

  ta: {
    buyHomeTitle: "வாங்குபவர் முகப்பு பக்கம்",
    searchPlaceholder: "பயிர்கள், விவசாயிகள், சந்தைகளை தேடுங்கள்...",
    speakerMsgHome: "வாங்குபவர் கட்டுப்பாட்டு பலகைக்கு வரவேற்கிறோம்.",
    newsTitle: "வேளாண் செய்திகள்",
    priceUpdates: "நேரடி பயிர் விலை",
    navChat: "விவசாயிகளுடன் உரையாட",
    navShop: "இப்போது வாங்குங்கள்",
    navSubs: "சந்தா திட்டங்கள்",
    navHelp: "உதவி"
  }
};

// CHANGE LANGUAGE
function setLanguage(lang) {
  window._lang = lang;
  localStorage.setItem("pp_lang", lang);

  // Re-apply translations on every page
  if (typeof applyTranslations === "function") {
    applyTranslations(lang);
  }
}

// TEXT-TO-SPEECH
function speak(text, voice = "en-US") {
  const s = new SpeechSynthesisUtterance(text);
  s.lang = voice;
  speechSynthesis.cancel();
  speechSynthesis.speak(s);
}
