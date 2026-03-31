---
description: "Delegate complex task to Amp Code's subagent system"
---

# /amp:rescue

Delegate complex tasks (bug investigation, implementation, debugging) to Amp Code. Leverages Amp's subagent parallelization and Multi-Model routing.

## Procedure

1. Forward the user's request to Amp CLI via the `amp-coder` agent
2. Do NOT use the `--dangerously-allow-all` flag (requires user approval)
3. If the Amp result includes code changes, show the diff and ask whether to apply
4. Pass through the original Amp output without summarizing or modifying
