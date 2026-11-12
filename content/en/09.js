window.BOOK.content.en['09'] = {
  lead: `“The new prompt seems to work better” is not a measurement. An eval (evaluation) measures the quality of an AI system with repeatable tests. Without evals, every change is a gamble. In this chapter you will learn eval concepts, grader types, LLM-as-judge and its biases, metrics, how many examples you need, and the main tools.`,
  minutes: 45,
  tags: [`Theory`, `Practice: golden set`],
  goals: [
    `Eval concepts: task, trial, grader, transcript, outcome`,
    `Code, LLM, and human graders: when to use which`,
    `LLM-as-judge biases and metrics (pass@k and pass^k)`,
    `How many examples you need, regression tests, and tools`
  ],
  sections: [
    { id: 'why', title: `Why you need evals`, blocks: [
      { type: 'p', html: `In AI systems, a small change (a prompt, a model version, chunking) can break results in unexpected places. Without evals, your users will notice before you do. Evals play the role of unit tests for AI systems.` },
      { type: 'note', tone: 'key', html: `Anthropic’s advice: to get started, <b>20–50 simple tasks drawn from real failures</b> are enough. Don’t wait for a perfect test set. Start small and add to it as you find failures.` }
    ] },
    { id: 'terms', title: `Key concepts`, blocks: [
      { type: 'table', head: [`Term`, `Meaning`], rows: [
        [`<b>Task</b>`, `A single test with an input and a success criterion`],
        [`<b>Trial</b>`, `One run of a task. The model may answer differently each time, so you need several trials`],
        [`<b>Grader</b>`, `The logic that scores the result: code, a model, or a human`],
        [`<b>Transcript</b>`, `The full record of a trial: messages, tool calls, results`],
        [`<b>Outcome</b>`, `The final state of the environment. You grade what actually happened, not what the agent said`]
      ], caption: `Source: Anthropic, “Demystifying evals for AI agents”, 2026.` },
      { type: 'cards', items: [
        { tag: `Capability eval`, title: `Capability`, html: `Things the system can’t do well yet. It starts with a low score and measures improvement.` },
        { tag: `Regression eval`, title: `Nothing broken`, html: `Things the system already does well. The score should be ~100%. If it drops, something broke.` }
      ] }
    ] },
    { id: 'graders', title: `Three types of graders`, blocks: [
      { type: 'table', head: [`Type`, `Example`, `Pros`, `Cons`], rows: [
        [`<b>Code</b>`, `Exact match, regex, JSON schema, unit test, number comparison`, `Fast, cheap, repeatable`, `Only for tasks with a clear-cut answer`],
        [`<b>Model</b> (LLM-as-judge)`, `“Does the answer fully address the question? Score 1–5”`, `Grades free-form text, at scale`, `Has its own biases (see below); needs calibration`],
        [`<b>Human</b>`, `Expert or user ratings, pairwise comparison`, `Most reliable`, `Slow and expensive`]
      ] },
      { type: 'p', html: `A practical approach: use code when you can; use LLM-as-judge for free-form text; then check the LLM judge against human ratings on a subset of examples. Anthropic recommends two more things: read the transcripts yourself, and grade the <b>outcome</b>, not the path.` }
    ] },
    { id: 'judge', title: `LLM-as-judge and its biases`, blocks: [
      { type: 'p', html: `Zheng et al. (2023) tested GPT-4 as a judge. Excluding ties, GPT-4 and humans made the same decision 85% of the time, while two humans agreed with each other 81% of the time (with ties: 66% and 63%). But they also found systematic biases:` },
      { type: 'table', head: [`Bias`, `What it is`, `Result in the paper`], rows: [
        [`<b>Position bias</b>`, `The decision changes when the answers swap places`, `GPT-4 was consistent only 65% of the time (77.5% with few-shot)`],
        [`<b>Verbosity bias</b>`, `Preferring the longer answer`, `The “repetitive list” attack fooled Claude-v1 and GPT-3.5 91.3% of the time, GPT-4 8.7%`],
        [`<b>Self-enhancement</b>`, `Preferring its own answer`, `GPT-4 picked its own answer ~10% more often, Claude-v1 ~25%`]
      ] },
      { type: 'note', tone: 'key', html: `Defenses: grade each pair in both orders; write clear criteria (a rubric); control for answer length; use a model from a different provider as the judge; and most importantly, calibrate the judge by comparing its decisions with human ratings on a subset of examples. Methods like G-Eval (Liu et al., 2023) improve the judge with CoT and a form-filling format.` }
    ] },
    { id: 'metrics', title: `Metrics`, blocks: [
      { type: 'list', items: [
        `<b>Accuracy</b> is the share of correct answers. For classification there is <b>precision</b> (how many of the items found are correct), <b>recall</b> (how many of the correct items were found), and their balance, <b>F1</b>.`,
        `<b>pass@k</b> is the probability that <b>at least one</b> of k trials is correct (Chen et al., 2021, HumanEval). Codex solved 28.8% of problems with 1 attempt and 70.2% with 100 attempts. Use it for code generation and for “I’ll offer several options and the user picks one” cases.`,
        `<b>pass^k</b> is the probability that <b>all</b> k trials are correct (τ-bench, 2024). It measures reliability: a customer expects the right answer every time.`,
        `<b>BLEU / ROUGE</b> measure text similarity. BLEU is useful for diagnosing translation systems, but it is not reliable for grading the quality of individual texts or for tasks other than translation (Reiter, 2018); ROUGE has similar limits.`
      ] },
      { type: 'table', head: [`If single-trial success is 75%`, `k = 3`], num: [1], rows: [
        [`pass@3: at least one correct`, `98.4%`],
        [`pass^3: all three correct`, `42.2%`]
      ], caption: `Math: 1 − 0.25³ = 0.984; 0.75³ = 0.422. The same model can look like it “almost always solves it” or like it “often gets it wrong.” Check which metric you are looking at.` }
    ] },
    { id: 'rag', title: `Evaluating RAG`, blocks: [
      { type: 'p', html: `In RAG, measure the two parts separately (Chapter 6). The main metrics in the Ragas library:` },
      { type: 'table', head: [`Metric`, `What it measures`], rows: [
        [`<b>Context precision</b>`, `Whether the relevant chunks rank near the top of the retrieved chunks`],
        [`<b>Context recall</b>`, `How much of the information needed for the answer was retrieved (requires a reference answer)`],
        [`<b>Faithfulness</b>`, `How many of the claims in the answer are supported by the retrieved chunks (0–1)`],
        [`<b>Response relevancy</b>`, `How well the answer fits the question`]
      ] }
    ] },
    { id: 'samples', title: `How many examples you need`, blocks: [
      { type: 'p', html: `Eval results also fluctuate randomly. Anthropic (Miller, 2024) recommends reporting results with a <b>confidence interval</b>: the 95% interval ≈ result ± 1.96 × standard error, where standard error = √(p × (1 − p) / n).` },
      { type: 'table', head: [`Number of examples`, `95% interval for an 80% result`], rows: [
        [`n = 50`, `± 11.1 points (68.9% – 91.1%)`],
        [`n = 500`, `± 3.5 points (76.5% – 83.5%)`]
      ] },
      { type: 'note', tone: 'warn', html: `If a prompt change moves the result from 82% to 85% on 50 examples, that is <b>not proof of improvement</b>: the difference is inside the interval. Compare the two variants on the same examples (paired difference), add more examples, or run each task several times.` }
    ] },
    { id: 'tools', title: `Regression tests and tools`, blocks: [
      { type: 'flow', items: [
        { title: `Golden set`, text: `Input + expected output` },
        { title: `Change`, text: `Prompt, model, setting` },
        { title: `Automated eval`, text: `On every change, in CI` },
        { title: `Compare`, text: `If the score drops, stop` }
      ] },
      { type: 'table', head: [`Tool`, `License`, `Features`], rows: [
        [`<b>Promptfoo</b>`, `MIT`, `YAML config, CLI and web view. Now part of OpenAI, still open source`],
        [`<b>DeepEval</b>`, `Apache 2.0`, `Pytest-like; G-Eval, faithfulness, and answer relevancy metrics`],
        [`<b>Ragas</b>`, `Apache 2.0`, `RAG metrics`],
        [`<b>LangSmith</b>`, `Commercial`, `Offline (on a dataset) and online (on production traces) evals, human annotation queues`],
        [`<b>Braintrust</b>`, `Commercial`, `Eval and observability platform`]
      ], caption: `As of November 2026. The OpenAI Evals platform has been read-only since October 31, 2026, and shuts down on November 30; OpenAI recommends moving to Promptfoo (evals must be rewritten by hand).` }
    ] },
    { id: 'bench', title: `Benchmarks: saturation and contamination`, blocks: [
      { type: 'list', items: [
        `<b>Saturation:</b> on older tests like MMLU, the strongest models score near the maximum and the differences disappear. MMLU-Pro lowers scores by 16–33% compared with MMLU.`,
        `<b>New hard tests:</b> Humanity’s Last Exam has 2,500 questions (Nature, 2026). The top score on ARC-AGI-2 is GPT-6 Astra at 95.0% (2026-09-02); on ARC-AGI-3 Standard it is Claude Fable 5.2 at 81.2% (2026-11-09).`,
        `<b>Contamination:</b> if test questions leak into the training data, scores are artificially inflated.`
      ] },
      { type: 'note', tone: 'key', html: `A public benchmark is a starting point for choosing a model. The only reliable measure for your product is an eval built from <b>your own tasks</b>. Always cite leaderboard numbers with the date and settings (with or without tools).` }
    ] }
  ],
  mistakes: [
    [`“I saw it with my own eyes: it got better”`, `A difference you see on 5–10 examples is often chance. Compute the confidence interval.`],
    [`“The LLM judge agrees with humans 85% of the time, so it’s reliable”`, `That figure excludes ties, and there are position, verbosity, and self-enhancement biases. Calibrate it.`],
    [`“pass@k measures reliability”`, `pass@k goes up as k grows. Reliability is pass^k.`],
    [`“#1 on the benchmark means best on my task too”`, `Test on your own task; the benchmark may be saturated or contaminated.`],
    [`“I run my evals on OpenAI Evals”`, `It shuts down on November 30, 2026.`],
    [`“The agent said ‘done,’ so it’s done”`, `Check the outcome: the actual state of the environment.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. A golden set in a spreadsheet (no code).</b>` },
    { type: 'steps', items: [
      `Open a spreadsheet with these columns: input · expected output · model answer · correct (1/0) · note.`,
      `Write 30 real examples from a task you actually use, ideally cases where the model failed before.`,
      `Add answers from two different prompts or two models and grade them by hand.`,
      `For each, compute accuracy and the 95% interval: p ± 1.96 × √(p(1−p)/30). Is the difference larger than the interval?`
    ] },
    { type: 'p', html: `<b>B. Test the judge’s bias.</b> In a chat, give the model two answers labeled “A” and “B” and ask which one is better. Then, in a new chat, swap their order and ask again. Across 5–10 pairs, how many times did the decision change?` },
    { type: 'p', html: `<b>C. Optional: Promptfoo.</b> If you have Node.js installed:` },
    { type: 'term', lines: [
      `$ npx promptfoo@latest init`,
      `# write prompts, providers, and tests in promptfooconfig.yaml`,
      `$ npx promptfoo@latest eval`,
      `$ npx promptfoo@latest view`
    ] }
  ],
  quiz: [
    { q: `How is it recommended to start an eval set?`, options: [`With at least 1,000 synthetic examples`, `With 20–50 simple tasks drawn from real failures`, `With public benchmarks only`], answer: 1, explain: `Anthropic: 20–50 tasks drawn from real failures are a good start.` },
    { q: `If a single trial is correct 75% of the time, what is the probability that ALL three trials are correct (pass^3)?`, options: [`~98%`, `~75%`, `~42%`], answer: 2, explain: `0.75³ ≈ 0.42. 98% is pass@3 (at least one correct).` },
    { q: `On 50 examples, the score rose from 82% to 85%. What does this mean?`, options: [`The prompt definitely improved`, `The difference is within random fluctuation, not proof`, `The model is broken`], answer: 1, explain: `At n = 50 the 95% interval is ± ~11 points; a 3-point difference falls inside it.` },
    { q: `What is “position bias” in an LLM judge?`, options: [`Preferring the longer answer`, `The decision changing when the answers swap places`, `Preferring its own answer`], answer: 1, explain: `Zheng et al.: GPT-4 was consistent only 65% of the time.` },
    { q: `What should you look at when evaluating an agent?`, options: [`Whether the agent said “done”`, `The final state of the environment (outcome)`, `The length of the answer`], answer: 1, explain: `Anthropic: grade what actually happened, not what the agent said.` }
  ],
  summary: [
    `Evals are unit tests for AI. Start with 20–50 tasks from real failures and run them on every change.`,
    `Code graders are the fastest and most repeatable, human ratings are the most reliable, and LLM-as-judge is convenient but has position and verbosity biases. Calibrate it against human ratings.`,
    `Read results with a confidence interval; tell pass@k and pass^k apart; a public benchmark is only a direction.`
  ],
  glossary: [
    [`Eval`, `Measuring the quality of an AI system with repeatable tests.`],
    [`Golden set`, `A trusted set of test examples made of inputs and expected outputs.`],
    [`Grader`, `What scores the result: code, a model, or a human.`],
    [`LLM-as-judge`, `Using an LLM to grade another model’s answer.`],
    [`pass@k`, `The probability that at least one of k trials succeeds.`],
    [`pass^k`, `The probability that all k trials succeed.`],
    [`Regression eval`, `A test that checks that something that already works hasn’t broken.`],
    [`Confidence interval`, `The range in which the true result most likely lies.`],
    [`Contamination`, `Test questions leaking into the training data.`],
    [`Saturation`, `A benchmark no longer being able to tell models apart.`]
  ],
  sources: [
    { label: `Anthropic — Demystifying evals for AI agents (2026)`, url: `https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents` },
    { label: `Anthropic — A statistical approach to model evaluations (2024)`, url: `https://www.anthropic.com/research/statistical-approach-to-model-evals` },
    { label: `Miller, 2024 — Adding Error Bars to Evals`, url: `https://arxiv.org/abs/2411.00640` },
    { label: `Zheng et al., 2023 — Judging LLM-as-a-Judge`, url: `https://arxiv.org/abs/2306.05685` },
    { label: `Liu et al., 2023 — G-Eval`, url: `https://arxiv.org/abs/2303.16634` },
    { label: `Chiang et al., 2024 — Chatbot Arena`, url: `https://arxiv.org/abs/2403.04132` },
    { label: `Chen et al., 2021 — Codex / HumanEval (pass@k)`, url: `https://arxiv.org/abs/2107.03374` },
    { label: `Yao et al., 2024 — τ-bench (pass^k)`, url: `https://arxiv.org/abs/2406.12045` },
    { label: `Reiter, 2018 — A Structured Review of the Validity of BLEU`, url: `https://aclanthology.org/J18-3002/` },
    { label: `Ragas — Metrics`, url: `https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/` },
    { label: `OpenAI — Evals (shutdown)`, url: `https://developers.openai.com/api/docs/guides/evals` },
    { label: `OpenAI Cookbook — Moving from OpenAI Evals to Promptfoo`, url: `https://developers.openai.com/cookbook/examples/evaluation/moving-from-openai-evals-to-promptfoo` },
    { label: `Promptfoo`, url: `https://github.com/promptfoo/promptfoo` },
    { label: `DeepEval`, url: `https://github.com/confident-ai/deepeval` },
    { label: `LangSmith — Evaluation concepts`, url: `https://docs.langchain.com/langsmith/evaluation-concepts` },
    { label: `MMLU-Pro`, url: `https://arxiv.org/abs/2406.01574` },
    { label: `Humanity’s Last Exam`, url: `https://lastexam.ai/` },
    { label: `ARC Prize — Leaderboard`, url: `https://arcprize.org/leaderboard` }
  ]
};
