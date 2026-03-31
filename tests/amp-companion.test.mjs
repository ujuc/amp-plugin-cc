import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { parseStreamJson } from '../scripts/amp-companion.mjs';

describe('parseStreamJson', () => {
  it('extracts assistant messages from stream', () => {
    const raw = [
      JSON.stringify({ type: 'message', role: 'user', content: 'hello' }),
      JSON.stringify({ type: 'message', role: 'assistant', content: 'world' }),
      JSON.stringify({ threadId: 'th-123' }),
    ].join('\n');

    const result = parseStreamJson(raw);
    assert.equal(result.success, true);
    assert.equal(result.result, 'world');
    assert.equal(result.threadId, 'th-123');
    assert.equal(result.events.length, 3);
  });

  it('handles empty input', () => {
    const result = parseStreamJson('');
    assert.equal(result.success, true);
    assert.equal(result.result, '');
    assert.equal(result.threadId, null);
  });

  it('skips non-JSON lines', () => {
    const raw = 'not json\n' + JSON.stringify({ type: 'message', role: 'assistant', content: 'ok' });
    const result = parseStreamJson(raw);
    assert.equal(result.events.length, 1);
    assert.equal(result.result, 'ok');
  });
});
