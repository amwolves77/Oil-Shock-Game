import { LeaderboardEntry } from '../types';

const KEY = 'oil_shock_leaderboard_data';

export const loadLeaderboardFromLocalStorage = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Basic validation
    const filtered = parsed.filter((p: any) => p && typeof p.score === 'number' && typeof p.nickname === 'string');
    return filtered as LeaderboardEntry[];
  } catch (err) {
    console.warn('Failed to load leaderboard from localStorage, clearing corrupt value.', err);
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    return [];
  }
};

export const saveLeaderboardToLocalStorage = (entries: LeaderboardEntry[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch (err) {
    console.warn('Failed to save leaderboard to localStorage', err);
  }
};
