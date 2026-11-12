window.BOOK.content.en['02'] = {
  lead: `There are hundreds of models today, and prices differ by 80 times even within a single provider. In this chapter you will learn about the main providers and their prices, how an API works, how to save money, and how to run a model on your own computer.`,
  minutes: 50,
  tags: [`Prices as of November 2026`, `Lab: OpenRouter + Ollama`],
  goals: [
    `Know the main providers, their models and prices`,
    `The structure of an API request: roles, statelessness, streaming, limits and errors`,
    `Cutting costs: caching, batch, a smaller model, shorter answers`,
    `Running models locally, estimating the memory you need, privacy`
  ],
  sections: [
    { id: 'market', title: `The main providers`, blocks: [
      { type: 'cards', items: [
        { tag: `Closed`, title: `Anthropic`, html: `Claude Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5` },
        { tag: `Closed + open gpt-oss`, title: `OpenAI`, html: `GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna` },
        { tag: `Closed + open Gemma`, title: `Google`, html: `Gemini 4 Argon, Gemini 3.8 Flash, Gemini 3.5 Flash-Lite` },
        { tag: `Open-weight (MIT)`, title: `DeepSeek`, html: `DeepSeek V4-Pro, DeepSeek V4.1 Flash` },
        { tag: `Mixed`, title: `Alibaba · Qwen`, html: `Qwen3.8-Max, Qwen3.8-Flash, open Qwen3.8-27B` },
        { tag: `Mostly closed`, title: `Meta`, html: `Muse Wonder, Muse Spark, Muse Ember` },
        { tag: `Open-weight`, title: `Mistral`, html: `Mistral Large 4, Mistral Small 4, Ministral 3` },
        { tag: `On your own computer`, title: `Local`, html: `Ollama, LM Studio, Hugging Face, llama.cpp, vLLM` }
      ] },
      { type: 'list', items: [
        `<b>Claude Mythos 5.2</b> also exists, but only for organizations approved through Anthropic programs.`,
        `<b>Gemini 4 Carbon</b> is currently open only to a subset of cybersecurity professionals. For regular developers, Google’s strongest model is <b>Gemini 4 Argon</b>.`,
        `<b>Meta</b>’s current Muse models are mostly closed. The open-weight ones are Muse Spark Open and Muse Glimmer. The future of Llama is unclear.`,
        `Watch the names: there is no single model called “GPT-6.” There are GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra and GPT-6 Luna.`
      ] }
    ] },
    { id: 'prices1', title: `Prices: Anthropic and OpenAI`, blocks: [
      { type: 'table', head: [`Model`, `Input $`, `Output $`, `Best for`], num: [1, 2], rows: [
        [`<b>Claude Fable 5.2</b>`, `8`, `40`, `The hardest reasoning and long-running agent work`],
        [`<b>Claude Opus 5.5</b>`, `4`, `20`, `Anthropic’s recommendation: the starting model for most work`],
        [`<b>Claude Sonnet 5.5</b>`, `2`, `10`, `A balance of speed and intelligence`],
        [`<b>Claude Haiku 5.5</b>`, `0.10`, `0.50`, `Classification, data extraction, routing`],
        [`<b>GPT-6 Astra</b>`, `10`, `50`, `OpenAI’s strongest model`],
        [`<b>GPT-6.1 Sol</b>`, `2`, `10`, `Mid tier`],
        [`<b>GPT-6.1 Terra</b>`, `1`, `5`, `Lower-mid tier`],
        [`<b>GPT-6 Luna</b>`, `0.10`, `0.50`, `Small and cheap`]
      ], caption: `$ per 1 million tokens, standard rate, as of November 12, 2026. Source: Anthropic and OpenAI pricing pages.` },
      { type: 'list', items: [
        `The Haiku 5.5 price applies to requests up to 100K tokens; longer ones cost $0.50 / $2.50.`,
        `At OpenAI, the price goes up for inputs longer than 272K: input 2×, output 1.5×.`,
        `Context: 1M tokens on Claude models, 1.05M on OpenAI; the maximum output is 128K on both.`
      ] }
    ] },
    { id: 'prices2', title: `Prices: other providers`, blocks: [
      { type: 'table', head: [`Model`, `Input $`, `Output $`, `Note`], num: [1, 2], rows: [
        [`<b>Gemini 4 Argon</b>`, `2 → 4`, `10 → 20`, `Price goes up on December 1, 2026`],
        [`<b>Gemini 3.8 Flash</b>`, `0.75 → 1.50`, `3.75 → 7.50`, `Price goes up on January 1, 2027`],
        [`<b>Gemini 3.5 Flash-Lite</b>`, `0.30`, `2.50`, `Budget tier`],
        [`<b>DeepSeek V4-Pro</b>`, `1.32`, `3.96`, `2× cheaper during off-peak hours`],
        [`<b>DeepSeek V4.1 Flash</b>`, `0.30`, `1.20`, `2× cheaper during off-peak hours`],
        [`<b>Qwen3.8-Max</b>`, `2`, `6`, `Alibaba Cloud Singapore region price`],
        [`<b>Qwen3.8-Flash</b>`, `0.15`, `0.47`, `Budget tier`],
        [`<b>Meta Muse Wonder</b>`, `4`, `20`, `Meta’s strongest model`],
        [`<b>Meta Muse Ember</b>`, `0.10`, `0.50`, `Requests up to 200K tokens`],
        [`<b>Mistral Large 4</b>`, `0.70`, `2.10`, `Open-weight (Mistral’s own license)`],
        [`<b>Mistral Small 4</b>`, `0.15`, `0.60`, `Open-weight, Apache 2.0`]
      ], caption: `$ per 1 million tokens, as of November 12, 2026. Source: official provider pricing pages.` },
      { type: 'note', tone: 'info', html: `DeepSeek’s peak hours are Monday–Friday, 01:00–04:00 and 06:00–10:00 UTC. At all other times and on Chinese public holidays, the price drops by half (V4-Pro: $0.66 / $1.98). The Mistral Large 4 price comes from the official documentation; some websites list a different number.` }
    ] },
    { id: 'tiers', title: `Three tiers: large, mid, small`, blocks: [
      { type: 'cards', items: [
        { tag: `Flagship`, title: `Fable 5.2 · Opus 5.5 · GPT-6 Astra · Gemini 4 Argon`, html: `Complex reasoning, code, agents. More expensive and slower.` },
        { tag: `Mid`, title: `Sonnet 5.5 · GPT-6.1 Sol · Gemini 3.8 Flash`, html: `The main workhorse model for most products.` },
        { tag: `Small`, title: `Haiku 5.5 · GPT-6 Luna · Muse Ember · Qwen3.8-Flash`, html: `Classification, extraction, routing. High volume, low price.` }
      ] },
      { type: 'note', tone: 'key', html: `The method: first see what quality looks like with a strong model, then try a cheaper one and measure the difference. Measuring quality with a test set instead of “eyeballing” it is the topic of Chapter 9 (Eval).` }
    ] },
    { id: 'api', title: `How an API works`, blocks: [
      { type: 'p', html: `The basics are the same with every provider: your app sends a JSON request over HTTPS, and the provider’s server returns a JSON response.` },
      { type: 'flow', items: [
        { title: `Your app`, text: `Runs on a server` },
        { title: `HTTPS request`, text: `API key, model name, messages, answer length limit` },
        { title: `Provider server`, text: `The model generates the answer` },
        { title: `JSON response`, text: `Text, stop reason, tokens used (usage)` }
      ] },
      { type: 'p', html: `The <b>usage</b> field in the response is the most important place for billing: this is where you see the number of input and output tokens.` },
      { type: 'note', tone: 'warn', html: `An API key is money. Never put it in frontend code, on GitHub, or in a chat. Keep the key only on the server, in an environment variable.` }
    ] },
    { id: 'roles', title: `Messages and roles`, blocks: [
      { type: 'p', html: `A conversation is a list of messages, and each message has a role:` },
      { type: 'table', head: [`Role`, `What it is`, `Example`], rows: [
        [`<b>system</b>`, `Rules and role. In the Claude Messages API, a separate top-level <code>system</code> field; in OpenAI-style APIs, a system or developer message`, `“You are the company’s IT assistant. Answer briefly and politely.”`],
        [`<b>user</b>`, `The text the user wrote`, `“How do I reset my password?”`],
        [`<b>assistant</b>`, `The model’s previous answers`, `“Which system is this for, please?”`]
      ] },
      { type: 'p', html: `Writing a good system prompt is the topic of Chapter 3 (Prompt engineering).` }
    ] },
    { id: 'stateless', title: `The API remembers nothing`, blocks: [
      { type: 'p', html: `Anthropic’s documentation says it plainly: the Messages API is <b>stateless</b>, so you send the entire conversation history every time. The model does not “remember” the previous request.` },
      { type: 'bars', title: `Text sent with each request (diagram)`, max: 6, items: [
        { label: `Request 1`, value: 2, text: `2 messages` },
        { label: `Request 2`, value: 4, text: `4 messages` },
        { label: `Request 3`, value: 6, text: `6 messages` }
      ], caption: `Each new request includes the system prompt plus all previous user and assistant messages again, and you pay for their tokens again.` },
      { type: 'note', tone: 'key', html: `Long conversation = more tokens per request. Solutions: prompt caching (below), and trimming or summarizing old messages (Chapter 4, compaction).` },
      { type: 'p', html: `With Anthropic’s beta “message threads” feature, you can send only the new message, but a thread expires 5 minutes after the last request and <b>the price does not change</b>: you still pay for the tokens of the full history.` }
    ] },
    { id: 'stream', title: `Streaming, limits and errors`, blocks: [
      { type: 'cards', items: [
        { tag: `Streaming`, title: `Token-by-token answers`, html: `If the request has <code>stream: true</code>, the answer arrives in chunks via server-sent events (SSE). The user sees the first word quickly.` },
        { tag: `Rate limit`, title: `The 429 error`, html: `Limits on requests (RPM) and tokens (TPM) per minute. The fix: wait and retry. But you also get a 429 when your balance or monthly limit runs out.` },
        { tag: `Error codes`, title: `What they mean`, html: `400 — bad request · 401 — bad key · 429 — limit · 5xx — server problem` }
      ] },
      { type: 'list', items: [
        `Anthropic measures limits per minute by RPM, input tokens (ITPM) and output tokens (OTPM); OpenAI by RPM, RPD, TPM and TPD.`,
        `A temporary 429 often comes with a <code>retry-after</code> header. OpenAI recommends exponential backoff: increase the wait time with each attempt and add a random delay (jitter).`,
        `If your balance or monthly spending limit has run out (Anthropic sends no retry-after; OpenAI says “exceeded your current quota”), retrying will not help. You need to top up your account.`
      ] }
    ] },
    { id: 'save', title: `How to save money`, blocks: [
      { type: 'stats', items: [
        { value: `≤ 10%`, label: `Prompt caching: when the repeated part is read from the cache, it costs 10% of the input price or less` },
        { value: `−50%`, label: `Batch API: for work that does not need an immediate answer` },
        { value: `80×`, label: `Smaller model: the price gap between Haiku 5.5 and Fable 5.2` },
        { value: `3–8×`, label: `Output tokens cost more than input (5× on Claude and GPT), so don’t ask for needlessly long answers` }
      ] },
      { type: 'table', head: [`Cache read price`, `Relative to the input price`], num: [1], rows: [
        [`Most Claude models`, `10%`], [`Claude Opus 5.5, Sonnet 5.5`, `5%`], [`Claude Fable 5.2`, `2.5%`], [`GPT-6 Astra`, `10%`], [`GPT-6.1 Sol, Terra`, `5%`]
      ], caption: `Batch discount (50%): Anthropic, OpenAI (Batch and Flex), Google, Mistral. At Anthropic, cache reads also do not count toward the ITPM limit.` }
    ] },
    { id: 'compat', title: `One format, many providers`, blocks: [
      { type: 'p', html: `The OpenAI API format has become a de facto standard: many services accept it. To switch providers, you usually change only the <b>address (base URL)</b>, the key and the model name.` },
      { type: 'table', head: [`Service`, `OpenAI-compatible base URL`], rows: [
        [`DeepSeek`, `<code>https://api.deepseek.com</code>`],
        [`Google Gemini`, `<code>https://generativelanguage.googleapis.com/v1beta/openai/</code>`],
        [`Hugging Face`, `<code>https://router.huggingface.co/v1</code>`],
        [`Ollama (local)`, `<code>http://localhost:11434/v1</code>`],
        [`LM Studio (local)`, `<code>http://localhost:1234/v1</code>`]
      ], caption: `OpenRouter, vLLM and the llama.cpp server also work with this format. DeepSeek and Meta also accept the Anthropic format.` },
      { type: 'note', tone: 'info', html: `The OpenAI library requires an API key, but Ollama ignores it, so any text will do. “Compatible” does not mean 100% identical: some parameters and features differ by provider.` }
    ] },
    { id: 'routers', title: `Routers: one key, many models`, blocks: [
      { type: 'cards', items: [
        { tag: `openrouter.ai`, title: `OpenRouter`, html: `Models from many providers through a single API. No markup is added to token prices; the fee is charged as a commission when you buy credits. Free models are limited to 50 requests a day (1,000 if you have bought at least 10 credits).` },
        { tag: `huggingface.co`, title: `HF Inference Providers`, html: `Groq, Together, Cerebras and other providers with a single Hugging Face token. No markup on provider prices. Convenient for open models.` }
      ] },
      { type: 'note', tone: 'warn', html: `Routers are convenient for quickly comparing models and for a fallback provider. But your data passes through a third party, so read the privacy policies of both the router and the underlying provider before sending sensitive data.` }
    ] },
    { id: 'local', title: `Running a model on your own computer`, blocks: [
      { type: 'table', head: [`Tool`, `What it is`, `Who it’s for`], rows: [
        [`<b>Ollama</b>`, `Terminal and local server, model library`, `Getting started fast`],
        [`<b>LM Studio</b>`, `Desktop app: macOS, Windows, Linux. GGUF, MLX on Apple Silicon`, `Trying models without writing code`],
        [`<b>Hugging Face</b>`, `Model hub: model cards, GGUF files`, `Finding and downloading models`],
        [`<b>llama.cpp</b>`, `Inference engine written in C/C++`, `Used inside LM Studio and many other local tools`],
        [`<b>vLLM</b>`, `High-throughput server`, `Multi-user production`]
      ] },
      { type: 'list', items: [
        `By default, Ollama runs on <code>127.0.0.1:11434</code> (change it with <code>OLLAMA_HOST</code>).`,
        `<b>GGUF</b> is a format that stores model weights and metadata in a single file.`,
        `When you run locally, data does not leave your computer. This is the safest option for sensitive data.`
      ] },
      { type: 'note', tone: 'warn', html: `Models with the <b>“cloud”</b> tag in the Ollama library send requests outside your computer. Don’t share sensitive data thinking it stays local.` }
    ] },
    { id: 'memory', title: `How much memory you need`, blocks: [
      { type: 'note', tone: 'key', title: `Formula`, html: `Memory ≈ number of parameters × size of one weight + KV cache (for the context) + runtime` },
      { type: 'table', head: [`Format`, `Bits / weight`, `8B model`], num: [1, 2], rows: [
        [`<b>F16</b>`, `16`, `≈ 16 GB`],
        [`<b>Q8_0</b>`, `≈ 8.5`, `≈ 8.5 GB`],
        [`<b>Q6_K</b>`, `6.56`, `≈ 6.6 GB`],
        [`<b>Q4_K_M</b> (Ollama default)`, `≈ 4.9`, `≈ 4.9 GB`]
      ], caption: `Source: Q6_K from the Hugging Face GGUF documentation; Q8_0 and Q4_K_M from the llama.cpp quantize table (Llama-3.1-8B: Q4_K_M = 4.58 GiB).` },
      { type: 'p', html: `The KV cache grows with the context length: for a Llama-3-8B class model in FP16, it is about 128 KB/token, so 8K tokens ≈ 1 GB.` },
      { type: 'table', head: [`GPU memory`, `Approximate model size in Q4_K_M`], rows: [[`8 GB`, `7–9B`], [`16 GB`, `14–20B`], [`24 GB`, `27–32B`]], caption: `A rough estimate from the formula (≈ 0.61 bytes/weight), leaving room for the KV cache and runtime. A long context needs more memory.` },
      { type: 'note', tone: 'info', html: `If the model does not fit fully on the GPU, part of it runs on the CPU, and speed drops sharply. Keep in mind that other programs also use GPU memory.` }
    ] },
    { id: 'privacy', title: `Where your data goes`, blocks: [
      { type: 'table', head: [`Service`, `Is the data used to train models?`], rows: [
        [`<b>Anthropic API</b>`, `No (by default)`],
        [`<b>OpenAI API</b>`, `No (unless you opt in); abuse monitoring logs are kept for up to 30 days`],
        [`<b>Gemini API · free tier</b>`, `Yes, and humans (reviewers) may read it`],
        [`<b>Gemini API · paid tier</b>`, `No`],
        [`<b>DeepSeek</b>`, `Data is stored in China and may be used for training (you can opt out)`],
        [`<b>Local (Ollama, LM Studio)</b>`, `Never leaves your computer`]
      ], caption: `As of November 2026. Source: provider privacy policies and API terms.` },
      { type: 'note', tone: 'warn', html: `The rules for the API and for consumer apps (Claude.ai, ChatGPT) are different. For example, for Claude Free/Pro/Max users, conversations are used for training if the setting is turned on. Google itself asks you not to send sensitive data to the free tier.` },
      { type: 'p', html: `Many countries have laws on sending and storing personal data abroad (for example, GDPR in the European Union). In a real product, check your own country’s requirements before sending user data to an API.` }
    ] },
    { id: 'choose', title: `Choosing a model: 4 questions`, blocks: [
      { type: 'table', head: [`Question`, `If the answer is “yes”`], rows: [
        [`Is the data sensitive?`, `A local model, or an open model on your own server`],
        [`Is the task complex (reasoning, code, agents)?`, `A flagship model`],
        [`Many requests, and a simple task?`, `A small model`],
        [`Do you need fast answers?`, `A small model + streaming`]
      ] },
      { type: 'bars', title: `Artificial Analysis Intelligence Index`, max: 70, items: [
        { label: `Claude Fable 5.2`, value: 65 },
        { label: `Gemini 4 Carbon`, value: 60 },
        { label: `Claude Opus 5.5`, value: 59 },
        { label: `GPT-6 Astra`, value: 57 },
        { label: `Gemini 4 Argon`, value: 50 }
      ], caption: `November 12, 2026, at the highest reasoning setting. Gemini 4 Carbon has restricted access; the publicly available Gemini 4 Argon scores 50.` },
      { type: 'list', items: [
        `<b>Arena</b> (formerly LMArena, arena.ai) is a leaderboard where people pick the better of two answers.`,
        `Be careful: benchmark questions can “leak” into training data (contamination). A provider’s own claims may not be independently verified.`,
        `The most reliable approach is to compare on 20–50 real examples from your own task (Chapter 9).`
      ] }
    ] },
    { id: 'cost', title: `In practice: what 10,000 questions a day costs`, blocks: [
      { type: 'p', html: `Let’s continue with the internal assistant bot from Chapter 1: 10M input and 3M output tokens per day (1,000 + 300 per question).` },
      { type: 'table', head: [`Model`, `Per day`, `Per month (30 days)`], num: [1, 2], rows: [
        [`Claude Haiku 5.5`, `$2.50`, `$75`],
        [`GPT-6 Luna`, `$2.50`, `$75`],
        [`Qwen3.8-Flash`, `$2.91`, `$87`],
        [`DeepSeek V4.1 Flash (peak)`, `$6.60`, `$198`],
        [`GPT-6.1 Terra`, `$25`, `$750`],
        [`Claude Sonnet 5.5`, `$50`, `$1,500`],
        [`Claude Opus 5.5`, `$100`, `$3,000`]
      ], caption: `Formula: per day = 10 × input price + 3 × output price. For example, Sonnet 5.5: 10 × $2 + 3 × $10 = $50. Calculated without caching, batch or thinking tokens.` },
      { type: 'note', tone: 'warn', html: `In Haiku 5.5 and GPT-6 Luna, thinking is on by default, so the real cost will be higher unless you lower the effort or turn thinking off.` },
      { type: 'note', tone: 'key', title: `The smart solution: routing`, html: `A small model classifies the message and answers simple questions itself. Only complex cases are sent to a large model. Quality stays high, and the cost stays close to that of the small model.` }
    ] }
  ],
  mistakes: [
    [`“GPT-6 is one model”`, `GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna.`],
    [`“The API remembers the conversation”`, `It is stateless: the history is sent again every time, and you pay for it.`],
    [`“The free Gemini API is private”`, `On the free tier, data is used for training and humans may see it.`],
    [`“Meta = open Llama”`, `The current Muse models are mostly closed.`],
    [`“A Q4 model = parameters × 0.5 bytes”`, `Q4_K_M ≈ 0.61 bytes/weight, plus the KV cache and runtime.`],
    [`“On a 429, just wait and retry”`, `If your balance or monthly limit has run out, only topping up your account will help.`],
    [`“Prices don’t change”`, `Gemini 4 Argon gets 2× more expensive from December 1, and Gemini 3.8 Flash from January 1, 2027. Always check the official page.`]
  ],
  lab: [
    { type: 'p', html: `You will compare one question across several models and measure a local model’s memory use. Two tasks:` },
    { type: 'cards', items: [
      { tag: `Task 1 · classification`, title: `Incident, question or request?`, html: `“My laptop won’t connect to Wi-Fi!” Ask for an answer of only one word.` },
      { tag: `Task 2 · writing`, title: `A reply message`, html: `A polite 2-sentence reply to an employee: say that their request has been received and will be resolved tomorrow.` }
    ] },
    { type: 'steps', items: [
      `<b>In the cloud:</b> go to openrouter.ai/chat. There you can pick several models, send one message to all of them at once, and see the answers side by side. Chat may require credits, so check your account.`,
      `Pick models from three different tiers (small, mid, large) and give them both tasks.`,
      `Build a table: model, tier, whether task 1 is correct, task 2 quality (1–5), price ($/1M tokens, from the model page).`,
      `<b>Locally:</b> give the same two tasks in Ollama, then in another terminal check the PROCESSOR column with <code>ollama ps</code>: how much of the model runs on the GPU and how much on the CPU.`
    ] },
    { type: 'term', lines: [
      `$ ollama run <model> --verbose`,
      `# in another terminal:`,
      `$ ollama ps`
    ] },
    { type: 'note', tone: 'key', html: `What to watch for: on a simple task like classification, a small model is often good enough, while for free-form writing, large models usually write much more naturally. Check this in your own table.` }
  ],
  quiz: [
    { q: `When you send the second message, do you also need to send the earlier conversation?`, options: [`No, the API remembers it`, `Yes, because the API is stateless`, `Only the system prompt`], answer: 1, explain: `The Messages API is stateless: every request sends the full history, and you pay for its tokens again.` },
    { q: `Which is the safest option for working with sensitive medical data?`, options: [`The free Gemini API`, `The cheapest model through a router`, `A local model`], answer: 2, explain: `With a local model, data never leaves the computer. On the free Gemini tier, data is used for training and humans may see it.` },
    { q: `Roughly how much memory does an 8B model take in Q4_K_M format (without the KV cache)?`, options: [`≈ 5 GB`, `≈ 16 GB`, `≈ 1 GB`], answer: 0, explain: `Q4_K_M ≈ 4.9 bits ≈ 0.61 bytes × 8 billion ≈ 4.9 GB. 16 GB is the F16 format.` },
    { q: `What is Ollama’s OpenAI-compatible address?`, options: [`http://localhost:11434/v1`, `https://api.openai.com/v1`, `http://localhost:1234/v1`], answer: 0, explain: `localhost:1234 is the default address of the LM Studio server.` },
    { q: `How much do 10M input and 3M output tokens per day cost on Claude Sonnet 5.5 ($2 / $10)?`, options: [`$12`, `$50`, `$500`], answer: 1, explain: `10 × $2 + 3 × $10 = $20 + $30 = $50.` }
  ],
  summary: [
    `Choosing a model is a trade-off between quality, price, speed and privacy. Prices differ by 80× even within one provider.`,
    `The API is stateless and measured in tokens. Save with caching, batch, a smaller model and shorter answers.`,
    `A local model is the safest option for privacy. Use the formula to estimate model size from your GPU memory; small local models are usually lower quality than large ones.`
  ],
  glossary: [
    [`API`, `An interface programs use to talk to each other; here, the way to send requests to a model over HTTPS.`],
    [`Stateless`, `The server does not remember previous requests; each request must be complete on its own.`],
    [`Streaming (SSE)`, `Receiving the answer in chunks instead of waiting for it to finish.`],
    [`Rate limit`, `A cap on requests or tokens per unit of time; exceed it and you get a 429.`],
    [`Prompt caching`, `Caching the repeated part of the input so it is cheaper to read.`],
    [`Batch API`, `Grouping requests and running them later at 50% lower cost.`],
    [`OpenAI-compatible`, `A service that accepts the OpenAI API format.`],
    [`Router`, `A service that offers models from several providers through a single API.`],
    [`GGUF`, `A file format for local models (weights + metadata).`],
    [`Quantization`, `Reducing weight precision to shrink the model size (for example, Q4_K_M).`],
    [`KV cache`, `Intermediate computations stored for the context; it grows as the context gets longer.`],
    [`Routing`, `Directing a request to the right model based on the task.`]
  ],
  sources: [
    { label: `Anthropic — Models overview`, url: `https://platform.claude.com/docs/en/about-claude/models/overview` },
    { label: `Anthropic — Pricing`, url: `https://platform.claude.com/docs/en/about-claude/pricing` },
    { label: `Anthropic — Working with messages`, url: `https://platform.claude.com/docs/en/build-with-claude/working-with-messages` },
    { label: `Anthropic — Message threads`, url: `https://platform.claude.com/docs/en/build-with-claude/message-threads` },
    { label: `Anthropic — Rate limits`, url: `https://platform.claude.com/docs/en/api/rate-limits` },
    { label: `OpenAI — Models and Pricing`, url: `https://developers.openai.com/api/docs/pricing` },
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
