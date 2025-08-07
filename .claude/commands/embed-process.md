# /embed:process - Process Content for Vector Embeddings

## Description
Generate vector embeddings for content files to enable semantic search and AI-powered analysis.

## Usage
```
/embed:process [target] [options]
```

## Parameters
- `target`: What to process (all, new, specific file, directory)
- `options`: Additional flags (--dry-run, --verbose, --force)

## Actions
1. **Pre-flight Checks**
   - Verify environment variables (.env.local)
   - Test database connection
   - Validate OpenAI API key
   - Check for uncommitted changes

2. **Processing Steps**
   - Identify target files
   - Calculate token counts
   - Generate embeddings in chunks (400 tokens)
   - Store in PostgreSQL database
   - Log processing statistics

3. **Validation**
   - Verify embedding dimensions
   - Check for processing errors
   - Validate chunk overlap
   - Ensure database integrity

## Safety Features
- Automatic backup before bulk operations
- Rate limiting for API calls
- Transaction rollback on errors
- Progress tracking and resume capability

## Output
```
Processing content for embeddings...
✓ Environment validated
✓ Database connected
✓ Processing 15 files

[content/journal/2025-08-06-who-am-i.md]
  - Chunks: 3
  - Tokens: 892
  - Status: ✓ Complete

Summary:
- Files processed: 15
- Total chunks: 47
- Total tokens: 18,234
- Time elapsed: 2m 34s
```

## Examples
```
/embed:process all
/embed:process content/journal/
/embed:process new --dry-run
/embed:process content/essays/specific-essay.md --force
```

## Troubleshooting Commands
```
/embed:process --check-env     # Verify environment setup
/embed:process --test-single   # Process one file as test
/embed:process --clear-cache   # Clear failed processing records
```