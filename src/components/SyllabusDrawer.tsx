import React from 'react';
import { X, Clock, CheckCircle2, Star, BookOpen, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { PeerStudent } from '../types';
import { SkillBadge } from './SkillBadge';

interface SyllabusDrawerProps {
  peer: PeerStudent | null;
  onClose: () => void;
  onRequestSwap: (peer: PeerStudent) => void;
}

export const SyllabusDrawer: React.FC<SyllabusDrawerProps> = ({
  peer,
  onClose,
  onRequestSwap,
}) => {
  if (!peer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
            <div className="flex items-center gap-3.5">
              <img
                src={peer.avatar}
                alt={peer.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-bold text-lg text-slate-900">
                    {peer.name}
                  </h2>
                  <span className="text-xs text-slate-500">
                    {peer.graduationYear}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {peer.university} · {peer.major}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Syllabus Overview Card */}
            <div className="bg-gradient-to-br from-indigo-50/80 to-white p-5 rounded-2xl border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Structured Lesson Blueprint
                </span>
                <span className="text-xs font-bold text-indigo-900 bg-white px-2.5 py-1 rounded-full border border-indigo-200 shadow-2xs tabular-nums">
                  45 Minutes Split Barter
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-slate-900">
                {peer.sampleSyllabus.skillName}
              </h3>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {peer.sampleSyllabus.overview}
              </p>

              <div className="mt-3 pt-3 border-t border-indigo-100/60 flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Prerequisites:</span>
                <span>{peer.sampleSyllabus.prerequisites}</span>
              </div>
            </div>

            {/* Reciprocal 50/50 Teaching Model Explained */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                The SkillSwap Mutual Barter Promise
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                SkillSwap sessions are strictly 1:1 reciprocal. In a standard 45m swap:
                <span className="font-semibold text-slate-800"> 20 mins</span> {peer.name.split(' ')[0]} teaches their expertise,{' '}
                <span className="font-semibold text-slate-800">20 mins</span> you teach your expertise, and{' '}
                <span className="font-semibold text-slate-800">5 mins</span> are reserved for collaborative recap and rating.
              </p>
            </div>

            {/* Topic Agenda Breakdown */}
            <div>
              <h4 className="font-heading font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Session Breakdown & Outcomes
              </h4>

              <div className="space-y-3">
                {peer.sampleSyllabus.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h5 className="font-heading font-semibold text-xs text-slate-900">
                          {topic.title}
                        </h5>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
                        {topic.durationMinutes} min
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-slate-600 ml-7">
                      {topic.description}
                    </p>

                    {topic.learningOutcomes && (
                      <div className="mt-2.5 ml-7 flex flex-wrap gap-1.5">
                        {topic.learningOutcomes.map((outcome, oIdx) => (
                          <span
                            key={oIdx}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {outcome}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Peer Reviews */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Verified Peer Reviews ({peer.reviews.length})
                </h4>
                <span className="text-xs font-bold text-slate-700 tabular-nums">
                  {peer.rating.toFixed(2)} / 5.0 Average
                </span>
              </div>

              <div className="space-y-3">
                {peer.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {rev.reviewerName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          · {rev.reviewerUniversity}
                        </span>
                      </div>
                      <div className="flex items-center text-amber-500 text-[11px] font-bold">
                        <Star className="w-3 h-3 fill-current mr-0.5" />
                        {rev.rating.toFixed(1)}
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-indigo-700 mb-1.5 bg-indigo-50/70 inline-block px-2 py-0.5 rounded">
                      Swapped: {rev.skillSwapped}
                    </div>

                    <p className="text-slate-600 italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {rev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-5 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onRequestSwap(peer);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
            >
              <span>Propose Reciprocal Swap with {peer.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
