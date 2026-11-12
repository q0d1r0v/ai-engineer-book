window.BOOK.content.uz['01'] = {
  lead: `Katta til modeli (LLM) — sehr emas. U ehtimollar bilan ishlaydigan mashina. Bu bobda model ichida nima bo‘lishini, token va context window nima ekanini, javobni qaysi sozlamalar boshqarishini va ochiq hamda yopiq modellar farqini o‘rganasiz. Keyingi barcha boblar shu asosga quriladi.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: Ollama`],
  goals: [
    `LLM matnni qanday yaratishini tushunish: keyingi tokenni bashorat qilish`,
    `Token, tokenizer va context window — narx va limitlar qayerdan kelishi`,
    `Temperature, top-p, top-k va 2026-yildagi o‘zgarishlar`,
    `Reasoning modellar, ochiq va yopiq modellar, gallyutsinatsiya`
  ],
  sections: [
    { id: 'llm', title: `LLM qanday ishlaydi`, blocks: [
      { type: 'p', html: `LLM (large language model) — ulkan matnlar to‘plamida o‘qitilgan neyron tarmoq. Uning asosiy vazifasi bitta: <b>berilgan matndan keyin qaysi token kelishini bashorat qilish</b>. Model har qadamda mumkin bo‘lgan barcha tokenlar uchun ehtimollar ro‘yxatini hisoblaydi, ulardan bittasini tanlaydi, matnga qo‘shadi va jarayonni takrorlaydi.` },
      { type: 'bars', title: `“Fransiyaning poytaxti —” dan keyingi token (misol)`, max: 1, items: [
        { label: `Parij`, value: 0.91, text: `0.91` },
        { label: `Lion`, value: 0.04, text: `0.04` },
        { label: `boshqa`, value: 0.03, text: `0.03` },
        { label: `shahri`, value: 0.02, text: `0.02` }
      ], caption: `Raqamlar tushuntirish uchun o‘ylab topilgan. Haqiqiy model boshqa qiymatlar beradi, lekin mexanizm aynan shunday.` },
      { type: 'flow', items: [
        { title: `Matn`, text: `Siz yozgan so‘rov` },
        { title: `Ehtimollar`, text: `Har bir mumkin bo‘lgan token uchun` },
        { title: `Tanlash`, text: `Bitta token tanlanadi` },
        { title: `Qo‘shish`, text: `Token matnga qo‘shiladi va takrorlanadi` }
      ] },
      { type: 'p', html: `Javob chat oynasida asta-sekin “oqib” chiqishining sababi ham shu: model uni token-token yaratadi. Qaysi token tanlanishini <b>sampling sozlamalari</b> (temperature, top-p) boshqaradi — ular quyida.` },
      { type: 'note', tone: 'key', html: `Model “bilimni qidirmaydi”, u o‘qitish paytida ko‘rgan matnlar asosida eng ehtimolli davomni yozadi. Gallyutsinatsiya, bilim chegarasi va boshqa ko‘p xususiyatlar aynan shu tabiatdan kelib chiqadi.` }
    ] },
    { id: 'training', title: `Model qanday o‘qitiladi`, blocks: [
      { type: 'p', html: `Bugungi chat modellari odatda uch bosqichdan o‘tadi. Har bir bosqich modelga boshqa narsani o‘rgatadi.` },
      { type: 'flow', items: [
        { title: `1. Pretraining`, text: `Ulkan matnlar to‘plami. Vazifa: keyingi tokenni topish. Model ko‘p narsani biladi, lekin buyruqqa yaxshi bo‘ysunmaydi.` },
        { title: `2. SFT`, text: `Savol–javob namunalari bilan qo‘shimcha o‘qitish. Model yordamchi kabi javob berishni o‘rganadi.` },
        { title: `3. RLHF va RL`, text: `Inson yoki AI baholari, tekshirsa bo‘ladigan mukofotlar (matematika, kod testlari).` }
      ] },
      { type: 'list', items: [
        `<b>RLHF</b> — odamlar ikki javobdan yaxshisini tanlaydi va model shunga moslashadi (InstructGPT, 2022).`,
        `<b>RLAIF</b> — baholarni boshqa AI beradi, ma’lum qoidalar to‘plami asosida (Constitutional AI, 2022).`,
        `<b>RLVR</b> — javobni avtomatik tekshirsa bo‘ladigan vazifalarda mukofot beriladi: masala to‘g‘ri yechildimi, kod testdan o‘tdimi (atama Tülu 3, 2024 da kiritilgan; DeepSeek-R1, 2025 reasoning qobiliyatini shu yo‘l bilan o‘rgatgan).`
      ] },
      { type: 'source', html: `Manbalar: Ouyang va b., 2022 (InstructGPT) · Bai va b., 2022 (Constitutional AI) · Lambert va b., 2024 (Tülu 3) · DeepSeek-AI, 2025 (DeepSeek-R1)` }
    ] },
    { id: 'attention', title: `Transformer va attention`, blocks: [
      { type: 'p', html: `Deyarli barcha zamonaviy LLM’lar 2017-yilgi “Attention Is All You Need” maqolasida taklif qilingan <b>Transformer</b> arxitekturasiga asoslanadi. Uning asosiy g‘oyasi — <b>attention</b>: har bir token o‘zidan oldingi tokenlarga “qaraydi” va qaysi biri o‘zi uchun muhimligini o‘lchab, o‘z ma’nosini aniqlaydi.` },
      { type: 'tokens', label: `Soddalashtirilgan misol`, items: [`Anna`, `Mariyaga`, `kitob`, `berdi,`, `chunki`, `u`, `kitobni`, `o‘qib`, `bo‘lgan`, `edi.`], foot: `“u” kim? Attention orqali model “u” so‘zini oldindagi “Anna” bilan bog‘laydi.` },
      { type: 'p', html: `Haqiqiy modelda o‘nlab qatlamlar va har qatlamda ko‘plab attention “boshlari” bor. Generativ modellarda har bir token faqat <b>o‘zidan oldingi</b> tokenlarga qaraydi (causal attention) — model kelajakdagi so‘zlarni “ko‘rmaydi”.` },
      { type: 'note', tone: 'key', html: `Attention har bir yangi token uchun butun oldingi kontekstni hisobga oladi. Shuning uchun kontekst qancha uzun bo‘lsa, hisoblash shuncha qimmat va sekin bo‘ladi.` },
      { type: 'source', html: `Manba: Vaswani va b., “Attention Is All You Need”, 2017` }
    ] },
    { id: 'token', title: `Token — modelning “so‘zi”`, blocks: [
      { type: 'p', html: `Model matnni harf yoki butun so‘z bilan emas, <b>tokenlar</b> — so‘z bo‘laklari bilan o‘qiydi. Matnni tokenlarga <b>tokenizer</b> ajratadi; ko‘pincha BPE (byte pair encoding) usuli ishlatiladi: ko‘p uchraydigan harf birikmalari bitta tokenga aylanadi, kam uchraydiganlari bo‘laklarga bo‘linadi.` },
      { type: 'tokens', label: `Soddalashtirilgan misol — aniq bo‘linish tokenizerga bog‘liq`, items: [`un`, `believ`, `able`], foot: `“unbelievable” — 1 ta so‘z, lekin bir necha token` },
      { type: 'p', html: `Ko‘p tokenizerlarda bo‘shliq keyingi tokenning boshiga yopishadi. Har bir model matnni o‘zicha bo‘ladi, shuning uchun aniq sonni provayderning token hisoblash vositasida tekshiring.` },
      { type: 'cards', items: [
        { tag: `Narx`, title: `Tokenlarda hisoblanadi`, html: `API narxi har 1 million kirish va javob tokeni uchun belgilanadi.` },
        { tag: `Limit`, title: `Tokenlarda o‘lchanadi`, html: `Context window va maksimal javob uzunligi — tokenlar soni.` },
        { tag: `Farq`, title: `Har modelda boshqa`, html: `Bir xil matn turli tokenizerlarda turlicha tokenga bo‘linadi.` }
      ] },
      { type: 'p', html: `Inglizcha matn uchun OpenAI’ning taxminiy qoidasi: <b>1 token ≈ 4 belgi ≈ ¾ so‘z</b>. Claude’ning yangi tokenizeri (Claude 4.7 va undan keyingi modellar) eski versiyalarga qaraganda matnga qarab 1–1.35 baravar ko‘proq token chiqaradi. Aniq sonni bilish uchun provayderning token hisoblash vositasidan foydalaning.` }
    ] },
    { id: 'languages', title: `Tillar bir xil emas`, blocks: [
      { type: 'p', html: `Tokenizerlar asosan ingliz tilidagi matnlarda o‘qitiladi. Natijada bir xil ma’noli matn boshqa tillarda ancha ko‘p tokenga bo‘linadi. Petrov va hammualliflari (NeurIPS 2023) bir xil tarjima qilingan matnlarda tillar orasidagi farq 15 baravargacha yetishini va bu farq ular sinagan 17 ta tokenizerning hammasida borligini ko‘rsatgan.` },
      { type: 'note', tone: 'key', html: `Ingliz tilidan boshqa tilda ishlaydigan mahsulot <b>qimmatroq</b> (ko‘proq token), <b>sekinroq</b> (ko‘proq token yaratiladi) va <b>context window’ni tezroq to‘ldiradi</b>. Narxni rejalashtirishda buni albatta hisobga oling va o‘z matnlaringizda o‘lchang.` }
    ] },
    { id: 'context', title: `Context window — modelning ish stoli`, blocks: [
      { type: 'p', html: `<b>Context window</b> — model bitta so‘rovda ko‘ra oladigan tokenlarning maksimal soni. Unga hamma narsa kiradi: tizim ko‘rsatmasi (system prompt), suhbat tarixi, siz bergan hujjatlar va <b>modelning javobi</b> ham.` },
      { type: 'table', head: [`Model`, `Context (token)`, `Maks. javob`], num: [1, 2], rows: [
        [`Claude Opus 5.5`, `1 000 000`, `128 000`],
        [`GPT-6.1 Sol`, `1 050 000`, `128 000`],
        [`Gemini 4 Argon`, `1 048 576 (kirish + javob)`, `65 536 (standart)`],
        [`Qwen3.8-27B (ochiq)`, `262 144`, `—`],
      ], caption: `2026-yil noyabr holatiga. Manba: provayderlarning rasmiy hujjatlari, Hugging Face config fayllari. GPT-6.1 Sol va GPT-6 Astra’da kirish 922K bilan cheklangan.` },
      { type: 'stats', items: [
        { value: `≈ 555K`, label: `inglizcha so‘z 1M tokenga sig‘adi (Claude tokenizerida)` },
        { value: `4 096`, label: `Ollama’ning standart konteksti, GPU xotirasi 24 GB dan kam bo‘lsa` }
      ] },
      { type: 'note', tone: 'warn', html: `Modelning <b>maksimal</b> konteksti va <b>amalda ishlatilayotgan</b> kontekst har xil narsa. Ollama standart kontekstni GPU xotirasiga (VRAM) qarab tanlaydi: 24 GB dan kam — 4 096, 24–48 GB — 32K, 48 GB va undan ko‘p — 256K token. Uni <code>OLLAMA_CONTEXT_LENGTH</code> bilan o‘zgartirish mumkin. Joriy qiymatni <code>ollama ps</code> buyrug‘idagi CONTEXT ustuni ko‘rsatadi.` }
    ] },
    { id: 'lost', title: `Katta oyna ≠ yaxshi xotira`, blocks: [
      { type: 'p', html: `1 million tokenli oyna borligi model hammasini bir xil yaxshi ishlatadi degani emas. Ikki muhim tadqiqot:` },
      { type: 'figure', svg: `<svg viewBox="0 0 640 260" role="img" aria-label="U shaklidagi egri chiziq: aniqlik kontekst boshida va oxirida yuqori, o‘rtasida past"><line x1="40" y1="220" x2="620" y2="220" style="stroke:var(--line)" stroke-width="3"/><line x1="40" y1="20" x2="40" y2="220" style="stroke:var(--line)" stroke-width="3"/><path d="M 60 50 C 220 230, 440 230, 600 70" fill="none" style="stroke:var(--accent)" stroke-width="8" stroke-linecap="round"/><circle cx="60" cy="50" r="9" style="fill:var(--accent-ink)"/><circle cx="330" cy="183" r="9" style="fill:var(--accent-ink)"/><circle cx="600" cy="70" r="9" style="fill:var(--accent-ink)"/><text x="60" y="245" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--muted);font-family:var(--font)">Boshida</text><text x="330" y="245" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--muted);font-family:var(--font)">O‘rtasida</text><text x="600" y="245" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--muted);font-family:var(--font)">Oxirida</text><text x="50" y="16" font-size="14" font-weight="700" style="fill:var(--faint);font-family:var(--font)">Aniqlik ↑</text></svg>`, caption: `Sxema: Liu va b. natijalari asosida — kerakli ma’lumotning kontekstdagi joylashuviga qarab aniqlik.` },
      { type: 'cards', items: [
        { tag: `Liu va b., TACL 2024`, title: `Lost in the middle`, html: `Kerakli ma’lumot kontekstning boshida yoki oxirida bo‘lsa, natija eng yaxshi. O‘rtasida bo‘lsa, aniqlik sezilarli pasayadi.` },
        { tag: `Chroma, 2025`, title: `Context rot`, html: `18 ta modelda kirish uzaygan sari ishonchlilik pasaygan — hatto oddiy vazifalarda ham.` }
      ] },
      { type: 'note', tone: 'key', html: `Amaliy qoida: muhim ma’lumotni kontekstning boshiga yoki oxiriga qo‘ying, keraksizini olib tashlang. Bu mavzu 4-bobda (Context engineering) chuqur o‘rganiladi.` }
    ] },
    { id: 'temperature', title: `Temperature — ijodkorlik tutqichi`, blocks: [
      { type: 'p', html: `<b>Temperature</b> ehtimollar ro‘yxatini “o‘tkir” yoki “yassi” qiladi. Past qiymatda eng ehtimolli tokenlar deyarli doim tanlanadi, yuqori qiymatda kam ehtimolli tokenlar ham tanlana boshlaydi.` },
      { type: 'cards', items: [
        { tag: `0 ga yaqin`, title: `Barqaror`, html: `Deyarli doim eng ehtimolli token. Ma’lumot ajratish, tasniflash, aniq javoblar uchun.` },
        { tag: `~0.7`, title: `Muvozanat`, html: `O‘rtacha xilma-xillik. Oddiy matn va suhbat uchun.` },
        { tag: `1 va undan yuqori`, title: `Xilma-xil`, html: `Kam ehtimolli tokenlar ham tanlanadi. Ijodiy, ammo xato ko‘payadi.` }
      ] },
      { type: 'p', html: `Diapazon provayderga bog‘liq: OpenAI va Gemini API’larida 0 dan 2 gacha.` },
      { type: 'note', tone: 'warn', html: `Temperature 0 ham <b>100% bir xil javobni kafolatlamaydi</b>. Anthropic hujjatlari buni ochiq aytadi; sababi — serverdagi hisob-kitoblar yuklamaga qarab biroz farq qiladi (Thinking Machines, 2025).` }
    ] },
    { id: 'sampling', title: `top-p, top-k va boshqa sozlamalar`, blocks: [
      { type: 'table', head: [`Parametr`, `Nima qiladi`, `Bilish kerak`], rows: [
        [`<b>top-p</b>`, `Eng ehtimolli tokenlarni, ularning ehtimollari yig‘indisi p ga yetguncha oladi va faqat shular orasidan tanlaydi`, `Holtzman va b., 2019 (nucleus sampling). OpenAI: temperature yoki top-p’dan faqat bittasini o‘zgartiring`],
        [`<b>top-k</b>`, `Faqat eng ehtimolli k ta tokendan tanlaydi`, `Ochiq modellarning standart qiymatlari model kartasida ko‘rsatiladi`],
        [`<b>max_tokens</b>`, `Javob uzunligining yuqori chegarasi`, `Model undan oldin ham to‘xtashi mumkin. Reasoning modellarda o‘ylash tokenlari ham shunga kiradi`],
        [`<b>stop</b>`, `Shu matn chiqsa, generatsiya to‘xtaydi`, `Javob formatini qat’iy ushlashda foydali`]
      ] },
      { type: 'p', html: `Misol: <code>top_p = 0.95</code> bo‘lsa, model tokenlarni ehtimoli bo‘yicha saralaydi, yig‘indisi 95% ga yetguncha oladi va faqat shular orasidan tanlaydi. Juda kam ehtimolli “g‘alati” tokenlar shu tarzda chiqarib tashlanadi.` }
    ] },
    { id: 'y2026', title: `2026-yil: sozlamalar yopilmoqda`, blocks: [
      { type: 'p', html: `Eski darsliklarda “aniq javob uchun temperature = 0 qo‘ying” degan maslahat ko‘p uchraydi. Bugungi eng yangi modellarda bu har doim ham ishlamaydi:` },
      { type: 'cards', items: [
        { tag: `Claude`, title: `400 xato`, html: `API 2026-10-21 versiyasida temperature, top_p yoki top_k yuborilsa — standart qiymatda bo‘lsa ham — 400 xato qaytadi. Claude 4.7 va keyingi modellar avvaldan faqat standart qiymatni qabul qilgan.` },
        { tag: `OpenAI GPT-6`, title: `Reasoning bilan yopiq`, html: `Reasoning effort “none” bo‘lmasa, temperature va top_p olib tashlanishi kerak. GPT-6 Astra va GPT-6.1 Sol “none” rejimini umuman qo‘llamaydi.` },
        { tag: `Ochiq modellar`, title: `Hammasi ochiq`, html: `Ollama, vLLM, llama.cpp’da barcha sampling sozlamalarini o‘zgartirish mumkin. Shuning uchun amaliyot lokal modelda.` }
      ] },
      { type: 'note', tone: 'info', html: `Claude’da temperature’ning o‘rnini bosuvchi sozlama yo‘q. <b>Effort</b> parametri esa boshqa narsani — o‘ylash chuqurligi va token sarfini boshqaradi.` },
      { type: 'source', html: `Manba: platform.claude.com — API migration 2026-10-21; developers.openai.com — latest model guide` }
    ] },
    { id: 'reasoning', title: `Reasoning (o‘ylaydigan) modellar`, blocks: [
      { type: 'p', html: `Reasoning modellar javob berishdan oldin “o‘ylash” matnini yozadi: turli yondashuvlarni sinaydi, oraliq natijalarni tekshiradi, boshi berk yo‘llardan qaytadi. Bunday qobiliyat asosan RL orqali o‘rgatiladi (DeepSeek-R1, 2025).` },
      { type: 'flow', items: [
        { title: `Savol` },
        { title: `Thinking`, text: `Sinaydi, tekshiradi, xatoni tashlaydi` },
        { title: `Javob` }
      ] },
      { type: 'cards', items: [
        { tag: `Narx`, title: `Pulga tushadi`, html: `Thinking tokenlar javob (output) narxida to‘lanadi va max_tokens limitiga kiradi.` },
        { tag: `Ko‘rinish`, title: `Yashirin`, html: `Claude xom o‘ylash matnini qaytarmaydi: Claude 5 modellarida standart holatda bo‘sh blok, so‘ralsa — qisqa xulosa.` },
        { tag: `Boshqaruv`, title: `Effort`, html: `Opus 5.5 va Fable 5.2’da thinking doim yoqilgan; chuqurligini effort parametri belgilaydi.` }
      ] },
      { type: 'note', tone: 'key', html: `Reasoning qiyin matematika, kod va ko‘p bosqichli vazifalarda foyda beradi. Oddiy savollarda esa ortiqcha xarajat va kechikish. Ba’zi kichik modellarda ham thinking standart holatda yoqilgan bo‘ladi — narxni hisoblashda buni tekshiring.` }
    ] },
    { id: 'open', title: `Ochiq va yopiq modellar`, blocks: [
      { type: 'table', head: [` `, `Ochiq vaznli (open-weight)`, `Yopiq (faqat API)`], rows: [
        [`<b>Misollar</b>`, `Qwen3.8-27B, DeepSeek V4, Gemma 4, gpt-oss, Mistral Small 4`, `Claude, GPT-6, Gemini 4`],
        [`<b>Ma’lumot</b>`, `O‘z serveringizda qoladi`, `Provayderga yuboriladi`],
        [`<b>Narx</b>`, `GPU va server xarajati`, `Har bir token uchun to‘lov`],
        [`<b>Sifat</b>`, `Odatda eng kuchli yopiq modellardan orqada`, `Eng yuqori daraja`],
        [`<b>Nazorat</b>`, `Fine-tuning, offline ishlash`, `Provayder qoidalariga bog‘liq`]
      ] },
      { type: 'p', html: `<b>“Ochiq vazn” va “open source” bir narsa emas.</b> OSI’ning Open Source AI Definition 1.0 ta’rifiga ko‘ra, open source model uchun parametrlardan tashqari to‘liq kod va o‘qitish ma’lumoti haqida yetarli axborot ham ochiq bo‘lishi kerak. Ko‘p mashhur “ochiq” modellar faqat ochiq vaznli.` },
      { type: 'table', head: [`Model`, `Litsenziya`], rows: [
        [`Qwen3.8-27B`, `Apache 2.0`], [`Gemma 4`, `Apache 2.0`], [`gpt-oss-20b / 120b`, `Apache 2.0`], [`Mistral Small 4`, `Apache 2.0`], [`DeepSeek V4`, `MIT`], [`Llama 4`, `Maxsus (Llama 4 Community License)`]
      ], caption: `Manba: Hugging Face’dagi model sahifalari, 2026-yil noyabr. Litsenziyani doim o‘qing: ba’zilarida foydalanish cheklovlari bor.` }
    ] },
    { id: 'halluc', title: `Gallyutsinatsiya va bilim chegarasi`, blocks: [
      { type: 'p', html: `<b>Gallyutsinatsiya</b> — ishonchli ohangda aytilgan, lekin noto‘g‘ri gap. OpenAI tadqiqotchilari (Kalai va b., 2025) ikki asosiy sababni ko‘rsatadi: pretraining paytidagi statistik bosim va o‘qitish hamda baholash “bilmayman” deyish o‘rniga taxmin qilishni rag‘batlantirishi.` },
      { type: 'p', html: `<b>Bilim chegarasi (knowledge cutoff)</b> — model o‘qitish ma’lumoti tugagan sana. Undan keyingi voqealarni model bilmaydi. 2026-yil noyabr holatiga: joriy Claude modellari — 2026-yil iyun, GPT-6 Astra — 2026-yil 30-aprel.` },
      { type: 'p', html: `Yechimlar: modelga kerakli ma’lumotni o‘zingiz bering (RAG — 6-bob), “bilmasang, bilmayman de” deb ko‘rsatma bering (3-bob) va muhim javoblarni tekshiring (9-bob).` }
    ] },
    { id: 'cost', title: `Amalda: narxni hisoblash`, blocks: [
      { type: 'p', html: `Tasavvur qiling: kompaniyaning ichki yordamchi boti xodimlarning IT va HR savollariga kuniga 10 000 marta javob beradi. Har bir savol taxminan 1 000 kirish tokeni (ko‘rsatma + tegishli qoida + savol) va 300 javob tokenini oladi.` },
      { type: 'stats', items: [
        { value: `10M`, label: `kirish tokeni kuniga` },
        { value: `3M`, label: `javob tokeni kuniga` },
        { value: `$2.50`, label: `kuniga — Claude Haiku 5.5, thinking o‘chirilgan holda` }
      ] },
      { type: 'p', html: `Hisob: 10M × $0.10 + 3M × $0.50 (har 1M token uchun) = $1.00 + $1.50 = <b>$2.50</b> kuniga, ya’ni oyiga taxminan $75. Narxlar 2026-yil noyabr holatiga.` },
      { type: 'note', tone: 'warn', html: `Haiku 5.5 va GPT-6 Luna’da thinking standart holatda yoqilgan (effort medium). Thinking tokenlari javob narxida to‘lanadi, shuning uchun haqiqiy xarajat oshadi. Oddiy savollar uchun effort’ni “low” qiling yoki thinking’ni o‘chiring. Ingliz tilidan boshqa tillarda token soni ko‘pincha ancha ko‘p bo‘lishini ham unutmang.` }
    ] }
  ],
  mistakes: [
    [`“1 token = 1 so‘z”`, `Inglizchada ≈ ¾ so‘z. Boshqa ko‘p tillarda bir so‘z ko‘pincha bir necha tokenga bo‘linadi.`],
    [`“Temperature 0 = doim bir xil javob”`, `Kafolat yo‘q. Claude’da va reasoning yoqilgan GPT-6’da uni o‘zgartirib ham bo‘lmaydi.`],
    [`“Katta context = hammasini eslaydi”`, `O‘rtadagi ma’lumot “yo‘qolishi” mumkin (lost in the middle, context rot).`],
    [`“Model bugungi yangiliklarni biladi”`, `Faqat bilim chegarasigacha. Undan keyingisini o‘zingiz berishingiz kerak.`],
    [`“Ochiq model = open source”`, `Ko‘pi faqat ochiq vaznli. Litsenziyani o‘qing.`],
    [`“Thinking bepul”`, `O‘ylash tokenlari javob narxida to‘lanadi.`]
  ],
  lab: [
    { type: 'p', html: `Bu amaliyotda temperature’ning ta’sirini o‘z ko‘zingiz bilan ko‘rasiz. Kerak: <b>Ollama</b> (ollama.com) va kompyuteringizga mos model — uni ollama.com/library’dan tanlang (kuchsiz kompyuterda 1–4B, kuchliroqda 7–9B parametrli model). Quyidagi buyruqlarda <code>&lt;model&gt;</code> o‘rniga tanlagan modelingiz nomini yozing. Model “thinking” rejimli bo‘lsa, <code>--think=false</code> bayrog‘i bilan o‘chiring.` },
    { type: 'steps', items: [
      `Ollama’ni o‘rnating: ollama.com`,
      `Modelni ishga tushiring (birinchi marta model yuklab olinadi).`,
      `Temperature’ni 0 qiling va bir xil savolni 3 marta bering. Har urinishdan oldin <code>/clear</code> yozing — aks holda oldingi javoblar suhbat tarixida qoladi va natijaga ta’sir qiladi.`,
      `Temperature’ni 1 qilib, yana 3 marta takrorlang.`,
      `<code>/show parameters</code> bilan joriy sozlamalarni, boshqa terminalda <code>ollama ps</code> bilan kontekst va xotira taqsimotini ko‘ring.`
    ] },
    { type: 'term', lines: [
      `$ ollama run <model> --verbose`,
      `>>> /set parameter temperature 0`,
      `>>> Dengiz haqida bitta so‘z ayt. Faqat bitta so‘z yoz.`,
      `>>> /clear`,
      `>>> /set parameter temperature 1`,
      `>>> /show parameters`,
      `>>> /bye`,
      `# --verbose har javobdan keyin tezlikni (token/s) ko‘rsatadi`
    ] },
    { type: 'note', tone: 'key', html: `Nimani kuzatish kerak: temperature 0 da javoblar ko‘pincha bir xil yoki juda o‘xshash bo‘ladi, 1 da esa har safar farq qiladi. Natijalarni yozib, solishtiring. Kichik modellar ingliz tilidan boshqa tillarda ko‘proq xato qilishi mumkin — buni ham kuzating.` }
  ],
  quiz: [
    { q: `1 token har doim 1 so‘zga tengmi?`, options: [`Ha, doim`, `Yo‘q, token so‘zning bo‘lagi ham bo‘lishi mumkin`, `Faqat ingliz tilida`], answer: 1, explain: `Token — tokenizer ajratgan bo‘lak. Inglizchada o‘rtacha ¾ so‘z, boshqa tillarda bir so‘z ko‘pincha bir necha token.` },
    { q: `Claude API’ga (2026-10-21 versiyasi) temperature = 0 yuborsangiz nima bo‘ladi?`, options: [`Javob har doim bir xil bo‘ladi`, `400 xato qaytadi`, `Parametr jimgina e’tiborsiz qoldiriladi`], answer: 1, explain: `Bu versiyada sampling parametrlari yuborilsa, standart qiymatda bo‘lsa ham, 400 xato qaytadi.` },
    { q: `Muhim ma’lumotni kontekstning qayeriga qo‘ygan ma’qul?`, options: [`O‘rtasiga`, `Boshiga yoki oxiriga`, `Farqi yo‘q`], answer: 1, explain: `“Lost in the middle” tadqiqoti: kontekst o‘rtasidagi ma’lumotni model yomonroq ishlatadi.` },
    { q: `Qwen3.8-27B qanday model?`, options: [`Ochiq vaznli, Apache 2.0 litsenziyasi`, `Faqat API orqali ishlaydi`, `To‘liq open source (OSI ta’rifi bo‘yicha)`], answer: 0, explain: `Vaznlari Apache 2.0 bilan ochiq. Lekin o‘qitish ma’lumoti va to‘liq kodi ochiq emas, shuning uchun OSI ta’rifidagi open source emas.` },
    { q: `Reasoning modelning “o‘ylash” tokenlari uchun pul to‘lanadimi?`, options: [`Yo‘q, ular bepul`, `Ha, javob (output) narxida`, `Faqat kirish narxida`], answer: 1, explain: `Thinking tokenlar output sifatida hisoblanadi va max_tokens limitiga ham kiradi.` }
  ],
  summary: [
    `LLM keyingi tokenni bashorat qiladi. Bilim chegarasi va gallyutsinatsiya shu tabiatdan kelib chiqadi.`,
    `Hammasi tokenda o‘lchanadi: narx, tezlik va limit. Ingliz tilidan boshqa tillarda token soni ancha ko‘p.`,
    `Sozlamalar modelga bog‘liq: lokal modelda hammasi ochiq; Claude va reasoning yoqilgan GPT-6’da temperature yopilgan.`
  ],
  glossary: [
    [`LLM`, `Katta til modeli — keyingi tokenni bashorat qilishga o‘qitilgan neyron tarmoq.`],
    [`Token`, `Model ishlaydigan matn bo‘lagi: so‘z, so‘z qismi yoki belgi.`],
    [`Tokenizer`, `Matnni tokenlarga ajratuvchi qism. Har bir modelning o‘z tokenizeri bor.`],
    [`Context window`, `Bitta so‘rovda model ko‘ra oladigan tokenlarning maksimal soni (javob bilan birga).`],
    [`Attention`, `Har bir token oldingi tokenlardan qaysi biri muhimligini o‘lchaydigan mexanizm.`],
    [`Temperature`, `Token tanlashdagi tasodifiylik darajasi.`],
    [`top-p / top-k`, `Tanlov faqat eng ehtimolli tokenlar orasida bo‘lishini cheklaydigan sozlamalar.`],
    [`Reasoning`, `Javobdan oldin o‘ylash tokenlarini yozish rejimi.`],
    [`Open-weight`, `Vaznlari yuklab olinadigan model. Open source bilan bir xil emas.`],
    [`Gallyutsinatsiya`, `Model ishonch bilan aytgan noto‘g‘ri ma’lumot.`],
    [`Knowledge cutoff`, `Model o‘qitish ma’lumoti tugagan sana.`]
  ],
  sources: [
    { label: `Vaswani va b., 2017 — Attention Is All You Need`, url: `https://arxiv.org/abs/1706.03762` },
    { label: `Ouyang va b., 2022 — InstructGPT`, url: `https://arxiv.org/abs/2203.02155` },
    { label: `Bai va b., 2022 — Constitutional AI`, url: `https://arxiv.org/abs/2212.08073` },
    { label: `Lambert va b., 2024 — Tülu 3 (RLVR)`, url: `https://arxiv.org/abs/2411.15124` },
    { label: `DeepSeek-AI, 2025 — DeepSeek-R1`, url: `https://arxiv.org/abs/2501.12948` },
    { label: `Petrov va b., 2023 — Tokenizers introduce unfairness between languages`, url: `https://arxiv.org/abs/2305.15425` },
    { label: `Liu va b., TACL 2024 — Lost in the Middle`, url: `https://aclanthology.org/2024.tacl-1.9/` },
    { label: `Chroma, 2025 — Context Rot`, url: `https://www.trychroma.com/research/context-rot` },
    { label: `Holtzman va b., 2019 — Nucleus sampling`, url: `https://arxiv.org/abs/1904.09751` },
    { label: `Kalai va b., 2025 — Why language models hallucinate`, url: `https://arxiv.org/abs/2509.04664` },
    { label: `Thinking Machines, 2025 — Defeating nondeterminism in LLM inference`, url: `https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/` },
    { label: `Anthropic — Claude models overview`, url: `https://platform.claude.com/docs/en/about-claude/models/overview` },
    { label: `Anthropic — API migration 2026-10-21`, url: `https://platform.claude.com/docs/en/api/migration-2026-10-21` },
    { label: `Anthropic — Extended / adaptive thinking`, url: `https://platform.claude.com/docs/en/build-with-claude/thinking` },
    { label: `OpenAI — Models`, url: `https://developers.openai.com/api/docs/models` },
    { label: `Ollama — Context length`, url: `https://docs.ollama.com/context-length` },
    { label: `OSI — Open Source AI Definition 1.0`, url: `https://opensource.org/ai/open-source-ai-definition` }
  ]
};
