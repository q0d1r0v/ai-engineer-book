window.BOOK.content.uz['04'] = {
  lead: `Prompt engineering “qanday so‘rash”ni o‘rgatadi. Context engineering esa “modelga aynan nima berish”ni: qaysi ma’lumot, qachon, qancha. Uzun ishlaydigan agentlarda bu eng muhim mahoratga aylandi. Bu bobda kontekst nega “buziladi”, to‘g‘ri ma’lumotni qanday berish, xotira va uzun kontekstni siqish usullarini o‘rganasiz.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: kontekst va xotira`],
  goals: [
    `Context engineering ta’rifi va prompt engineering’dan farqi`,
    `Kontekst qanday buziladi: context rot va to‘rtta xato turi`,
    `Ma’lumotni oldindan yuklash va kerak bo‘lganda olish (just-in-time)`,
    `Uzoq vazifalar uchun: compaction, natijalarni tozalash, eslatmalar, sub-agentlar, xotira`
  ],
  sections: [
    { id: 'what', title: `Context engineering nima`, blocks: [
      { type: 'p', html: `Anthropic ta’rifi (2025-yil sentyabr): context engineering — model ishlayotgan paytda unga beriladigan tokenlarning <b>eng maqbul to‘plamini tanlash va saqlab turish</b>. Kontekstga system prompt, vositalar ta’rifi, suhbat tarixi, vosita natijalari, hujjatlar va xotira — hammasi kiradi.` },
      { type: 'cards', items: [
        { tag: `Prompt engineering`, title: `Qanday so‘rash`, html: `Bir martalik vazifa uchun yaxshi ko‘rsatma yozish.` },
        { tag: `Context engineering`, title: `Nima berish`, html: `Har bir qadamda modelga qaysi ma’lumot kirishini boshqarish. Bu takrorlanuvchi jarayon: har safar modelga nimadir yuborganda qaror qilinadi.` }
      ] },
      { type: 'note', tone: 'key', html: `Maqsad — kerakli natijani beradigan <b>eng kichik, eng foydali tokenlar to‘plami</b>. Ko‘proq kontekst — har doim ham yaxshiroq natija emas.` }
    ] },
    { id: 'why', title: `Nega kontekst “buziladi”`, blocks: [
      { type: 'p', html: `Attention mexanizmida har bir token boshqa har bir token bilan bog‘lanadi: n ta token uchun taxminan n² ta munosabat. Anthropic buni <b>attention budget</b> deb ataydi — u cheklangan va har bir yangi token uni biroz “yeydi”. Chroma tadqiqoti (2025) 18 ta modelda kirish uzaygan sari ishonchlilik asta-sekin pasayishini ko‘rsatgan (context rot).` },
      { type: 'p', html: `Drew Breunig (2025) uzun kontekstdagi to‘rtta xato turini ajratadi:` },
      { type: 'table', head: [`Xato`, `Nima bo‘ladi`, `Misol`], rows: [
        [`<b>Poisoning</b> (zaharlanish)`, `Gallyutsinatsiya kontekstga kirib qoladi va qayta-qayta ishlatiladi`, `Pokémon o‘ynayotgan Gemini agenti noto‘g‘ri maqsadga “yopishib” qolgan`],
        [`<b>Distraction</b> (chalg‘ish)`, `Model o‘qitishdagi bilimdan ko‘ra kontekstga haddan tashqari tayanadi`, `100K tokendan keyin Gemini o‘tmishdagi harakatlarni takrorlay boshlagan`],
        [`<b>Confusion</b> (adashish)`, `Keraksiz ma’lumot javobga ta’sir qiladi`, `Kvantlangan Llama 3.1 8B 46 ta vosita bilan muvaffaqiyatsiz, 19 tasi bilan muvaffaqiyatli ishlagan`],
        [`<b>Clash</b> (to‘qnashuv)`, `Yangi ma’lumot oldingisiga zid keladi`, `Ma’lumot bir necha xabarga bo‘lib berilganda natijalar o‘rtacha 39% pasaygan`]
      ], caption: `Manba: Breunig, “How Long Contexts Fail”, 2025.` }
    ] },
    { id: 'limits', title: `Limitdan oshganda nima bo‘ladi`, blocks: [
      { type: 'p', html: `Kontekst limitidan oshganda tizimlar turlicha ishlaydi: bulut API’lari odatda xato qaytaradi, ba’zi lokal vositalar esa kirishni qisqartirishi mumkin — va model kesilgan qismni umuman “ko‘rmaydi”. Masalan, Ollama standart kontekstni GPU xotirasiga qarab tanlaydi: 24 GB dan kam VRAM’da atigi 4 096 token.` },
      { type: 'note', tone: 'warn', html: `Doim kirish token sonini kuzating (API’larda <code>usage</code>, Ollama’da <code>prompt_eval_count</code>) va vositangiz hujjatida limitdan oshganda nima bo‘lishini tekshiring. Kutilganidan kam token ko‘rinsa — matn kesilgan bo‘lishi mumkin.` }
    ] },
    { id: 'jit', title: `Ma’lumotni qachon berish: oldindan yoki kerak bo‘lganda`, blocks: [
      { type: 'cards', items: [
        { tag: `Oldindan yuklash`, title: `Hammasi boshida`, html: `Kerakli hujjatlar so‘rov boshida beriladi. Oddiy, tez, lekin kontekstni tez to‘ldiradi.` },
        { tag: `Just-in-time`, title: `Kerak bo‘lganda olish`, html: `Kontekstda faqat “manzillar” saqlanadi (fayl yo‘llari, so‘rovlar, havolalar). Agent ma’lumotni vositalar orqali kerak bo‘lganda o‘zi yuklaydi.` }
      ] },
      { type: 'p', html: `Ko‘pincha <b>aralash</b> yondashuv eng yaxshisi. Masalan, Claude Code loyiha qoidalari faylini (CLAUDE.md) boshidayoq yuklaydi, kod fayllarini esa kerak bo‘lganda qidirish (glob, grep) orqali topadi.` }
    ] },
    { id: 'long', title: `Uzoq vazifalar uchun to‘rtta usul`, blocks: [
      { type: 'table', head: [`Usul`, `Qanday ishlaydi`, `Qachon`], rows: [
        [`<b>Compaction</b> (siqish)`, `Kontekst to‘lganda suhbat tarixi qisqa xulosaga aylantiriladi va yangi kontekst shu xulosadan boshlanadi`, `Uzoq suhbat va agent ishlari`],
        [`<b>Natijalarni tozalash</b>`, `Eski vosita natijalari kontekstdan olib tashlanadi — eng yengil usul`, `Agent ko‘p vosita chaqirganda`],
        [`<b>Eslatmalar</b> (note-taking)`, `Agent muhim narsalarni tashqi faylga (masalan, NOTES.md) yozadi va keyin qayta o‘qiydi`, `Ko‘p soatlik vazifalar`],
        [`<b>Sub-agentlar</b>`, `Alohida toza kontekstli yordamchi agent ishlaydi va faqat qisqa xulosa (1–2 ming token) qaytaradi`, `Mustaqil, parallel qismlar`]
      ], caption: `Manba: Anthropic, “Effective context engineering for AI agents”, 2025.` }
    ] },
    { id: 'tools', title: `Provayderlarning tayyor vositalari`, blocks: [
      { type: 'table', head: [`Vosita`, `Claude`, `OpenAI`], rows: [
        [`Siqish`, `Compaction (beta): talab bo‘yicha yoki chegaradan oshganda (standart 150K token)`, `Responses API’da compaction: chegara yoki alohida endpoint; natija shifrlangan element`],
        [`Tozalash`, `Context editing (beta): eski vosita natijalari va thinking bloklarini olib tashlash`, `—`],
        [`Xotira`, `Memory tool: model <code>/memories</code> papkasida fayllar yaratadi va o‘qiydi; fayllar sizning tomoningizda saqlanadi`, `—`],
        [`Suhbat holati`, `Odatda har safar to‘liq tarix yuboriladi; beta “message threads” bilan faqat yangi xabarlar (thread 5 daqiqada tugaydi, narx o‘zgarmaydi)`, `Qo‘lda, <code>previous_response_id</code> yoki Conversations API; javoblar standart holatda 30 kun saqlanadi`]
      ], caption: `2026-yil noyabr holatiga. Beta funksiyalar o‘zgarishi mumkin — rasmiy hujjatni tekshiring.` },
      { type: 'note', tone: 'info', html: `Compaction va context editing bir xil narsa emas: compaction tarixni <b>xulosalaydi</b>, context editing esa eski qismlarni <b>olib tashlaydi</b>. Kontekstni o‘zgartirish prompt keshini buzadi — buni narxda hisobga oling.` }
    ] },
    { id: 'memory', title: `Xotira turlari`, blocks: [
      { type: 'p', html: `LLM o‘zi hech narsani eslamaydi — “xotira” doim tashqi tizim. CoALA maqolasi (Sumers va b., 2023) inson xotirasiga o‘xshatib to‘rtta turni ajratadi:` },
      { type: 'cards', items: [
        { tag: `Working`, title: `Ishchi xotira`, html: `Joriy kontekst oynasi — hozir ko‘rib turgan narsa.` },
        { tag: `Episodic`, title: `Voqealar xotirasi`, html: `O‘tgan suhbatlar va harakatlar tarixi.` },
        { tag: `Semantic`, title: `Bilimlar xotirasi`, html: `Faktlar: foydalanuvchi afzalliklari, hujjatlar.` },
        { tag: `Procedural`, title: `Ko‘nikmalar xotirasi`, html: `Qanday qilish: qoidalar, ko‘rsatmalar, kod.` }
      ] },
      { type: 'list', items: [
        `<b>MemGPT</b> (Packer va b., 2023) — operatsion tizim xotirasiga o‘xshab “virtual kontekst” boshqaruvi. Uning davomchisi Letta xotirani core, recall va archival qismlarga bo‘ladi.`,
        `<b>Mem0</b> (2025) — uzoq muddatli xotira uchun tayyor qatlam.`,
        `<b>Loyiha fayllari</b> — oddiy va kuchli usul: masalan, Claude Code har sessiya boshida CLAUDE.md faylini o‘qiydi (tavsiya: 200 qatordan kam). Ko‘p vositalar AGENTS.md faylini ham qo‘llaydi.`
      ] }
    ] },
    { id: 'cache', title: `Kontekstni keshga mos qurish`, blocks: [
      { type: 'p', html: `Prompt caching faqat <b>o‘zgarmaydigan boshlang‘ich qism</b> (prefix) uchun ishlaydi. Shuning uchun tartib muhim: o‘zgarmas narsalar boshida, o‘zgaruvchilar oxirida.` },
      { type: 'flow', items: [
        { title: `Vositalar`, text: `O‘zgarmaydi` },
        { title: `System prompt`, text: `O‘zgarmaydi` },
        { title: `Hujjatlar`, text: `Kam o‘zgaradi` },
        { title: `Suhbat va savol`, text: `Har safar yangi` }
      ] },
      { type: 'stats', items: [
        { value: `0.1×`, label: `Claude’da keshdan o‘qish narxi (Opus/Sonnet 5.5 da 0.05×, Fable 5.2 da 0.025×)` },
        { value: `1.25×`, label: `keshga yozish narxi (5 daqiqalik kesh; 1 soatlik — 2×)` },
        { value: `512`, label: `token — joriy Claude modellarida keshlanadigan minimal prefix` }
      ] },
      { type: 'note', tone: 'warn', html: `Klassik xato: system prompt boshiga joriy vaqtni yoki foydalanuvchi ismini qo‘yish. Shunda prefix har safar o‘zgaradi va kesh umuman ishlamaydi.` }
    ] }
  ],
  mistakes: [
    [`“Kontekst qancha ko‘p bo‘lsa, shuncha yaxshi”`, `Context rot va to‘rtta xato turi aksini ko‘rsatadi.`],
    [`“Limitdan oshsa, har doim xato chiqadi”`, `Bulut API’lari odatda xato qaytaradi, lekin ba’zi tizimlar (masalan, Ollama) matnni jimgina kesadi — token sonini kuzating.`],
    [`“Model suhbatlarni eslab qoladi”`, `Xotira doim tashqi tizim: fayllar, baza yoki provayder vositasi.`],
    [`“Compaction = context editing”`, `Compaction xulosalaydi, context editing olib tashlaydi.`],
    [`“Memory tool ma’lumotni Anthropic serverida saqlaydi”`, `Fayllar sizning tomoningizda saqlanadi.`],
    [`“Vaqtni system prompt boshiga qo‘yish zararsiz”`, `Prefix o‘zgaradi va prompt caching ishlamay qoladi.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. Kontekst zaharlanishini kuzating (kodsiz).</b> Istalgan chat ilovada:` },
    { type: 'steps', items: [
      `Yangi suhbatda modelga noto‘g‘ri “fakt” ayting: “Loyihadagi barcha narxlar yevroda.”`,
      `10–15 xabar davomida boshqa mavzularda ishlang, keyin narx bilan bog‘liq savol bering. Model noto‘g‘ri faktni hamon ishlatyaptimi?`,
      `Yangi suhbat oching va faqat to‘g‘ri, qisqa xulosani bering (qo‘lda compaction). Javoblarni solishtiring.`
    ] },
    { type: 'p', html: `<b>B. Kontekst kesilishini o‘zingiz ko‘ring (Ollama).</b> Uzun matn bilan ishlashdan oldin kontekst hajmini oshiring:` },
    { type: 'term', lines: [
      `$ ollama run <model> --verbose`,
      `>>> /set parameter num_ctx 32768`,
      `# endi uzun matn bering va "prompt eval count" qatoriga qarang`
    ] },
    { type: 'p', html: `“prompt eval count” kutilganidan ancha kam bo‘lsa, matn kesilgan bo‘lishi mumkin. Ko‘proq kontekst ko‘proq xotira talab qiladi (2-bob: KV cache).` },
    { type: 'p', html: `<b>C. Loyiha xotirasi.</b> Claude Code yoki boshqa AI kod yordamchisida 20–30 qatorli qoidalar faylini (CLAUDE.md yoki AGENTS.md) yozing: loyiha maqsadi, buyruqlar, uslub. Bir xil vazifani faylsiz va fayl bilan berib, natijani solishtiring.` }
  ],
  quiz: [
    { q: `Context engineering’ning maqsadi nima?`, options: [`Kontekstni iloji boricha to‘ldirish`, `Natija uchun eng kichik, eng foydali tokenlar to‘plamini berish`, `Faqat system prompt yozish`], answer: 1, explain: `Anthropic ta’rifi: kerakli natijani beradigan eng kichik yuqori signalli tokenlar to‘plami.` },
    { q: `Breunig misolida kvantlangan Llama 3.1 8B vositalar soniga qarab qanday ishlagan?`, options: [`46 ta vosita bilan muvaffaqiyatsiz, 19 tasi bilan muvaffaqiyatli`, `19 ta vosita bilan muvaffaqiyatsiz, 46 tasi bilan muvaffaqiyatli`, `Vositalar soni ta’sir qilmagan`], answer: 0, explain: `Keraksiz vositalar ham javobga ta’sir qiladi — bu “confusion” (adashish) xatosi.` },
    { q: `“Poisoning” xatosi nima?`, options: [`Gallyutsinatsiya kontekstga kirib, qayta-qayta ishlatilishi`, `Keraksiz vositalar ko‘pligi`, `Model sekin ishlashi`], answer: 0, explain: `Bir marta kirgan xato ma’lumot keyingi qadamlarda “haqiqat” sifatida ishlatiladi.` },
    { q: `Prompt caching uchun nimani boshiga qo‘yish kerak?`, options: [`Joriy vaqt va foydalanuvchi ismini`, `O‘zgarmaydigan qismlarni: vositalar, system prompt, hujjatlar`, `Oxirgi savolni`], answer: 1, explain: `Kesh faqat bir xil prefix uchun ishlaydi; o‘zgaruvchi qismlar oxirida bo‘lishi kerak.` },
    { q: `Sub-agentning context engineering’dagi foydasi nimada?`, options: [`U bosh agentning kontekstini to‘ldirmasdan ishlab, faqat qisqa xulosa qaytaradi`, `U tokenlarni tejaydi, chunki bepul`, `U bosh agentning xotirasini o‘chiradi`], answer: 0, explain: `Sub-agent toza kontekstda ishlaydi va 1–2 ming tokenli xulosa qaytaradi.` }
  ],
  summary: [
    `Context engineering — har qadamda modelga aynan nima kirishini boshqarish. Kamroq, lekin aniqroq kontekst yaxshiroq.`,
    `Uzun kontekst buziladi (rot, poisoning, distraction, confusion, clash) va ba’zan jimgina kesiladi — token sonini kuzating.`,
    `Uzoq vazifalar uchun: just-in-time yuklash, compaction, natijalarni tozalash, eslatmalar, sub-agentlar va keshga mos tartib.`
  ],
  glossary: [
    [`Context engineering`, `Modelga beriladigan tokenlar to‘plamini tanlash va boshqarish.`],
    [`Context rot`, `Kontekst uzaygan sari model ishonchliligining asta-sekin pasayishi.`],
    [`Attention budget`, `Modelning cheklangan e’tibor “byudjeti”; har yangi token undan ulush oladi.`],
    [`Just-in-time`, `Ma’lumotni oldindan emas, kerak bo‘lganda vosita orqali yuklash.`],
    [`Compaction`, `Suhbat tarixini xulosaga aylantirib, kontekstni siqish.`],
    [`Context editing`, `Kontekstdan eski vosita natijalari yoki thinking bloklarini olib tashlash.`],
    [`Sub-agent`, `Alohida kontekstda ishlab, qisqa natija qaytaradigan yordamchi agent.`],
    [`Prefix`, `So‘rovning o‘zgarmaydigan boshlang‘ich qismi; prompt caching shunga asoslanadi.`]
  ],
  sources: [
    { label: `Anthropic — Effective context engineering for AI agents (2025)`, url: `https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents` },
    { label: `Chroma — Context Rot (2025)`, url: `https://www.trychroma.com/research/context-rot` },
    { label: `Breunig — How Long Contexts Fail (2025)`, url: `https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html` },
    { label: `Anthropic — Compaction`, url: `https://platform.claude.com/docs/en/build-with-claude/compaction` },
    { label: `Anthropic — Context editing`, url: `https://platform.claude.com/docs/en/build-with-claude/context-editing` },
    { label: `Anthropic — Memory tool`, url: `https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool` },
    { label: `Anthropic — Prompt caching`, url: `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` },
    { label: `OpenAI — Conversation state`, url: `https://developers.openai.com/api/docs/guides/conversation-state` },
    { label: `OpenAI — Compaction`, url: `https://developers.openai.com/api/docs/guides/compaction` },
    { label: `Packer va b., 2023 — MemGPT`, url: `https://arxiv.org/abs/2310.08560` },
    { label: `Sumers va b., 2023 — CoALA`, url: `https://arxiv.org/abs/2309.02427` },
    { label: `Mem0, 2025`, url: `https://arxiv.org/abs/2504.19413` },
    { label: `Claude Code — Memory (CLAUDE.md)`, url: `https://code.claude.com/docs/en/memory` }
  ]
};
