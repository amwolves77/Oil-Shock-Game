import { describe, it, expect, beforeEach } from 'vitest';
import { loadLeaderboardFromLocalStorage, saveLeaderboardToLocalStorage } from '../utils/storage';

const KEY = 'oil_shock_leaderboard_data';

describe('storage helpers', () => {
  beforeEach(() => {
    localStorage.removeItem(KEY);
  });

  it('saves and loads leaderboard', () => {
    const entries = [{ nickname: 'A', email: 'a@x', score: 100, timestamp: Date.now() }];
    saveLeaderboardToLocalStorage(entries as any);
    const loaded = loadLeaderboardFromLocalStorage();
    expect(loaded.length).toBe(1);
    expect(loaded[0].nickname).toBe('A');
  });

  it('handles corrupt data gracefully', () => {
    localStorage.setItem(KEY, 'not json');
    const loaded = loadLeaderboardFromLocalStorage();
    expect(loaded).toEqual([]);
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
