window.BOOK.content.en['05'] = {
  lead: `An embedding turns text into a list of numbers (a vector) while preserving its meaning. Texts with similar meanings get similar vectors. This idea underpins semantic search, RAG, recommendation systems and clustering. In this chapter you will learn how embeddings work, which models exist, how vector databases work, and how to make search fast.`,
  minutes: 45,
  tags: [`Theory`, `Hands-on: Ollama embed`],
  goals: [
    `Embeddings, dimensions and similarity measures (cosine, dot product)`,
    `Choosing an embedding model: cloud and local`,
    `Vector databases: Pinecone, Qdrant, Chroma, Weaviate, pgvector, and the FAISS library`,
    `Fast search (HNSW, IVF) and hybrid search`
  ],
  sections: [
    { id: 'what', title: `What an embedding is`, blocks: [
      { type: 'p', html: `An embedding model takes text and turns it into a fixed-length list of numbers, for example 768 or 3072 numbers. Think of this list as a point in a high-dimensional space: texts with similar meanings sit close to each other in that space.` },
      { type: 'flow', items: [
        { title: `Text`, text: `“Can I get my money back?”` },
        { title: `Embedding model` },
        { title: `Vector`, text: `[0.021, −0.113, 0.087, …] — 768 numbers` }
      ] },
      { type: 'p', html: `The main way to measure closeness is <b>cosine similarity</b>: the angle between two vectors. The higher the value, the closer the meaning. The absolute number depends on the model, so compare results relative to each other.` },
      { type: 'note', tone: 'info', html: `Many modern models (OpenAI, Voyage, Ollama’s <code>/api/embed</code>) return vectors with a length of 1 (normalized). For such vectors, cosine similarity and dot product give the same result, and Euclidean distance gives the same ranking. If you truncate a vector yourself, you need to normalize it again.` }
    ] },
    { id: 'lang', title: `Language and domain matter`, blocks: [
      { type: 'p', html: `An embedding model does not work equally well in every language and every domain. The authors of the MTEB benchmark (Muennighoff et al., 2022) showed that no single model wins across all tasks. The extended MMTEB (2025) covers more than 500 tasks in more than 250 languages.` },
      { type: 'p', html: `There are dedicated models for multilingual work: for example, BGE-M3 and EmbeddingGemma support more than 100 languages.` },
      { type: 'note', tone: 'key', html: `Takeaway: do not pick an embedding model without testing it <b>on your own language and your own data</b>. Build a small test set of 20–50 real questions with their matching documents, and compare several models.` }
    ] },
    { id: 'models', title: `Embedding models (November 2026)`, blocks: [
      { type: 'table', head: [`Model`, `Dimensions`, `Input`, `Price, $/1M tokens`], rows: [
        [`OpenAI text-embedding-3-small`, `1536`, `8,192`, `0.02`],
        [`OpenAI text-embedding-3-large`, `3072`, `8,192`, `0.13`],
        [`Google gemini-embedding-2 (multimodal)`, `128–3072`, `8,192`, `0.20`],
        [`Voyage 4 / 4-lite / 4-large`, `1024 (256–2048)`, `32K`, `0.06 / 0.02 / 0.12`],
        [`Cohere Embed 5`, `256–2048`, `128K`, `—`],
        [`Qwen3-Embedding 0.6B / 4B / 8B (open)`, `1024 / 2560 / 4096`, `32K`, `local`],
        [`BGE-M3 (open, MIT)`, `1024`, `8,192`, `local`],
        [`EmbeddingGemma 2 (open, Apache 2.0, multimodal)`, `768 (128–768)`, `8K`, `local`]
      ], caption: `Source: provider documentation and Hugging Face model pages. Anthropic does not offer its own embedding model and recommends Voyage AI.` },
      { type: 'list', items: [
        `<b>Matryoshka embeddings</b> (Kusupati et al., 2022): the first part of the vector is meaningful on its own, so you can truncate it (for example, 3072 → 768). This saves memory several times over, with a small drop in quality.`,
        `<b>MTEB</b> is a leaderboard of embedding models. The conclusion of its original paper: no single model wins across all tasks. Treat the leaderboard as a starting point and test on your own data.`,
        `<b>Key rule:</b> use the same model for indexing and for search. If you switch models, you have to re-index the whole database.`
      ] }
    ] },
    { id: 'search', title: `Semantic search: searching without keywords`, blocks: [
      { type: 'p', html: `Ordinary search looks for matching words. Semantic search looks for <b>meaning</b>: the question “I forgot my password, what do I do?” should find the account recovery policy even if it does not contain the word “recovery”.` },
      { type: 'flow', items: [
        { title: `1. Indexing`, text: `Each document → vector → database` },
        { title: `2. Query`, text: `Question → vector (with the same model)` },
        { title: `3. Search`, text: `The k nearest vectors are found` },
        { title: `4. Result`, text: `Matching documents are ranked by similarity` }
      ] },
      { type: 'note', tone: 'warn', html: `Semantic search is poor at finding exact codes, product codes (SKUs) or names (for example, “ERR-4012”). Keyword search finds them easily. That is why in practice the two are often used together: hybrid search.` }
    ] },
    { id: 'ann', title: `Fast search across millions of vectors`, blocks: [
      { type: 'p', html: `Comparing each query with every vector in the database is exact, but slow with a million vectors. That is why <b>approximate nearest neighbor</b> (ANN) indexes are used: they give up a little accuracy for a lot of speed.` },
      { type: 'cards', items: [
        { tag: `Most popular`, title: `HNSW`, html: `A multi-layer graph: it first moves quickly along the “highways”, then searches precisely in the “side streets”. Fast and accurate, but uses a lot of memory (Malkov and Yashunin; preprint 2016, journal 2020).` },
        { tag: `Clusters`, title: `IVF`, html: `Splits vectors into groups and checks only the nearest groups. It is like finding the right shelf first and then looking for the book.` },
        { tag: `Compression`, title: `Product quantization`, html: `Compresses vectors and cuts memory sharply, with a small loss of accuracy (Jégou et al., 2011).` }
      ] },
      { type: 'p', html: `The core trade-off is between <b>recall</b> (the share of true nearest neighbors found), speed and memory. Index settings decide the balance among these three.` }
    ] },
    { id: 'dbs', title: `Vector databases`, blocks: [
      { type: 'table', head: [`Tool`, `Type`, `License`, `Highlights`], rows: [
        [`<b>Pinecone</b>`, `Managed cloud service`, `Proprietary`, `Serverless, free starter tier, namespaces, dense + sparse + BM25 in one index`],
        [`<b>Qdrant</b>`, `Database (Rust)`, `Apache 2.0`, `Self-hosted or cloud; filtering combined with search; sparse vectors`],
        [`<b>Chroma</b>`, `Database`, `Apache 2.0`, `Easy to get started, local or cloud; default distance is L2`],
        [`<b>Weaviate</b>`, `Database`, `BSD-3 (core)`, `Hybrid search (BM25F + vector), balanced with alpha`],
        [`<b>pgvector</b>`, `PostgreSQL extension`, `PostgreSQL`, `Runs in your existing Postgres; HNSW and IVFFlat; indexes up to 2,000 dimensions (halfvec: 4,000)`],
        [`<b>FAISS</b>`, `Library (not a database)`, `MIT`, `Meta’s fast search library; IVF, PQ, HNSW, GPU`]
      ], caption: `As of November 2026.` },
      { type: 'note', tone: 'info', html: `How to choose: if you already have PostgreSQL, start with <b>pgvector</b>. For a quick prototype, <b>Chroma</b>. For large volumes on your own servers, <b>Qdrant</b> or <b>Weaviate</b>. To avoid managing infrastructure, <b>Pinecone</b>. FAISS is for use as an internal library when you are building your own system.` },
      { type: 'note', tone: 'warn', html: `In pgvector, filters are applied <b>after</b> the ANN search: with the default setting (ef_search = 40), a filter that matches 10 percent of rows may return only about 4 results. Since version 0.8.0 there is an iterative index scan that reduces this problem.` }
    ] },
    { id: 'hybrid', title: `Hybrid search and RRF`, blocks: [
      { type: 'p', html: `Hybrid search combines keyword search (BM25) with vector search. A common way to merge the two lists is <b>Reciprocal Rank Fusion</b> (RRF, Cormack et al., 2009): each document gets a score of 1 / (k + rank) for its position in each list, and the scores are added up.` },
      { type: 'p', html: `The paper uses k = 60, but each database uses its own value (for example, the default in Qdrant is k = 2). Weaviate, by default, merges with a different method (relative score fusion).` },
      { type: 'list', items: [
        `<b>Metadata filters:</b> restricting by date, language, category or user can noticeably improve search quality.`,
        `<b>Multi-tenancy:</b> keeping each customer’s data separate (namespace or filter) is a must for security.`
      ] }
    ] }
  ],
  mistakes: [
    [`“Anthropic has an embedding model”`, `No. Anthropic recommends Voyage AI.`],
    [`“FAISS is a vector database”`, `FAISS is a library. You build storage, filtering and the API yourself.`],
    [`“An embedding model works the same in every language”`, `Models perform differently across languages and domains. Test on your own data.`],
    [`“You can use different models for indexing and search”`, `No, the vector spaces do not match. If the model changes, re-index everything.`],
    [`“Semantic search is always better than keyword search”`, `For codes and names, keyword search is better. Combine the two.`],
    [`“Chroma uses cosine by default”`, `The default distance is L2.`]
  ],
  lab: [
    { type: 'p', html: `See embeddings on your own computer. You need Ollama and the <code>embeddinggemma</code> model (622 MB).` },
    { type: 'term', lines: [
      `$ ollama pull embeddinggemma`,
      `$ curl http://localhost:11434/api/embed -d '{"model":"embeddinggemma","input":["cat","kitten","dog","car"]}'`
    ] },
    { type: 'steps', items: [
      `The <code>embeddings</code> field in the response contains four lists, each with 768 numbers.`,
      `Send the same request with four words in your own language.`,
      `Comparing the numbers by hand is hard, so paste them into a spreadsheet and compute the sum of products of two columns (SUMPRODUCT). The vectors are normalized, so this is the cosine similarity.`,
      `Which pair came out closest? Does the result match what you expected, and is it the same in both languages?`
    ] },
    { type: 'note', tone: 'info', html: `The old <code>/api/embeddings</code> endpoint has been replaced by <code>/api/embed</code>. For multilingual work, also try larger models: <code>qwen3-embedding</code>, <code>bge-m3</code>.` }
  ],
  quiz: [
    { q: `For normalized vectors, how are cosine similarity and dot product related?`, options: [`They give the same result`, `They are always opposite`, `They are not related at all`], answer: 0, explain: `For vectors of length 1, the dot product is exactly equal to cosine similarity.` },
    { q: `What is FAISS?`, options: [`A cloud vector database`, `A library for fast vector search`, `An embedding model`], answer: 1, explain: `FAISS is a library from Meta; you build storage, filtering and the API yourself.` },
    { q: `What should you do if you switch embedding models?`, options: [`Nothing`, `Index only new documents with the new model`, `Re-index the whole database`], answer: 2, explain: `Different models have incompatible vector spaces; old and new vectors cannot be compared.` },
    { q: `What works better for searching an error code like “ERR-4012”?`, options: [`Vector search only`, `Keyword (BM25) or hybrid search`, `Increasing the embedding dimension`], answer: 1, explain: `Keyword search is strong for exact codes and names; in practice, hybrid search is used.` },
    { q: `What is the main strength and weakness of an HNSW index?`, options: [`Fast and accurate, but uses a lot of memory`, `Slow, but uses no memory`, `Works only on a GPU`], answer: 0, explain: `HNSW gives good speed and recall, but it is slower to build and uses more memory.` }
  ],
  summary: [
    `An embedding turns text into a meaningful vector; similar meaning means similar vectors. This is the foundation of semantic search and RAG.`,
    `Test the model on your own language and data: embedding quality varies significantly by language and domain (MTEB, MMTEB).`,
    `The right vector database depends on the task (pgvector, Chroma, Qdrant, Weaviate, Pinecone); in practice, hybrid search and metadata filters matter.`
  ],
  glossary: [
    [`Embedding`, `A vector of numbers that represents the meaning of a text.`],
    [`Dimension`, `The number of values in a vector, for example 768.`],
    [`Cosine similarity`, `How similar the directions of two vectors are (from −1 to 1).`],
    [`Normalization`, `Scaling a vector to a length of 1.`],
    [`Matryoshka embedding`, `A vector that stays meaningful even if you cut it and use only its first part.`],
    [`ANN`, `Approximate nearest neighbor search: giving up a little accuracy for speed.`],
    [`HNSW`, `An ANN index based on a multi-layer graph.`],
    [`Recall`, `How many of the true nearest results were found.`],
    [`Hybrid search`, `Combining keyword (BM25) and vector search.`],
    [`RRF`, `A method for merging several ranked lists by rank position.`]
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
    { label: `Kusupati et al., 2022 — Matryoshka Representation Learning`, url: `https://arxiv.org/abs/2205.13147` },
    { label: `Muennighoff et al., 2022 — MTEB`, url: `https://arxiv.org/abs/2210.07316` },
    { label: `Malkov and Yashunin — HNSW`, url: `https://arxiv.org/abs/1603.09320` },
    { label: `Cormack et al., 2009 — RRF`, url: `http://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf` },
    { label: `Pinecone`, url: `https://docs.pinecone.io/guides/get-started/overview` },
    { label: `Qdrant`, url: `https://qdrant.tech/documentation/overview/` },
    { label: `Chroma`, url: `https://docs.trychroma.com/docs/overview/introduction` },
    { label: `Weaviate — Hybrid search`, url: `https://docs.weaviate.io/weaviate/search/hybrid` },
    { label: `pgvector`, url: `https://github.com/pgvector/pgvector` },
    { label: `FAISS`, url: `https://github.com/facebookresearch/faiss/wiki` }
  ]
};
