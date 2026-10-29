import React from 'react';
import { SkillLevel } from '../types';

interface SkillBadgeProps {
  level: SkillLevel;
  className?: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ level, className = '' }) => {
  const styles = {
    Beginner: 'bg-slate-100 text-slate-600 border border-slate-200/60',
    Intermediate: 'bg-amber-50 text-amber-800 border border-amber-200/60',
    Expert: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${styles[level]} ${className}`}
    >
      {level}
    </span>
  );
};
