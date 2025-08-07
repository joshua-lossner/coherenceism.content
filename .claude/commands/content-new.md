# /content:new - Create New Content

## Description
Create a new content file with proper structure and frontmatter for the Coherenceism project.

## Usage
```
/content:new [type] [title]
```

## Parameters
- `type`: The content type (journal, essay, book, codex, reference)
- `title`: The title of the content piece

## Actions
1. Determine appropriate directory based on type
2. Generate filename following conventions:
   - Journal: `YYYY-MM-DD-title-slug.md`
   - Essay: `title-slug.md`
   - Book: Next chapter number in sequence
   - Codex: `NN-title.exe.md` or `.sys.md`
3. Create file with proper frontmatter template
4. Open file for editing
5. Create feature branch if not already on one

## Template
```yaml
---
title: [Title]
type: [type]
date: [current date]
tags: [coherenceism, appropriate tags]
status: draft
---

# [Title]

[Content begins here]
```

## Example
```
/content:new journal "Reflections on Digital Consciousness"
```

Creates: `content/journal/2025-08-07-reflections-on-digital-consciousness.md`