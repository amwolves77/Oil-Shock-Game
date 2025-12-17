import React from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, User as UserIcon, Calendar } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserScore?: number;
  currentNickname?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentUserScore, currentNickname }) => {
  return (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
        <Trophy size={18} className="text-yellow-500" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">Global Leaderboard</h3>
      </div>
      <div className="divide-y divide-slate-800">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm italic">
            No market data available yet.
          </div>
        ) : (
          entries.map((entry, index) => {
            const isCurrentUser = entry.score === currentUserScore && entry.nickname === currentNickname;
            
            return (
              <div 
                key={`${entry.timestamp}-${index}`}
                className={`flex items-center justify-between p-3 transition-colors ${
                  isCurrentUser ? 'bg-cyan-500/10 border-l-4 border-l-cyan-500' : 'hover:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs w-6 ${index < 3 ? 'text-yellow-500 font-bold' : 'text-slate-500'}`}>
                    #{index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className={`text-sm font-semibold ${isCurrentUser ? 'text-cyan-400' : 'text-slate-200'}`}>
                      {entry.nickname}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold ${isCurrentUser ? 'text-cyan-400' : 'text-slate-300'}`}>
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Leaderboard;