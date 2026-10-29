import React from 'react';
import { ArrowLeftRight, Clock, Video, CheckCircle2, XCircle, MessageSquare, AlertCircle, Sparkles, Award } from 'lucide-react';
import { SwapProposal, CurrentUserProfile } from '../types';

interface SwapQueuePanelProps {
  proposals: SwapProposal[];
  currentUser: CurrentUserProfile;
  onAcceptProposal: (id: string) => void;
  onDeclineProposal: (id: string) => void;
  onEnterRoom: (proposal: SwapProposal) => void;
  onMessagePeer: (peerId: string, peerName: string) => void;
}

export const SwapQueuePanel: React.FC<SwapQueuePanelProps> = ({
  proposals,
  currentUser,
  onAcceptProposal,
  onDeclineProposal,
  onEnterRoom,
  onMessagePeer,
}) => {
  const activeConfirmed = proposals.filter((p) => p.status === 'accepted');
  const pendingProposals = proposals.filter((p) => p.status === 'pending');

  const teachingRatioPercent = Math.min(
    100,
    Math.round((currentUser.hoursTaught / (currentUser.hoursLearned || 1)) * 100)
  );

  return (
    <aside className="w-full space-y-5">
      {/* Reciprocity Barter Meter */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Reciprocity Meter
              </h3>
              <p className="text-[11px] text-slate-500">1:1 Fair Barter</p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 tabular-nums">
            Balanced (+{(currentUser.hoursTaught - currentUser.hoursLearned).toFixed(1)}h)
          </span>
        </div>

        {/* Hours Comparison Stats */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl mb-3 text-center">
          <div>
            <div className="text-[11px] font-medium text-slate-500">Hours Taught</div>
            <div className="font-heading font-extrabold text-base text-indigo-600 tabular-nums">
              {currentUser.hoursTaught.toFixed(1)}h
            </div>
          </div>
          <div className="border-l border-slate-200">
            <div className="text-[11px] font-medium text-slate-500">Hours Learned</div>
            <div className="font-heading font-extrabold text-base text-cyan-700 tabular-nums">
              {currentUser.hoursLearned.toFixed(1)}h
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-slate-600">
            <span>Barter Symmetry</span>
            <span className="tabular-nums text-emerald-700 font-bold">
              {teachingRatioPercent}% healthy
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, teachingRatioPercent)}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Teaching reinforces your knowledge by 90% (The Feynman Protégé Principle).
          </p>
        </div>
      </div>

      {/* Upcoming / Active Confirmed Sessions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            Upcoming Live Swaps ({activeConfirmed.length})
          </h3>
          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            Time Set
          </span>
        </div>

        {activeConfirmed.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
            No confirmed sessions right now. Propose a swap from the peer list!
          </div>
        ) : (
          <div className="space-y-3">
            {activeConfirmed.map((proposal) => (
              <div
                key={proposal.id}
                className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/30 hover:bg-indigo-50/60 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={proposal.peerAvatar}
                      alt={proposal.peerName}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-300"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-xs text-slate-900 leading-none">
                        {proposal.peerName}
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        {proposal.scheduledDate} · {proposal.scheduledTime}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md tabular-nums">
                    {proposal.durationMinutes}m
                  </span>
                </div>

                {/* Trade details */}
                <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-indigo-100/70 mb-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-700 font-semibold truncate max-w-[120px]">
                      {proposal.whatYouTeach}
                    </span>
                    <ArrowLeftRight className="w-3 h-3 text-slate-400 shrink-0 mx-1" />
                    <span className="text-cyan-700 font-semibold truncate max-w-[120px]">
                      {proposal.whatPeerTeaches}
                    </span>
                  </div>
                </div>

                {/* Enter Live Study Room Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEnterRoom(proposal)}
                    className="flex-1 py-1.5 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all active:scale-[0.98]"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Enter Study Room</span>
                  </button>

                  <button
                    onClick={() => onMessagePeer(proposal.peerId, proposal.peerName)}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
                    title="Send message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Session Requests (Accept or Decline) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Incoming Requests ({pendingProposals.length})
          </h3>
          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
            Awaiting response
          </span>
        </div>

        {pendingProposals.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
            No pending requests in your queue.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <img
                      src={proposal.peerAvatar}
                      alt={proposal.peerName}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-xs text-slate-900">
                        {proposal.peerName}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {proposal.peerUniversity} · Proposed for {proposal.scheduledTime}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {proposal.createdAt}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 mb-2.5 bg-slate-50 p-2 rounded-lg">
                  <div className="font-medium text-slate-800">
                    Trade: {proposal.whatYouTeach} ⇄ {proposal.whatPeerTeaches}
                  </div>
                  {proposal.isOneWay && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                      One-Way Credit Exchange
                    </span>
                  )}
                  {proposal.note && (
                    <p className="text-[10px] text-slate-500 mt-1 italic line-clamp-2">
                      "{proposal.note}"
                    </p>
                  )}
                </div>

                {/* Explicit Accept or Decline action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAcceptProposal(proposal.id)}
                    className="flex-1 py-1.5 px-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs active:scale-[0.98]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept & Set Time</span>
                  </button>

                  <button
                    onClick={() => onDeclineProposal(proposal.id)}
                    className="py-1.5 px-2.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                    title="Decline request"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onMessagePeer(proposal.peerId, proposal.peerName)}
                    className="py-1.5 px-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Community Verified Reputation Badge */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent border border-indigo-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-xs shrink-0 border border-indigo-100">
          <Award className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <div className="font-heading font-bold text-xs text-slate-900">
            {currentUser.reputationBadge}
          </div>
          <p className="text-[11px] text-slate-600">
            Over {currentUser.hoursTaught} hours taught with 100% mutual peer reviews.
          </p>
        </div>
      </div>
    </aside>
  );
};
