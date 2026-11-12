window.BOOK.content.en['10'] = {
  lead: `There is a big gap between a working demo and a working product. In production you get thousands of requests, the provider sometimes returns errors, costs rise unexpectedly, and model versions get deprecated. In this chapter you will learn what to monitor, tracing, reliability techniques, cost control, gateways, and monitoring tools.`,
  minutes: 40,
  tags: [`Theory`, `Practice: measuring latency`],
  goals: [
    `Which metrics to monitor: latency, speed, cost, errors, quality`,
    `Tracing and observability tools: Langfuse, LangSmith, Helicone, and others`,
    `Reliability: retries, fallback models, timeouts, version pinning`,
    `Cost control and gateways`
  ],
  sections: [
    { id: 'metrics', title: `What to monitor`, blocks: [
      { type: 'table', head: [`Metric`, `What it is`, `Why it matters`], rows: [
        [`<b>TTFT</b> (time to first token)`, `Time until the first token arrives`, `This is how the user senses that “the answer has started”`],
        [`<b>Speed</b>`, `Tokens per second`, `How long a long answer takes`],
        [`<b>p50 / p95 latency</b>`, `The median and the slowest 5% of requests`, `An average hides slow requests`],
        [`<b>Cost</b>`, `Per request, user, and feature`, `See which part is “eating” the money`],
        [`<b>Errors</b>`, `429, 5xx, timeouts, responses that don’t match the schema`, `Reliability and limits`],
        [`<b>Quality</b>`, `User ratings, eval results on samples`, `Know that quality didn’t drop after a model or prompt change`]
      ] },
      { type: 'note', tone: 'key', html: `Look at the distribution, not a single number: a “cold” start, queuing, and large contexts can multiply p95 several times over. For long answers, streaming makes the wait feel much shorter for the user.` }
    ] },
    { id: 'tracing', title: `Tracing: seeing the path of every request`, blocks: [
      { type: 'p', html: `In an agent or RAG system, a single user request is made of dozens of steps: retrieval, several model calls, tools. A <b>trace</b> is the record of the whole request, and a <b>span</b> is each step inside it (its time, input, output, tokens, cost).` },
      { type: 'flow', items: [
        { title: `Trace: user request`, text: `3.2 s total` },
        { title: `Span: retrieval`, text: `0.3 s` },
        { title: `Span: model`, text: `1.9 s, 1,200 tokens` },
        { title: `Span: tool`, text: `0.6 s` }
      ] },
      { type: 'p', html: `OpenTelemetry’s GenAI semantic conventions are emerging as the standard (for example, <code>gen_ai.server.time_to_first_token</code>). As of November 2026 they are still in <b>Development</b> status, meaning they are not stable and may change.` },
      { type: 'table', head: [`Tool`, `Status (November 2026)`], rows: [
        [`<b>Langfuse</b>`, `Open source, can be self-hosted; acquired by ClickHouse in January 2026, license unchanged (core is MIT, ee/ folders are separate)`],
        [`<b>LangSmith</b>`, `LangChain’s platform: Developer is free, 5,000 traces per month; Plus is $39 per seat`],
        [`<b>Helicone</b>`, `Works as a proxy; acquired by Mintlify in March 2026, now in “maintenance” mode (security updates, bug fixes, and new model support continue)`],
        [`<b>Arize Phoenix</b>`, `Built on OpenTelemetry; Elastic License 2.0: the code is open, but it is not open source in the OSI sense`],
        [`<b>OpenLIT</b>`, `Apache 2.0, built on OpenTelemetry`]
      ], caption: `This market changes fast: check a tool’s current status before you choose it.` }
    ] },
    { id: 'reliability', title: `Reliability techniques`, blocks: [
      { type: 'table', head: [`Problem`, `Solution`], rows: [
        [`Transient 429, 500, 529 (overloaded)`, `Retry with exponential backoff and respect the <code>retry-after</code> header. The Anthropic SDK retries 2 times by default`],
        [`429 because the monthly spend cap was reached`, `Retrying won’t help (there is no retry-after): raise the limit or wait for it to reset. A spend limit you set yourself returns 400 instead`],
        [`The provider is down`, `A fallback model or provider`],
        [`A very long request`, `Timeout; for requests longer than 10 minutes, use streaming or the Batch API`],
        [`The stream broke midway`, `Handle error events inside the stream even after an HTTP 200 arrives`],
        [`Repeated identical questions`, `Prompt caching; cache responses at the app or gateway level`]
      ], caption: `Every Anthropic response has a <code>request-id</code> header. You will need it to resolve issues with the provider, so log it.` }
    ] },
    { id: 'versions', title: `Model versions get deprecated`, blocks: [
      { type: 'p', html: `In production, pin the model name to an exact version and track deprecation schedules. The provider retires a model after a set period, and your code stops working that day.` },
      { type: 'table', head: [`Provider`, `Notice period`, `Example`], rows: [
        [`Anthropic`, `At least 60 days`, `claude-sonnet-4-5-20250929 will be retired on November 30, 2026; replaced by claude-sonnet-5-5`],
        [`OpenAI`, `At least 6 months for GA models (custom variants: 3 months, preview: ~2 weeks)`, `gpt-5, gpt-5-mini, o3 on December 11, 2026`]
      ] },
      { type: 'note', tone: 'warn', html: `It’s not only models that change, APIs do too: Claude API version 2026-10-21 removed temperature, top_p, and top_k (Chapter 1). Run your evals (Chapter 9) before switching the model or API version.` }
    ] },
    { id: 'cost', title: `Cost control`, blocks: [
      { type: 'list', items: [
        `<b>Usage and Cost APIs:</b> Anthropic (<code>/v1/organizations/usage_report/messages</code>, <code>cost_report</code>) and OpenAI (<code>/v1/organization/usage/completions</code>, <code>/costs</code>) work with an Admin key and show usage by model and key, and cost by model and workspace. Anthropic now marks them as “legacy” and recommends the Usage and Cost Analytics API for new integrations.`,
        `<b>Set limits per user and per feature</b> so that a single buggy loop or an abusive user can’t drain the account.`,
        `<b>Routing:</b> send simple requests to a smaller model (Chapter 2).`,
        `<b>Track the cache ratio:</b> the share of input tokens read from the cache. On Claude, a cache read costs 10% of the input price (5% on Opus and Sonnet 5.5, 2.5% on Fable 5.2).`,
        `<b>Batch API</b> is 50% cheaper, for work that doesn’t need an immediate response.`
      ] }
    ] },
    { id: 'gateway', title: `Gateway: a “gate” for model requests`, blocks: [
      { type: 'p', html: `A gateway sits between your app and the providers: many models through one key and one endpoint, fallback models, logs, costs, and limits.` },
      { type: 'cards', items: [
        { tag: `Open source`, title: `LiteLLM`, html: `Proxy: virtual keys, spend by project and user, load balancing, fallback.` },
        { tag: `Open source (MIT)`, title: `Portkey`, html: `Fallback, automatic retries, load balancing, guardrails.` },
        { tag: `Cloud`, title: `Cloudflare AI Gateway`, html: `Caching, rate limiting, retries, fallback, analytics.` },
        { tag: `Cloud`, title: `Vercel AI Gateway`, html: `Fallback, budgets (HTTP 402 when exceeded), no markup on token prices.` }
      ] },
      { type: 'note', tone: 'warn', title: `Supply chain risk`, html: `According to LiteLLM’s own announcement, versions 1.82.7 and 1.82.8 on PyPI turned out to be malicious in March 2026 (according to the initial analysis, through a Trivy dependency in CI). A gateway sees all your keys: pin package versions and review updates.` }
    ] },
    { id: 'serving', title: `Running open models yourself`, blocks: [
      { type: 'table', head: [`Tool`, `Features`], rows: [
        [`<b>vLLM</b>`, `Apache 2.0; PagedAttention; OpenAI-compatible server, also accepts the Anthropic Messages format`],
        [`<b>SGLang</b>`, `Apache 2.0; runs on NVIDIA, AMD, TPU, and other hardware`],
        [`<b>Hugging Face TGI</b>`, `In maintenance mode; Hugging Face recommends vLLM or SGLang, and llama.cpp or MLX for local use`]
      ] },
      { type: 'p', html: `Managed options: Amazon Bedrock, Microsoft Foundry, and Google Cloud’s platform offer many models inside your own cloud.` }
    ] }
  ],
  mistakes: [
    [`“Average latency is fine, so everything is fine”`, `Look at p95 and the “cold” start: while the model is loading into memory, the first response arrives much later.`],
    [`“If I get a 429, retrying is enough”`, `If the spend cap has been reached, retrying won’t help until the limit is raised or resets.`],
    [`“The model name won’t change”`, `Models are retired with notice ranging from a few weeks (preview) to 6 months. Pin the version and track the schedule.`],
    [`“The OpenTelemetry GenAI conventions are stable”`, `As of November 2026 they are in Development status.`],
    [`“Helicone has shut down”`, `It is running in maintenance mode.`],
    [`“The gateway package is safe because it’s open source”`, `Supply chain attacks can happen (LiteLLM, 2026). Pin your versions.`]
  ],
  lab: [
    { type: 'p', html: `Measure latency yourself (Ollama):` },
    { type: 'steps', items: [
      `Unload the model from memory: <code>ollama stop &lt;model&gt;</code>.`,
      `Ask a question with <code>ollama run &lt;model&gt; --verbose</code>. Write down “load duration” and “total duration”: this is the “cold” start.`,
      `Ask the same question 5 more times (with <code>/clear</code> each time). Write down the “eval rate” and total time: this is the “warm” state.`,
      `Find the median and the slowest result. How big is the difference?`
    ] },
    { type: 'p', html: `<b>Cost exercise:</b> build a table for your own project: requests per day × average input and output tokens × price (Chapter 2). Calculate how much the cost drops with a 50% and an 80% cache ratio.` }
  ],
  quiz: [
    { q: `What does TTFT measure?`, options: [`The total length of the answer`, `The time until the first token arrives`, `Tokens per second`], answer: 1, explain: `Time to first token: when the user sees the answer start.` },
    { q: `What should you do if you get a 429 because the spend limit was reached?`, options: [`Retry with exponential backoff`, `Raise the limit or stop the requests`, `Retry endlessly with a different API key`], answer: 1, explain: `This kind of 429 has no retry-after, and retrying won’t help until the limit resets.` },
    { q: `At minimum, how much notice does Anthropic give before retiring a model?`, options: [`7 days`, `60 days`, `1 year`], answer: 1, explain: `Anthropic gives at least 60 days; OpenAI gives at least 6 months for GA models.` },
    { q: `What is the difference between a trace and a span?`, options: [`A trace is the whole request, a span is one step inside it`, `They are the same thing`, `A span is the whole request, a trace is one step`], answer: 0, explain: `A trace records the whole path, and a span records parts such as each model call or tool.` },
    { q: `What is a “cold start”?`, options: [`The first request while the model is not yet loaded into memory`, `The server cooling down`, `The cache being cleared`], answer: 0, explain: `TTFT spikes until the model loads; that’s why you should track p95 and the first requests separately.` }
  ],
  summary: [
    `Monitor latency (TTFT, p95), speed, cost, errors, and quality; use traces to see every step.`,
    `Reliability: backoff, fallback, timeouts, streaming, and version pinning. Models and APIs are deprecated regularly.`,
    `Cost: limits, routing, caching, and batching. Gateways are convenient, but don’t forget the supply chain risk.`
  ],
  glossary: [
    [`TTFT`, `The time until the first token arrives.`],
    [`p95`, `95% of requests complete faster than this time.`],
    [`Trace / span`, `The full record of a request and a single step inside it.`],
    [`Fallback`, `Switching to a backup model when the primary model fails.`],
    [`Exponential backoff`, `Retrying with a longer wait on each attempt.`],
    [`Gateway`, `A control layer between the app and model providers.`],
    [`Deprecation`, `Declaring a model or feature outdated and setting a retirement date.`],
    [`Cold start`, `The first request while the model is not loaded into memory.`]
  ],
  sources: [
    { label: `OpenTelemetry — GenAI semantic conventions`, url: `https://github.com/open-telemetry/semantic-conventions-genai` },
    { label: `Anthropic — Errors`, url: `https://platform.claude.com/docs/en/api/errors` },
    { label: `Anthropic — Usage and Cost API`, url: `https://platform.claude.com/docs/en/manage-claude/usage-cost-api` },
    { label: `Anthropic — Model deprecations`, url: `https://platform.claude.com/docs/en/about-claude/model-deprecations` },
    { label: `Anthropic — Prompt caching`, url: `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` },
    { label: `OpenAI — Deprecations`, url: `https://developers.openai.com/api/docs/deprecations` },
    { label: `OpenAI — Usage API`, url: `https://developers.openai.com/cookbook/examples/completions_usage_api` },
    { label: `Langfuse — Joining ClickHouse`, url: `https://langfuse.com/blog/joining-clickhouse` },
    { label: `LangChain — Pricing`, url: `https://www.langchain.com/pricing` },
    { label: `Mintlify — Helicone`, url: `https://mintlify.com/blog/mintlify-acquires-helicone` },
    { label: `Arize Phoenix`, url: `https://github.com/Arize-ai/phoenix` },
    { label: `OpenLIT`, url: `https://github.com/openlit/openlit` },
    { label: `Vercel AI Gateway`, url: `https://vercel.com/docs/ai-gateway` },
    { label: `Cloudflare AI Gateway`, url: `https://developers.cloudflare.com/ai-gateway/` },
    { label: `Portkey Gateway`, url: `https://github.com/Portkey-AI/gateway` },
    { label: `LiteLLM — Security update (March 2026)`, url: `https://docs.litellm.ai/blog/security-update-march-2026` },
    { label: `vLLM`, url: `https://github.com/vllm-project/vllm` },
    { label: `SGLang`, url: `https://github.com/sgl-project/sglang` },
    { label: `Hugging Face TGI`, url: `https://github.com/huggingface/text-generation-inference` }
  ]
};
