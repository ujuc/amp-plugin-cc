#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const action = process.argv[2]; // 'start' or 'end'

if (action === 'start') {
  try {
    execFileSync('amp', ['--version'], { stdio: 'ignore' });
    process.env.AMP_PLUGIN_READY = 'true';
  } catch {
    console.error('[amp-plugin-cc] Warning: Amp CLI not found');
  }
} else if (action === 'end') {
  // Session end — cleanup if needed
}
