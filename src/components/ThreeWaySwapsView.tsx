import React, { useState } from 'react';
import { ArrowRight, RotateCw, Sparkles, CheckCircle2, Users, Clock, Send, ShieldCheck, ChevronRight } from 'lucide-react';
import { ThreeWaySwapLoop, CurrentUserProfile } from '../types';

interface ThreeWaySwapsViewProps {
  loops: ThreeWaySwapLoop[];
  currentUser: CurrentUserProfile;
  onProposeLoop: (loopId: string) => void;
}

export const ThreeWaySwapsView: React.FC<ThreeWaySwapsViewProps> = ({
  loops,
  currentUser,
  onProposeLoop,
}) => {
  const [selectedLoopId, setSelectedLoopId] = useState<string>(loops[0]?.id || '');
  const [proposedLoops, setProposedLoops] = useState<Set<string>>(new Set());

  const currentLoop = loops.find((l) => l.id === selectedLoopId) || loops[0];

  const handlePropose = (id: string) => {
    setProposedLoops((prev) => new Set(prev).add(id));
    onProposeLoop(id);
  };

  if (!currentLoop) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining Three-Way Graph Barter */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl text-white p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 mb-3 backdrop-blur-xs">
            <RotateCw className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Graph Barter Network Algorithm</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
            Three-Way Triangular Swaps
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-xl">
            When no direct 2-way match exists, SkillSwap solves the classic "coincidence of wants" problem by linking three students in a closed circular barter loop:
            <span className="font-bold text-white"> A teaches B, B teaches C, and C teaches A</span>. Everyone masters what they came for.
          </p>
        </div>

        <div className="absolute -right-6 -bottom-6 w-56 h-56 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Loop Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
          Discovered Cycles:
        </span>
        {loops.map((loop) => (
          <button
            key={loop.id}
            onClick={() => setSelectedLoopId(loop.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedLoopId === loop.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{loop.title}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              selectedLoopId === loop.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {loop.matchScore}%
            </span>
          </button>
        ))}
      </div>

      {/* The Interactive Triangular Flow Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-lg text-slate-900">
                {currentLoop.title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300/80 tabular-nums">
                {currentLoop.matchScore}% Perfect Circularity
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Synchronized 30-min circular study block. No cash required; pure reciprocal parity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {proposedLoops.has(currentLoop.id) ? (
              <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Circle Proposed · Waiting for 2/2 Peer Confirmations</span>
              </div>
            ) : (
              <button
                onClick={() => handlePropose(currentLoop.id)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Propose 3-Way Exchange Circle</span>
              </button>
            )}
          </div>
        </div>

        {/* 3-Node Triangular Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Node 1: Student A (You) */}
          <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-5 relative shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  Student A (You)
                </span>
                <span className="text-xs text-slate-500">Originator</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={currentLoop.participants.studentA.avatar}
                  alt={currentLoop.participants.studentA.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {currentLoop.participants.studentA.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentLoop.participants.studentA.university}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1.5 text-xs">
                <div className="text-[11px] font-bold text-indigo-800 uppercase tracking-wide">
                  What You Teach to Alex:
                </div>
                <div className="font-semibold text-slate-900 bg-indigo-50/70 p-2 rounded-lg text-xs">
                  {currentLoop.exchanges.aTeachesB}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between text-[11px] text-indigo-900 font-medium">
              <span>Duration: {currentLoop.durationPerLegMinutes} mins</span>
              <span className="text-emerald-700 font-bold">Leg 1 of 3</span>
            </div>
          </div>

          {/* Node 2: Student B (Alex) */}
          <div className="bg-cyan-50/70 border-2 border-cyan-200 rounded-2xl p-5 relative shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                  Student B
                </span>
                <span className="text-xs text-slate-500">Bridge Partner</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={currentLoop.participants.studentB.avatar}
                  alt={currentLoop.participants.studentB.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {currentLoop.participants.studentB.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentLoop.participants.studentB.university}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-cyan-100 space-y-1.5 text-xs">
                <div className="text-[11px] font-bold text-cyan-800 uppercase tracking-wide">
                  What Alex Teaches to Elena:
                </div>
                <div className="font-semibold text-slate-900 bg-cyan-50/70 p-2 rounded-lg text-xs">
                  {currentLoop.exchanges.bTeachesC}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-100 flex items-center justify-between text-[11px] text-cyan-900 font-medium">
              <span>Duration: {currentLoop.durationPerLegMinutes} mins</span>
              <span className="text-emerald-700 font-bold">Leg 2 of 3</span>
            </div>
          </div>

          {/* Node 3: Student C (Elena) */}
          <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5 relative shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Student C
                </span>
                <span className="text-xs text-slate-500">Loop Closer</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={currentLoop.participants.studentC.avatar}
                  alt={currentLoop.participants.studentC.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {currentLoop.participants.studentC.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentLoop.participants.studentC.university}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1.5 text-xs">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                  What Elena Teaches to You:
                </div>
                <div className="font-semibold text-slate-900 bg-emerald-50/70 p-2 rounded-lg text-xs">
                  {currentLoop.exchanges.cTeachesA}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
              <span>Duration: {currentLoop.durationPerLegMinutes} mins</span>
              <span className="text-emerald-700 font-bold">Leg 3 of 3 (Closed!)</span>
            </div>
          </div>
        </div>

        {/* Narrative Flow Stepper */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>How This Circular Session Operates:</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {currentLoop.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
