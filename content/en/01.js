window.BOOK.content.en['01'] = {
  lead: `A large language model (LLM) is not magic. It is a machine that works with probabilities. In this chapter you will learn what happens inside a model, what tokens and the context window are, which settings control the answer, and how open and closed models differ. Every later chapter builds on this foundation.`,
  minutes: 45,
  tags: [`Theory`, `Lab: Ollama`],
  goals: [
    `Understand how an LLM generates text: predicting the next token`,
    `Tokens, tokenizers and the context window: where prices and limits come from`,
    `Temperature, top-p, top-k and what changed in 2026`,
    `Reasoning models, open and closed models, hallucination`
  ],
  sections: [
    { id: 'llm', title: `How an LLM works`, blocks: [
      { type: 'p', html: `An LLM (large language model) is a neural network trained on a huge collection of text. Its core job is simple: <b>predict which token comes next after a given text</b>. At each step, the model computes a list of probabilities for every possible token, picks one, appends it to the text, and repeats the process.` },
      { type: 'bars', title: `Next token after “The capital of France is” (example)`, max: 1, items: [
        { label: `Paris`, value: 0.91, text: `0.91` },
        { label: `Lyon`, value: 0.04, text: `0.04` },
        { label: `other`, value: 0.03, text: `0.03` },
        { label: `city`, value: 0.02, text: `0.02` }
      ], caption: `The numbers are made up for illustration. A real model gives different values, but the mechanism is exactly the same.` },
      { type: 'flow', items: [
        { title: `Text`, text: `The prompt you wrote` },
        { title: `Probabilities`, text: `For every possible token` },
        { title: `Pick`, text: `One token is selected` },
        { title: `Append`, text: `The token is added to the text, and the loop repeats` }
      ] },
      { type: 'p', html: `This is also why the answer “streams” out gradually in a chat window: the model generates it token by token. Which token gets picked is controlled by <b>sampling settings</b> (temperature, top-p), covered below.` },
      { type: 'note', tone: 'key', html: `The model does not “look up knowledge.” It writes the most likely continuation based on the text it saw during training. Hallucination, the knowledge cutoff and many other traits come directly from this nature.` }
    ] },
    { id: 'training', title: `How a model is trained`, blocks: [
      { type: 'p', html: `Today’s chat models usually go through three stages. Each stage teaches the model something different.` },
      { type: 'flow', items: [
        { title: `1. Pretraining`, text: `A huge collection of text. The task: find the next token. The model knows a lot, but it does not follow instructions well.` },
        { title: `2. SFT`, text: `Extra training on question–answer examples. The model learns to respond like an assistant.` },
        { title: `3. RLHF and RL`, text: `Human or AI ratings, plus verifiable rewards (math, code tests).` }
      ] },
      { type: 'list', items: [
        `<b>RLHF</b>: people pick the better of two answers, and the model adapts to their choices (InstructGPT, 2022).`,
        `<b>RLAIF</b>: another AI provides the ratings, based on a set of rules (Constitutional AI, 2022).`,
        `<b>RLVR</b>: the reward is given on tasks where the answer can be checked automatically: was the problem solved correctly, did the code pass the tests (the term was introduced in Tülu 3, 2024; DeepSeek-R1, 2025 taught reasoning this way).`
      ] },
      { type: 'source', html: `Sources: Ouyang et al., 2022 (InstructGPT) · Bai et al., 2022 (Constitutional AI) · Lambert et al., 2024 (Tülu 3) · DeepSeek-AI, 2025 (DeepSeek-R1)` }
    ] },
    { id: 'attention', title: `Transformers and attention`, blocks: [
      { type: 'p', html: `Almost all modern LLMs are based on the <b>Transformer</b> architecture proposed in the 2017 paper “Attention Is All You Need.” Its core idea is <b>attention</b>: each token “looks at” the tokens before it, weighs which ones matter to it, and works out its own meaning.` },
      { type: 'tokens', label: `Simplified example`, items: [`Alice`, `gave`, `Bob`, `a`, `book`, `because`, `she`, `had`, `finished`, `it.`], foot: `Who is “she”? Through attention, the model links the word “she” to the earlier “Alice.”` },
      { type: 'p', html: `A real model has dozens of layers, and each layer has many attention “heads.” In generative models, each token looks only at the tokens <b>before it</b> (causal attention). The model does not “see” future words.` },
      { type: 'note', tone: 'key', html: `For every new token, attention takes the whole preceding context into account. That is why the longer the context, the more expensive and slower the computation.` },
      { type: 'source', html: `Source: Vaswani et al., “Attention Is All You Need,” 2017` }
    ] },
    { id: 'token', title: `Tokens: the model’s “words”`, blocks: [
      { type: 'p', html: `A model does not read text letter by letter or whole word by whole word. It reads <b>tokens</b>, which are pieces of words. A <b>tokenizer</b> splits the text into tokens. BPE (byte pair encoding) is the most common method: frequent letter combinations become a single token, and rare ones are split into pieces.` },
      { type: 'tokens', label: `Simplified example: the exact split depends on the tokenizer`, items: [`un`, `believ`, `able`], foot: `“unbelievable” is 1 word, but several tokens` },
      { type: 'p', html: `In many tokenizers, a space attaches to the start of the next token. Every model splits text its own way, so check the exact count with the provider’s token counting tool.` },
      { type: 'cards', items: [
        { tag: `Price`, title: `Billed in tokens`, html: `API prices are set per 1 million input and output tokens.` },
        { tag: `Limit`, title: `Measured in tokens`, html: `The context window and the maximum answer length are both token counts.` },
        { tag: `Difference`, title: `Different for each model`, html: `The same text splits into a different number of tokens with different tokenizers.` }
      ] },
      { type: 'p', html: `OpenAI’s rule of thumb for English text: <b>1 token ≈ 4 characters ≈ ¾ of a word</b>. Claude’s new tokenizer (Claude 4.7 and later models) produces 1–1.35 times more tokens than older versions, depending on the text. To get the exact number, use the provider’s token counting tool.` }
    ] },
    { id: 'languages', title: `Not all languages are equal`, blocks: [
      { type: 'p', html: `Tokenizers are trained mostly on English text. As a result, text with the same meaning splits into many more tokens in other languages. Petrov and co-authors (NeurIPS 2023) showed that on the same translated texts, the gap between languages reaches up to 15 times, and that this gap exists in all 17 tokenizers they tested.` },
      { type: 'note', tone: 'key', html: `A product that works in a language other than English is <b>more expensive</b> (more tokens), <b>slower</b> (more tokens to generate), and <b>fills the context window faster</b>. Always account for this when planning costs, and measure it on your own texts.` }
    ] },
    { id: 'context', title: `The context window: the model’s desk`, blocks: [
      { type: 'p', html: `The <b>context window</b> is the maximum number of tokens a model can see in a single request. Everything goes into it: the system prompt, the conversation history, the documents you provide, and <b>the model’s answer</b> too.` },
      { type: 'table', head: [`Model`, `Context (tokens)`, `Max output`], num: [1, 2], rows: [
        [`Claude Opus 5.5`, `1,000,000`, `128,000`],
        [`GPT-6.1 Sol`, `1,050,000`, `128,000`],
        [`Gemini 4 Argon`, `1,048,576 (input + output)`, `65,536 (default)`],
        [`Qwen3.8-27B (open)`, `262,144`, `—`],
      ], caption: `As of November 2026. Source: official provider documentation, Hugging Face config files. On GPT-6.1 Sol and GPT-6 Astra, input is capped at 922K.` },
      { type: 'stats', items: [
        { value: `≈ 555K`, label: `English words fit in 1M tokens (with the Claude tokenizer)` },
        { value: `4,096`, label: `Ollama’s default context when GPU memory is under 24 GB` }
      ] },
      { type: 'note', tone: 'warn', html: `A model’s <b>maximum</b> context and the context <b>actually in use</b> are different things. Ollama picks the default context based on GPU memory (VRAM): under 24 GB, 4,096; 24–48 GB, 32K; 48 GB or more, 256K tokens. You can change it with <code>OLLAMA_CONTEXT_LENGTH</code>. The CONTEXT column in the output of <code>ollama ps</code> shows the current value.` }
    ] },
    { id: 'lost', title: `A big window ≠ good memory`, blocks: [
      { type: 'p', html: `Having a 1-million-token window does not mean the model uses all of it equally well. Two important studies:` },
      { type: 'figure', svg: `<svg viewBox="0 0 640 260" role="img" aria-label="U-shaped curve: accuracy is high at the start and end of the context, low in the middle"><line x1="40" y1="220" x2="620" y2="220" style="stroke:var(--line)" stroke-width="3"/><line x1="40" y1="20" x2="40" y2="220" style="stroke:var(--line)" stroke-width="3"/><path d="M 60 50 C 220 230, 440 230, 600 70" fill="none" style="stroke:var(--accent)" stroke-width="8" stroke-linecap="round"/><circle cx="60" cy="50" r="9" style="fill:var(--accent-ink)"/><circle cx="330" cy="183" r="9" style="fill:var(--accent-ink)"/><circle cx="600" cy="70" r="9" style="fill:var(--accent-ink)"/><text x="60" y="245" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--muted);font-family:var(--font)">Start</text><text x="330" y="245" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--muted);font-family:var(--font)">Middle</text><text x="600" y="245" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--muted);font-family:var(--font)">End</text><text x="50" y="16" font-size="14" font-weight="700" style="fill:var(--faint);font-family:var(--font)">Accuracy ↑</text></svg>`, caption: `Diagram based on the results of Liu et al.: accuracy depending on where the needed information sits in the context.` },
      { type: 'cards', items: [
        { tag: `Liu et al., TACL 2024`, title: `Lost in the middle`, html: `Results are best when the needed information is at the start or the end of the context. When it is in the middle, accuracy drops noticeably.` },
        { tag: `Chroma, 2025`, title: `Context rot`, html: `Across 18 models, reliability dropped as the input grew longer, even on simple tasks.` }
      ] },
      { type: 'note', tone: 'key', html: `Rule of thumb: put important information at the start or the end of the context, and remove what you do not need. Chapter 4 (Context engineering) covers this topic in depth.` }
    ] },
    { id: 'temperature', title: `Temperature: the creativity knob`, blocks: [
      { type: 'p', html: `<b>Temperature</b> makes the probability list “sharper” or “flatter.” At low values, the most likely tokens are picked almost every time. At high values, less likely tokens start getting picked too.` },
      { type: 'cards', items: [
        { tag: `Close to 0`, title: `Stable`, html: `Almost always the most likely token. For data extraction, classification and precise answers.` },
        { tag: `~0.7`, title: `Balanced`, html: `Moderate variety. For ordinary text and conversation.` },
        { tag: `1 and higher`, title: `Varied`, html: `Less likely tokens get picked too. Creative, but with more errors.` }
      ] },
      { type: 'p', html: `The range depends on the provider: in the OpenAI and Gemini APIs, it goes from 0 to 2.` },
      { type: 'note', tone: 'warn', html: `Even temperature 0 <b>does not guarantee a 100% identical answer</b>. Anthropic’s documentation says so openly. The reason is that server-side computations vary slightly with load (Thinking Machines, 2025).` }
    ] },
    { id: 'sampling', title: `top-p, top-k and other settings`, blocks: [
      { type: 'table', head: [`Parameter`, `What it does`, `What to know`], rows: [
        [`<b>top-p</b>`, `Takes the most likely tokens until their probabilities add up to p, and picks only from those`, `Holtzman et al., 2019 (nucleus sampling). OpenAI: change only one of temperature or top-p`],
        [`<b>top-k</b>`, `Picks only from the k most likely tokens`, `Default values for open models are listed in the model card`],
        [`<b>max_tokens</b>`, `Upper limit on answer length`, `The model may stop earlier. In reasoning models, thinking tokens count toward it too`],
        [`<b>stop</b>`, `Generation stops when this text appears`, `Useful for strictly enforcing an answer format`]
      ] },
      { type: 'p', html: `Example: with <code>top_p = 0.95</code>, the model sorts tokens by probability, takes them until the total reaches 95%, and picks only from those. This filters out very unlikely “weird” tokens.` }
    ] },
    { id: 'y2026', title: `2026: the settings are being locked down`, blocks: [
      { type: 'p', html: `Older tutorials often advise “set temperature = 0 for precise answers.” With today’s newest models, this does not always work:` },
      { type: 'cards', items: [
        { tag: `Claude`, title: `400 error`, html: `In API version 2026-10-21, sending temperature, top_p or top_k returns a 400 error, even if the value is the default. Claude 4.7 and later models already accepted only the default value before that.` },
        { tag: `OpenAI GPT-6`, title: `Locked with reasoning`, html: `Unless reasoning effort is “none,” temperature and top_p must be removed. GPT-6 Astra and GPT-6.1 Sol do not support the “none” mode at all.` },
        { tag: `Open models`, title: `Everything is open`, html: `In Ollama, vLLM and llama.cpp, you can change every sampling setting. That is why the lab uses a local model.` }
      ] },
      { type: 'note', tone: 'info', html: `Claude has no setting that replaces temperature. The <b>effort</b> parameter controls something else: thinking depth and token usage.` },
      { type: 'source', html: `Source: platform.claude.com — API migration 2026-10-21; developers.openai.com — latest model guide` }
    ] },
    { id: 'reasoning', title: `Reasoning (thinking) models`, blocks: [
      { type: 'p', html: `Reasoning models write “thinking” text before answering: they try different approaches, check intermediate results, and back out of dead ends. This ability is mainly taught through RL (DeepSeek-R1, 2025).` },
      { type: 'flow', items: [
        { title: `Question` },
        { title: `Thinking`, text: `Tries, checks, drops mistakes` },
        { title: `Answer` }
      ] },
      { type: 'cards', items: [
        { tag: `Price`, title: `It costs money`, html: `Thinking tokens are billed at the output price and count toward the max_tokens limit.` },
        { tag: `Visibility`, title: `Hidden`, html: `Claude does not return raw thinking text: in Claude 5 models, you get an empty block by default, or a short summary if you ask for it.` },
        { tag: `Control`, title: `Effort`, html: `In Opus 5.5 and Fable 5.2, thinking is always on; the effort parameter sets its depth.` }
      ] },
      { type: 'note', tone: 'key', html: `Reasoning helps with hard math, code and multi-step tasks. On simple questions, it is extra cost and latency. Some small models also have thinking on by default, so check this when estimating costs.` }
    ] },
    { id: 'open', title: `Open and closed models`, blocks: [
      { type: 'table', head: [` `, `Open-weight`, `Closed (API only)`], rows: [
        [`<b>Examples</b>`, `Qwen3.8-27B, DeepSeek V4, Gemma 4, gpt-oss, Mistral Small 4`, `Claude, GPT-6, Gemini 4`],
        [`<b>Data</b>`, `Stays on your own server`, `Sent to the provider`],
        [`<b>Cost</b>`, `GPU and server costs`, `Pay per token`],
        [`<b>Quality</b>`, `Usually behind the strongest closed models`, `Top tier`],
        [`<b>Control</b>`, `Fine-tuning, offline use`, `Subject to provider rules`]
      ] },
      { type: 'p', html: `<b>“Open-weight” and “open source” are not the same thing.</b> Under OSI’s Open Source AI Definition 1.0, an open source model must make available not only its parameters, but also the full code and sufficient information about its training data. Many popular “open” models are only open-weight.` },
      { type: 'table', head: [`Model`, `License`], rows: [
        [`Qwen3.8-27B`, `Apache 2.0`], [`Gemma 4`, `Apache 2.0`], [`gpt-oss-20b / 120b`, `Apache 2.0`], [`Mistral Small 4`, `Apache 2.0`], [`DeepSeek V4`, `MIT`], [`Llama 4`, `Custom (Llama 4 Community License)`]
      ], caption: `Source: model pages on Hugging Face, November 2026. Always read the license: some have usage restrictions.` }
    ] },
    { id: 'halluc', title: `Hallucination and the knowledge cutoff`, blocks: [
      { type: 'p', html: `A <b>hallucination</b> is a false statement said in a confident tone. OpenAI researchers (Kalai et al., 2025) point to two main causes: statistical pressure during pretraining, and training and evaluation that reward guessing instead of saying “I don’t know.”` },
      { type: 'p', html: `The <b>knowledge cutoff</b> is the date the model’s training data ends. The model does not know about events after it. As of November 2026: current Claude models, June 2026; GPT-6 Astra, April 30, 2026.` },
      { type: 'p', html: `Solutions: give the model the information it needs yourself (RAG, Chapter 6), instruct it to say “I don’t know” when it doesn’t know (Chapter 3), and verify important answers (Chapter 9).` }
    ] },
    { id: 'cost', title: `In practice: estimating cost`, blocks: [
      { type: 'p', html: `Imagine a company’s internal assistant bot answers employees’ IT and HR questions 10,000 times a day. Each question takes about 1,000 input tokens (instructions + the relevant policy + the question) and 300 output tokens.` },
      { type: 'stats', items: [
        { value: `10M`, label: `input tokens per day` },
        { value: `3M`, label: `output tokens per day` },
        { value: `$2.50`, label: `per day with Claude Haiku 5.5, thinking off` }
      ] },
      { type: 'p', html: `Math: 10M × $0.10 + 3M × $0.50 (per 1M tokens) = $1.00 + $1.50 = <b>$2.50</b> per day, or about $75 per month. Prices as of November 2026.` },
      { type: 'note', tone: 'warn', html: `In Haiku 5.5 and GPT-6 Luna, thinking is on by default (effort medium). Thinking tokens are billed at the output price, so the real cost goes up. For simple questions, set effort to “low” or turn thinking off. Also remember that in languages other than English, the token count is often much higher.` }
    ] }
  ],
  mistakes: [
    [`“1 token = 1 word”`, `In English, ≈ ¾ of a word. In many other languages, one word often splits into several tokens.`],
    [`“Temperature 0 = always the same answer”`, `There is no guarantee. In Claude and in GPT-6 with reasoning on, you cannot even change it.`],
    [`“Big context = remembers everything”`, `Information in the middle can get “lost” (lost in the middle, context rot).`],
    [`“The model knows today’s news”`, `Only up to its knowledge cutoff. You have to provide anything after that yourself.`],
    [`“Open model = open source”`, `Most are only open-weight. Read the license.`],
    [`“Thinking is free”`, `Thinking tokens are billed at the output price.`]
  ],
  lab: [
    { type: 'p', html: `In this lab, you will see the effect of temperature with your own eyes. You need <b>Ollama</b> (ollama.com) and a model that fits your computer. Pick one from ollama.com/library (a 1–4B parameter model on a weaker computer, 7–9B on a stronger one). In the commands below, replace <code>&lt;model&gt;</code> with the name of the model you chose. If the model has a “thinking” mode, turn it off with the <code>--think=false</code> flag.` },
    { type: 'steps', items: [
      `Install Ollama: ollama.com`,
      `Run the model (the first time, the model is downloaded).`,
      `Set temperature to 0 and ask the same question 3 times. Type <code>/clear</code> before each attempt. Otherwise, the previous answers stay in the conversation history and affect the result.`,
      `Set temperature to 1 and repeat 3 more times.`,
      `Use <code>/show parameters</code> to see the current settings, and <code>ollama ps</code> in another terminal to see the context and memory split.`
    ] },
    { type: 'term', lines: [
      `$ ollama run <model> --verbose`,
      `>>> /set parameter temperature 0`,
      `>>> Say one word about the sea. Write only one word.`,
      `>>> /clear`,
      `>>> /set parameter temperature 1`,
      `>>> /show parameters`,
      `>>> /bye`,
      `# --verbose shows the speed (tokens/s) after each answer`
    ] },
    { type: 'note', tone: 'key', html: `What to watch for: at temperature 0, the answers are often identical or very similar; at 1, they differ every time. Write down the results and compare them. Small models may make more mistakes in languages other than English, so watch for that too.` }
  ],
  quiz: [
    { q: `Is 1 token always equal to 1 word?`, options: [`Yes, always`, `No, a token can also be part of a word`, `Only in English`], answer: 1, explain: `A token is a piece the tokenizer splits off. In English it averages ¾ of a word; in other languages, one word is often several tokens.` },
    { q: `What happens if you send temperature = 0 to the Claude API (version 2026-10-21)?`, options: [`The answer will always be the same`, `It returns a 400 error`, `The parameter is silently ignored`], answer: 1, explain: `In this version, sending sampling parameters returns a 400 error, even if they are set to the default value.` },
    { q: `Where in the context is it best to put important information?`, options: [`In the middle`, `At the start or the end`, `It makes no difference`], answer: 1, explain: `The “Lost in the middle” study: the model uses information in the middle of the context less well.` },
    { q: `What kind of model is Qwen3.8-27B?`, options: [`Open-weight, Apache 2.0 license`, `Available only through an API`, `Fully open source (by the OSI definition)`], answer: 0, explain: `Its weights are open under Apache 2.0. But its training data and full code are not open, so it is not open source under the OSI definition.` },
    { q: `Do you pay for a reasoning model’s “thinking” tokens?`, options: [`No, they are free`, `Yes, at the output price`, `Only at the input price`], answer: 1, explain: `Thinking tokens are counted as output and also count toward the max_tokens limit.` }
  ],
  summary: [
    `An LLM predicts the next token. The knowledge cutoff and hallucination come from this nature.`,
    `Everything is measured in tokens: price, speed and limits. Languages other than English use many more tokens.`,
    `Settings depend on the model: on a local model everything is open; in Claude and in GPT-6 with reasoning on, temperature is locked.`
  ],
  glossary: [
    [`LLM`, `Large language model: a neural network trained to predict the next token.`],
    [`Token`, `A piece of text the model works with: a word, part of a word, or a character.`],
    [`Tokenizer`, `The component that splits text into tokens. Every model has its own tokenizer.`],
    [`Context window`, `The maximum number of tokens a model can see in a single request (including the answer).`],
    [`Attention`, `The mechanism by which each token weighs which earlier tokens matter.`],
    [`Temperature`, `The level of randomness in token selection.`],
    [`top-p / top-k`, `Settings that limit the choice to the most likely tokens only.`],
    [`Reasoning`, `A mode in which the model writes thinking tokens before the answer.`],
    [`Open-weight`, `A model whose weights can be downloaded. Not the same as open source.`],
    [`Hallucination`, `False information the model states with confidence.`],
    [`Knowledge cutoff`, `The date the model’s training data ends.`]
  ],
  sources: [
    { label: `Vaswani et al., 2017 — Attention Is All You Need`, url: `https://arxiv.org/abs/1706.03762` },
    { label: `Ouyang et al., 2022 — InstructGPT`, url: `https://arxiv.org/abs/2203.02155` },
    { label: `Bai et al., 2022 — Constitutional AI`, url: `https://arxiv.org/abs/2212.08073` },
    { label: `Lambert et al., 2024 — Tülu 3 (RLVR)`, url: `https://arxiv.org/abs/2411.15124` },
    { label: `DeepSeek-AI, 2025 — DeepSeek-R1`, url: `https://arxiv.org/abs/2501.12948` },
    { label: `Petrov et al., 2023 — Tokenizers introduce unfairness between languages`, url: `https://arxiv.org/abs/2305.15425` },
    { label: `Liu et al., TACL 2024 — Lost in the Middle`, url: `https://aclanthology.org/2024.tacl-1.9/` },
    { label: `Chroma, 2025 — Context Rot`, url: `https://www.trychroma.com/research/context-rot` },
    { label: `Holtzman et al., 2019 — Nucleus sampling`, url: `https://arxiv.org/abs/1904.09751` },
    { label: `Kalai et al., 2025 — Why language models hallucinate`, url: `https://arxiv.org/abs/2509.04664` },
    { label: `Thinking Machines, 2025 — Defeating nondeterminism in LLM inference`, url: `https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/` },
    { label: `Anthropic — Claude models overview`, url: `https://platform.claude.com/docs/en/about-claude/models/overview` },
    { label: `Anthropic — API migration 2026-10-21`, url: `https://platform.claude.com/docs/en/api/migration-2026-10-21` },
    { label: `Anthropic — Extended / adaptive thinking`, url: `https://platform.claude.com/docs/en/build-with-claude/thinking` },
    { label: `OpenAI — Models`, url: `https://developers.openai.com/api/docs/models` },
    { label: `Ollama — Context length`, url: `https://docs.ollama.com/context-length` },
    { label: `OSI — Open Source AI Definition 1.0`, url: `https://opensource.org/ai/open-source-ai-definition` }
  ]
};
