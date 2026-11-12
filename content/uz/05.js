window.BOOK.content.uz['05'] = {
  lead: `Embedding — matnni ma’nosini saqlagan holda sonlar ro‘yxatiga (vektorga) aylantirish. Ma’nosi yaqin matnlarning vektorlari ham yaqin bo‘ladi. Shu g‘oya semantik qidiruv, RAG, tavsiya tizimlari va klasterlashning asosida yotadi. Bu bobda embedding qanday ishlashini, qaysi modellar borligini, vektor bazalarni va qidiruvni qanday tezlashtirishni o‘rganasiz.`,
  minutes: 45,
  tags: [`Nazariya`, `Amaliyot: Ollama embed`],
  goals: [
    `Embedding, o‘lchamlar va o‘xshashlik o‘lchovlari (cosine, dot product)`,
    `Embedding modellarini tanlash: bulutdagi va lokal`,
    `Vektor bazalar: Pinecone, Qdrant, Chroma, Weaviate, pgvector va FAISS kutubxonasi`,
    `Tez qidiruv (HNSW, IVF) va hybrid search`
  ],
  sections: [
    { id: 'what', title: `Embedding nima`, blocks: [
      { type: 'p', html: `Embedding modeli matnni olib, uni qat’iy uzunlikdagi sonlar ro‘yxatiga aylantiradi, masalan 768 yoki 3072 ta son. Bu ro‘yxatni ko‘p o‘lchamli fazodagi nuqta deb tasavvur qiling: ma’nosi yaqin matnlar fazoda bir-biriga yaqin joylashadi.` },
      { type: 'flow', items: [
        { title: `Matn`, text: `“Pulimni qaytarib olsam bo‘ladimi?”` },
        { title: `Embedding modeli` },
        { title: `Vektor`, text: `[0.021, −0.113, 0.087, …] — 768 ta son` }
      ] },
      { type: 'p', html: `Yaqinlikni o‘lchashning asosiy usuli — <b>cosine similarity</b>: ikki vektor orasidagi burchak. Qiymat qancha katta bo‘lsa, ma’no shuncha yaqin. Mutlaq son modelga bog‘liq, shuning uchun natijalarni bir-biriga nisbatan solishtiring.` },
      { type: 'note', tone: 'info', html: `Ko‘p zamonaviy modellar (OpenAI, Voyage, Ollama’ning <code>/api/embed</code>) vektorlarni uzunligi 1 ga teng qilib qaytaradi (normalizatsiya). Bunday vektorlarda cosine similarity va dot product bir xil natija beradi, Evklid masofasi esa bir xil tartibni beradi. Vektorni o‘zingiz qisqartirsangiz, uni qayta normalizatsiya qilishingiz kerak.` }
    ] },
    { id: 'lang', title: `Til va soha muhim`, blocks: [
      { type: 'p', html: `Embedding modeli hamma tilda va hamma sohada bir xil yaxshi ishlamaydi. MTEB reytingi muallifi (Muennighoff va b., 2022) barcha vazifalarda birdek ustun bitta model yo‘qligini ko‘rsatgan. Kengaytirilgan MMTEB (2025) esa 250 dan ortiq tilda 500 dan ortiq vazifani o‘z ichiga oladi.` },
      { type: 'p', html: `Ko‘p tilli ishlar uchun maxsus modellar bor: masalan, BGE-M3 va EmbeddingGemma 100 dan ortiq tilni qo‘llaydi.` },
      { type: 'note', tone: 'key', html: `Xulosa: embedding modelini <b>o‘z tilingiz va o‘z ma’lumotingizda</b> sinamasdan tanlamang. 20–50 ta haqiqiy savol va ularga mos hujjatlardan kichik test to‘plami tuzing va bir nechta modelni solishtiring.` }
    ] },
    { id: 'models', title: `Embedding modellari (2026-yil noyabr)`, blocks: [
      { type: 'table', head: [`Model`, `O‘lcham`, `Kirish`, `Narx, $/1M token`], rows: [
        [`OpenAI text-embedding-3-small`, `1536`, `8 192`, `0.02`],
        [`OpenAI text-embedding-3-large`, `3072`, `8 192`, `0.13`],
        [`Google gemini-embedding-2 (multimodal)`, `128–3072`, `8 192`, `0.20`],
        [`Voyage 4 / 4-lite / 4-large`, `1024 (256–2048)`, `32K`, `0.06 / 0.02 / 0.12`],
        [`Cohere Embed 5`, `256–2048`, `128K`, `—`],
        [`Qwen3-Embedding 0.6B / 4B / 8B (ochiq)`, `1024 / 2560 / 4096`, `32K`, `lokal`],
        [`BGE-M3 (ochiq, MIT)`, `1024`, `8 192`, `lokal`],
        [`EmbeddingGemma 2 (ochiq, Apache 2.0, multimodal)`, `768 (128–768)`, `8K`, `lokal`]
      ], caption: `Manba: provayderlar hujjatlari va Hugging Face model sahifalari. Anthropic o‘z embedding modelini taklif qilmaydi va Voyage AI’ni tavsiya qiladi.` },
      { type: 'list', items: [
        `<b>Matryoshka embeddinglar</b> (Kusupati va b., 2022): vektorning boshidagi qismi ham mazmunli bo‘ladi, shuning uchun uni qisqartirish mumkin (masalan, 3072 → 768). Bu xotirani bir necha baravar tejaydi, sifat biroz pasayadi.`,
        `<b>MTEB</b> — embedding modellari reytingi. Uning asl maqolasidagi xulosa: barcha vazifalarda birdek ustun bitta model yo‘q. Reytingni boshlang‘ich nuqta deb oling va o‘z ma’lumotingizda sinang.`,
        `<b>Muhim qoida:</b> indekslash va qidiruvda bir xil modeldan foydalaning. Modelni almashtirsangiz, butun bazani qayta indekslash kerak.`
      ] }
    ] },
    { id: 'search', title: `Semantic search: kalit so‘zsiz qidirish`, blocks: [
      { type: 'p', html: `Oddiy qidiruv so‘zlarning mos kelishini qidiradi. Semantik qidiruv esa <b>ma’no</b>ni qidiradi: “Parolimni unutdim, nima qilay?” savoli “tiklash” so‘zi bo‘lmasa ham hisobni tiklash qoidasini topishi kerak.` },
      { type: 'flow', items: [
        { title: `1. Indekslash`, text: `Har bir hujjat → vektor → bazaga` },
        { title: `2. So‘rov`, text: `Savol → vektor (o‘sha model bilan)` },
        { title: `3. Qidiruv`, text: `Eng yaqin k ta vektor topiladi` },
        { title: `4. Natija`, text: `Mos hujjatlar o‘xshashlik bo‘yicha tartiblanadi` }
      ] },
      { type: 'note', tone: 'warn', html: `Semantik qidiruv aniq kodlar, mahsulot kodlari (SKU) yoki nomlarni (masalan, “ERR-4012”) yomon topadi. Kalit so‘z qidiruvi esa ularni oson topadi. Shuning uchun amalda ko‘pincha ikkalasi birga ishlatiladi — hybrid search.` }
    ] },
    { id: 'ann', title: `Millionlab vektorda tez qidiruv`, blocks: [
      { type: 'p', html: `Har bir so‘rovni bazadagi barcha vektorlar bilan solishtirish aniq, lekin million vektorda sekin. Shuning uchun <b>taxminiy eng yaqin qo‘shni</b> (ANN) indekslari ishlatiladi: ular biroz aniqlikdan voz kechib, ancha tezlik beradi.` },
      { type: 'cards', items: [
        { tag: `Eng mashhur`, title: `HNSW`, html: `Ko‘p qatlamli graf: avval “avtomagistral” bo‘ylab tez yaqinlashadi, keyin “ko‘chalar”da aniq qidiradi. Tez va aniq, lekin ko‘p xotira oladi (Malkov va Yashunin; preprint 2016, jurnal 2020).` },
        { tag: `Klasterlar`, title: `IVF`, html: `Vektorlarni guruhlarga bo‘ladi va faqat eng yaqin guruhlarni tekshiradi — avval kerakli javonni topib, keyin kitobni qidirishga o‘xshaydi.` },
        { tag: `Siqish`, title: `Product quantization`, html: `Vektorlarni siqib, xotirani keskin kamaytiradi, aniqlik biroz pasayadi (Jégou va b., 2011).` }
      ] },
      { type: 'p', html: `Asosiy murosa: <b>recall</b> (haqiqiy eng yaqinlarni topish ulushi), tezlik va xotira o‘rtasida. Indeks sozlamalari shu uchtasi orasidagi muvozanatni belgilaydi.` }
    ] },
    { id: 'dbs', title: `Vektor bazalar`, blocks: [
      { type: 'table', head: [`Vosita`, `Turi`, `Litsenziya`, `Xususiyati`], rows: [
        [`<b>Pinecone</b>`, `Boshqariladigan bulut xizmati`, `Yopiq`, `Serverless, bepul boshlang‘ich tarif, namespace’lar, dense + sparse + BM25 bir indeksda`],
        [`<b>Qdrant</b>`, `Baza (Rust)`, `Apache 2.0`, `O‘zingiz o‘rnatasiz yoki bulut; filtrlash qidiruv bilan birga; sparse vektorlar`],
        [`<b>Chroma</b>`, `Baza`, `Apache 2.0`, `Ishga tushirish oson, lokal yoki bulut; standart masofa — L2`],
        [`<b>Weaviate</b>`, `Baza`, `BSD-3 (asosiy qism)`, `Hybrid search (BM25F + vektor), alpha bilan muvozanat`],
        [`<b>pgvector</b>`, `PostgreSQL kengaytmasi`, `PostgreSQL`, `Mavjud Postgres’da ishlaydi; HNSW va IVFFlat; indeks 2 000 o‘lchamgacha (halfvec — 4 000)`],
        [`<b>FAISS</b>`, `Kutubxona (baza emas)`, `MIT`, `Meta’ning tez qidiruv kutubxonasi; IVF, PQ, HNSW, GPU`]
      ], caption: `2026-yil noyabr holatiga.` },
      { type: 'note', tone: 'info', html: `Qanday tanlash: allaqachon PostgreSQL bo‘lsa — <b>pgvector</b>dan boshlang. Tez prototip — <b>Chroma</b>. O‘z serveringizda katta hajm — <b>Qdrant</b> yoki <b>Weaviate</b>. Infratuzilma bilan shug‘ullanmaslik — <b>Pinecone</b>. FAISS — o‘z tizimingizni yozayotganda ichki kutubxona sifatida.` },
      { type: 'note', tone: 'warn', html: `pgvector’da filtr ANN qidiruvidan <b>keyin</b> qo‘llanadi: standart sozlamada (ef_search = 40) qatorlarning 10 foiziga mos filtr bilan taxminan 4 ta natija qaytishi mumkin. 0.8.0 versiyadan beri bu muammoni kamaytiradigan iterative index scan bor.` }
    ] },
    { id: 'hybrid', title: `Hybrid search va RRF`, blocks: [
      { type: 'p', html: `Hybrid search kalit so‘z qidiruvi (BM25) va vektor qidiruvini birlashtiradi. Ikkala ro‘yxatni birlashtirishning keng tarqalgan usuli — <b>Reciprocal Rank Fusion</b> (RRF, Cormack va b., 2009): har bir hujjat har ro‘yxatdagi o‘rni bo‘yicha 1 / (k + o‘rin) ball oladi, ballar qo‘shiladi.` },
      { type: 'p', html: `Maqoladagi k = 60, lekin har bir baza o‘z qiymatini ishlatadi (masalan, Qdrant’da standart k = 2). Weaviate esa standart holatda boshqa usul (relative score fusion) bilan birlashtiradi.` },
      { type: 'list', items: [
        `<b>Metadata filtrlari:</b> sana, til, kategoriya, foydalanuvchi bo‘yicha cheklash — qidiruv sifatini sezilarli yaxshilashi mumkin.`,
        `<b>Multi-tenancy:</b> har bir mijoz ma’lumotini ajratish (namespace yoki filtr) — xavfsizlik uchun shart.`
      ] }
    ] }
  ],
  mistakes: [
    [`“Anthropic’ning embedding modeli bor”`, `Yo‘q. Anthropic Voyage AI’ni tavsiya qiladi.`],
    [`“FAISS — vektor baza”`, `FAISS — kutubxona. Saqlash, filtr va API’ni o‘zingiz qurasiz.`],
    [`“Embedding modeli har tilda bir xil ishlaydi”`, `Modellar tillar va sohalar bo‘yicha turlicha ishlaydi. O‘z ma’lumotingizda sinang.`],
    [`“Indekslash va qidiruvda turli model ishlatish mumkin”`, `Yo‘q, vektor fazolari mos kelmaydi. Model almashsa — to‘liq qayta indekslash.`],
    [`“Semantik qidiruv kalit so‘z qidiruvidan doim yaxshi”`, `Kodlar va nomlarda kalit so‘z yaxshiroq. Ikkalasini birlashtiring.`],
    [`“Chroma standart holatda cosine ishlatadi”`, `Standart masofa — L2.`]
  ],
  lab: [
    { type: 'p', html: `Embeddinglarni o‘z kompyuteringizda ko‘ring. Kerak: Ollama va <code>embeddinggemma</code> modeli (622 MB).` },
    { type: 'term', lines: [
      `$ ollama pull embeddinggemma`,
      `$ curl http://localhost:11434/api/embed -d '{"model":"embeddinggemma","input":["cat","kitten","dog","car"]}'`
    ] },
    { type: 'steps', items: [
      `Javobdagi <code>embeddings</code> — to‘rtta ro‘yxat, har birida 768 ta son.`,
      `Xuddi shu so‘rovni o‘z tilingizdagi to‘rtta so‘z bilan ham bering.`,
      `Sonlarni o‘zingiz solishtirish qiyin, shuning uchun ularni elektron jadvalga qo‘yib, ikki ustun ko‘paytmalari yig‘indisini (SUMPRODUCT) hisoblang. Vektorlar normalizatsiya qilingan, demak bu cosine similarity.`,
      `Qaysi juftlik eng yaqin chiqdi? Natija kutganingizga mosmi va ikki tilda bir xilmi?`
    ] },
    { type: 'note', tone: 'info', html: `Eski <code>/api/embeddings</code> endpoint o‘rnini <code>/api/embed</code> egallagan. Ko‘p tilli ishlar uchun kattaroq modellarni ham sinab ko‘ring: <code>qwen3-embedding</code>, <code>bge-m3</code>.` }
  ],
  quiz: [
    { q: `Normalizatsiya qilingan vektorlarda cosine similarity va dot product qanday bog‘liq?`, options: [`Bir xil natija beradi`, `Har doim qarama-qarshi`, `Hech qanday bog‘liq emas`], answer: 0, explain: `Uzunligi 1 ga teng vektorlarda dot product aynan cosine similarity’ga teng.` },
    { q: `FAISS nima?`, options: [`Bulutdagi vektor baza`, `Tez vektor qidiruvi kutubxonasi`, `Embedding modeli`], answer: 1, explain: `FAISS — Meta’ning kutubxonasi; saqlash, filtrlash va API’ni o‘zingiz qurasiz.` },
    { q: `Embedding modelini almashtirsangiz nima qilish kerak?`, options: [`Hech narsa`, `Faqat yangi hujjatlarni yangi model bilan indekslash`, `Butun bazani qayta indekslash`], answer: 2, explain: `Turli modellarning vektor fazolari mos emas; eski va yangi vektorlarni solishtirib bo‘lmaydi.` },
    { q: `“ERR-4012” kabi xato kodini qidirishda nima yaxshiroq ishlaydi?`, options: [`Faqat vektor qidiruvi`, `Kalit so‘z (BM25) yoki hybrid qidiruv`, `Embedding o‘lchamini oshirish`], answer: 1, explain: `Aniq kodlar va nomlarda kalit so‘z qidiruvi kuchli; amalda hybrid ishlatiladi.` },
    { q: `HNSW indeksining asosiy afzalligi va kamchiligi nima?`, options: [`Tez va aniq, lekin ko‘p xotira oladi`, `Sekin, lekin xotira olmaydi`, `Faqat GPU’da ishlaydi`], answer: 0, explain: `HNSW yaxshi tezlik va recall beradi, lekin qurish sekinroq va xotira ko‘proq.` }
  ],
  summary: [
    `Embedding matnni ma’noli vektorga aylantiradi; yaqin ma’no — yaqin vektor. Bu semantik qidiruv va RAG’ning asosi.`,
    `Modelni o‘z tilingiz va ma’lumotingizda sinang — embedding sifati til va sohaga qarab sezilarli farq qiladi (MTEB, MMTEB).`,
    `Vektor baza tanlash vazifaga bog‘liq (pgvector, Chroma, Qdrant, Weaviate, Pinecone); amalda hybrid search va metadata filtrlari muhim.`
  ],
  glossary: [
    [`Embedding`, `Matnning ma’nosini ifodalovchi sonlar vektori.`],
    [`O‘lcham (dimension)`, `Vektordagi sonlar soni, masalan 768.`],
    [`Cosine similarity`, `Ikki vektor yo‘nalishining o‘xshashligi (−1 dan 1 gacha).`],
    [`Normalizatsiya`, `Vektor uzunligini 1 ga keltirish.`],
    [`Matryoshka embedding`, `Boshidagi qismini kesib ishlatsa ham mazmunli qoladigan vektor.`],
    [`ANN`, `Taxminiy eng yaqin qo‘shni qidiruvi — tezlik uchun biroz aniqlikdan voz kechish.`],
    [`HNSW`, `Ko‘p qatlamli grafga asoslangan ANN indeksi.`],
    [`Recall`, `Haqiqiy eng yaqin natijalardan qanchasi topilgani.`],
    [`Hybrid search`, `Kalit so‘z (BM25) va vektor qidiruvini birlashtirish.`],
    [`RRF`, `Bir nechta reyting ro‘yxatini o‘rinlar bo‘yicha birlashtirish usuli.`]
  ],
  sources: [
    { label: `OpenAI — Embeddings`, url: `https://developers.openai.com/api/docs/guides/embeddings` },
    { label: `Anthropic — Embeddings (Voyage)`, url: `https://platform.claude.com/docs/en/build-with-claude/embeddings` },
    { label: `Google — Embeddings`, url: `https://aistudio.google.com/docs/embeddings` },
    { label: `Voyage AI — Embeddings`, url: `https://docs.voyageai.com/docs/embeddings` },
    { label: `Cohere — Embed`, url: `https://docs.cohere.com/docs/cohere-embed` },
    { label: `Qwen3-Embedding-8B`, url: `https://huggingface.co/Qwen/Qwen3-Embedding-8B` },
    { label: `BGE-M3`, url: `https://huggingface.co/BAAI/bge-m3` },
    { label: `Google — EmbeddingGemma 2`, url: `https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2` },
    { label: `Ollama — Embeddings`, url: `https://docs.ollama.com/capabilities/embeddings` },
    { label: `Kusupati va b., 2022 — Matryoshka Representation Learning`, url: `https://arxiv.org/abs/2205.13147` },
    { label: `Muennighoff va b., 2022 — MTEB`, url: `https://arxiv.org/abs/2210.07316` },
    { label: `Malkov va Yashunin — HNSW`, url: `https://arxiv.org/abs/1603.09320` },
    { label: `Cormack va b., 2009 — RRF`, url: `http://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf` },
    { label: `Pinecone`, url: `https://docs.pinecone.io/guides/get-started/overview` },
    { label: `Qdrant`, url: `https://qdrant.tech/documentation/overview/` },
    { label: `Chroma`, url: `https://docs.trychroma.com/docs/overview/introduction` },
    { label: `Weaviate — Hybrid search`, url: `https://docs.weaviate.io/weaviate/search/hybrid` },
    { label: `pgvector`, url: `https://github.com/pgvector/pgvector` },
    { label: `FAISS`, url: `https://github.com/facebookresearch/faiss/wiki` }
  ]
};
