import React from 'react';

interface MatchBadgeProps {
  score: number;
  isMutual: boolean;
  className?: string;
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({ score, isMutual, className = '' }) => {
  if (isMutual && score >= 90) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-900 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 shadow-sm shadow-emerald-500/5 ${className}`}
        title="High compatibility: You teach what they want, and they teach what you want!"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="tabular-nums font-bold">{score}%</span>
        <span className="font-medium text-emerald-800">Mutual Match</span>
      </div>
    );
  }

  if (isMutual) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-indigo-900 border border-indigo-200 bg-indigo-50/60 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        <span className="tabular-nums font-bold">{score}%</span>
        <span className="font-medium text-indigo-700">Reciprocal</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 border border-slate-200 bg-slate-50 ${className}`}
      title="One-way match: One of you can teach what the other seeks."
    >
      <span className="tabular-nums font-medium">{score}%</span>
      <span>Match</span>
    </div>
  );
};
