# Intent Architecture

This is a clean, practical sketch of prompt infrastructure for your world—something you can reuse, version, and grow.

---

## 1) The Layers (think “stack”)

**Intent Spec (Why):** single-paragraph outcome + success criteria.  
**Domain Context (What):** the truths, constraints, definitions (Coherenceism canon, tone rules).  
**Data Inputs (With What):** sources (RAG folders, URLs, transcripts), freshness window, trust policy.  
**Actors (Who):** roles/agents and their contracts (skills, boundaries, handoffs).  
**Tools (How):** allowed functions/APIs, rate/latency budgets, failure modes.  
**Workflow (When/Order):** stages, gates, retries, escalation rules.  
**Output Contracts (Done looks like):** schema, format, front-matter, length, citation rules.  
**QA & Feedback (Improve):** automated checks + human review loop, version notes.

---

## 2) Reusable Templates

### A. Intent Spec (drop-in preface for any prompt)
```
# Intent
Produce: <artifact> that <outcome>.
Audience: <who>.
Success looks like: <3 crisp bullets>.
Non-goals: <what to avoid>.
Deadline: <soft>.
```

### B. Domain Context (portable block)
```
# Domain Context
Principles: <bullet list of Coherenceism rules>.
Voice: calm, precise, non-syrupy; avoid slogans.
Definitions: <key terms>.
Red lines: <things to never do>.
```

### C. Data Inputs (RAG-aware)
```
# Data Inputs
Sources:
- local:/content/journals (md)
- local:/content/books (md)
Freshness: prefer last 60 days when available.
Truth policy: if conflict, cite both; mark uncertainty.
```

### D. Agent Contract (for a role or sub-prompt)
```
# Agent: Researcher
Goal: Gather facts, contrasts, citations.
Scope: public info + provided RAG only.
Deliverable: 10-bullet brief + source list (5–10 items).
Must: include at least 2 opposing viewpoints if relevant.
```

### E. Output Contract (machine-checkable)
```yaml
# Output Contract (YAML front-matter + body)
---
title: "<auto or provided>"
slug: "<kebab-case>"
published: true
type: "journal" # or "book_chapter" | "report"
tags: ["coherenceism","ai"]
sources: [] # filled by pipeline
summary: ""
word_count_target: 1200
---
# Body starts here (Markdown only)
```

### F. QA Gate (self-check before “done”)
```
# QA Gate
- [ ] Meets Intent success bullets.
- [ ] Cites 3–8 high-quality sources.
- [ ] No weasel words (“maybe,” “just”) unless quoted.
- [ ] Complies with Output Contract schema.
- [ ] Adds a 2–3 sentence “Why it matters.”
```

---

## 3) Three Workflows (ready-to-run patterns)

### 1) Daily News Brief (agentic, timed)

**Stages**
1. Scout (Researcher): fetch 5–8 items aligned to “tech/AI/society; Iowa-local optional.”  
2. Sift (Analyst): cluster, pick 3 most consequential; frame tensions.  
3. Synthesize (Writer): produce 700–900 word brief with YAML front-matter (published:false by default).  
4. Verify (QA): run QA Gate; flip published:true if clean.

**Seed Prompt (for Orchestrator)**
```
Use the stack:
- Intent: a daily brief that helps a thoughtful reader decide what to pay attention to in 5 minutes.
- Actors: Researcher → Analyst → Writer → QA.
- Data: web + RAG:/content/research.
- Output: YAML front-matter + Markdown body; include 5–7 links in sources.
Run the pipeline; stop if QA fails and return remediation notes.
```

---

### 2) Journal-from-Conversation (what we’re doing now)

**Stages**
1. Extract: pull key claims, metaphors, tensions from chat.  
2. Arrange: outline with 3 sections + closing turn.  
3. Compose: 1,000–1,300 words, reflective voice, not preachy.  
4. Tighten: compression pass; add 2 pull-quotes.

**Extract Prompt (drop-in)**
```
From the transcript, list:
- Core thesis (1–2 lines)
- 3 tensions we held
- 5 concrete takeaways
- 2 phrases worth keeping verbatim
```

---

### 3) Code/RAG Maintenance (your “stacking wins” lane)

**Stages**
1. Diff Read: describe exactly what changed (db schema, embeddings, indexes).  
2. Migration Plan: reversible steps; verify embeddings dtype/index match.  
3. Health Check: seed queries; compare top-k before/after.  
4. Doc & PR: generate PR title/body + risk notes.

**Output Contract Snip**
```yaml
---
type: "tech_note"
title: "RAG: index & dtype migration"
published: false
risk_level: "medium"
checklist:
  - migrations_applied: false
  - backfill_complete: false
  - eval_baseline_captured: false
---
```

---

## 4) Prompt Packs (versioned, composable)

Organize in `/prompts` with small files you can mix & match:
```
/prompts/
  00-intent.md
  10-domain-context.md
  20-data-inputs.md
  30-actors/
    researcher.md
    analyst.md
    writer.md
    qa.md
  40-output-contracts/
    journal.md
    news_brief.md
    tech_note.md
  50-gates/
    qa.md
```

Each “run” concatenates: intent + domain + data + actors + output + gate (+ task-specific steps).

---

## 5) Governance & Drift Control

- Versioning: treat prompts like code; commit with semantic messages (`feat(prompt): add QA gate for sources >=5`).  
- A/B by runbooks: keep two variants of the same workflow; measure “edit distance to publish.”  
- Drift alarms: if QA failure rate > X% or citations < N, halt publish; open an issue with artifacts.

---

## 6) Minimal Kickoff Prompts (copy/paste)

**Orchestrator (universal header)**
```
You are the orchestrator. Assemble the stack from provided sections.
Refuse to proceed if any section is missing: Intent, Domain, Data, Actors, Output.
At each stage, emit artifacts to a scratch buffer; pass only the necessary slice forward.
If QA fails, stop and return a remediation plan with concrete diffs.
```

**Human Hand-off Cue**
```
If confidence < 0.7 OR sources < 3 OR novelty_score < 0.3:
→ Request human review with a 5-bullet “What I need from you.”
```

---

## 7) How This Lands for You Today

- You already think in systems—that’s the unfair advantage.  
- Wrap that thinking in small, composable prompt blocks.  
- Treat them like infra: version, test, roll forward/back.  
- The “vibe coder” still ships; the architect ships reliably.
