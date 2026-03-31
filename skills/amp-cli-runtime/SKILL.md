---
description: "Amp CLI non-interactive execution wrapper"
---

# Amp CLI Runtime

Wrapper for running Amp CLI non-interactively.

## CLI Usage

### Non-interactive execution
```bash
amp -x '<prompt>'
```

### Structured JSON output
```bash
amp -x '<prompt>' --stream-json
```

### JSON input
```bash
echo '{"prompt": "..."}' | amp -x --stream-json-input
```

### Continue a thread
```bash
amp threads continue <thread-id> -x '<prompt>'
```

## Environment Variables

- `AMP_API_KEY`: API key (optional, alternative to `amp auth login`)
- `AMP_MODEL_MODE`: Model mode (smart, free, oracle)

## Cautions

- `--dangerously-allow-all` flag is FORBIDDEN without explicit user approval
- Default timeout: 120 seconds (extend for complex tasks)
- `--stream-json` output is line-delimited JSON events
