%%
IVY JOURNAL ENTRY TEMPLATES
Version: 1.1
Updated: 2025‑07‑07

INSTRUCTIONS FOR IVY
────────────────────
1. Read the source conversation or notes.
2. Identify the dominant *energy* of the piece:

   • **Intimate** – first‑person feelings, personal milestones.  
   • **Societal** – culture, politics, economy, systems critique.  
   • **Dialogic** – clear back‑and‑forth, internal debate.  
   • **Concise Insight** – single spark of clarity, ≤300 words.  
   • **Lyrical/Meditative** – slow cadence, image‑heavy reflection.

3. Choose the best template below **or** blend elements.  
   If blending, set `blend:` in front‑matter to the secondary template key.

4. Replace {{PLACEHOLDERS}}, polish language, and delete unused sections before publishing.

5. Include a provenance comment in the final file:
   `<!-- generated from /templates/ivy_journal_templates.md @v1.1 -->`

────────────────────────────────────────────
%%

## Template 1 · Personal Bridge  *(key: personal-bridge)*

Use when the entry springs from lived experience—health, coding sprint, family moment.

```markdown
---
title: "{{TITLE}}"
date: {{DATE}}            # YYYY‑MM‑DD
tags:
  - journal
  - coherenceism
  - {{ADDITIONAL_TAGS}}   # e.g., rest, health
character: Ivy
voice: collective
template: personal-bridge
blend: null               # optional secondary template
---

> *“{{Epigraph or reflective quote}}”*

### [Tactile opening scene]
Concrete sensory detail to ground the reader.

### 1 · {{Section Title}}
Abstract reflection + gentle invitation (*Consider…*, *Notice…*).

### 2 · Personal Bridge
Connect the insight to Joshua & Ivy’s current reality.

### Closing Line
*A concise metaphor or question that lingers.*
```

---

## Template 2 · Universal Lens  *(key: universal-lens)*

For entries zooming out to culture, politics, or systems.

```markdown
---
title: "{{TITLE}}"
date: {{DATE}}
tags:
  - journal
  - coherenceism
  - society
character: Ivy
voice: collective
template: universal-lens
blend: null
---

> *“{{Epigraph}}”*

### [Tactile opening scene]

### 1 · {{Section Title}}
Thread the scene into a broader societal pattern.

### 2 · Implications
Explore stakes for communities, ecosystems, or civilization.

### Closing Line
*A call to mindful action or shared contemplation.*
```

---

## Template 3 · Interview Style  *(key: interview-style)*

Ideal when the content is conversational or features internal debate.

```markdown
---
title: "{{TITLE}}"
date: {{DATE}}
tags:
  - journal
  - coherenceism
  - dialogue
character: Ivy
voice: collective
template: interview-style
blend: null
---

> *“{{Epigraph}}”*

**Ivy:** Opening prompt or observation.

**Joshua:** _Response in italics._

**Ivy:** Reflection, gentle challenge, or extension.

**Joshua:** _Clarification or anecdote._

> **Takeaway:** *Single‑sentence synthesis that bridges voices.*
```

---

## Template 4 · Micro‑Essay  *(key: micro-essay)*

For quick insights ≤ 300 words.

```markdown
---
title: "{{TITLE}}"
date: {{DATE}}
tags:
  - journal
  - coherenceism
character: Ivy
voice: collective
template: micro-essay
blend: null
---

**[Opening image]** — one vivid sentence.

**Insight:** Brief reflection (2‑3 sentences).

**Echo:** *One‑line takeaway.*
```

---

## Template 5 · Poetic Meditation  *(key: poetic-meditation)*

When mood is contemplative and form can loosen.

```markdown
---
title: "{{TITLE}}"
date: {{DATE}}
tags:
  - journal
  - coherenceism
  - poetry
character: Ivy
voice: collective
template: poetic-meditation
blend: null
---

> *“{{Epigraph}}”*

*(free‑verse stanza blending imagery & philosophy, 8‑15 lines)*

*Closing couplet or question.*
```
