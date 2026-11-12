window.BOOK.content.uz['03'] = {
  lead: `Prompt — modelga beriladigan ko‘rsatma. Bir xil model yaxshi va yomon prompt bilan butunlay boshqacha ishlaydi. Bu bobda zero-shot va few-shot, chain of thought, system prompt, promptni tuzish usullari va javobni qat’iy formatda (structured output) olishni o‘rganasiz. Har bir usul tadqiqotlar va rasmiy hujjatlar asosida tushuntiriladi.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: OpenRouter + Ollama`],
  goals: [
    `Aniq va tushunarli ko‘rsatma yozish qoidalari`,
    `Zero-shot, few-shot va chain of thought — qachon qaysi biri`,
    `System prompt, rollar va promptni tuzish (XML teglar, uzun hujjatlar)`,
    `Structured output: JSON’ni ishonchli olish va uning cheklovlari`
  ],
  sections: [
    { id: 'basics', title: `Yaxshi prompt nimadan boshlanadi`, blocks: [
      { type: 'p', html: `Anthropic tavsiya qiladigan oddiy sinov: <b>promptingizni vazifadan bexabar hamkasbingizga ko‘rsating.</b> Agar u nima qilish kerakligini tushunmasa, model ham tushunmaydi. Model sizning boshingizdagi kontekstni bilmaydi — hammasini yozish kerak.` },
      { type: 'list', items: [
        `<b>Aniq va to‘g‘ridan-to‘g‘ri bo‘ling:</b> nima kerak, qanday formatda, qancha hajmda.`,
        `<b>Sababini ayting:</b> qoidaning nima uchun kerakligini tushuntirsangiz, model uni yaxshiroq qo‘llaydi.`,
        `<b>Kontekst bering:</b> kim uchun, nima maqsadda, qanday cheklovlar bor.`
      ] },
      { type: 'cards', items: [
        { tag: `Zaif`, title: `Faqat qoida`, html: `“HECH QACHON uch nuqta ishlatma.”` },
        { tag: `Kuchli`, title: `Qoida + sabab`, html: `“Uch nuqta ishlatma, chunki javob ovozga aylantiriladi va dastur uni o‘qiy olmaydi.” Endi model shunga o‘xshash boshqa belgilardan ham qochishi mumkin.` }
      ] },
      { type: 'note', tone: 'warn', html: `“MUHIM!!! DOIM shunday qil” kabi baqiruvchi bosh harflar yangi modellarda ko‘pincha zarar qiladi: model qoidani haddan tashqari ko‘p qo‘llay boshlaydi. Anthropic oddiy ohangni tavsiya qiladi: “Bu vositani … bo‘lganda ishlat”.` }
    ] },
    { id: 'shots', title: `Zero-shot va few-shot`, blocks: [
      { type: 'p', html: `<b>Zero-shot</b> — vazifani namunasiz berish. <b>Few-shot</b> — vazifa bilan birga bir nechta tayyor misol (savol → javob) ko‘rsatish. GPT-3 maqolasi (Brown va b., 2020) katta modellar namunalardan modelni qayta o‘qitmasdan, faqat matn orqali o‘rganishini ko‘rsatgan.` },
      { type: 'p', html: `Misol: xodimning IT murojaatini “nosozlik / savol / so‘rov” deb tasniflashda zero-shot model to‘g‘ri kategoriyani topsa ham, javobni uzun izoh bilan yozib yuborishi mumkin — bunday javobni dastur avtomatik o‘qiy olmaydi. Bir nechta namuna javobning aniq ko‘rinishini ko‘rsatadi.` },
      { type: 'note', tone: 'key', html: `Few-shot ko‘pincha bilimni emas, <b>formatni</b> o‘rgatadi. Anthropic 3–5 ta namunani tavsiya qiladi: ular vazifaga yaqin va bir-biridan farqli bo‘lsin, aks holda model bitta namunadagi tasodifiy xususiyatni ko‘chirib oladi. Namunalarni <code>&lt;example&gt;</code> teglariga o‘rang.` },
      { type: 'p', html: `OpenAI’ning reasoning modellari uchun maslahati: avval zero-shot sinab ko‘ring, kerak bo‘lsa few-shot qo‘shing.` }
    ] },
    { id: 'cot', title: `Chain of thought — qadam-baqadam fikrlash`, blocks: [
      { type: 'p', html: `<b>Chain of thought (CoT)</b> — modeldan javobdan oldin oraliq qadamlarni yozishni so‘rash (Wei va b., 2022). Kojima va b. (2022) bitta jumla — “Let’s think step by step” — qo‘shilganda text-davinci-002 modelining natijasi MultiArith’da 17.7% dan 78.7% gacha, GSM8K’da 10.4% dan 40.7% gacha oshganini ko‘rsatgan.` },
      { type: 'p', html: `Wei va b. (2022) PaLM 540B modeliga atigi 8 ta CoT namunasi berib, GSM8K matematik testida o‘sha paytdagi eng yaxshi natijaga erishgan. Lekin CoT’ning narxi bor: javob ancha uzayadi, ya’ni ko‘proq token va vaqt sarflanadi. Uni faqat haqiqatan fikrlash kerak bo‘lgan vazifalarda ishlating.` },
      { type: 'note', tone: 'warn', title: `Reasoning modellarda boshqacha`, html: `Thinking’li modellar (Claude Opus 5.5, Fable 5.2, GPT-6) o‘zi fikrlaydi. OpenAI ularda CoT so‘rovidan qochishni tavsiya qiladi. Anthropic: qo‘lda yozilgan qadamlar rejasidan ko‘ra “yaxshilab o‘ylab ko‘r” degan umumiy ko‘rsatma ko‘pincha yaxshiroq ishlaydi; qo‘lda CoT faqat thinking o‘chirilganda kerak. Claude’dan fikrini maxsus teglar ichida yozishni so‘rash rad etilishi mumkin.` }
    ] },
    { id: 'system', title: `System prompt va rollar`, blocks: [
      { type: 'p', html: `<b>System prompt</b> — butun suhbat uchun qoidalar: kim bo‘lish, qanday ohangda, nimani qilmaslik. Anthropic: hatto bitta jumlalik rol (“Sen tajribali yurist yordamchisisan”) ham natijaga ta’sir qiladi.` },
      { type: 'table', head: [`Joy`, `Claude`, `OpenAI`], rows: [
        [`Qoidalar`, `Alohida <code>system</code> maydoni`, `<code>developer</code> xabari (user’dan ustun turadi)`],
        [`Foydalanuvchi`, `<code>user</code>`, `<code>user</code>`],
        [`Model`, `<code>assistant</code>`, `<code>assistant</code>`]
      ] },
      { type: 'list', items: [
        `System promptni “to‘g‘ri balandlikda” yozing: juda umumiy (“yordam ber”) ham, har bir holatni sanab chiqadigan uzun ro‘yxat ham yomon.`,
        `Rolni, auditoriyani, ohangni va chegaralarni yozing: “Faqat kompaniyaning IT xizmatlari haqida javob ber. Bilmasang, ochiq ayt.”`
      ] }
    ] },
    { id: 'structure', title: `Promptni tuzish: teglar va uzun hujjatlar`, blocks: [
      { type: 'p', html: `Promptda ko‘rsatma, kontekst, namunalar va kirish ma’lumoti aralashib ketmasligi kerak. Anthropic ularni XML teglari bilan ajratishni tavsiya qiladi:` },
      { type: 'term', lines: [
        `<documents>`,
        `  <document index="1">… shartnoma matni …</document>`,
        `  <document index="2">… ilova …</document>`,
        `</documents>`,
        `<instructions>Shartnomadagi to‘lov muddatlarini jadval qilib chiqar.</instructions>`
      ] },
      { type: 'note', tone: 'key', html: `Uzun hujjatlar (20K+ token) bilan ishlaganda <b>hujjatlarni boshiga, savolni oxiriga</b> qo‘ying. Anthropic’ning test natijasiga ko‘ra, savolni oxirida berish javob sifatini 30% gacha oshirishi mumkin.` }
    ] },
    { id: 'json', title: `Structured output: JSON’ni ishonchli olish`, blocks: [
      { type: 'p', html: `Dastur model javobini o‘qishi uchun u qat’iy formatda bo‘lishi kerak — odatda JSON. Faqat “JSON qaytar” deb so‘rash yetarli emas.` },
      { type: 'p', html: `Faqat prompt bilan model ba’zan JSON’ni markdown blokiga (\`\`\`json … \`\`\`) o‘raydi, maydonni tushirib qoldiradi yoki ortiqcha matn qo‘shadi. OpenAI’ning 2024-yilgi e’loniga ko‘ra, murakkab JSON sxemalarga amal qilish testida gpt-4o-2024-08-06 Structured Outputs bilan 100% natija olgan, gpt-4-0613 esa 40% dan kam.` },
      { type: 'p', html: `Ishonchli yo‘l — <b>sxema bilan cheklangan generatsiya</b> (constrained decoding): model faqat sxemaga mos tokenlarni tanlay oladi.` },
      { type: 'table', head: [`Provayder`, `Usul`, `Kafolat`], rows: [
        [`Claude`, `<code>output_config.format</code> (json_schema), tool’larda <code>strict: true</code>`, `Sxemaga mos (rad etish yoki max_tokens holatidan tashqari)`],
        [`OpenAI`, `Structured Outputs: <code>json_schema</code> + <code>strict: true</code>`, `Sxemaga mos. Oddiy JSON mode faqat to‘g‘ri JSON’ni kafolatlaydi`],
        [`Gemini`, `JSON sxema bilan javob formati`, `Sintaktik to‘g‘ri JSON; qiymatlarni o‘zingiz tekshiring`],
        [`Ollama`, `<code>format</code>: "json" yoki JSON Schema`, `Rasmiy kafolat yo‘q; sxemani promptga ham yozish tavsiya etiladi`]
      ], caption: `2026-yil noyabr holatiga. Har bir provayder JSON Schema’ning faqat bir qismini qo‘llaydi: masalan, Claude’da minLength/maxLength va minimum/maximum yo‘q, OpenAI strict rejimida barcha maydonlar majburiy bo‘lishi kerak.` },
      { type: 'note', tone: 'warn', html: `Sxema <b>formatni</b> kafolatlaydi, <b>qiymatning to‘g‘riligini</b> emas. Model to‘g‘ri tuzilgan JSON ichida noto‘g‘ri ma’lumot yozishi mumkin — qiymatlarni tekshiring. Claude’da javob boshini oldindan yozib berish (prefill) usuli Claude 4.6 va undan keyingi modellarda 400 xato beradi; uning o‘rniga structured output ishlating.` }
    ] },
    { id: 'iterate', title: `Promptni sinash va yaxshilash`, blocks: [
      { type: 'list', items: [
        `<b>Prompt chaining:</b> katta vazifani ketma-ket qadamlarga bo‘ling (qoralama → tekshirish → tuzatish), har qadam natijasini ko‘rib chiqish mumkin bo‘ladi.`,
        `<b>Versiyalang:</b> promptlarni kod bilan birga saqlang va o‘zgarishlarni kuzating. Model versiyasini qat’iy belgilang (snapshot).`,
        `<b>O‘lchang:</b> 20–50 ta real misoldan test to‘plami tuzing va har o‘zgarishdan keyin natijani solishtiring (9-bob).`
      ] },
      { type: 'note', tone: 'info', html: `Vositalar o‘zgarib turadi: Anthropic Console’dagi eski Workbench 2026-yil avgustda “playground” bilan almashtirildi, prompt yaratish va yaxshilash API’lari o‘chirildi. OpenAI’ning saqlanadigan prompt obyektlari va Evals (panel ham, API ham) 2026-yil 30-noyabrda yopiladi. Promptlarni tashqi panelda emas, o‘z kodingizda saqlash xavfsizroq.` }
    ] }
  ],
  mistakes: [
    [`“Model nima istayotganimni tushunadi”`, `Kontekstni bilmaydi. Hamkasb sinovidan o‘tkazing.`],
    [`“Har doim ‘qadam-baqadam o‘yla’ deb yoz”`, `Reasoning modellarda kerak emas va hatto zarar qilishi mumkin.`],
    [`“Bitta namuna yetadi”`, `3–5 ta xilma-xil namuna; bittasi model ko‘chirib oladigan tasodifiy xususiyatlarni beradi.`],
    [`“JSON mode = sxema kafolati”`, `JSON mode faqat to‘g‘ri JSON beradi. Sxema uchun strict structured output kerak.`],
    [`“Sxema bo‘lsa, qiymatlar to‘g‘ri”`, `Format kafolatlanadi, mazmun emas.`],
    [`“Claude’da prefill bilan formatni majburlayman”`, `Claude 4.6 va undan keyingi modellarda prefill 400 xato beradi.`],
    [`“BOSH HARFLAR bilan yozsam, yaxshiroq bajaradi”`, `Yangi modellar bunday qoidani haddan tashqari qo‘llaydi.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. Bulutda (kodsiz).</b> openrouter.ai/chat da 2–3 ta modelni yonma-yon tanlang.` },
    { type: 'steps', items: [
      `Zero-shot: “Xabarni tasnifla: shikoyat, savol yoki minnatdorchilik. Xabar: Qadoq yirtilgan holda keldi.”`,
      `Few-shot: xuddi shu vazifa, oldidan 3 ta xilma-xil namuna bilan. Javob formati qanday o‘zgardi?`,
      `Murakkab masala bering: avval “faqat javobni yoz”, keyin “yaxshilab o‘ylab ko‘r”. Reasoning modelda farq bormi?`,
      `Har bir urinishda javob uzunligi va to‘g‘riligini yozib boring.`
    ] },
    { type: 'p', html: `<b>B. Lokal: JSON formatini majburlash.</b>` },
    { type: 'term', lines: [
      `$ ollama run <model>`,
      `>>> Xabardan ism, sana va xonani JSON qilib chiqar: "Anna, 3-dekabr kuni 2-xonada uchrashuv."`,
      `>>> /bye`,
      `$ ollama run <model> --format json`,
      `>>> Xabardan ism, sana va xonani JSON qilib chiqar: "Anna, 3-dekabr kuni 2-xonada uchrashuv."`
    ] },
    { type: 'p', html: `Ikkinchi holatda javob toza JSON bo‘ladi, markdown bloksiz. To‘liq sxema bilan cheklash esa API orqali (<code>format</code> maydoniga JSON Schema berish) qilinadi.` }
  ],
  quiz: [
    { q: `Few-shot ko‘pincha modelga nimani o‘rgatadi?`, options: [`Yangi bilimlarni`, `Javob formati va uslubini`, `Tezroq ishlashni`], answer: 1, explain: `Namunalar javobning aniq ko‘rinishini ko‘rsatadi; vazifa uchun kerakli bilimni model odatda avvaldan biladi.` },
    { q: `Reasoning (thinking) yoqilgan modelga “qadam-baqadam o‘yla” deb yozish kerakmi?`, options: [`Ha, har doim`, `Odatda kerak emas; umumiy “yaxshilab o‘yla” yoki effort sozlamasi afzal`, `Faqat ingliz tilida`], answer: 1, explain: `OpenAI reasoning modellarda CoT promptlaridan qochishni, Anthropic esa umumiy ko‘rsatma va effort’ni tavsiya qiladi.` },
    { q: `Uzun hujjat bilan ishlaganda savolni qayerga qo‘yish kerak?`, options: [`Boshiga, hujjatdan oldin`, `Oxiriga, hujjatlardan keyin`, `O‘rtasiga`], answer: 1, explain: `Anthropic: hujjatlar yuqorida, savol oxirida — sifat 30% gacha yaxshilanishi mumkin.` },
    { q: `OpenAI’da oddiy JSON mode nimani kafolatlaydi?`, options: [`Sxemaga to‘liq moslikni`, `Faqat sintaktik to‘g‘ri JSON’ni`, `Qiymatlarning to‘g‘riligini`], answer: 1, explain: `Sxemaga moslikni faqat Structured Outputs (strict) kafolatlaydi. Qiymatlar to‘g‘riligini hech biri kafolatlamaydi.` },
    { q: `Kojima va b. (2022) “Let’s think step by step” jumlasini qo‘shganda MultiArith testida natija qanday o‘zgargan?`, options: [`17.7% dan 78.7% ga oshgan`, `O‘zgarmagan`, `Pasaygan`], answer: 0, explain: `text-davinci-002 modelida; GSM8K’da esa 10.4% dan 40.7% ga oshgan.` }
  ],
  summary: [
    `Yaxshi prompt — aniq, kontekstli va sababi tushuntirilgan. Hamkasb sinovidan foydalaning.`,
    `Few-shot formatni o‘rgatadi, CoT fikrlashni kuchaytiradi, lekin reasoning modellarda qo‘lda CoT kerak emas.`,
    `Mashina o‘qiydigan javob uchun prompt yetmaydi — sxema bilan cheklangan structured output ishlating va qiymatlarni tekshiring.`
  ],
  glossary: [
    [`Prompt`, `Modelga beriladigan ko‘rsatma va kontekst.`],
    [`Zero-shot`, `Vazifani namunasiz berish.`],
    [`Few-shot`, `Vazifani bir nechta tayyor namuna bilan berish.`],
    [`Chain of thought`, `Javobdan oldin oraliq fikrlash qadamlarini yozish.`],
    [`System prompt`, `Butun suhbat uchun qoidalar va rol.`],
    [`Prefill`, `Model javobining boshini oldindan yozib berish (Claude 4.6 va undan keyingi modellarda o‘chirilgan).`],
    [`Structured output`, `Javobni berilgan JSON sxemaga mos qilib olish.`],
    [`Constrained decoding`, `Faqat sxemaga mos tokenlarni tanlashga ruxsat beruvchi generatsiya.`],
    [`Prompt chaining`, `Vazifani ketma-ket bir nechta prompt qadamlariga bo‘lish.`]
  ],
  sources: [
    { label: `Brown va b., 2020 — Language Models are Few-Shot Learners`, url: `https://arxiv.org/abs/2005.14165` },
    { label: `Wei va b., 2022 — Chain-of-Thought Prompting`, url: `https://arxiv.org/abs/2201.11903` },
    { label: `Kojima va b., 2022 — Large Language Models are Zero-Shot Reasoners`, url: `https://arxiv.org/abs/2205.11916` },
    { label: `Anthropic — Prompting best practices`, url: `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices` },
    { label: `Anthropic — Structured outputs`, url: `https://platform.claude.com/docs/en/build-with-claude/structured-outputs` },
    { label: `OpenAI — Prompt engineering`, url: `https://developers.openai.com/api/docs/guides/prompt-engineering` },
    { label: `OpenAI — Reasoning best practices`, url: `https://developers.openai.com/api/docs/guides/reasoning-best-practices` },
    { label: `OpenAI — Introducing Structured Outputs (2024)`, url: `https://openai.com/index/introducing-structured-outputs-in-the-api/` },
    { label: `OpenAI — Structured outputs`, url: `https://developers.openai.com/api/docs/guides/structured-outputs` },
    { label: `Google — Structured output`, url: `https://aistudio.google.com/docs/structured-output` },
    { label: `Ollama — Structured outputs`, url: `https://docs.ollama.com/capabilities/structured-outputs` },
    { label: `Anthropic — Release notes`, url: `https://platform.claude.com/docs/en/release-notes/overview` },
    { label: `OpenAI — Deprecations`, url: `https://developers.openai.com/api/docs/deprecations` }
  ]
};
