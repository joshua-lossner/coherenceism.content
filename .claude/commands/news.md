# /news - Publishing Automation

Commands for generating, reviewing, and publishing news content and synthesis pieces.

## /news:generate [period] [topic]

Generate a news/synthesis entry based on recent content and external developments.

**Parameters:**
- `period` (optional): Time range to synthesize (daily, weekly, monthly) - default: weekly  
- `topic` (optional): Focus area (ai-developments, philosophy, community, all) - default: all

**Usage:**
```
/news:generate
/news:generate daily ai-developments
/news:generate weekly philosophy
/news:generate monthly
```

**Process:**
1. **Content Analysis**: Review recent journal entries, essays, and external references
2. **Theme Extraction**: Identify key themes and developments 
3. **Synthesis Creation**: Generate coherent narrative connecting ideas
4. **Draft Generation**: Create news entry with proper frontmatter

**Output Template:**
```markdown
---
title: "Weekly Synthesis: [Date Range]"
type: news
date: [YYYY-MM-DD]
tags: [coherenceism, synthesis, [topic-tags]]
period: [daily/weekly/monthly]
sources: [list of analyzed content]
---

# Weekly Synthesis: [Date Range]

## Key Developments
[2-3 major themes or developments]

## Connections & Patterns
[How recent content relates to broader coherenceist themes]

## Looking Forward
[Implications and questions emerging]

## Content Highlights
- [Recent journal entry]: [Key insight]
- [Recent essay]: [Main argument]
- [External development]: [Relevance to coherenceism]

---
*This synthesis was generated from content created [date range]*
```

---

## /news:publish [draft-path]

Move a news entry from draft to published status and prepare for deployment.

**Parameters:**
- `draft-path` (required): Path to the draft news entry file

**Usage:**
```
/news:publish content/news/drafts/2025-08-07-weekly-synthesis.md
/news:publish drafts/monthly-synthesis.md
```

**Process:**
1. **Final Validation**: Check frontmatter, links, and formatting
2. **Status Update**: Change status from 'draft' to 'published'
3. **File Movement**: Move from drafts/ to published/ directory  
4. **Metadata Update**: Add publication timestamp
5. **Cross-Reference**: Update any referring content
6. **Commit Preparation**: Stage for git commit with appropriate message

---

## /news:review [draft-path] [focus]

Claude reviews a news draft for flow, tone, and coherence with the broader philosophical framework.

**Parameters:**
- `draft-path` (required): Path to the draft to review
- `focus` (optional): Review aspect (tone, flow, accuracy, coherence) - default: all

**Usage:**
```
/news:review content/news/drafts/synthesis.md
/news:review drafts/weekly-update.md tone
/news:review my-draft.md coherence
```

**Review Criteria:**

### Philosophical Alignment
- Maintains coherenceist perspective
- Avoids binary thinking
- Emphasizes emergence and integration
- Respects complexity and nuance

### Voice Consistency  
- Contemplative yet accessible tone
- Present tense for timeless concepts
- Concrete examples where appropriate
- Authentic rather than authoritative

### Structural Flow
- Clear narrative progression
- Logical connections between sections
- Appropriate balance of analysis and synthesis
- Engaging introduction and meaningful conclusion

### Technical Quality
- Proper frontmatter and metadata
- Valid internal and external links
- Consistent formatting and style
- Appropriate length and scope

**Output:**
```markdown
# Review Report: [filename]

## Overall Assessment
Score: 8/10 | Status: Ready with minor revisions

## Strengths
- Strong thematic coherence
- Clear connections to recent content
- Authentic philosophical voice

## Suggestions for Improvement
- Consider expanding the "Looking Forward" section
- Add one more concrete example in the connections section
- Minor grammatical adjustments in paragraph 3

## Philosophical Alignment
✅ Non-dualistic perspective maintained
✅ Systems thinking evident  
⚠️  Could emphasize emergence more explicitly

## Next Steps
1. Address suggested improvements
2. Final proofread for clarity
3. Ready for publishing workflow
```

---

## Implementation Notes

### News Directory Structure
```
/content/news/
├── drafts/           # Work-in-progress synthesis pieces
├── published/        # Final news entries  
└── templates/        # Templates for different periods/topics
```

### Automation Considerations
- **Content Source Tracking**: Maintain references to analyzed content
- **Publication Scheduling**: Support for scheduled publication dates
- **Cross-Platform Integration**: Consider coherenceism.info deployment
- **Archive Management**: Organize published news by date/topic

### Quality Gates
All news content should pass:
1. Frontmatter validation
2. Coherenceist philosophy alignment check  
3. Links and references verification
4. Tone and voice consistency review
5. Length and scope appropriateness