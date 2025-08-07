# /publish:flow - Publishing Workflow Management

## Description
Manage the complete publishing workflow from draft to live site deployment.

## Usage
```
/publish:flow [action] [target]
```

## Parameters
- `action`: Workflow step (prepare, review, merge, deploy)
- `target`: Content to publish (current-branch, specific-file, batch)

## Workflow Stages

### 1. Prepare
```
/publish:flow prepare
```
- Validate all frontmatter
- Check for broken links
- Ensure coherent philosophical voice
- Generate preview links
- Create pull request

### 2. Review
```
/publish:flow review
```
- List pending content
- Show diff from main
- Check style consistency
- Validate against philosophy principles
- Generate review checklist

### 3. Merge
```
/publish:flow merge
```
- Merge feature branch to main
- Update vector embeddings
- Trigger site build
- Clean up feature branch

### 4. Deploy
```
/publish:flow deploy
```
- Verify build success
- Check live site update
- Validate search index
- Monitor for issues

## Checklist Template
```markdown
## Publishing Checklist

### Content Quality
- [ ] Philosophical alignment verified
- [ ] Grammar and spelling checked
- [ ] Frontmatter complete and valid
- [ ] Internal references working
- [ ] Tags appropriate and consistent

### Technical Requirements
- [ ] File naming convention followed
- [ ] Markdown formatting valid
- [ ] No large files (>100KB)
- [ ] Vector embeddings generated
- [ ] Git history clean

### Philosophy Alignment
- [ ] Maintains coherentist perspective
- [ ] Consistent with existing content
- [ ] Adds value to the corpus
- [ ] Accessible to target audience
```

## Examples
```
/publish:flow prepare feature/new-essay
/publish:flow review
/publish:flow merge --auto-cleanup
/publish:flow deploy --verify
```

## Automation Hooks
- Pre-commit: Validation checks
- Pre-merge: Full review process
- Post-merge: Embedding generation
- Post-deploy: Site verification