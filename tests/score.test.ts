import { describe, it, expect } from 'vitest';
import { calculateScore } from '../utils/score';

describe('calculateScore', () => {
  it('calculates positive score correctly', () => {
    const score = calculateScore(3, 60000); // 3 answers, 60s
    // gross = 3000, cost = 600 => 2400
    expect(score).toBe(2400);
  });

  it('never returns negative', () => {
    const score = calculateScore(0, 1000000); // very large time
    expect(score).toBe(0);
  });
});
