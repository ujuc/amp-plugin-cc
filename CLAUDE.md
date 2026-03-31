# amp-plugin-cc

Claude Code plugin that wraps Amp CLI (`amp -x`) for multi-model code review, analysis, and task delegation.

## Prerequisites

- Amp CLI: `npm install -g @sourcegraph/amp@latest`
- Auth: `amp auth login` or set `AMP_API_KEY` env var

## Development Commands

```bash
npm test              # Run tests (node --test)
```

## Key Conventions

- All Amp CLI calls go through `scripts/amp-companion.mjs` — never call `amp` directly from commands or agents
- Use `execFile` / `execFileSync` (not `exec` / `execSync`) to prevent shell injection
- `--dangerously-allow-all` flag is FORBIDDEN unless the user explicitly approves it
- Prompt templates in `prompts/` use `{{INPUT}}` as the substitution marker
- Commands must NEVER auto-apply code changes — always show results and wait for user approval
- Plugin config vars are exposed as `CLAUDE_PLUGIN_OPTION_*` env vars (e.g., `CLAUDE_PLUGIN_OPTION_AMP_API_KEY`)

## Reference

- **[AGENTS.md](./AGENTS.md)** — Commands, architecture, prerequisites
