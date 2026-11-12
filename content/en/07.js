window.BOOK.content.en['07'] = {
  lead: `An agent is an LLM that chooses its own actions: it calls tools, reads the results and keeps going until the task is done. In this chapter you will learn how tool calling works, the difference between agents and workflows, the MCP protocol, multi-agent systems, reliability problems and the main frameworks.`,
  minutes: 55,
  tags: [`Theory`, `Hands-on: Connecting MCP`],
  goals: [
    `Understand how tool calling (function calling) works and who executes it`,
    `The difference between workflows and agents, and five core patterns`,
    `MCP: architecture, capabilities, the 2026 version and security`,
    `When multi-agent helps and when it hurts; frameworks`
  ],
  sections: [
    { id: 'what', title: `What an agent is`, blocks: [
      { type: 'p', html: `Anthropic’s article “Building effective agents” (December 2024) distinguishes two concepts:` },
      { type: 'cards', items: [
        { tag: `Workflow`, title: `The path is written in advance`, html: `The LLM and tools follow fixed code paths written by a developer. Easy to predict, stable.` },
        { tag: `Agent`, title: `The model chooses the path`, html: `The LLM directs its own process and decides which tool to use when. Flexible, but more expensive and more error-prone.` }
      ] },
      { type: 'p', html: `Both are built on the <b>augmented LLM</b>: a model connected to retrieval, tools and memory.` },
      { type: 'note', tone: 'key', html: `Anthropic’s advice: start with the simplest solution and add complexity only if it improves results. Many applications need neither an agent nor a workflow: a single LLM call improved with retrieval and examples is enough. Use the LLM API directly first; if you use a framework, understand what happens inside it.` }
    ] },
    { id: 'toolcall', title: `Tool calling: the model does not run the function`, blocks: [
      { type: 'p', html: `The most common misconception: “the model calls the function.” In reality, the model only writes a <b>call request</b>: which function, with which arguments. <b>Your application</b> runs the function and returns the result to the model.` },
      { type: 'flow', items: [
        { title: `1. Question`, text: `“What is the status of my ticket 12345?” + tool definitions` },
        { title: `2. The model asks`, text: `ticket_status({"number": "12345"})` },
        { title: `3. The app executes`, text: `From the database: status “in progress”, date November 14` },
        { title: `4. The model answers`, text: `“Your ticket is being worked on and will be resolved tomorrow.”` }
      ] },
      { type: 'p', html: `For each tool, the model is given a name, a description and an argument schema (JSON Schema). The description matters a lot: it is exactly how the model understands when to use which tool.` },
      { type: 'table', head: [`Provider`, `Model request`, `Result you return`], rows: [
        [`Claude`, `<code>tool_use</code> block (id, name, input), <code>stop_reason: "tool_use"</code>`, `<code>tool_result</code> block with the matching <code>tool_use_id</code>`],
        [`OpenAI (Responses API)`, `<code>function_call</code> item (call_id, name, arguments)`, `<code>function_call_output</code> with the matching <code>call_id</code>`],
        [`Gemini (generateContent)`, `<code>functionCall</code> part`, `<code>functionResponse</code> part`]
      ], caption: `The names differ, but the mechanism is the same. In Claude, <code>strict: true</code> guarantees that the call fully matches the schema.` }
    ] },
    { id: 'loop', title: `The agent loop`, blocks: [
      { type: 'p', html: `An agent is tool calling turned into a loop. The model sees the result, chooses the next step and keeps going until it answers without calling a tool. Each pass is one <b>turn</b>.` },
      { type: 'flow', items: [
        { title: `Task` },
        { title: `The model thinks`, text: `Chooses the next step` },
        { title: `Tool`, text: `The app executes it` },
        { title: `Result`, text: `Added to the context` },
        { title: `Repeat or answer` }
      ] },
      { type: 'note', tone: 'info', html: `On every turn, the whole history (including tool results) is sent again. That is why agents use far more tokens than a plain chat: about 4 times as many, by Anthropic’s measurement.` }
    ] },
    { id: 'servertools', title: `Client tools and server tools`, blocks: [
      { type: 'cards', items: [
        { tag: `Client tools`, title: `Run in your application`, html: `Functions you write yourself and tools from the provider’s schema (for example, bash, text editor and computer use in Claude). You return the result.` },
        { tag: `Server tools`, title: `Run on the provider’s servers`, html: `For example, web search, web fetch and code execution in Claude; web search and code interpreter in OpenAI. Some are billed separately per use.` }
      ] }
    ] },
    { id: 'patterns', title: `Five workflow patterns`, blocks: [
      { type: 'table', head: [`Pattern`, `How it works`, `Example`], rows: [
        [`<b>Prompt chaining</b>`, `The task is split into sequential steps; each step takes the output of the previous one`, `Write text → review → translate`],
        [`<b>Routing</b>`, `The input is classified and sent down the matching path`, `Employee request: technical / access rights / equipment`],
        [`<b>Parallelization</b>`, `Several parts run at the same time, or several answers are compared`, `Analyzing 5 sections of a document in parallel`],
        [`<b>Orchestrator-workers</b>`, `A lead model splits the task and hands it out to workers`, `Research: the lead agent sends out 3 searchers`],
        [`<b>Evaluator-optimizer</b>`, `One model writes, another evaluates, and the loop repeats`, `Translator + critic loop`]
      ], caption: `Pattern definitions: Anthropic, “Building effective agents”, 2024. The examples are ours.` }
    ] },
    { id: 'react', title: `ReAct`, blocks: [
      { type: 'p', html: `<b>ReAct</b> (Yao et al., 2022; ICLR 2023) is the idea of interleaving reasoning and acting: the model writes a thought, takes an action, observes the result and thinks again. The paper reports absolute improvements of +34% on ALFWorld and +10% on WebShop (compared with imitation and RL methods).` },
      { type: 'p', html: `ReAct originally worked through prompting: the model wrote “Thought / Action / Observation” text, and the application parsed it. Today’s APIs return tool calls in a ready-made structured form, and reasoning lives in separate thinking blocks. The loop is the same, but much more reliable.` }
    ] },
    { id: 'mcp', title: `MCP: a universal “connector” for tools`, blocks: [
      { type: 'p', html: `<b>Model Context Protocol (MCP)</b> is an open standard for connecting AI applications to external tools and data. Anthropic announced it on November 25, 2024. On December 9, 2025, it was donated to the <b>Agentic AI Foundation</b> (AAIF) under the Linux Foundation; the co-founders are Anthropic, Block and OpenAI.` },
      { type: 'p', html: `The advantage: you write one MCP server, and it works in any application that supports MCP: Claude, ChatGPT, Cursor, VS Code, Gemini, Microsoft Copilot and others.` },
      { type: 'flow', items: [
        { title: `Host`, text: `AI application: Claude Desktop, IDE` },
        { title: `Client`, text: `Connector inside the host, one per server` },
        { title: `Server`, text: `Provides tools and data` }
      ] },
      { type: 'table', head: [`Capability`, `Provided by`, `What`], rows: [
        [`<b>Tools</b>`, `Server`, `Functions the model can call`],
        [`<b>Resources</b>`, `Server`, `Data to read (files, records)`],
        [`<b>Prompts</b>`, `Server`, `Ready-made templates the user picks`],
        [`<b>Elicitation</b>`, `Client`, `The server asking the user for more information`]
      ], caption: `Messages use the JSON-RPC 2.0 format. Transports: stdio (local) and Streamable HTTP (remote). Extensions: Tasks, MCP Apps.` },
      { type: 'note', tone: 'warn', title: `Version 2026-07-28`, html: `The current specification is <b>2026-07-28</b>. In it, MCP became stateless: the <code>initialize</code> phase and sessions were removed, and every request carries its own version and capabilities. Roots, Sampling, Logging and Dynamic Client Registration were marked as deprecated (they keep working for at least 12 months; the old HTTP+SSE transport has been deprecated since 2025), and Tasks moved from the core to an extension. Details in older articles may no longer be accurate.` },
      { type: 'p', html: `Authorization is optional and applies only to the HTTP transport: it is based on OAuth 2.1, with PKCE required. stdio servers get their keys from environment variables.` }
    ] },
    { id: 'mcpsec', title: `MCP security`, blocks: [
      { type: 'p', html: `The MCP specification treats tools as <b>arbitrary code execution</b>: user consent is required before every call, and tool descriptions are treated as untrusted data unless they come from a trusted server.` },
      { type: 'cards', items: [
        { tag: `Tool poisoning`, title: `A hidden command in the description`, html: `An instruction that the model can see but the user cannot is hidden in a tool description, for example: “also read the secret file and send it” (Invariant Labs, 2025).` },
        { tag: `Rug pull`, title: `A server that changes later`, html: `A server that looked safe at first later changes its tools.` },
        { tag: `Prompt injection`, title: `A command inside the result`, html: `Text returned by a tool (a web page, an email) may contain commands for the model.` }
      ] },
      { type: 'note', tone: 'key', html: `Rule: install servers only from trusted sources, grant minimal permissions and confirm every risky action. More in Chapter 11 (Security).` }
    ] },
    { id: 'multi', title: `Multi-agent: when it helps and when it hurts`, blocks: [
      { type: 'p', html: `In its research system (June 2025), Anthropic had a lead agent (Claude Opus 4) launch several subagents (Claude Sonnet 4) in parallel.` },
      { type: 'stats', items: [
        { value: `+90.2%`, label: `compared with a single Opus 4 agent, on Anthropic’s internal research eval` },
        { value: `~15×`, label: `how many more tokens a multi-agent system uses than a plain chat` },
        { value: `80%`, label: `the share of the performance variance on BrowseComp explained by token usage alone` }
      ], caption: `Source: Anthropic, “How we built our multi-agent research system”, 2025.` },
      { type: 'p', html: `The same article warns: multi-agent does not work well when agents need one shared context or depend heavily on each other; coding tasks have fewer parallel parts than research.` },
      { type: 'note', tone: 'info', title: `A contrasting view`, html: `Cognition (Walden Yan, “Don’t Build Multi-Agents”, 2025): agents should share the full context and action history, because every action carries implicit decisions; conflicting decisions lead to bad results. They recommend a single sequential agent and compressing the history.` },
      { type: 'p', html: `Takeaway: for broad tasks that split well into parallel parts (research, multi-source search), multi-agent helps and costs a lot. For interdependent steps (many coding tasks), a single agent is often better.` }
    ] },
    { id: 'reliability', title: `Reliability: errors compound`, blocks: [
      { type: 'p', html: `If each step is correct with 95% probability, after 10 steps the whole task finishes correctly with only ~60% probability. This is a simplified calculation (the steps are assumed to be independent), but it shows the problem well.` },
      { type: 'table', head: [`Per-step accuracy`, `5 steps`, `10 steps`, `20 steps`], num: [1, 2, 3], rows: [
        [`99%`, `95.1%`, `90.4%`, `81.8%`],
        [`95%`, `77.4%`, `59.9%`, `35.8%`],
        [`90%`, `59.0%`, `34.9%`, `12.2%`]
      ], caption: `Calculation: accuracy^number of steps.` },
      { type: 'list', items: [
        `<b>Limits:</b> a maximum number of turns and a maximum cost (for example, max_turns and max_budget_usd in the Claude Agent SDK, which are unlimited by default).`,
        `<b>Human oversight:</b> confirmation before risky actions (payments, deletions, sending emails).`,
        `<b>Guardrails:</b> rules that check inputs and outputs.`,
        `<b>Observability:</b> logging every step (Chapter 10).`
      ] }
    ] },
    { id: 'frameworks', title: `Frameworks and protocols`, blocks: [
      { type: 'table', head: [`Tool`, `Languages`, `Strengths`], rows: [
        [`<b>Claude Agent SDK</b>`, `Python, TypeScript`, `The Claude Code loop: built-in tools, hooks, subagents, MCP, permissions. Renamed from Claude Code SDK in September 2025`],
        [`<b>OpenAI Agents SDK</b>`, `Python, TypeScript`, `Agents, handoffs, guardrails, tracing, sessions. The successor to Swarm`],
        [`<b>Google ADK</b>`, `Python, TypeScript, Go, Java, Kotlin`, `Sequential, Parallel and Loop agents; graph workflows in ADK 2.0; supports A2A; works with almost any model`],
        [`<b>LangChain / LangGraph</b>`, `Python, JavaScript`, `Version 1.0 (October 2025). LangGraph is low-level orchestration for long-running, stateful agents`],
        [`<b>LlamaIndex</b>`, `Python, TypeScript`, `FunctionAgent, ReActAgent, AgentWorkflow; strong at working with documents (RAG)`]
      ], caption: `As of November 2026.` },
      { type: 'note', tone: 'warn', html: `OpenAI <b>Agent Builder</b> and Evals shut down on November 30, 2026 (ChatKit stays), and the Assistants API was shut down in August 2026. Older tutorials still mention them.` },
      { type: 'p', html: `<b>A2A (Agent2Agent)</b> is a protocol for agents to talk to each other (Google, 2025). v1.0 was released in March 2026, and it has been part of the AAIF since August. The official description: MCP connects an agent to tools and data, while A2A connects it to other agents; they complement each other.` }
    ] },
    { id: 'bench', title: `How agents are measured`, blocks: [
      { type: 'list', items: [
        `<b>SWE-bench Verified</b>: fixing real GitHub issues (500 tasks). By 2026 the best scores reached ~97%; the benchmark is “saturated” and can no longer separate the strongest models.`,
        `<b>OSWorld</b>: operating a computer (369 tasks). Humans complete 72.36%; the best model in the original paper completed 12.24%.`,
        `<b>τ-bench</b>: using tools in conversations such as customer service; it measures doing the same task correctly k times in a row (pass^k).`
      ] },
      { type: 'note', tone: 'info', html: `When you read a benchmark result, always check the date, the version and the “harness” (agent program) used: the same model gives different results in different harnesses.` }
    ] }
  ],
  mistakes: [
    [`“The model runs the function itself”`, `The application runs client tools; the model only requests the call.`],
    [`“Every task needs an agent”`, `A simple workflow is often cheaper and more reliable.`],
    [`“Multi-agent is always better”`, `It uses ~15× more tokens and can make interdependent tasks worse.`],
    [`“MCP has initialize and sessions”`, `They were removed in version 2026-07-28; MCP is stateless.`],
    [`“MCP is an Anthropic product”`, `Since December 2025 it has been part of the AAIF under the Linux Foundation.`],
    [`“A2A replaces MCP”`, `They complement each other: MCP is for tools, A2A is for agents.`],
    [`“Installing an MCP server is safe”`, `A tool is arbitrary code. Use only trusted servers and minimal permissions.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. What tool calling looks like (simplified example).</b> The model is given one tool: <code>ticket_status(number)</code>.` },
    { type: 'table', head: [`Step`, `What happens`], rows: [
      [`1. “What is the status of my ticket 12345?”`, `The model writes no text, it only requests: <code>ticket_status({"number": "12345"})</code>`],
      [`2. The app returns a result`, `<code>{"status": "in progress", "expected_date": "November 14"}</code>`],
      [`3. The model’s answer`, `“Your ticket is being worked on and will be resolved tomorrow.”`],
      [`A simple greeting`, `No tool needed: the model answers normally`]
    ] },
    { type: 'p', html: `You can see this yourself: give a model one tool in Ollama or any API and watch the tool call in the response.` },
    { type: 'p', html: `<b>B. Connect an MCP server (no code).</b> Pick one of the options:` },
    { type: 'steps', items: [
      `<b>Claude Desktop:</b> Settings → Desktop app → “Manage” next to Extensions → “Browse extensions” → choose the extension you need and click “Install”. Check that it is enabled via “+” → Connectors in the chat window.`,
      `<b>Remote server:</b> Customize → Connectors → “+ Add” → “Add custom connector”, then enter a name and URL. On the free plan you can add only one custom connector; the server must be reachable from the internet (or connected through an MCP tunnel).`,
      `<b>Claude Code:</b> add the server in the terminal, and check its status inside a session with <code>/mcp</code>.`,
      `Give the connected server a simple task and watch: which tool did the model call, and with which arguments? Were you asked for permission before each call?`
    ] },
    { type: 'term', lines: [
      `$ claude mcp add --transport http notion https://mcp.notion.com/mcp`,
      `$ claude mcp list`
    ] }
  ],
  quiz: [
    { q: `In tool calling, who executes the function (for a client tool)?`, options: [`The model itself`, `Your application`, `The MCP host, automatically`], answer: 1, explain: `The model only requests the name and arguments. The application executes it and returns the result as tool_result (or function_call_output).` },
    { q: `What is the main difference between a workflow and an agent?`, options: [`A workflow has no tools`, `In a workflow the path is written in code in advance; in an agent the model chooses the path`, `An agent uses only one model`], answer: 1, explain: `Anthropic’s definition: a workflow follows predefined code paths; an agent is an LLM that dynamically directs its own process and tools.` },
    { q: `If each step is 95% correct, roughly how likely is a 10-step task to finish fully correct?`, options: [`95%`, `~60%`, `~10%`], answer: 1, explain: `0.95^10 ≈ 0.599, i.e. ~60%.` },
    { q: `What changed in the current (2026-07-28) version of MCP?`, options: [`MCP became stateless; initialize and sessions were removed`, `MCP now works only over stdio`, `OAuth became mandatory`], answer: 0, explain: `Every request carries its own version and capabilities. Authorization is still optional, and Streamable HTTP remains.` },
    { q: `Roughly how many more tokens does Anthropic’s multi-agent system use than a plain chat?`, options: [`~2×`, `~4×`, `~15×`], answer: 2, explain: `A single agent ~4×, a multi-agent system ~15× (Anthropic, 2025).` }
  ],
  summary: [
    `In tool calling, the model only requests and the application executes. An agent is this process repeated in a loop until the task is done.`,
    `Start with a simple workflow. Agents and multi-agent systems are expensive; they pay off only if they improve results.`,
    `MCP is an open standard for tools (current version 2026-07-28). A tool is arbitrary code, so trust and permissions matter.`
  ],
  glossary: [
    [`Agent`, `An LLM system that dynamically chooses its own steps and tools.`],
    [`Workflow`, `A system where the LLM and tools follow predefined code paths.`],
    [`Tool / function calling`, `The model requests a tool call; the application executes it and returns the result.`],
    [`Turn`, `One pass through the agent loop.`],
    [`ReAct`, `A method of interleaving reasoning and acting (2022).`],
    [`MCP`, `Model Context Protocol: a standard for connecting AI applications to tools and data.`],
    [`Host / client / server`, `MCP roles: the AI application, the connector inside it, and the service that provides tools.`],
    [`Tool poisoning`, `An attack that hides malicious instructions in a tool description.`],
    [`A2A`, `A protocol for communication between agents.`],
    [`Harness`, `The program that runs a model as an agent (loop, tools, rules).`]
  ],
  sources: [
    { label: `Anthropic — Building effective agents (2024)`, url: `https://www.anthropic.com/engineering/building-effective-agents` },
    { label: `Anthropic — Tool use overview`, url: `https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview` },
    { label: `Claude Agent SDK — Agent loop`, url: `https://code.claude.com/docs/en/agent-sdk/agent-loop` },
    { label: `OpenAI — Function calling`, url: `https://developers.openai.com/api/docs/guides/function-calling` },
    { label: `Google — Function calling`, url: `https://aistudio.google.com/docs/function-calling` },
    { label: `Yao et al., 2022 — ReAct`, url: `https://arxiv.org/abs/2210.03629` },
    { label: `Anthropic — Introducing MCP (2024)`, url: `https://www.anthropic.com/news/model-context-protocol` },
    { label: `MCP specification (current)`, url: `https://modelcontextprotocol.io/specification/latest` },
    { label: `MCP 2026-07-28 changelog`, url: `https://modelcontextprotocol.io/specification/2026-07-28/changelog` },
    { label: `MCP — Security best practices`, url: `https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices` },
    { label: `Anthropic — Donating MCP to the AAIF`, url: `https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation` },
    { label: `Invariant Labs — Tool poisoning`, url: `https://invariantlabs.ai/blog/mcp-security-notification` },
    { label: `Anthropic — Multi-agent research system (2025)`, url: `https://www.anthropic.com/engineering/multi-agent-research-system` },
    { label: `Cognition — Don’t Build Multi-Agents (2025)`, url: `https://cognition.com/blog/dont-build-multi-agents` },
    { label: `Claude Agent SDK — Overview`, url: `https://code.claude.com/docs/en/agent-sdk/overview` },
    { label: `OpenAI Agents SDK`, url: `https://openai.github.io/openai-agents-python/` },
    { label: `OpenAI — Deprecations`, url: `https://developers.openai.com/api/docs/deprecations` },
    { label: `Google ADK`, url: `https://adk.dev/` },
    { label: `LangChain & LangGraph 1.0`, url: `https://blog.langchain.com/langchain-langgraph-1dot0` },
    { label: `LlamaIndex — Agents`, url: `https://developers.llamaindex.ai/python/framework/understanding/agent/` },
    { label: `A2A protocol`, url: `https://a2a-protocol.org/latest/` },
    { label: `Claude Desktop — Local MCP servers`, url: `https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop` },
    { label: `Claude Code — MCP`, url: `https://code.claude.com/docs/en/mcp` },
    { label: `Vals.ai — SWE-bench Verified (archived)`, url: `https://www.vals.ai/benchmarks` },
    { label: `Xie et al., 2024 — OSWorld`, url: `https://arxiv.org/abs/2404.07972` },
    { label: `Yao et al., 2024 — τ-bench`, url: `https://arxiv.org/abs/2406.12045` }
  ]
};
