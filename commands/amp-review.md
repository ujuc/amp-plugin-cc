---
description: "Run code review using Amp Code's multi-model routing"
---

# /amp:review

Run code review on current changes via Amp Code. Amp's Multi-Model routing automatically selects the optimal model for review.

## Procedure

1. Run `${CLAUDE_PLUGIN_ROOT}/scripts/amp-companion.mjs review` script
2. Collect git diff and include in the review prompt
3. Sort findings by severity and display them
4. **Do NOT modify code until the user explicitly requests it**
5. Validate result JSON against `schemas/review-output.schema.json`
