import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Star, ArrowLeftRight, Clock, BookOpen, Users, HelpCircle } from 'lucide-react';
import { CurrentUserProfile } from '../types';

interface ReputationViewProps {
  currentUser: CurrentUserProfile;
  onOpenProfile: () => void;
}

export const ReputationView: React.FC<ReputationViewProps> = ({
  currentUser,
  onOpenProfile,
}) => {
  const verifiedEndorsements = [
    {
      id: 'e1',
      peer: 'Alex Rivera',
      school: 'Carnegie Mellon University',
      rating: 5,
      date: 'Oct 26, 2026',
      badge: 'React & Next.js Master',
      text: 'Jordan broke down Next.js App Router server actions and cache invalidation in just 20 minutes. I was able to teach Figma auto-layout right after. Truly the most efficient way to learn.',
    },
    {
      id: 'e2',
      peer: 'Maya Chen',
      school: 'Stanford University',
      rating: 5,
      date: 'Oct 21, 2026',
      badge: 'Tailwind CSS Expert',
      text: 'Super clear explanations of Tailwind animation spring curves. Patient, structured, and prepared with a live playground. Excited for our next swap!',
    },
    {
      id: 'e3',
      peer: 'Elena Rostova',
      school: 'UT Austin',
      rating: 5,
      date: 'Oct 14, 2026',
      badge: 'Intro Python Coach',
      text: 'Jordan made Python loops and dictionaries so accessible for someone with a linguistics background. In exchange, we practiced French conversation.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                  {currentUser.reputationBadge}
                </h1>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Level 3 Mentor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentUser.name} · {currentUser.university} ({currentUser.major})
              </p>
            </div>
          </div>

          <button
            onClick={onOpenProfile}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20"
          >
            Update My Teaching Offerings
          </button>
        </div>

        {/* 4-KPI Metric Row */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hours Taught
            </div>
            <div className="font-heading font-extrabold text-2xl text-indigo-600 mt-1 tabular-nums">
              {currentUser.hoursTaught.toFixed(1)}h
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Shared with 14 peers</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hours Learned
            </div>
            <div className="font-heading font-extrabold text-2xl text-cyan-600 mt-1 tabular-nums">
              {currentUser.hoursLearned.toFixed(1)}h
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">1-on-1 coaching gained</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Barter Balance
            </div>
            <div className="font-heading font-extrabold text-2xl text-emerald-600 mt-1 tabular-nums">
              +{(currentUser.hoursTaught - currentUser.hoursLearned).toFixed(1)}h
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Available learning credits
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Peer Approval
            </div>
            <div className="font-heading font-extrabold text-2xl text-slate-900 mt-1 tabular-nums">
              5.0 / 5.0
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">100% verified endorsements</div>
          </div>
        </div>
      </div>

      {/* The Science: The Protégé Effect / Learn by Teaching */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-cyan-50/40 rounded-2xl border border-indigo-100/90 p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Why SkillSwap Works: The Protégé & Feynman Effect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Cognitive psychological research confirms that preparing to teach someone else forces the brain to organize information into mental models, expose hidden gaps, and anchor long-term retention. By trading 20 minutes of teaching for 20 minutes of being coached, both peers learn twice as fast without tuition or gatekeeping.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs shadow-2xs">
                <span className="font-bold text-indigo-700">1. Active Retrieval:</span>
                <p className="text-slate-600 mt-0.5">Explaining concepts aloud triggers deep conceptual synthesis.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs shadow-2xs">
                <span className="font-bold text-cyan-800">2. Reciprocal Accountability:</span>
                <p className="text-slate-600 mt-0.5">Both students arrive prepared with a concrete syllabus.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs shadow-2xs">
                <span className="font-bold text-emerald-800">3. Non-Monetary Equity:</span>
                <p className="text-slate-600 mt-0.5">Every student has valuable knowledge to trade; time is the currency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Peer Endorsements */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              Verified Peer Endorsements
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged automatically at the conclusion of live reciprocal study sessions
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            {verifiedEndorsements.length} Reviews
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {verifiedEndorsements.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-heading font-bold text-xs text-slate-900">
                    {item.peer}
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  {item.school} · {item.date}
                </div>

                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100">
                  {item.badge}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Study Session Completed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ on the 1:1 Barter Exchange Model */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          SkillSwap Barter Protocol FAQ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 space-y-1">
            <h4 className="font-bold text-slate-900">How do teaching hours work?</h4>
            <p>
              When you teach a peer for 45 minutes, your ledger earns barter time. You can spend that credit learning any other subject from any other peer on campus.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 space-y-1">
            <h4 className="font-bold text-slate-900">What if I'm only a beginner at what I want to learn?</h4>
            <p>
              That is the entire purpose of SkillSwap! You teach what you are confident in (even introductory topics help newer learners), and be taught what you want to master.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 space-y-1">
            <h4 className="font-bold text-slate-900">How are session roles split?</h4>
            <p>
              Every standard session uses the 50/50 reciprocal timer: Part 1 for one peer's topic, Part 2 for the other's, and the final 5 minutes for mutual feedback and certification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 space-y-1">
            <h4 className="font-bold text-slate-900">How is quality verified?</h4>
            <p>
              Every student maintains a public verified syllabus preview and mutual reviews. Sessions cannot be concluded without mutual barter sign-off.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
