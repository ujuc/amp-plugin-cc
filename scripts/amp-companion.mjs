#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT || join(__dirname, '..');

/**
 * Parse --stream-json output.
 * Each line is an independent JSON object.
 */
export function parseStreamJson(raw) {
  const events = [];
  for (const line of raw.split('\n').filter(Boolean)) {
    try {
      events.push(JSON.parse(line));
    } catch {
      // non-JSON line — skip
    }
  }

  const assistantMessages = events.filter(
    (e) => e.type === 'message' && e.role === 'assistant'
  );
  const lastMessage = assistantMessages.at(-1);

  return {
    success: true,
    events,
    result: lastMessage?.content || '',
    threadId: events.find((e) => e.threadId)?.threadId || null,
  };
}

/**
 * Run Amp CLI non-interactively.
 */
export async function runAmp(prompt, options = {}) {
  const {
    streamJson = true,
    dangerouslyAllowAll = false,
    cwd = process.cwd(),
    timeout = 120_000,
    threadId = null,
  } = options;

  const args = ['-x', prompt];

  if (streamJson) args.push('--stream-json');
  if (dangerouslyAllowAll) args.push('--dangerously-allow-all');
  if (threadId) args.push('--thread', threadId);

  const env = { ...process.env };
  const apiKey = process.env.CLAUDE_PLUGIN_OPTION_AMP_API_KEY;
  if (apiKey) env.AMP_API_KEY = apiKey;

  try {
    const { stdout, stderr } = await execFileAsync('amp', args, {
      cwd,
      env,
      timeout,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (streamJson) {
      return parseStreamJson(stdout);
    }
    return { success: true, output: stdout, stderr };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stderr: error.stderr || '',
      code: error.code,
    };
  }
}

/**
 * Continue an existing Amp thread (multi-turn).
 */
export async function continueThread(threadId, prompt, options = {}) {
  return runAmp(prompt, { ...options, threadId });
}

/**
 * Load a prompt template by name.
 */
export function loadPrompt(name) {
  const path = join(PLUGIN_ROOT, 'prompts', `${name}.md`);
  return readFileSync(path, 'utf-8');
}

// CLI mode
if (process.argv[2]) {
  const command = process.argv[2];
  const input = process.argv[3] || '';

  switch (command) {
    case 'review':
    case 'adversarial':
    case 'analyze':
    case 'rescue': {
      const prompt = loadPrompt(command).replace('{{INPUT}}', input);
      const result = await runAmp(prompt, { streamJson: true });
      console.log(JSON.stringify(result, null, 2));
      break;
    }
    case 'status': {
      const result = await execFileAsync('amp', ['threads', 'list', '--json']);
      console.log(result.stdout);
      break;
    }
    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}
