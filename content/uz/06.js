window.BOOK.content.uz['06'] = {
  lead: `RAG (retrieval-augmented generation) — modelga javob berishdan oldin kerakli hujjatlarni topib berish. Model o‘qitishda ko‘rmagan, yangi yoki maxfiy ma’lumot bilan ishlashning asosiy usuli shu. Bu bobda RAG qadamlarini, chunking’ni, qidiruvni yaxshilash usullarini, manbaga havola berishni va RAG, fine-tuning yoki uzun kontekst o‘rtasida tanlashni o‘rganasiz.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: Gemini Notebook`],
  goals: [
    `RAG nima uchun kerak va qanday qadamlardan iborat`,
    `Chunking, qidiruv, reranking va manbaga havola`,
    `Contextual Retrieval va boshqa ilg‘or usullar`,
    `RAG, fine-tuning yoki uzun kontekst — qachon qaysi biri`
  ],
  sections: [
    { id: 'what', title: `RAG nima va nega kerak`, blocks: [
      { type: 'p', html: `Model faqat o‘qitishda ko‘rgan narsani “biladi”. Kompaniyangizning ichki qoidalari, hujjatlari yoki kechagi yangiliklar unda yo‘q. RAG’da model javobdan oldin tashqi bazadan tegishli parchalarni oladi va javobni <b>shu parchalarga tayanib</b> yozadi. “RAG” atamasi va usuli Lewis va b. (2020) maqolasida taklif qilingan.` },
      { type: 'p', html: `Misol: “Ta’tilga necha kun oldin ariza berish kerak?” RAG’siz model umumiy taxmin bilan javob berishi va hatto o‘ylab topilgan va’dalar qo‘shishi mumkin. RAG bilan esa u kompaniya qoidasidagi aniq javobni manbasi bilan beradi.` },
      { type: 'note', tone: 'key', html: `RAG’ning asosiy foydasi — faqat to‘g‘ri javob emas, balki <b>tekshirsa bo‘ladigan</b> javob: manba ko‘rsatiladi, va promptda shunday ko‘rsatma berilsa, ma’lumot bo‘lmaganda model “bilmayman” deydi. Bu o‘z-o‘zidan bo‘lmaydi — ko‘rsatmani albatta yozing.` }
    ] },
    { id: 'pipeline', title: `RAG qadamlari`, blocks: [
      { type: 'flow', items: [
        { title: `1. Yuklash`, text: `PDF, sahifalar, baza` },
        { title: `2. Chunking`, text: `Bo‘laklarga bo‘lish` },
        { title: `3. Embedding`, text: `Har bir bo‘lak → vektor` },
        { title: `4. Qidiruv`, text: `Savolga eng mos bo‘laklar` },
        { title: `5. Reranking`, text: `Aniqroq qayta tartiblash` },
        { title: `6. Javob`, text: `Bo‘laklarga tayanib, manba bilan` }
      ] },
      { type: 'p', html: `1–3-qadamlar oldindan bir marta bajariladi (indekslash). 4–6-qadamlar har bir savolda ishlaydi. Hujjatlar o‘zgarsa, indeks ham yangilanishi kerak — eskirgan indeks RAG’ning keng tarqalgan muammosi.` }
    ] },
    { id: 'chunking', title: `Chunking: hujjatni bo‘laklarga bo‘lish`, blocks: [
      { type: 'p', html: `Butun hujjatni bitta vektorga aylantirish yomon ishlaydi: ma’no aralashib ketadi. Shuning uchun hujjat bo‘laklarga (chunk) bo‘linadi.` },
      { type: 'table', head: [`Usul`, `Qanday`, `Izoh`], rows: [
        [`Qat’iy o‘lcham + overlap`, `Masalan, 800 token, qo‘shni bo‘laklar 400 token ustma-ust`, `OpenAI vector store’ning standart sozlamasi (bo‘lak 100–4096 token)`],
        [`Rekursiv`, `Avval paragraflar, keyin qatorlar, keyin so‘zlar bo‘yicha bo‘lish`, `Matn tuzilishini saqlashga harakat qiladi`],
        [`Tuzilma bo‘yicha`, `Sarlavhalar, bo‘limlar, jadvallar, kod funksiyalari bo‘yicha`, `Hujjatlar va kod uchun ko‘pincha eng yaxshisi`],
        [`Semantik`, `Ma’no o‘zgargan joyda bo‘lish`, `Qimmatroq, har doim ham yaxshiroq emas`]
      ] },
      { type: 'note', tone: 'warn', html: `Bo‘lak juda kichik bo‘lsa, kontekst yo‘qoladi (“Daromad 3% oshdi” — qaysi kompaniya, qaysi yil?). Juda katta bo‘lsa, qidiruv aniqligi pasayadi. Har bir bo‘lakka manba, sarlavha va sana kabi <b>metadata</b> qo‘shing.` }
    ] },
    { id: 'contextual', title: `Contextual Retrieval`, blocks: [
      { type: 'p', html: `Anthropic (2024-yil sentyabr) bo‘laklarning kontekst yo‘qotishi muammosini shunday kamaytirgan: indekslashdan oldin har bir bo‘lak boshiga butun hujjatga qarab yozilgan 50–100 tokenli qisqa izoh qo‘shiladi (masalan, “Bu bo‘lak ACME kompaniyasining 2023-yil 2-chorak hisobotidan…”). Izohni kichik model yozadi.` },
      { type: 'bars', title: `Top-20 qidiruvda topilmay qolgan bo‘laklar ulushi`, max: 6, items: [
        { label: `Oddiy RAG`, value: 5.7, text: `5.7%` },
        { label: `+ kontekstli embedding`, value: 3.7, text: `3.7%` },
        { label: `+ kontekstli BM25`, value: 2.9, text: `2.9%` },
        { label: `+ reranking`, value: 1.9, text: `1.9%` }
      ], caption: `Xatolar mos ravishda 35%, 49% va 67% ga kamaygan. Manba: Anthropic, “Introducing Contextual Retrieval”, 2024.` },
      { type: 'note', tone: 'info', html: `Xuddi shu maqoladagi muhim maslahat: agar bilim bazangiz <b>200 ming tokendan kichik</b> bo‘lsa (taxminan 500 sahifa), RAG qurmasdan hammasini promptga qo‘yish va prompt caching ishlatish mumkin.` }
    ] },
    { id: 'rerank', title: `Qidiruvni yaxshilash`, blocks: [
      { type: 'cards', items: [
        { tag: `Reranking`, title: `Qayta tartiblash`, html: `Avval ko‘p nomzod olinadi (masalan, 150 ta), keyin aniqroq model (cross-encoder) ularni savolga nisbatan qayta baholab, eng yaxshi 20 tasini qoldiradi. Masalan: Cohere Rerank, Voyage rerank.` },
        { tag: `Hybrid`, title: `BM25 + vektor`, html: `Kalit so‘z va ma’no qidiruvini birlashtirish (5-bob).` },
        { tag: `Query rewriting`, title: `Savolni qayta yozish`, html: `Model foydalanuvchi savolini qidiruvga qulayroq shaklga keltiradi yoki bir nechta variant yaratadi.` },
        { tag: `HyDE`, title: `Taxminiy javob bilan qidirish`, html: `Model avval taxminiy javob hujjatini yozadi, keyin shu matnning vektori bilan haqiqiy hujjatlar qidiriladi (Gao va b., 2022).` }
      ] },
      { type: 'list', items: [
        `<b>Agentic RAG</b> — model qidiruv vositasini o‘zi, kerak bo‘lsa bir necha marta chaqiradi (7-bob). Bu aniq bitta maqola emas, keng tarqalgan pattern.`,
        `<b>GraphRAG</b> (Microsoft, 2024) — hujjatlardan obyektlar grafi quriladi, guruhlar uchun xulosalar yoziladi. “Butun to‘plam haqida” umumiy savollarda foydali.`
      ] }
    ] },
    { id: 'citations', title: `Manbaga havola va tayyor xizmatlar`, blocks: [
      { type: 'table', head: [`Xizmat`, `Nima beradi`], rows: [
        [`<b>Claude Citations</b>`, `Javobdagi da’volar uchun hujjatdagi aniq joyga havola (havola haqiqiy joyga ishora qilishi kafolatlangan, lekin har bir da’voga havola bo‘lishi kafolatlanmagan); havola qilingan matn javob tokeni sifatida hisoblanmaydi. Structured output bilan birga ishlamaydi.`],
        [`<b>OpenAI file_search</b>`, `Responses API vositasi: vector store’dan qidiradi, javobga fayl havolalarini qo‘shadi. Har 1 000 chaqiruv uchun $2.50, saqlash $0.10/GB/kun (1 GB bepul).`],
        [`<b>Gemini File Search</b>`, `Boshqariladigan RAG: saqlash bepul, indekslash embedding narxida, metadata filtrlari va havolalar bilan.`]
      ], caption: `2026-yil noyabr holatiga. OpenAI Assistants API 2026-yil avgustda yopilgan — eski darsliklardagi “Assistants + file_search” o‘rniga Responses API ishlatiladi.` },
      { type: 'note', tone: 'warn', html: `Oddiy prompt orqali “manbani ko‘rsat” desangiz, model mavjud bo‘lmagan manbani ham “ko‘rsatishi” mumkin. Provayderning citations funksiyasi esa havolaning haqiqiy hujjatga ishora qilishini kafolatlaydi.` }
    ] },
    { id: 'choose', title: `RAG, fine-tuning yoki uzun kontekst`, blocks: [
      { type: 'p', html: `OpenAI qo‘llanmasi bu tanlovni ikki o‘q bilan tushuntiradi: <b>RAG</b> modelga yetishmayotgan yoki yangi <b>bilimni</b> beradi; <b>fine-tuning</b> esa <b>xulq-atvorni</b> — format, uslub, izchillikni o‘zgartiradi. Ular bir-birini to‘ldiradi.` },
      { type: 'table', head: [`Vazifa`, `Yechim`], rows: [
        [`Kompaniya hujjatlari bo‘yicha savol-javob, tez-tez yangilanadigan ma’lumot`, `<b>RAG</b>`],
        [`Bilim bazasi 200K tokendan kichik va kam o‘zgaradi`, `<b>Hammasini kontekstga</b> + prompt caching`],
        [`Har doim qat’iy format yoki maxsus uslub kerak`, `<b>Fine-tuning</b> (yoki avval yaxshi prompt va few-shot)`],
        [`Yangi faktlarni modelga “o‘rgatish”`, `<b>RAG</b> — Ovadia va b. (2023): yangi bilimni kiritishda RAG nazoratsiz fine-tuning’dan doimiy ustun`]
      ] },
      { type: 'note', tone: 'info', html: `1 million tokenli kontekst RAG’ni keraksiz qilmaydi: context rot va “lost in the middle” (1, 4-boblar), har so‘rovda millionlab token narxi va kechikishi, 1M dan katta bazalar va tez-tez yangilanish — bularning hammasi RAG foydasiga.` }
    ] },
    { id: 'fail', title: `RAG qayerda buziladi`, blocks: [
      { type: 'list', items: [
        `<b>Qidiruv topmadi</b> — noto‘g‘ri chunking, zaif embedding modeli (5-bobdagi til muammosi), reranking yo‘q.`,
        `<b>Topdi, lekin model ishlatmadi</b> — juda ko‘p bo‘lak berilgan yoki kerakli bo‘lak o‘rtada qolgan.`,
        `<b>Eskirgan indeks</b> — hujjat yangilangan, vektorlar eski.`,
        `<b>Metadata yo‘q</b> — eski va yangi versiyalar, turli bo‘limlar aralashib ketadi.`,
        `<b>Ruxsatlar e’tiborsiz</b> — foydalanuvchi ko‘rmasligi kerak bo‘lgan hujjat javobga kirib qoladi.`
      ] },
      { type: 'p', html: `RAG sifatini o‘lchash uchun ikki qismni alohida baholang: qidiruv (context precision, context recall) va javob (faithfulness — javobdagi da’volarning qanchasi topilgan hujjatlarga tayangan). Bu — 9-bob mavzusi.` }
    ] }
  ],
  mistakes: [
    [`“1M kontekst bor — RAG kerak emas”`, `Narx, kechikish, context rot va katta bazalar RAG’ni hamon zarur qiladi. 200K dan kichik bazada esa to‘liq kontekst yaxshi variant.`],
    [`“Fine-tuning bilan yangi faktlarni o‘rgataman”`, `Bilim uchun RAG odatda ustun; fine-tuning — xulq va format uchun.`],
    [`“Model ‘manbani ko‘rsat’ desam, manba haqiqiy bo‘ladi”`, `O‘ylab topilishi mumkin. Citations funksiyasidan foydalaning.`],
    [`“Contextual embedding’ning o‘zi 49% beradi”`, `Yolg‘iz o‘zi 35%. 49% — BM25 bilan, 67% — reranking bilan.`],
    [`“Indeks bir marta quriladi”`, `Hujjatlar o‘zgarsa, indeks ham yangilanishi kerak.`],
    [`“Assistants API bilan file_search ishlataman”`, `Assistants API 2026-yil avgustda yopilgan; Responses API ishlating.`]
  ],
  lab: [
    { type: 'p', html: `Tayyor vositada RAG’ni kuzating — kod kerak emas.` },
    { type: 'steps', items: [
      `<b>Gemini Notebook</b> (sobiq NotebookLM, notebooklm.google) ga kiring va 2–3 ta PDF yoki maqola yuklang.`,
      `Hujjatlarda bor savol bering va javobdagi havolani bosing: ko‘rsatilgan joyda haqiqatan shu ma’lumot bormi?`,
      `Hujjatlarda <b>yo‘q</b> savol bering. Tizim “bilmayman” deydimi yoki taxmin qiladimi?`,
      `Ixtiyoriy, lokal: <b>Open WebUI</b> (Python 3.11 yoki 3.12 kerak: <code>pip install open-webui</code>, keyin <code>open-webui serve</code>) Ollama bilan ishlaydi. Chatda <code>#</code> orqali hujjat biriktiring yoki Workspace → Knowledge’da to‘plam yarating.`
    ] },
    { type: 'term', lines: [
      `$ pip install open-webui`,
      `$ open-webui serve`,
      `# brauzerda http://localhost:8080 ni oching`
    ] },
    { type: 'note', tone: 'warn', html: `Lokal RAG’da Ollama kontekstini oshiring (4-bob): standart kontekst bilan (24 GB dan kam VRAM’da 4 096 token) topilgan hujjatlar jimgina kesilib ketishi mumkin.` }
  ],
  quiz: [
    { q: `RAG’ning asosiy vazifasi nima?`, options: [`Modelni qayta o‘qitish`, `Javobdan oldin tegishli hujjatlarni topib, modelga berish`, `Javobni tezlashtirish`], answer: 1, explain: `Model javobni topilgan parchalarga tayanib yozadi; bu yangi va maxfiy ma’lumot bilan ishlash imkonini beradi.` },
    { q: `Contextual Retrieval’da qidiruv xatolari eng ko‘p qachon kamaygan?`, options: [`Faqat kontekstli embedding bilan (−35%)`, `Kontekstli embedding + BM25 + reranking bilan (−67%)`, `Faqat reranking bilan`], answer: 1, explain: `−35% (embedding), −49% (+BM25), −67% (+reranking).` },
    { q: `Bilim bazasi 100 ming token va kam o‘zgaradi. Eng oddiy yechim?`, options: [`Murakkab RAG tizimi`, `Fine-tuning`, `Hammasini kontekstga qo‘yish + prompt caching`], answer: 2, explain: `Anthropic: 200K tokendan kichik bazalarda RAG’siz to‘liq kontekst va caching yetarli bo‘lishi mumkin.` },
    { q: `Modelga doim qat’iy uslubda javob berishni o‘rgatish uchun nima mos?`, options: [`RAG`, `Fine-tuning (yoki avval prompt va few-shot)`, `Vector bazani kattalashtirish`], answer: 1, explain: `RAG — bilim uchun, fine-tuning — xulq, format va uslub uchun.` },
    { q: `Reranking nima qiladi?`, options: [`Hujjatlarni bo‘laklarga bo‘ladi`, `Topilgan ko‘p nomzodlarni aniqroq model bilan qayta tartiblaydi`, `Embedding o‘lchamini kamaytiradi`], answer: 1, explain: `Masalan, 150 ta nomzoddan cross-encoder eng mos 20 tasini tanlaydi.` }
  ],
  summary: [
    `RAG modelga yangi va maxfiy bilimni beradi va javobni tekshirsa bo‘ladigan qiladi: manba bilan, ko‘rsatma berilsa ma’lumot bo‘lmaganda “bilmayman”.`,
    `Sifat chunking, embedding modeli, hybrid qidiruv va reranking’ga bog‘liq; Contextual Retrieval xatolarni 67% gacha kamaytirgan.`,
    `Bilim — RAG, xulq — fine-tuning, kichik baza — to‘liq kontekst + caching. Uzun kontekst RAG’ni bekor qilmaydi.`
  ],
  glossary: [
    [`RAG`, `Retrieval-augmented generation — javobdan oldin hujjatlarni qidirib, modelga berish.`],
    [`Chunk`, `Hujjatning indekslash uchun ajratilgan bo‘lagi.`],
    [`Overlap`, `Qo‘shni bo‘laklarning ustma-ust tushadigan qismi.`],
    [`Reranking`, `Topilgan nomzodlarni aniqroq model bilan qayta tartiblash.`],
    [`Cross-encoder`, `Savol va hujjatni birga o‘qib, moslikni baholaydigan model.`],
    [`Contextual Retrieval`, `Har bir bo‘lakka hujjat kontekstidan izoh qo‘shib indekslash usuli.`],
    [`HyDE`, `Taxminiy javob yozib, uning vektori bilan qidirish.`],
    [`GraphRAG`, `Hujjatlardan obyektlar grafi qurib, qidiruvni graf orqali qilish.`],
    [`Faithfulness`, `Javobdagi da’volarning topilgan manbalarga tayangan ulushi.`],
    [`Fine-tuning`, `Modelni qo‘shimcha ma’lumotda qayta o‘qitib, xulqini o‘zgartirish.`]
  ],
  sources: [
    { label: `Lewis va b., 2020 — Retrieval-Augmented Generation`, url: `https://arxiv.org/abs/2005.11401` },
    { label: `Anthropic — Introducing Contextual Retrieval (2024)`, url: `https://www.anthropic.com/news/contextual-retrieval` },
    { label: `OpenAI — Retrieval (vector stores)`, url: `https://developers.openai.com/api/docs/guides/retrieval` },
    { label: `OpenAI — File search`, url: `https://developers.openai.com/api/docs/guides/tools-file-search` },
    { label: `OpenAI — Optimizing LLM accuracy`, url: `https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy` },
    { label: `Anthropic — Citations`, url: `https://platform.claude.com/docs/en/build-with-claude/citations` },
    { label: `Google — File Search`, url: `https://aistudio.google.com/docs/file-search` },
    { label: `Ovadia va b., 2023 — Fine-Tuning or Retrieval?`, url: `https://arxiv.org/abs/2312.05934` },
    { label: `Gao va b., 2022 — HyDE`, url: `https://arxiv.org/abs/2212.10496` },
    { label: `Microsoft — GraphRAG`, url: `https://microsoft.github.io/graphrag/` },
    { label: `Ragas — Metrics`, url: `https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/` },
    { label: `Google — Gemini Notebook (NotebookLM)`, url: `https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/` },
    { label: `Open WebUI — Docs`, url: `https://docs.openwebui.com/` }
  ]
};
