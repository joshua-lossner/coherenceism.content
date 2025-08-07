# /book - Long-form Content Management  

Commands for managing books, chapters, and extended philosophical works.

## /book:index <book-path> [format]

Generate a table of contents (TOC) from a book directory structure.

**Parameters:**
- `book-path` (required): Path to book directory (e.g., content/books/book-of-coherence)
- `format` (optional): Output format (markdown, json, simple) - default: markdown

**Usage:**
```
/book:index content/books/book-of-coherence
/book:index books/future-work json
/book:index book-of-coherence simple
```

**Process:**
1. **Scan Directory**: Find all .md files with numeric prefixes
2. **Parse Frontmatter**: Extract titles, abstracts, status
3. **Build Structure**: Create hierarchical organization
4. **Generate TOC**: Format according to specified style

**Output (Markdown format):**
```markdown
# Table of Contents: Book of Coherence

## Overview
- **Total Chapters**: 9
- **Status**: 7 published, 2 draft
- **Word Count**: ~45,000 words
- **Last Updated**: 2025-08-07

## Chapters

### Part I: Foundations
1. **[Universal Mind](01-universal-mind.md)** *(published)*
   > Exploring consciousness as a distributed phenomenon across all systems.

2. **[Death, Change, Reality](02-death-change-reality.md)** *(published)*  
   > Understanding transformation as the fundamental nature of existence.

3. **[Coherence as Alignment](03-coherence-as-alignment.md)** *(published)*
   > The principle that guides all coherenceist thinking and practice.

### Part II: Practice  
4. **[Practice of Presence](04-practice-of-presence.md)** *(published)*
   > Methods for conscious engagement with technology and life.

5. **[Ethics and Action](05-ethics-and-action.md)** *(draft)*
   > How coherenceist principles translate into ethical behavior.

[Continue for all chapters...]

## Reading Paths
- **Linear**: Read chapters in order for full philosophical development
- **Practical**: Focus on chapters 4, 5, 6 for implementation guidance  
- **Theoretical**: Emphasize chapters 1, 2, 3, 8 for conceptual framework

## Publication Status
Ready for review: Chapter 5, Chapter 9
Needs revision: None
Complete: Chapters 1-4, 6-8
```

---

## /book:chapter-check <chapter-path> [aspect]

Review a chapter for coherence, voice consistency, and integration with the broader work.

**Parameters:**
- `chapter-path` (required): Path to specific chapter file
- `aspect` (optional): Focus area (coherence, voice, integration, structure, all) - default: all

**Usage:**
```
/book:chapter-check content/books/book-of-coherence/05-ethics-and-action.md
/book:chapter-check books/new-work/03-emergence.md voice
/book:chapter-check chapter-draft.md integration
```

**Review Dimensions:**

### Philosophical Coherence
- Alignment with core coherenceist principles
- Internal logical consistency
- Non-contradictory with other chapters
- Appropriate depth for the topic

### Voice & Tone
- Consistency with established narrative voice
- Appropriate balance of authority and humility
- Accessible language without oversimplification  
- Authentic personal reflection where relevant

### Structural Integration
- Clear connection to preceding chapters
- Proper setup for following content
- Balanced length relative to other chapters
- Effective use of examples and illustrations

### Technical Quality
- Proper chapter numbering and naming
- Complete frontmatter with accurate metadata
- Valid internal cross-references
- Consistent formatting and style

**Output:**
```markdown
# Chapter Review: Ethics and Action

## Summary
**File**: content/books/book-of-coherence/05-ethics-and-action.md
**Status**: Draft - Ready for revision
**Word Count**: 4,200 words
**Review Date**: 2025-08-07

## Coherence Assessment: 8/10

### Strengths
- Strong connection to chapter 3's alignment principles
- Concrete examples ground abstract ethical concepts
- Clear progression from theory to practical application
- Maintains non-dualistic perspective throughout

### Areas for Development  
- Bridge to chapter 4's presence practice could be stronger
- Consider expanding the community ethics section
- Some terminology could be more consistent with earlier chapters

## Voice Consistency: 9/10
- Excellent maintenance of contemplative tone
- Personal anecdotes enhance rather than distract
- Technical concepts explained accessibly
- Authentic philosophical inquiry evident

## Integration Score: 7/10
- References to universal mind (ch. 1) well-integrated
- Could strengthen connections to coherence framework (ch. 3)  
- Sets up community discussion (ch. 6) effectively
- Missing forward reference to technology ethics (ch. 7)

## Recommendations

### High Priority
1. Add explicit connection to chapter 4's presence practices
2. Strengthen the coherence framework integration
3. Include forward reference to technology ethics

### Medium Priority  
1. Expand community ethics subsection
2. Consider additional concrete example in middle section
3. Review terminology for consistency

### Ready for Publication?
**Not yet** - Address high priority items first

## Next Steps
1. Revise for better chapter integration
2. Expand community ethics section
3. Final proofread for terminology consistency
4. Re-review after revisions
```

---

## Implementation Notes

### Book Organization Standards
```
/content/books/book-title/
├── 00-preface.md          # Introduction and overview
├── 01-chapter-one.md      # Numbered chapters
├── 02-chapter-two.md
├── ...
├── 99-afterword.md        # Conclusion
├── appendices/            # Supporting materials
│   ├── A-definitions.md
│   └── B-references.md  
└── _index.json           # Generated metadata
```

### Chapter Frontmatter Template
```yaml
---
title: "Chapter Title"
type: book
book: "Book Title"
chapter: N
date: YYYY-MM-DD
tags: [coherenceism, book-tag, chapter-themes]
status: draft|review|published
abstract: "Brief chapter summary for TOC"
word_count: NNNN
dependencies: [previous-chapter-concepts]
---
```

### Quality Gates for Chapters
1. **Philosophical alignment** with coherenceist principles
2. **Narrative flow** with previous/next chapters
3. **Voice consistency** throughout the work
4. **Appropriate length** (2000-5000 words typically)
5. **Complete frontmatter** with all metadata

### Cross-Reference Management
- Track concept introductions and dependencies
- Maintain glossary of terms across chapters
- Validate internal links between chapters
- Generate reading path recommendations