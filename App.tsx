import { airtableFindByEmail, airtableCreateScore, airtableTop10 } from './utils/airtable';

import React, { useState, useEffect } from 'react';
import { QUESTIONS, PENALTY_MS } from './constants';
import { GameState, LeaderboardEntry, User } from './types';
import Timer from './components/Timer';
import QuestionCard from './components/QuestionCard';
import Leaderboard from './components/Leaderboard';
import { 
  Play, 
  RotateCcw, 
  Fuel, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Info, 
  ChevronRight, 
  Mail, 
  User as UserIcon,
  Crown
} from 'lucide-react';

const App: React.FC = () => {
  

  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    currentQuestionIndex: 0,
    answers: [],
    startTime: null,
    endTime: null,
    penaltyTimeMs: 0,
    user: null
  });

  const [regData, setRegData] = useState<User>({ nickname: '', email: '' });
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);


  useEffect(() => {
    setLeaderboardLoading(true);
    airtableTop10()
      .then(setLeaderboard)
      .finally(() => setLeaderboardLoading(false));
  }, []);



  
  const calculateScore = (correctCount: number, totalTimeMs: number) => {
    const REVENUE_PER_ANSWER = 1000;
    const COST_PER_SECOND = 10;
    const grossRevenue = correctCount * REVENUE_PER_ANSWER;
    const operationalCost = Math.floor((totalTimeMs / 1000) * COST_PER_SECOND);
    return Math.max(0, grossRevenue - operationalCost);
  };

  const handleStartRegistration = () => {
    setGameState(prev => ({ ...prev, status: 'registering' }));
  };

  // Fix: Added missing startGame function to reset the game state and regData
  const startGame = () => {
    setGameState({
      status: 'idle',
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      endTime: null,
      penaltyTimeMs: 0,
      user: null
    });
    setRegData({ nickname: '', email: '' });
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBeginSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.nickname || !regData.email) return;

    const alreadyPlayed = await airtableFindByEmail(regData.email);

    if (alreadyPlayed) {
      setErrorMessage('You have already played. One attempt per email.');
      return;
    }


    setGameState({
      status: 'playing',
      currentQuestionIndex: 0,
      answers: [],
      startTime: Date.now(),
      endTime: null,
      penaltyTimeMs: 0,
      user: regData
    });
    setLastAnswerCorrect(null);
  };


  const saveToLeaderboard = (score: number, user: User) => {
    const newEntry: LeaderboardEntry = {
      nickname: user.nickname,
      email: user.email, // Email is stored but not displayed in the Leaderboard component
      score,
      timestamp: Date.now()
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 100); // Keep top 100 in storage, we only show top 10

    setLeaderboard(updated);
    localStorage.setItem('oil_shock_leaderboard_data', JSON.stringify(updated));
  };

  const handleAnswer = (answer: string) => {
    if (gameState.status !== 'playing') return;

    const currentQ = QUESTIONS[gameState.currentQuestionIndex];
    const isCorrect = answer === currentQ.correctAnswer;
    
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    setTimeout(async () => {
        setShowFeedback(false);
        setLastAnswerCorrect(null);

        setGameState(prev => {
            const newAnswers = [...prev.answers, isCorrect];
            const isFinished = prev.currentQuestionIndex >= QUESTIONS.length - 1;
            
            let newPenalty = prev.penaltyTimeMs;
            if (!isCorrect) newPenalty += PENALTY_MS;
      
            if (isFinished) {
              const endTime = Date.now();
              const totalTime = (endTime - (prev.startTime || 0)) + newPenalty;
              const correctCount = newAnswers.filter(Boolean).length;
              const finalScore = calculateScore(correctCount, totalTime);
              
              if (prev.user) {
                airtableCreateScore(prev.user.email, prev.user.nickname, finalScore);
                airtableTop10().then(setLeaderboard);

              }  
      
              return {
                ...prev,
                answers: newAnswers,
                endTime: endTime,
                status: 'finished',
                penaltyTimeMs: newPenalty
              };
            }
      
            return {
              ...prev,
              answers: newAnswers,
              currentQuestionIndex: prev.currentQuestionIndex + 1,
              penaltyTimeMs: newPenalty
            };
          });
    }, 800);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };

  const renderStartScreen = () => (
    <div className="text-center max-w-2xl px-6 animate-in fade-in zoom-in duration-500">
      <div className="mb-8 relative inline-block">
        <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full"></div>
        <Fuel size={64} className="text-cyan-400 relative z-10 mx-auto" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6 tracking-tight">
        OIL SHOCK
      </h1>
      <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
        Market Volatility Alert: Oil has plummeted to <span className="text-emerald-400 font-bold">$50/bbl</span>. 
        <br />
        Test your intuition as the shock ripples through the global system.
      </p>

      <button
          onClick={handleStartRegistration}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-cyan-600 font-lg rounded-full hover:bg-cyan-50 hover:scale-105 hover:shadow-[0_0_30px_rgba(8,145,178,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900"
      >
          <Play className="mr-2 fill-current" size={20} />
          START GAME
      </button>
    </div>
  );

  const renderRegistrationScreen = () => (
    <div className="w-full max-w-md px-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
            <UserIcon className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Identity Protocol</h2>
          <p className="text-slate-500 text-sm">Register your credentials for the leaderboard</p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleBeginSimulation} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required
                type="text"
                maxLength={15}
                placeholder="Ex: PetroMaster"
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                value={regData.nickname}
                onChange={e => {
                  setErrorMessage(null);
                  setRegData({ ...regData, nickname: e.target.value });
                }}

              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Contact (Email)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required
                type="email"
                placeholder="Ex: user@market.com"
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                value={regData.email}
                onChange={e => {
                  setErrorMessage(null);
                  setRegData({ ...regData, email: e.target.value });
                }}


              />
            </div>
            <p className="text-[10px] text-slate-600 mt-2 italic">* Email is only for backend verification and is never displayed publicly.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-900/20"
          >
            START GAME
            <ChevronRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );

  const renderFinishedScreen = () => {
    const totalTime = (gameState.endTime! - gameState.startTime!) + gameState.penaltyTimeMs;
    const correctCount = gameState.answers.filter(a => a).length;
    const finalScore = calculateScore(correctCount, totalTime);
    
    const userRank = leaderboard.findIndex(e => e.score === finalScore && e.nickname === gameState.user?.nickname) + 1;
    const isTopTen = userRank > 0 && userRank <= 10;

    return (
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-12 animate-in fade-in duration-700">
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Game Over.</h2>
            <p className="text-slate-500">Your results are ready. See how you rank on the leaderboard.</p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 mb-6 shadow-2xl relative overflow-hidden">
            {isTopTen && (
              <div className="absolute top-4 right-4 animate-bounce">
                <Crown className="text-yellow-500" size={24} />
              </div>
            )}
            
            <div className="mb-6">
              <div className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-1">Final Score</div>
              <div className="text-7xl font-black text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)] tabular-nums">
                  {finalScore.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Accuracy</div>
                <div className="text-2xl font-mono text-white">{Math.round((correctCount / QUESTIONS.length) * 100)}%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Execution Time</div>
                <div className="text-2xl font-mono text-cyan-400">{formatTime(totalTime)}</div>
              </div>
            </div>
            
            {userRank > 0 && (
              <div className="mt-6 p-4 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-sm text-slate-400">Your Global Rank:</span>
                <span className={`text-xl font-black ${isTopTen ? 'text-cyan-400' : 'text-slate-300'}`}>
                  #{userRank} {isTopTen ? ' (TOP 10)' : ''}
                </span>
              </div>
            )}
          </div>

          <button
              onClick={startGame}
              className="w-full lg:w-max flex items-center justify-center px-10 py-4 font-bold text-slate-900 transition-all duration-200 bg-white rounded-full hover:bg-cyan-50 hover:scale-105"
          >
              <RotateCcw className="mr-2" size={18} />
              Play Again
          </button>
        </div>

        <div className="flex flex-col">
          {leaderboardLoading ? (
            <div className="text-slate-500 text-sm italic">
              Loading leaderboard…
            </div>
          ) : (
            <Leaderboard 
              entries={leaderboard.slice(0, 5)} 
              currentUserScore={finalScore}
              currentNickname={gameState.user?.nickname}
            />
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse:60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* Feedback Overlay */}
        {showFeedback && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${lastAnswerCorrect ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                <div className={`transform scale-150 transition-transform duration-300 ${lastAnswerCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {lastAnswerCorrect ? <CheckCircle2 size={120} /> : <XCircle size={120} />}
                </div>
            </div>
        )}

        <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
            {gameState.status === 'idle' && renderStartScreen()}
            {gameState.status === 'registering' && renderRegistrationScreen()}
            
            {gameState.status === 'playing' && (
                <div className="w-full max-w-4xl flex flex-col items-center animate-in fade-in duration-300">
                    <div className="mb-8 flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Operator</span>
                           <span className="text-cyan-400 font-mono font-bold">{gameState.user?.nickname}</span>
                        </div>
                        <Timer 
                            startTime={gameState.startTime!} 
                            isRunning={gameState.status === 'playing'} 
                            penaltyMs={gameState.penaltyTimeMs}
                        />
                    </div>
                    
                    <QuestionCard 
                        question={QUESTIONS[gameState.currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        totalQuestions={QUESTIONS.length}
                        currentIndex={gameState.currentQuestionIndex}
                    />
                </div>
            )}

            {gameState.status === 'finished' && renderFinishedScreen()}
        </div>
    </div>
  );
};

export default App;
