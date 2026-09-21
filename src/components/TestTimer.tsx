import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TestTimerProps {
  totalSecondsRemaining: number;
  questionSecondsSpent: number;
  onTimeExpired?: () => void;
  benchmarkSeconds?: number;
}

export const TestTimer: React.FC<TestTimerProps> = ({
  totalSecondsRemaining,
  questionSecondsSpent,
  benchmarkSeconds = 90
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const isLowTime = totalSecondsRemaining < 300; // < 5 mins
  const isQuestionTimeHigh = questionSecondsSpent > benchmarkSeconds * 1.3;

  return (
    <div className="flex items-center gap-3">
      {/* Question time counter */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
        isQuestionTimeHigh
          ? 'bg-amber-50 text-amber-800 border-amber-300'
          : 'bg-slate-100 text-slate-700 border-slate-200'
      }`}>
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span>Question Time: {formatTime(questionSecondsSpent)}</span>
        {isQuestionTimeHigh && (
          <span title="Taking longer than benchmark!">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
          </span>
        )}
      </div>

      {/* Overall Remaining Timer */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border ${
        isLowTime
          ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
      }`}>
        <span>Remaining: {formatTime(totalSecondsRemaining)}</span>
      </div>
    </div>
  );
};
