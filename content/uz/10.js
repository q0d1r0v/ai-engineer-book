window.BOOK.content.uz['10'] = {
  lead: `Demo ishlashi bilan mahsulot ishlashi orasida katta farq bor. Production’da so‘rovlar minglab bo‘ladi, provayder ba’zan xato qaytaradi, narx kutilmaganda oshadi, model versiyalari esa eskiradi. Bu bobda nimani kuzatish kerakligini, tracing’ni, ishonchlilik usullarini, xarajat nazoratini, gateway’larni va monitoring vositalarini o‘rganasiz.`,
  minutes: 40,
  tags: [`Nazariya`, `Amaliyot: kechikishni o‘lchash`],
  goals: [
    `Qaysi ko‘rsatkichlarni kuzatish kerak: kechikish, tezlik, narx, xatolar, sifat`,
    `Tracing va kuzatuv vositalari: Langfuse, LangSmith, Helicone va boshqalar`,
    `Ishonchlilik: qayta urinish, zaxira model, timeout, versiyani qotirish`,
    `Xarajatni nazorat qilish va gateway’lar`
  ],
  sections: [
    { id: 'metrics', title: `Nimani kuzatish kerak`, blocks: [
      { type: 'table', head: [`Ko‘rsatkich`, `Nima`, `Nega muhim`], rows: [
        [`<b>TTFT</b> (time to first token)`, `Birinchi token kelguncha vaqt`, `Foydalanuvchi “javob boshlandi”ni shu bilan sezadi`],
        [`<b>Tezlik</b>`, `Sekundiga token`, `Uzun javob qancha davom etishi`],
        [`<b>p50 / p95 kechikish</b>`, `Mediana va eng sekin 5% so‘rovlar`, `O‘rtacha qiymat sekin so‘rovlarni yashiradi`],
        [`<b>Narx</b>`, `So‘rov, foydalanuvchi, funksiya bo‘yicha`, `Qaysi qism pul “yeyayotganini” ko‘rish`],
        [`<b>Xatolar</b>`, `429, 5xx, timeout, sxemaga mos kelmagan javob`, `Ishonchlilik va limitlar`],
        [`<b>Sifat</b>`, `Foydalanuvchi bahosi, namunalar bo‘yicha eval natijasi`, `Model yoki prompt o‘zgargach sifat tushmaganini bilish`]
      ] },
      { type: 'note', tone: 'key', html: `Bitta raqamga emas, taqsimotga qarang: “sovuq” start, navbat va katta kontekst p95 ni bir necha baravar oshiradi. Uzun javoblarda streaming foydalanuvchi kutishini sezilarli yengillashtiradi.` }
    ] },
    { id: 'tracing', title: `Tracing: har so‘rovning yo‘lini ko‘rish`, blocks: [
      { type: 'p', html: `Agent yoki RAG tizimida bitta foydalanuvchi so‘rovi o‘nlab qadamdan iborat: qidiruv, bir necha model chaqiruvi, vositalar. <b>Trace</b> — butun so‘rovning yozuvi, <b>span</b> — undagi har bir qadam (vaqti, kirishi, chiqishi, tokenlari, narxi).` },
      { type: 'flow', items: [
        { title: `Trace: foydalanuvchi so‘rovi`, text: `jami 3.2 s` },
        { title: `Span: qidiruv`, text: `0.3 s` },
        { title: `Span: model`, text: `1.9 s, 1 200 token` },
        { title: `Span: vosita`, text: `0.6 s` }
      ] },
      { type: 'p', html: `Standart sifatida OpenTelemetry’ning GenAI semantik konvensiyalari shakllanmoqda (masalan, <code>gen_ai.server.time_to_first_token</code>). 2026-yil noyabr holatiga ular hali <b>Development</b> holatida, ya’ni barqaror emas va o‘zgarishi mumkin.` },
      { type: 'table', head: [`Vosita`, `Holati (2026-yil noyabr)`], rows: [
        [`<b>Langfuse</b>`, `Ochiq kod, o‘z serveringizda o‘rnatish mumkin; 2026-yil yanvarda ClickHouse sotib olgan, litsenziya o‘zgarmagan (asosiy qism MIT, ee/ papkalari alohida)`],
        [`<b>LangSmith</b>`, `LangChain’ning platformasi: Developer — bepul, oyiga 5 000 trace; Plus — har o‘rin uchun $39`],
        [`<b>Helicone</b>`, `Proksi orqali ishlaydi; 2026-yil martda Mintlify sotib olgan, hozir “maintenance” rejimida (xavfsizlik yangilanishlari, xato tuzatishlari va yangi modellar qo‘llab-quvvatlanadi)`],
        [`<b>Arize Phoenix</b>`, `OpenTelemetry asosida; Elastic License 2.0 — kodi ochiq, lekin OSI ma’nosida open source emas`],
        [`<b>OpenLIT</b>`, `Apache 2.0, OpenTelemetry asosida`]
      ], caption: `Bu bozor tez o‘zgaradi: vositani tanlashdan oldin uning joriy holatini tekshiring.` }
    ] },
    { id: 'reliability', title: `Ishonchlilik usullari`, blocks: [
      { type: 'table', head: [`Muammo`, `Yechim`], rows: [
        [`Vaqtinchalik 429, 500, 529 (overloaded)`, `Exponential backoff bilan qayta urinish, <code>retry-after</code> sarlavhasiga amal qilish. Anthropic SDK standart holatda 2 marta o‘zi qayta urinadi`],
        [`Oylik xarajat chegarasi (spend cap) tugagani uchun 429`, `Qayta urinish yordam bermaydi (retry-after yo‘q) — limitni oshiring yoki tiklanishini kuting. O‘zingiz qo‘ygan xarajat limiti esa 400 qaytaradi`],
        [`Provayder ishlamay qoldi`, `Zaxira model yoki provayder (fallback)`],
        [`Juda uzun so‘rov`, `Timeout; 10 daqiqadan uzun so‘rovlar uchun streaming yoki Batch API`],
        [`Stream o‘rtasida uzildi`, `HTTP 200 kelgandan keyin ham stream ichidagi xato hodisalarini qayta ishlash`],
        [`Bir xil savollar`, `Prompt caching; javoblarni ilova yoki gateway darajasida keshlash`]
      ], caption: `Har bir Anthropic javobida <code>request-id</code> sarlavhasi bor — muammoni provayder bilan hal qilishda kerak bo‘ladi, log’ga yozing.` }
    ] },
    { id: 'versions', title: `Model versiyalari eskiradi`, blocks: [
      { type: 'p', html: `Production’da model nomini aniq versiya bilan qotiring va eskirish jadvallarini kuzating. Provayder modelni ma’lum muddatdan keyin o‘chiradi — kodingiz shu kuni ishlamay qoladi.` },
      { type: 'table', head: [`Provayder`, `Ogohlantirish muddati`, `Misol`], rows: [
        [`Anthropic`, `Kamida 60 kun`, `claude-sonnet-4-5-20250929 2026-yil 30-noyabrda o‘chiriladi; o‘rniga claude-sonnet-5-5`],
        [`OpenAI`, `GA modellar uchun kamida 6 oy (maxsus variantlar — 3 oy, preview — ~2 hafta)`, `gpt-5, gpt-5-mini, o3 — 2026-yil 11-dekabrda`]
      ] },
      { type: 'note', tone: 'warn', html: `Faqat model emas, API ham o‘zgaradi: Claude API 2026-10-21 versiyasida temperature, top_p va top_k olib tashlandi (1-bob). Model yoki API versiyasini almashtirishdan oldin eval’ni (9-bob) ishga tushiring.` }
    ] },
    { id: 'cost', title: `Xarajatni nazorat qilish`, blocks: [
      { type: 'list', items: [
        `<b>Usage va Cost API:</b> Anthropic (<code>/v1/organizations/usage_report/messages</code>, <code>cost_report</code>) va OpenAI (<code>/v1/organization/usage/completions</code>, <code>/costs</code>) Admin kalit bilan ishlaydi va foydalanishni model va kalit bo‘yicha, xarajatni esa model va workspace bo‘yicha ko‘rsatadi. Anthropic ularni endi “legacy” deb belgilagan va yangi integratsiyalar uchun Usage and Cost Analytics API’ni tavsiya qiladi.`,
        `<b>Har bir foydalanuvchi va funksiya uchun limit</b> qo‘ying — bitta noto‘g‘ri sikl yoki suiiste’mol qiluvchi hisobni bo‘shatib yubormasin.`,
        `<b>Routing:</b> oddiy so‘rovlar kichik modelga (2-bob).`,
        `<b>Kesh nisbatini kuzating:</b> keshdan o‘qilgan kirish tokenlari ulushi. Kesh o‘qish Claude’da kirish narxining 10% (Opus va Sonnet 5.5 da 5%, Fable 5.2 da 2.5%).`,
        `<b>Batch API</b> — 50% arzon, darhol javob kerak bo‘lmagan ishlar uchun.`
      ] }
    ] },
    { id: 'gateway', title: `Gateway — model so‘rovlari uchun “darvoza”`, blocks: [
      { type: 'p', html: `Gateway ilova va provayderlar orasida turadi: bitta kalit va bitta manzil orqali ko‘p modellar, zaxira modellar, loglar, narx va limitlar.` },
      { type: 'cards', items: [
        { tag: `Ochiq kod`, title: `LiteLLM`, html: `Proksi: virtual kalitlar, loyiha va foydalanuvchi bo‘yicha xarajat, load balancing, fallback.` },
        { tag: `Ochiq kod (MIT)`, title: `Portkey`, html: `Fallback, avtomatik qayta urinish, yuklamani taqsimlash, guardrails.` },
        { tag: `Bulut`, title: `Cloudflare AI Gateway`, html: `Keshlash, rate limit, qayta urinish, fallback, analitika.` },
        { tag: `Bulut`, title: `Vercel AI Gateway`, html: `Fallback, byudjetlar (oshsa — HTTP 402), token narxiga ustamasiz.` }
      ] },
      { type: 'note', tone: 'warn', title: `Ta’minot zanjiri xavfi`, html: `LiteLLM’ning o‘z xabariga ko‘ra, 2026-yil martda PyPI’dagi 1.82.7 va 1.82.8 versiyalari zararli bo‘lib chiqqan (dastlabki tahlilga ko‘ra, CI’dagi Trivy bog‘liqligi orqali). Gateway barcha kalitlaringizni ko‘radi — paket versiyalarini qotiring va yangilanishlarni tekshiring.` }
    ] },
    { id: 'serving', title: `Ochiq modellarni o‘zingiz ishga tushirish`, blocks: [
      { type: 'table', head: [`Vosita`, `Xususiyati`], rows: [
        [`<b>vLLM</b>`, `Apache 2.0; PagedAttention; OpenAI-compatible server, Anthropic Messages formatini ham qabul qiladi`],
        [`<b>SGLang</b>`, `Apache 2.0; NVIDIA, AMD, TPU va boshqa uskunalarda`],
        [`<b>Hugging Face TGI</b>`, `Maintenance rejimida; Hugging Face vLLM yoki SGLang’ni, lokal uchun llama.cpp yoki MLX’ni tavsiya qiladi`]
      ] },
      { type: 'p', html: `Boshqariladigan variantlar: Amazon Bedrock, Microsoft Foundry, Google Cloud platformasi — ular ko‘p modellarni o‘z bulutingiz ichida taqdim etadi.` }
    ] }
  ],
  mistakes: [
    [`“O‘rtacha kechikish yaxshi — hammasi joyida”`, `p95 va “sovuq” startga qarang — model xotiraga yuklanayotganda birinchi javob ancha kech keladi.`],
    [`“429 bo‘lsa, qayta urinish yetadi”`, `Xarajat chegarasi tugagan bo‘lsa, limit oshirilmaguncha yoki tiklanmaguncha qayta urinish yordam bermaydi.`],
    [`“Model nomi o‘zgarmaydi”`, `Modellar bir necha haftadan (preview) 6 oygacha ogohlantirish bilan o‘chiriladi. Versiyani qotiring, jadvalni kuzating.`],
    [`“OpenTelemetry GenAI konvensiyalari barqaror”`, `2026-yil noyabr holatiga Development holatida.`],
    [`“Helicone yopilgan”`, `Maintenance rejimida ishlayapti.`],
    [`“Gateway paketi xavfsiz, chunki ochiq kod”`, `Ta’minot zanjiri hujumi bo‘lishi mumkin (LiteLLM, 2026). Versiyalarni qotiring.`]
  ],
  lab: [
    { type: 'p', html: `Kechikishni o‘zingiz o‘lchang (Ollama):` },
    { type: 'steps', items: [
      `Modelni xotiradan bo‘shating: <code>ollama stop &lt;model&gt;</code>.`,
      `<code>ollama run &lt;model&gt; --verbose</code> bilan savol bering. “load duration” va “total duration” ni yozing — bu “sovuq” start.`,
      `Xuddi shu savolni yana 5 marta bering (har safar <code>/clear</code> bilan). “eval rate” va umumiy vaqtni yozing — bu “issiq” holat.`,
      `Mediana va eng sekin natijani toping. Farq qancha?`
    ] },
    { type: 'p', html: `<b>Xarajat mashqi:</b> o‘z loyihangiz uchun jadval tuzing: kuniga so‘rovlar soni × o‘rtacha kirish va javob tokeni × narx (2-bob). Kesh nisbati 50% va 80% bo‘lsa, narx qanchaga tushishini hisoblang.` }
  ],
  quiz: [
    { q: `TTFT nimani o‘lchaydi?`, options: [`Javobning umumiy uzunligini`, `Birinchi token kelguncha ketgan vaqtni`, `Sekundiga tokenlarni`], answer: 1, explain: `Time to first token — foydalanuvchi javob boshlanganini qachon ko‘rishi.` },
    { q: `Xarajat limiti tugagani uchun 429 kelsa, nima qilish kerak?`, options: [`Exponential backoff bilan qayta urinish`, `Limitni oshirish yoki so‘rovlarni to‘xtatish`, `Boshqa API kalit bilan cheksiz urinish`], answer: 1, explain: `Bunday 429 da retry-after yo‘q va qayta urinish limit tiklanguncha yordam bermaydi.` },
    { q: `Anthropic modelni o‘chirishdan oldin kamida qancha vaqt ogohlantiradi?`, options: [`7 kun`, `60 kun`, `1 yil`], answer: 1, explain: `Anthropic kamida 60 kun; OpenAI GA modellar uchun kamida 6 oy.` },
    { q: `Trace va span farqi nima?`, options: [`Trace — butun so‘rov, span — undagi bitta qadam`, `Ular bir xil narsa`, `Span — butun so‘rov, trace — bitta qadam`], answer: 0, explain: `Trace butun yo‘lni, span esa har bir model chaqiruvi yoki vosita kabi qismlarni yozadi.` },
    { q: `“Sovuq start” nima?`, options: [`Model xotiraga hali yuklanmagan holatdagi birinchi so‘rov`, `Serverning sovib qolishi`, `Keshning tozalanishi`], answer: 0, explain: `Model yuklanguncha TTFT keskin oshadi; shuning uchun p95 va birinchi so‘rovlarni alohida kuzating.` }
  ],
  summary: [
    `Kechikish (TTFT, p95), tezlik, narx, xatolar va sifatni kuzating; trace bilan har bir qadamni ko‘ring.`,
    `Ishonchlilik: backoff, fallback, timeout, streaming va versiyani qotirish. Modellar va API’lar muntazam eskiradi.`,
    `Xarajat: limitlar, routing, kesh va batch. Gateway qulay, lekin ta’minot zanjiri xavfini unutmang.`
  ],
  glossary: [
    [`TTFT`, `Birinchi token kelguncha ketgan vaqt.`],
    [`p95`, `So‘rovlarning 95% shu vaqtdan tez bajariladi.`],
    [`Trace / span`, `So‘rovning to‘liq yozuvi va undagi alohida qadam.`],
    [`Fallback`, `Asosiy model ishlamasa, zaxira modelga o‘tish.`],
    [`Exponential backoff`, `Har urinishda kutish vaqtini oshirib qayta urinish.`],
    [`Gateway`, `Ilova va model provayderlari orasidagi boshqaruv qatlami.`],
    [`Deprecation`, `Model yoki funksiyaning eskirgan deb e’lon qilinishi va o‘chirish sanasi.`],
    [`Cold start`, `Model xotiraga yuklanmagan holatdagi birinchi so‘rov.`]
  ],
  sources: [
    { label: `OpenTelemetry — GenAI semantic conventions`, url: `https://github.com/open-telemetry/semantic-conventions-genai` },
    { label: `Anthropic — Errors`, url: `https://platform.claude.com/docs/en/api/errors` },
    { label: `Anthropic — Usage and Cost API`, url: `https://platform.claude.com/docs/en/manage-claude/usage-cost-api` },
    { label: `Anthropic — Model deprecations`, url: `https://platform.claude.com/docs/en/about-claude/model-deprecations` },
    { label: `Anthropic — Prompt caching`, url: `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` },
    { label: `OpenAI — Deprecations`, url: `https://developers.openai.com/api/docs/deprecations` },
    { label: `OpenAI — Usage API`, url: `https://developers.openai.com/cookbook/examples/completions_usage_api` },
    { label: `Langfuse — Joining ClickHouse`, url: `https://langfuse.com/blog/joining-clickhouse` },
    { label: `LangChain — Pricing`, url: `https://www.langchain.com/pricing` },
    { label: `Mintlify — Helicone`, url: `https://mintlify.com/blog/mintlify-acquires-helicone` },
    { label: `Arize Phoenix`, url: `https://github.com/Arize-ai/phoenix` },
    { label: `OpenLIT`, url: `https://github.com/openlit/openlit` },
    { label: `Vercel AI Gateway`, url: `https://vercel.com/docs/ai-gateway` },
    { label: `Cloudflare AI Gateway`, url: `https://developers.cloudflare.com/ai-gateway/` },
    { label: `Portkey Gateway`, url: `https://github.com/Portkey-AI/gateway` },
    { label: `LiteLLM — Security update (2026-yil mart)`, url: `https://docs.litellm.ai/blog/security-update-march-2026` },
    { label: `vLLM`, url: `https://github.com/vllm-project/vllm` },
    { label: `SGLang`, url: `https://github.com/sgl-project/sglang` },
    { label: `Hugging Face TGI`, url: `https://github.com/huggingface/text-generation-inference` }
  ]
};
