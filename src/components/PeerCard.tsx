import React, { useState } from 'react';
import { Star, ArrowRight, BookOpen, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import { PeerStudent } from '../types';
import { SkillBadge } from './SkillBadge';
import { MatchBadge } from './MatchBadge';

interface PeerCardProps {
  peer: PeerStudent;
  onRequestSwap: (peer: PeerStudent) => void;
  onPreviewSyllabus: (peer: PeerStudent) => void;
  onMessagePeer: (peer: PeerStudent) => void;
}

export const PeerCard: React.FC<PeerCardProps> = ({
  peer,
  onRequestSwap,
  onPreviewSyllabus,
  onMessagePeer,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-5 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between">
      {/* Card Header: Avatar (48px with dynamic online ring), Info, and Match Score pinned top-right */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              {imgError ? (
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base border-2 border-indigo-200">
                  {peer.name.split(' ').map((n) => n[0]).join('')}
                </div>
              ) : (
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  onError={() => setImgError(true)}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-indigo-300 transition-all"
                  referrerPolicy="no-referrer"
                />
              )}
              {peer.isOnline && (
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"
                  title="Online on campus right now"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {peer.name}
                </h3>
                <span className="text-xs text-slate-400 font-normal">
                  {peer.graduationYear}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                {peer.university} · {peer.major}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <MatchBadge score={peer.matchScore} isMutual={peer.isMutualMatch} />
          </div>
        </div>

        {/* Mutual Match Explanation callout if high reciprocal match */}
        {peer.isMutualMatch && peer.mutualReason && (
          <div className="mt-3 px-3 py-2 bg-indigo-50/70 rounded-xl text-xs text-indigo-900 font-medium flex items-center gap-2 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="line-clamp-1">{peer.mutualReason}</span>
          </div>
        )}

        {/* Short Bio */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {peer.bio}
        </p>

        {/* Swap Body Matrix: Two-column visual divider displaying "Teaches" vs "Wants to Learn" */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-3">
          {/* Teaches (Indigo Pill Stack) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                Teaches
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {peer.hoursTaught}h shared
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {peer.teachingSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-indigo-50/60 border border-indigo-100/90 rounded-lg p-2 text-xs text-slate-800 flex flex-col gap-1"
                >
                  <span className="font-medium text-slate-900 line-clamp-1 leading-snug">
                    {skill.name}
                  </span>
                  <div className="flex items-center justify-between">
                    <SkillBadge level={skill.level} />
                    {skill.experienceMonths && (
                      <span className="text-[10px] text-indigo-500 font-medium">
                        {Math.floor(skill.experienceMonths / 12) > 0
                          ? `${Math.floor(skill.experienceMonths / 12)}y+ exp`
                          : `${skill.experienceMonths}mo`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wants to Learn (Cyan Pill Stack) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-cyan-800 uppercase tracking-wider">
                Wants to Learn
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Target
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {peer.learningSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-cyan-50/50 border border-cyan-100 rounded-lg p-2 text-xs text-slate-800 flex flex-col gap-1"
                >
                  <span className="font-medium text-slate-900 line-clamp-1 leading-snug">
                    {skill.name}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white text-cyan-800 border border-cyan-200">
                      Seeking coach
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Ratings, Total Swaps & Direct Action Row */}
      <div className="mt-5 pt-3.5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-slate-800 tabular-nums">
              {peer.rating.toFixed(2)}
            </span>
            <span className="text-slate-400">({peer.totalSwaps} swaps)</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Verified Peer</span>
          </div>
        </div>

        {/* Direct Action Row: Request Swap & Preview Syllabus */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onPreviewSyllabus(peer)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            Syllabus
          </button>

          <button
            onClick={() => onRequestSwap(peer)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
          >
            <span>Request Swap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Message link */}
        <button
          onClick={() => onMessagePeer(peer)}
          className="w-full mt-2 py-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3 h-3" />
          Chat with {peer.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};
