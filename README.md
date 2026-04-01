# amp-plugin-cc

Claude Code plugin that integrates [Amp Code](https://ampcode.com) for multi-model code review, analysis, and task delegation.

## Features

- **Multi-Model Routing** — Amp automatically selects the optimal LLM per task
- **Code Review** — Structured review with severity-ranked findings
- **Adversarial Review** — Challenges design decisions and assumptions
- **Deep Analysis** — Deep analysis via Amp's Deep mode
- **Task Delegation** — Delegate complex tasks to Amp's subagent system
- **Review Gate** — Optional pre-session-end review hook

## Prerequisites

- Node.js 18.18+
- Claude Code installed and authenticated
- Amp CLI: `npm install -g @sourcegraph/amp@latest`
- Amp auth: `amp auth login` or set `AMP_API_KEY`

## Installation

```bash
# Local install
cp -r amp-plugin-cc ~/.claude/plugins/

# Or from marketplace (after registration)
/plugin install amp-plugin-cc
```

## Commands

| Command | Description |
|---------|-------------|
| `/amp:review` | Code review via Amp's multi-model routing |
| `/amp:adversarial` | Adversarial review challenging design decisions |
| `/amp:rescue` | Delegate complex tasks to Amp's subagent system |
| `/amp:analyze` | Deep analysis via Amp's Deep mode |
| `/amp:status` | Show active Amp threads |
| `/amp:setup` | Check installation and configure plugin |

## Configuration

Set via Claude Code plugin config:

| Option | Description | Default |
|--------|-------------|---------|
| `AMP_API_KEY` | Amp API key (optional if logged in) | — |
| `DEFAULT_MODEL_MODE` | Model mode: `deep`, `free`, `large`, `rush`, `smart` | `free` |
| `REVIEW_GATE` | Enable review gate before session end | `false` |

## Quick Start

```bash
claude

> /amp:setup          # Check installation
> /amp:review         # Review current changes
> /amp:adversarial    # Adversarial review
> /amp:rescue fix bug # Delegate task to Amp
> /amp:analyze        # Deep analysis
> /amp:status         # Show Amp threads
```

## Development

```bash
npm test    # Run tests
```

## License

MIT
