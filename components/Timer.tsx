import React, { useEffect, useState, useRef } from 'react';

interface TimerProps {
  startTime: number;
  isRunning: boolean;
  penaltyMs: number;
}

const Timer: React.FC<TimerProps> = ({ startTime, isRunning, penaltyMs }) => {
  const [elapsed, setElapsed] = useState(0);
  const requestRef = useRef<number>();

  const animate = () => {
    if (isRunning) {
      setElapsed(Date.now() - startTime);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, startTime]);

  // If stopped, we might still want to show final time, but this component 
  // primarily handles the "live" view. The parent handles final calculation.
  
  const totalTime = elapsed + penaltyMs;

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`font-mono text-2xl md:text-4xl font-bold tabular-nums tracking-wider ${penaltyMs > 0 ? 'text-rose-400' : 'text-cyan-400'}`}>
      {formatTime(totalTime)}
      {penaltyMs > 0 && (
        <span className="text-xs md:text-sm text-rose-500 block text-center font-sans font-normal animate-pulse">
          (+{(penaltyMs / 1000).toFixed(0)}s Penalty)
        </span>
      )}
    </div>
  );
};

export default Timer;
