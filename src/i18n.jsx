/* eslint-disable react-refresh/only-export-components, react/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const dict = {
  en: {
    'nav.couple': 'Couple',
    'nav.story': 'Story',
    'nav.events': 'Events',
    'nav.dress': 'Dress Code',
    'nav.gallery': 'Gallery',
    'nav.stays': 'Stays',
    'nav.blessings': 'Blessings',
    'nav.rsvp': 'RSVP',
    'nav.invitation': 'Open Invitation',

    'hero.blessing': '॥ श्री गणेशाय नमः ॥',
    'hero.theWeddingOf': 'the wedding of',
    'hero.pill': 'Save the Date',
    'hero.sub': 'together with their families, joyfully invite you to the celebration of their shubh vivah',
    'hero.date': 'Friday, 20 November 2026 · Jaipur, India',
    'hero.begin': 'Begin the Celebration',
    'hero.tag': 'shubh vivah',

    'count.tag': 'Counting Every Heartbeat',
    'count.title': 'Save the Date',
    'count.sub': 'Friday, the twentieth of November, two thousand twenty-six · at the phool mahal lawns of Jaipur',
    'count.days': 'Days',
    'count.hours': 'Hours',
    'count.minutes': 'Minutes',
    'count.seconds': 'Seconds',
    'count.note': 'Two hearts, one holy fire',

    'events.tag': 'The Celebration',
    'events.title': 'Three Days of Love',
    'events.sub': 'From the first swirl of mehendi to the last circle of the sacred fire — three days woven with love, laughter and ritual.',
    'events.day1': 'Day One',
    'events.day2': 'Day Two',
    'events.day3': 'Day Three',
    'events.title1': 'Mehendi & Cocktail',
    'events.title2': 'Haldi, Tilak & Engagement',
    'events.title3': 'Wedding',
    'events.t.morning': 'Morning',
    'events.t.daytime': 'Daytime',
    'events.t.night': 'Night',
    'events.t.evening': 'Evening · Night',
    'events.t.dusk': 'Dusk',
    'events.l.mehendi': 'Mehendi ceremony',
    'events.l.photo': 'Relax · photos · family time',
    'events.l.cocktail': 'Cocktail party',
    'events.l.haldi': 'Haldi',
    'events.l.tilak': 'Tilak ceremony',
    'events.l.engagement': 'Engagement',
    'events.l.sangeet': 'Musical · Sangeet night',
    'events.l.baraat': 'Baraat',
    'events.l.jaimala': 'Jaimala · Varmala — exchange of garlands',
    'events.l.rituals': 'Wedding rituals',
    'events.l.pheras': 'Pheras',
    'events.l.venue': 'Get Directions',

    'dress.tag': 'Dress Code',
    'dress.title': 'Wear the Moment',
    'dress.sub': 'Help us paint these three days in colour — here is what the bride & groom would love to see you in. Wear the shade of the day in every shade you own.',
    'dress.m': 'Mehendi & Cocktail',
    'dress.green': 'Shades of Green',
    'dress.h': 'Haldi · Tilak',
    'dress.yellow': 'Bright Yellows',
    'dress.e': 'Engagement · Sangeet',
    'dress.redblack': 'Black & Red',
    'dress.w': 'Wedding',
    'dress.beige': 'Soft Beige & Pastels',

    'pheras.tag': 'Interactive',
    'pheras.title': 'Complete the Pheras',
    'pheras.sub': 'Seven rounds around the holy fire — each one a promise. Take the pheras to light the flames of a lifetime.',
    'pheras.count': 'Phera {n} of 7',
    'pheras.button': 'Take the Next Phera',
    'pheras.done': 'Saat phere, ek jeevan — seven rounds, one soul.',
    'pheras.reset': 'Relight',

    'bless.tag': 'From Our Hearts',
    'bless.title': 'Seal a Blessing',
    'bless.sub': 'Leave your name and a wish — it will glow forever in our lantern sky.',
    'bless.name': 'Your Name *',
    'bless.city': 'City',
    'bless.wish': 'Your Blessing *',
    'bless.submit': 'Seal It',
    'bless.count': 'blessings glowing',
    'bless.sample': 'Sample blessings',
    'bless.placeholder': 'e.g. May your love grow like the banyan — deep roots, open sky…',

    'stays.tag': 'For Our Guests',
    'stays.title': 'Where to Stay',
    'stays.sub': "Rest easy — a block of rooms has been booked for you. Just tell them the couple's names when you check in.",
    'stays.badge': '॥ Rooms Booked For Our Guests ॥',
    'stays.hotel': 'Golden Eagle',
    'stays.city': 'Jaipur · Rajasthan',
    'stays.desc': "A haven of warm hospitality and old-world charm, tucked close to all the celebration venues. We've reserved a comfortable block of rooms so our dearest guests can unwind, refresh, and be ready for every ritual of the day.",
    'stays.a1': 'Complimentary breakfast',
    'stays.a2': 'Airport transfer',
    'stays.a3': 'Free parking',
    'stays.a4': 'Fast Wi-Fi',
    'stays.a5': '24×7 front desk',
    'stays.a6': 'Travel desk',
    'stays.noteA': "Please mention",
    'stays.noteB': "'s wedding",
    'stays.open': 'Open in Google Maps',
    'stays.mapNote': 'Flying in from near & far',
    'stays.mapSub': 'Every dot is a guest we cannot wait to welcome.',

    'rsvp.tag': 'Will You Join Us?',
    'rsvp.title': 'Kindly RSVP',
    'rsvp.sub': 'Your presence is the greatest gift. Please respond by the 5th of November.',
    'rsvp.name': 'Your Name *',
    'rsvp.namePh': 'e.g. Rohan Verma',
    'rsvp.email': 'Email *',
    'rsvp.emailPh': 'you@example.com',
    'rsvp.guests': 'Number of Guests',
    'rsvp.events': 'Which events will you attend? *',
    'rsvp.o.all': 'All Three Days 🎉',
    'rsvp.o.day1': 'Day 1 · Mehendi & Cocktail',
    'rsvp.o.day2': 'Day 2 · Haldi, Tilak & Engagement',
    'rsvp.o.day3': 'Day 3 · Wedding',
    'rsvp.o.day13': 'Day 1 & Day 3',
    'rsvp.o.day23': 'Day 2 & Day 3',
    'rsvp.o.none': "Sadly, I can’t make it 😢",
    'rsvp.message': 'Message for the Couple',
    'rsvp.messagePh': 'Wishes, blessings, jokes — all welcome…',
    'rsvp.send': 'Send Our Wishes ✨',
    'rsvp.thanks': 'Dhanyavaad, {name}!',
    'rsvp.thanksIn': 'Your response has been noted with joy — we cannot wait to celebrate with you.',
    'rsvp.thanksOut': 'Your response has been received — we will miss your presence dearly.',
    'rsvp.again': 'Respond Again',

    'footer.made': 'Made with love & a little magic',
    'footer.date': '20 · 11 · 2026 — Jaipur',
    'footer.quote': '“Two souls remain entangled in this life, as if no force on earth can part them.”',
    'footer.copy': '© 2026 Akshay & Kirti · Shubh Vivah 🪔',
    'footer.diyas': 'Saat phere — seven promises, one soul',

    'invite.title': 'In the name of God, and with great joy',
    'invite.p1': 'They began as friends, became a story, and now become a family.',
    'invite.names': 'Akshay ❦ Kirti',
    'invite.mr': 'together with their families, request the honour of your presence',
    'invite.when': 'Day One · Mehendi & Cocktail — 18 Nov',
    'invite.when2': 'Day Two · Haldi, Tilak & Engagement — 19 Nov',
    'invite.when3': 'Day Three · Wedding — 20 Nov',
    'invite.where': 'Golden Eagle & Phool Mahal, Jaipur',
    'invite.ctaPrint': 'Print / Save PDF',
  },

  hi: {
    'nav.couple': 'जोड़ा',
    'nav.story': 'कहानी',
    'nav.events': 'कार्यक्रम',
    'nav.gallery': 'झलकियाँ',
    'nav.stays': 'ठहरना',
    'nav.blessings': 'आशीर्वाद',
    'nav.rsvp': 'उत्तर दें',
    'nav.invitation': 'निमंत्रण खोलें',

    'hero.blessing': '॥ श्री गणेशाय नमः ॥',
    'hero.theWeddingOf': 'के शुभ विवाह में',
    'hero.pill': 'विवाह की सूचना',
    'hero.sub': 'परिवार सहित, आप सबको अपने शुभ विवाह के उत्सव में सादर आमंत्रित करते हैं',
    'hero.date': 'शुक्रवार, २० नवम्बर २०२६ · जयपुर, भारत',
    'hero.begin': 'उत्सव शुरू करें',
    'hero.tag': 'शुभ विवाह',

    'count.tag': 'हर धड़कन गिन रहे हैं',
    'count.title': 'विवाह की सूचना',
    'count.sub': 'शुक्रवार, बीस नवम्बर दो हजार छब्बीस · जयपुर के फूल महल के प्रांगण में',
    'count.days': 'दिन',
    'count.hours': 'घंटे',
    'count.minutes': 'मिनट',
    'count.seconds': 'सेकंड',
    'count.note': 'दो दिल, एक पवित्र अग्नि',

    'events.tag': 'शुभ उत्सव',
    'events.title': 'प्यार के तीन दिन',
    'events.sub': 'मेहंदी के पहले घेरे से लेकर पवित्र अग्नि की अंतिम परिक्रमा तक — प्रेम, हास्य और रीति-रिवाजों से गुंथे तीन दिन।',
    'events.day1': 'पहला दिन',
    'events.day2': 'दूसरा दिन',
    'events.day3': 'तीसरा दिन',
    'events.title1': 'मेहंदी और कॉकटेल',
    'events.title2': 'हल्दी, तिलक और सगाई',
    'events.title3': 'विवाह',
    'events.t.morning': 'सुबह',
    'events.t.daytime': 'दिन में',
    'events.t.night': 'रात',
    'events.t.evening': 'शाम · रात',
    'events.t.dusk': 'संध्या',
    'events.l.mehendi': 'मेहंदी की रस्म',
    'events.l.photo': 'आराम · तस्वीरें · परिवार',
    'events.l.cocktail': 'कॉकटेल पार्टी',
    'events.l.haldi': 'हल्दी',
    'events.l.tilak': 'तिलक की रस्म',
    'events.l.engagement': 'सगाई',
    'events.l.sangeet': 'संगीत संध्या',
    'events.l.baraat': 'बारात',
    'events.l.jaimala': 'जयमाला · वरमाला',
    'events.l.rituals': 'विवाह रस्में',
    'events.l.pheras': 'फेरे',
    'events.l.venue': 'दिशाएँ देखें',

    'dress.tag': 'ड्रेस कोड',
    'dress.title': 'पल में रंग भरें',
    'dress.sub': 'इन तीन दिनों को रंगों से सजाने में हमारी मदद करें — दूल्हा-दुल्हन आपको किस रंग में देखना चाहेंगे, यहाँ देखिए। दिन का रंग, अपने हर रंगत में पहनिए।',
    'dress.m': 'मेहंदी और कॉकटेल',
    'dress.green': 'हरे रंग की छटा',
    'dress.h': 'हल्दी · तिलक',
    'dress.yellow': 'चटख पीले रंग',
    'dress.e': 'सगाई · संगीत',
    'dress.redblack': 'काला और लाल',
    'dress.w': 'विवाह',
    'dress.beige': 'मुलायम बेज रंग',

    'pheras.tag': 'खेल जोड़ें',
    'pheras.title': 'सात फेरे पूरे करें',
    'pheras.sub': 'पवित्र अग्नि के सात घेरे — हर फेरा एक वचन। फेरे लें और जीवन भर की ज्योति जलाएँ।',
    'pheras.count': 'फेरा {n} / ७',
    'pheras.button': 'अगला फेरा लें',
    'pheras.done': 'सात फेरे, एक जीवन — सात वचन, एक आत्मा।',
    'pheras.reset': 'फिर से जलाएँ',

    'bless.tag': 'हमारे दिलों से',
    'bless.title': 'आशीर्वाद अंकित करें',
    'bless.sub': 'अपना नाम और एक शुभकामना लिखें — यह हमारे लालटेन आकाश में सदा जगमगाता रहेगा।',
    'bless.name': 'आपका नाम *',
    'bless.city': 'शहर',
    'bless.wish': 'आपका आशीर्वाद *',
    'bless.submit': 'अंकित करें',
    'bless.count': 'आशीर्वाद जगमगा रहे हैं',
    'bless.sample': 'नमूना आशीर्वाद',
    'bless.placeholder': 'जैसे — आपका प्रेम बरगद जैसा बढ़े — गहरी जड़ें, खुला आसमान…',

    'stays.tag': 'मेहमानों के लिए',
    'stays.title': 'कहाँ ठहरें',
    'stays.sub': 'चिंता न करें — आपके लिए कमरों का ब्लॉक बुक किया गया है। चेक-इन करते समय बस जोड़े का नाम बताएँ।',
    'stays.badge': '॥ मेहमानों के लिए कमरे बुक ॥',
    'stays.hotel': 'गोल्डन ईगल',
    'stays.city': 'जयपुर · राजस्थान',
    'stays.desc': 'गर्मजोशी भरे स्वागत और पुरानी शान का स्थान, सभी समारोह स्थलों के समीप। हमने आपके लिए आरामदायक कमरों का ब्लॉक आरक्षित किया है।',
    'stays.a1': 'निःशुल्क नाश्ता',
    'stays.a2': 'एयरपोर्ट ट्रांसफर',
    'stays.a3': 'निःशुल्क पार्किंग',
    'stays.a4': 'तेज़ वाई-फ़ाई',
    'stays.a5': '२४×७ रिसेप्शन',
    'stays.a6': 'ट्रैवल डेस्क',
    'stays.noteA': 'कृपया बताएँ',
    'stays.noteB': 'की शादी',
    'stays.open': 'गूगल मैप्स पर खोलें',
    'stays.mapNote': 'दूर-दूर से आ रहे हैं',
    'stays.mapSub': 'हर बिंदु एक अतिथि है जिसका हमें बेसब्री से इंतज़ार है।',

    'rsvp.tag': 'क्या आप शामिल होंगे?',
    'rsvp.title': 'कृपया उत्तर दें',
    'rsvp.sub': 'आपकी उपस्थिति सबसे बड़ा उपहार है। कृपया ५ नवम्बर तक उत्तर दें।',
    'rsvp.name': 'आपका नाम *',
    'rsvp.namePh': 'जैसे — रोहन वर्मा',
    'rsvp.email': 'ईमेल *',
    'rsvp.emailPh': 'you@example.com',
    'rsvp.guests': 'मेहमानों की संख्या',
    'rsvp.events': 'किन कार्यक्रमों में आएँगे? *',
    'rsvp.o.all': 'तीनों दिन 🎉',
    'rsvp.o.day1': 'दिन १ · मेहंदी और कॉकटेल',
    'rsvp.o.day2': 'दिन २ · हल्दी, तिलक और सगाई',
    'rsvp.o.day3': 'दिन ३ · विवाह',
    'rsvp.o.day13': 'दिन १ और दिन ३',
    'rsvp.o.day23': 'दिन २ और दिन ३',
    'rsvp.o.none': 'दुर्भाग्यवश नहीं आ पाऊँगा 😢',
    'rsvp.message': 'जोड़े के लिए संदेश',
    'rsvp.messagePh': 'शुभकामनाएँ, आशीर्वाद, चुटकुले — सब स्वागत है…',
    'rsvp.send': 'शुभकामनाएँ भेजें ✨',
    'rsvp.thanks': 'धन्यवाद, {name}!',
    'rsvp.thanksIn': 'आपका उत्तर प्रसन्नता से दर्ज हुआ — हम आपके साथ उत्सव मनाने को अधीर हैं।',
    'rsvp.thanksOut': 'आपका उत्तर मिल गया — आपकी उपस्थिति हमें बहुत याद आएगी।',
    'rsvp.again': 'फिर से उत्तर दें',

    'footer.made': 'प्रेम और थोड़े जादू से बना',
    'footer.date': '२० · ११ · २०२६ — जयपुर',
    'footer.quote': '«दो आत्माएँ इस जन्म में ऐसे जुड़ी रहें, मानो धरती की कोई शक्ति उन्हें अलग न कर सके।»',
    'footer.copy': '© २०२६ अक्षय और किर्ति · शुभ विवाह 🪔',
    'footer.diyas': 'सात फेरे — सात वचन, एक आत्मा',

    'invite.title': 'ईश्वर के नाम पर, अत्यंत हर्ष के साथ',
    'invite.p1': 'वे मित्र थे, कहानी बने, और अब परिवार बन रहे हैं।',
    'invite.names': 'अक्षय ❦ किर्ति',
    'invite.mr': 'परिवार सहित, आपकी उपस्थिति का अनुरोध करते हैं',
    'invite.when': 'पहला दिन · मेहंदी और कॉकटेल — १८ नवम्बर',
    'invite.when2': 'दूसरा दिन · हल्दी, तिलक और सगाई — १९ नवम्बर',
    'invite.when3': 'तीसरा दिन · विवाह — २० नवम्बर',
    'invite.where': 'गोल्डन ईगल और फूल महल, जयपुर',
    'invite.ctaPrint': 'प्रिंट / पीडीएफ़ सहेजें',
  },
};

const LangContext = createContext({ lang: 'en', toggle: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('ak-lang') === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    try {
      localStorage.setItem('ak-lang', lang);
    } catch {}
  }, [lang]);

  const t = (key, vars) => {
    let str = dict[lang][key] ?? dict.en[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };

  const value = { lang, toggle: () => setLang((l) => (l === 'en' ? 'hi' : 'en')), t };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function hiOf(key) {
  return dict.hi[key] ?? dict.en[key] ?? key;
}