# /content:analyze - Analyze Content Repository

## Description
Perform comprehensive analysis of the content repository to understand themes, patterns, and coherence.

## Usage
```
/content:analyze [scope] [focus]
```

## Parameters
- `scope`: What to analyze (all, journal, essays, books, recent)
- `focus`: Specific aspect (themes, consistency, gaps, statistics)

## Actions
1. **Theme Analysis**
   - Extract recurring concepts and ideas
   - Map relationships between content pieces
   - Identify philosophical evolution over time

2. **Consistency Check**
   - Verify frontmatter completeness
   - Check naming conventions
   - Validate internal references
   - Ensure philosophical alignment

3. **Gap Analysis**
   - Identify missing topics
   - Find incomplete series
   - Suggest content opportunities

4. **Statistics Generation**
   - Word counts by category
   - Publishing frequency
   - Tag usage patterns
   - Content growth trends

## Output Format
```markdown
# Content Analysis Report

## Overview
- Total entries: X
- Date range: YYYY-MM-DD to YYYY-MM-DD
- Primary themes: [list]

## Key Findings
[Detailed analysis results]

## Recommendations
[Suggested actions or content ideas]
```

## Examples
```
/content:analyze all themes
/content:analyze journal consistency
/content:analyze recent gaps
```