window.BOOK.content.uz['07'] = {
  lead: `Agent — bu o‘z harakatlarini o‘zi tanlaydigan LLM: u vositalarni (tool) chaqiradi, natijani o‘qiydi va vazifa tugaguncha davom etadi. Bu bobda tool calling qanday ishlashini, agent va workflow farqini, MCP protokolini, multi-agent tizimlarni, ishonchlilik muammolarini va asosiy frameworklarni o‘rganasiz.`,
  minutes: 55,
  tags: [`Nazariya`, `Amaliyot: MCP ulash`],
  goals: [
    `Tool calling (function calling) qanday ishlashini va uni kim bajarishini tushunish`,
    `Workflow va agent farqi, beshta asosiy pattern`,
    `MCP: arxitektura, imkoniyatlar, 2026-yilgi versiya va xavfsizlik`,
    `Multi-agent qachon foyda, qachon zarar berishi; frameworklar`
  ],
  sections: [
    { id: 'what', title: `Agent nima`, blocks: [
      { type: 'p', html: `Anthropic’ning “Building effective agents” maqolasi (2024-yil dekabr) ikkita tushunchani ajratadi:` },
      { type: 'cards', items: [
        { tag: `Workflow`, title: `Yo‘l oldindan yozilgan`, html: `LLM va vositalar dasturchi yozgan aniq kod yo‘llari bo‘yicha ishlaydi. Bashorat qilish oson, barqaror.` },
        { tag: `Agent`, title: `Yo‘lni model tanlaydi`, html: `LLM o‘z jarayonini va qaysi vositani qachon ishlatishni o‘zi boshqaradi. Moslashuvchan, lekin qimmatroq va xato ehtimoli ko‘proq.` }
      ] },
      { type: 'p', html: `Ikkalasining asosi — <b>kengaytirilgan LLM</b> (augmented LLM): qidiruv, vositalar va xotira ulangan model.` },
      { type: 'note', tone: 'key', html: `Anthropic maslahati: eng oddiy yechimdan boshlang va murakkablikni faqat natija yaxshilansa qo‘shing. Ko‘p ilovalar uchun agent ham, workflow ham shart emas — qidiruv va misollar bilan yaxshilangan bitta LLM chaqiruvi yetarli. Avval LLM API’ni to‘g‘ridan-to‘g‘ri ishlating; framework ishlatsangiz, uning ichida nima bo‘layotganini tushuning.` }
    ] },
    { id: 'toolcall', title: `Tool calling: model funksiyani bajarmaydi`, blocks: [
      { type: 'p', html: `Eng ko‘p uchraydigan xato tushuncha: “model funksiyani chaqiradi”. Aslida model faqat <b>chaqiruv so‘rovini</b> yozadi — qaysi funksiya va qanday argumentlar bilan. Funksiyani <b>sizning ilovangiz</b> bajaradi va natijani modelga qaytaradi.` },
      { type: 'flow', items: [
        { title: `1. Savol`, text: `“12345-murojaatim qay holatda?” + vositalar ta’rifi` },
        { title: `2. Model so‘raydi`, text: `murojaat_holati({"raqam": "12345"})` },
        { title: `3. Ilova bajaradi`, text: `Bazadan: holat “yo‘lda”, sana 14-noyabr` },
        { title: `4. Model javob beradi`, text: `“Murojaatingiz ishlanmoqda, ertaga hal qilinadi.”` }
      ] },
      { type: 'p', html: `Har bir vosita uchun modelga nom, tavsif va argumentlar sxemasi (JSON Schema) beriladi. Tavsif juda muhim: model qachon qaysi vositani ishlatishni aynan shundan tushunadi.` },
      { type: 'table', head: [`Provayder`, `Model so‘rovi`, `Siz qaytaradigan natija`], rows: [
        [`Claude`, `<code>tool_use</code> bloki (id, name, input), <code>stop_reason: "tool_use"</code>`, `<code>tool_result</code> bloki, mos <code>tool_use_id</code> bilan`],
        [`OpenAI (Responses API)`, `<code>function_call</code> elementi (call_id, name, arguments)`, `<code>function_call_output</code>, mos <code>call_id</code> bilan`],
        [`Gemini (generateContent)`, `<code>functionCall</code> qismi`, `<code>functionResponse</code> qismi`]
      ], caption: `Nomlar har xil, mexanizm bir xil. Claude’da <code>strict: true</code> chaqiruv sxemaga to‘liq mos kelishini kafolatlaydi.` }
    ] },
    { id: 'loop', title: `Agent sikli`, blocks: [
      { type: 'p', html: `Agent — bu tool calling’ning siklga aylangan ko‘rinishi. Model natijani ko‘radi, keyingi qadamni tanlaydi va vositalar chaqirmay javob bermaguncha davom etadi. Har bir aylanish — bitta <b>turn</b>.` },
      { type: 'flow', items: [
        { title: `Vazifa` },
        { title: `Model o‘ylaydi`, text: `Keyingi qadamni tanlaydi` },
        { title: `Vosita`, text: `Ilova bajaradi` },
        { title: `Natija`, text: `Kontekstga qo‘shiladi` },
        { title: `Takror yoki javob` }
      ] },
      { type: 'note', tone: 'info', html: `Har bir turn’da butun tarix (vosita natijalari bilan) qayta yuboriladi. Shuning uchun agentlar oddiy chatga qaraganda ancha ko‘p token sarflaydi — Anthropic o‘lchoviga ko‘ra taxminan 4 baravar.` }
    ] },
    { id: 'servertools', title: `Client va server vositalari`, blocks: [
      { type: 'cards', items: [
        { tag: `Client tools`, title: `Sizning ilovangizda ishlaydi`, html: `O‘zingiz yozgan funksiyalar va provayder sxemasidagi vositalar (masalan, Claude’da bash, text editor, computer use). Natijani siz qaytarasiz.` },
        { tag: `Server tools`, title: `Provayder serverida ishlaydi`, html: `Masalan, Claude’da web search, web fetch, code execution; OpenAI’da web search, code interpreter. Ba’zilari har bir ishlatilish uchun alohida to‘lanadi.` }
      ] }
    ] },
    { id: 'patterns', title: `Beshta workflow pattern`, blocks: [
      { type: 'table', head: [`Pattern`, `Qanday ishlaydi`, `Misol`], rows: [
        [`<b>Prompt chaining</b>`, `Vazifa ketma-ket qadamlarga bo‘linadi, har qadam oldingisining natijasini oladi`, `Matn yozish → tekshirish → tarjima`],
        [`<b>Routing</b>`, `Kirish tasniflanadi va mos yo‘lga yuboriladi`, `Xodim murojaati: texnik / kirish huquqi / jihoz`],
        [`<b>Parallelization</b>`, `Bir nechta qism bir vaqtda bajariladi yoki bir necha javob solishtiriladi`, `Hujjatning 5 bo‘limini parallel tahlil qilish`],
        [`<b>Orchestrator-workers</b>`, `Bosh model vazifani bo‘ladi va ishchilarga tarqatadi`, `Tadqiqot: bosh agent 3 ta qidiruvchini yuboradi`],
        [`<b>Evaluator-optimizer</b>`, `Bir model yozadi, boshqasi baholaydi, sikl takrorlanadi`, `Tarjimon + tanqidchi sikli`]
      ], caption: `Pattern ta’riflari: Anthropic, “Building effective agents”, 2024. Misollar — bizniki.` }
    ] },
    { id: 'react', title: `ReAct`, blocks: [
      { type: 'p', html: `<b>ReAct</b> (Yao va b., 2022; ICLR 2023) — fikrlash (reasoning) va harakatni (acting) almashtirib bajarish g‘oyasi: model fikr yozadi, harakat qiladi, natijani kuzatadi va yana fikrlaydi. Maqolada ALFWorld’da +34%, WebShop’da +10% mutlaq yaxshilanish (taqlid va RL usullariga nisbatan) ko‘rsatilgan.` },
      { type: 'p', html: `ReAct dastlab prompt orqali ishlagan: model “Thought / Action / Observation” matnini yozgan, ilova esa uni o‘qib ajratgan. Bugungi API’lar vosita chaqiruvini tayyor tuzilmali shaklda qaytaradi, fikrlash esa alohida thinking bloklarida bo‘ladi. Sikl o‘sha, lekin ancha ishonchli.` }
    ] },
    { id: 'mcp', title: `MCP — vositalar uchun umumiy “ulagich”`, blocks: [
      { type: 'p', html: `<b>Model Context Protocol (MCP)</b> — AI ilovalarni tashqi vositalar va ma’lumotlarga ulash uchun ochiq standart. Anthropic uni 2024-yil 25-noyabrda e’lon qilgan. 2025-yil 9-dekabrda Linux Foundation tarkibidagi <b>Agentic AI Foundation</b>’ga (AAIF) topshirilgan; hammuassislar — Anthropic, Block va OpenAI.` },
      { type: 'p', html: `Afzalligi: bitta MCP server yozasiz va u MCP’ni qo‘llaydigan istalgan ilovada ishlaydi — Claude, ChatGPT, Cursor, VS Code, Gemini, Microsoft Copilot va boshqalar.` },
      { type: 'flow', items: [
        { title: `Host`, text: `AI ilova: Claude Desktop, IDE` },
        { title: `Client`, text: `Host ichidagi ulagich, har serverga bittadan` },
        { title: `Server`, text: `Vositalar va ma’lumotlarni beradi` }
      ] },
      { type: 'table', head: [`Imkoniyat`, `Kim beradi`, `Nima`], rows: [
        [`<b>Tools</b>`, `Server`, `Model chaqira oladigan funksiyalar`],
        [`<b>Resources</b>`, `Server`, `O‘qish uchun ma’lumotlar (fayllar, yozuvlar)`],
        [`<b>Prompts</b>`, `Server`, `Foydalanuvchi tanlaydigan tayyor shablonlar`],
        [`<b>Elicitation</b>`, `Client`, `Server foydalanuvchidan qo‘shimcha ma’lumot so‘rashi`]
      ], caption: `Xabarlar JSON-RPC 2.0 formatida. Transportlar: stdio (lokal) va Streamable HTTP (masofaviy). Kengaytmalar: Tasks, MCP Apps.` },
      { type: 'note', tone: 'warn', title: `2026-07-28 versiyasi`, html: `Joriy spetsifikatsiya — <b>2026-07-28</b>. Unda MCP stateless bo‘ldi: <code>initialize</code> bosqichi va sessiyalar olib tashlandi, har so‘rov versiya va imkoniyatlarni o‘zi olib yuradi. Roots, Sampling, Logging va Dynamic Client Registration eskirgan deb belgilandi (kamida 12 oy ishlashda davom etadi; eski HTTP+SSE transporti esa 2025-yildan beri eskirgan), Tasks esa asosiy qismdan kengaytmaga o‘tkazildi. Eski maqolalardagi tafsilotlar endi to‘g‘ri bo‘lmasligi mumkin.` },
      { type: 'p', html: `Avtorizatsiya ixtiyoriy va faqat HTTP transport uchun: OAuth 2.1 asosida, PKCE majburiy. stdio serverlar esa kalitlarni muhit o‘zgaruvchilaridan oladi.` }
    ] },
    { id: 'mcpsec', title: `MCP xavfsizligi`, blocks: [
      { type: 'p', html: `MCP spetsifikatsiyasi vositalarni <b>ixtiyoriy kodni bajarish</b> deb hisoblaydi: har bir chaqiruvdan oldin foydalanuvchi roziligi kerak, vosita tavsiflari esa, ishonchli serverdan olinmagan bo‘lsa, ishonchsiz ma’lumot sifatida qaraladi.` },
      { type: 'cards', items: [
        { tag: `Tool poisoning`, title: `Tavsifdagi yashirin buyruq`, html: `Vosita tavsifiga modelga ko‘rinadigan, lekin foydalanuvchiga ko‘rinmaydigan ko‘rsatma yashiriladi, masalan: “maxfiy faylni ham o‘qib yubor” (Invariant Labs, 2025).` },
        { tag: `Rug pull`, title: `Keyin o‘zgargan server`, html: `Avval xavfsiz ko‘ringan server keyinchalik vositalarini o‘zgartiradi.` },
        { tag: `Prompt injection`, title: `Natija ichidagi buyruq`, html: `Vosita qaytargan matn (veb-sahifa, xat) ichida modelga buyruq bo‘lishi mumkin.` }
      ] },
      { type: 'note', tone: 'key', html: `Qoida: faqat ishonchli manbadan server o‘rnating, minimal ruxsat bering va har bir xavfli harakatni tasdiqlang. Batafsil — 11-bob (Xavfsizlik).` }
    ] },
    { id: 'multi', title: `Multi-agent: qachon foyda, qachon zarar`, blocks: [
      { type: 'p', html: `Anthropic o‘zining tadqiqot tizimida (2025-yil iyun) bosh agent (Claude Opus 4) bir nechta yordamchi agentni (Claude Sonnet 4) parallel ishga tushirgan.` },
      { type: 'stats', items: [
        { value: `+90.2%`, label: `bitta Opus 4 agentiga nisbatan — Anthropic’ning ichki tadqiqot testida` },
        { value: `~15×`, label: `multi-agent tizim oddiy chatga qaraganda shuncha ko‘p token sarflaydi` },
        { value: `80%`, label: `BrowseComp’da natija farqining shuncha qismini faqat token sarfi tushuntiradi` }
      ], caption: `Manba: Anthropic, “How we built our multi-agent research system”, 2025.` },
      { type: 'p', html: `Shu maqolaning o‘zi ogohlantiradi: agentlar bitta umumiy kontekstga muhtoj bo‘lsa yoki bir-biriga qattiq bog‘liq bo‘lsa, multi-agent yaxshi ishlamaydi; dasturlash vazifalarida parallel qism tadqiqotdagidan kamroq.` },
      { type: 'note', tone: 'info', title: `Qarama-qarshi fikr`, html: `Cognition (Walden Yan, “Don’t Build Multi-Agents”, 2025): agentlar to‘liq kontekst va harakatlar tarixini bo‘lishishi kerak, chunki har bir harakat yashirin qarorlarni o‘z ichiga oladi; ziddiyatli qarorlar yomon natija beradi. Ular bitta ketma-ket agent va tarixni siqishni tavsiya qiladi.` },
      { type: 'p', html: `Xulosa: keng, parallel bo‘linadigan vazifalarda (tadqiqot, ko‘p manbali qidiruv) multi-agent foyda beradi va qimmat turadi. Bir-biriga bog‘liq qadamlarda (ko‘p kod vazifalari) bitta agent ko‘pincha yaxshiroq.` }
    ] },
    { id: 'reliability', title: `Ishonchlilik: xatolar ko‘payadi`, blocks: [
      { type: 'p', html: `Agar har bir qadam 95% ehtimol bilan to‘g‘ri bo‘lsa, 10 qadamdan keyin butun vazifa faqat ~60% ehtimol bilan to‘g‘ri tugaydi. Bu soddalashtirilgan hisob (qadamlar mustaqil deb olinadi), lekin muammoni yaxshi ko‘rsatadi.` },
      { type: 'table', head: [`Bir qadam aniqligi`, `5 qadam`, `10 qadam`, `20 qadam`], num: [1, 2, 3], rows: [
        [`99%`, `95.1%`, `90.4%`, `81.8%`],
        [`95%`, `77.4%`, `59.9%`, `35.8%`],
        [`90%`, `59.0%`, `34.9%`, `12.2%`]
      ], caption: `Hisob: aniqlik^qadamlar soni.` },
      { type: 'list', items: [
        `<b>Limitlar:</b> maksimal turn soni va maksimal xarajat (masalan, Claude Agent SDK’da max_turns va max_budget_usd — standart holatda cheklanmagan).`,
        `<b>Inson nazorati:</b> xavfli harakatlar (to‘lov, o‘chirish, xat yuborish) oldidan tasdiqlash.`,
        `<b>Guardrails:</b> kirish va chiqishni tekshiruvchi qoidalar.`,
        `<b>Kuzatuv:</b> har bir qadamni log qilish (10-bob).`
      ] }
    ] },
    { id: 'frameworks', title: `Frameworklar va protokollar`, blocks: [
      { type: 'table', head: [`Vosita`, `Tillar`, `Nimasi bilan kuchli`], rows: [
        [`<b>Claude Agent SDK</b>`, `Python, TypeScript`, `Claude Code’ning sikli: tayyor vositalar, hooks, sub-agentlar, MCP, ruxsatlar. 2025-yil sentyabrda Claude Code SDK’dan qayta nomlangan`],
        [`<b>OpenAI Agents SDK</b>`, `Python, TypeScript`, `Agentlar, handoff, guardrails, tracing, sessiyalar. Swarm’ning davomchisi`],
        [`<b>Google ADK</b>`, `Python, TypeScript, Go, Java, Kotlin`, `Sequential, Parallel, Loop agentlar; ADK 2.0 da graf workflow; A2A qo‘llaydi; deyarli istalgan model bilan`],
        [`<b>LangChain / LangGraph</b>`, `Python, JavaScript`, `1.0 versiya (2025-yil oktabr). LangGraph — uzoq ishlaydigan, holatli agentlar uchun past darajali orkestratsiya`],
        [`<b>LlamaIndex</b>`, `Python, TypeScript`, `FunctionAgent, ReActAgent, AgentWorkflow; hujjatlar bilan ishlash (RAG) kuchli`]
      ], caption: `2026-yil noyabr holatiga.` },
      { type: 'note', tone: 'warn', html: `OpenAI <b>Agent Builder</b> va Evals 2026-yil 30-noyabrda yopiladi (ChatKit qoladi), Assistants API esa 2026-yil avgustda yopilgan. Eski darsliklarda ular hali ham uchraydi.` },
      { type: 'p', html: `<b>A2A (Agent2Agent)</b> — agentlarning bir-biri bilan gaplashishi uchun protokol (Google, 2025). v1.0 2026-yil martda chiqqan, avgustdan AAIF tarkibida. Rasmiy ta’rif: MCP agentni vositalar va ma’lumotlarga ulaydi, A2A esa boshqa agentlarga — ular bir-birini to‘ldiradi.` }
    ] },
    { id: 'bench', title: `Agentlar qanday o‘lchanadi`, blocks: [
      { type: 'list', items: [
        `<b>SWE-bench Verified</b> — haqiqiy GitHub muammolarini tuzatish (500 ta vazifa). 2026-yilga kelib eng yaxshi natijalar ~97% ga yetdi; benchmark “to‘yingan” — eng kuchli modellarni endi ajrata olmaydi.`,
        `<b>OSWorld</b> — kompyuterni boshqarish (369 vazifa). Odamlar 72.36% bajaradi; asl maqoladagi eng yaxshi model 12.24% bajargan edi.`,
        `<b>τ-bench</b> — mijoz xizmati kabi suhbatda vositalardan foydalanish; bir vazifani k marta ketma-ket to‘g‘ri bajarish (pass^k) o‘lchanadi.`
      ] },
      { type: 'note', tone: 'info', html: `Benchmark natijasini o‘qiganda doim sana, versiya va ishlatilgan “harness”ni (agent dasturini) tekshiring — bir xil model turli harness’da turlicha natija beradi.` }
    ] }
  ],
  mistakes: [
    [`“Model funksiyani o‘zi bajaradi”`, `Client vositalarni ilova bajaradi; model faqat chaqiruvni so‘raydi.`],
    [`“Har vazifaga agent kerak”`, `Ko‘pincha oddiy workflow arzonroq va ishonchliroq.`],
    [`“Multi-agent har doim yaxshiroq”`, `~15× ko‘p token sarflaydi va bog‘liq vazifalarda yomonlashtirishi mumkin.`],
    [`“MCP’da initialize va sessiya bor”`, `2026-07-28 versiyasida ular olib tashlangan; MCP stateless.`],
    [`“MCP — Anthropic’ning mahsuloti”`, `2025-yil dekabrdan Linux Foundation tarkibidagi AAIF’da.`],
    [`“A2A MCP’ning o‘rnini bosadi”`, `Ular bir-birini to‘ldiradi: MCP — vositalarga, A2A — agentlarga.`],
    [`“MCP server o‘rnatish xavfsiz”`, `Vosita — ixtiyoriy kod. Faqat ishonchli serverlar, minimal ruxsat.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. Tool calling qanday ko‘rinadi (soddalashtirilgan misol).</b> Modelga bitta vosita berilgan: <code>murojaat_holati(raqam)</code>.` },
    { type: 'table', head: [`Qadam`, `Nima bo‘ladi`], rows: [
      [`1. “12345-murojaatim qay holatda?”`, `Model matn yozmaydi, faqat so‘raydi: <code>murojaat_holati({"raqam": "12345"})</code>`],
      [`2. Ilova natija qaytaradi`, `<code>{"holat": "yo‘lda", "kutilgan_sana": "14-noyabr"}</code>`],
      [`3. Model javobi`, `“Murojaatingiz ishlanmoqda, ertaga hal qilinadi.”`],
      [`Oddiy salomlashuv`, `Vosita kerak emas — model oddiy javob beradi`]
    ] },
    { type: 'p', html: `Buni o‘zingiz ham ko‘rishingiz mumkin: Ollama yoki istalgan API’da modelga bitta vosita bering va javobdagi vosita chaqiruvini kuzating.` },
    { type: 'p', html: `<b>B. MCP serverni ulang (kodsiz).</b> Variantlardan birini tanlang:` },
    { type: 'steps', items: [
      `<b>Claude Desktop:</b> Settings → Desktop app → Extensions yonidagi “Manage” → “Browse extensions” → kerakli kengaytmani tanlab “Install”. Chat oynasidagi “+” → Connectors orqali yoqilganini tekshiring.`,
      `<b>Masofaviy server:</b> Customize → Connectors → “+ Add” → “Add custom connector”, nom va URL kiriting. Bepul tarifda faqat bitta custom connector qo‘shish mumkin; server internetdan ochiq bo‘lishi (yoki MCP tunnel orqali ulanishi) kerak.`,
      `<b>Claude Code:</b> terminalda serverni qo‘shing, sessiya ichida <code>/mcp</code> bilan holatini ko‘ring.`,
      `Ulangan serverga oddiy vazifa bering va kuzating: model qaysi vositani, qanday argumentlar bilan chaqirdi? Har bir chaqiruvdan oldin ruxsat so‘raldimi?`
    ] },
    { type: 'term', lines: [
      `$ claude mcp add --transport http notion https://mcp.notion.com/mcp`,
      `$ claude mcp list`
    ] }
  ],
  quiz: [
    { q: `Tool calling’da funksiyani kim bajaradi (client tool bo‘lsa)?`, options: [`Model o‘zi`, `Sizning ilovangiz`, `MCP host avtomatik`], answer: 1, explain: `Model faqat nom va argumentlarni so‘raydi. Ilova bajaradi va natijani tool_result (yoki function_call_output) sifatida qaytaradi.` },
    { q: `Workflow va agentning asosiy farqi nima?`, options: [`Workflow’da vosita bo‘lmaydi`, `Workflow’da yo‘l kodda oldindan yozilgan, agentda yo‘lni model tanlaydi`, `Agent faqat bitta modeldan foydalanadi`], answer: 1, explain: `Anthropic ta’rifi: workflow — oldindan belgilangan kod yo‘llari; agent — LLM o‘z jarayoni va vositalarini dinamik boshqaradi.` },
    { q: `Har qadam 95% to‘g‘ri bo‘lsa, 10 qadamli vazifa taxminan qancha ehtimol bilan to‘liq to‘g‘ri tugaydi?`, options: [`95%`, `~60%`, `~10%`], answer: 1, explain: `0.95^10 ≈ 0.599, ya’ni ~60%.` },
    { q: `MCP’ning joriy (2026-07-28) versiyasida nima o‘zgardi?`, options: [`MCP stateless bo‘ldi, initialize va sessiyalar olib tashlandi`, `MCP faqat stdio bilan ishlaydigan bo‘ldi`, `OAuth majburiy bo‘ldi`], answer: 0, explain: `Har so‘rov versiya va imkoniyatlarni o‘zi olib yuradi. Avtorizatsiya hamon ixtiyoriy, Streamable HTTP ham saqlangan.` },
    { q: `Anthropic multi-agent tizimi oddiy chatga qaraganda taxminan qancha ko‘p token sarflaydi?`, options: [`~2×`, `~4×`, `~15×`], answer: 2, explain: `Bitta agent ~4×, multi-agent tizim ~15× (Anthropic, 2025).` }
  ],
  summary: [
    `Tool calling’da model faqat so‘raydi, ilova bajaradi. Agent — shu jarayonning vazifa tugaguncha takrorlanadigan sikli.`,
    `Oddiy workflow’dan boshlang. Agent va multi-agent qimmat; ular faqat natija yaxshilansa o‘zini oqlaydi.`,
    `MCP — vositalar uchun ochiq standart (joriy versiya 2026-07-28). Vosita — ixtiyoriy kod, shuning uchun ishonch va ruxsat muhim.`
  ],
  glossary: [
    [`Agent`, `O‘z qadamlari va vositalarini dinamik tanlaydigan LLM tizimi.`],
    [`Workflow`, `LLM va vositalar oldindan yozilgan kod yo‘llari bo‘yicha ishlaydigan tizim.`],
    [`Tool / function calling`, `Model vosita chaqiruvini so‘raydi, ilova bajaradi va natijani qaytaradi.`],
    [`Turn`, `Agent siklining bitta aylanishi.`],
    [`ReAct`, `Fikrlash va harakatni almashtirib bajarish usuli (2022).`],
    [`MCP`, `Model Context Protocol — AI ilovalarni vositalar va ma’lumotlarga ulash standarti.`],
    [`Host / client / server`, `MCP rollari: AI ilova, undagi ulagich, vositalarni beruvchi xizmat.`],
    [`Tool poisoning`, `Vosita tavsifiga yashirin zararli ko‘rsatma joylash hujumi.`],
    [`A2A`, `Agentlar orasidagi aloqa protokoli.`],
    [`Harness`, `Modelni agent sifatida ishlatadigan dastur (sikl, vositalar, qoidalar).`]
  ],
  sources: [
    { label: `Anthropic — Building effective agents (2024)`, url: `https://www.anthropic.com/engineering/building-effective-agents` },
    { label: `Anthropic — Tool use overview`, url: `https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview` },
    { label: `Claude Agent SDK — Agent loop`, url: `https://code.claude.com/docs/en/agent-sdk/agent-loop` },
    { label: `OpenAI — Function calling`, url: `https://developers.openai.com/api/docs/guides/function-calling` },
    { label: `Google — Function calling`, url: `https://aistudio.google.com/docs/function-calling` },
    { label: `Yao va b., 2022 — ReAct`, url: `https://arxiv.org/abs/2210.03629` },
    { label: `Anthropic — Introducing MCP (2024)`, url: `https://www.anthropic.com/news/model-context-protocol` },
    { label: `MCP spetsifikatsiyasi (joriy)`, url: `https://modelcontextprotocol.io/specification/latest` },
    { label: `MCP 2026-07-28 changelog`, url: `https://modelcontextprotocol.io/specification/2026-07-28/changelog` },
    { label: `MCP — Security best practices`, url: `https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices` },
    { label: `Anthropic — MCP’ni AAIF’ga topshirish`, url: `https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation` },
    { label: `Invariant Labs — Tool poisoning`, url: `https://invariantlabs.ai/blog/mcp-security-notification` },
    { label: `Anthropic — Multi-agent research system (2025)`, url: `https://www.anthropic.com/engineering/multi-agent-research-system` },
    { label: `Cognition — Don’t Build Multi-Agents (2025)`, url: `https://cognition.com/blog/dont-build-multi-agents` },
    { label: `Claude Agent SDK — Overview`, url: `https://code.claude.com/docs/en/agent-sdk/overview` },
    { label: `OpenAI Agents SDK`, url: `https://openai.github.io/openai-agents-python/` },
    { label: `OpenAI — Deprecations`, url: `https://developers.openai.com/api/docs/deprecations` },
    { label: `Google ADK`, url: `https://adk.dev/` },
    { label: `LangChain & LangGraph 1.0`, url: `https://blog.langchain.com/langchain-langgraph-1dot0` },
    { label: `LlamaIndex — Agents`, url: `https://developers.llamaindex.ai/python/framework/understanding/agent/` },
    { label: `A2A protocol`, url: `https://a2a-protocol.org/latest/` },
    { label: `Claude Desktop — Local MCP servers`, url: `https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop` },
    { label: `Claude Code — MCP`, url: `https://code.claude.com/docs/en/mcp` },
    { label: `Vals.ai — SWE-bench Verified (arxivlangan)`, url: `https://www.vals.ai/benchmarks` },
    { label: `Xie va b., 2024 — OSWorld`, url: `https://arxiv.org/abs/2404.07972` },
    { label: `Yao va b., 2024 — τ-bench`, url: `https://arxiv.org/abs/2406.12045` }
  ]
};
