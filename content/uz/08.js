window.BOOK.content.uz['08'] = {
  lead: `Zamonaviy modellar faqat matn bilan cheklanmaydi: ular rasm va PDF o‘qiydi, ba’zilari audio va videoni ham tushunadi. Alohida modellar esa rasm, video va ovoz yaratadi. Bu bobda qaysi model nimani qabul qilishini, rasm qanday tokenga aylanishini, vision qayerda adashishini, rasm va video yaratishni, nutqni matnga va matnni nutqqa aylantirishni o‘rganasiz.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: lokal vision`],
  goals: [
    `Qaysi model qaysi turdagi ma’lumotni qabul qiladi va qaytaradi`,
    `Rasm qanday tokenga aylanadi va narxi qanday hisoblanadi`,
    `Vision’ning kuchli va zaif tomonlari`,
    `Rasm va video yaratish, nutqdan matnga va matndan nutqqa (2026-yil noyabr holati)`
  ],
  sections: [
    { id: 'what', title: `Multimodal nima`, blocks: [
      { type: 'p', html: `<b>Modallik</b> — ma’lumot turi: matn, rasm, audio, video. Multimodal model bir nechta turdagi kirishni qabul qiladi yoki bir nechta turdagi natija yaratadi. Kirish va chiqish odatda har xil bo‘ladi: ko‘p modellar rasmni <b>o‘qiydi</b>, lekin <b>yaratmaydi</b>.` },
      { type: 'table', head: [`Model`, `Qabul qiladi`, `Qaytaradi`], rows: [
        [`Claude (Opus 5.5 va boshqalar)`, `Matn, rasm, PDF`, `Matn`],
        [`GPT-6 Astra`, `Matn, rasm`, `Matn`],
        [`Gemini 4 Argon`, `Matn, rasm, video, audio, PDF`, `Matn`],
        [`Ochiq vision modellar (Ollama’da)`, `Matn, rasm`, `Matn`]
      ], caption: `2026-yil noyabr holatiga. Rasm, video va ovoz yaratish uchun alohida modellar ishlatiladi (pastda).` }
    ] },
    { id: 'tokens', title: `Rasm ham tokenga aylanadi`, blocks: [
      { type: 'p', html: `Model rasmni kichik kvadrat bo‘laklarga (patch) bo‘lib o‘qiydi, har bir bo‘lak — token. Shuning uchun katta rasm ko‘proq token va ko‘proq pul talab qiladi.` },
      { type: 'table', head: [`Provayder`, `Hisob usuli`], rows: [
        [`Claude`, `tokenlar = ⌈eni / 28⌉ × ⌈bo‘yi / 28⌉. Claude 4.7+ modellarda uzun tomon 2 576 px gacha (maks. 4 784 token), eski modellarda 1 568 px gacha`],
        [`OpenAI`, `32×32 patch’lar soni × model koeffitsienti (GPT-6 Astra’da 1.2); <code>detail</code> sozlamasi bilan boshqariladi`],
        [`Gemini`, `Gemini 4 va 3: rasm boshiga <code>media_resolution</code> bo‘yicha belgilangan byudjet — low 280, medium 560, high (standart) 1 120, ultra_high 2 240 token. Eski modellarda: 384 px gacha — 258 token, kattasi 768×768 bo‘laklar, har biri 258 token`]
      ], caption: `Manba: provayderlarning vision hujjatlari, 2026-yil noyabr.` },
      { type: 'stats', items: [
        { value: `1 296`, label: `token — 1000×1000 rasm, Claude (36 × 36 patch)` },
        { value: `2 691`, label: `token — 1920×1080 skrinshot, Claude 4.7+ (69 × 39)` },
        { value: `726`, label: `token — 900×600 rasm, Claude formulasi bo‘yicha (33 × 22)` }
      ] },
      { type: 'note', tone: 'key', html: `Rasmni yuborishdan oldin kerakli o‘lchamga kichraytiring. Mayda matn o‘qilishi kerak bo‘lsa, rasmni kesib, kerakli qismini yuboring — butun skrinshotni emas. PDF’da Claude har sahifani matn sifatida ham, rasm sifatida ham o‘qiydi: matn uchun sahifasiga taxminan 1 500–3 000 token, ustiga rasm narxi.` }
    ] },
    { id: 'limits', title: `Vision qayerda adashadi`, blocks: [
      { type: 'p', html: `Provayderlar hujjatlarida qayd etilgan zaif tomonlar:` },
      { type: 'list', items: [
        `<b>Sanash</b> — ko‘p mayda obyektlarni aniq sanash taxminiy bo‘ladi.`,
        `<b>Joylashuv</b> — aniq koordinatalar, masalan shaxmat donalari o‘rni, taxminiy.`,
        `<b>Sifat</b> — burilgan, xira yoki juda kichik (200 px dan kichik) rasmlar, mayda matn.`,
        `<b>Lotin bo‘lmagan yozuvlar</b> — OpenAI buni alohida ta’kidlaydi.`,
        `Claude rasm AI yaratganmi yoki yo‘qligini aniqlay olmaydi va rasmdagi odamlarni nomlab berishni rad etadi.`
      ] },
      { type: 'note', tone: 'warn', html: `Model rasmni to‘g‘ri o‘qib, noto‘g‘ri xulosa chiqarishi mumkin — masalan, chekdagi qator summasini dona narxi deb talqin qilishi. Hujjatlardan ma’lumot ajratishda modeldan faqat <b>ko‘rganini</b> yozishni so‘rang, hisob-kitobni esa kodda o‘zingiz qiling.` }
    ] },
    { id: 'imagegen', title: `Rasm yaratish`, blocks: [
      { type: 'p', html: `Ko‘p rasm modellari <b>diffusion</b> usuliga asoslanadi: model tasodifiy shovqindan boshlab, uni qadam-baqadam “tozalab”, rasmga keltiradi (Ho va b., 2020); matn tavsifi bu jarayonni yo‘naltiradi. <b>Latent diffusion</b> (Rombach va b., 2022) bu jarayonni piksellarda emas, siqilgan “yashirin” fazoda bajaradi — shuning uchun tezroq; Stable Diffusion shu g‘oyaga qurilgan.` },
      { type: 'flow', items: [
        { title: `Shovqin` },
        { title: `Qadam-baqadam tozalash`, text: `Matn tavsifi yo‘naltiradi` },
        { title: `Tayyor rasm` }
      ] },
      { type: 'table', head: [`Provayder`, `Joriy modellar (2026-yil noyabr)`], rows: [
        [`OpenAI`, `GPT-Image-2.6 Sunburst (batafsil ish) va Flare (tez iteratsiya). gpt-image-1 2026-yil oktabrda yopilgan`],
        [`Google`, `Nano Banana 2.1 va boshqa Nano Banana modellari. Imagen yopilgan`],
        [`Black Forest Labs`, `FLUX 3 Image; FLUX 3 Image Klein — ochiq vaznli`]
      ] },
      { type: 'note', tone: 'info', title: `Kelib chiqishni belgilash`, html: `Google yaratgan barcha rasmlarda <b>SynthID</b> ko‘rinmas suv belgisi bor. OpenAI rasmlariga ham C2PA metama’lumoti va SynthID qo‘shiladi. Metama’lumot oson o‘chadi (masalan, skrinshot bilan), suv belgisi odatda chidamliroq. Lekin belgi yo‘qligi rasm haqiqiy ekanini isbotlamaydi.` }
    ] },
    { id: 'video', title: `Video yaratish: tez o‘zgaruvchi soha`, blocks: [
      { type: 'p', html: `Video modellar juda tez almashmoqda. Masalan, 2026-yilning o‘zida:` },
      { type: 'list', items: [
        `OpenAI <b>Sora 2</b> va Videos API 2026-yil 24-sentabrda yopildi.`,
        `Gemini API’dagi <b>Veo 3.1 Preview</b> 2026-yil 22-oktabrda yopildi. Hozirgi model — <b>Gemini Omni Flash</b>: ovozi bilan birga 3–15 soniyalik kliplar.`,
        `<b>Runway</b>: Gen-4.5 (yaratish) va Aleph 2.0 (videoni tahrirlash) modellari.`
      ] },
      { type: 'note', tone: 'warn', html: `Video mavzusidagi maqola va darsliklar bir necha oyda eskiradi. Model nomini doim provayderning rasmiy hujjatidan tekshiring.` }
    ] },
    { id: 'stt', title: `Nutqdan matnga (speech-to-text)`, blocks: [
      { type: 'p', html: `<b>Whisper</b> (Radford va b., 2022) — OpenAI’ning ochiq nutqni aniqlash modeli. 680 000 soatlik audioda o‘qitilgan, kodi va vaznlari MIT litsenziyasida. O‘lchamlari: tiny (39M) dan large (1 550M) gacha; <b>turbo</b> (809M) — large-v3’ning tezlashtirilgan varianti. Uni o‘z kompyuteringizda bepul ishlatish mumkin.` },
      { type: 'table', head: [`Xizmat`, `Joriy modellar`], rows: [
        [`OpenAI API`, `<code>gpt-transcribe</code> (tavsiya etilgan), real vaqt uchun <code>gpt-live-transcribe</code>. whisper-1 va gpt-4o-transcribe eskirgan, 2027-yil 26-fevralda yopiladi`],
        [`Deepgram`, `Flux (real vaqt, gap navbatini aniqlash), Nova-3`],
        [`ElevenLabs`, `Scribe v3 (kim gapirayotganini ajratish bilan), 90+ til`]
      ], caption: `2026-yil noyabr holatiga.` },
      { type: 'p', html: `Sifat odatda <b>WER</b> (word error rate) bilan o‘lchanadi: (almashtirilgan + tushib qolgan + ortiqcha qo‘shilgan so‘zlar) ÷ asl matndagi so‘zlar soni. Kam — yaxshi. Kam resursli tillarda WER odatda sezilarli yuqori bo‘ladi — o‘z tilingizdagi audioda sinang.` }
    ] },
    { id: 'tts', title: `Matndan nutqqa va real vaqtdagi ovoz`, blocks: [
      { type: 'table', head: [`Xizmat`, `Joriy holat`], rows: [
        [`OpenAI`, `tts-1, tts-1-hd va gpt-4o-mini-tts eskirgan (2027-yil 6-yanvarda yopiladi); o‘rniga Realtime API’dagi gpt-realtime modellari`],
        [`OpenAI Realtime API`, `Umumiy foydalanishda (GA): to‘g‘ridan-to‘g‘ri ovozdan ovozga, brauzerda WebRTC, serverda WebSocket`],
        [`Google`, `Gemini 3.8 Flash TTS modellari; real vaqt uchun Gemini 3.8 Live`],
        [`ElevenLabs`, `Eleven v4 (eng ifodali), v4 Turbo (past kechikish)`],
        [`Ochiq modellar`, `Masalan, Kokoro-82M (Apache 2.0). Har bir modelning litsenziyasini tekshiring — ba’zilari tijoriy foydalanishni cheklaydi`]
      ], caption: `2026-yil noyabr holatiga.` },
      { type: 'note', tone: 'key', title: `Etika va qoidalar`, html: `OpenAI foydalanuvchiga ovoz AI tomonidan yaratilganini aytishni talab qiladi. Boshqa odamning ovozini nusxalash uchun uning <b>roziligi</b> kerak: OpenAI custom ovozlar uchun shu odamning o‘zi o‘qigan rozilik yozuvini so‘raydi. Ochiq model litsenziyasini ham tekshiring — ba’zilari tijoriy foydalanishni taqiqlaydi.` }
    ] }
  ],
  mistakes: [
    [`“Model rasmni bir butun ko‘radi, hajmi farq qilmaydi”`, `Rasm patch’larga bo‘linadi; katta rasm — ko‘p token va ko‘p pul.`],
    [`“Claude rasm tokeni = eni × bo‘yi / 750”`, `Bu eski formula. Hozir 28 px’lik patch’lar soni.`],
    [`“Rasmni to‘g‘ri o‘qidi — demak xulosa ham to‘g‘ri”`, `O‘qish to‘g‘ri bo‘lsa ham, talqin va hisob-kitob xato bo‘lishi mumkin.`],
    [`“Sora 2 yoki Gemini API’dagi Veo 3.1 Preview’dan foydalanaman”`, `Ikkalasi ham 2026-yilda yopilgan (Sora 2 — 24-sentabr, Veo 3.1 Preview — 22-oktabr).`],
    [`“whisper-1 va tts-1 — joriy modellar”`, `Ikkalasi eskirgan; yopilish sanalari belgilangan.`],
    [`“Suv belgisi yo‘q — demak rasm haqiqiy”`, `Belgi yo‘qligi hech narsani isbotlamaydi.`]
  ],
  lab: [
    { type: 'p', html: `Lokal model bilan rasm o‘qing. Kerak: Ollama va rasmni tushunadigan model (ollama.com/library’da “vision” belgili modellar). Rasm yo‘lini prompt ichiga yozing:` },
    { type: 'term', lines: [
      `$ ollama run <vision-model> "Bu rasmda nima yozilgan? ./rasm.png"`
    ] },
    { type: 'steps', items: [
      `O‘zingizning chek yoki hujjat rasmingizni oling (shaxsiy ma’lumotsiz).`,
      `Avval faqat ko‘rinadigan narsalarni so‘rang: raqamlar, nomlar, sanalar. Keyin hisob-kitob talab qiladigan savol bering. Qaysi turda xato ko‘proq?`,
      `Xuddi shu rasmni 25% o‘lchamga kichraytirib, qayta sinang. Mayda matn qachon o‘qilmay qoladi?`,
      `Ixtiyoriy: Whisper’ni o‘rnatib (<code>pip install -U openai-whisper</code>; tizimda ffmpeg ham kerak), o‘z ovozingizni yozib, matnga aylantiring: <code>whisper audio.mp3 --model turbo</code>. Xatolarni sanab, taxminiy WER hisoblang.`
    ] }
  ],
  quiz: [
    { q: `Claude’da 1000×1000 pikselli rasm taxminan necha token oladi?`, options: [`~1 300`, `~13 000`, `~130`], answer: 0, explain: `⌈1000/28⌉ × ⌈1000/28⌉ = 36 × 36 = 1 296 token.` },
    { q: `Claude hujjatlariga ko‘ra, vision qaysi vazifada faqat taxminiy natija beradi?`, options: [`Rasmni token sifatida o‘qishda`, `Ko‘p mayda obyektlarni sanashda`, `PDF qabul qilishda`], answer: 1, explain: `Claude hujjatlari sanash va aniq joylashuvni taxminiy deb belgilaydi.` },
    { q: `GPT-6 Astra qaysi turdagi kirishni qabul qiladi?`, options: [`Matn va rasm`, `Matn, rasm, audio va video`, `Faqat matn`], answer: 0, explain: `GPT-6 Astra: matn va rasm kiradi, matn chiqadi. Audio va video kirishi — Gemini 4 Argon’da.` },
    { q: `Whisper qanday litsenziyada tarqatiladi?`, options: [`Yopiq, faqat API orqali`, `MIT — kod va vaznlar ochiq`, `Faqat notijorat foydalanish uchun`], answer: 1, explain: `Whisper’ning kodi va vaznlari MIT litsenziyasida; uni lokal ishlatish mumkin.` },
    { q: `Boshqa odamning ovozini nusxalashdan oldin nima kerak?`, options: [`Hech narsa, ovoz ochiq ma’lumot`, `O‘sha odamning roziligi`, `Faqat yaxshi sifatli yozuv`], answer: 1, explain: `Rozilik shart; OpenAI custom ovozlar uchun shu odamning o‘zi o‘qigan rozilik yozuvini talab qiladi.` }
  ],
  summary: [
    `Ko‘p modellar rasm va PDF o‘qiydi, lekin yaratmaydi; audio va video kirishi faqat ba’zilarida (masalan, Gemini).`,
    `Rasm — token: o‘lchamini boshqaring. Vision ko‘rishda kuchli, sanash, joylashuv va xulosada zaifroq — hisobni kodda qiling.`,
    `Rasm, video va ovoz modellari juda tez almashadi (2026-yilda Sora 2, Veo 3.1 Preview, whisper-1, tts-1). Nomlarni rasmiy manbadan tekshiring.`
  ],
  glossary: [
    [`Modallik`, `Ma’lumot turi: matn, rasm, audio, video.`],
    [`Patch`, `Rasmning model token sifatida o‘qiydigan kichik kvadrat bo‘lagi.`],
    [`Diffusion`, `Shovqindan qadam-baqadam rasm yaratish usuli.`],
    [`Latent diffusion`, `Diffusion’ni siqilgan yashirin fazoda bajarish.`],
    [`SynthID`, `Google’ning AI kontentiga qo‘shiladigan ko‘rinmas suv belgisi.`],
    [`C2PA`, `Kontent kelib chiqishini metama’lumot orqali belgilash standarti.`],
    [`STT / ASR`, `Nutqni matnga aylantirish.`],
    [`TTS`, `Matnni nutqqa aylantirish.`],
    [`WER`, `So‘z xatolari ulushi — nutqni aniqlash sifati o‘lchovi.`]
  ],
  sources: [
    { label: `Anthropic — Vision`, url: `https://platform.claude.com/docs/en/build-with-claude/vision` },
    { label: `Anthropic — PDF support`, url: `https://platform.claude.com/docs/en/build-with-claude/pdf-support` },
    { label: `OpenAI — Images and vision`, url: `https://developers.openai.com/api/docs/guides/images-vision` },
    { label: `OpenAI — GPT-6 Astra`, url: `https://developers.openai.com/api/docs/models/gpt-6-astra` },
    { label: `Google — Gemini 4 Argon`, url: `https://aistudio.google.com/docs/models/gemini-4-argon` },
    { label: `Google — Image understanding`, url: `https://aistudio.google.com/docs/image-understanding` },
    { label: `OpenAI — Image generation`, url: `https://developers.openai.com/api/docs/guides/image-generation` },
    { label: `Google — Image generation`, url: `https://aistudio.google.com/docs/image-generation` },
    { label: `Black Forest Labs — Release notes`, url: `https://docs.bfl.ai/release-notes.md` },
    { label: `Ho va b., 2020 — DDPM`, url: `https://arxiv.org/abs/2006.11239` },
    { label: `Rombach va b., 2022 — Latent Diffusion`, url: `https://arxiv.org/abs/2112.10752` },
    { label: `Google DeepMind — SynthID`, url: `https://deepmind.google/models/synthid/` },
    { label: `OpenAI — C2PA va SynthID OpenAI rasmlarida`, url: `https://help.openai.com/en/articles/8912793` },
    { label: `Google — Media resolution`, url: `https://aistudio.google.com/docs/media-resolution` },
    { label: `OpenAI — Sora 2 (yopilgan)`, url: `https://developers.openai.com/api/docs/models/sora-2` },
    { label: `Google — Video generation`, url: `https://aistudio.google.com/docs/video` },
    { label: `Runway — Models`, url: `https://docs.dev.runwayml.com/guides/models/` },
    { label: `Radford va b., 2022 — Whisper`, url: `https://arxiv.org/abs/2212.04356` },
    { label: `OpenAI Whisper (GitHub)`, url: `https://github.com/openai/whisper` },
    { label: `OpenAI — Speech to text`, url: `https://developers.openai.com/api/docs/guides/speech-to-text` },
    { label: `OpenAI — Text to speech`, url: `https://developers.openai.com/api/docs/guides/text-to-speech` },
    { label: `OpenAI — Realtime API`, url: `https://developers.openai.com/api/docs/guides/realtime` },
    { label: `OpenAI — Custom voices`, url: `https://developers.openai.com/api/docs/guides/custom-voices` },
    { label: `Deepgram — Models`, url: `https://developers.deepgram.com/docs/models` },
    { label: `ElevenLabs — Models`, url: `https://elevenlabs.io/docs/overview/models` },
    { label: `Kokoro-82M`, url: `https://huggingface.co/hexgrad/Kokoro-82M` },
    { label: `Ollama — Vision`, url: `https://docs.ollama.com/capabilities/vision` }
  ]
};
