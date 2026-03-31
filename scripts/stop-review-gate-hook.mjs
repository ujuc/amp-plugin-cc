#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { runAmp } from './amp-companion.mjs';

const reviewGate = process.env.CLAUDE_PLUGIN_OPTION_REVIEW_GATE;
if (reviewGate !== 'true') {
  console.log(JSON.stringify({ decision: 'approve' }));
  process.exit(0);
}

const diff = execFileSync('git', ['diff', '--stat'], { encoding: 'utf-8' });

if (!diff.trim()) {
  console.log(JSON.stringify({ decision: 'approve' }));
  process.exit(0);
}

const result = await runAmp(
  `Quick review of these changes. Output JSON: {verdict: "approve"|"needs-attention", summary: string}.\n\n${diff}`,
  { streamJson: true, timeout: 60_000 }
);

if (result.success && result.result?.includes('needs-attention')) {
  console.log(JSON.stringify({
    decision: 'block',
    reason: 'Amp review flagged issues. Run /amp:review for details.',
  }));
} else {
  console.log(JSON.stringify({ decision: 'approve' }));
}
