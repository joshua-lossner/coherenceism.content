# /content - General Content Operations

Commands for managing and analyzing content across the coherenceism repository.

## /content:list [type] [limit]

List all content entries, optionally filtered by type and limited in quantity.

**Parameters:**
- `type` (optional): Filter by content type (journal, book, essay, reference, podcast)
- `limit` (optional): Maximum number of entries to show (default: 50)

**Usage:**
```
/content:list
/content:list journal
/content:list journal 10
/content:list essay
```

**Output:**
Lists content files with dates, titles, and basic metadata in chronological order (newest first for journals, sequential for books).

---

## /content:tagged <tag> [limit]

Find all content entries that include a specific tag.

**Parameters:**
- `tag` (required): Tag to search for (e.g., consciousness, ai, philosophy)
- `limit` (optional): Maximum number of results (default: 25)

**Usage:**
```
/content:tagged consciousness
/content:tagged ai 15
/content:tagged philosophy
```

**Output:**
Shows matching entries with file paths, titles, dates, and all associated tags.

---

## /content:validate [path]

Check content for frontmatter consistency, naming conventions, and structural integrity.

**Parameters:**
- `path` (optional): Specific file or directory to validate (default: all content)

**Usage:**
```
/content:validate
/content:validate content/journal/
/content:validate content/journal/2025-08-07-who-am-i.md
```

**Validation Checks:**
- Required frontmatter fields (title, type, date, tags)
- File naming conventions match content type
- No binary files in content directories
- Internal links are valid
- Dates in frontmatter match filename dates
- Tags follow standardized vocabulary

**Output:**
Summary report showing:
- ✅ Valid files
- ❌ Files with errors
- ⚠️ Files with warnings
- 📊 Overall statistics

---

## Implementation Notes

These commands should:

1. **Parse frontmatter** using standard YAML parsing
2. **Respect file patterns** defined in CLAUDE.md
3. **Handle errors gracefully** for malformed files
4. **Provide actionable feedback** for validation issues
5. **Support filtering and sorting** for large content collections

**Example validation output:**
```
📊 Content Validation Report

✅ Valid Files: 47
❌ Errors: 2
⚠️  Warnings: 3

Errors:
- content/journal/2025-07-30-gpt-5.md: Missing 'tags' field
- content/essays/new-essay.md: Filename doesn't match pattern

Warnings:
- content/journal/2025-08-01-long-reflection.md: File exceeds 3000 words
- content/books/book-of-coherence/03-coherence-as-alignment.md: No internal links found
- content/journal/2025-07-15-thoughts.md: Generic title, consider more specific
```