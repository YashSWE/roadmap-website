# PROMPT — AI Engineering Roadmap 2026 site (roadmap.behumoury.com)

**How to use this file:** paste everything below the line into your coding agent, and attach `ai-engineering-roadmap-2026.md` (the roadmap content document) alongside it. The agent needs both — this file is the build spec, the roadmap MD is the content source.

---

## 1. Project brief

Build **The Behumoury Roadmap** — a 12-chapter AI engineering curriculum site by **behumoury** (Yash Bhandari, an AI engineer), and the follow-along home of his AI Engineering Roadmap 2026 YouTube series. Think NeetCode's roadmap page, rebuilt in the behumoury design language: a visual, checkable curriculum that is **complete and live from day one** — every chapter fully readable at launch. The videos are companions that slot in as the series releases; nobody ever waits for a video to keep learning.

The site has one job: a software engineer taps a link in a YouTube description, sees exactly what to learn and in what order, checks topics off as they learn them, and comes back as new chapters release.

Non-negotiables:

- **No login, no accounts, no email capture, no paywalls.** Progress lives in localStorage.
- **Every chapter is its own deep-linkable page.** URLs will be read out loud in videos, so they must be short and sayable.
- **All content is data-driven from one config file.** The attached roadmap MD is the single source of truth — ingest it verbatim (rules in §7).
- **Sibling site to the behumoury.com portfolio.** Same color tokens, same type system, same attitude (§2).
- **The whole curriculum is live on day one.** Video status never gates content — a chapter without a video is still a complete chapter.
- **Ships before July 19, 2026** (series launch). This site is also the subject of an "Under the Hood" video episode — the codebase itself will be walked through on camera, so it must be clean enough to present (§11, repo hygiene).

Voice: confident, minimal, slightly playful. Builder energy. Every sentence on the site should be something Yash could say on camera without wincing.

---

## 2. Aesthetic direction — "industrial editorial, neon-lit" (inherited)

This is the same design system as the behumoury.com portfolio: a precisely typeset technical spec sheet crossed with a streetwear drop page. Exposed grid, mono metadata, huge condensed type, sticker accents. Everything disciplined and quiet — with exactly one glowing signature element.

**The signature, adapted for this site:** on the portfolio, the neon glow lives on the BHM logotype in the hero. Here, the glow marks **the current chapter** — the first incomplete chapter node on the roadmap spine blooms with a blue-violet neon halo. The glow literally means *you are here*, and it moves down the spine as the visitor progresses. The glow appears nowhere else, except a faint echo on footer link hover.

### 2.1 Color tokens

Neutrals (the base — 95% of the site):

| Token | Hex | Use |
|---|---|---|
| Ink | `#0A0A0A` | Hero + footer + CTA band backgrounds, all text on light, borders |
| Bone | `#F3F1EA` | Main light background |
| Paper White | `#FFFFFF` | Text/logotype on dark, card surfaces |
| Grid Line | `rgba(10,10,10,0.08)` | Visible layout grid on light sections |

Fluorescents (the seasoning — deliberate and sparing):

| Token | Hex | Use on this site |
|---|---|---|
| Glow Blue | `#3D5AFE` | Current-chapter neon bloom core, focus rings, link hover |
| Violet Bloom | `#8C5BFF` | Outer halo of the bloom |
| Acid | `#C6FF3F` | **Progress = Acid.** Spine fill, completed nodes, checked boxes, progress bars, `PUBLISHED` chips, primary buttons |
| Signal Pink | `#FF3D8A` | Sticker fill only |
| Safety Orange | `#FF5C1F` | Sticker fill only |

Rules (strict): fluorescents never carry body text. Text sitting on a fluorescent fill is always Ink. No gradients anywhere except inside the glow effect itself. Acid has exactly one meaning sitewide — progress/done — never decoration.

### 2.2 Typography

- **Display:** Anton (or Archivo Black Condensed). ALL CAPS, line-height 0.85–0.9, tracking −1% to −2%. Scale here tops out lower than the portfolio — clamp between 36px and 112px — because this is a denser, utility-first page.
- **Body:** Space Grotesk, 16–18px, line-height 1.6, Ink on Bone.
- **Utility / metadata:** JetBrains Mono, 11–13px, UPPERCASE, +6% letter-spacing. Chapter numbers, meta rows, status chips, labels, buttons, fine print. The mono voice does a lot of work on this site.
- **BHM logotype:** use the supplied logo SVG inline — never re-typeset it. It links back to behumoury.com.

Fonts via `next/font/google`: Anton, Space Grotesk, JetBrains Mono.

### 2.3 Surface, grid, stickers

- Light sections: Bone with visible 1px Grid Lines — a real layout grid that content visibly snaps to, not a decorative texture.
- Dark sections: hero, CTA band, footer are Ink.
- Borders: 1px Ink. Interactive cards use hard offset shadows (`4px 4px 0 #0A0A0A`) — never soft drop shadows. Corner radius ≤ 2px.
- Stickers: rotated badge chips (−6° to +8°), fluorescent fills, Ink text set in mono or a black grotesque. **Maximum 5 sitewide** — the exact set is in the copy deck (§8).
- Family echo (required): one thin Acid marquee strip directly under the hero — `LEARN THE JOB, NOT THE HYPE · BY YASH BHANDARI ·` repeating, Ink mono text. This is the tagline + byline moment, and the one allowed moving strip. Pauses under reduced motion.

---

## 3. Information architecture & routes

Deployed as its own Vercel project at **roadmap.behumoury.com**. (If it's ever moved under `behumoury.com/roadmap`, that's a rewrite/multi-zone on the main site — do not build for it now.)

- `/` — home: hero → progress module → the spine (5 blocks, 12 chapters) → how to use → before you start → already on the channel → CTA band → footer
- Twelve chapter routes at the **root level** with short, sayable slugs (these get spoken in videos — "roadmap dot behumoury dot com slash rag"):

| # | Route | Chapter |
|---|---|---|
| 1 | `/start` | Complete AI Engineer Roadmap 2026 (Series Intro) |
| 2 | `/llms` | What is an LLM? Everything You Need to Know |
| 3 | `/prompting` | Prompt Engineering for Production |
| 4 | `/context` | Context Engineering |
| 5 | `/mcp` | MCP Servers, Function Calling & Tool Use |
| 6 | `/databases` | Databases for AI: Vector Stores, Graph DBs & More |
| 7 | `/agents` | AI Agents & Agent Loops |
| 8 | `/rag` | RAG End-to-End |
| 9 | `/guardrails` | Guardrails, Safety & Responsible AI |
| 10 | `/observability` | LLM Observability & Monitoring |
| 11 | `/evals` | Evaluation & Testing for AI Systems |
| 12 | `/shipping` | Shipping It: Deployment & LLMOps |

No other routes. No API routes (except the OG image route, §9). 404 page styled in-system: Ink background, Anton `LOST IN THE MIDDLE.`, mono link `← BACK TO THE ROADMAP`.

---

## 4. Home page spec

### 4.1 Hero (Ink)

- Top bar: BHM SVG left (→ behumoury.com). Mono links right: `THE SERIES ↗` (YouTube playlist **[PLACEHOLDER URL]**) · `PORTFOLIO ↗` (behumoury.com).
- Mono topline: `[BHM] — THE BEHUMOURY ROADMAP / AI ENGINEERING · 2026`
- Display headline, Paper White, two lines: `12 CHAPTERS TO` / second line stroke-only (outlined) white: `AI ENGINEER.` (locked — do not substitute)
- Body (max-width 60ch): "The full application layer across 5 blocks — free, complete from day one, no signup. Every chapter maps to a real interview question or something I use on the job. Videos drop alongside as the series releases." **[EDIT TO TASTE]**
- Sticker: `INTERVIEW-TESTED` in Signal Pink, overlapping the headline's top-right corner.
- Two buttons: `START CH. 01 →` (Acid fill, Ink text, links to `/start`) · `WATCH ON YOUTUBE ↗` (1px Paper White outline, transparent).
- Hero baseline, mono strip: `12 CHAPTERS · 5 BLOCKS · ALL LIVE DAY ONE · 0 SIGNUPS`

### 4.2 Progress module (first light section)

- Mono label: `YOUR PROGRESS — SAVED IN THIS BROWSER` (honest about localStorage; no account implied).
- Big Anton percentage (e.g. `14%`) + mono count (e.g. `11/78 TOPICS` — both computed from data, never hardcoded).
- Full-width progress bar: 8px Ink track, Acid fill, small tick marks at block boundaries.
- Tiny mono `RESET` text button with a confirm dialog.
- Zero state (nothing checked): empty bar, label swaps to `NOTHING CHECKED YET — THAT'S THE POINT. START BELOW.`
- Complete state (everything checked): bar fully Acid, label swaps to `ROADMAP COMPLETE — GO GET THE JOB.` plus the `DONE ✓` Acid sticker. The spine glow retires (nothing left to point at).

### 4.3 The spine (core module — this is the NeetCode moment)

A metro-line layout, designed mobile-first (most traffic arrives from YouTube on phones):

- A 2px Ink vertical rail, left-aligned (~24px from the edge on mobile; grid column 2 on desktop). An Acid fill line overlays it, growing from the top, its height = overall progress %. It animates on first view (Framer Motion, §10).
- Chapter 1 sits at the top of the rail under a mono label `START — THE SERIES INTRO`, before Block 1 begins.
- Then 5 block groups. Each block header: mono `BLOCK 03` + Anton `HARNESS ENGINEERING` + the block's goal line from the source doc (Space Grotesk, ≤70ch). Block 3 gets the `COINED HERE` Acid sticker beside its header — "Harness Engineering" is Yash's own term and the series differentiator.
- Each chapter = a node dot on the rail + a card to its right:
  - **Dot:** 12px. Bone fill + Ink border by default. Acid fill when the chapter is 100% checked. The **current chapter** (defined in §6) gets the neon bloom: a layered box-shadow/blur stack — Glow Blue core, Violet Bloom outer halo — with a slow 3s breathing pulse (static glow under reduced motion). This is the signature element of the whole site.
  - **Card** (whole card is the link): mono meta row `CH. 08 · BLOCK 3 · 20–25 MIN` → title (Anton, 24–32px) → one-line summary (Space Grotesk) → footer row with status chip + mini count `7/23` + a thin per-chapter progress bar.
  - **Status chips** (mono, 1px border) describe the *video companion only* — never the chapter, which is always fully live: `VIDEO OUT` (Acid fill, Ink text) · `VIDEO JUL 19` (Ink outline on Bone) · `VIDEO SOON` (Grid-Line gray text, no border emphasis).
  - Hover: translate(−2px,−2px) + the 4px offset Ink shadow. Focus ring: Glow Blue.
- `START HERE →` Acid sticker beside the Ch. 1 card — hidden permanently once anything is checked.

### 4.4 How to use (three mono-numbered steps — the order is real, so numbering is earned)

`[01] READ` — every chapter is live in full right now; the video companion lands as the series releases. · `[02] BUILD` — every chapter ends in an on-screen build; do it, don't just read it. · `[03] CHECK IT OFF` — tick a topic when you can explain it out loud; progress saves in this browser.

### 4.5 Before you start (prerequisites card)

From the source doc's "Prerequisites" section, verbatim: Python (good enough — TypeScript works too), basic frontend + backend fundamentals, general SDLC best practices. Mono list rows, each with an optional outbound link **[PLACEHOLDER]**. Closing note from the doc: "Learn these simultaneously if you don't have them — they don't block the series."

### 4.6 Already on the channel

Three link-out rows (title + `WATCH ↗`): *What is an AI Engineer — roles & responsibilities* · *AI Engineer vs ML Engineer* · *Interview experience — what companies actually ask*. **[ALL THREE URLS PLACEHOLDER]**. Mono footnote: `REFERENCED THROUGHOUT THE SERIES — NOT REPEATED IN IT.`

### 4.7 CTA band (Ink)

Anton: `THE VIDEOS DROP ON YOUTUBE.` Body: "The chapters are all here already — the videos land on YouTube. No email list; subscribing is the notification system." Button: `SUBSCRIBE ↗` (Acid). Sticker: `100% FREE` in Safety Orange.

### 4.8 Footer (Ink)

Mono link columns: `YOUTUBE` / `INSTAGRAM` / `GITHUB` / `PORTFOLIO` **[PLACEHOLDER URLS]** — link hover gets the faint Glow Blue echo (the only glow outside the spine). Fine print: `BHM © '26 · MADE IN PUNE, IN` + "No email walls. No course upsell. If this helped, subscribing is the thank-you." + tiny `RESET PROGRESS` mono button.

---

## 5. Chapter page spec (one template, 12 statically generated pages)

- Top bar: BHM SVG (→ `/`), mono link `ALL CHAPTERS` (→ `/`).
- Mono breadcrumb row: `ROADMAP / BLOCK 3 / CH. 08`
- Title in Anton. Under it, mono meta: `TARGET 20–25 MIN · [status chip]`.
- Chapter progress strip: thin bar + `7/23 TOPICS` + a per-chapter `RESET CHAPTER` micro-button (confirm).
- **Video slot:**
  - `published` → click-to-load YouTube facade (thumbnail + play button; the iframe only loads on click — never eager-load YouTube). 16:9, 1px Ink border, 4px offset shadow.
  - `coming-soon` / `planned` → a **compact** Ink panel (a slim banner, not a hero — it must not push the syllabus below the fold; the chapter, not the missing video, is the page): Anton `VIDEO DROPS JUL 19` (or `VIDEO IN PRODUCTION` when no date is set), body: "This chapter is complete — everything below is ready to learn right now. The video companion walks through all of it, plus the build, when it lands." + `SUBSCRIBE ↗` Acid button.
- **Syllabus (the checkable core):** groups rendered with mono group labels (e.g. `FUNCTION CALLING FIRST`, `THEN MCP`) exactly as grouped in the source doc. Each row: a custom checkbox (18px square, 1px Ink border; checked = Acid fill with an Ink tick drawn via a 150ms SVG path animation) + the topic label in Space Grotesk. The entire row toggles on click/tap, not just the box. Checked rows dim the label to ~45% Ink — **no strikethrough** (people re-read these when revising). Real `<input type="checkbox">` semantics underneath: keyboard operable, labelled, visible Glow Blue focus ring.
- **Interview questions:** bordered card, mono header `INTERVIEW QUESTIONS THIS CHAPTER ANSWERS`. Rows: mono index `Q1`–`Qn` + the question. Display-only — the answers live in the video. Not counted in progress.
- **On-screen build:** Ink card, mono header `ON-SCREEN BUILD`, body = the build description from the source doc, verbatim. Optional `CODE ↗` button rendered only when `repoUrl` is set **[PLACEHOLDER — repos come later]**.
- **Builds-on strip** (only when `buildsOn` is set): mono label `BUILDS ON` + linked chapter chips, e.g. on `/rag`: `CH. 06 DATABASES` `CH. 07 AGENTS`.
- **Prev / next:** full-width split row at the bottom, mono: `← CH. 07 AGENTS` / `CH. 09 GUARDRAILS →`.
- No comments, no reactions, no locks. Every chapter is fully readable from day one regardless of video status.

---

## 6. Progress system (localStorage — the whole backend)

- Key: `bhm-roadmap-v1`. Shape: `{ "checked": string[], "updatedAt": "<ISO timestamp>" }`.
- Topic IDs are **hand-authored, stable, human-readable**: `"<chapterSlug>:<topicSlug>"` — e.g. `"rag:hybrid-search"`, `"context:prompt-caching"`. Once shipped, an ID is never renamed (renames silently wipe people's progress). Adding new topics later is always safe.
- Derived values: chapter % (checked ÷ topics in chapter), block %, overall %, and **current chapter** = the lowest-numbered chapter below 100% (all zeros → Ch. 1; everything done → no current chapter, completion state per §4.2).
- Implementation: one `useProgress()` hook behind a React context provider. Reads localStorage in `useEffect` only — the server renders the zero state, and hydration-sensitive numbers are gated behind a `mounted` flag so there is **no hydration mismatch**. Writes debounced ~150ms. Listen for the `storage` event so two open tabs stay in sync.
- Reset: global (home + footer) and per-chapter, both behind a confirm.
- Only syllabus topics count toward progress. Nothing else is tracked, ever.

---

## 7. Content model — one data file, ingested from the attached MD

`content/roadmap.ts` exports the typed data below. **The attached `ai-engineering-roadmap-2026.md` is the single source of truth.** Ingestion rules:

- Every bullet under a chapter's "Subtopics" becomes one topic row, **verbatim** — do not paraphrase, merge, shorten, reorder, or drop anything.
- Italic group lines (e.g. *Function calling first (the prerequisite):*, *Production RAG:*) become group labels.
- Every line under "Interview questions this answers" → `interviewQuestions[]`, verbatim.
- The "On-screen build" paragraph → `build`, verbatim.
- The doc's "What Changed from v1" and "Full Chapter Index" sections are meta — ignore them entirely.
- `summary` is the one field written fresh: one sentence, ≤160 characters, in the site's voice (it doubles as the meta description).

```ts
// Status refers to the VIDEO COMPANION only — chapter content is always fully live.
type Status = "published" | "coming-soon" | "planned";

interface Topic { id: string; label: string }
interface TopicGroup { label?: string; topics: Topic[] }

interface Chapter {
  number: number;              // 1–12
  slug: string;                // route, per §3 table
  title: string;
  block: 0 | 1 | 2 | 3 | 4 | 5; // 0 = the series anchor (Ch. 1 only)
  targetLength: string;        // e.g. "16–20 min"
  status: Status;
  publishDate?: string;        // ISO date, shown on the chip when known
  youtubeId?: string;          // set when published
  repoUrl?: string;            // optional, per-chapter build code
  summary: string;
  groups: TopicGroup[];
  interviewQuestions: string[];
  build: string;
  buildsOn?: number[];         // chapter numbers
}

interface Block { id: 1 | 2 | 3 | 4 | 5; title: string; goal: string }
```

Cross-reference map — encode exactly this as `buildsOn`: `6 → [2]` · `7 → [5]` · `8 → [6, 7]` · `9 → [8]` · `10 → [8]` · `11 → [8]` · `12 → [8, 11]`.

**Launch-state seed:** Ch. 1 → `status: "coming-soon"`, `publishDate: "2026-07-19"`. Ch. 2–12 → `status: "planned"`, no dates. All 12 chapters render in full regardless of status. Flipping a video live = set `status: "published"` + `youtubeId`. Nothing else should need touching.

Worked example — Chapter 4, exactly as it must look (match this shape for all 12):

```ts
{
  number: 4,
  slug: "context",
  title: "Context Engineering",
  block: 2,
  targetLength: "14–18 min",
  status: "planned",
  summary: "How real AI systems manage the context window — memory, compaction, isolation, and prompt caching.",
  groups: [
    {
      topics: [
        { id: "context:what-it-is", label: "What context engineering is — and why it's different from prompt engineering" },
        { id: "context:scarce-resource", label: "The context window as a scarce resource — what goes in, what gets cut" },
        { id: "context:ordering", label: "Context ordering — why position in the window affects model attention" },
        { id: "context:external-memory", label: "External memory — what it is, when you need it" },
        { id: "context:real-systems", label: "How real AI systems manage context (not just a single prompt)" },
        { id: "context:isolation", label: "Context isolation — keeping different tasks / users separated" },
        { id: "context:compaction", label: "Context compaction — summarising when the window fills up" },
        { id: "context:degradation", label: "Context degradation — how long conversations go wrong (\"lost in the middle\")" },
        { id: "context:niah", label: "The needle-in-a-haystack test — how LLMs are evaluated for context recall" },
        { id: "context:external-services", label: "Pulling context from external services into the LLM" },
        { id: "context:prompt-caching", label: "Prompt caching — what it is, cost savings (Anthropic / OpenAI)" }
      ]
    }
  ],
  interviewQuestions: [
    "What is context engineering?",
    "How do you handle conversations that exceed the context window?",
    "What is the 'lost in the middle' problem?",
    "What is prompt caching and how does it save cost?",
    "How do you design memory for a long-running AI system?"
  ],
  build: "Build a conversation manager that tracks history, summarises when it gets too long, and selectively includes only the most relevant prior context. Show token count before and after.",
}
```

**Verification step (required):** after ingesting all 12 chapters, print a table of `chapter → topic count / question count` so a human can eyeball it against the source doc before styling begins.

---

## 8. Copy deck (real copy, no lorem ipsum — everything editable is marked)

**Stickers — the complete sitewide set (max 5, never more):**

| Sticker | Fill | Placement |
|---|---|---|
| `INTERVIEW-TESTED` | Signal Pink | Hero headline corner |
| `START HERE →` | Acid | Beside Ch. 1 card (hides after first check) |
| `COINED HERE` | Acid | Block 3 header |
| `100% FREE` | Safety Orange | CTA band |
| `DONE ✓` | Acid | Progress module, completion state only |

**Key strings:**

- Site name (titles, OG, JSON-LD, spoken references): **The Behumoury Roadmap**
- Hero topline: `[BHM] — THE BEHUMOURY ROADMAP / AI ENGINEERING · 2026`
- Hero headline (locked): `12 CHAPTERS TO` / `AI ENGINEER.`
- Marquee (tagline + byline): `LEARN THE JOB, NOT THE HYPE · BY YASH BHANDARI ·`
- Hero body: "The full application layer across 5 blocks — free, complete from day one, no signup. Every chapter maps to a real interview question or something I use on the job. Videos drop alongside as the series releases." **[EDIT TO TASTE]**
- Progress label: `YOUR PROGRESS — SAVED IN THIS BROWSER`
- Progress zero state: `NOTHING CHECKED YET — THAT'S THE POINT. START BELOW.`
- Progress complete state: `ROADMAP COMPLETE — GO GET THE JOB.`
- Video panel body (video not yet out): "This chapter is complete — everything below is ready to learn right now. The video companion walks through all of it, plus the build, when it lands."
- CTA band: `THE VIDEOS DROP ON YOUTUBE.` + "The chapters are all here already. No email list; subscribing is the notification system."
- Footer fine print: `BHM © '26 · MADE IN PUNE, IN` + "No email walls. No course upsell. If this helped, subscribing is the thank-you."
- 404: `LOST IN THE MIDDLE.` + `← BACK TO THE ROADMAP`

Copy rules: sentence case for body, mono strings stay UPPERCASE, active verbs on every button (`START`, `WATCH`, `SUBSCRIBE`, `RESET`), no emoji anywhere in the UI, no exclamation-mark enthusiasm. Empty and error states give direction, not mood.

---

## 9. SEO & sharing (half the point of per-chapter pages)

- Per-page metadata: chapter `<title>` = `Context Engineering — The Behumoury Roadmap`; description = the chapter `summary`. Home `<title>` = `The Behumoury Roadmap — 12 Chapters to AI Engineer`.
- **OG images generated per page** via `next/og`: Ink background with faint grid lines, mono `CH. 04 / BLOCK 2` in Acid top-left, chapter title in Anton (load the Anton TTF inside the image route — required for Satori), `THE BEHUMOURY ROADMAP · roadmap.behumoury.com` in mono at the bottom. If this fights the agent, fall back to one well-designed static OG image for all pages — but try the generated version first; branded unfurls in WhatsApp/LinkedIn/X are how chapters get shared.
- `sitemap.xml`, `robots.txt`, canonical URL per page.
- JSON-LD: `Course` on the home page (name: "The Behumoury Roadmap", description, `provider` → Person "Yash Bhandari (behumoury)", `isAccessibleForFree: true`, `syllabusSections` from the blocks). Each chapter page: `LearningResource`, plus a `VideoObject` once published.
- Every chapter page must be fully readable in server-rendered HTML — checkboxes hydrate on the client, but the content itself is never JS-gated. This is both an SEO and an accessibility requirement.

---

## 10. Motion (Framer Motion; every animation has a reduced-motion fallback = static end state)

- Spine Acid fill: scaleY from 0 to progress height on first view, 0.9s ease-out.
- Current-node bloom: 3s breathing pulse of the blue-violet halo. Under reduced motion: static glow, no pulse.
- Checkbox: 150ms Acid fill + tick path draw. Progress bars re-tween over 250ms on change.
- Card hover: the lift + offset-shadow move, 120ms.
- Nothing else. No scroll-jacking, no parallax, no scroll-triggered reveals on every section. Restraint reads professional; this is a utility site with one glowing heart.

---

## 11. Tech notes

- **Stack:** Next.js (App Router, TypeScript) + Tailwind CSS + Framer Motion. Deploy: Vercel, project `bhm-roadmap`, domain `roadmap.behumoury.com`.
- **Rendering:** everything statically generated (`generateStaticParams` over the data file). No database, no API routes except the OG image route. The only client components: the progress provider, checkboxes, progress bars, and the spine.
- **Video:** click-to-load facade (lite-youtube-embed or hand-rolled). Never eager-load a YouTube iframe.
- **Analytics:** Vercel Analytics (cookieless) — no consent banner needed since nothing else tracks. Optional; ship without it if in doubt.
- **Performance bar:** Lighthouse ≥ 95 on mobile across the board. LCP should be the hero headline (text, renders instantly), not an image.
- **Repo hygiene (this codebase appears on camera):** `content/roadmap.ts` is the star of the show — the entire curriculum in one typed file. Components small and plainly named: `Spine`, `ChapterCard`, `SyllabusList`, `StatusChip`, `ProgressProvider`, `Sticker`, `GlowNode`. A short README whose headline is: *"Add a chapter = edit one file."*

---

## 12. Placeholders to replace before launch

1. BHM logo SVG asset (supplied separately — same one as the portfolio)
2. YouTube channel URL + series playlist URL
3. The three "already covered" video URLs (§4.6)
4. Prerequisite outbound links (§4.5) — or remove the links and keep plain text
5. Ch. 1 `youtubeId` + status flip on July 19
6. Social links: Instagram, GitHub, portfolio
7. Hero body final wording (headline is locked; only remaining `[EDIT TO TASTE]` markers)

---

## 13. Anti-goals — never do these

- No login, signup, email capture, newsletter modal, or exit-intent popup of any kind. No paywalls, no locked chapters, no "pro" tier — and no stub pages: a chapter without a video is still rendered in full.
- No generic template look: no glassmorphism, no purple-teal gradient cards, no stock icon packs, no emoji in the UI, no cookie-cutter three-column feature grids, no carousels, no testimonial sections.
- No soft shadows, no rounded-everything — corners ≤ 2px, hard offset shadows only.
- No re-typeset logo when the SVG exists. No glow anywhere except the current-chapter node and the footer link echo. No fluorescent overload — §2.1 rules are strict.
- No progress dark patterns: no streaks, no guilt copy, no fake urgency.
- No invented content: if it isn't in the attached MD or this prompt, it doesn't go on the site — no extra chapters, topics, or "bonus resources."

---

## 14. Definition of done

A developer taps a link in a YouTube description on their phone. They land on an Ink hero reading `12 CHAPTERS TO / AI ENGINEER.` with the Acid marquee — `LEARN THE JOB, NOT THE HYPE · BY YASH BHANDARI` — running beneath it, then scroll into a bone-white exposed grid where a metro spine runs through five blocks and twelve chapter cards, every one of them readable in full on day one. Chapter 1's node blooms with a blue-violet neon halo and a `START HERE →` sticker. They open `/rag`, read the complete syllabus, check three topics, and close the tab. A week later they come back: the three topics are still checked, the spine shows an Acid fill, and the glow has moved to their current chapter. Every chapter URL unfurls with a branded OG card. There is no login anywhere on the site. It could not be mistaken for a template — and it is unmistakably a sibling of behumoury.com.