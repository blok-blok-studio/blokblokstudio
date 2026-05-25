#!/usr/bin/env python3
"""
Adds the new translation keys (introduced when removing hardcoded strings)
to every locale JSON in src/messages/. Each new key has translations for
all 19 non-English languages. Run once after editing en.json.

Keys are inserted into the existing namespace dict; order follows en.json
because we rebuild each namespace using en.json's key order as the template.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src" / "messages"
EN = json.loads((ROOT / "en.json").read_text(encoding="utf-8"))

# ── New translations ────────────────────────────────────────────────────────
# Structure: { "namespace.key": { "lang": "translation", ... } }
NEW = {
    "nav.blog": {
        "de": "Blog", "es": "Blog", "fr": "Blog", "pt": "Blog", "it": "Blog",
        "nl": "Blog", "sv": "Blog", "pl": "Blog", "tr": "Blog",
        "ru": "Блог", "ar": "المدونة", "hi": "ब्लॉग",
        "zh": "博客", "zh-TW": "部落格", "ja": "ブログ", "ko": "블로그",
        "vi": "Blog", "th": "บล็อก", "id": "Blog",
    },
    "nav.language": {
        "de": "Sprache", "es": "Idioma", "fr": "Langue", "pt": "Idioma",
        "it": "Lingua", "nl": "Taal", "sv": "Språk", "pl": "Język",
        "tr": "Dil", "ru": "Язык", "ar": "اللغة", "hi": "भाषा",
        "zh": "语言", "zh-TW": "語言", "ja": "言語", "ko": "언어",
        "vi": "Ngôn ngữ", "th": "ภาษา", "id": "Bahasa",
    },
    "faq.see_all_questions": {
        "de": "Alle Fragen anzeigen", "es": "Ver todas las preguntas",
        "fr": "Voir toutes les questions", "pt": "Ver todas as perguntas",
        "it": "Vedi tutte le domande", "nl": "Bekijk alle vragen",
        "sv": "Se alla frågor", "pl": "Zobacz wszystkie pytania",
        "tr": "Tüm soruları gör", "ru": "Смотреть все вопросы",
        "ar": "عرض جميع الأسئلة", "hi": "सभी प्रश्न देखें",
        "zh": "查看所有问题", "zh-TW": "查看所有問題",
        "ja": "すべての質問を見る", "ko": "모든 질문 보기",
        "vi": "Xem tất cả câu hỏi", "th": "ดูคำถามทั้งหมด",
        "id": "Lihat semua pertanyaan",
    },
    "faq.filter_all": {
        "de": "Alle", "es": "Todo", "fr": "Tout", "pt": "Todos",
        "it": "Tutti", "nl": "Alles", "sv": "Alla", "pl": "Wszystko",
        "tr": "Tümü", "ru": "Все", "ar": "الكل", "hi": "सभी",
        "zh": "全部", "zh-TW": "全部", "ja": "すべて", "ko": "전체",
        "vi": "Tất cả", "th": "ทั้งหมด", "id": "Semua",
    },
    "home.newsletter_subscribed": {
        "de": "Du bist angemeldet!", "es": "¡Estás suscrito!",
        "fr": "Vous êtes inscrit !", "pt": "Você está inscrito!",
        "it": "Sei iscritto!", "nl": "Je bent aangemeld!",
        "sv": "Du är prenumerant!", "pl": "Zapisałeś się!",
        "tr": "Abone oldunuz!", "ru": "Вы подписаны!",
        "ar": "تم اشتراكك!", "hi": "आपकी सदस्यता हो गई!",
        "zh": "您已订阅！", "zh-TW": "您已訂閱！",
        "ja": "登録完了！", "ko": "구독 완료!",
        "vi": "Bạn đã đăng ký!", "th": "คุณสมัครรับข้อมูลแล้ว!",
        "id": "Anda telah berlangganan!",
    },
    "home.newsletter_already_subscribed": {
        "de": "Du bist bereits angemeldet", "es": "Ya estás suscrito",
        "fr": "Vous êtes déjà inscrit", "pt": "Você já está inscrito",
        "it": "Sei già iscritto", "nl": "Je bent al aangemeld",
        "sv": "Du prenumererar redan", "pl": "Już jesteś zapisany",
        "tr": "Zaten abonesiniz", "ru": "Вы уже подписаны",
        "ar": "أنت مشترك بالفعل", "hi": "आप पहले से ही सदस्य हैं",
        "zh": "您已订阅", "zh-TW": "您已訂閱",
        "ja": "すでに登録されています", "ko": "이미 구독 중입니다",
        "vi": "Bạn đã đăng ký rồi", "th": "คุณสมัครรับข้อมูลอยู่แล้ว",
        "id": "Anda sudah berlangganan",
    },
    "home.newsletter_consent": {
        "de": "Mit deiner Anmeldung stimmst du unserer <link>Datenschutzerklärung</link> zu. Jederzeit abbestellbar.",
        "es": "Al suscribirte, aceptas nuestra <link>Política de Privacidad</link>. Cancela cuando quieras.",
        "fr": "En vous inscrivant, vous acceptez notre <link>Politique de Confidentialité</link>. Désabonnement à tout moment.",
        "pt": "Ao se inscrever, você concorda com a nossa <link>Política de Privacidade</link>. Cancele a qualquer momento.",
        "it": "Iscrivendoti, accetti la nostra <link>Informativa sulla Privacy</link>. Disiscriviti in qualsiasi momento.",
        "nl": "Door je aan te melden, ga je akkoord met ons <link>Privacybeleid</link>. Op elk moment afmelden.",
        "sv": "Genom att prenumerera godkänner du vår <link>Integritetspolicy</link>. Avregistrera dig när som helst.",
        "pl": "Zapisując się, akceptujesz naszą <link>Politykę Prywatności</link>. Możesz zrezygnować w dowolnym momencie.",
        "tr": "Abone olarak <link>Gizlilik Politikamızı</link> kabul edersiniz. İstediğiniz zaman abonelikten çıkabilirsiniz.",
        "ru": "Подписываясь, вы соглашаетесь с нашей <link>Политикой конфиденциальности</link>. Отписаться можно в любой момент.",
        "ar": "بالاشتراك، فإنك توافق على <link>سياسة الخصوصية</link>. يمكنك إلغاء الاشتراك في أي وقت.",
        "hi": "सदस्यता लेकर, आप हमारी <link>गोपनीयता नीति</link> से सहमत होते हैं। कभी भी सदस्यता रद्द करें।",
        "zh": "订阅即表示您同意我们的<link>隐私政策</link>。可随时取消订阅。",
        "zh-TW": "訂閱即表示您同意我們的<link>隱私政策</link>。可隨時取消訂閱。",
        "ja": "登録することで、<link>プライバシーポリシー</link>に同意したものとみなされます。いつでも配信停止できます。",
        "ko": "구독하시면 <link>개인정보 처리방침</link>에 동의하는 것입니다. 언제든지 구독을 취소할 수 있습니다.",
        "vi": "Bằng việc đăng ký, bạn đồng ý với <link>Chính sách Bảo mật</link> của chúng tôi. Hủy đăng ký bất cứ lúc nào.",
        "th": "เมื่อสมัครรับข้อมูล คุณยอมรับ<link>นโยบายความเป็นส่วนตัว</link>ของเรา ยกเลิกได้ทุกเมื่อ",
        "id": "Dengan berlangganan, Anda menyetujui <link>Kebijakan Privasi</link> kami. Berhenti berlangganan kapan saja.",
    },
    "footer.newsletter_subscribed": {
        "de": "Angemeldet!", "es": "¡Suscrito!", "fr": "Inscrit !",
        "pt": "Inscrito!", "it": "Iscritto!", "nl": "Aangemeld!",
        "sv": "Prenumerant!", "pl": "Zapisany!", "tr": "Abone olundu!",
        "ru": "Подписаны!", "ar": "تم الاشتراك!", "hi": "सदस्यता ली गई!",
        "zh": "已订阅！", "zh-TW": "已訂閱！", "ja": "登録完了!",
        "ko": "구독 완료!", "vi": "Đã đăng ký!", "th": "สมัครแล้ว!",
        "id": "Berlangganan!",
    },
    "footer.newsletter_already_subscribed": {
        "de": "Du bist bereits angemeldet", "es": "Ya estás suscrito",
        "fr": "Vous êtes déjà inscrit", "pt": "Você já está inscrito",
        "it": "Sei già iscritto", "nl": "Je bent al aangemeld",
        "sv": "Du prenumererar redan", "pl": "Już jesteś zapisany",
        "tr": "Zaten abonesiniz", "ru": "Вы уже подписаны",
        "ar": "أنت مشترك بالفعل", "hi": "आप पहले से ही सदस्य हैं",
        "zh": "您已订阅", "zh-TW": "您已訂閱",
        "ja": "すでに登録されています", "ko": "이미 구독 중입니다",
        "vi": "Bạn đã đăng ký rồi", "th": "คุณสมัครรับข้อมูลอยู่แล้ว",
        "id": "Anda sudah berlangganan",
    },
    "footer.newsletter_consent": {
        "de": "Mit deiner Anmeldung stimmst du unserer <link>Datenschutzerklärung</link> zu. Jederzeit abbestellbar.",
        "es": "Al suscribirte, aceptas nuestra <link>Política de Privacidad</link>. Cancela cuando quieras.",
        "fr": "En vous inscrivant, vous acceptez notre <link>Politique de Confidentialité</link>. Désabonnement à tout moment.",
        "pt": "Ao se inscrever, você concorda com a nossa <link>Política de Privacidade</link>. Cancele a qualquer momento.",
        "it": "Iscrivendoti, accetti la nostra <link>Informativa sulla Privacy</link>. Disiscriviti in qualsiasi momento.",
        "nl": "Door je aan te melden, ga je akkoord met ons <link>Privacybeleid</link>. Op elk moment afmelden.",
        "sv": "Genom att prenumerera godkänner du vår <link>Integritetspolicy</link>. Avregistrera dig när som helst.",
        "pl": "Zapisując się, akceptujesz naszą <link>Politykę Prywatności</link>. Możesz zrezygnować w dowolnym momencie.",
        "tr": "Abone olarak <link>Gizlilik Politikamızı</link> kabul edersiniz. İstediğiniz zaman abonelikten çıkabilirsiniz.",
        "ru": "Подписываясь, вы соглашаетесь с нашей <link>Политикой конфиденциальности</link>. Отписаться можно в любой момент.",
        "ar": "بالاشتراك، فإنك توافق على <link>سياسة الخصوصية</link>. يمكنك إلغاء الاشتراك في أي وقت.",
        "hi": "सदस्यता लेकर, आप हमारी <link>गोपनीयता नीति</link> से सहमत होते हैं। कभी भी सदस्यता रद्द करें।",
        "zh": "订阅即表示您同意我们的<link>隐私政策</link>。可随时取消订阅。",
        "zh-TW": "訂閱即表示您同意我們的<link>隱私政策</link>。可隨時取消訂閱。",
        "ja": "登録することで、<link>プライバシーポリシー</link>に同意したものとみなされます。いつでも配信停止できます。",
        "ko": "구독하시면 <link>개인정보 처리방침</link>에 동의하는 것입니다. 언제든지 구독을 취소할 수 있습니다.",
        "vi": "Bằng việc đăng ký, bạn đồng ý với <link>Chính sách Bảo mật</link> của chúng tôi. Hủy đăng ký bất cứ lúc nào.",
        "th": "เมื่อสมัครรับข้อมูล คุณยอมรับ<link>นโยบายความเป็นส่วนตัว</link>ของเรา ยกเลิกได้ทุกเมื่อ",
        "id": "Dengan berlangganan, Anda menyetujui <link>Kebijakan Privasi</link> kami. Berhenti berlangganan kapan saja.",
    },
    "footer.back_to_top": {
        "de": "Nach oben", "es": "Volver arriba", "fr": "Retour en haut",
        "pt": "Voltar ao topo", "it": "Torna su", "nl": "Naar boven",
        "sv": "Tillbaka till toppen", "pl": "Powrót do góry",
        "tr": "Yukarı dön", "ru": "Наверх", "ar": "العودة إلى الأعلى",
        "hi": "ऊपर जाएँ", "zh": "回到顶部", "zh-TW": "回到頂部",
        "ja": "トップへ戻る", "ko": "위로 가기", "vi": "Lên đầu trang",
        "th": "กลับไปด้านบน", "id": "Kembali ke atas",
    },
    "gdpr.reject_all": {
        "de": "Alle ablehnen", "es": "Rechazar todo", "fr": "Tout refuser",
        "pt": "Rejeitar tudo", "it": "Rifiuta tutto", "nl": "Alles weigeren",
        "sv": "Avvisa alla", "pl": "Odrzuć wszystko", "tr": "Tümünü reddet",
        "ru": "Отклонить все", "ar": "رفض الكل", "hi": "सभी अस्वीकार करें",
        "zh": "全部拒绝", "zh-TW": "全部拒絕", "ja": "すべて拒否",
        "ko": "모두 거부", "vi": "Từ chối tất cả", "th": "ปฏิเสธทั้งหมด",
        "id": "Tolak semua",
    },
    "gdpr.accept_all": {
        "de": "Alle akzeptieren", "es": "Aceptar todo", "fr": "Tout accepter",
        "pt": "Aceitar tudo", "it": "Accetta tutto", "nl": "Alles accepteren",
        "sv": "Acceptera alla", "pl": "Akceptuj wszystko", "tr": "Tümünü kabul et",
        "ru": "Принять все", "ar": "قبول الكل", "hi": "सभी स्वीकार करें",
        "zh": "全部接受", "zh-TW": "全部接受", "ja": "すべて受け入れる",
        "ko": "모두 동의", "vi": "Chấp nhận tất cả", "th": "ยอมรับทั้งหมด",
        "id": "Terima semua",
    },
    "gdpr.manage_preferences": {
        "de": "Einstellungen verwalten", "es": "Gestionar preferencias",
        "fr": "Gérer les préférences", "pt": "Gerenciar preferências",
        "it": "Gestisci preferenze", "nl": "Voorkeuren beheren",
        "sv": "Hantera inställningar", "pl": "Zarządzaj preferencjami",
        "tr": "Tercihleri yönet", "ru": "Управление настройками",
        "ar": "إدارة التفضيلات", "hi": "प्राथमिकताएँ प्रबंधित करें",
        "zh": "管理偏好", "zh-TW": "管理偏好設定", "ja": "設定を管理",
        "ko": "기본 설정 관리", "vi": "Quản lý tùy chọn",
        "th": "จัดการการตั้งค่า", "id": "Kelola preferensi",
    },
    "gdpr.preferences_title": {
        "de": "Cookie-Einstellungen", "es": "Preferencias de cookies",
        "fr": "Préférences des cookies", "pt": "Preferências de cookies",
        "it": "Preferenze cookie", "nl": "Cookievoorkeuren",
        "sv": "Cookie-inställningar", "pl": "Preferencje plików cookie",
        "tr": "Çerez tercihleri", "ru": "Настройки cookie",
        "ar": "تفضيلات ملفات تعريف الارتباط", "hi": "कुकी प्राथमिकताएँ",
        "zh": "Cookie 偏好", "zh-TW": "Cookie 偏好設定",
        "ja": "Cookie の設定", "ko": "쿠키 환경설정",
        "vi": "Tùy chọn Cookie", "th": "การตั้งค่าคุกกี้",
        "id": "Preferensi Cookie",
    },
    "gdpr.essential_title": {
        "de": "Notwendig", "es": "Esenciales", "fr": "Essentiels",
        "pt": "Essenciais", "it": "Essenziali", "nl": "Essentieel",
        "sv": "Nödvändiga", "pl": "Niezbędne", "tr": "Zorunlu",
        "ru": "Необходимые", "ar": "ضرورية", "hi": "आवश्यक",
        "zh": "必要", "zh-TW": "必要", "ja": "必須", "ko": "필수",
        "vi": "Cần thiết", "th": "จำเป็น", "id": "Esensial",
    },
    "gdpr.essential_desc": {
        "de": "Erforderlich für den Betrieb der Website. Kann nicht deaktiviert werden.",
        "es": "Necesarias para el funcionamiento del sitio web. No se pueden desactivar.",
        "fr": "Nécessaires au fonctionnement du site. Ne peuvent être désactivés.",
        "pt": "Necessários para o funcionamento do site. Não podem ser desativados.",
        "it": "Necessari per il funzionamento del sito. Non possono essere disattivati.",
        "nl": "Vereist voor de werking van de website. Kan niet worden uitgeschakeld.",
        "sv": "Krävs för att webbplatsen ska fungera. Kan inte inaktiveras.",
        "pl": "Wymagane do działania strony. Nie można ich wyłączyć.",
        "tr": "Web sitesinin çalışması için gereklidir. Devre dışı bırakılamaz.",
        "ru": "Необходимы для работы сайта. Нельзя отключить.",
        "ar": "ضرورية لعمل الموقع. لا يمكن تعطيلها.",
        "hi": "वेबसाइट के संचालन के लिए आवश्यक। अक्षम नहीं किया जा सकता।",
        "zh": "网站运行所必需。无法禁用。",
        "zh-TW": "網站運作所必需。無法停用。",
        "ja": "ウェブサイトの動作に必要です。無効にできません。",
        "ko": "웹사이트 작동에 필요합니다. 비활성화할 수 없습니다.",
        "vi": "Cần thiết để trang web hoạt động. Không thể tắt.",
        "th": "จำเป็นสำหรับการทำงานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้",
        "id": "Diperlukan agar situs web berfungsi. Tidak dapat dinonaktifkan.",
    },
    "gdpr.analytics_title": {
        "de": "Analyse", "es": "Analíticas", "fr": "Analytiques",
        "pt": "Análise", "it": "Analisi", "nl": "Analyse",
        "sv": "Analys", "pl": "Analityka", "tr": "Analiz",
        "ru": "Аналитика", "ar": "التحليلات", "hi": "विश्लेषण",
        "zh": "分析", "zh-TW": "分析", "ja": "分析", "ko": "분석",
        "vi": "Phân tích", "th": "การวิเคราะห์", "id": "Analitik",
    },
    "gdpr.analytics_desc": {
        "de": "Hilft uns zu verstehen, wie Besucher mit unserer Website interagieren.",
        "es": "Nos ayudan a entender cómo interactúan los visitantes con nuestro sitio.",
        "fr": "Nous aident à comprendre comment les visiteurs interagissent avec notre site.",
        "pt": "Ajudam-nos a entender como os visitantes interagem com o site.",
        "it": "Ci aiutano a capire come i visitatori interagiscono con il sito.",
        "nl": "Helpen ons begrijpen hoe bezoekers met onze website omgaan.",
        "sv": "Hjälper oss att förstå hur besökare interagerar med vår webbplats.",
        "pl": "Pomagają zrozumieć, jak odwiedzający korzystają z naszej witryny.",
        "tr": "Ziyaretçilerin sitemizle nasıl etkileşim kurduğunu anlamamıza yardımcı olur.",
        "ru": "Помогают понять, как посетители взаимодействуют с сайтом.",
        "ar": "تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا.",
        "hi": "हमें यह समझने में मदद करती हैं कि आगंतुक हमारी वेबसाइट के साथ कैसे इंटरैक्ट करते हैं।",
        "zh": "帮助我们了解访客如何与网站互动。",
        "zh-TW": "幫助我們了解訪客如何與網站互動。",
        "ja": "訪問者が当サイトとどのように関わっているかを理解するのに役立ちます。",
        "ko": "방문자가 웹사이트와 어떻게 상호작용하는지 이해하는 데 도움이 됩니다.",
        "vi": "Giúp chúng tôi hiểu cách khách truy cập tương tác với trang web.",
        "th": "ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมโต้ตอบกับเว็บไซต์ของเราอย่างไร",
        "id": "Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs kami.",
    },
    "gdpr.marketing_title": {
        "de": "Marketing", "es": "Marketing", "fr": "Marketing",
        "pt": "Marketing", "it": "Marketing", "nl": "Marketing",
        "sv": "Marknadsföring", "pl": "Marketing", "tr": "Pazarlama",
        "ru": "Маркетинг", "ar": "التسويق", "hi": "मार्केटिंग",
        "zh": "营销", "zh-TW": "行銷", "ja": "マーケティング",
        "ko": "마케팅", "vi": "Tiếp thị", "th": "การตลาด",
        "id": "Pemasaran",
    },
    "gdpr.marketing_desc": {
        "de": "Werden verwendet, um relevante Werbung anzuzeigen und Kampagnen zu verfolgen.",
        "es": "Se utilizan para mostrar anuncios relevantes y rastrear campañas.",
        "fr": "Utilisés pour afficher des publicités pertinentes et suivre les campagnes.",
        "pt": "Usados para exibir anúncios relevantes e acompanhar campanhas.",
        "it": "Utilizzati per mostrare pubblicità pertinenti e tracciare le campagne.",
        "nl": "Worden gebruikt om relevante advertenties weer te geven en campagnes te volgen.",
        "sv": "Används för att leverera relevanta annonser och spåra kampanjer.",
        "pl": "Służą do wyświetlania trafnych reklam i śledzenia kampanii.",
        "tr": "İlgili reklamları sunmak ve kampanyaları takip etmek için kullanılır.",
        "ru": "Используются для показа релевантной рекламы и отслеживания кампаний.",
        "ar": "تُستخدم لعرض إعلانات ذات صلة وتتبع الحملات.",
        "hi": "प्रासंगिक विज्ञापन देने और अभियानों को ट्रैक करने के लिए उपयोग किया जाता है।",
        "zh": "用于展示相关广告并跟踪营销活动。",
        "zh-TW": "用於展示相關廣告並追蹤行銷活動。",
        "ja": "関連する広告を配信し、キャンペーンを追跡するために使用されます。",
        "ko": "관련 광고를 제공하고 캠페인을 추적하는 데 사용됩니다.",
        "vi": "Được sử dụng để hiển thị quảng cáo phù hợp và theo dõi chiến dịch.",
        "th": "ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องและติดตามแคมเปญ",
        "id": "Digunakan untuk menampilkan iklan yang relevan dan melacak kampanye.",
    },
    "gdpr.back": {
        "de": "Zurück", "es": "Atrás", "fr": "Retour", "pt": "Voltar",
        "it": "Indietro", "nl": "Terug", "sv": "Tillbaka", "pl": "Wstecz",
        "tr": "Geri", "ru": "Назад", "ar": "رجوع", "hi": "वापस",
        "zh": "返回", "zh-TW": "返回", "ja": "戻る", "ko": "뒤로",
        "vi": "Quay lại", "th": "ย้อนกลับ", "id": "Kembali",
    },
    "gdpr.save_preferences": {
        "de": "Einstellungen speichern", "es": "Guardar preferencias",
        "fr": "Enregistrer les préférences", "pt": "Salvar preferências",
        "it": "Salva preferenze", "nl": "Voorkeuren opslaan",
        "sv": "Spara inställningar", "pl": "Zapisz preferencje",
        "tr": "Tercihleri kaydet", "ru": "Сохранить настройки",
        "ar": "حفظ التفضيلات", "hi": "प्राथमिकताएँ सहेजें",
        "zh": "保存偏好", "zh-TW": "儲存偏好設定", "ja": "設定を保存",
        "ko": "환경설정 저장", "vi": "Lưu tùy chọn",
        "th": "บันทึกการตั้งค่า", "id": "Simpan preferensi",
    },
    "errors.title": {
        "de": "Etwas ist schiefgelaufen", "es": "Algo salió mal",
        "fr": "Une erreur s'est produite", "pt": "Algo deu errado",
        "it": "Qualcosa è andato storto", "nl": "Er is iets misgegaan",
        "sv": "Något gick fel", "pl": "Coś poszło nie tak",
        "tr": "Bir şeyler ters gitti", "ru": "Что-то пошло не так",
        "ar": "حدث خطأ ما", "hi": "कुछ गलत हो गया",
        "zh": "出错了", "zh-TW": "出錯了",
        "ja": "問題が発生しました", "ko": "문제가 발생했습니다",
        "vi": "Đã xảy ra lỗi", "th": "เกิดข้อผิดพลาด",
        "id": "Terjadi kesalahan",
    },
    "errors.message": {
        "de": "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut oder kontaktiere uns, wenn das Problem weiterhin besteht.",
        "es": "Se produjo un error inesperado. Inténtalo de nuevo o contáctanos si el problema persiste.",
        "fr": "Une erreur inattendue s'est produite. Veuillez réessayer ou nous contacter si le problème persiste.",
        "pt": "Ocorreu um erro inesperado. Tente novamente ou entre em contato se o problema persistir.",
        "it": "Si è verificato un errore imprevisto. Riprova o contattaci se il problema persiste.",
        "nl": "Er is een onverwachte fout opgetreden. Probeer het opnieuw of neem contact met ons op als het probleem aanhoudt.",
        "sv": "Ett oväntat fel uppstod. Försök igen eller kontakta oss om problemet kvarstår.",
        "pl": "Wystąpił nieoczekiwany błąd. Spróbuj ponownie lub skontaktuj się z nami, jeśli problem nie ustąpi.",
        "tr": "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin veya sorun devam ederse bizimle iletişime geçin.",
        "ru": "Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова или свяжитесь с нами, если проблема не исчезнет.",
        "ar": "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو الاتصال بنا إذا استمرت المشكلة.",
        "hi": "एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें या समस्या बनी रहने पर हमसे संपर्क करें।",
        "zh": "发生了意外错误。请重试，如果问题持续，请联系我们。",
        "zh-TW": "發生了意外錯誤。請重試，如果問題持續，請聯絡我們。",
        "ja": "予期しないエラーが発生しました。もう一度お試しいただくか、問題が続く場合はお問い合わせください。",
        "ko": "예기치 않은 오류가 발생했습니다. 다시 시도하거나 문제가 지속되면 문의해 주세요.",
        "vi": "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ với chúng tôi nếu sự cố vẫn tiếp diễn.",
        "th": "เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดลองอีกครั้งหรือติดต่อเราหากปัญหายังคงอยู่",
        "id": "Terjadi kesalahan tak terduga. Silakan coba lagi atau hubungi kami jika masalah berlanjut.",
    },
    "errors.try_again": {
        "de": "Erneut versuchen", "es": "Reintentar", "fr": "Réessayer",
        "pt": "Tentar novamente", "it": "Riprova", "nl": "Opnieuw proberen",
        "sv": "Försök igen", "pl": "Spróbuj ponownie", "tr": "Tekrar dene",
        "ru": "Попробовать снова", "ar": "حاول مرة أخرى",
        "hi": "पुनः प्रयास करें", "zh": "重试", "zh-TW": "重試",
        "ja": "再試行", "ko": "다시 시도", "vi": "Thử lại",
        "th": "ลองอีกครั้ง", "id": "Coba lagi",
    },
    "errors.back_home": {
        "de": "Zurück zur Startseite", "es": "Volver al inicio",
        "fr": "Retour à l'accueil", "pt": "Voltar ao início",
        "it": "Torna alla home", "nl": "Terug naar home",
        "sv": "Tillbaka till startsidan", "pl": "Powrót do strony głównej",
        "tr": "Ana sayfaya dön", "ru": "На главную",
        "ar": "العودة إلى الرئيسية", "hi": "मुख्यपृष्ठ पर वापस जाएँ",
        "zh": "返回首页", "zh-TW": "返回首頁", "ja": "ホームに戻る",
        "ko": "홈으로 돌아가기", "vi": "Về trang chủ",
        "th": "กลับสู่หน้าหลัก", "id": "Kembali ke beranda",
    },
    "errors.not_found_title": {
        "de": "Seite nicht gefunden", "es": "Página no encontrada",
        "fr": "Page introuvable", "pt": "Página não encontrada",
        "it": "Pagina non trovata", "nl": "Pagina niet gevonden",
        "sv": "Sidan hittades inte", "pl": "Strona nie znaleziona",
        "tr": "Sayfa bulunamadı", "ru": "Страница не найдена",
        "ar": "الصفحة غير موجودة", "hi": "पृष्ठ नहीं मिला",
        "zh": "页面未找到", "zh-TW": "找不到頁面",
        "ja": "ページが見つかりません", "ko": "페이지를 찾을 수 없습니다",
        "vi": "Không tìm thấy trang", "th": "ไม่พบหน้าเว็บ",
        "id": "Halaman tidak ditemukan",
    },
    "errors.not_found_message": {
        "de": "Die gesuchte Seite existiert nicht oder wurde verschoben. Lass uns dich zurück auf Kurs bringen.",
        "es": "La página que buscas no existe o ha sido movida. Volvamos al camino correcto.",
        "fr": "La page que vous recherchez n'existe pas ou a été déplacée. Remettons-vous sur la bonne voie.",
        "pt": "A página que você procura não existe ou foi movida. Vamos colocá-lo de volta no caminho.",
        "it": "La pagina che stai cercando non esiste o è stata spostata. Ti rimettiamo sulla strada giusta.",
        "nl": "De pagina die je zoekt bestaat niet of is verplaatst. Laten we je weer op weg helpen.",
        "sv": "Sidan du letar efter finns inte eller har flyttats. Låt oss få dig tillbaka på rätt spår.",
        "pl": "Strona, której szukasz, nie istnieje lub została przeniesiona. Wróćmy na właściwą drogę.",
        "tr": "Aradığınız sayfa mevcut değil veya taşındı. Sizi tekrar yola koyalım.",
        "ru": "Запрашиваемая страница не существует или была перемещена. Давайте вернём вас на правильный путь.",
        "ar": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح.",
        "hi": "जिस पृष्ठ की आप तलाश कर रहे हैं वह मौजूद नहीं है या उसे स्थानांतरित कर दिया गया है। आइए आपको वापस सही रास्ते पर ले चलें।",
        "zh": "您要查找的页面不存在或已被移动。让我们带您回到正轨。",
        "zh-TW": "您要找的頁面不存在或已被移動。讓我們帶您回到正軌。",
        "ja": "お探しのページは存在しないか、移動されました。元に戻りましょう。",
        "ko": "찾으시는 페이지가 존재하지 않거나 이동되었습니다. 다시 제 자리로 안내해 드릴게요.",
        "vi": "Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển. Hãy đưa bạn trở lại đúng hướng.",
        "th": "ไม่พบหน้าเว็บที่คุณกำลังค้นหา หรือถูกย้ายแล้ว มาเริ่มต้นใหม่กันเถอะ",
        "id": "Halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke jalur yang benar.",
    },
    "errors.contact_us": {
        "de": "Kontakt", "es": "Contáctanos", "fr": "Nous contacter",
        "pt": "Contato", "it": "Contattaci", "nl": "Contact opnemen",
        "sv": "Kontakta oss", "pl": "Skontaktuj się", "tr": "Bize ulaşın",
        "ru": "Связаться с нами", "ar": "اتصل بنا", "hi": "संपर्क करें",
        "zh": "联系我们", "zh-TW": "聯絡我們", "ja": "お問い合わせ",
        "ko": "문의하기", "vi": "Liên hệ", "th": "ติดต่อเรา",
        "id": "Hubungi kami",
    },
}

# Convert flat dot-notation keys into nested {namespace: {key: trans}}
def by_namespace(translations: dict, lang: str) -> dict:
    out: dict[str, dict] = {}
    for full_key, langs in translations.items():
        ns, key = full_key.split(".", 1)
        out.setdefault(ns, {})[key] = langs[lang]
    return out

LANGS = ["de", "es", "fr", "pt", "it", "nl", "sv", "pl", "tr",
        "ru", "ar", "hi", "zh", "zh-TW", "ja", "ko", "vi", "th", "id"]

for lang in LANGS:
    path = ROOT / f"{lang}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    additions = by_namespace(NEW, lang)

    for ns, keys in additions.items():
        if ns not in data:
            data[ns] = {}
        # Merge new keys, preserving any existing ones (don't clobber)
        for k, v in keys.items():
            data[ns][k] = v

    # Reorder each namespace to match en.json's key order (any extra keys
    # in the locale that aren't in en stay at the end).
    for ns, en_keys in EN.items():
        if ns not in data or not isinstance(en_keys, dict):
            continue
        en_order = list(en_keys.keys())
        existing = data[ns]
        ordered = {k: existing[k] for k in en_order if k in existing}
        # Any keys in locale not in en — append last
        for k, v in existing.items():
            if k not in ordered:
                ordered[k] = v
        data[ns] = ordered

    # Also reorder top-level namespaces to match en.json
    top_order = list(EN.keys())
    ordered_top = {k: data[k] for k in top_order if k in data}
    for k, v in data.items():
        if k not in ordered_top:
            ordered_top[k] = v

    path.write_text(json.dumps(ordered_top, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"  ✓ {lang}.json")

print(f"Done. Patched {len(LANGS)} files with {len(NEW)} new keys each.")
