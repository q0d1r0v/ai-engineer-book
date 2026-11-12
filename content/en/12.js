window.BOOK.content.en['12'] = {
  lead: `AI coding assistants have grown from autocomplete into full agents: they read code, make plans, edit files, and run tests. In this chapter you will learn the main tools, how they work, what research actually says about productivity, and the rules for working safely and effectively. Almost every topic in the book comes together here.`,
  minutes: 40,
  tags: [`Practice: Claude Code or Codex`],
  goals: [
    `The main tools: Claude Code, Codex, Cursor, Devin Desktop (formerly Windsurf), and others`,
    `How a coding agent works and how to steer it`,
    `What research says about productivity`,
    `Good practices and security`
  ],
  sections: [
    { id: 'tools', title: `The main tools (November 2026)`, blocks: [
      { type: 'table', head: [`Tool`, `Who`, `Where it runs`], rows: [
        [`<b>Claude Code</b>`, `Anthropic`, `Terminal, web, desktop app, VS Code, JetBrains, Slack, GitHub Actions, and GitLab CI`],
        [`<b>Codex</b>`, `OpenAI`, `Codex CLI (open source, Apache 2.0), cloud, and IDE; with a ChatGPT account`],
        [`<b>Cursor</b>`, `Anysphere`, `An AI-native code editor: agent mode, its own Composer models`],
        [`<b>Devin Desktop</b>`, `Cognition`, `Formerly Windsurf, renamed in June 2026; Devin Local replaces Cascade`],
        [`<b>GitHub Copilot</b>`, `GitHub`, `In the IDE and as a cloud agent (in a cloud sandbox or a GitHub Actions environment; on paid plans)`],
        [`<b>Gemini CLI</b>`, `Google`, `Open source (Apache 2.0); free individual use moved to Antigravity CLI in June 2026`]
      ], caption: `This market changes very fast: names, pricing, and owners change within months. Check the official page before you choose.` }
    ] },
    { id: 'how', title: `How a coding agent works`, blocks: [
      { type: 'p', html: `A coding agent is a practical form of the agent loop from Chapter 7. Its tools: reading and searching files (just-in-time, Chapter 4), editing files, terminal commands, running tests, and sometimes a browser and MCP servers.` },
      { type: 'flow', items: [
        { title: `Task`, text: `“Add validation to the login page”` },
        { title: `Explore`, text: `Finds and reads the relevant files` },
        { title: `Plan`, text: `Explains what it will change` },
        { title: `Change`, text: `Edits the files` },
        { title: `Verify`, text: `Runs the tests, fixes errors` }
      ] },
      { type: 'table', head: [`Claude Code feature`, `What it’s for`], rows: [
        [`<b>CLAUDE.md</b>`, `Project rules: commands, style, architecture. Read at the start of every session (recommended: under 200 lines)`],
        [`<b>Plan mode</b>`, `The agent explores and proposes a plan, but changes nothing`],
        [`<b>Sub-agents</b>`, `Helpers that work in a separate context (Chapters 4 and 7)`],
        [`<b>Hooks</b>`, `Scripts that run automatically on specific events (for example, before or after a tool call), making a rule <b>mandatory</b>`],
        [`<b>Skills, MCP, plugins</b>`, `Connecting extra knowledge and tools`]
      ] },
      { type: 'note', tone: 'key', html: `A key difference: a rule in CLAUDE.md is a <b>request</b> to the model, and it may forget it. A hook is <b>enforcement</b>: for example, a PreToolUse hook technically blocks edits to the <code>.env</code> file.` }
    ] },
    { id: 'permissions', title: `Permission modes`, blocks: [
      { type: 'table', head: [`Mode`, `What it does`], rows: [
        [`<code>default</code>`, `Asks before every edit and command`],
        [`<code>acceptEdits</code>`, `Makes file edits and runs simple file commands without asking`],
        [`<code>plan</code>`, `Only explores and proposes a plan`],
        [`<code>auto</code>`, `A separate classifier model reviews actions on your behalf`],
        [`<code>dontAsk</code>`, `Any action that would need permission is denied`],
        [`<code>bypassPermissions</code>`, `Asks for nothing; only in an isolated container or virtual machine`]
      ], caption: `Claude Code. Switch to plan mode with Shift+Tab, <code>/plan</code>, or <code>claude --permission-mode plan</code>. In Codex, similar settings are under <code>/permissions</code>.` },
      { type: 'note', tone: 'warn', html: `Don’t use <code>bypassPermissions</code> on your main computer. The agent could run a dangerous command through prompt injection (Chapter 11) in a repo or on a web page. Turn on the sandbox (Chapter 11).` }
    ] },
    { id: 'research', title: `Productivity: what research says`, blocks: [
      { type: 'p', html: `METR’s randomized trial (July 2025): 16 experienced open source developers completed 246 tasks in their own projects; each task was randomly assigned to an “AI allowed” or “AI disallowed” group (the AI was mainly Cursor Pro + Claude 3.5/3.7 Sonnet).` },
      { type: 'stats', items: [
        { value: `+19%`, label: `how much <b>longer</b> tasks took with AI` },
        { value: `24%`, label: `how much time developers expected to save beforehand` },
        { value: `20%`, label: `how much faster they believed they had worked, even after the study` }
      ], caption: `Source: METR, 2025-07-10.` },
      { type: 'p', html: `In its February 2026 update, METR showed that new data had shifted toward a speedup with AI (−18% time for returning developers, confidence interval from −38% to +9%). But METR itself called this “very weak evidence”: many developers refused to work without AI, which skews the selection and, in METR’s view, lowers the estimate of the true speedup. Other studies: in a GitHub Copilot lab experiment, a single JavaScript task was completed 55.8% faster (Peng et al., 2023); a Google trial with 96 engineers found a ~21% speedup, with a wide confidence interval.` },
      { type: 'note', tone: 'key', html: `Takeaway: the feeling that “AI made me faster” is not a reliable measurement. At METR, it was the opposite of the result. The benefit depends on the task type, the project, and experience. Measure it in your own work (Chapter 9).` }
    ] },
    { id: 'vibe', title: `Vibe coding vs. engineering`, blocks: [
      { type: 'p', html: `Andrej Karpathy coined the term <b>“vibe coding”</b> in February 2025: building software with AI without reading the code, judging only by the result. It is handy for experiments and throwaway prototypes. But it is risky for code that will live a long time, that others will use, or where security matters.` },
      { type: 'cards', items: [
        { tag: `Vibe coding`, title: `Prototype`, html: `You don’t read the code, you only check that it works. Fast, but technical debt and security holes pile up.` },
        { tag: `Engineering with an agent`, title: `Product`, html: `A plan, small changes, tests, reviewing every diff. You stay accountable.` }
      ] }
    ] },
    { id: 'practice', title: `Good practices`, blocks: [
      { type: 'steps', items: [
        `<b>Plan first:</b> in plan mode, let the agent explore the code and propose a plan; read it, fix it, then approve.`,
        `<b>Small steps:</b> one task, one small change. A large diff is hard to review.`,
        `<b>Tests are the gate:</b> have the agent write a test first or run the existing tests. If the tests don’t pass, it isn’t done.`,
        `<b>Read every diff:</b> the code you accept is your code.`,
        `<b>Project memory:</b> put commands, style, and “what not to do” rules in CLAUDE.md or AGENTS.md (Chapter 4).`,
        `<b>Manage context:</b> long sessions degrade. Start a new session for a new task, with a summary if needed.`,
        `<b>Security:</b> don’t expose secrets to the agent, turn on the sandbox, and use risky modes only in isolation.`
      ] }
    ] },
    { id: 'bench', title: `Coding benchmarks`, blocks: [
      { type: 'list', items: [
        `<b>SWE-bench Verified</b> is saturated: top scores have reached ~97% and no longer separate the strongest models. OpenAI stopped reporting it in its results in February 2026.`,
        `<b>Terminal-Bench</b> covers agent tasks in the terminal. The current version is 4.1 (November 2026); results from different versions can’t be compared.`
      ] },
      { type: 'note', tone: 'info', html: `When choosing a coding tool, the best benchmark is 5–10 real tasks from your own repo. Run the same task in two tools and compare the result, time, and cost.` }
    ] },
    { id: 'together', title: `Wrapping up the book: everything together`, blocks: [
      { type: 'p', html: `When you work with a coding agent, almost every topic in the book comes together:` },
      { type: 'table', head: [`Chapter`, `Where it shows up in a coding agent`], rows: [
        [`1–2. Foundations, models`, `Which model, how many tokens and how much money; reasoning effort`],
        [`3. Prompts`, `Writing the task clearly, examples, expected format`],
        [`4. Context`, `CLAUDE.md, just-in-time search, compaction, sub-agents`],
        [`5–6. Embeddings, RAG`, `Search and docs across a large codebase`],
        [`7. Agents`, `The tool loop, MCP, permissions`],
        [`9. Evals`, `Tests and measurement: trust results, not “feelings”`],
        [`10–11. Production, security`, `Cost, versions, sandbox, prompt injection`]
      ] }
    ] }
  ],
  mistakes: [
    [`“I’m always faster with AI”`, `In the METR study, developers thought they were 20% faster but were actually 19% slower.`],
    [`“A rule in CLAUDE.md is guaranteed to be followed”`, `It’s a request. Use a hook for a mandatory rule.`],
    [`“bypassPermissions is a convenient mode”`, `Only in an isolated container or VM.`],
    [`“I don’t need to read the code the agent writes”`, `In a prototype, maybe; in a product, review every diff.`],
    [`“Windsurf / Cascade are the current names”`, `Since June 2026: Devin Desktop / Devin Local.`],
    [`“#1 on SWE-bench Verified means the best coding model”`, `The benchmark is saturated; test on your own tasks.`]
  ],
  lab: [
    { type: 'p', html: `Your first work with a coding agent: in plan mode, safely. Installation commands from the official docs:` },
    { type: 'term', lines: [
      `# Claude Code (macOS, Linux, WSL)`,
      `$ curl -fsSL https://claude.ai/install.sh | bash`,
      `$ claude --version`,
      `# or OpenAI Codex CLI`,
      `$ npm install -g @openai/codex`
    ] },
    { type: 'steps', items: [
      `Take a small sample project (or your own project that has tests) and go to its folder.`,
      `Start Claude Code in plan mode: <code>claude --permission-mode plan</code>.`,
      `Give it a task: “Add input validation to function X. Propose a plan and tests.”`,
      `Read the plan: which files will change, and which tests will be added? Correct it if needed.`,
      `When Claude asks you to approve the plan, approve it (or switch modes with Shift+Tab). Have it run the tests and read the diff.`,
      `Write down how many files the agent read, how long it took, and (if using the API) how much it cost.`
    ] },
    { type: 'note', tone: 'info', html: `Claude Code on Windows: in PowerShell, <code>irm https://claude.ai/install.ps1 | iex</code>. You need a Claude subscription or an API account to use it. For Codex, you sign in with a ChatGPT account.` }
  ],
  quiz: [
    { q: `In the METR study (2025), how did AI tools affect experienced developers?`, options: [`Tasks were completed 19% faster`, `Tasks took 19% longer, while developers believed they were faster`, `There was no difference`], answer: 1, explain: `Developers thought they were 20% faster, while the measurement showed a 19% slowdown.` },
    { q: `What is the difference between CLAUDE.md and a hook?`, options: [`There is no difference`, `CLAUDE.md is a request to the model; a hook is a technically enforced rule`, `Hooks are only for design`], answer: 1, explain: `For example, a PreToolUse hook can block edits to the .env file, while a rule in CLAUDE.md can be forgotten.` },
    { q: `What does the agent do in plan mode?`, options: [`Edits files faster`, `Explores and proposes a plan, changing nothing`, `Turns off all permissions`], answer: 1, explain: `Plan mode is for reviewing the plan before any changes.` },
    { q: `Where can you use bypassPermissions mode?`, options: [`On your main work computer`, `Only in an isolated container or virtual machine`, `Anywhere, it’s safe`], answer: 1, explain: `The agent could run a dangerous command through prompt injection; isolation is a must.` },
    { q: `What is the most reliable measure when choosing a coding tool?`, options: [`The SWE-bench Verified ranking`, `Comparing on a few real tasks from your own repo`, `Ads and reviews`], answer: 1, explain: `SWE-bench Verified is saturated; your own tasks are the most accurate eval.` }
  ],
  summary: [
    `Coding agents are a practical combination of every idea in the book: model, prompt, context, tools, evals, and security.`,
    `Plan → small change → tests → read the diff. Use hooks for mandatory rules and a sandbox for risky work.`,
    `Your sense of productivity can be misleading: measure it in your own work.`
  ],
  glossary: [
    [`Coding agent`, `An AI agent that reads code, changes it, and runs commands.`],
    [`Plan mode`, `A mode in which the agent only explores and proposes a plan.`],
    [`Hook`, `A script that runs automatically before or after an agent action.`],
    [`CLAUDE.md / AGENTS.md`, `A file of project rules and instructions.`],
    [`Diff`, `The list of changes made to the code.`],
    [`Vibe coding`, `Programming with AI without reading the code, judging by the result.`],
    [`Permission mode`, `Which actions the agent may take without asking.`]
  ],
  sources: [
    { label: `Claude Code — Quickstart`, url: `https://code.claude.com/docs/en/quickstart` },
    { label: `Claude Code — Features overview`, url: `https://code.claude.com/docs/en/features-overview` },
    { label: `Claude Code — Permission modes`, url: `https://code.claude.com/docs/en/permission-modes` },
    { label: `Claude Code — Memory (CLAUDE.md)`, url: `https://code.claude.com/docs/en/memory` },
    { label: `OpenAI Codex (GitHub)`, url: `https://github.com/openai/codex` },
    { label: `Cursor — Pricing`, url: `https://cursor.com/pricing` },
    { label: `Cognition — Windsurf is now Devin Desktop`, url: `https://devin.ai/blog/windsurf-is-now-devin-desktop` },
    { label: `GitHub — Copilot coding agent`, url: `https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent` },
    { label: `Gemini CLI`, url: `https://github.com/google-gemini/gemini-cli` },
    { label: `METR — AI and experienced developers (2025)`, url: `https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/` },
    { label: `METR — Update (2026)`, url: `https://metr.org/blog/2026-02-24-uplift-update/` },
    { label: `Peng et al., 2023 — Copilot experiment`, url: `https://arxiv.org/abs/2302.06590` },
    { label: `Google — Enterprise RCT`, url: `https://arxiv.org/abs/2410.12944` },
    { label: `Terminal-Bench — News`, url: `https://www.tbench.ai/news` },
    { label: `Epoch AI — SWE-bench Verified review`, url: `https://epoch.ai/benchmarks/swe-bench-verified/review` }
  ]
};
