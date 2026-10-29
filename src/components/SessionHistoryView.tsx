import React, { useState } from 'react';
import { Clock, Star, CheckCircle2, ArrowLeftRight, Download, Filter, Calendar } from 'lucide-react';
import { SessionHistoryRecord, CurrentUserProfile } from '../types';

interface SessionHistoryViewProps {
  history: SessionHistoryRecord[];
  currentUser: CurrentUserProfile;
}

export const SessionHistoryView: React.FC<SessionHistoryViewProps> = ({
  history,
  currentUser,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'reciprocal' | 'three_way'>('all');

  const filteredHistory = history.filter(
    (h) => filterType === 'all' || h.type === filterType
  );

  const totalCompletedHours = history.reduce((sum, h) => sum + h.durationHours, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">
              Verified Session History & Barter Ledger
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Immutable log of completed peer exchanges, hours taught, hours learned, and bilateral ratings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              Zero Outstanding Learning Debt
            </span>
          </div>
        </div>

        {/* 4-Stat Metric Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Swaps
            </span>
            <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1 tabular-nums">
              {history.length}
            </div>
            <span className="text-[11px] text-slate-500">100% completion rate</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hours Taught
            </span>
            <div className="font-heading font-extrabold text-2xl text-indigo-600 mt-1 tabular-nums">
              {currentUser.hoursTaught.toFixed(1)}h
            </div>
            <span className="text-[11px] text-indigo-600 font-medium">Credits earned</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hours Learned
            </span>
            <div className="font-heading font-extrabold text-2xl text-cyan-700 mt-1 tabular-nums">
              {currentUser.hoursLearned.toFixed(1)}h
            </div>
            <span className="text-[11px] text-cyan-700 font-medium">Coaching received</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Barter Surplus
            </span>
            <div className="font-heading font-extrabold text-2xl text-emerald-600 mt-1 tabular-nums">
              +{(currentUser.hoursTaught - currentUser.hoursLearned).toFixed(1)}h
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">Redeemable credits</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'all' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Sessions ({history.length})
          </button>
          <button
            onClick={() => setFilterType('reciprocal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'reciprocal' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1:1 Reciprocal Swaps
          </button>
          <button
            onClick={() => setFilterType('three_way')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'three_way' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Triangular Swaps
          </button>
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredHistory.length} completed sessions
        </span>
      </div>

      {/* History Table / Cards */}
      <div className="space-y-3">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Partner info */}
              <div className="flex items-center gap-3.5">
                <img
                  src={item.peerAvatar}
                  alt={item.peerName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm text-slate-900">
                      {item.peerName}
                    </h3>
                    <span className="text-xs text-slate-400">· {item.peerUniversity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700 tabular-nums">
                      {item.durationHours * 60} mins
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{item.ratingGiven?.toFixed(1)} / 5.0 Mutual Rating</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Stamp</span>
                </div>
              </div>
            </div>

            {/* Exchange Details */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100/70">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                  You Taught:
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">{item.skillTaught}</p>
                <span className="text-[10px] text-indigo-600 font-medium">
                  +{(item.durationHours * 0.5).toFixed(2)}h teaching credit logged
                </span>
              </div>

              <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-100/70">
                <span className="text-[11px] font-bold text-cyan-800 uppercase tracking-wide">
                  You Learned:
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">{item.skillLearned}</p>
                <span className="text-[10px] text-cyan-700 font-medium">
                  +{(item.durationHours * 0.5).toFixed(2)}h coaching received
                </span>
              </div>
            </div>

            {/* Review Snippet */}
            {item.reviewSnippet && (
              <div className="mt-3 text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{item.reviewSnippet}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
