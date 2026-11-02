/**
 * The exact sentence people agree to when they tick the marketing box.
 *
 * One constant per language, rendered by the checkbox and stored by the API,
 * so the recorded evidence is provably the wording that was on screen. The
 * API picks the language from the request rather than taking either the text
 * or the language from the body: consent evidence a client can set is not
 * evidence.
 *
 * Storing the language matters as much as storing the words. Someone who
 * ticked a German box did not agree to the English sentence, and "we showed
 * them the English one" is not a defence when the screenshot says otherwise.
 *
 * Do not edit a version in place. Reword by adding a new version and pointing
 * MARKETING_CONSENT at it, so rows recorded under the old wording still say
 * what those people actually agreed to.
 */

export interface ConsentWording {
  version: string;
  /** Keyed by site locale (src/i18n/locales.ts). Missing locales fall back to English. */
  text: { en: string } & Partial<Record<string, string>>;
}

export const MARKETING_CONSENT_V2: ConsentWording = {
  version: 'marketing-2026-08-22',
  text: {
    en:
      'Yes, Blok Blok Studio can email me practical growth tips and occasional offers. ' +
      'We will send one email to confirm, and you are only subscribed once you click the ' +
      'link in it. Unsubscribe anytime.',
    de:
      'Ja, Blok Blok Studio darf mir praktische Wachstumstipps und gelegentliche Angebote ' +
      'per E-Mail senden. Wir senden eine E-Mail zur Bestätigung; erst mit dem Klick auf ' +
      'den Link darin sind Sie angemeldet. Jederzeit abbestellbar.',
  },
};

/**
 * V3 (2026-11-02): the same sentence in all 20 site languages, so the box a
 * visitor ticks is in the language they are reading. English and German are
 * unchanged from V2; the others are translations of the English.
 */
const MARKETING_CONSENT_V3: ConsentWording = {
  version: 'marketing-2026-11-02',
  text: {
    en: "Yes, Blok Blok Studio can email me practical growth tips and occasional offers. We will send one email to confirm, and you are only subscribed once you click the link in it. Unsubscribe anytime.",
    de: "Ja, Blok Blok Studio darf mir praktische Wachstumstipps und gelegentliche Angebote per E-Mail senden. Wir senden eine E-Mail zur Bestätigung; erst mit dem Klick auf den Link darin sind Sie angemeldet. Jederzeit abbestellbar.",
    es: "Sí, Blok Blok Studio puede enviarme por email consejos prácticos de crecimiento y ofertas ocasionales. Enviaremos un email para confirmar, y solo quedas suscrito cuando haces clic en el enlace que contiene. Puedes darte de baja en cualquier momento.",
    fr: "Oui, Blok Blok Studio peut m'envoyer par e-mail des conseils pratiques de croissance et des offres occasionnelles. Nous vous enverrons un e-mail de confirmation, et vous ne serez abonné qu'après avoir cliqué sur le lien qu'il contient. Désabonnement possible à tout moment.",
    pt: "Sim, o Blok Blok Studio pode me enviar por e-mail dicas práticas de crescimento e ofertas ocasionais. Enviaremos um e-mail de confirmação, e você só passa a estar inscrito depois de clicar no link que ele contém. Cancele a inscrição a qualquer momento.",
    it: "Sì, Blok Blok Studio può inviarmi via email consigli pratici per la crescita e offerte occasionali. Riceverò una sola email di conferma e sarò iscritto solo dopo aver cliccato il link al suo interno. Posso disiscrivermi in qualsiasi momento.",
    nl: "Ja, Blok Blok Studio mag mij praktische groeitips en af en toe aanbiedingen e-mailen. We sturen één e-mail ter bevestiging, en je bent pas ingeschreven zodra je op de link daarin klikt. Afmelden kan altijd.",
    sv: "Ja, Blok Blok Studio får mejla mig praktiska tillväxttips och enstaka erbjudanden. Vi skickar ett mejl för att bekräfta, och du prenumererar först när du klickar på länken i det. Avsluta när som helst.",
    pl: "Tak, Blok Blok Studio może wysyłać mi praktyczne wskazówki dotyczące rozwoju firmy i okazjonalne oferty. Wyślemy jeden e-mail z prośbą o potwierdzenie, a zapis nastąpi dopiero po kliknięciu zawartego w nim linku. Z subskrypcji można zrezygnować w każdej chwili.",
    tr: "Evet, Blok Blok Studio bana pratik büyüme ipuçları ve ara sıra teklifler e-postayla gönderebilir. Onay için tek bir e-posta göndereceğiz ve yalnızca içindeki bağlantıya tıkladığınızda abone olursunuz. İstediğiniz zaman abonelikten çıkabilirsiniz.",
    ru: "Да, Blok Blok Studio может присылать мне практичные советы по росту бизнеса и время от времени предложения. Мы отправим одно письмо для подтверждения, и вы будете подписаны только после перехода по ссылке в нём. Отписаться можно в любой момент.",
    ar: "نعم، يمكن لاستوديو Blok Blok Studio أن يرسل لي بالبريد الإلكتروني نصائح عملية للنمو وعروضا من حين لآخر. سنرسل رسالة واحدة للتأكيد، ولا يتم تفعيل اشتراكك إلا بعد النقر على الرابط فيها. يمكنك إلغاء الاشتراك في أي وقت.",
    hi: "हाँ, Blok Blok Studio मुझे व्यावहारिक ग्रोथ टिप्स और कभी-कभार ऑफ़र ईमेल कर सकता है। पुष्टि के लिए हम एक ईमेल भेजेंगे, और आप तभी सब्सक्राइब होंगे, जब आप उसमें दिए लिंक पर क्लिक करेंगे। कभी भी अनसब्सक्राइब करें।",
    zh: "是的，Blok Blok Studio 可以向我发送实用的增长建议和不定期的优惠信息。我们会发送一封确认邮件，只有在您点击其中的链接后才会完成订阅。您可以随时退订。",
    "zh-TW": "是的，我同意 Blok Blok Studio 以電子郵件寄送實用的成長建議與不定期優惠給我。我們會寄送一封確認郵件，只有在您點擊郵件中的連結後才算完成訂閱。您可以隨時取消訂閱。",
    ja: "はい、Blok Blok Studioから実践的な成長のヒントや時折のご案内をメールで受け取ることに同意します。確認のメールを1通お送りし、その中のリンクをクリックしていただいた時点で初めて登録が完了します。配信停止はいつでも可能です。",
    ko: "네, Blok Blok Studio가 실용적인 성장 팁과 가끔 제공되는 혜택 안내를 이메일로 보내도 좋습니다. 확인 이메일을 한 통 보내드리며, 그 안의 링크를 클릭하셔야 구독이 완료됩니다. 언제든지 구독을 취소할 수 있습니다.",
    vi: "Có, Blok Blok Studio có thể gửi email cho tôi những mẹo tăng trưởng thiết thực và thỉnh thoảng là ưu đãi. Chúng tôi sẽ gửi một email để xác nhận, và bạn chỉ được đăng ký sau khi bấm vào liên kết trong email đó. Hủy đăng ký bất cứ lúc nào.",
    th: "ใช่ ฉันยินดีให้ Blok Blok Studio ส่งอีเมลเคล็ดลับการเติบโตที่ใช้ได้จริงและข้อเสนอเป็นครั้งคราวถึงฉัน เราจะส่งอีเมลหนึ่งฉบับเพื่อยืนยัน และคุณจะสมัครรับข้อมูลสำเร็จก็ต่อเมื่อคลิกลิงก์ในอีเมลนั้น ยกเลิกการสมัครได้ทุกเมื่อ",
    id: "Ya, Blok Blok Studio boleh mengirimi saya email berisi tips pertumbuhan praktis dan penawaran sesekali. Kami akan mengirim satu email untuk konfirmasi, dan Anda baru berlangganan setelah mengklik tautan di dalamnya. Berhenti berlangganan kapan saja.",
  },
};

export const MARKETING_CONSENT = MARKETING_CONSENT_V3;

/** The sentence to show, for a given language. */
export function marketingConsentText(locale: string): string {
  const exact = Object.keys(MARKETING_CONSENT.text).find((k) => k.toLowerCase() === locale.toLowerCase());
  const base = locale.toLowerCase().split('-')[0];
  return MARKETING_CONSENT.text[exact ?? base] ?? MARKETING_CONSENT.text.en;
}

/**
 * What gets written to Lead.marketingConsentText: the version, the language
 * it was shown in, and the wording itself.
 */
export function marketingConsentRecord(locale: string): string {
  const exact = Object.keys(MARKETING_CONSENT.text).find((k) => k.toLowerCase() === locale.toLowerCase());
  const base = locale.toLowerCase().split('-')[0];
  const shown = exact ?? (MARKETING_CONSENT.text[base] ? base : 'en');
  return `[${MARKETING_CONSENT.version}/${shown}] ${marketingConsentText(shown)}`;
}
