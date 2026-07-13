// Status refers to the VIDEO COMPANION only — chapter content is always fully live.
export type Status = "published" | "coming-soon" | "planned";

export interface Topic { id: string; label: string }
export interface TopicGroup { label?: string; topics: Topic[] }

export interface Chapter {
  number: number;              // 1–12
  slug: string;                // route, per §3 table
  title: string;
  block: 0 | 1 | 2 | 3 | 4 | 5; // 0 = the roadmap overview (Ch. 1 only)
  status: Status;
  publishDate?: string;        // ISO date, shown on the chip when known
  youtubeId?: string;          // set when published
  summary: string;
  groups: TopicGroup[];
  interviewQuestions: string[];
}

export interface Block { id: 0 | 1 | 2 | 3 | 4 | 5; title: string; goal: string }

export const blocks: Block[] = [
  { id: 0, title: "Roadmap Overview", goal: "Understand how to use this roadmap, the prerequisite mindset, and other helpful context." },
  { id: 1, title: "LLM Basics", goal: "Give the viewer a complete mental model of what an LLM is before they touch any code." },
  { id: 2, title: "Controlling LLM Behaviour", goal: "Teach the two core skills for controlling LLM behaviour — prompt engineering and context engineering." },
  { id: 3, title: "Harness Engineering", goal: "Teach how to build the full system around an LLM — the tools, databases, retrieval systems, agent loops, and protocols that make an LLM actually useful in production." },
  { id: 4, title: "Production", goal: "Take everything built so far from a working demo to a monitored, deployed, production-grade system." },
  { id: 5, title: "Safety & Ethics", goal: "Teach how to make AI systems safe, fair, and production-trustworthy." }
];

export const chapters: Chapter[] = [
  {
    "number": 1,
    "slug": "start",
    "title": "BHM AI Engineer Roadmap Overview",
    "block": 0,
    "status": "coming-soon",
    "summary": "Learn how to use the website, the prerequisite mindset, and explore other helpful content already on the channel before diving into the main chapters.",
    "groups": [],
    "interviewQuestions": [],
    "publishDate": "2026-07-19"
  },
  {
    "number": 2,
    "slug": "llms",
    "title": "What is an LLM? Everything You Need to Know",
    "block": 1,
    "status": "planned",
    "summary": "The fundamentals of Large Language Models. From tokens and embeddings to fine-tuning vs RAG. The mental model you need before writing code.",
    "groups": [
      {
        "topics": [
          {
            "id": "llms:what-an-llm-actually-is",
            "label": "What an LLM actually is"
          },
          {
            "id": "llms:tokens-what-they-are",
            "label": "Tokens — what they are, why they matter (cost, limits, behaviour)"
          },
          {
            "id": "llms:context-window",
            "label": "Context window"
          },
          {
            "id": "llms:embeddings-meaning-use-and-intuition-first",
            "label": "Embeddings — meaning, use and intuition-first (no math)"
          },
          {
            "id": "llms:apis-messages-system-user",
            "label": "APIs & messages — system / user / assistant format; streaming — why responses arrive token by token"
          },
          {
            "id": "llms:llm-providers-openai-anthropic",
            "label": "LLM providers — OpenAI, Anthropic (Claude), Google (Gemini), DeepSeek, Hugging Face"
          },
          {
            "id": "llms:training-vs-inference-what",
            "label": "Training vs inference — what happens at each stage, why it matters to engineers"
          },
          {
            "id": "llms:closed-source-vs-open",
            "label": "Closed source vs open source vs locally hosted models — tradeoffs"
          },
          {
            "id": "llms:weights-what-they-are",
            "label": "Weights — what they are in plain English"
          },
          {
            "id": "llms:fine-tuning-surface-level",
            "label": "Fine-tuning — surface level only (what it is, when it's relevant, why it's rarely the answer)"
          },
          {
            "id": "llms:prompt-engineering-rag-agents",
            "label": "Prompt engineering, RAG, agents — introduced as concepts, one sentence each (the map for the rest of the roadmap)"
          },
          {
            "id": "llms:temperature-reasoning-thinking",
            "label": "Temperature, reasoning, thinking — what they control, when to tune"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "How does an LLM work?",
      "What's the difference between a closed source and open source model?",
      "What is tokenization?",
      "Why do LLMs hallucinate?"
    ]
  },
  {
    "number": 3,
    "slug": "prompting",
    "title": "Prompt Engineering for Production",
    "block": 2,
    "status": "planned",
    "summary": "Mastering prompt engineering for production. Zero-shot, chain-of-thought, system prompts, and treating prompts like code.",
    "groups": [
      {
        "topics": [
          {
            "id": "prompting:what-is-a-prompt",
            "label": "What is a prompt"
          },
          {
            "id": "prompting:zero-shot-one-shot",
            "label": "Zero-shot, one-shot, few-shot prompting — when to use each"
          },
          {
            "id": "prompting:chain-of-thought-cot",
            "label": "Chain-of-thought (CoT) — why \"think step by step\" works"
          },
          {
            "id": "prompting:role-and-format-prompting",
            "label": "Role and format prompting"
          },
          {
            "id": "prompting:negative-prompting-telling-the",
            "label": "Negative prompting — telling the model what NOT to do"
          },
          {
            "id": "prompting:instruction-clarity-why-vague",
            "label": "Instruction clarity — why vague prompts produce vague answers"
          },
          {
            "id": "prompting:prompt-chaining-breaking-complex",
            "label": "Prompt chaining — breaking complex tasks into steps"
          },
          {
            "id": "prompting:common-failure-modes-over",
            "label": "Common failure modes: over-refusal, instruction drift, hallucination"
          },
          {
            "id": "prompting:treating-prompts-like-code",
            "label": "Treating prompts like code — versioning, testing, iteration"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "What's the difference between zero-shot and few-shot prompting?",
      "How does chain-of-thought prompting work?",
      "How do you test and version prompts in production?",
      "Walk me through designing a prompt for a customer support bot."
    ]
  },
  {
    "number": 4,
    "slug": "context",
    "title": "Context Engineering",
    "block": 2,
    "status": "planned",
    "summary": "How real AI systems manage the context window — memory, compaction, isolation, and prompt caching.",
    "groups": [
      {
        "topics": [
          {
            "id": "context:what-context-engineering-is",
            "label": "What context engineering is — and why it's different from prompt engineering"
          },
          {
            "id": "context:the-context-window-as",
            "label": "The context window as a scarce resource — what goes in, what gets cut"
          },
          {
            "id": "context:context-ordering-why-position",
            "label": "Context ordering — why position in the window affects model attention"
          },
          {
            "id": "context:external-memory-what-it",
            "label": "External memory — what it is, when you need it"
          },
          {
            "id": "context:how-real-ai-systems",
            "label": "How real AI systems manage context (not just a single prompt)"
          },
          {
            "id": "context:context-isolation-keeping-different",
            "label": "Context isolation — keeping different tasks / users separated"
          },
          {
            "id": "context:context-compaction-summarising-when",
            "label": "Context compaction — summarising when the window fills up"
          },
          {
            "id": "context:context-degradation-how-long",
            "label": "Context degradation — how long conversations go wrong (\"lost in the middle\")"
          },
          {
            "id": "context:the-needle-in-a",
            "label": "The needle-in-a-haystack test — how LLMs are evaluated for context recall"
          },
          {
            "id": "context:pulling-context-from-external",
            "label": "Pulling context from external services into the LLM"
          },
          {
            "id": "context:prompt-caching-what-it",
            "label": "Prompt caching — what it is, cost savings (Anthropic / OpenAI)"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "What is context engineering?",
      "How do you handle conversations that exceed the context window?",
      "What is the 'lost in the middle' problem?",
      "What is prompt caching and how does it save cost?",
      "How do you design memory for a long-running AI system?"
    ]
  },
  {
    "number": 5,
    "slug": "mcp",
    "title": "MCP Servers, Function Calling & Tool Use",
    "block": 3,
    "status": "planned",
    "summary": "Connecting LLMs to the real world. Function calling, the Model Context Protocol (MCP), and standardising agent-to-tool communication.",
    "groups": [
      {
        "topics": [
          {
            "id": "mcp:how-a-model-decides",
            "label": "How a model decides to call a function vs respond directly"
          },
          {
            "id": "mcp:defining-tools-schemas-descriptions",
            "label": "Defining tools: schemas, descriptions, parameters"
          },
          {
            "id": "mcp:the-tool-call-loop",
            "label": "The tool call loop: model → tool call → result → model"
          },
          {
            "id": "mcp:parallel-tool-calls",
            "label": "Parallel tool calls"
          },
          {
            "id": "mcp:error-handling-when-tools",
            "label": "Error handling when tools fail"
          },
          {
            "id": "mcp:structured-outputs-json-mode",
            "label": "Structured outputs — JSON mode, schemas, Pydantic validation, retrying when parsing fails"
          },
          {
            "id": "mcp:what-makes-a-good",
            "label": "What makes a good tool description"
          }
        ],
        "label": "Function calling first (the prerequisite):"
      },
      {
        "label": "Then MCP:",
        "topics": [
          {
            "id": "mcp:what-mcp-is-and",
            "label": "What MCP is and why Anthropic created it"
          },
          {
            "id": "mcp:the-problem-it-solves",
            "label": "The problem it solves: standardised agent-to-tool communication"
          },
          {
            "id": "mcp:mcp-vs-function-calling",
            "label": "MCP vs function calling — complementary, not the same"
          },
          {
            "id": "mcp:the-mcp-architecture-host",
            "label": "The MCP architecture: host, client, server"
          },
          {
            "id": "mcp:using-existing-mcp-servers",
            "label": "Using existing MCP servers (filesystem, GitHub, Slack, Notion)"
          },
          {
            "id": "mcp:building-your-own-mcp",
            "label": "Building your own MCP server (Python FastMCP)"
          },
          {
            "id": "mcp:when-mcp-makes-sense",
            "label": "When MCP makes sense vs direct function calling"
          },
          {
            "id": "mcp:the-growing-ecosystem",
            "label": "The growing ecosystem"
          },
          {
            "id": "mcp:security-risks-of-tool",
            "label": "Security risks of tool use — tool poisoning, data exfiltration, why tool output is untrusted input"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "How does function calling work in LLMs?",
      "How does the model decide when to call a tool vs respond directly?",
      "How do you get reliable structured JSON out of an LLM?",
      "What is MCP and what problem does it solve?",
      "How does MCP differ from regular function calling?",
      "Have you built an MCP server?"
    ]
  },
  {
    "number": 6,
    "slug": "databases",
    "title": "Databases for AI: Vector Stores, Graph DBs & More",
    "block": 3,
    "status": "planned",
    "summary": "The retrieval substrate for AI. Vector stores, embeddings, cosine similarity, chunking strategies, and hybrid search.",
    "groups": [
      {
        "topics": [
          {
            "id": "databases:what-embeddings-are-intuition",
            "label": "What embeddings are — intuition first (builds on Ch. 2)"
          },
          {
            "id": "databases:cosine-similarity-why-it",
            "label": "Cosine similarity"
          },
          {
            "id": "databases:what-a-vector-db",
            "label": "What a vector DB does vs a regular DB"
          },
          {
            "id": "databases:the-major-options-pgvector",
            "label": "The major options: pgvector, Pinecone, Chroma"
          },
          {
            "id": "databases:chunking-strategies-fixed-size",
            "label": "Chunking strategies: fixed-size, semantic, hierarchical — why it matters enormously"
          },
          {
            "id": "databases:metadata-filtering-combining-semantic",
            "label": "Metadata filtering — combining semantic search with structured filters"
          }
        ],
        "label": "Vector Stores (core):"
      },
      {
        "label": "Other DBs and data:",
        "topics": [
          {
            "id": "databases:graph-databases-neo4j-when",
            "label": "Graph databases (Neo4j) — when relationships between entities matter"
          },
          {
            "id": "databases:key-value-stores-redis",
            "label": "Key-value stores (Redis) — caching, session state, fast lookups in agent loops"
          },
          {
            "id": "databases:handling-other-data-types",
            "label": "Handling other data types — PDFs, images, audio: how non-text data gets parsed, transcribed, or embedded into AI systems"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "What is an embedding and how is it used?",
      "How does cosine similarity work for semantic search?",
      "pgvector vs Pinecone — when would you choose each?",
      "What chunking strategy would you use for a 100-page PDF?",
      "When would you use a graph DB vs a vector DB in an AI system?",
      "What role does Redis play in an agent harness?"
    ]
  },
  {
    "number": 7,
    "slug": "rag",
    "title": "RAG End-to-End",
    "block": 3,
    "status": "planned",
    "summary": "Building complete Retrieval-Augmented Generation pipelines. From naive RAG to hybrid search, reranking, and query transformation.",
    "groups": [
      {
        "topics": [
          {
            "id": "rag:what-rag-is-and",
            "label": "What RAG is and the problem it solves"
          },
          {
            "id": "rag:the-two-components-retriever",
            "label": "The two components: retriever + generator"
          },
          {
            "id": "rag:rag-vs-fine-tuning",
            "label": "RAG vs fine-tuning — when to use each"
          },
          {
            "id": "rag:naive-rag-the-simplest",
            "label": "Naive RAG: the simplest possible version"
          }
        ],
        "label": "Foundations:"
      },
      {
        "label": "The full pipeline:",
        "topics": [
          {
            "id": "rag:document-ingestion-and-preprocessing",
            "label": "Document ingestion and preprocessing (chunking strategies — covered in Ch. 6)"
          },
          {
            "id": "rag:query-time-retrieval-semantic",
            "label": "Query-time retrieval: semantic search"
          },
          {
            "id": "rag:context-assembly-stuffing-retrieved",
            "label": "Context assembly — stuffing retrieved docs into the prompt"
          },
          {
            "id": "rag:generation-with-the-llm",
            "label": "Generation with the LLM"
          }
        ]
      },
      {
        "label": "Improving RAG:",
        "topics": [
          {
            "id": "rag:hybrid-search-vector-keyword",
            "label": "Hybrid search, reranking"
          },
          {
            "id": "rag:query-transformation-hyde-query",
            "label": "Query transformation: HyDE, query expansion, step-back prompting"
          }
        ]
      },
      {
        "label": "Evaluation Metrics:",
        "topics": [
          {
            "id": "rag:retrieval-metrics-recall-precision",
            "label": "Retrieval metrics: recall, precision"
          },
          {
            "id": "rag:generation-metrics-faithfulness-answer",
            "label": "Generation metrics: faithfulness, answer relevance"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "Explain RAG end-to-end.",
      "When would you use RAG vs fine-tuning?",
      "What is hybrid search and why is it better than pure vector search?",
      "What is reranking and when do you need it?",
      "What is HyDE?",
      "How do you evaluate a RAG pipeline?",
      "What are common RAG failure modes?"
    ]
  },
  {
    "number": 8,
    "slug": "agents",
    "title": "AI Agents & Agent Loops",
    "block": 3,
    "status": "planned",
    "summary": "The core of autonomous AI. ReAct framework, stateful agents, memory design, failure modes, and building loops with LangGraph.",
    "groups": [
      {
        "topics": [
          {
            "id": "agents:agent-perception-reasoning-action",
            "label": "Agent = perception → reasoning → action → loop"
          },
          {
            "id": "agents:why-agents-are-hard",
            "label": "Why agents are hard: non-determinism, error propagation, context management"
          },
          {
            "id": "agents:the-react-framework-reasoning",
            "label": "The ReAct framework — reasoning + acting interleaved (the dominant pattern)"
          },
          {
            "id": "agents:self-correcting-loops-how",
            "label": "Self-correcting loops — how agents recover from mistakes"
          }
        ],
        "label": "What agents are:"
      },
      {
        "label": "Architecture:",
        "topics": [
          {
            "id": "agents:single-agent-vs-multi",
            "label": "Single agent vs multi-agent systems"
          },
          {
            "id": "agents:memory-system-design-in",
            "label": "Memory system design: in-context, external (vector store), episodic vs semantic"
          },
          {
            "id": "agents:planning-how-agents-decompose",
            "label": "Planning — how agents decompose tasks"
          },
          {
            "id": "agents:tool-use-inside-the",
            "label": "Tool use inside the loop (builds on Ch. 5)"
          },
          {
            "id": "agents:stopping-conditions-how-does",
            "label": "Stopping conditions — how does an agent know it's done?"
          }
        ]
      },
      {
        "label": "Frameworks:",
        "topics": [
          {
            "id": "agents:langgraph-stateful-agents-the",
            "label": "LangGraph — stateful agents, the production standard"
          },
          {
            "id": "agents:crewai-claude-agent-sdk",
            "label": "CrewAI, Claude Agent SDK, OpenAI Agents SDK, Google ADK — a brief tour of the ecosystem"
          }
        ]
      },
      {
        "label": "Production concerns:",
        "topics": [
          {
            "id": "agents:failure-modes-infinite-loops",
            "label": "Failure modes: infinite loops, hallucinated tool calls, context overflow"
          },
          {
            "id": "agents:human-in-the-loop",
            "label": "Human-in-the-loop patterns"
          },
          {
            "id": "agents:tracing-agent-runs-intro",
            "label": "Tracing agent runs (intro — full observability in Block 4)"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "Explain the ReAct framework.",
      "What's the difference between single and multi-agent systems?",
      "How does an agent manage memory across a long task?",
      "What are common agent failure modes?",
      "When would you use LangGraph vs CrewAI?"
    ]
  },
  {
    "number": 9,
    "slug": "observability",
    "title": "LLM Observability & Monitoring",
    "block": 4,
    "status": "planned",
    "summary": "Observability for LLM applications. Tracing, logging, cost analysis, latency monitoring, and setting up production alerts.",
    "groups": [
      {
        "topics": [
          {
            "id": "observability:why-observability-is-different",
            "label": "Why observability is different for AI vs regular software"
          },
          {
            "id": "observability:tracing",
            "label": "Tracing — following one request end-to-end (LangSmith, Langfuse)"
          },
          {
            "id": "observability:logging-for-ai-systems",
            "label": "Logging for AI systems — what to log, what not to"
          },
          {
            "id": "observability:cost-analysis-token-usage",
            "label": "Cost analysis — token usage tracking, cost per request, budget alerts"
          },
          {
            "id": "observability:latency-monitoring-where-time",
            "label": "Latency monitoring — where time is actually spent in an LLM pipeline"
          },
          {
            "id": "observability:user-feedback-loops-thumbs",
            "label": "User feedback loops — thumbs up/down, implicit signals"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "How do you monitor an LLM in production?",
      "How do you track and control LLM costs?"
    ]
  },
  {
    "number": 10,
    "slug": "evals",
    "title": "Evaluation & Testing for AI Systems",
    "block": 4,
    "status": "planned",
    "summary": "Evaluating AI systems rigorously. Offline vs online eval, LLM-as-judge, RAGAS metrics, and prompt regression testing.",
    "groups": [
      {
        "topics": [
          {
            "id": "evals:why-eval-is-the",
            "label": "Why eval is the hardest part of AI engineering"
          },
          {
            "id": "evals:offline-vs-online-evaluation",
            "label": "Offline vs online evaluation"
          },
          {
            "id": "evals:llm-as-judge-using",
            "label": "LLM-as-judge — using a model to score model outputs, limitations"
          },
          {
            "id": "evals:eval-frameworks",
            "label": "Eval frameworks — RAGAS, DeepEval: what they measure and when to reach for them"
          },
          {
            "id": "evals:production-eval-platforms",
            "label": "Production eval platforms — LangSmith, Confident AI"
          },
          {
            "id": "evals:choosing-metrics",
            "label": "Choosing metrics — task success, faithfulness, relevance, format compliance"
          },
          {
            "id": "evals:prompt-regression-testing-catching",
            "label": "Prompt regression testing — catching quality drops when prompts change"
          },
          {
            "id": "evals:a-b-testing-llm",
            "label": "A/B testing LLM changes in production"
          },
          {
            "id": "evals:the-eval-improve-loop",
            "label": "The eval → improve loop"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "How do you evaluate an LLM pipeline?",
      "What is LLM-as-judge and what are its limitations?",
      "What is RAGAS and what does it measure?",
      "How do you regression test a prompt change?",
      "How do you run A/B tests on LLM outputs?"
    ]
  },
  {
    "number": 11,
    "slug": "shipping",
    "title": "Shipping It: Deployment & LLMOps",
    "block": 4,
    "status": "planned",
    "summary": "Deploying production-grade AI apps. Containerisation, latency optimisation, semantic caching, and LLMOps CI/CD pipelines.",
    "groups": [
      {
        "topics": [
          {
            "id": "shipping:standard-2026-stack-fastapi",
            "label": "Standard 2026 stack: FastAPI backend + Next.js frontend + LLM API + vector DB + Supabase + Vercel/Railway"
          },
          {
            "id": "shipping:how-ai-apps-differ",
            "label": "How AI apps differ architecturally from regular web apps"
          }
        ],
        "label": "The AI app stack:"
      },
      {
        "label": "Deployment:",
        "topics": [
          {
            "id": "shipping:containerising-an-ai-app",
            "label": "Containerising an AI app (Docker basics)"
          },
          {
            "id": "shipping:deployment-options-vercel-railway",
            "label": "Deployment options: Vercel, Railway, Render, AWS Lambda — tradeoffs"
          },
          {
            "id": "shipping:environment-and-secrets-management",
            "label": "Environment and secrets management"
          }
        ]
      },
      {
        "label": "Performance:",
        "topics": [
          {
            "id": "shipping:latency-optimisation-streaming-async",
            "label": "Latency optimisation: streaming, async calls, caching"
          },
          {
            "id": "shipping:cost-optimisation-prompt-caching",
            "label": "Cost optimisation: model selection by task, batching (prompt caching — Ch. 4)"
          },
          {
            "id": "shipping:semantic-caching-cache-by",
            "label": "Semantic caching — cache by meaning not exact match"
          }
        ]
      },
      {
        "label": "Reliability:",
        "topics": [
          {
            "id": "shipping:fallback-strategies-when-the",
            "label": "Fallback strategies when the LLM API goes down"
          },
          {
            "id": "shipping:rate-limiting-and-throttling",
            "label": "Rate limiting and throttling"
          }
        ]
      },
      {
        "label": "CI/CD for AI:",
        "topics": [
          {
            "id": "shipping:version-controlling-prompts",
            "label": "Version controlling prompts"
          },
          {
            "id": "shipping:running-eval-suite-in",
            "label": "Running eval suite in CI before deployment"
          },
          {
            "id": "shipping:rolling-out-llm-changes",
            "label": "Rolling out LLM changes safely — feature flags, canary deploys"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "How would you deploy an LLM-powered API to production?",
      "How do you optimise latency in an LLM application?",
      "What is semantic caching?",
      "How do you handle LLM API downtime gracefully?",
      "Walk me through your CI/CD process for an AI feature."
    ]
  },
  {
    "number": 12,
    "slug": "guardrails",
    "title": "Guardrails, Safety & Responsible AI",
    "block": 5,
    "status": "planned",
    "summary": "Making AI systems safe and trustworthy. Implementing input/output guardrails, preventing prompt injection, and fairness assessment.",
    "groups": [
      {
        "topics": [
          {
            "id": "guardrails:what-guardrails-are-and",
            "label": "What guardrails are and why every production system needs them"
          },
          {
            "id": "guardrails:input-guardrails-prompt-injection",
            "label": "Input guardrails: prompt injection prevention, jailbreak detection, PII detection"
          },
          {
            "id": "guardrails:output-guardrails-hallucination-detection",
            "label": "Output guardrails: hallucination detection, format validation, toxicity filtering"
          },
          {
            "id": "guardrails:content-filtering-and-moderation",
            "label": "Content filtering and moderation APIs"
          },
          {
            "id": "guardrails:owasp-llm-top-10",
            "label": "OWASP LLM Top 10 — the industry checklist for LLM security risks"
          }
        ],
        "label": "Guardrails:"
      },
      {
        "label": "Fairness & ethics:",
        "topics": [
          {
            "id": "guardrails:how-training-data-shapes",
            "label": "How training data shapes model bias"
          },
          {
            "id": "guardrails:fairness-assessment-what-to",
            "label": "Fairness assessment"
          },
          {
            "id": "guardrails:transparency-in-ai-systems",
            "label": "Transparency in AI systems"
          },
          {
            "id": "guardrails:laws-regulations-around",
            "label": "Laws & regulations around AI — GDPR, HIPAA, the EU AI Act and others: how to check what applies to your project"
          },
          {
            "id": "guardrails:responsible-deployment-practices",
            "label": "Responsible deployment practices"
          }
        ]
      }
    ],
    "interviewQuestions": [
      "What are guardrails and how would you implement them?",
      "What is prompt injection and how do you prevent it?",
      "What regulations might apply to an AI system you're building, and how do you find out?",
      "How do you assess fairness in an LLM system?",
      "What output validation do you apply to LLM responses in production?"
    ]
  }
];