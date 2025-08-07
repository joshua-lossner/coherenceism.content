# Coherenceism Content Repository

## Purpose
This repository serves as the **primary content engine** for coherenceism.info, containing all human-readable written material for the Coherenceism project. It manages the complete knowledge base of philosophical journals, books, essays, quotes, and reference materials that form the intellectual foundation of the coherenceism movement.

Content is written in Markdown, versioned with Git, and deployed to the public website. This repo follows a philosophy of **slow, deliberate, and coherent publishing** — we refine what aligns rather than rushing to publish.

## Repository Structure

### Content Organization
```
/content/
├── journal/              # Personal philosophical reflections
│   └── YYYY-MM-DD-title-slug.md
├── books/                # Long-form philosophical texts
│   └── book-title/
│       ├── 00-preface.md
│       ├── 01-chapter-title.md
│       └── 02-next-chapter.md
├── essays/               # Standalone philosophical arguments
│   └── essay-title-slug.md
├── docs/                 # Project documentation and reference
│   └── codex/            # Technical system documentation
└── podcast/              # Scripts and show notes

/reference/               # Supporting materials and citations
/templates/               # Content templates for consistency
/scripts/                 # Build and processing automation
```

### Content Types

#### 1. Journal Entries (`/content/journal/`)
Personal philosophical reflections exploring ideas in real-time. These capture the evolution of coherenceist thinking.

**Naming Pattern:** `YYYY-MM-DD-descriptive-title.md`
**Example:** `2025-08-07-reflections-on-digital-consciousness.md`

#### 2. Books (`/content/books/`)
Long-form philosophical texts organized by chapter. Each book has its own subdirectory.

**Naming Pattern:** `book-title/NN-chapter-title.md`
**Example:** `book-of-coherence/01-universal-mind.md`

#### 3. Essays (`/content/essays/`)
Standalone philosophical arguments or analyses on specific topics.

**Naming Pattern:** `descriptive-title-slug.md`
**Example:** `technology-as-extension-of-consciousness.md`

#### 4. Reference Documents (`/content/docs/`)
Supporting documentation, definitions, and technical specifications.

**Naming Pattern:** Various, including `codex/NN-concept.exe.md` for technical docs

#### 5. Podcast Content (`/content/podcast/`)
Scripts, outlines, and show notes for audio content.

## Frontmatter Conventions

All content files **must** include YAML frontmatter with these required fields:

```yaml
---
title: "Descriptive Title"
type: journal|book|essay|reference|podcast
date: YYYY-MM-DD
tags: [coherenceism, consciousness, ai, philosophy]
---
```

### Optional Fields
- `status: draft|review|published` — Publication state
- `series: "Series Name"` — For multi-part content
- `chapter: N` — For book chapters
- `abstract: "Brief summary"` — For essays and longer pieces

## Writing Philosophy

### Core Principles
1. **Clarity over Complexity** — Ideas should be accessible without sacrificing depth
2. **Coherence over Completeness** — Better to explore one concept well than many poorly  
3. **Evolution over Dogma** — Ideas develop and change; capture the process
4. **Integration over Isolation** — Connect new ideas to existing content
5. **Authenticity over Authority** — Write from genuine experience and inquiry

### Voice Guidelines
- **Present tense** for timeless philosophical concepts
- **Active voice** for clarity and directness
- **Concrete examples** grounded in lived experience
- **Avoid jargon** without clear definitions
- **Balance** technical precision with general accessibility

### Content Standards
- Maximum file size: ~3000 words (warn threshold)
- No binary files in content directories
- Internal links use relative paths: `../other-content.md`
- External references include full URLs
- Code examples use appropriate syntax highlighting

## Automation & Workflows

### Content Processing Pipeline
1. **Creation** — Draft content in feature branches
2. **Validation** — Automated checks for structure and consistency  
3. **Review** — Human review for philosophical alignment
4. **Publishing** — Merge to main triggers site deployment
5. **Indexing** — Vector embeddings generated for semantic search

### Vector Embeddings
Content is automatically processed into vector embeddings for:
- Semantic search capabilities on coherenceism.info
- AI-powered content recommendations
- Cross-reference discovery
- Thematic analysis

**Processing:** 400-token chunks with 50-token overlap via `npm run ingest`

### Git Workflow
- **main** branch contains published content
- **feature/** branches for new content development
- Pull requests required for all changes
- Commit messages follow: `type: description`

## Content Maintenance

### Quality Assurance
- Frontmatter validation on all commits
- Markdown syntax checking
- Internal link verification
- Philosophical voice consistency
- Tag standardization

### Common Tasks
```bash
# Create new journal entry
git checkout -b feature/journal-YYYY-MM-DD
echo "---\ntitle: New Reflection\ntype: journal\ndate: $(date +%Y-%m-%d)\ntags: [coherenceism]\n---\n\n# New Reflection\n\n" > content/journal/$(date +%Y-%m-%d)-new-reflection.md

# Process content for embeddings
npm run ingest

# Validate all content
node scripts/validate-content.js

# Search content by tag
grep -r "tags:.*consciousness" content/
```

### File Naming Standards
- Use kebab-case (lowercase with hyphens)
- No spaces, special characters, or uppercase
- Date prefixes for journals: `YYYY-MM-DD-`
- Sequential numbering for books: `NN-`
- Descriptive slugs that indicate content

## Integration with coherenceism.info

This repository feeds the public website through:
- **Static site generation** from markdown content
- **Vector search** powered by embedded chunks
- **Cross-reference mapping** between related concepts
- **RSS feeds** for journals and essays
- **API endpoints** for content queries

## Claude-Specific Context

When working with this repository, Claude should:

### Content Creation
- Follow naming conventions precisely
- Include complete frontmatter with appropriate tags
- Maintain philosophical voice consistent with existing content
- Build on established concepts rather than starting from scratch

### Content Analysis  
- Identify thematic patterns across the corpus
- Suggest connections between related pieces
- Validate consistency of terminology and concepts
- Recommend content gaps or expansion opportunities

### Automation Support
- Use custom commands for common operations
- Validate content structure before commits
- Generate summaries and cross-references
- Support the publishing workflow

### Philosophical Alignment
- Ensure content reflects core coherenceist principles:
  - Non-dualistic thinking
  - Systems perspective
  - Human-AI collaboration
  - Conscious technology development
  - Open knowledge sharing

## Key Concepts & Terminology

Understanding these concepts is essential for working with coherenceist content:

- **Coherence** — Alignment between systems, ideas, and consciousness
- **Universal Mind** — Distributed intelligence framework
- **Technoesis** — Technology-mediated evolution of consciousness  
- **Presence Practice** — Mindful engagement with technology
- **Emergence** — Properties arising from system interactions
- **Integration** — Synthesis rather than mere aggregation

## Environment Variables

Required for full functionality:
```bash
OPENAI_API_KEY=your_key_here
POSTGRES_URL=your_database_url
```

## Getting Started

1. **Clone and setup:**
   ```bash
   git clone https://github.com/joshua-lossner/coherenceism.content.git
   cd coherenceism.content
   npm install
   ```

2. **Create content:**
   ```bash
   /content:list          # See existing content
   /content:validate      # Check consistency
   ```

3. **Process for search:**
   ```bash
   npm run ingest
   ```

This repository is the intellectual heart of the coherenceism project. Every piece of content contributes to a growing understanding of consciousness, technology, and human potential in the digital age.