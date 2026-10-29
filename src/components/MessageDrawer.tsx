import React, { useState } from 'react';
import { X, Send, Calendar, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { PeerStudent, CurrentUserProfile } from '../types';

interface MessageDrawerProps {
  peer: PeerStudent | null;
  currentUser: CurrentUserProfile;
  messages: { id: string; senderName: string; text: string; timestamp: string; isSelf: boolean }[];
  onClose: () => void;
  onSendMessage: (peerId: string, text: string) => void;
  onOpenSwapModal: (peer: PeerStudent) => void;
}

export const MessageDrawer: React.FC<MessageDrawerProps> = ({
  peer,
  currentUser,
  messages,
  onClose,
  onSendMessage,
  onOpenSwapModal,
}) => {
  if (!peer) return null;

  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(peer.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  referrerPolicy="no-referrer"
                />
                {peer.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900 leading-none">
                  {peer.name}
                </h3>
                <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">
                  {peer.university}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenSwapModal(peer);
                }}
                className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1 border border-indigo-200/60"
                title="Propose swap with this peer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Swap</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Context Bar */}
          <div className="px-4 py-2 bg-indigo-50/40 border-b border-indigo-100/60 flex items-center justify-between text-[11px] text-slate-600">
            <span className="text-indigo-800 font-medium">
              Mutual match: {peer.matchScore}%
            </span>
            <span className="text-slate-500">
              Teaches {peer.teachingSkills[0]?.name}
            </span>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No messages yet. Say hello and suggest a lesson exchange!
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                      msg.isSelf
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${peer.name.split(' ')[0]}...`}
              className="flex-1 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-xl transition-all shadow-sm shadow-indigo-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
