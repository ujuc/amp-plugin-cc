---
description: "Guide for Amp's multi-model routing selection"
---

# Amp Model Routing

Guide for leveraging Amp's Multi-Model routing to select optimal models per task.

## Model Modes

| Mode | Characteristics | Suitable Tasks |
|------|----------------|----------------|
| Deep | Highest capability, thorough analysis | Architecture analysis, security audit |
| Smart | Auto-routing, cost-optimized | General review, coding |
| Free | Free models only | Simple tasks, formatting |
| Large | Extended context window | Large file analysis, codebase-wide review |
| Rush | Fast execution, lower cost | Quick checks, formatting |

## Recommended Mode per Command

- `/amp:review` -> Smart (automatic)
- `/amp:adversarial` -> Smart or Deep
- `/amp:analyze` -> Deep
- `/amp:rescue` -> Smart (automatic, subagents choose individually)

## Librarian Usage

Use Amp's Librarian feature for cross-repo search:
- Dependency analysis
- Similar code pattern search
- API usage lookup
