window.BOOK.content.uz['02'] = {
  lead: `Bugun yuzlab modellar bor, narxi esa bir provayderning o‘zida 80 baravar farq qiladi. Bu bobda asosiy provayderlar va ularning narxlarini, API qanday ishlashini, pulni qanday tejashni va modelni o‘z kompyuteringizda qanday ishga tushirishni o‘rganasiz.`,
  minutes: 50,
  tags: [`Narxlar 2026-yil noyabr`, `Amaliyot: OpenRouter + Ollama`],
  goals: [
    `Asosiy provayderlar, ularning modellari va narxlarini bilish`,
    `API so‘rovi tuzilishi: rollar, stateless, streaming, limitlar va xatolar`,
    `Narxni kamaytirish: caching, batch, kichik model, qisqa javob`,
    `Lokal ishga tushirish va kerakli xotirani hisoblash, maxfiylik`
  ],
  sections: [
    { id: 'market', title: `Asosiy provayderlar`, blocks: [
      { type: 'cards', items: [
        { tag: `Yopiq`, title: `Anthropic`, html: `Claude Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5` },
        { tag: `Yopiq + gpt-oss ochiq`, title: `OpenAI`, html: `GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna` },
        { tag: `Yopiq + Gemma ochiq`, title: `Google`, html: `Gemini 4 Argon, Gemini 3.8 Flash, Gemini 3.5 Flash-Lite` },
        { tag: `Ochiq vaznli (MIT)`, title: `DeepSeek`, html: `DeepSeek V4-Pro, DeepSeek V4.1 Flash` },
        { tag: `Aralash`, title: `Alibaba · Qwen`, html: `Qwen3.8-Max, Qwen3.8-Flash, ochiq Qwen3.8-27B` },
        { tag: `Asosan yopiq`, title: `Meta`, html: `Muse Wonder, Muse Spark, Muse Ember` },
        { tag: `Ochiq vaznli`, title: `Mistral`, html: `Mistral Large 4, Mistral Small 4, Ministral 3` },
        { tag: `O‘z kompyuteringizda`, title: `Lokal`, html: `Ollama, LM Studio, Hugging Face, llama.cpp, vLLM` }
      ] },
      { type: 'list', items: [
        `<b>Claude Mythos 5.2</b> ham bor, lekin faqat Anthropic dasturlari orqali tasdiqlangan tashkilotlar uchun.`,
        `<b>Gemini 4 Carbon</b> hozircha faqat kiberxavfsizlik mutaxassislarining bir qismiga ochiq. Oddiy dasturchilar uchun Google’ning eng kuchli modeli — <b>Gemini 4 Argon</b>.`,
        `<b>Meta</b>’ning hozirgi Muse modellari asosan yopiq. Ochiq vaznlilari — Muse Spark Open va Muse Glimmer. Llama’ning kelajagi noaniq.`,
        `Nomlarga e’tibor bering: “GPT-6” degan alohida model yo‘q — GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna.`
      ] }
    ] },
    { id: 'prices1', title: `Narxlar: Anthropic va OpenAI`, blocks: [
      { type: 'table', head: [`Model`, `Kirish $`, `Javob $`, `Nima uchun`], num: [1, 2], rows: [
        [`<b>Claude Fable 5.2</b>`, `8`, `40`, `Eng qiyin reasoning va uzoq agent ishlari`],
        [`<b>Claude Opus 5.5</b>`, `4`, `20`, `Anthropic tavsiyasi: ko‘p ishlar uchun boshlang‘ich model`],
        [`<b>Claude Sonnet 5.5</b>`, `2`, `10`, `Tezlik va aql muvozanati`],
        [`<b>Claude Haiku 5.5</b>`, `0.10`, `0.50`, `Tasniflash, ma’lumot ajratish, routing`],
        [`<b>GPT-6 Astra</b>`, `10`, `50`, `OpenAI’ning eng kuchli modeli`],
        [`<b>GPT-6.1 Sol</b>`, `2`, `10`, `O‘rta daraja`],
        [`<b>GPT-6.1 Terra</b>`, `1`, `5`, `O‘rta-kichik daraja`],
        [`<b>GPT-6 Luna</b>`, `0.10`, `0.50`, `Kichik va arzon`]
      ], caption: `$ — har 1 million token uchun, standart tarif, 2026-yil 12-noyabr holatiga. Manba: Anthropic va OpenAI narx sahifalari.` },
      { type: 'list', items: [
        `Haiku 5.5 narxi 100K tokengacha bo‘lgan so‘rovlar uchun; undan uzunida $0.50 / $2.50.`,
        `OpenAI’da 272K dan uzun kirishda narx oshadi: kirish 2×, javob 1.5×.`,
        `Context: Claude modellarida 1M, OpenAI’da 1.05M token; maksimal javob ikkalasida 128K.`
      ] }
    ] },
    { id: 'prices2', title: `Narxlar: boshqa provayderlar`, blocks: [
      { type: 'table', head: [`Model`, `Kirish $`, `Javob $`, `Izoh`], num: [1, 2], rows: [
        [`<b>Gemini 4 Argon</b>`, `2 → 4`, `10 → 20`, `2026-yil 1-dekabrdan narx oshadi`],
        [`<b>Gemini 3.8 Flash</b>`, `0.75 → 1.50`, `3.75 → 7.50`, `2027-yil 1-yanvardan narx oshadi`],
        [`<b>Gemini 3.5 Flash-Lite</b>`, `0.30`, `2.50`, `Arzon daraja`],
        [`<b>DeepSeek V4-Pro</b>`, `1.32`, `3.96`, `Off-peak vaqtda 2× arzon`],
        [`<b>DeepSeek V4.1 Flash</b>`, `0.30`, `1.20`, `Off-peak vaqtda 2× arzon`],
        [`<b>Qwen3.8-Max</b>`, `2`, `6`, `Alibaba Cloud Singapur regioni narxi`],
        [`<b>Qwen3.8-Flash</b>`, `0.15`, `0.47`, `Arzon daraja`],
        [`<b>Meta Muse Wonder</b>`, `4`, `20`, `Meta’ning eng kuchli modeli`],
        [`<b>Meta Muse Ember</b>`, `0.10`, `0.50`, `200K tokengacha so‘rov`],
        [`<b>Mistral Large 4</b>`, `0.70`, `2.10`, `Ochiq vaznli (Mistral’ning o‘z litsenziyasi)`],
        [`<b>Mistral Small 4</b>`, `0.15`, `0.60`, `Ochiq vaznli, Apache 2.0`]
      ], caption: `$ — har 1 million token uchun, 2026-yil 12-noyabr holatiga. Manba: provayderlarning rasmiy narx sahifalari.` },
      { type: 'note', tone: 'info', html: `DeepSeek’da peak soatlar: dushanba–juma 01:00–04:00 va 06:00–10:00 UTC. Qolgan vaqtda va Xitoy bayram kunlarida narx yarmiga tushadi (V4-Pro: $0.66 / $1.98). Mistral Large 4 narxi rasmiy hujjatlardan olingan; ba’zi saytlarda boshqa raqam yozilgan.` }
    ] },
    { id: 'tiers', title: `Uch daraja: katta, o‘rta, kichik`, blocks: [
      { type: 'cards', items: [
        { tag: `Flagship`, title: `Fable 5.2 · Opus 5.5 · GPT-6 Astra · Gemini 4 Argon`, html: `Murakkab reasoning, kod, agentlar. Qimmatroq va sekinroq.` },
        { tag: `O‘rta`, title: `Sonnet 5.5 · GPT-6.1 Sol · Gemini 3.8 Flash`, html: `Ko‘p mahsulotlar uchun asosiy ishchi model.` },
        { tag: `Kichik`, title: `Haiku 5.5 · GPT-6 Luna · Muse Ember · Qwen3.8-Flash`, html: `Tasniflash, ajratish, routing. Katta hajm, past narx.` }
      ] },
      { type: 'note', tone: 'key', html: `Usul: avval kuchli model bilan sifat qanday bo‘lishini ko‘ring, keyin arzonrog‘ini sinab, farqni o‘lchang. Sifatni “ko‘z bilan” emas, test to‘plami bilan o‘lchash — 9-bob (Eval) mavzusi.` }
    ] },
    { id: 'api', title: `API qanday ishlaydi`, blocks: [
      { type: 'p', html: `Barcha provayderlarda asos bir xil: ilovangiz HTTPS orqali JSON so‘rov yuboradi, provayder serveri JSON javob qaytaradi.` },
      { type: 'flow', items: [
        { title: `Sizning ilovangiz`, text: `Serverda ishlaydi` },
        { title: `HTTPS so‘rov`, text: `API kalit, model nomi, xabarlar, javob uzunligi chegarasi` },
        { title: `Provayder serveri`, text: `Model javobni yaratadi` },
        { title: `JSON javob`, text: `Matn, to‘xtash sababi, ishlatilgan tokenlar (usage)` }
      ] },
      { type: 'p', html: `Javobdagi <b>usage</b> maydoni hisob uchun eng muhim joy: kirish va javob tokenlari soni aynan shu yerda ko‘rinadi.` },
      { type: 'note', tone: 'warn', html: `API kalit — bu pul. Uni hech qachon frontend kodga, GitHub’ga yoki chatga qo‘ymang. Kalit faqat serverda, muhit o‘zgaruvchisida (environment variable) saqlanadi.` }
    ] },
    { id: 'roles', title: `Xabarlar va rollar`, blocks: [
      { type: 'p', html: `Suhbat — bu xabarlar ro‘yxati, har bir xabarning roli bor:` },
      { type: 'table', head: [`Rol`, `Nima`, `Misol`], rows: [
        [`<b>system</b>`, `Qoidalar va rol. Claude Messages API’da alohida yuqori darajadagi <code>system</code> maydoni; OpenAI uslubidagi API’larda system yoki developer xabari`, `“Sen kompaniyaning IT yordamchisisan. Qisqa va xushmuomala javob ber.”`],
        [`<b>user</b>`, `Foydalanuvchi yozgan matn`, `“Parolimni qanday tiklayman?”`],
        [`<b>assistant</b>`, `Modelning oldingi javoblari`, `“Qaysi tizim uchun, iltimos?”`]
      ] },
      { type: 'p', html: `System promptni yaxshi yozish — 3-bob (Prompt engineering) mavzusi.` }
    ] },
    { id: 'stateless', title: `API hech narsani eslamaydi`, blocks: [
      { type: 'p', html: `Anthropic hujjatlari aniq aytadi: Messages API <b>stateless</b> — siz har safar butun suhbat tarixini yuborasiz. Model oldingi so‘rovni “eslab qolmaydi”.` },
      { type: 'bars', title: `Har so‘rovda yuboriladigan matn (sxema)`, max: 6, items: [
        { label: `1-so‘rov`, value: 2, text: `2 xabar` },
        { label: `2-so‘rov`, value: 4, text: `4 xabar` },
        { label: `3-so‘rov`, value: 6, text: `6 xabar` }
      ], caption: `Har bir yangi so‘rovga system + oldingi barcha user va assistant xabarlari qayta qo‘shiladi va ularning tokenlari yana to‘lanadi.` },
      { type: 'note', tone: 'key', html: `Uzun suhbat = har so‘rovda ko‘proq token. Yechimlar: prompt caching (pastda), eski xabarlarni qisqartirish yoki xulosalash (4-bob, compaction).` },
      { type: 'p', html: `Anthropic’da beta “message threads” funksiyasi bilan faqat yangi xabarni yuborish mumkin, lekin thread oxirgi so‘rovdan 5 daqiqa o‘tib tugaydi va <b>narx o‘zgarmaydi</b> — butun tarix tokenlari baribir to‘lanadi.` }
    ] },
    { id: 'stream', title: `Streaming, limitlar va xatolar`, blocks: [
      { type: 'cards', items: [
        { tag: `Streaming`, title: `Token-token javob`, html: `So‘rovda <code>stream: true</code> bo‘lsa, javob server-sent events (SSE) orqali bo‘lak-bo‘lak keladi. Foydalanuvchi birinchi so‘zni tez ko‘radi.` },
        { tag: `Rate limit`, title: `429 xatosi`, html: `Daqiqasiga so‘rov (RPM) va token (TPM) cheklovi. Yechim: kutib, qayta urinish. Lekin balans yoki oylik limit tugaganda ham 429 keladi.` },
        { tag: `Xato kodlari`, title: `Nimani bildiradi`, html: `400 — so‘rov noto‘g‘ri · 401 — kalit xato · 429 — limit · 5xx — server muammosi` }
      ] },
      { type: 'list', items: [
        `Anthropic limitlarni RPM, kirish tokenlari (ITPM) va javob tokenlari (OTPM) bo‘yicha daqiqasiga o‘lchaydi; OpenAI — RPM, RPD, TPM, TPD.`,
        `Vaqtinchalik 429 da ko‘pincha <code>retry-after</code> sarlavhasi bo‘ladi. OpenAI tavsiyasi: exponential backoff — har urinishda kutish vaqtini oshirib, tasodifiy kechikish (jitter) qo‘shish.`,
        `Balans yoki oylik xarajat limiti tugagan bo‘lsa (Anthropic’da retry-after bo‘lmaydi, OpenAI’da “exceeded your current quota”), qayta urinish yordam bermaydi — hisobni to‘ldirish kerak.`
      ] }
    ] },
    { id: 'save', title: `Pulni qanday tejash mumkin`, blocks: [
      { type: 'stats', items: [
        { value: `≤ 10%`, label: `Prompt caching: takrorlanadigan qism keshdan o‘qilsa, kirish narxining 10% yoki undan kamrog‘i` },
        { value: `−50%`, label: `Batch API: darhol javob kerak bo‘lmagan ishlar uchun` },
        { value: `80×`, label: `Kichik model: Haiku 5.5 va Fable 5.2 narxi orasidagi farq` },
        { value: `3–8×`, label: `Javob tokeni kirishdan qimmat (Claude va GPT’da 5×) — keraksiz uzun javob so‘ramang` }
      ] },
      { type: 'table', head: [`Kesh o‘qish narxi`, `Kirish narxiga nisbatan`], num: [1], rows: [
        [`Ko‘p Claude modellari`, `10%`], [`Claude Opus 5.5, Sonnet 5.5`, `5%`], [`Claude Fable 5.2`, `2.5%`], [`GPT-6 Astra`, `10%`], [`GPT-6.1 Sol, Terra`, `5%`]
      ], caption: `Batch chegirmasi (50%): Anthropic, OpenAI (Batch va Flex), Google, Mistral. Anthropic’da kesh o‘qishlari ITPM limitiga ham hisoblanmaydi.` }
    ] },
    { id: 'compat', title: `Bitta format — ko‘p provayder`, blocks: [
      { type: 'p', html: `OpenAI API formati amalda standartga aylangan: ko‘p xizmatlar uni qabul qiladi. Provayderni almashtirish uchun ko‘pincha faqat <b>manzil (base URL)</b>, kalit va model nomi o‘zgaradi.` },
      { type: 'table', head: [`Xizmat`, `OpenAI-compatible base URL`], rows: [
        [`DeepSeek`, `<code>https://api.deepseek.com</code>`],
        [`Google Gemini`, `<code>https://generativelanguage.googleapis.com/v1beta/openai/</code>`],
        [`Hugging Face`, `<code>https://router.huggingface.co/v1</code>`],
        [`Ollama (lokal)`, `<code>http://localhost:11434/v1</code>`],
        [`LM Studio (lokal)`, `<code>http://localhost:1234/v1</code>`]
      ], caption: `OpenRouter, vLLM va llama.cpp server ham shu formatda ishlaydi. DeepSeek va Meta Anthropic formatini ham qabul qiladi.` },
      { type: 'note', tone: 'info', html: `OpenAI kutubxonasi API kalitni talab qiladi, Ollama esa uni e’tiborsiz qoldiradi — istalgan matn bo‘laveradi. “Mos” degani 100% bir xil degani emas: ba’zi parametr va funksiyalar provayderga qarab farq qiladi.` }
    ] },
    { id: 'routers', title: `Routerlar: bitta kalit — ko‘p model`, blocks: [
      { type: 'cards', items: [
        { tag: `openrouter.ai`, title: `OpenRouter`, html: `Ko‘p provayderlarning modellari bitta API orqali. Token narxiga ustama qo‘shilmaydi; pul kredit sotib olishda komissiya sifatida olinadi. Bepul modellar kuniga 50 so‘rov bilan cheklangan (kamida 10 kredit sotib olinsa — 1000).` },
        { tag: `huggingface.co`, title: `HF Inference Providers`, html: `Bitta Hugging Face token bilan Groq, Together, Cerebras va boshqa provayderlar. Provayder narxiga ustama yo‘q. Ochiq modellar uchun qulay.` }
      ] },
      { type: 'note', tone: 'warn', html: `Routerlar modellarni tez solishtirish va zaxira provayder uchun qulay. Lekin ma’lumotingiz uchinchi tomon orqali o‘tadi — maxfiy ma’lumot yuborishdan oldin router va asosiy provayderning maxfiylik siyosatini o‘qing.` }
    ] },
    { id: 'local', title: `Modelni o‘z kompyuteringizda ishlatish`, blocks: [
      { type: 'table', head: [`Vosita`, `Nima`, `Kim uchun`], rows: [
        [`<b>Ollama</b>`, `Terminal va lokal server, modellar kutubxonasi`, `Tez boshlash`],
        [`<b>LM Studio</b>`, `Grafik ilova: macOS, Windows, Linux. GGUF, Apple Silicon’da MLX`, `Kod yozmasdan sinash`],
        [`<b>Hugging Face</b>`, `Modellar ombori: model card’lar, GGUF fayllar`, `Model topish va yuklash`],
        [`<b>llama.cpp</b>`, `C/C++ tilidagi inference dvigateli`, `LM Studio va boshqa ko‘p lokal vositalar ichida ishlatiladi`],
        [`<b>vLLM</b>`, `Yuqori o‘tkazuvchanlikka ega server`, `Ko‘p foydalanuvchili production`]
      ] },
      { type: 'list', items: [
        `Ollama standart holatda <code>127.0.0.1:11434</code> da ishlaydi (<code>OLLAMA_HOST</code> bilan o‘zgartiriladi).`,
        `<b>GGUF</b> — model vaznlari va metama’lumotlarini bitta faylda saqlaydigan format.`,
        `Lokal ishlatilganda ma’lumot kompyuterdan chiqmaydi — maxfiy ma’lumotlar uchun eng xavfsiz yo‘l.`
      ] },
      { type: 'note', tone: 'warn', html: `Ollama kutubxonasidagi <b>“cloud”</b> tegli modellar so‘rovni kompyuteringizdan tashqariga yuboradi. Lokal deb o‘ylab maxfiy ma’lumot bermang.` }
    ] },
    { id: 'memory', title: `Qancha xotira kerak`, blocks: [
      { type: 'note', tone: 'key', title: `Formula`, html: `Xotira ≈ parametrlar soni × bitta vazn hajmi + KV cache (kontekst uchun) + runtime` },
      { type: 'table', head: [`Format`, `Bit / vazn`, `8B model`], num: [1, 2], rows: [
        [`<b>F16</b>`, `16`, `≈ 16 GB`],
        [`<b>Q8_0</b>`, `≈ 8.5`, `≈ 8.5 GB`],
        [`<b>Q6_K</b>`, `6.56`, `≈ 6.6 GB`],
        [`<b>Q4_K_M</b> (Ollama standarti)`, `≈ 4.9`, `≈ 4.9 GB`]
      ], caption: `Manba: Q6_K — Hugging Face GGUF hujjati; Q8_0 va Q4_K_M — llama.cpp quantize jadvali (Llama-3.1-8B: Q4_K_M = 4.58 GiB).` },
      { type: 'p', html: `KV cache kontekst uzunligiga qarab o‘sadi: Llama-3-8B sinfidagi model uchun FP16’da taxminan 128 KB/token, ya’ni 8K token ≈ 1 GB.` },
      { type: 'table', head: [`GPU xotirasi`, `Q4_K_M formatida taxminiy model o‘lchami`], rows: [[`8 GB`, `7–9B`], [`16 GB`, `14–20B`], [`24 GB`, `27–32B`]], caption: `Formula bo‘yicha taxminiy hisob (≈ 0.61 bayt/vazn), KV cache va runtime uchun joy qoldirilgan. Uzun kontekst ko‘proq xotira talab qiladi.` },
      { type: 'note', tone: 'info', html: `Model GPU’ga to‘liq sig‘masa, bir qismi CPU’da ishlaydi va tezlik keskin pasayadi. Boshqa dasturlar ham GPU xotirasini band qilishini hisobga oling.` }
    ] },
    { id: 'privacy', title: `Ma’lumotingiz qayerga ketadi`, blocks: [
      { type: 'table', head: [`Xizmat`, `Ma’lumot modelni o‘qitishda ishlatiladimi?`], rows: [
        [`<b>Anthropic API</b>`, `Yo‘q (standart holatda)`],
        [`<b>OpenAI API</b>`, `Yo‘q (o‘zingiz rozilik bermasangiz); suiiste’mol loglari 30 kungacha saqlanadi`],
        [`<b>Gemini API · bepul tarif</b>`, `Ha, va odamlar (taqrizchilar) o‘qishi mumkin`],
        [`<b>Gemini API · pullik tarif</b>`, `Yo‘q`],
        [`<b>DeepSeek</b>`, `Ma’lumot Xitoyda saqlanadi, o‘qitishda ishlatilishi mumkin (voz kechish imkoni bor)`],
        [`<b>Lokal (Ollama, LM Studio)</b>`, `Kompyuteringizdan chiqmaydi`]
      ], caption: `2026-yil noyabr holatiga. Manba: provayderlarning maxfiylik siyosati va API shartlari.` },
      { type: 'note', tone: 'warn', html: `API va iste’molchi ilovalari (Claude.ai, ChatGPT) uchun qoidalar boshqa. Masalan, Claude’ning Free/Pro/Max foydalanuvchilarida sozlama yoqilgan bo‘lsa, suhbatlar o‘qitishda ishlatiladi. Google o‘zi bepul tarifga maxfiy ma’lumot yubormaslikni so‘raydi.` },
      { type: 'p', html: `Ko‘p davlatlarda shaxsiy ma’lumotlarni chet elga yuborish va saqlash bo‘yicha qonunlar bor (masalan, Yevropa Ittifoqida GDPR). Real mahsulotda foydalanuvchilar ma’lumotini API’ga yuborishdan oldin o‘z mamlakatingiz talablarini tekshiring.` }
    ] },
    { id: 'choose', title: `Model tanlash: 4 ta savol`, blocks: [
      { type: 'table', head: [`Savol`, `Javob “ha” bo‘lsa`], rows: [
        [`Ma’lumot maxfiymi?`, `Lokal yoki o‘z serveringizdagi ochiq model`],
        [`Vazifa murakkabmi (reasoning, kod, agent)?`, `Flagship model`],
        [`So‘rovlar ko‘p, vazifa oddiymi?`, `Kichik model`],
        [`Javob tez kerakmi?`, `Kichik model + streaming`]
      ] },
      { type: 'bars', title: `Artificial Analysis Intelligence Index`, max: 70, items: [
        { label: `Claude Fable 5.2`, value: 65 },
        { label: `Gemini 4 Carbon`, value: 60 },
        { label: `Claude Opus 5.5`, value: 59 },
        { label: `GPT-6 Astra`, value: 57 },
        { label: `Gemini 4 Argon`, value: 50 }
      ], caption: `2026-yil 12-noyabr, eng yuqori reasoning rejimida. Gemini 4 Carbon — cheklangan kirish; hammaga ochiq Gemini 4 Argon — 50.` },
      { type: 'list', items: [
        `<b>Arena</b> (sobiq LMArena, arena.ai) — odamlar ikki javobdan yaxshisini tanlaydigan reyting.`,
        `Ehtiyot bo‘ling: benchmark savollari o‘qitish ma’lumotiga “sizib” kirishi mumkin (contamination). Provayderning o‘z da’volari mustaqil tekshirilmagan bo‘lishi mumkin.`,
        `Eng ishonchli yo‘l — o‘z vazifangizdagi 20–50 ta real misolda solishtirish (9-bob).`
      ] }
    ] },
    { id: 'cost', title: `Amalda: 10 000 savol/kun qancha turadi`, blocks: [
      { type: 'p', html: `1-bobdagi ichki yordamchi botni davom ettiramiz: kuniga 10M kirish va 3M javob tokeni (har savolga 1 000 + 300).` },
      { type: 'table', head: [`Model`, `Kuniga`, `Oyiga (30 kun)`], num: [1, 2], rows: [
        [`Claude Haiku 5.5`, `$2.50`, `$75`],
        [`GPT-6 Luna`, `$2.50`, `$75`],
        [`Qwen3.8-Flash`, `$2.91`, `$87`],
        [`DeepSeek V4.1 Flash (peak)`, `$6.60`, `$198`],
        [`GPT-6.1 Terra`, `$25`, `$750`],
        [`Claude Sonnet 5.5`, `$50`, `$1 500`],
        [`Claude Opus 5.5`, `$100`, `$3 000`]
      ], caption: `Formula: kuniga = 10 × kirish narxi + 3 × javob narxi. Masalan, Sonnet 5.5: 10 × $2 + 3 × $10 = $50. Caching, batch va thinking tokenlarsiz hisoblangan.` },
      { type: 'note', tone: 'warn', html: `Haiku 5.5 va GPT-6 Luna’da thinking standart holatda yoqilgan — haqiqiy xarajat yuqoriroq bo‘ladi, agar effort’ni pasaytirmasangiz yoki thinking’ni o‘chirmasangiz.` },
      { type: 'note', tone: 'key', title: `Aqlli yechim: routing`, html: `Kichik model xabarni tasniflaydi va oddiy savollarga o‘zi javob beradi. Faqat murakkab holatlar katta modelga yuboriladi. Sifat yuqori qoladi, xarajat esa kichik modelga yaqin bo‘ladi.` }
    ] }
  ],
  mistakes: [
    [`“GPT-6 — bitta model”`, `GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna.`],
    [`“API suhbatni eslab qoladi”`, `Stateless: tarix har safar qayta yuboriladi va to‘lanadi.`],
    [`“Bepul Gemini API maxfiy”`, `Bepul tarifda ma’lumot o‘qitishda ishlatiladi va odamlar ko‘rishi mumkin.`],
    [`“Meta = ochiq Llama”`, `Hozirgi Muse modellari asosan yopiq.`],
    [`“Q4 model = parametr × 0.5 bayt”`, `Q4_K_M ≈ 0.61 bayt/vazn, ustiga KV cache va runtime.`],
    [`“429 bo‘lsa, kutib qayta urinish yetadi”`, `Balans yoki oylik limit tugagan bo‘lsa, faqat hisobni to‘ldirish yordam beradi.`],
    [`“Narxlar o‘zgarmaydi”`, `Gemini 4 Argon 1-dekabrdan, Gemini 3.8 Flash 2027-yil 1-yanvardan 2× qimmat. Doim rasmiy sahifani tekshiring.`]
  ],
  lab: [
    { type: 'p', html: `Bitta savolni bir nechta modelda solishtirasiz va lokal modelning xotira sarfini o‘lchaysiz. Ikkita vazifa:` },
    { type: 'cards', items: [
      { tag: `1-vazifa · tasniflash`, title: `Nosozlik, savol yoki so‘rov?`, html: `“Noutbukim Wi-Fi’ga ulanmayapti!” Faqat bitta so‘z bilan javob berish so‘ralsin.` },
      { tag: `2-vazifa · matn yozish`, title: `Javob xati`, html: `Xodimga 2 gapda xushmuomala javob: murojaati qabul qilinganini va ertaga hal qilinishini aytish.` }
    ] },
    { type: 'steps', items: [
      `<b>Bulutda:</b> openrouter.ai/chat ga kiring. U yerda bir nechta modelni tanlab, bitta xabarni hammasiga birdan yuborish va javoblarni yonma-yon ko‘rish mumkin. Chat uchun kredit kerak bo‘lishi mumkin — hisobingizda tekshiring.`,
      `Uch xil darajadagi modelni tanlang (kichik, o‘rta, katta) va ikkala vazifani bering.`,
      `Jadval tuzing: model, daraja, 1-vazifa to‘g‘rimi, 2-vazifa sifati (1–5), narx ($/1M token — model sahifasidan).`,
      `<b>Lokal:</b> xuddi shu ikki vazifani Ollama’da bering, keyin boshqa terminalda <code>ollama ps</code> bilan PROCESSOR ustunini ko‘ring: model GPU’da qancha, CPU’da qancha ishlayapti.`
    ] },
    { type: 'term', lines: [
      `$ ollama run <model> --verbose`,
      `# boshqa terminalda:`,
      `$ ollama ps`
    ] },
    { type: 'note', tone: 'key', html: `Nimani kuzatish kerak: tasniflash kabi oddiy vazifada kichik model ham ko‘pincha yetarli, erkin matn yozishda esa katta modellar odatda ancha tabiiy yozadi. Buni o‘z jadvalingizda tekshiring.` }
  ],
  quiz: [
    { q: `Ikkinchi xabarni yuborganda oldingi suhbatni ham yuborish kerakmi?`, options: [`Yo‘q, API eslab qoladi`, `Ha, chunki API stateless`, `Faqat system promptni`], answer: 1, explain: `Messages API stateless: har so‘rovda butun tarix yuboriladi va uning tokenlari yana to‘lanadi.` },
    { q: `Maxfiy tibbiy ma’lumot bilan ishlash uchun eng xavfsiz variant qaysi?`, options: [`Bepul Gemini API`, `Router orqali eng arzon model`, `Lokal model`], answer: 2, explain: `Lokal modelda ma’lumot kompyuterdan chiqmaydi. Bepul Gemini tarifida ma’lumot o‘qitishda ishlatiladi va odamlar ko‘rishi mumkin.` },
    { q: `8B model Q4_K_M formatida taxminan qancha xotira oladi (KV cache’siz)?`, options: [`≈ 5 GB`, `≈ 16 GB`, `≈ 1 GB`], answer: 0, explain: `Q4_K_M ≈ 4.9 bit ≈ 0.61 bayt × 8 mlrd ≈ 4.9 GB. 16 GB — F16 formati.` },
    { q: `Ollama’ning OpenAI-compatible manzili qaysi?`, options: [`http://localhost:11434/v1`, `https://api.openai.com/v1`, `http://localhost:1234/v1`], answer: 0, explain: `localhost:1234 — LM Studio serverining standart manzili.` },
    { q: `Kuniga 10M kirish va 3M javob tokeni Claude Sonnet 5.5’da ($2 / $10) qancha turadi?`, options: [`$12`, `$50`, `$500`], answer: 1, explain: `10 × $2 + 3 × $10 = $20 + $30 = $50.` }
  ],
  summary: [
    `Model tanlash — sifat, narx, tezlik va maxfiylik o‘rtasidagi kelishuv. Bir provayderning o‘zida narx 80× farq qiladi.`,
    `API stateless va tokenda o‘lchanadi. Caching, batch, kichik model va qisqa javob bilan tejang.`,
    `Lokal model maxfiylik uchun eng xavfsiz yo‘l. Model o‘lchamini GPU xotirangizga qarab formula bilan hisoblang; kichik lokal modellar sifati odatda katta modellardan past.`
  ],
  glossary: [
    [`API`, `Dasturlar bir-biri bilan gaplashadigan interfeys; bu yerda — modelga HTTPS orqali so‘rov yuborish usuli.`],
    [`Stateless`, `Server oldingi so‘rovlarni eslamaydi; har so‘rov o‘zi to‘liq bo‘lishi kerak.`],
    [`Streaming (SSE)`, `Javobni tayyor bo‘lishini kutmasdan bo‘lak-bo‘lak olish.`],
    [`Rate limit`, `Vaqt birligidagi so‘rov yoki token cheklovi; oshsa — 429.`],
    [`Prompt caching`, `Takrorlanadigan kirish qismini keshlab, arzonroq o‘qish.`],
    [`Batch API`, `So‘rovlarni to‘plab, kechroq va 50% arzonroq bajarish.`],
    [`OpenAI-compatible`, `OpenAI API formatini qabul qiluvchi xizmat.`],
    [`Router`, `Bir nechta provayderning modellarini bitta API orqali beruvchi xizmat.`],
    [`GGUF`, `Lokal modellar uchun fayl formati (vaznlar + metama’lumot).`],
    [`Kvantlash (quantization)`, `Vazn aniqligini kamaytirib, model hajmini qisqartirish (masalan, Q4_K_M).`],
    [`KV cache`, `Kontekst uchun saqlanadigan oraliq hisoblar; kontekst uzaygan sari o‘sadi.`],
    [`Routing`, `So‘rovni vazifaga qarab mos modelga yo‘naltirish.`]
  ],
  sources: [
    { label: `Anthropic — Models overview`, url: `https://platform.claude.com/docs/en/about-claude/models/overview` },
    { label: `Anthropic — Pricing`, url: `https://platform.claude.com/docs/en/about-claude/pricing` },
    { label: `Anthropic — Working with messages`, url: `https://platform.claude.com/docs/en/build-with-claude/working-with-messages` },
    { label: `Anthropic — Message threads`, url: `https://platform.claude.com/docs/en/build-with-claude/message-threads` },
    { label: `Anthropic — Rate limits`, url: `https://platform.claude.com/docs/en/api/rate-limits` },
    { label: `OpenAI — Models va Pricing`, url: `https://developers.openai.com/api/docs/pricing` },
    { label: `OpenAI — Rate limits`, url: `https://developers.openai.com/api/docs/guides/rate-limits` },
    { label: `OpenAI — Your data`, url: `https://developers.openai.com/api/docs/guides/your-data` },
    { label: `Google AI Studio — Pricing`, url: `https://aistudio.google.com/docs/pricing` },
    { label: `Google AI Studio — Terms`, url: `https://aistudio.google.com/docs/terms` },
    { label: `DeepSeek — Pricing`, url: `https://api-docs.deepseek.com/quick_start/pricing` },
    { label: `Alibaba Cloud — Model Studio pricing`, url: `https://www.alibabacloud.com/help/en/model-studio/model-pricing` },
    { label: `Meta — Pricing and rate limits`, url: `https://dev.meta.ai/docs/pricing-rate-limits` },
    { label: `Mistral — Pricing`, url: `https://docs.mistral.ai/inference/pricing` },
    { label: `OpenRouter — FAQ`, url: `https://openrouter.ai/docs/faq` },
    { label: `Hugging Face — Inference Providers`, url: `https://huggingface.co/docs/inference-providers/index` },
    { label: `Hugging Face — GGUF`, url: `https://huggingface.co/docs/hub/gguf` },
    { label: `llama.cpp — quantize`, url: `https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md` },
    { label: `Ollama — FAQ`, url: `https://docs.ollama.com/faq` },
    { label: `Ollama — OpenAI compatibility`, url: `https://docs.ollama.com/api/openai-compatibility` },
    { label: `LM Studio — Docs`, url: `https://lmstudio.ai/docs/app` },
    { label: `Artificial Analysis — Leaderboard`, url: `https://artificialanalysis.ai/leaderboards/models` }
  ]
};
