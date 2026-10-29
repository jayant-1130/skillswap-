import React from 'react';
import { ArrowLeftRight, Sparkles, BookOpen, Clock, Award, RotateCw, TrendingUp } from 'lucide-react';
import { CurrentUserProfile } from '../types';

export type NavTabType = 'peers' | 'three_way' | 'demand' | 'swaps' | 'history' | 'room' | 'reputation';

interface HeaderProps {
  currentTab: NavTabType;
  onSelectTab: (tab: NavTabType) => void;
  currentUser: CurrentUserProfile;
  onOpenProfile: () => void;
  pendingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onOpenProfile,
  pendingCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('peers')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:bg-indigo-700 transition-colors">
            <ArrowLeftRight className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight leading-none">
              SkillSwap
            </span>
            <span className="text-[11px] font-medium text-indigo-600 tracking-normal mt-0.5">
              Learn by Teaching
            </span>
          </div>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => onSelectTab('peers')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'peers'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Find Peers
          </button>

          <button
            onClick={() => onSelectTab('three_way')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'three_way'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 text-cyan-600" />
            Three-Way Swaps
          </button>

          <button
            onClick={() => onSelectTab('demand')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'demand'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            Demand Insights
          </button>

          <button
            onClick={() => onSelectTab('swaps')}
            className={`relative px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'swaps'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            Queue
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold tabular-nums">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('history')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'history'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Ledger & History
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
            title="Edit your skills and availability"
          >
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {currentUser.teachingSkills.length} teaching · {currentUser.learningSkills.length} learning
              </span>
            </div>
          </button>

          <button
            onClick={onOpenProfile}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20 whitespace-nowrap active:scale-[0.98]"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </header>
  );
};
