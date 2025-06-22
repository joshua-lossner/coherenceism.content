# Coherenceism Content Repository

This repository contains all written content for the Coherenceism project—philosophy, books, journal entries, podcast scripts, and more. It serves as the *source of truth* for what eventually gets published to [coherenceism.info](https://coherenceism.info) and related channels.

---

## 🌱 Purpose

This repo exists to manage content as code—written in Markdown, versioned with Git, and deployed via static site generation. It supports a philosophy of slow, deliberate, and coherent publishing.

---

## 🛠️ Branching Strategy

We use branches to manage the **state of content**, instead of metadata like `status: draft`.

- **`main`** — ✅ *Published content only*. This branch is deployed to the live site.
- **`test`** — 🟡 *Preview and reviewed drafts*. Used for staging and testing.
- **`feature/*`** — ✍️ *Work-in-progress branches* for new journal entries, essays, or book chapters.

### Example Flow

1. Create a branch: `feature/essay-systems-before-symptoms`
2. Write/edit content in Markdown
3. Open a Pull Request to `test`
4. Once reviewed, merge into `test`
5. After staging site looks good, merge `test → main` to publish

---

## 📁 Folder Structure

```
/content
  /journal         # Personal reflections, dated logs
  /essays          # Short- and long-form philosophical essays
  /books
    /echoes-of-a-future  # Chapters and fragments of the sci-fi novel
  /docs            # Project documentation (e.g. ETHICS.md, GOVERNANCE.md)
  /podcast         # Scripts, outlines, and show notes
```

All files are written in Markdown and should include appropriate frontmatter (if needed for site metadata). Content is automatically rendered based on the directory—no need for manual filtering logic or status flags.

---

## 🧪 Contributions & Automation

Eventually, this repo will integrate with:
- Codex agents for content suggestions, grammar/style review
- GitHub Actions for preview builds
- Static publishing via coherenceism.info

For now, we keep it simple: write clearly, commit intentionally, and let coherence guide the flow.

---

## 🧭 Philosophy

> We do not rush to publish.  
> We refine what aligns.  
> Coherence is the threshold for release.
