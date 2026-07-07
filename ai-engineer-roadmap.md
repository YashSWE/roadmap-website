# AI Engineering Roadmap 2026 — behumoury
### A series by Yash Bhandari | behumoury.com/roadmap

---

## How to Use This Roadmap

This is a video series for **software engineers converting into AI roles** and **freshers targeting their first AI Engineer job**. It covers what's actually asked in 2026 interviews and what you actually build on the job — application layer only, no model training.

**Prerequisites (not covered in the series — link out):**
- Python (good enough, TypeScript works too)
- Basic frontend + backend fundamentals
- General SDLC best practices
- *Learn these simultaneously if you don't have them — they don't block the series*

**Already covered in Yash's existing videos (i-card / link, not repeated):**
- What is an AI Engineer — roles & responsibilities
- AI Engineer vs ML Engineer
- Interview experience — what companies actually ask

---

## Series Structure

The roadmap is grouped into **5 blocks**, each building on the last.

```
Block 1 — Understanding LLMs          (1 chapter)
Block 2 — Making LLMs Workable        (2 chapters)
Block 3 — Harness Engineering         (4 chapters)
Block 4 — Safety & Ethics             (1 chapter)
Block 5 — Production                  (3 chapters)
─────────────────────────────────────────────────
Total: 11 chapters + Ch. 1 intro = 12 videos
```

---

## Ch. 1 — Complete AI Engineer Roadmap 2026 (Series Intro)
**Block:** Standalone anchor  
**Type:** Talking head + roadmap walkthrough  
**Target length:** 10–14 min

The gap: lots of roadmaps exist, none give clear direction. This is the direct, no-fluff answer with a roadmap you can follow chapter by chapter on the site.

**Structure:**
- Hook: "50 roadmaps exist. Here's the one that actually tells you what to do."
- One line on the role → i-card to existing "What I Do as a GenAI Developer" video
- Walk the full roadmap live (~30–45 sec per chapter)
- CTA: behumoury.com/roadmap, subscribe, series starts now

**Personal angle:** "I landed 3 GenAI offers. I'm now at Syngenta. Every chapter is something I was asked in an interview or use on the job."

---

---

# BLOCK 1 — Understanding LLMs

> Goal: give the viewer a complete mental model of what an LLM is before they touch any code.

---

## Ch. 2 — What is an LLM? Everything You Need to Know
**Block:** 1 — Understanding LLMs  
**Target length:** 16–20 min

**Subtopics:**
- What an LLM actually is — next token prediction, not magic
- Tokens — what they are, why they matter (cost, limits, behaviour)
- Embeddings — meaning as coordinates, intuition-first (no math)
- APIs & messages — system / user / assistant format introduced here
- LLM providers — OpenAI, Anthropic (Claude), Google (Gemini), Meta (Llama), Mistral
- Training vs inference — what happens at each stage, why it matters to engineers
- Closed source vs open source vs locally hosted models — tradeoffs
- Weights — what they are in plain English
- Fine-tuning — surface level only (what it is, when it's relevant, why it's rarely the answer)
- Prompt engineering, RAG, agents — introduced as concepts, one sentence each (the map for the rest of the series)
- Temperature, top-p — what they control, when to tune
- Why LLMs hallucinate — structural, not a bug

**Interview questions this answers:**
- "What is a token? How does tokenisation affect your work?"
- "What's the difference between a closed source and open source model?"
- "What are model weights?"
- "When would you fine-tune a model vs use RAG?"
- "Why do LLMs hallucinate?"

**On-screen build:** No code. Live API call to show the message format, token count, and cost — the "hello world" of AI engineering.

---

---

# BLOCK 2 — Making LLMs Workable

> Goal: teach the two core skills for controlling LLM behaviour — prompt engineering and context engineering.

---

## Ch. 3 — Prompt Engineering for Production
**Block:** 2 — Making LLMs Workable  
**Target length:** 14–18 min

**Subtopics:**
- Zero-shot, one-shot, few-shot prompting — when to use each
- Chain-of-thought (CoT) — why "think step by step" works
- System prompts — what they are, how to write them well
- Role and format prompting
- Prompt injection — what it is, why it's a security concern
- Negative prompting — telling the model what NOT to do
- Instruction clarity — why vague prompts produce vague answers
- Prompt chaining — breaking complex tasks into steps
- Common failure modes: over-refusal, instruction drift, hallucination
- Treating prompts like code — versioning, testing, iteration

**Interview questions this answers:**
- "What's the difference between zero-shot and few-shot prompting?"
- "How does chain-of-thought prompting work?"
- "What is prompt injection and how do you prevent it?"
- "How do you test and version prompts in production?"
- "Walk me through designing a prompt for a customer support bot."

**On-screen build:** Take a real use case (e.g. extracting structured data from a messy input). Iterate the prompt live — bad → good → production-ready. Show each failure and the fix.

---

## Ch. 4 — Context Engineering
**Block:** 2 — Making LLMs Workable  
**Target length:** 14–18 min

**Subtopics:**
- What context engineering is — and why it's different from prompt engineering
- The context window as a scarce resource — what goes in, what gets cut
- Context ordering — why position in the window affects model attention
- External memory — what it is, when you need it
- How real AI systems manage context (not just a single prompt)
- Context isolation — keeping different tasks / users separated
- Context compaction — summarising when the window fills up
- Context degradation — how long conversations go wrong ("lost in the middle")
- The needle-in-a-haystack test — how LLMs are evaluated for context recall
- Pulling context from external services into the LLM
- Prompt caching — what it is, cost savings (Anthropic / OpenAI)

**Interview questions this answers:**
- "What is context engineering?"
- "How do you handle conversations that exceed the context window?"
- "What is the 'lost in the middle' problem?"
- "What is prompt caching and how does it save cost?"
- "How do you design memory for a long-running AI system?"

**On-screen build:** Build a conversation manager that tracks history, summarises when it gets too long, and selectively includes only the most relevant prior context. Show token count before and after.

---

---

# BLOCK 3 — Harness Engineering

> Goal: teach how to build the full system around an LLM — the tools, databases, retrieval systems, agent loops, and protocols that make an LLM actually useful in production.
>
> *"Harness engineering" = the discipline of connecting LLMs to the real world.*

---

## Ch. 5 — MCP Servers, Function Calling & Tool Use
**Block:** 3 — Harness Engineering  
**Target length:** 16–20 min

**Subtopics:**

*Function calling first (the prerequisite):*
- How a model decides to call a function vs respond directly
- Defining tools: schemas, descriptions, parameters
- The tool call loop: model → tool call → result → model
- Parallel tool calls
- Error handling when tools fail
- What makes a good tool description

*Then MCP:*
- What MCP is and why Anthropic created it
- The problem it solves: standardised agent-to-tool communication
- MCP vs function calling — complementary, not the same
- The MCP architecture: host, client, server
- Using existing MCP servers (filesystem, GitHub, Slack, Notion)
- Building your own MCP server (Python FastMCP)
- When MCP makes sense vs direct function calling
- The growing ecosystem

**Interview questions this answers:**
- "How does function calling work in LLMs?"
- "How does the model decide when to call a tool vs respond directly?"
- "What is MCP and what problem does it solve?"
- "How does MCP differ from regular function calling?"
- "Have you built an MCP server?"

**On-screen build:** Build a custom MCP server that exposes a real tool (e.g. querying a local DB or reading files). Connect to Claude Desktop. Demo an agent using it.

---

## Ch. 6 — Databases for AI: Vector Stores, Graph DBs & More
**Block:** 3 — Harness Engineering  
**Target length:** 16–20 min

**Subtopics:**

*Vector Stores (core):*
- What embeddings are — intuition first (builds on Ch. 2)
- Cosine similarity — why it's the right metric for semantic search
- What a vector DB does vs a regular DB
- The major options: pgvector, Pinecone, Qdrant, Chroma, Weaviate — tradeoffs
- Chunking strategies: fixed-size, semantic, hierarchical — why it matters enormously
- Metadata filtering — combining semantic search with structured filters

*Other DB types for AI harnesses:*
- Graph databases (Neo4j) — when relationships between entities matter
- Key-value stores (Redis) — caching, session state, fast lookups in agent loops
- When to use which — decision framework

*Setup for RAG (connects to Ch. 7):*
- This chapter ends with: "we now have the retrieval substrate — next chapter we build the full RAG pipeline on top of it"

**Interview questions this answers:**
- "What is an embedding and how is it used?"
- "How does cosine similarity work for semantic search?"
- "pgvector vs Pinecone — when would you choose each?"
- "What chunking strategy would you use for a 100-page PDF?"
- "When would you use a graph DB vs a vector DB in an AI system?"
- "What role does Redis play in an agent harness?"

**On-screen build:** Build a semantic search system — embed documents, store in Chroma, query with natural language. Show how chunking strategy changes result quality.

---

## Ch. 7 — AI Agents & Agent Loops
**Block:** 3 — Harness Engineering  
**Target length:** 20–25 min

**Subtopics:**

*What agents are:*
- Agent = perception → reasoning → action → loop
- Why agents are hard: non-determinism, error propagation, context management
- The ReAct framework — reasoning + acting interleaved (the dominant pattern)
- Self-correcting loops — how agents recover from mistakes

*Architecture:*
- Single agent vs multi-agent systems
- Memory system design: in-context, external (vector store), episodic vs semantic
- Planning — how agents decompose tasks
- Tool use inside the loop (builds on Ch. 5)
- Stopping conditions — how does an agent know it's done?

*Frameworks:*
- LangGraph — stateful agents, the production standard
- CrewAI — multi-agent orchestration
- When to use a framework vs build from scratch

*Production concerns:*
- Failure modes: infinite loops, hallucinated tool calls, context overflow
- Human-in-the-loop patterns
- Tracing agent runs (intro — full observability in Block 5)

**Interview questions this answers:**
- "Explain the ReAct framework."
- "What's the difference between single and multi-agent systems?"
- "How does an agent manage memory across a long task?"
- "What are common agent failure modes?"
- "When would you use LangGraph vs building from scratch?"

**On-screen build:** Build a research agent — give it a question, it searches the web, reads pages, synthesises an answer, cites sources. Use LangGraph. Show a real failure and debug it.

---

## Ch. 8 — RAG End-to-End
**Block:** 3 — Harness Engineering  
**Target length:** 20–25 min (or split into Part 1 + Part 2)

> The #1 AI engineer interview topic in 2026. Builds directly on Ch. 6 (vector stores) and Ch. 7 (agent loops). This is the episode that gets clipped, shared, and referenced.

**Subtopics:**

*Foundations:*
- What RAG is and the problem it solves — LLMs have a knowledge cutoff + can't access your private data
- The two components: retriever + generator
- RAG vs fine-tuning — when to use each (asked in almost every interview)
- Naive RAG: the simplest possible version

*The full pipeline:*
- Document ingestion and preprocessing
- Chunking (from Ch. 6 — applied here)
- Embedding and indexing
- Query-time retrieval: semantic search
- Context assembly — stuffing retrieved docs into the prompt
- Generation with the LLM

*Production RAG:*
- Hybrid search: vector + keyword (BM25) — why it beats pure vector search
- Reranking — what it is, why it improves precision (Cohere Rerank, cross-encoders)
- Query transformation: HyDE, query expansion, step-back prompting
- Common failure modes and how to debug them

*Evaluation (intro — full eval in Block 5):*
- Retrieval metrics: recall, precision, MRR
- Generation metrics: faithfulness, answer relevance (RAGAS)

**Interview questions this answers:**
- "Explain RAG end-to-end."
- "When would you use RAG vs fine-tuning?"
- "What is hybrid search and why is it better than pure vector search?"
- "What is reranking and when do you need it?"
- "What is HyDE?"
- "How do you evaluate a RAG pipeline?"
- "What are common RAG failure modes?"

**On-screen build:** Build a complete RAG system over real documents:
1. Naive RAG — working in ~50 lines
2. Add hybrid search
3. Add reranking
4. Evaluate with RAGAS
Show quality improvement at each step.

---

---

# BLOCK 4 — Safety & Ethics

> Goal: teach how to make AI systems safe, fair, and production-trustworthy.

---

## Ch. 9 — Guardrails, Safety & Responsible AI
**Block:** 4 — Safety & Ethics  
**Target length:** 14–18 min

**Subtopics:**

*Guardrails:*
- What guardrails are and why every production system needs them
- Input guardrails: prompt injection prevention, jailbreak detection, PII detection
- Output guardrails: hallucination detection, format validation, toxicity filtering
- Guardrail frameworks: Guardrails AI, NVIDIA NeMo Guardrails
- Content filtering and moderation APIs

*Fairness & ethics:*
- How training data shapes model bias
- Fairness assessment — what to test for
- Transparency in AI systems
- EU AI Act basics — what AI engineers need to know in 2026
- Responsible deployment practices

**Interview questions this answers:**
- "What are guardrails and how would you implement them?"
- "How do you detect and prevent prompt injection?"
- "What is the EU AI Act and how does it affect AI engineers?"
- "How do you assess fairness in an LLM system?"
- "What output validation do you apply to LLM responses in production?"

**On-screen build:** Add a guardrail layer to the RAG system from Ch. 8 — catches prompt injection on input, validates output format, flags hallucinated citations.

---

---

# BLOCK 5 — Production

> Goal: take everything built so far from a working demo to a monitored, deployed, production-grade system.

---

## Ch. 10 — LLM Observability & Monitoring
**Block:** 5 — Production  
**Target length:** 14–18 min

**Subtopics:**
- Why observability is different for AI vs regular software
- Traces — what they are, how to read them for LLM apps
- Logging for AI systems — what to log, what not to
- Cost analysis — token usage tracking, cost per request, budget alerts
- Latency monitoring — where time is actually spent in an LLM pipeline
- Production monitoring tools: LangSmith, Confident AI, Arize Phoenix, Helicone
- Setting up alerts — when to page on an AI system
- User feedback loops — thumbs up/down, implicit signals

**Interview questions this answers:**
- "How do you monitor an LLM in production?"
- "What is a trace in the context of LLM applications?"
- "How do you track and control LLM costs?"
- "What tools have you used for LLM observability?"

**On-screen build:** Instrument the RAG agent from Ch. 8 with LangSmith — show a full trace, cost breakdown per request, and a latency flamegraph.

---

## Ch. 11 — Evaluation & Testing for AI Systems
**Block:** 5 — Production  
**Target length:** 14–18 min

**Subtopics:**
- Why eval is the hardest part of AI engineering
- Offline vs online evaluation
- LLM-as-judge — using a model to score model outputs, limitations
- RAGAS — faithfulness, answer relevance, context recall, context precision
- DeepEval — unit testing for LLM pipelines
- Prompt regression testing — catching quality drops when prompts change
- A/B testing LLM changes in production
- The eval → improve loop

**Interview questions this answers:**
- "How do you evaluate an LLM pipeline?"
- "What is LLM-as-judge and what are its limitations?"
- "What is RAGAS and what does it measure?"
- "How do you regression test a prompt change?"
- "How do you run A/B tests on LLM outputs?"

**On-screen build:** Add a full eval suite to the RAG pipeline — RAGAS scores, a DeepEval unit test, and a simple LLM-as-judge scorer. Run it, interpret the results, improve one thing.

---

## Ch. 12 — Shipping It: Deployment & LLMOps
**Block:** 5 — Production  
**Target length:** 18–22 min

**Subtopics:**

*The AI app stack:*
- Standard 2026 stack: FastAPI backend + Next.js frontend + LLM API + vector DB + Supabase + Vercel/Railway
- How AI apps differ architecturally from regular web apps

*Deployment:*
- Containerising an AI app (Docker basics)
- Deployment options: Vercel, Railway, Render, AWS Lambda — tradeoffs
- Environment and secrets management

*Performance:*
- Latency optimisation: streaming, async calls, caching
- Cost optimisation: prompt caching, model selection by task, batching
- Semantic caching — cache by meaning not exact match

*Reliability:*
- Fallback strategies when the LLM API goes down
- Rate limiting and throttling
- Graceful degradation

*CI/CD for AI:*
- Version controlling prompts
- Running eval suite in CI before deployment
- Rolling out LLM changes safely — feature flags, canary deploys

**Interview questions this answers:**
- "How would you deploy an LLM-powered API to production?"
- "How do you optimise latency in an LLM application?"
- "What is semantic caching?"
- "How do you handle LLM API downtime gracefully?"
- "Walk me through your CI/CD process for an AI feature."

**On-screen build:** Deploy the full RAG agent to Railway with a FastAPI backend. Add streaming, semantic caching, and wire up the eval suite to run in CI.

---

---

## Full Chapter Index

| # | Chapter | Block |
|---|---------|-------|
| 1 | Complete AI Engineer Roadmap 2026 (Series Intro) | Anchor |
| 2 | What is an LLM? Everything You Need to Know | Block 1 |
| 3 | Prompt Engineering for Production | Block 2 |
| 4 | Context Engineering | Block 2 |
| 5 | MCP Servers, Function Calling & Tool Use | Block 3 |
| 6 | Databases for AI: Vector Stores, Graph DBs & More | Block 3 |
| 7 | AI Agents & Agent Loops | Block 3 |
| 8 | RAG End-to-End | Block 3 |
| 9 | Guardrails, Safety & Responsible AI | Block 4 |
| 10 | LLM Observability & Monitoring | Block 5 |
| 11 | Evaluation & Testing for AI Systems | Block 5 |
| 12 | Shipping It: Deployment & LLMOps | Block 5 |

**12 videos total.** At one Under the Hood video every 3 uploads, that's approximately 8–9 months of content — a full series with real longevity.

---

## What Changed from v1

| Old structure | New structure | Reason |
|---|---|---|
| 13 chapters, no grouping | 12 chapters in 5 named blocks | Clearer learning arc |
| Embeddings in standalone chapter | Embeddings in Ch. 2 (LLM overview) + applied in Ch. 6 | Less fragmented |
| Tool use separate from MCP | Function calling folded into Ch. 5 (MCP) | Same mental model, one episode |
| RAG standalone early | RAG as Ch. 8 in Block 3, after vector stores + agents | Builds on prerequisites |
| No "harness engineering" concept | Block 3 explicitly named Harness Engineering | Your framing, your differentiator |
| No deployment chapter | Ch. 12 added — Shipping It + LLMOps | Closes the production loop |
| Portfolio chapter | Removed as standalone | Can be a short/separate video, not part of the core series |

