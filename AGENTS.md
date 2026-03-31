# amp-plugin-cc

Claude Code plugin that integrates Amp Code for multi-model review, analysis, and task delegation.

## Commands

| Command | Description |
|---------|-------------|
| `/amp:review` | Code review via Amp's multi-model routing |
| `/amp:adversarial` | Adversarial review challenging design decisions |
| `/amp:rescue` | Delegate complex tasks to Amp's subagent system |
| `/amp:analyze` | Deep analysis via Amp's Oracle mode |
| `/amp:status` | Show active Amp threads |
| `/amp:setup` | Check installation and configure plugin |

## Architecture

- `scripts/amp-companion.mjs` — Main CLI router wrapping `amp -x`
- `agents/amp-coder.md` — Thin wrapper subagent for task delegation
- `hooks/hooks.json` — Session lifecycle and optional review gate

## Prerequisites

- Amp CLI: `npm install -g @sourcegraph/amp@latest`
- Auth: `amp auth login` or set `AMP_API_KEY`
