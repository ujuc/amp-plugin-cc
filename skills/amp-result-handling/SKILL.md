---
description: "Protocol for handling and presenting Amp results"
---

# Amp Result Handling

Protocol for processing and displaying Amp CLI execution results.

## Processing Flow

1. Extract assistant messages from `--stream-json` event stream
2. Validate with `schemas/review-output.schema.json` (for review commands)
3. Sort findings by severity
4. Render as markdown

## Review Result Display Rules

- verdict: approve -> PASS, needs-attention -> WARNING
- severity: critical -> RED, high -> ORANGE, medium -> YELLOW, low -> BLUE
- Each finding includes file, line range, recommendation
- Code fix suggestions are displayed only — never auto-applied

## Error Handling

- Amp CLI not installed: guide to `/amp:setup`
- Auth expired: guide to `amp auth login`
- Timeout: suggest extending timeout based on task complexity
- Network error: suggest retry or report offline status
