import React, { useState } from 'react';
import { X, ArrowLeftRight, Clock, Calendar, Check, Send, Sparkles } from 'lucide-react';
import { PeerStudent, CurrentUserProfile, SwapProposal } from '../types';

interface SwapRequestModalProps {
  peer: PeerStudent | null;
  currentUser: CurrentUserProfile;
  onClose: () => void;
  onSubmitProposal: (proposal: SwapProposal) => void;
}

export const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  peer,
  currentUser,
  onClose,
  onSubmitProposal,
}) => {
  if (!peer) return null;

  const [selectedYouTeach, setSelectedYouTeach] = useState(
    currentUser.teachingSkills[0]?.name || 'React & Next.js'
  );
  const [selectedPeerTeaches, setSelectedPeerTeaches] = useState(
    peer.teachingSkills[0]?.name || ''
  );
  const [duration, setDuration] = useState<number>(45);
  const [scheduledSlot, setScheduledSlot] = useState(
    peer.availability[0] || 'Today at 5:00 PM'
  );
  const [note, setNote] = useState(
    `Hey ${peer.name.split(' ')[0]}, I'd love to exchange skills! I can teach ${selectedYouTeach} and would be thrilled to learn ${selectedPeerTeaches} with you.`
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProposal: SwapProposal = {
      id: `prop-${Date.now()}`,
      peerId: peer.id,
      peerName: peer.name,
      peerAvatar: peer.avatar,
      peerUniversity: peer.university,
      whatYouTeach: selectedYouTeach,
      whatPeerTeaches: selectedPeerTeaches,
      durationMinutes: duration,
      scheduledDate: scheduledSlot.includes('Today')
        ? 'Today'
        : scheduledSlot.includes('Tomorrow')
        ? 'Tomorrow'
        : 'Upcoming',
      scheduledTime: scheduledSlot,
      status: 'pending',
      note,
      createdAt: 'Just now',
    };

    setIsSuccess(true);
    setTimeout(() => {
      onSubmitProposal(newProposal);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="font-heading font-bold text-lg text-slate-900">
              Propose Reciprocal Swap
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Trading 1-on-1 knowledge with {peer.name} ({peer.university})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Proposal Sent to {peer.name.split(' ')[0]}!
            </h3>
            <p className="text-xs text-slate-600 max-w-xs">
              Your reciprocal swap proposal has been logged to your Swap Queue.
              You will be notified once confirmed!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* The Reciprocal Exchange Matrix Box */}
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
              <div className="flex items-center justify-between gap-3">
                {/* You Teach */}
                <div className="flex-1">
                  <label className="block text-[11px] font-bold uppercase text-indigo-700 tracking-wider mb-1.5">
                    You Will Teach
                  </label>
                  <select
                    value={selectedYouTeach}
                    onChange={(e) => setSelectedYouTeach(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-white border border-indigo-200 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  >
                    {currentUser.teachingSkills.map((sk) => (
                      <option key={sk.id} value={sk.name}>
                        {sk.name} ({sk.level})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Arrow Icon */}
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-2xs border border-indigo-200 text-indigo-600 mt-5">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>

                {/* Peer Teaches */}
                <div className="flex-1">
                  <label className="block text-[11px] font-bold uppercase text-cyan-800 tracking-wider mb-1.5">
                    {peer.name.split(' ')[0]} Will Teach
                  </label>
                  <select
                    value={selectedPeerTeaches}
                    onChange={(e) => setSelectedPeerTeaches(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-white border border-cyan-200 rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                  >
                    {peer.teachingSkills.map((sk) => (
                      <option key={sk.id} value={sk.name}>
                        {sk.name} ({sk.level})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-indigo-100 flex items-center justify-between text-[11px] text-indigo-900 font-medium">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Equal 1:1 Reciprocal Barter
                </span>
                <span>0 Platform Fees</span>
              </div>
            </div>

            {/* Session Format / Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                <span>Session Duration Format</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Evenly divided time
                </span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { mins: 30, label: '30 min', desc: '15m / 15m' },
                  { mins: 45, label: '45 min', desc: '20m / 20m + 5m', popular: true },
                  { mins: 60, label: '60 min', desc: '25m / 25m + 10m' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.mins}
                    onClick={() => setDuration(item.mins)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      duration === item.mins
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold tabular-nums">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Proposed Availability Slot */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Select Proposed Schedule Slot
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {peer.availability.map((slot, sIdx) => (
                  <button
                    type="button"
                    key={sIdx}
                    onClick={() => setScheduledSlot(slot)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-all ${
                      scheduledSlot === slot
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Note / Goals */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Personal Learning Goal / Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                placeholder="What specific concept do you want to learn or focus on?"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                Send Swap Proposal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
