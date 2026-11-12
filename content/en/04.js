window.BOOK.content.en['04'] = {
  lead: `Prompt engineering teaches “how to ask.” Context engineering teaches “what exactly to give the model”: which information, when, and how much. For long-running agents, it has become the most important skill. In this chapter you will learn why context “breaks down,” how to provide the right information, and techniques for memory and for compressing long contexts.`,
  minutes: 45,
  tags: [`Theory`, `Lab: context and memory`],
  goals: [
    `The definition of context engineering and how it differs from prompt engineering`,
    `How context breaks down: context rot and four types of failure`,
    `Loading information up front vs. fetching it when needed (just-in-time)`,
    `For long tasks: compaction, clearing results, note-taking, sub-agents, memory`
  ],
  sections: [
    { id: 'what', title: `What context engineering is`, blocks: [
      { type: 'p', html: `Anthropic’s definition (September 2025): context engineering is <b>selecting and maintaining the optimal set of tokens</b> given to a model while it works. The context includes the system prompt, tool definitions, conversation history, tool results, documents and memory, all of it.` },
      { type: 'cards', items: [
        { tag: `Prompt engineering`, title: `How to ask`, html: `Writing a good instruction for a one-off task.` },
        { tag: `Context engineering`, title: `What to give`, html: `Controlling which information reaches the model at each step. It is an iterative process: a decision is made every time something is sent to the model.` }
      ] },
      { type: 'note', tone: 'key', html: `The goal is the <b>smallest, most useful set of tokens</b> that produces the desired result. More context does not always mean a better result.` }
    ] },
    { id: 'why', title: `Why context “breaks down”`, blocks: [
      { type: 'p', html: `In the attention mechanism, every token connects to every other token: for n tokens, that is roughly n² relationships. Anthropic calls this the <b>attention budget</b>. It is limited, and every new token “eats” a bit of it. A Chroma study (2025) showed that across 18 models, reliability gradually declined as the input grew longer (context rot).` },
      { type: 'p', html: `Drew Breunig (2025) identifies four types of failure in long contexts:` },
      { type: 'table', head: [`Failure`, `What happens`, `Example`], rows: [
        [`<b>Poisoning</b>`, `A hallucination gets into the context and is reused again and again`, `A Gemini agent playing Pokémon got “stuck” on a wrong goal`],
        [`<b>Distraction</b>`, `The model relies too much on the context instead of what it learned in training`, `After 100K tokens, Gemini started repeating past actions`],
        [`<b>Confusion</b>`, `Irrelevant information affects the answer`, `A quantized Llama 3.1 8B failed with 46 tools but succeeded with 19`],
        [`<b>Clash</b>`, `New information contradicts earlier information`, `When information was split across several messages, results dropped by 39% on average`]
      ], caption: `Source: Breunig, “How Long Contexts Fail,” 2025.` }
    ] },
    { id: 'limits', title: `What happens when you exceed the limit`, blocks: [
      { type: 'p', html: `Systems behave differently when the context limit is exceeded: cloud APIs usually return an error, while some local tools may truncate the input, and the model does not “see” the cut part at all. For example, Ollama picks the default context based on GPU memory: with less than 24 GB of VRAM, it is only 4,096 tokens.` },
      { type: 'note', tone: 'warn', html: `Always watch the input token count (<code>usage</code> in APIs, <code>prompt_eval_count</code> in Ollama), and check your tool’s documentation for what happens when the limit is exceeded. If you see fewer tokens than expected, the text may have been truncated.` }
    ] },
    { id: 'jit', title: `When to provide information: up front or when needed`, blocks: [
      { type: 'cards', items: [
        { tag: `Preloading`, title: `Everything at the start`, html: `The needed documents are given at the start of the request. Simple and fast, but it fills the context quickly.` },
        { tag: `Just-in-time`, title: `Fetch when needed`, html: `The context holds only “addresses” (file paths, queries, links). The agent loads the information itself through tools when it needs it.` }
      ] },
      { type: 'p', html: `A <b>hybrid</b> approach is often best. For example, Claude Code loads the project rules file (CLAUDE.md) right at the start, but finds code files through search (glob, grep) when needed.` }
    ] },
    { id: 'long', title: `Four techniques for long tasks`, blocks: [
      { type: 'table', head: [`Technique`, `How it works`, `When`], rows: [
        [`<b>Compaction</b>`, `When the context fills up, the conversation history is turned into a short summary, and a new context starts from that summary`, `Long conversations and agent work`],
        [`<b>Clearing results</b>`, `Old tool results are removed from the context; the lightest technique`, `When an agent calls many tools`],
        [`<b>Note-taking</b>`, `The agent writes important things to an external file (for example, NOTES.md) and reads it back later`, `Tasks that take many hours`],
        [`<b>Sub-agents</b>`, `A helper agent works with its own clean context and returns only a short summary (1,000–2,000 tokens)`, `Independent, parallel parts`]
      ], caption: `Source: Anthropic, “Effective context engineering for AI agents,” 2025.` }
    ] },
    { id: 'tools', title: `Providers’ built-in tools`, blocks: [
      { type: 'table', head: [`Tool`, `Claude`, `OpenAI`], rows: [
        [`Compression`, `Compaction (beta): on demand or when a threshold is exceeded (default 150K tokens)`, `Compaction in the Responses API: a threshold or a separate endpoint; the result is an encrypted item`],
        [`Clearing`, `Context editing (beta): removes old tool results and thinking blocks`, `—`],
        [`Memory`, `Memory tool: the model creates and reads files in a <code>/memories</code> folder; the files are stored on your side`, `—`],
        [`Conversation state`, `Usually the full history is sent every time; with beta “message threads,” only new messages (a thread expires in 5 minutes, the price does not change)`, `Manually, <code>previous_response_id</code>, or the Conversations API; responses are stored for 30 days by default`]
      ], caption: `As of November 2026. Beta features may change, so check the official documentation.` },
      { type: 'note', tone: 'info', html: `Compaction and context editing are not the same thing: compaction <b>summarizes</b> the history, while context editing <b>removes</b> old parts. Changing the context invalidates the prompt cache, so factor this into the cost.` }
    ] },
    { id: 'memory', title: `Types of memory`, blocks: [
      { type: 'p', html: `An LLM remembers nothing on its own: “memory” is always an external system. The CoALA paper (Sumers et al., 2023) identifies four types, modeled on human memory:` },
      { type: 'cards', items: [
        { tag: `Working`, title: `Working memory`, html: `The current context window: what the model sees right now.` },
        { tag: `Episodic`, title: `Memory of events`, html: `The history of past conversations and actions.` },
        { tag: `Semantic`, title: `Memory of knowledge`, html: `Facts: user preferences, documents.` },
        { tag: `Procedural`, title: `Memory of skills`, html: `How to do things: rules, instructions, code.` }
      ] },
      { type: 'list', items: [
        `<b>MemGPT</b> (Packer et al., 2023): “virtual context” management modeled on operating system memory. Its successor, Letta, splits memory into core, recall and archival parts.`,
        `<b>Mem0</b> (2025): a ready-made layer for long-term memory.`,
        `<b>Project files</b>: a simple and powerful technique. For example, Claude Code reads the CLAUDE.md file at the start of every session (recommended: under 200 lines). Many tools also support an AGENTS.md file.`
      ] }
    ] },
    { id: 'cache', title: `Building cache-friendly context`, blocks: [
      { type: 'p', html: `Prompt caching works only for the <b>unchanging beginning</b> (the prefix). That is why order matters: static content at the start, variable content at the end.` },
      { type: 'flow', items: [
        { title: `Tools`, text: `Static` },
        { title: `System prompt`, text: `Static` },
        { title: `Documents`, text: `Rarely change` },
        { title: `Conversation and question`, text: `New every time` }
      ] },
      { type: 'stats', items: [
        { value: `0.1×`, label: `cache read price on Claude (0.05× on Opus/Sonnet 5.5, 0.025× on Fable 5.2)` },
        { value: `1.25×`, label: `cache write price (5-minute cache; 1-hour cache is 2×)` },
        { value: `512`, label: `tokens: the minimum cacheable prefix on current Claude models` }
      ] },
      { type: 'note', tone: 'warn', html: `A classic mistake: putting the current time or the user’s name at the start of the system prompt. Then the prefix changes every time, and the cache does not work at all.` }
    ] }
  ],
  mistakes: [
    [`“The more context, the better”`, `Context rot and the four failure types show the opposite.`],
    [`“Exceeding the limit always produces an error”`, `Cloud APIs usually return an error, but some systems (for example, Ollama) silently truncate the text, so watch the token count.`],
    [`“The model remembers conversations”`, `Memory is always an external system: files, a database, or a provider tool.`],
    [`“Compaction = context editing”`, `Compaction summarizes; context editing removes.`],
    [`“The memory tool stores data on Anthropic’s servers”`, `The files are stored on your side.`],
    [`“Putting the time at the start of the system prompt is harmless”`, `The prefix changes, and prompt caching stops working.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. Observe context poisoning (no code).</b> In any chat app:` },
    { type: 'steps', items: [
      `In a new conversation, tell the model a false “fact”: “All prices in the project are in euros.”`,
      `Work on other topics for 10–15 messages, then ask a question about prices. Is the model still using the false fact?`,
      `Open a new conversation and give only a correct, short summary (manual compaction). Compare the answers.`
    ] },
    { type: 'p', html: `<b>B. See context truncation for yourself (Ollama).</b> Increase the context size before working with long text:` },
    { type: 'term', lines: [
      `$ ollama run <model> --verbose`,
      `>>> /set parameter num_ctx 32768`,
      `# now give it a long text and look at the "prompt eval count" line`
    ] },
    { type: 'p', html: `If the “prompt eval count” is much lower than expected, the text may have been truncated. More context needs more memory (Chapter 2: KV cache).` },
    { type: 'p', html: `<b>C. Project memory.</b> In Claude Code or another AI coding assistant, write a 20–30 line rules file (CLAUDE.md or AGENTS.md): the project goal, commands, style. Give the same task without the file and with it, and compare the results.` }
  ],
  quiz: [
    { q: `What is the goal of context engineering?`, options: [`Fill the context as much as possible`, `Provide the smallest, most useful set of tokens for the result`, `Write only the system prompt`], answer: 1, explain: `Anthropic’s definition: the smallest set of high-signal tokens that produces the desired result.` },
    { q: `In Breunig’s example, how did a quantized Llama 3.1 8B perform depending on the number of tools?`, options: [`It failed with 46 tools and succeeded with 19`, `It failed with 19 tools and succeeded with 46`, `The number of tools made no difference`], answer: 0, explain: `Unneeded tools also distract the context; this is the “confusion” failure.` },
    { q: `What is the “poisoning” failure?`, options: [`A hallucination gets into the context and is reused again and again`, `Too many unneeded tools`, `The model running slowly`], answer: 0, explain: `Wrong information that gets in once is treated as “truth” in later steps.` },
    { q: `What should you put at the start for prompt caching?`, options: [`The current time and the user’s name`, `The static parts: tools, system prompt, documents`, `The latest question`], answer: 1, explain: `The cache only works for an identical prefix; the variable parts should be at the end.` },
    { q: `What is the benefit of a sub-agent in context engineering?`, options: [`It works without filling the main agent’s context and returns only a short summary`, `It saves tokens because it is free`, `It erases the main agent’s memory`], answer: 0, explain: `A sub-agent works in a clean context and returns a summary of 1,000–2,000 tokens.` }
  ],
  summary: [
    `Context engineering means controlling exactly what reaches the model at each step. Less but more precise context is better.`,
    `Long context breaks down (rot, poisoning, distraction, confusion, clash) and is sometimes silently truncated, so watch the token count.`,
    `For long tasks: just-in-time loading, compaction, clearing results, note-taking, sub-agents and a cache-friendly order.`
  ],
  glossary: [
    [`Context engineering`, `Selecting and managing the set of tokens given to a model.`],
    [`Context rot`, `The gradual decline in a model’s reliability as the context grows longer.`],
    [`Attention budget`, `The model’s limited attention “budget”; every new token takes a share of it.`],
    [`Just-in-time`, `Loading information through a tool when it is needed, not up front.`],
    [`Compaction`, `Compressing the context by turning the conversation history into a summary.`],
    [`Context editing`, `Removing old tool results or thinking blocks from the context.`],
    [`Sub-agent`, `A helper agent that works in a separate context and returns a short result.`],
    [`Prefix`, `The unchanging beginning of a request; prompt caching relies on it.`]
  ],
  sources: [
    { label: `Anthropic — Effective context engineering for AI agents (2025)`, url: `https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents` },
    { label: `Chroma — Context Rot (2025)`, url: `https://www.trychroma.com/research/context-rot` },
    { label: `Breunig — How Long Contexts Fail (2025)`, url: `https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html` },
    { label: `Anthropic — Compaction`, url: `https://platform.claude.com/docs/en/build-with-claude/compaction` },
    { label: `Anthropic — Context editing`, url: `https://platform.claude.com/docs/en/build-with-claude/context-editing` },
    { label: `Anthropic — Memory tool`, url: `https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool` },
    { label: `Anthropic — Prompt caching`, url: `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` },
    { label: `OpenAI — Conversation state`, url: `https://developers.openai.com/api/docs/guides/conversation-state` },
    { label: `OpenAI — Compaction`, url: `https://developers.openai.com/api/docs/guides/compaction` },
    { label: `Packer et al., 2023 — MemGPT`, url: `https://arxiv.org/abs/2310.08560` },
    { label: `Sumers et al., 2023 — CoALA`, url: `https://arxiv.org/abs/2309.02427` },
    { label: `Mem0, 2025`, url: `https://arxiv.org/abs/2504.19413` },
    { label: `Claude Code — Memory (CLAUDE.md)`, url: `https://code.claude.com/docs/en/memory` }
  ]
};
