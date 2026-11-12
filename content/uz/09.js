window.BOOK.content.uz['09'] = {
  lead: `“Yangi prompt yaxshiroq ishlayapti shekilli” — bu o‘lchov emas. Eval (baholash) — AI tizim sifatini takrorlanadigan testlar bilan o‘lchash. Usiz har bir o‘zgarish tavakkal bo‘ladi. Bu bobda eval tushunchalarini, baholovchi turlarini, LLM-hakam va uning xatolarini, metrikalarni, qancha misol kerakligini va asosiy vositalarni o‘rganasiz.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: golden to‘plam`],
  goals: [
    `Eval tushunchalari: task, trial, grader, transcript, outcome`,
    `Kod, LLM va inson baholovchilari — qachon qaysi biri`,
    `LLM-hakamning xatolari va metrikalar (pass@k va pass^k)`,
    `Qancha misol kerak, regression test va vositalar`
  ],
  sections: [
    { id: 'why', title: `Nega eval kerak`, blocks: [
      { type: 'p', html: `AI tizimlarda kichik o‘zgarish (prompt, model versiyasi, chunking) kutilmagan joyda natijani buzishi mumkin. Eval bo‘lmasa, buni foydalanuvchilar sizdan oldin sezadi. Eval — AI tizimlar uchun unit test vazifasini bajaradi.` },
      { type: 'note', tone: 'key', html: `Anthropic tavsiyasi: boshlash uchun <b>haqiqiy xatolardan olingan 20–50 ta oddiy vazifa</b> yetarli. Mukammal test to‘plamini kutmang — kichigidan boshlang va xatolar topilgan sari to‘ldirib boring.` }
    ] },
    { id: 'terms', title: `Asosiy tushunchalar`, blocks: [
      { type: 'table', head: [`Atama`, `Ma’nosi`], rows: [
        [`<b>Task</b> (vazifa)`, `Kirish ma’lumoti va muvaffaqiyat mezoni bo‘lgan bitta test`],
        [`<b>Trial</b> (urinish)`, `Vazifani bir marta bajarish. Model har safar boshqacha javob berishi mumkin, shuning uchun bir necha trial kerak`],
        [`<b>Grader</b> (baholovchi)`, `Natijani baholaydigan mantiq: kod, model yoki inson`],
        [`<b>Transcript</b>`, `Urinishning to‘liq yozuvi: xabarlar, vosita chaqiruvlari, natijalar`],
        [`<b>Outcome</b> (natija)`, `Muhitning yakuniy holati — agent nima deganidan emas, haqiqatda nima bo‘lganidan baholanadi`]
      ], caption: `Manba: Anthropic, “Demystifying evals for AI agents”, 2026.` },
      { type: 'cards', items: [
        { tag: `Capability eval`, title: `Qobiliyat`, html: `Tizim hali yaxshi bajarmaydigan narsalar. Past natijadan boshlanadi va yaxshilanishni o‘lchaydi.` },
        { tag: `Regression eval`, title: `Buzilmaganlik`, html: `Tizim allaqachon yaxshi bajaradigan narsalar. Natija ~100% bo‘lishi kerak; pasaysa — nimadir buzildi.` }
      ] }
    ] },
    { id: 'graders', title: `Uch turdagi baholovchi`, blocks: [
      { type: 'table', head: [`Turi`, `Misol`, `Afzalligi`, `Kamchiligi`], rows: [
        [`<b>Kod</b>`, `Aniq moslik, regex, JSON sxema, unit test, raqamni solishtirish`, `Tez, arzon, takrorlanadi`, `Faqat aniq javobli vazifalar uchun`],
        [`<b>Model</b> (LLM-hakam)`, `“Javob savolga to‘liq javob beradimi? 1–5 baho”`, `Erkin matnni baholaydi, keng ko‘lamda`, `O‘z xatolari bor (pastda); kalibrlash kerak`],
        [`<b>Inson</b>`, `Mutaxassis yoki foydalanuvchi bahosi, juftlik solishtirish`, `Eng ishonchli`, `Sekin va qimmat`]
      ] },
      { type: 'p', html: `Amaliy usul: imkoni bo‘lsa — kod; erkin matn uchun — LLM-hakam; LLM-hakamni esa bir qism misollarda inson bahosi bilan tekshirish. Anthropic yana ikki narsani tavsiya qiladi: transcript’larni o‘zingiz o‘qing va yo‘lni emas, <b>natijani</b> baholang.` }
    ] },
    { id: 'judge', title: `LLM-hakam va uning xatolari`, blocks: [
      { type: 'p', html: `Zheng va b. (2023) GPT-4’ni hakam sifatida tekshirgan. Durangsiz holatlarda GPT-4 va odamlar 85% hollarda bir xil qaror qilgan, ikki odam esa bir-biri bilan 81% hollarda (durang bilan: 66% va 63%). Lekin muntazam xatolar ham topilgan:` },
      { type: 'table', head: [`Xato`, `Nima`, `Maqoladagi natija`], rows: [
        [`<b>Position bias</b>`, `Javoblar o‘rni almashsa, qaror o‘zgaradi`, `GPT-4 faqat 65% hollarda izchil (few-shot bilan 77.5%)`],
        [`<b>Verbosity bias</b>`, `Uzunroq javobni afzal ko‘rish`, `“Takroriy ro‘yxat” hujumiga Claude-v1 va GPT-3.5 91.3% hollarda aldangan, GPT-4 — 8.7%`],
        [`<b>Self-enhancement</b>`, `O‘z javobini afzal ko‘rish`, `GPT-4 ~10%, Claude-v1 ~25% ko‘proq o‘z javobini tanlagan`]
      ] },
      { type: 'note', tone: 'key', html: `Himoya: har juftlikni ikkala tartibda baholang; aniq mezon (rubrika) yozing; javob uzunligini nazorat qiling; boshqa provayderning modelini hakam qiling; va eng muhimi — hakam qarorlarini bir qism misollarda inson bahosi bilan solishtirib kalibrlang. G-Eval (Liu va b., 2023) kabi usullar hakamni CoT va to‘ldiriladigan shakl bilan yaxshilaydi.` }
    ] },
    { id: 'metrics', title: `Metrikalar`, blocks: [
      { type: 'list', items: [
        `<b>Accuracy</b> — to‘g‘ri javoblar ulushi. Tasniflashda <b>precision</b> (topilganlarning qanchasi to‘g‘ri), <b>recall</b> (to‘g‘rilarning qanchasi topildi) va ularning muvozanati <b>F1</b>.`,
        `<b>pass@k</b> — k urinishdan <b>kamida bittasi</b> to‘g‘ri bo‘lish ehtimoli (Chen va b., 2021, HumanEval). Codex 1 urinishda 28.8%, 100 urinishda 70.2% masalani yechgan. Kod generatsiyasi va “bir nechta variant beraman, foydalanuvchi tanlaydi” holatlari uchun.`,
        `<b>pass^k</b> — k urinishning <b>hammasi</b> to‘g‘ri bo‘lish ehtimoli (τ-bench, 2024). Ishonchlilikni o‘lchaydi: mijoz har safar to‘g‘ri javob kutadi.`,
        `<b>BLEU / ROUGE</b> — matn o‘xshashligi. BLEU tarjima tizimlarini diagnostika qilishda foydali, lekin alohida matnlar sifatini yoki tarjimadan tashqari vazifalarni baholash uchun ishonchli emas (Reiter, 2018); ROUGE’da ham shunga o‘xshash cheklovlar bor.`
      ] },
      { type: 'table', head: [`Bir urinish muvaffaqiyati 75% bo‘lsa`, `k = 3`], num: [1], rows: [
        [`pass@3 — kamida bittasi to‘g‘ri`, `98.4%`],
        [`pass^3 — uchalasi ham to‘g‘ri`, `42.2%`]
      ], caption: `Hisob: 1 − 0.25³ = 0.984; 0.75³ = 0.422. Bir xil model “deyarli doim yechadi” ham, “ko‘pincha xato qiladi” ham bo‘lib ko‘rinishi mumkin — qaysi metrika ekaniga qarang.` }
    ] },
    { id: 'rag', title: `RAG’ni baholash`, blocks: [
      { type: 'p', html: `RAG’da ikki qismni alohida o‘lchang (6-bob). Ragas kutubxonasidagi asosiy metrikalar:` },
      { type: 'table', head: [`Metrika`, `Nimani o‘lchaydi`], rows: [
        [`<b>Context precision</b>`, `Topilgan bo‘laklar ichida kerakli bo‘laklar yuqorida turibdimi`],
        [`<b>Context recall</b>`, `Javob uchun kerakli ma’lumotning qanchasi topildi (namuna javob kerak)`],
        [`<b>Faithfulness</b>`, `Javobdagi da’volarning qanchasi topilgan bo‘laklarga tayanadi (0–1)`],
        [`<b>Response relevancy</b>`, `Javob savolga qanchalik mos`]
      ] }
    ] },
    { id: 'samples', title: `Qancha misol kerak`, blocks: [
      { type: 'p', html: `Eval natijasi ham tasodifiy tebranadi. Anthropic (Miller, 2024) natijani <b>ishonch oralig‘i</b> bilan berishni tavsiya qiladi: 95% oraliq ≈ natija ± 1.96 × standart xato, bu yerda standart xato = √(p × (1 − p) / n).` },
      { type: 'table', head: [`Misollar soni`, `Natija 80% bo‘lsa, 95% oraliq`], rows: [
        [`n = 50`, `± 11.1 punkt (68.9% – 91.1%)`],
        [`n = 500`, `± 3.5 punkt (76.5% – 83.5%)`]
      ] },
      { type: 'note', tone: 'warn', html: `50 ta misolda prompt o‘zgargach natija 82% dan 85% ga chiqsa, bu <b>yaxshilanishning isboti emas</b>: farq oraliq ichida. Ikki variantni bir xil misollarda solishtiring (juft farq), misollarni ko‘paytiring yoki har vazifani bir necha marta ishlating.` }
    ] },
    { id: 'tools', title: `Regression test va vositalar`, blocks: [
      { type: 'flow', items: [
        { title: `Golden to‘plam`, text: `Kirish + kutilgan natija` },
        { title: `O‘zgarish`, text: `Prompt, model, sozlama` },
        { title: `Avtomatik eval`, text: `Har o‘zgarishda, CI’da` },
        { title: `Taqqoslash`, text: `Natija pasaysa — to‘xtatish` }
      ] },
      { type: 'table', head: [`Vosita`, `Litsenziya`, `Xususiyati`], rows: [
        [`<b>Promptfoo</b>`, `MIT`, `YAML konfiguratsiya, CLI va veb ko‘rinish. OpenAI tarkibiga o‘tgan, ochiq kodligicha qolgan`],
        [`<b>DeepEval</b>`, `Apache 2.0`, `Pytest’ga o‘xshash; G-Eval, faithfulness, answer relevancy metrikalari`],
        [`<b>Ragas</b>`, `Apache 2.0`, `RAG metrikalari`],
        [`<b>LangSmith</b>`, `Tijoriy`, `Offline (to‘plamda) va online (production trace’larda) eval, inson baholash navbatlari`],
        [`<b>Braintrust</b>`, `Tijoriy`, `Eval va kuzatuv platformasi`]
      ], caption: `2026-yil noyabr holatiga. OpenAI Evals platformasi 2026-yil 31-oktabrdan faqat o‘qish rejimida va 30-noyabrda yopiladi; OpenAI Promptfoo’ga ko‘chishni tavsiya qiladi (eval qo‘lda qayta yoziladi).` }
    ] },
    { id: 'bench', title: `Benchmarklar: to‘yinish va ifloslanish`, blocks: [
      { type: 'list', items: [
        `<b>To‘yinish:</b> MMLU kabi eski testlarda eng kuchli modellar deyarli maksimal natija oladi va farq ko‘rinmaydi. MMLU-Pro natijalarni MMLU’ga nisbatan 16–33% pasaytiradi.`,
        `<b>Yangi qiyin testlar:</b> Humanity’s Last Exam — 2 500 savol (Nature, 2026). ARC-AGI-2 da eng yuqori natija GPT-6 Astra — 95.0% (2026-09-02); ARC-AGI-3 Standard’da — Claude Fable 5.2, 81.2% (2026-11-09).`,
        `<b>Ifloslanish (contamination):</b> test savollari o‘qitish ma’lumotiga kirib qolsa, natija sun’iy oshadi.`
      ] },
      { type: 'note', tone: 'key', html: `Ommaviy benchmark — model tanlashda boshlang‘ich yo‘nalish. Sizning mahsulotingiz uchun yagona ishonchli o‘lchov — <b>o‘z vazifalaringizdan</b> tuzilgan eval. Reyting raqamlarini doim sana va sozlamalar (vositalar bilanmi yoki yo‘qmi) bilan birga keltiring.` }
    ] }
  ],
  mistakes: [
    [`“Ko‘zim bilan ko‘rdim — yaxshilandi”`, `5–10 ta misolda ko‘rinadigan farq ko‘pincha tasodif. Ishonch oralig‘ini hisoblang.`],
    [`“LLM-hakam odamlar bilan 85% mos keladi — demak ishonchli”`, `Bu durangsiz holatlar uchun; position, verbosity va self-enhancement xatolari bor. Kalibrlang.`],
    [`“pass@k ishonchlilikni o‘lchaydi”`, `pass@k k ortgan sari o‘sadi. Ishonchlilik — pass^k.`],
    [`“Benchmarkda 1-o‘rin — mening vazifamda ham eng yaxshi”`, `O‘z vazifangizda sinang; benchmark to‘yingan yoki ifloslangan bo‘lishi mumkin.`],
    [`“OpenAI Evals’da eval yuritaman”`, `2026-yil 30-noyabrda yopiladi.`],
    [`“Agent ‘bajardim’ dedi — demak bajardi”`, `Outcome’ni — muhitning haqiqiy holatini tekshiring.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. Jadvalda golden to‘plam (kodsiz).</b>` },
    { type: 'steps', items: [
      `Elektron jadval oching, ustunlar: kirish · kutilgan natija · model javobi · to‘g‘ri (1/0) · izoh.`,
      `O‘zingiz ishlatadigan vazifadan 30 ta haqiqiy misol yozing, iloji bo‘lsa, model avval xato qilgan holatlardan.`,
      `Ikki xil prompt yoki ikki modelning javoblarini qo‘ying va qo‘lda baholang.`,
      `Har biri uchun aniqlik va 95% oraliqni hisoblang: p ± 1.96 × √(p(1−p)/30). Farq oraliqdan kattami?`
    ] },
    { type: 'p', html: `<b>B. Hakam xatosini tekshiring.</b> Chat’da modelga ikkita javobni “A” va “B” deb bering va qaysi biri yaxshiroqligini so‘rang. Keyin yangi chatda o‘rnini almashtirib qayta so‘rang. 5–10 juftlikda qaror necha marta o‘zgardi?` },
    { type: 'p', html: `<b>C. Ixtiyoriy: Promptfoo.</b> Node.js o‘rnatilgan bo‘lsa:` },
    { type: 'term', lines: [
      `$ npx promptfoo@latest init`,
      `# promptfooconfig.yaml faylida prompts, providers va tests’ni yozing`,
      `$ npx promptfoo@latest eval`,
      `$ npx promptfoo@latest view`
    ] }
  ],
  quiz: [
    { q: `Eval to‘plamini qanday boshlash tavsiya etiladi?`, options: [`Kamida 1 000 ta sun’iy misol bilan`, `Haqiqiy xatolardan olingan 20–50 ta oddiy vazifa bilan`, `Faqat ommaviy benchmarklar bilan`], answer: 1, explain: `Anthropic: 20–50 ta real xatolardan olingan vazifa — yaxshi boshlanish.` },
    { q: `Bir urinish 75% to‘g‘ri bo‘lsa, uch urinishning HAMMASI to‘g‘ri bo‘lish ehtimoli (pass^3) qancha?`, options: [`~98%`, `~75%`, `~42%`], answer: 2, explain: `0.75³ ≈ 0.42. 98% — pass@3 (kamida bittasi to‘g‘ri).` },
    { q: `50 ta misolda natija 82% dan 85% ga oshdi. Bu nimani bildiradi?`, options: [`Prompt aniq yaxshilangan`, `Farq tasodifiy tebranish chegarasida, isbot emas`, `Model buzilgan`], answer: 1, explain: `n = 50 da 95% oraliq ± ~11 punkt; 3 punktlik farq uning ichida.` },
    { q: `LLM-hakamda “position bias” nima?`, options: [`Uzunroq javobni afzal ko‘rish`, `Javoblar o‘rni almashganda qarorning o‘zgarishi`, `O‘z javobini afzal ko‘rish`], answer: 1, explain: `Zheng va b.: GPT-4 faqat 65% hollarda izchil bo‘lgan.` },
    { q: `Agentni baholashda nimaga qarash kerak?`, options: [`Agent “bajardim” deganiga`, `Muhitning yakuniy holatiga (outcome)`, `Javob uzunligiga`], answer: 1, explain: `Anthropic: agent nima deganidan emas, haqiqatda nima bo‘lganidan baholang.` }
  ],
  summary: [
    `Eval — AI uchun unit test. Haqiqiy xatolardan 20–50 ta vazifa bilan boshlang va har o‘zgarishda ishlating.`,
    `Kod baholovchisi eng tez va takrorlanuvchan, inson bahosi eng ishonchli, LLM-hakam qulay, lekin position va verbosity xatolari bor — inson bahosi bilan kalibrlang.`,
    `Natijani ishonch oralig‘i bilan o‘qing; pass@k va pass^k’ni farqlang; ommaviy benchmark — faqat yo‘nalish.`
  ],
  glossary: [
    [`Eval`, `AI tizim sifatini takrorlanadigan testlar bilan o‘lchash.`],
    [`Golden to‘plam`, `Kirish va kutilgan natijalardan iborat ishonchli test misollari.`],
    [`Grader`, `Natijani baholovchi: kod, model yoki inson.`],
    [`LLM-as-judge`, `Boshqa modelning javobini LLM yordamida baholash.`],
    [`pass@k`, `k urinishdan kamida bittasi muvaffaqiyatli bo‘lish ehtimoli.`],
    [`pass^k`, `k urinishning hammasi muvaffaqiyatli bo‘lish ehtimoli.`],
    [`Regression eval`, `Allaqachon ishlaydigan narsa buzilmaganini tekshiruvchi test.`],
    [`Ishonch oralig‘i`, `Haqiqiy natija katta ehtimol bilan yotadigan oraliq.`],
    [`Contamination`, `Test savollari o‘qitish ma’lumotiga kirib qolishi.`],
    [`Saturation`, `Benchmark modellarni farqlay olmay qolishi.`]
  ],
  sources: [
    { label: `Anthropic — Demystifying evals for AI agents (2026)`, url: `https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents` },
    { label: `Anthropic — A statistical approach to model evaluations (2024)`, url: `https://www.anthropic.com/research/statistical-approach-to-model-evals` },
    { label: `Miller, 2024 — Adding Error Bars to Evals`, url: `https://arxiv.org/abs/2411.00640` },
    { label: `Zheng va b., 2023 — Judging LLM-as-a-Judge`, url: `https://arxiv.org/abs/2306.05685` },
    { label: `Liu va b., 2023 — G-Eval`, url: `https://arxiv.org/abs/2303.16634` },
    { label: `Chiang va b., 2024 — Chatbot Arena`, url: `https://arxiv.org/abs/2403.04132` },
    { label: `Chen va b., 2021 — Codex / HumanEval (pass@k)`, url: `https://arxiv.org/abs/2107.03374` },
    { label: `Yao va b., 2024 — τ-bench (pass^k)`, url: `https://arxiv.org/abs/2406.12045` },
    { label: `Reiter, 2018 — A Structured Review of the Validity of BLEU`, url: `https://aclanthology.org/J18-3002/` },
    { label: `Ragas — Metrics`, url: `https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/` },
    { label: `OpenAI — Evals (yopilish)`, url: `https://developers.openai.com/api/docs/guides/evals` },
    { label: `OpenAI Cookbook — OpenAI Evals’dan Promptfoo’ga`, url: `https://developers.openai.com/cookbook/examples/evaluation/moving-from-openai-evals-to-promptfoo` },
    { label: `Promptfoo`, url: `https://github.com/promptfoo/promptfoo` },
    { label: `DeepEval`, url: `https://github.com/confident-ai/deepeval` },
    { label: `LangSmith — Evaluation concepts`, url: `https://docs.langchain.com/langsmith/evaluation-concepts` },
    { label: `MMLU-Pro`, url: `https://arxiv.org/abs/2406.01574` },
    { label: `Humanity’s Last Exam`, url: `https://lastexam.ai/` },
    { label: `ARC Prize — Leaderboard`, url: `https://arcprize.org/leaderboard` }
  ]
};
