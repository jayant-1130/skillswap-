import React, { useState } from 'react';
import { TrendingUp, Flame, AlertCircle, Plus, Sparkles, ArrowUpRight, BarChart3, Filter } from 'lucide-react';
import { SkillDemandMetric } from '../types';

interface DemandInsightsViewProps {
  metrics: SkillDemandMetric[];
  onOfferToTeach: (skillName: string, category: SkillDemandMetric['category']) => void;
}

export const DemandInsightsView: React.FC<DemandInsightsViewProps> = ({
  metrics,
  onOfferToTeach,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredMetrics = metrics.filter(
    (m) => selectedCategory === 'All' || m.category === selectedCategory
  );

  // Sort by highest demand ratio first
  const sortedMetrics = [...filteredMetrics].sort((a, b) => b.demandRatio - a.demandRatio);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Campus Skill Marketplace Trends</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">
              Skill Demand & Shortage Insights
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              See what fellow students are eager to learn versus what is currently being offered.
              Teaching skills in high demand awards up to <span className="font-bold text-indigo-600">1.5x barter credits</span> to help you learn your target skills faster!
            </p>
          </div>

          <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs shrink-0 max-w-xs">
            <div className="font-bold text-indigo-900 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Barter Multiplier Rule
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When student demand exceeds teachers by 3:1, teachers earn 1.5 hours of learning credit per 1 hour taught.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Discipline:
          </span>
          {['All', 'Tech & Code', 'Design & UX', 'Data & Math', 'Languages', 'Business & Econ', 'Sciences'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedMetrics.map((item, idx) => {
          const isSurge = item.demandRatio >= 3.0;
          return (
            <div
              key={item.skillName}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                isSurge ? 'border-amber-300/80 bg-gradient-to-br from-white via-white to-amber-50/20' : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center tabular-nums">
                      #{idx + 1}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {item.skillName}
                    </h3>
                  </div>

                  {isSurge ? (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      Shortage ({item.bonusCreditMultiplier}x Credit)
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Demand vs Supply Visual Bars */}
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-600">Students Seeking (Demand)</span>
                      <span className="font-bold text-slate-900 tabular-nums">{item.learnersSeekingCount}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${Math.min(100, (item.learnersSeekingCount / 150) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-600">Teachers Offering (Supply)</span>
                      <span className="font-bold text-slate-900 tabular-nums">{item.teachersOfferingCount}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${Math.min(100, (item.teachersOfferingCount / 150) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metric Summary */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px]">Demand Ratio:</span>
                    <div className="font-heading font-extrabold text-sm text-slate-900 tabular-nums">
                      {item.demandRatio.toFixed(2)} : 1
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[11px]">Teaching Incentive:</span>
                    <div className="font-bold text-emerald-700">
                      +{Math.round((item.bonusCreditMultiplier - 1) * 100)}% Barter Credit
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {isSurge ? 'High student waitlist' : 'Balanced trade velocity'}
                </span>

                <button
                  onClick={() => onOfferToTeach(item.skillName, item.category)}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-xl transition-all flex items-center gap-1 active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Offer to Teach This</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
