import { describe, it, expect } from 'vitest';
import { noFloatingAsyncCalls } from '../../src/rules/no-floating-async-calls';

describe('no-floating-async-calls', () => {
  it('should have correct meta', () => {
    expect(noFloatingAsyncCalls.meta.type).toBe('problem');
    expect(noFloatingAsyncCalls.meta.docs.recommended).toBe(true);
    expect(noFloatingAsyncCalls.meta.messages).toHaveProperty('ignored');
  });

  it('should provide rule creator function', () => {
    expect(typeof noFloatingAsyncCalls.create).toBe('function');
  });
});
