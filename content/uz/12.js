window.BOOK.content.uz['12'] = {
  lead: `AI kod yordamchilari avtomatik to‘ldirishdan to‘liq agentlarga aylandi: ular kodni o‘qiydi, reja tuzadi, fayllarni o‘zgartiradi, testlarni ishga tushiradi. Bu bobda asosiy vositalarni, ular qanday ishlashini, tadqiqotlar unumdorlik haqida aslida nima deyishini va xavfsiz hamda samarali ishlash qoidalarini o‘rganasiz. Kitobdagi deyarli barcha mavzular shu yerda birlashadi.`,
  minutes: 40,
  tags: [`Amaliyot: Claude Code yoki Codex`],
  goals: [
    `Asosiy vositalar: Claude Code, Codex, Cursor, Devin Desktop (sobiq Windsurf) va boshqalar`,
    `Kod agenti qanday ishlaydi va uni qanday boshqarish kerak`,
    `Tadqiqotlar unumdorlik haqida nima deydi`,
    `Yaxshi amaliyotlar va xavfsizlik`
  ],
  sections: [
    { id: 'tools', title: `Asosiy vositalar (2026-yil noyabr)`, blocks: [
      { type: 'table', head: [`Vosita`, `Kim`, `Qayerda ishlaydi`], rows: [
        [`<b>Claude Code</b>`, `Anthropic`, `Terminal, veb, desktop ilova, VS Code, JetBrains, Slack, GitHub Actions va GitLab CI`],
        [`<b>Codex</b>`, `OpenAI`, `Codex CLI (ochiq kod, Apache 2.0), bulut va IDE; ChatGPT hisobi bilan`],
        [`<b>Cursor</b>`, `Anysphere`, `AI’ga moslashtirilgan kod muharriri: agent rejimi, o‘z Composer modellari`],
        [`<b>Devin Desktop</b>`, `Cognition`, `Sobiq Windsurf — 2026-yil iyunda qayta nomlangan; Cascade o‘rniga Devin Local`],
        [`<b>GitHub Copilot</b>`, `GitHub`, `IDE ichida va bulutdagi agent (cloud sandbox yoki GitHub Actions muhitida; pullik tariflarda)`],
        [`<b>Gemini CLI</b>`, `Google`, `Ochiq kod (Apache 2.0); bepul individual foydalanish 2026-yil iyunda Antigravity CLI’ga o‘tkazilgan`]
      ], caption: `Bu bozor juda tez o‘zgaradi: nomlar, tariflar va egalar oylar ichida almashadi. Tanlashdan oldin rasmiy sahifani tekshiring.` }
    ] },
    { id: 'how', title: `Kod agenti qanday ishlaydi`, blocks: [
      { type: 'p', html: `Kod agenti — 7-bobdagi agent siklining amaliy ko‘rinishi. Uning vositalari: fayllarni o‘qish va qidirish (just-in-time, 4-bob), fayllarni tahrirlash, terminal buyruqlari, testlarni ishga tushirish, ba’zan brauzer va MCP serverlar.` },
      { type: 'flow', items: [
        { title: `Vazifa`, text: `“Login sahifasiga validatsiya qo‘sh”` },
        { title: `O‘rganish`, text: `Kerakli fayllarni topadi va o‘qiydi` },
        { title: `Reja`, text: `Nimani o‘zgartirishini tushuntiradi` },
        { title: `O‘zgartirish`, text: `Fayllarni tahrirlaydi` },
        { title: `Tekshirish`, text: `Testlarni ishga tushiradi, xatoni tuzatadi` }
      ] },
      { type: 'table', head: [`Claude Code imkoniyati`, `Nima uchun`], rows: [
        [`<b>CLAUDE.md</b>`, `Loyiha qoidalari: buyruqlar, uslub, arxitektura. Har sessiya boshida o‘qiladi (tavsiya: 200 qatordan kam)`],
        [`<b>Plan mode</b>`, `Agent o‘rganadi va reja taklif qiladi, lekin hech narsani o‘zgartirmaydi`],
        [`<b>Sub-agentlar</b>`, `Alohida kontekstda ishlaydigan yordamchilar (4, 7-boblar)`],
        [`<b>Hooks</b>`, `Belgilangan hodisalarda (masalan, vosita chaqiruvidan oldin yoki keyin) avtomatik ishlaydigan skriptlar — qoidani <b>majburiy</b> qiladi`],
        [`<b>Skills, MCP, plugins</b>`, `Qo‘shimcha bilim va vositalarni ulash`]
      ] },
      { type: 'note', tone: 'key', html: `Muhim farq: CLAUDE.md’dagi qoida — modelga <b>iltimos</b>, u buni unutishi mumkin. Hook esa — <b>majburiyat</b>: masalan, PreToolUse hook <code>.env</code> faylini tahrirlashni texnik jihatdan bloklaydi.` }
    ] },
    { id: 'permissions', title: `Ruxsat rejimlari`, blocks: [
      { type: 'table', head: [`Rejim`, `Nima qiladi`], rows: [
        [`<code>default</code>`, `Har tahrir va buyruqdan oldin so‘raydi`],
        [`<code>acceptEdits</code>`, `Fayl tahrirlari va oddiy fayl buyruqlarini so‘ramasdan bajaradi`],
        [`<code>plan</code>`, `Faqat o‘rganadi va reja taklif qiladi`],
        [`<code>auto</code>`, `Siz o‘rningizga alohida klassifikator model harakatlarni tekshiradi`],
        [`<code>dontAsk</code>`, `Ruxsat so‘ralishi kerak bo‘lgan har qanday harakat rad etiladi`],
        [`<code>bypassPermissions</code>`, `Hech narsa so‘ramaydi — faqat izolyatsiyalangan konteyner yoki virtual mashinada`]
      ], caption: `Claude Code. Plan rejimiga Shift+Tab, <code>/plan</code> yoki <code>claude --permission-mode plan</code> bilan o‘tiladi. Codex’da shunga o‘xshash sozlamalar <code>/permissions</code> orqali.` },
      { type: 'note', tone: 'warn', html: `<code>bypassPermissions</code>’ni asosiy kompyuteringizda ishlatmang. Agent repo’dagi yoki veb-sahifadagi prompt injection (11-bob) orqali xavfli buyruq bajarishi mumkin. Sandbox’ni (11-bob) yoqing.` }
    ] },
    { id: 'research', title: `Unumdorlik: tadqiqotlar nima deydi`, blocks: [
      { type: 'p', html: `METR’ning randomizatsiyalangan tajribasi (2025-yil iyul): 16 ta tajribali ochiq kod dasturchisi o‘z loyihalaridagi 246 ta vazifani bajargan; har bir vazifa tasodifiy ravishda “AI ruxsat” yoki “AI taqiqlangan” guruhiga ajratilgan (AI asosan Cursor Pro + Claude 3.5/3.7 Sonnet).` },
      { type: 'stats', items: [
        { value: `+19%`, label: `AI bilan vazifalar shuncha <b>uzoqroq</b> davom etgan` },
        { value: `24%`, label: `dasturchilar oldindan vaqt shuncha qisqarishini kutgan` },
        { value: `20%`, label: `tajribadan keyin ham o‘zlarini shuncha tezroq ishlagan deb hisoblashgan` }
      ], caption: `Manba: METR, 2025-07-10.` },
      { type: 'p', html: `METR 2026-yil fevraldagi yangilanishida yangi ma’lumotlar AI bilan tezlashish tomonga siljiganini ko‘rsatdi (qaytgan dasturchilarda vaqt −18%, ishonch oralig‘i −38% dan +9% gacha). Lekin METR o‘zi buni “juda zaif dalil” deb atadi: ko‘p dasturchilar AI’siz ishlashdan bosh tortgan, bu tanlovni buzadi va METR fikricha haqiqiy tezlashish bahosini pasaytiradi. Boshqa tadqiqotlar: GitHub Copilot laboratoriya tajribasida bitta JavaScript vazifasi 55.8% tezroq bajarilgan (Peng va b., 2023); Google’ning 96 muhandisdagi tajribasida ~21% tezlashish, keng ishonch oralig‘i bilan.` },
      { type: 'note', tone: 'key', html: `Xulosa: “AI meni tezlashtirdi” degan his ishonchli o‘lchov emas — METR’da u natijaga teskari bo‘lgan. Foyda vazifa turi, loyiha va tajribaga bog‘liq. O‘z ishingizda o‘lchang (9-bob).` }
    ] },
    { id: 'vibe', title: `Vibe coding va muhandislik`, blocks: [
      { type: 'p', html: `Andrej Karpathy 2025-yil fevralda <b>“vibe coding”</b> atamasini kiritgan: kodni o‘qimasdan, faqat natijaga qarab AI bilan dastur yozish. Bu tajriba va bir martalik prototiplar uchun qulay. Lekin uzoq yashaydigan, boshqalar ishlatadigan yoki xavfsizlik muhim bo‘lgan kod uchun xavfli.` },
      { type: 'cards', items: [
        { tag: `Vibe coding`, title: `Prototip`, html: `Kodni o‘qimaysiz, faqat ishlashini tekshirasiz. Tez, lekin texnik qarz va xavfsizlik teshiklari to‘planadi.` },
        { tag: `Agent bilan muhandislik`, title: `Mahsulot`, html: `Reja, kichik o‘zgarishlar, testlar, har bir diff’ni ko‘rib chiqish. Javobgarlik sizda qoladi.` }
      ] }
    ] },
    { id: 'practice', title: `Yaxshi amaliyotlar`, blocks: [
      { type: 'steps', items: [
        `<b>Avval reja:</b> plan mode’da agent kodni o‘rgansin va reja taklif qilsin; rejani o‘qib, tuzatib, keyin ruxsat bering.`,
        `<b>Kichik qadamlar:</b> bitta vazifa — bitta kichik o‘zgarish. Katta diff’ni ko‘rib chiqish qiyin.`,
        `<b>Testlar — to‘siq:</b> avval test yozdiring yoki mavjud testlarni ishga tushirtiring. Test o‘tmasa — tayyor emas.`,
        `<b>Har bir diff’ni o‘qing:</b> siz qabul qilgan kod — sizning kodingiz.`,
        `<b>Loyiha xotirasi:</b> CLAUDE.md yoki AGENTS.md’da buyruqlar, uslub va “nima qilmaslik” qoidalari (4-bob).`,
        `<b>Kontekstni boshqaring:</b> uzun sessiya buziladi — yangi vazifa uchun yangi sessiya, kerak bo‘lsa xulosa bilan.`,
        `<b>Xavfsizlik:</b> sirlarni agentga ko‘rsatmang, sandbox’ni yoqing, xavfli rejimlarni faqat izolyatsiyada ishlating.`
      ] }
    ] },
    { id: 'bench', title: `Kod benchmarklari`, blocks: [
      { type: 'list', items: [
        `<b>SWE-bench Verified</b> to‘yingan: eng yuqori natijalar ~97% ga yetgan va eng kuchli modellarni farqlamaydi. OpenAI 2026-yil fevraldan uni o‘z natijalarida keltirmay qo‘ygan.`,
        `<b>Terminal-Bench</b> — terminaldagi agent vazifalari. Joriy versiya 4.1 (2026-yil noyabr); turli versiyalar natijalarini solishtirib bo‘lmaydi.`
      ] },
      { type: 'note', tone: 'info', html: `Kod vositasini tanlashda eng yaxshi benchmark — o‘z repo’ngizdagi 5–10 ta haqiqiy vazifa. Bir xil vazifani ikki vositada bajaring va natija, vaqt hamda narxni solishtiring.` }
    ] },
    { id: 'together', title: `Kitob yakuni: hammasi birga`, blocks: [
      { type: 'p', html: `Kod agenti bilan ishlaganda kitobdagi deyarli barcha mavzular birlashadi:` },
      { type: 'table', head: [`Bob`, `Kod agentida qayerda`], rows: [
        [`1–2. Asoslar, modellar`, `Qaysi model, qancha token va pul; reasoning effort`],
        [`3. Prompt`, `Vazifani aniq yozish, misollar, kutilgan format`],
        [`4. Context`, `CLAUDE.md, just-in-time qidiruv, compaction, sub-agentlar`],
        [`5–6. Embedding, RAG`, `Katta kod bazasida qidiruv va hujjatlar`],
        [`7. Agentlar`, `Vositalar sikli, MCP, ruxsatlar`],
        [`9. Eval`, `Testlar va o‘lchov — “his”ga emas, natijaga ishonish`],
        [`10–11. Production, xavfsizlik`, `Xarajat, versiyalar, sandbox, prompt injection`]
      ] }
    ] }
  ],
  mistakes: [
    [`“AI bilan doim tezroq ishlayman”`, `METR tajribasida dasturchilar o‘zini 20% tezroq deb o‘ylagan, aslida 19% sekinroq ishlagan.`],
    [`“CLAUDE.md’dagi qoida bajarilishi kafolatlangan”`, `Bu iltimos. Majburiy qoida uchun hook ishlating.`],
    [`“bypassPermissions — qulay rejim”`, `Faqat izolyatsiyalangan konteyner yoki VM’da.`],
    [`“Agent yozgan kodni o‘qish shart emas”`, `Prototipda mumkin; mahsulotda har bir diff’ni ko‘rib chiqing.`],
    [`“Windsurf / Cascade — joriy nomlar”`, `2026-yil iyundan Devin Desktop / Devin Local.`],
    [`“SWE-bench Verified’dagi 1-o‘rin — eng yaxshi kod modeli”`, `Benchmark to‘yingan; o‘z vazifalaringizda sinang.`]
  ],
  lab: [
    { type: 'p', html: `Kod agenti bilan birinchi ish — reja rejimida, xavfsiz. Rasmiy hujjatlardagi o‘rnatish buyruqlari:` },
    { type: 'term', lines: [
      `# Claude Code (macOS, Linux, WSL)`,
      `$ curl -fsSL https://claude.ai/install.sh | bash`,
      `$ claude --version`,
      `# yoki OpenAI Codex CLI`,
      `$ npm install -g @openai/codex`
    ] },
    { type: 'steps', items: [
      `Kichik namuna loyihani oling (yoki o‘zingizning testlari bor loyihangizni) va papkasiga o‘ting.`,
      `Claude Code’ni reja rejimida ishga tushiring: <code>claude --permission-mode plan</code>.`,
      `Vazifa bering: “X funksiyasiga kiritmani tekshirish qo‘sh. Reja va testlarni taklif qil.”`,
      `Rejani o‘qing: qaysi fayllar o‘zgaradi, qanday testlar qo‘shiladi? Kerak bo‘lsa tuzating.`,
      `Claude rejani tasdiqlashni so‘raganda uni tasdiqlang (yoki Shift+Tab bilan rejimni almashtiring). Testlarni ishga tushirtiring va diff’ni o‘qing.`,
      `Agent nechta fayl o‘qidi, qancha vaqt va (API bo‘lsa) qancha pul ketdi — yozib qo‘ying.`
    ] },
    { type: 'note', tone: 'info', html: `Windows uchun Claude Code: PowerShell’da <code>irm https://claude.ai/install.ps1 | iex</code>. Ishlatish uchun Claude obunasi yoki API hisobi kerak. Codex uchun ChatGPT hisobi bilan kiriladi.` }
  ],
  quiz: [
    { q: `METR tajribasida (2025) AI vositalari tajribali dasturchilarga qanday ta’sir qilgan?`, options: [`Vazifalar 19% tezroq bajarilgan`, `Vazifalar 19% uzoqroq davom etgan, dasturchilar esa o‘zini tezroq deb hisoblagan`, `Hech qanday farq bo‘lmagan`], answer: 1, explain: `Dasturchilar 20% tezlashganmiz deb o‘ylagan, o‘lchov esa 19% sekinlashishni ko‘rsatgan.` },
    { q: `CLAUDE.md va hook farqi nima?`, options: [`Farqi yo‘q`, `CLAUDE.md — modelga iltimos, hook — texnik jihatdan majburiy qoida`, `Hook faqat dizayn uchun`], answer: 1, explain: `Masalan, PreToolUse hook .env faylini tahrirlashni bloklay oladi; CLAUDE.md’dagi qoida esa unutilishi mumkin.` },
    { q: `Plan mode’da agent nima qiladi?`, options: [`Fayllarni tezroq tahrirlaydi`, `O‘rganadi va reja taklif qiladi, hech narsani o‘zgartirmaydi`, `Barcha ruxsatlarni o‘chiradi`], answer: 1, explain: `Reja rejimi — o‘zgarishdan oldin rejani ko‘rib chiqish uchun.` },
    { q: `bypassPermissions rejimini qayerda ishlatish mumkin?`, options: [`Asosiy ish kompyuterida`, `Faqat izolyatsiyalangan konteyner yoki virtual mashinada`, `Hamma joyda, u xavfsiz`], answer: 1, explain: `Agent prompt injection orqali xavfli buyruq bajarishi mumkin; izolyatsiya shart.` },
    { q: `Kod vositasini tanlashda eng ishonchli o‘lchov qaysi?`, options: [`SWE-bench Verified reytingi`, `O‘z repo’ngizdagi bir nechta haqiqiy vazifada solishtirish`, `Reklama va sharhlar`], answer: 1, explain: `SWE-bench Verified to‘yingan; o‘z vazifalaringiz — eng to‘g‘ri eval.` }
  ],
  summary: [
    `Kod agentlari — kitobdagi barcha g‘oyalarning amaliy birikmasi: model, prompt, kontekst, vositalar, eval va xavfsizlik.`,
    `Reja → kichik o‘zgarish → testlar → diff’ni o‘qish. Majburiy qoidalar uchun hooks, xavfli ishlar uchun sandbox.`,
    `Unumdorlik haqidagi his aldamchi bo‘lishi mumkin — o‘z ishingizda o‘lchang.`
  ],
  glossary: [
    [`Kod agenti`, `Kodni o‘qiydigan, o‘zgartiradigan va buyruqlar bajaradigan AI agent.`],
    [`Plan mode`, `Agent faqat o‘rganib reja taklif qiladigan rejim.`],
    [`Hook`, `Agent harakatidan oldin yoki keyin avtomatik ishlaydigan skript.`],
    [`CLAUDE.md / AGENTS.md`, `Loyiha qoidalari va ko‘rsatmalari fayli.`],
    [`Diff`, `Kodga kiritilgan o‘zgarishlar ro‘yxati.`],
    [`Vibe coding`, `Kodni o‘qimasdan, natijaga qarab AI bilan dasturlash.`],
    [`Permission mode`, `Agent qaysi harakatlarni so‘ramasdan bajarishi mumkinligi.`]
  ],
  sources: [
    { label: `Claude Code — Quickstart`, url: `https://code.claude.com/docs/en/quickstart` },
    { label: `Claude Code — Features overview`, url: `https://code.claude.com/docs/en/features-overview` },
    { label: `Claude Code — Permission modes`, url: `https://code.claude.com/docs/en/permission-modes` },
    { label: `Claude Code — Memory (CLAUDE.md)`, url: `https://code.claude.com/docs/en/memory` },
    { label: `OpenAI Codex (GitHub)`, url: `https://github.com/openai/codex` },
    { label: `Cursor — Pricing`, url: `https://cursor.com/pricing` },
    { label: `Cognition — Windsurf is now Devin Desktop`, url: `https://devin.ai/blog/windsurf-is-now-devin-desktop` },
    { label: `GitHub — Copilot coding agent`, url: `https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent` },
    { label: `Gemini CLI`, url: `https://github.com/google-gemini/gemini-cli` },
    { label: `METR — AI va tajribali dasturchilar (2025)`, url: `https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/` },
    { label: `METR — Yangilanish (2026)`, url: `https://metr.org/blog/2026-02-24-uplift-update/` },
    { label: `Peng va b., 2023 — Copilot tajribasi`, url: `https://arxiv.org/abs/2302.06590` },
    { label: `Google — Enterprise RCT`, url: `https://arxiv.org/abs/2410.12944` },
    { label: `Terminal-Bench — News`, url: `https://www.tbench.ai/news` },
    { label: `Epoch AI — SWE-bench Verified review`, url: `https://epoch.ai/benchmarks/swe-bench-verified/review` }
  ]
};
