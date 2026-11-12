window.BOOK.content.en['06'] = {
  lead: `RAG (retrieval-augmented generation) means finding the relevant documents and handing them to the model before it answers. It is the main way to work with new or private information the model never saw during training. In this chapter you will learn the steps of RAG, chunking, ways to improve retrieval, citing sources, and how to choose between RAG, fine-tuning and long context.`,
  minutes: 45,
  tags: [`Theory`, `Hands-on: Gemini Notebook`],
  goals: [
    `Why RAG is needed and what steps it consists of`,
    `Chunking, retrieval, reranking and citations`,
    `Contextual Retrieval and other advanced techniques`,
    `RAG, fine-tuning or long context: when to use which`
  ],
  sections: [
    { id: 'what', title: `What RAG is and why you need it`, blocks: [
      { type: 'p', html: `A model only “knows” what it saw during training. Your company’s internal policies, documents or yesterday’s news are not in it. With RAG, the model first pulls relevant passages from an external knowledge base and then writes its answer <b>based on those passages</b>. The term and the method were introduced in the paper by Lewis et al. (2020).` },
      { type: 'p', html: `Example: “How many days in advance do I need to request vacation?” Without RAG, the model may answer with a generic guess and even add made-up promises. With RAG, it gives the exact answer from the company policy, with the source.` },
      { type: 'note', tone: 'key', html: `The main benefit of RAG is not just a correct answer but a <b>verifiable</b> one: the source is shown, and if the prompt instructs it to, the model says “I don’t know” when the information is missing. This does not happen on its own, so always write that instruction.` }
    ] },
    { id: 'pipeline', title: `The steps of RAG`, blocks: [
      { type: 'flow', items: [
        { title: `1. Loading`, text: `PDFs, pages, databases` },
        { title: `2. Chunking`, text: `Splitting into chunks` },
        { title: `3. Embedding`, text: `Each chunk → vector` },
        { title: `4. Retrieval`, text: `The chunks that best match the question` },
        { title: `5. Reranking`, text: `More precise reordering` },
        { title: `6. Answer`, text: `Grounded in the chunks, with sources` }
      ] },
      { type: 'p', html: `Steps 1–3 run once, ahead of time (indexing). Steps 4–6 run for every question. When documents change, the index must be updated too. A stale index is a common RAG problem.` }
    ] },
    { id: 'chunking', title: `Chunking: splitting a document into pieces`, blocks: [
      { type: 'p', html: `Turning a whole document into a single vector works poorly: the meanings get mixed together. That is why a document is split into pieces (chunks).` },
      { type: 'table', head: [`Method`, `How`, `Notes`], rows: [
        [`Fixed size + overlap`, `For example, 800 tokens, with neighboring chunks overlapping by 400 tokens`, `The default setting of the OpenAI vector store (chunks of 100–4096 tokens)`],
        [`Recursive`, `Split by paragraphs first, then by lines, then by words`, `Tries to preserve the structure of the text`],
        [`Structure-based`, `By headings, sections, tables, code functions`, `Often the best option for documents and code`],
        [`Semantic`, `Split where the meaning changes`, `More expensive, not always better`]
      ] },
      { type: 'note', tone: 'warn', html: `If a chunk is too small, context is lost (“Revenue grew 3%”: which company, which year?). If it is too large, retrieval precision drops. Add <b>metadata</b> such as source, heading and date to every chunk.` }
    ] },
    { id: 'contextual', title: `Contextual Retrieval`, blocks: [
      { type: 'p', html: `Anthropic (September 2024) reduced the problem of chunks losing context like this: before indexing, a short 50–100 token note, written with the whole document in view, is added to the start of each chunk (for example, “This chunk is from ACME’s Q2 2023 report…”). A small model writes the note.` },
      { type: 'bars', title: `Share of chunks missed in top-20 retrieval`, max: 6, items: [
        { label: `Basic RAG`, value: 5.7, text: `5.7%` },
        { label: `+ contextual embeddings`, value: 3.7, text: `3.7%` },
        { label: `+ contextual BM25`, value: 2.9, text: `2.9%` },
        { label: `+ reranking`, value: 1.9, text: `1.9%` }
      ], caption: `Errors fell by 35%, 49% and 67%, respectively. Source: Anthropic, “Introducing Contextual Retrieval”, 2024.` },
      { type: 'note', tone: 'info', html: `An important tip from the same article: if your knowledge base is <b>smaller than 200,000 tokens</b> (about 500 pages), you can skip building RAG, put everything in the prompt and use prompt caching.` }
    ] },
    { id: 'rerank', title: `Improving retrieval`, blocks: [
      { type: 'cards', items: [
        { tag: `Reranking`, title: `Reordering results`, html: `First, many candidates are retrieved (for example, 150). Then a more precise model (a cross-encoder) rescores them against the question and keeps the best 20. Examples: Cohere Rerank, Voyage rerank.` },
        { tag: `Hybrid`, title: `BM25 + vector`, html: `Combining keyword search and meaning-based search (Chapter 5).` },
        { tag: `Query rewriting`, title: `Rewriting the question`, html: `The model rewrites the user’s question into a form better suited for search, or generates several variants.` },
        { tag: `HyDE`, title: `Searching with a hypothetical answer`, html: `The model first writes a hypothetical answer document, and then real documents are retrieved using that text’s vector (Gao et al., 2022).` }
      ] },
      { type: 'list', items: [
        `<b>Agentic RAG</b>: the model calls the search tool itself, several times if needed (Chapter 7). This is not one specific paper but a widely used pattern.`,
        `<b>GraphRAG</b> (Microsoft, 2024): a graph of entities is built from the documents, and summaries are written for groups. Useful for broad questions “about the whole collection”.`
      ] }
    ] },
    { id: 'citations', title: `Citations and ready-made services`, blocks: [
      { type: 'table', head: [`Service`, `What it provides`], rows: [
        [`<b>Claude Citations</b>`, `Links claims in the answer to exact locations in the document (each citation is guaranteed to point to a real location, but it is not guaranteed that every claim gets a citation); cited text does not count as output tokens. Does not work together with structured output.`],
        [`<b>OpenAI file_search</b>`, `A Responses API tool: searches a vector store and adds file citations to the answer. $2.50 per 1,000 calls, storage $0.10/GB/day (1 GB free).`],
        [`<b>Gemini File Search</b>`, `Managed RAG: free storage, indexing at the embedding price, with metadata filters and citations.`]
      ], caption: `As of November 2026. The OpenAI Assistants API was shut down in August 2026; use the Responses API instead of the “Assistants + file_search” setup from older tutorials.` },
      { type: 'note', tone: 'warn', html: `If you just tell the model “cite your source” in a plain prompt, it may “cite” a source that does not exist. A provider’s citations feature guarantees that the citation points to a real document.` }
    ] },
    { id: 'choose', title: `RAG, fine-tuning or long context`, blocks: [
      { type: 'p', html: `The OpenAI guide explains this choice along two axes: <b>RAG</b> gives the model <b>knowledge</b> it lacks or that is new; <b>fine-tuning</b> changes <b>behavior</b>: format, style, consistency. The two complement each other.` },
      { type: 'table', head: [`Task`, `Solution`], rows: [
        [`Questions and answers over company documents, frequently updated information`, `<b>RAG</b>`],
        [`Knowledge base smaller than 200K tokens that rarely changes`, `<b>Put everything in context</b> + prompt caching`],
        [`Always need a strict format or a specific style`, `<b>Fine-tuning</b> (or first a good prompt and few-shot)`],
        [`“Teaching” the model new facts`, `<b>RAG</b>. Ovadia et al. (2023): for injecting new knowledge, RAG consistently beats unsupervised fine-tuning`]
      ] },
      { type: 'note', tone: 'info', html: `A 1-million-token context does not make RAG unnecessary: context rot and “lost in the middle” (Chapters 1 and 4), the cost and latency of millions of tokens per request, knowledge bases larger than 1M, and frequent updates all favor RAG.` }
    ] },
    { id: 'fail', title: `Where RAG breaks`, blocks: [
      { type: 'list', items: [
        `<b>Retrieval found nothing</b>: poor chunking, a weak embedding model (the language problem from Chapter 5), no reranking.`,
        `<b>Found it, but the model did not use it</b>: too many chunks were provided, or the needed chunk ended up in the middle.`,
        `<b>Stale index</b>: the document was updated, but the vectors are old.`,
        `<b>No metadata</b>: old and new versions and different departments get mixed up.`,
        `<b>Permissions ignored</b>: a document the user should not see ends up in the answer.`
      ] },
      { type: 'p', html: `To measure RAG quality, evaluate the two parts separately: retrieval (context precision, context recall) and the answer (faithfulness: how many of the claims in the answer are grounded in the retrieved documents). This is the topic of Chapter 9.` }
    ] }
  ],
  mistakes: [
    [`“We have 1M context, so we don’t need RAG”`, `Cost, latency, context rot and large knowledge bases still make RAG necessary. For a knowledge base smaller than 200K, though, full context is a good option.`],
    [`“I’ll teach it new facts with fine-tuning”`, `For knowledge, RAG usually wins; fine-tuning is for behavior and format.`],
    [`“If I tell the model ‘cite your source’, the source will be real”`, `It may be made up. Use a citations feature.`],
    [`“Contextual embeddings alone give 49%”`, `On their own, 35%. 49% comes with BM25, and 67% with reranking.`],
    [`“You build the index once”`, `When documents change, the index must be updated too.`],
    [`“I’ll use file_search with the Assistants API”`, `The Assistants API was shut down in August 2026; use the Responses API.`]
  ],
  lab: [
    { type: 'p', html: `Watch RAG in action in a ready-made tool. No code needed.` },
    { type: 'steps', items: [
      `Open <b>Gemini Notebook</b> (formerly NotebookLM, notebooklm.google) and upload 2–3 PDFs or articles.`,
      `Ask a question that the documents answer and click the citation in the response: is that information really at the cited location?`,
      `Ask a question the documents do <b>not</b> answer. Does the system say “I don’t know”, or does it guess?`,
      `Optional, local: <b>Open WebUI</b> (requires Python 3.11 or 3.12: <code>pip install open-webui</code>, then <code>open-webui serve</code>) works with Ollama. Attach a document in the chat with <code>#</code>, or create a collection under Workspace → Knowledge.`
    ] },
    { type: 'term', lines: [
      `$ pip install open-webui`,
      `$ open-webui serve`,
      `# open http://localhost:8080 in your browser`
    ] },
    { type: 'note', tone: 'warn', html: `For local RAG, increase Ollama’s context length (Chapter 4): with the default context (4,096 tokens on less than 24 GB of VRAM), retrieved documents can be silently truncated.` }
  ],
  quiz: [
    { q: `What is the main job of RAG?`, options: [`Retraining the model`, `Finding relevant documents and giving them to the model before it answers`, `Making answers faster`], answer: 1, explain: `The model writes its answer based on the retrieved passages; this makes it possible to work with new and private information.` },
    { q: `In Contextual Retrieval, when did retrieval errors drop the most?`, options: [`With contextual embeddings only (−35%)`, `With contextual embeddings + BM25 + reranking (−67%)`, `With reranking only`], answer: 1, explain: `−35% (embeddings), −49% (+BM25), −67% (+reranking).` },
    { q: `A knowledge base is 100,000 tokens and rarely changes. What is the simplest solution?`, options: [`A complex RAG system`, `Fine-tuning`, `Putting everything in context + prompt caching`], answer: 2, explain: `Anthropic: for knowledge bases smaller than 200K tokens, full context with caching and no RAG may be enough.` },
    { q: `What fits best for teaching a model to always answer in a strict style?`, options: [`RAG`, `Fine-tuning (or first a prompt and few-shot)`, `Making the vector database bigger`], answer: 1, explain: `RAG is for knowledge; fine-tuning is for behavior, format and style.` },
    { q: `What does reranking do?`, options: [`Splits documents into chunks`, `Reorders many retrieved candidates using a more precise model`, `Reduces the embedding dimension`], answer: 1, explain: `For example, out of 150 candidates, a cross-encoder picks the 20 best matches.` }
  ],
  summary: [
    `RAG gives the model new and private knowledge and makes answers verifiable: with sources, and with “I don’t know” when the information is missing, if instructed.`,
    `Quality depends on chunking, the embedding model, hybrid search and reranking; Contextual Retrieval cut errors by up to 67%.`,
    `Knowledge: RAG. Behavior: fine-tuning. Small knowledge base: full context + caching. Long context does not replace RAG.`
  ],
  glossary: [
    [`RAG`, `Retrieval-augmented generation: retrieving documents and giving them to the model before it answers.`],
    [`Chunk`, `A piece of a document split off for indexing.`],
    [`Overlap`, `The part where neighboring chunks overlap.`],
    [`Reranking`, `Reordering retrieved candidates with a more precise model.`],
    [`Cross-encoder`, `A model that reads the question and the document together and scores how well they match.`],
    [`Contextual Retrieval`, `An indexing method that adds a note based on the document’s context to each chunk.`],
    [`HyDE`, `Writing a hypothetical answer and searching with its vector.`],
    [`GraphRAG`, `Building a graph of entities from documents and searching through the graph.`],
    [`Faithfulness`, `The share of claims in the answer that are grounded in the retrieved sources.`],
    [`Fine-tuning`, `Further training a model on additional data to change its behavior.`]
  ],
  sources: [
    { label: `Lewis et al., 2020 — Retrieval-Augmented Generation`, url: `https://arxiv.org/abs/2005.11401` },
    { label: `Anthropic — Introducing Contextual Retrieval (2024)`, url: `https://www.anthropic.com/news/contextual-retrieval` },
    { label: `OpenAI — Retrieval (vector stores)`, url: `https://developers.openai.com/api/docs/guides/retrieval` },
    { label: `OpenAI — File search`, url: `https://developers.openai.com/api/docs/guides/tools-file-search` },
    { label: `OpenAI — Optimizing LLM accuracy`, url: `https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy` },
    { label: `Anthropic — Citations`, url: `https://platform.claude.com/docs/en/build-with-claude/citations` },
    { label: `Google — File Search`, url: `https://aistudio.google.com/docs/file-search` },
    { label: `Ovadia et al., 2023 — Fine-Tuning or Retrieval?`, url: `https://arxiv.org/abs/2312.05934` },
    { label: `Gao et al., 2022 — HyDE`, url: `https://arxiv.org/abs/2212.10496` },
    { label: `Microsoft — GraphRAG`, url: `https://microsoft.github.io/graphrag/` },
    { label: `Ragas — Metrics`, url: `https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/` },
    { label: `Google — Gemini Notebook (NotebookLM)`, url: `https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/` },
    { label: `Open WebUI — Docs`, url: `https://docs.openwebui.com/` }
  ]
};
