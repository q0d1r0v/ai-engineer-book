window.BOOK.content.en['03'] = {
  lead: `A prompt is the instruction you give a model. The same model behaves completely differently with a good prompt and a bad one. In this chapter you will learn zero-shot and few-shot prompting, chain of thought, system prompts, ways to structure a prompt, and how to get answers in a strict format (structured output). Each technique is explained based on research and official documentation.`,
  minutes: 45,
  tags: [`Theory`, `Lab: OpenRouter + Ollama`],
  goals: [
    `Rules for writing clear, understandable instructions`,
    `Zero-shot, few-shot and chain of thought: when to use which`,
    `System prompts, roles and prompt structure (XML tags, long documents)`,
    `Structured output: getting JSON reliably, and its limits`
  ],
  sections: [
    { id: 'basics', title: `Where a good prompt starts`, blocks: [
      { type: 'p', html: `A simple test that Anthropic recommends: <b>show your prompt to a colleague who knows nothing about the task.</b> If they don’t understand what to do, the model won’t either. The model does not know the context in your head, so you have to write it all down.` },
      { type: 'list', items: [
        `<b>Be clear and direct:</b> what you need, in what format, and how long.`,
        `<b>Explain why:</b> if you explain why a rule exists, the model applies it better.`,
        `<b>Give context:</b> who it is for, what the goal is, and what the constraints are.`
      ] },
      { type: 'cards', items: [
        { tag: `Weak`, title: `Rule only`, html: `“NEVER use ellipses.”` },
        { tag: `Strong`, title: `Rule + reason`, html: `“Don’t use ellipses, because the answer will be converted to speech and the software can’t read them.” Now the model may also avoid other similar symbols.` }
      ] },
      { type: 'note', tone: 'warn', html: `Shouting in capital letters, like “IMPORTANT!!! ALWAYS do this,” often backfires with newer models: the model starts applying the rule far too much. Anthropic recommends a normal tone: “Use this tool when …”.` }
    ] },
    { id: 'shots', title: `Zero-shot and few-shot`, blocks: [
      { type: 'p', html: `<b>Zero-shot</b> means giving the task with no examples. <b>Few-shot</b> means showing a few ready-made examples (question → answer) along with the task. The GPT-3 paper (Brown et al., 2020) showed that large models learn from examples through text alone, without retraining the model.` },
      { type: 'p', html: `Example: when classifying an employee’s IT ticket as “incident / question / request,” a zero-shot model may find the right category but still write the answer with a long explanation. Software cannot read such an answer automatically. A few examples show exactly what the answer should look like.` },
      { type: 'note', tone: 'key', html: `Few-shot often teaches <b>format</b>, not knowledge. Anthropic recommends 3–5 examples: make them close to the task and different from one another, or the model will copy an accidental feature of a single example. Wrap the examples in <code>&lt;example&gt;</code> tags.` },
      { type: 'p', html: `OpenAI’s advice for reasoning models: try zero-shot first, and add few-shot if needed.` }
    ] },
    { id: 'cot', title: `Chain of thought: step-by-step reasoning`, blocks: [
      { type: 'p', html: `<b>Chain of thought (CoT)</b> means asking the model to write out intermediate steps before the answer (Wei et al., 2022). Kojima et al. (2022) showed that adding a single sentence, “Let’s think step by step,” raised the score of the text-davinci-002 model from 17.7% to 78.7% on MultiArith and from 10.4% to 40.7% on GSM8K.` },
      { type: 'p', html: `Wei et al. (2022) gave the PaLM 540B model just 8 CoT examples and achieved the best result at the time on the GSM8K math benchmark. But CoT has a cost: the answer gets much longer, which means more tokens and more time. Use it only on tasks that truly require reasoning.` },
      { type: 'note', tone: 'warn', title: `Reasoning models are different`, html: `Models with thinking (Claude Opus 5.5, Fable 5.2, GPT-6) reason on their own. OpenAI recommends avoiding CoT prompts with them. Anthropic: a general instruction like “think carefully” often works better than a hand-written plan of steps; manual CoT is only needed when thinking is off. Asking Claude to write its reasoning inside special tags may be refused.` }
    ] },
    { id: 'system', title: `System prompts and roles`, blocks: [
      { type: 'p', html: `A <b>system prompt</b> sets the rules for the whole conversation: who to be, what tone to use, what not to do. Anthropic: even a one-sentence role (“You are an experienced legal assistant”) affects the result.` },
      { type: 'table', head: [`Slot`, `Claude`, `OpenAI`], rows: [
        [`Rules`, `Separate <code>system</code> field`, `<code>developer</code> message (takes priority over user)`],
        [`User`, `<code>user</code>`, `<code>user</code>`],
        [`Model`, `<code>assistant</code>`, `<code>assistant</code>`]
      ] },
      { type: 'list', items: [
        `Write the system prompt at the “right altitude”: both something too general (“help out”) and a long list that spells out every case are bad.`,
        `Write down the role, the audience, the tone and the boundaries: “Answer only about the company’s IT services. If you don’t know, say so openly.”`
      ] }
    ] },
    { id: 'structure', title: `Structuring a prompt: tags and long documents`, blocks: [
      { type: 'p', html: `In a prompt, the instructions, context, examples and input data should not get mixed up. Anthropic recommends separating them with XML tags:` },
      { type: 'term', lines: [
        `<documents>`,
        `  <document index="1">… contract text …</document>`,
        `  <document index="2">… appendix …</document>`,
        `</documents>`,
        `<instructions>List the payment deadlines in the contract as a table.</instructions>`
      ] },
      { type: 'note', tone: 'key', html: `When working with long documents (20K+ tokens), put <b>the documents at the start and the question at the end</b>. According to Anthropic’s test results, asking the question at the end can improve answer quality by up to 30%.` }
    ] },
    { id: 'json', title: `Structured output: getting JSON reliably`, blocks: [
      { type: 'p', html: `For software to read a model’s answer, the answer must be in a strict format, usually JSON. Just asking it to “return JSON” is not enough.` },
      { type: 'p', html: `With a prompt alone, the model sometimes wraps the JSON in a markdown block (\`\`\`json … \`\`\`), drops a field, or adds extra text. According to OpenAI’s 2024 announcement, on a test of following complex JSON schemas, gpt-4o-2024-08-06 with Structured Outputs scored 100%, while gpt-4-0613 scored less than 40%.` },
      { type: 'p', html: `The reliable approach is <b>schema-constrained generation</b> (constrained decoding): the model can only pick tokens that match the schema.` },
      { type: 'table', head: [`Provider`, `Method`, `Guarantee`], rows: [
        [`Claude`, `<code>output_config.format</code> (json_schema), <code>strict: true</code> on tools`, `Matches the schema (except on refusal or when hitting max_tokens)`],
        [`OpenAI`, `Structured Outputs: <code>json_schema</code> + <code>strict: true</code>`, `Matches the schema. Plain JSON mode only guarantees valid JSON`],
        [`Gemini`, `Response format with a JSON schema`, `Syntactically valid JSON; check the values yourself`],
        [`Ollama`, `<code>format</code>: "json" or JSON Schema`, `No official guarantee; it is recommended to also put the schema in the prompt`]
      ], caption: `As of November 2026. Each provider supports only part of JSON Schema: for example, Claude has no minLength/maxLength or minimum/maximum, and OpenAI’s strict mode requires all fields to be required.` },
      { type: 'note', tone: 'warn', html: `A schema guarantees the <b>format</b>, not <b>the correctness of the values</b>. The model can write wrong data inside well-formed JSON, so check the values. In Claude, the technique of pre-writing the start of the answer (prefill) returns a 400 error on Claude 4.6 and later models; use structured output instead.` }
    ] },
    { id: 'iterate', title: `Testing and improving prompts`, blocks: [
      { type: 'list', items: [
        `<b>Prompt chaining:</b> split a big task into sequential steps (draft → review → fix), so you can inspect the result of each step.`,
        `<b>Version them:</b> keep prompts alongside your code and track changes. Pin the model version (snapshot).`,
        `<b>Measure:</b> build a test set from 20–50 real examples and compare the results after every change (Chapter 9).`
      ] },
      { type: 'note', tone: 'info', html: `Tools keep changing: the old Workbench in the Anthropic Console was replaced by the “playground” in August 2026, and the prompt generation and improvement APIs were shut down. OpenAI’s stored prompt objects and Evals (both the dashboard and the API) shut down on November 30, 2026. It is safer to keep prompts in your own code than in an external dashboard.` }
    ] }
  ],
  mistakes: [
    [`“The model understands what I want”`, `It doesn’t know your context. Run the colleague test.`],
    [`“Always write ‘think step by step’”`, `Not needed with reasoning models, and it can even hurt.`],
    [`“One example is enough”`, `Use 3–5 varied examples; a single one gives the model accidental features to copy.`],
    [`“JSON mode = schema guarantee”`, `JSON mode only gives valid JSON. For a schema, you need strict structured output.`],
    [`“If there is a schema, the values are correct”`, `The format is guaranteed, not the content.`],
    [`“I’ll force the format in Claude with prefill”`, `On Claude 4.6 and later models, prefill returns a 400 error.`],
    [`“If I write in CAPITAL LETTERS, it will do better”`, `Newer models apply such rules far too much.`]
  ],
  lab: [
    { type: 'p', html: `<b>A. In the cloud (no code).</b> At openrouter.ai/chat, pick 2–3 models side by side.` },
    { type: 'steps', items: [
      `Zero-shot: “Classify the message: complaint, question or thanks. Message: The package arrived torn.”`,
      `Few-shot: the same task, preceded by 3 varied examples. How did the answer format change?`,
      `Give a hard problem: first “write only the answer,” then “think carefully.” Is there a difference with a reasoning model?`,
      `For each attempt, write down the answer length and whether it was correct.`
    ] },
    { type: 'p', html: `<b>B. Locally: forcing JSON format.</b>` },
    { type: 'term', lines: [
      `$ ollama run <model>`,
      `>>> Extract the name, date and room from the message as JSON: "Anna, meeting in Room 2 on December 3."`,
      `>>> /bye`,
      `$ ollama run <model> --format json`,
      `>>> Extract the name, date and room from the message as JSON: "Anna, meeting in Room 2 on December 3."`
    ] },
    { type: 'p', html: `In the second case, the answer will be clean JSON, without a markdown block. Constraining it with a full schema is done through the API (by passing a JSON Schema in the <code>format</code> field).` }
  ],
  quiz: [
    { q: `What does few-shot most often teach the model?`, options: [`New knowledge`, `The answer format and style`, `To work faster`], answer: 1, explain: `Examples show exactly what the answer should look like; the model usually already has the knowledge the task needs.` },
    { q: `Should you write “think step by step” to a model with reasoning (thinking) on?`, options: [`Yes, always`, `Usually not; a general “think carefully” or the effort setting is better`, `Only in English`], answer: 1, explain: `OpenAI recommends avoiding CoT prompts with reasoning models, and Anthropic recommends a general instruction and effort.` },
    { q: `When working with a long document, where should you put the question?`, options: [`At the start, before the document`, `At the end, after the documents`, `In the middle`], answer: 1, explain: `Anthropic: documents at the top, question at the end; quality can improve by up to 30%.` },
    { q: `What does plain JSON mode guarantee at OpenAI?`, options: [`Full schema compliance`, `Only syntactically valid JSON`, `Correct values`], answer: 1, explain: `Only Structured Outputs (strict) guarantees schema compliance. None of them guarantees correct values.` },
    { q: `When Kojima et al. (2022) added the sentence “Let’s think step by step,” how did the result change on the MultiArith test?`, options: [`It rose from 17.7% to 78.7%`, `It didn’t change`, `It dropped`], answer: 0, explain: `On the text-davinci-002 model; on GSM8K it rose from 10.4% to 40.7%.` }
  ],
  summary: [
    `A good prompt is clear, has context, and explains the reasons behind its rules. Use the colleague test.`,
    `Few-shot teaches format and CoT strengthens reasoning, but reasoning models don’t need manual CoT.`,
    `A prompt is not enough for machine-readable answers: use schema-constrained structured output and check the values.`
  ],
  glossary: [
    [`Prompt`, `The instructions and context given to a model.`],
    [`Zero-shot`, `Giving a task with no examples.`],
    [`Few-shot`, `Giving a task with a few ready-made examples.`],
    [`Chain of thought`, `Writing out intermediate reasoning steps before the answer.`],
    [`System prompt`, `Rules and role for the whole conversation.`],
    [`Prefill`, `Pre-writing the start of the model’s answer (disabled on Claude 4.6 and later models).`],
    [`Structured output`, `Getting the answer in a form that matches a given JSON schema.`],
    [`Constrained decoding`, `Generation that only allows tokens that match the schema.`],
    [`Prompt chaining`, `Splitting a task into several sequential prompt steps.`]
  ],
  sources: [
    { label: `Brown et al., 2020 — Language Models are Few-Shot Learners`, url: `https://arxiv.org/abs/2005.14165` },
    { label: `Wei et al., 2022 — Chain-of-Thought Prompting`, url: `https://arxiv.org/abs/2201.11903` },
    { label: `Kojima et al., 2022 — Large Language Models are Zero-Shot Reasoners`, url: `https://arxiv.org/abs/2205.11916` },
    { label: `Anthropic — Prompting best practices`, url: `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices` },
    { label: `Anthropic — Structured outputs`, url: `https://platform.claude.com/docs/en/build-with-claude/structured-outputs` },
    { label: `OpenAI — Prompt engineering`, url: `https://developers.openai.com/api/docs/guides/prompt-engineering` },
    { label: `OpenAI — Reasoning best practices`, url: `https://developers.openai.com/api/docs/guides/reasoning-best-practices` },
    { label: `OpenAI — Introducing Structured Outputs (2024)`, url: `https://openai.com/index/introducing-structured-outputs-in-the-api/` },
    { label: `OpenAI — Structured outputs`, url: `https://developers.openai.com/api/docs/guides/structured-outputs` },
    { label: `Google — Structured output`, url: `https://aistudio.google.com/docs/structured-output` },
    { label: `Ollama — Structured outputs`, url: `https://docs.ollama.com/capabilities/structured-outputs` },
    { label: `Anthropic — Release notes`, url: `https://platform.claude.com/docs/en/release-notes/overview` },
    { label: `OpenAI — Deprecations`, url: `https://developers.openai.com/api/docs/deprecations` }
  ]
};
