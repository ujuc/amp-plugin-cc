---
name: issue-to-fix
description: "Bug fix pipeline: user reports a problem → GitHub issue creation → codebase analysis & fix planning → code implementation → test verification. Trigger when the user reports a bug, describes a problem to fix, says 'fix this', 'issue', 'bug', or wants to register and resolve a problem end-to-end."
---

# Issue-to-Fix Pipeline

Orchestrate the full bug fix lifecycle: issue registration → planning → implementation → verification.

## Prerequisites

- `gh` CLI authenticated (`gh auth status`)
- Repository: `ujuc/amp-plugin-cc`

## Pipeline Phases

### Phase 0 — Workspace Setup

Create `_workspace/` directory in the project root for intermediate artifacts.

```
_workspace/
├── 01_issue-creator_issue.json
├── 02_fix-planner_plan.md
├── 03_fix-implementer_changes.md
└── 04_fix-verifier_report.md
```

### Phase 1 — Issue Creation

Dispatch `issue-creator` agent with the user's problem description.

```
Agent(
  name: "issue-creator",
  prompt: "Read .claude/agents/issue-creator.md for your role.
    Create _workspace/ directory first.
    Problem: <user's problem description>
    Write output to _workspace/01_issue-creator_issue.json",
  model: "opus"
)
```

**Gate:** Confirm issue was created (output file has `number` and `url` fields). Show the issue URL to the user before proceeding.

### Phase 2 — Fix Planning

Dispatch `fix-planner` agent to analyze the issue and codebase.

```
Agent(
  name: "fix-planner",
  prompt: "Read .claude/agents/fix-planner.md for your role.
    Read _workspace/01_issue-creator_issue.json for the issue.
    Analyze the codebase and write your plan to _workspace/02_fix-planner_plan.md",
  model: "opus"
)
```

**Gate:** Read the plan and present a summary to the user. Wait for user approval before Phase 3.

### Phase 3 — Implementation

Dispatch `fix-implementer` agent to execute the approved plan.

```
Agent(
  name: "fix-implementer",
  prompt: "Read .claude/agents/fix-implementer.md for your role.
    Read _workspace/02_fix-planner_plan.md for the plan.
    Implement changes and write report to _workspace/03_fix-implementer_changes.md",
  model: "opus"
)
```

**Gate:** Confirm changes were made (output file exists and lists changes).

### Phase 4 — Verification

Dispatch `fix-verifier` agent to run tests and validate.

```
Agent(
  name: "fix-verifier",
  prompt: "Read .claude/agents/fix-verifier.md for your role.
    Read all _workspace/ files for context.
    Run tests, validate the fix, and write report to _workspace/04_fix-verifier_report.md",
  model: "opus"
)
```

**Gate:** Read the verification report. If verdict is FAIL, report to user and ask whether to re-plan or stop.

### Phase 5 — Completion

1. Read `_workspace/04_fix-verifier_report.md`
2. Present final summary to the user:
   - Issue URL
   - Changes made
   - Test results
   - Verdict
3. If PASS, ask the user if they want to commit and push
4. Preserve `_workspace/` for audit trail

## Error Handling

| Error | Action |
|-------|--------|
| `gh` not authenticated | Print `gh auth login` instruction, stop |
| Issue creation fails | Retry once, then stop with error |
| Planner cannot find root cause | Present hypotheses to user, ask for guidance |
| Implementation deviates from plan | Note in report, continue |
| Tests fail | Report FAIL, ask user whether to re-plan |
| Any agent crashes | Capture error, report to user, stop pipeline |

## Retry Policy

- Phase 4 FAIL → ask user: re-plan (back to Phase 2) or stop
- Maximum 1 retry loop (Phase 2 → 3 → 4)
- After retry FAIL, stop and report

## Test Scenarios

### Normal Flow
1. User: "stop-review-gate-hook.mjs에서 review gate가 비활성화되어도 에러가 나"
2. Phase 1: Issue #N created
3. Phase 2: Plan identifies wrong conditional check
4. Phase 3: Fix applied to `scripts/stop-review-gate-hook.mjs`
5. Phase 4: `npm test` passes, verdict PASS

### Error Flow
1. User: "amp-companion에서 타임아웃이 안 먹어"
2. Phase 1: Issue #N created
3. Phase 2: Plan identifies timeout not forwarded to execFile
4. Phase 3: Fix applied
5. Phase 4: Tests FAIL (new test case fails)
6. Ask user → re-plan → Phase 2-3-4 retry → PASS
