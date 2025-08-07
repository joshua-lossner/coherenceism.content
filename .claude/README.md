# Claude Code Integration

This directory contains Claude Code optimizations and custom commands for the Coherenceism content repository.

## Quick Start

1. **Initialize Claude Context**
   ```bash
   # Claude will automatically read CLAUDE.md for project context
   claude
   ```

2. **Common Commands**
   - `/content:new [type] [title]` - Create new content
   - `/content:analyze` - Analyze repository patterns
   - `/embed:process` - Generate vector embeddings
   - `/publish:flow` - Manage publishing workflow
   - `/philosophy:check` - Verify philosophical alignment

## Directory Structure

```
.claude/
├── commands/           # Custom slash commands
│   ├── content-new.md
│   ├── content-analyze.md
│   ├── embed-process.md
│   ├── publish-flow.md
│   └── philosophy-check.md
├── templates/          # Content templates
└── hooks/             # Automation hooks
```

## Command Categories

### Content Management
- Creating new content with proper structure
- Analyzing existing content patterns
- Managing content lifecycle

### Technical Operations
- Vector embedding generation
- Database synchronization
- Build and deployment

### Quality Assurance
- Philosophical coherence checking
- Style and tone consistency
- Cross-reference validation

## Best Practices

1. **Always work in feature branches**
   - Create: `git checkout -b feature/description`
   - Never push directly to main

2. **Use semantic commit messages**
   - `content: Add journal entry on digital consciousness`
   - `fix: Correct frontmatter in essay collection`
   - `enhance: Improve codex documentation structure`

3. **Maintain philosophical voice**
   - Review with `/philosophy:check` before publishing
   - Ensure alignment with core principles
   - Build on existing concepts

## Integration with Claude Agents

Claude agents working in this repository should:
1. Read CLAUDE.md for full context
2. Use custom commands for common tasks
3. Maintain consistent file naming
4. Follow the branching strategy
5. Respect the philosophical framework

## Troubleshooting

### Common Issues
- **Command not found**: Ensure you're in the project root
- **Database errors**: Check .env.local configuration
- **API limits**: Implement rate limiting for embeddings
- **Merge conflicts**: Keep feature branches short-lived

### Getting Help
- Check CLAUDE.md for detailed context
- Review command documentation in commands/
- Consult AGENTS.md for collaboration guidelines

## Future Enhancements

Planned improvements:
- Automated content suggestions
- Cross-reference graph generation
- Translation workflow support
- Multimedia content handling
- Advanced semantic search

---

*This integration is optimized for Claude Code v1.0+*