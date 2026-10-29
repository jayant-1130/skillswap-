import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Share2,
  CheckCircle2,
  Award,
  Star,
  Sparkles,
  ArrowLeftRight,
  Code2,
  FileText,
  Send,
  X,
  Volume2
} from 'lucide-react';
import { SwapProposal, CurrentUserProfile } from '../types';

interface LiveSessionRoomProps {
  session: SwapProposal;
  currentUser: CurrentUserProfile;
  onLeaveRoom: () => void;
  onCompleteSession: (hours: number) => void;
}

export const LiveSessionRoom: React.FC<LiveSessionRoomProps> = ({
  session,
  currentUser,
  onLeaveRoom,
  onCompleteSession,
}) => {
  // Timer state (seconds)
  // 45 min default: 20 min Phase 1 (1200s), 20 min Phase 2 (1200s), 5 min Recap (300s) = 2700s
  // For demonstration, let's start at a high interactive value with quick skip buttons!
  const totalPhaseTime = 20 * 60; // 20 mins
  const [secondsLeft, setSecondsLeft] = useState(1185); // 19:45
  const [isRunning, setIsRunning] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1); // 1: Peer teaches, 2: You teach, 3: Recap

  // Media states
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<'notes' | 'agenda' | 'code'>('notes');

  // Shared notes
  const [sharedNotes, setSharedNotes] = useState(
    `# Session: ${session.whatPeerTeaches} ⇄ ${session.whatYouTeach}\n\n` +
    `## Part 1: ${session.peerName} Teaching ${session.whatPeerTeaches}\n` +
    `- Key concept: Token architecture variables & modes.\n` +
    `- Don't decouple components; map variant properties to boolean toggles.\n\n` +
    `## Part 2: ${currentUser.name} Teaching ${session.whatYouTeach}\n` +
    `- Spring physics damping ratios in Tailwind.\n` +
    `- Responsive layout breakpoints & clamp() font scaling.`
  );

  // Code editor snippet
  const [codeSnippet, setCodeSnippet] = useState(
    `// Interactive Reciprocal Exercise Sandbox\n` +
    `// Topic: ${session.whatPeerTeaches}\n\n` +
    `export const designTokens = {\n` +
    `  primary: '#6366F1',\n` +
    `  surfaceMuted: '#F1F5F9',\n` +
    `  radius: '0.75rem',\n` +
    `  elevation: '0 4px 12px rgba(99, 102, 241, 0.08)'\n` +
    `};\n\n` +
    `console.log("Tokens ready for live injection into Tailwind theme!");`
  );

  // Agenda checklist
  const [agenda, setAgenda] = useState([
    { id: 1, text: `${session.peerName}: Core principles & anatomy`, done: true, phase: 1 },
    { id: 2, text: `${session.peerName}: Live walkthrough & exercise`, done: false, phase: 1 },
    { id: 3, text: `Role Switch: 20-min reciprocal teaching interval`, done: false, phase: 2 },
    { id: 4, text: `${currentUser.name}: Deep dive on ${session.whatYouTeach}`, done: false, phase: 2 },
    { id: 5, text: `Mutual Q&A & verified barter credit stamp`, done: false, phase: 3 },
  ]);

  // Review & Rating Modal state
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState(
    `Incredible reciprocal exchange! ${session.peerName} explained the concepts with total clarity and was super engaged when I taught ${session.whatYouTeach}.`
  );

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (currentPhase === 1) {
        setCurrentPhase(2);
        setSecondsLeft(20 * 60);
      } else if (currentPhase === 2) {
        setCurrentPhase(3);
        setSecondsLeft(5 * 60);
      } else {
        setShowCompletionModal(true);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, currentPhase]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleAgenda = (id: number) => {
    setAgenda((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleSwitchPhase = (targetPhase: 1 | 2 | 3) => {
    setCurrentPhase(targetPhase);
    setSecondsLeft(targetPhase === 3 ? 5 * 60 : 20 * 60);
  };

  const handleFinishAndSubmit = () => {
    onCompleteSession(session.durationMinutes / 60);
    setShowCompletionModal(false);
    onLeaveRoom();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onLeaveRoom}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Leave room"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="border-l border-slate-800 pl-3">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-white">
                Live Study Room: {session.peerName} ⇄ {currentUser.name}
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Barter
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {session.whatPeerTeaches} ⇄ {session.whatYouTeach}
            </p>
          </div>
        </div>

        {/* Phase Indicator & Reciprocal Timer */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-1.5 rounded-xl">
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
              {currentPhase === 1 && `Phase 1: ${session.peerName.split(' ')[0]} Teaches`}
              {currentPhase === 2 && `Phase 2: You Teach ${session.whatYouTeach}`}
              {currentPhase === 3 && `Phase 3: Mutual Q&A & Verification`}
            </span>
            <span className="font-mono text-lg font-bold text-white tabular-nums tracking-wider">
              {formatTime(secondsLeft)}
            </span>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
              title={isRunning ? 'Pause timer' : 'Resume timer'}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSecondsLeft(15)}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-amber-400 rounded-lg transition-colors text-[10px] font-bold"
              title="Fast-forward to next phase (demo)"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Quick Phase Buttons & Finish Action */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => handleSwitchPhase(1)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentPhase === 1 ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Phase 1 (Peer)
            </button>
            <button
              onClick={() => handleSwitchPhase(2)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentPhase === 2 ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Phase 2 (You)
            </button>
            <button
              onClick={() => handleSwitchPhase(3)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentPhase === 3 ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Phase 3 (Recap)
            </button>
          </div>

          <button
            onClick={() => setShowCompletionModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish Swap</span>
          </button>
        </div>
      </header>

      {/* Main Study Stage Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Video / Peer Visual Zone (4 cols on desktop) */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-slate-950 p-4 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            {/* Peer Video Tile */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-4/3 flex items-center justify-center shadow-lg group">
              <img
                src={session.peerAvatar}
                alt={session.peerName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Peer label */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-white drop-shadow-xs">
                    {session.peerName}
                  </span>
                  <span className="text-[10px] text-slate-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {session.peerUniversity}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Active Speaker Ring */}
              {currentPhase === 1 && (
                <div className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Teaching: {session.whatPeerTeaches}</span>
                </div>
              )}
            </div>

            {/* Self Video Tile */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-4/3 flex items-center justify-center shadow-md">
              {isVideoOn ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                    {currentUser.name[0]}
                  </div>
                  <span className="text-xs text-slate-500">Camera Off</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-white">
                    {currentUser.name} (You)
                  </span>
                  {isMuted && (
                    <span className="text-red-400 bg-red-950/60 p-0.5 rounded">
                      <MicOff className="w-3 h-3" />
                    </span>
                  )}
                </div>
                {currentPhase === 2 && (
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    Your Turn to Teach!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* AV Controls Dock */}
          <div className="flex items-center justify-center gap-3 p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-xl transition-all ${
                isMuted ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-xl transition-all ${
                !isVideoOn ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title={isVideoOn ? 'Turn camera off' : 'Turn camera on'}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3 rounded-xl transition-all ${
                isScreenSharing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title="Share screen"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Collaborative Workspace (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-slate-900 flex flex-col justify-between overflow-hidden">
          {/* Workspace Tabs Header */}
          <div className="h-12 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'notes' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Shared Notes & Whiteboard</span>
              </button>

              <button
                onClick={() => setActiveTab('agenda')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'agenda' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lesson Agenda ({agenda.filter((a) => a.done).length}/{agenda.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  activeTab === 'code' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interactive Code Sandbox</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-medium">
              Synchronized peer session
            </div>
          </div>

          {/* Workspace Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'notes' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    Live Markdown Scratchpad (Autosaved)
                  </span>
                  <span>Both students can edit simultaneously</span>
                </div>
                <textarea
                  value={sharedNotes}
                  onChange={(e) => setSharedNotes(e.target.value)}
                  className="flex-1 w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-4 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
                  placeholder="Take live notes together..."
                />
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="max-w-2xl mx-auto space-y-4 py-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="font-heading font-bold text-sm text-white mb-1">
                    Lesson Milestone Checklist
                  </h3>
                  <p className="text-xs text-slate-400">
                    Check items off as you teach and comprehend each segment.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {agenda.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleAgenda(item.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        item.done
                          ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            item.done ? 'bg-emerald-600 text-white' : 'border border-slate-600'
                          }`}
                        >
                          {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className={`text-xs font-medium ${item.done ? 'line-through text-slate-400' : ''}`}>
                          {item.text}
                        </span>
                      </div>

                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Phase {item.phase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    Interactive Live Code Sandbox
                  </span>
                  <span className="text-emerald-400">JavaScript / TypeScript Sandbox Active</span>
                </div>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  className="flex-1 w-full bg-slate-950 text-emerald-300 border border-slate-800 rounded-xl p-4 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-none selection:bg-cyan-900"
                />
              </div>
            )}
          </div>

          {/* Quick Chat Strip at bottom of workspace */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/70 flex items-center gap-3">
            <span className="text-xs text-slate-400 shrink-0">Quick Chat:</span>
            <input
              type="text"
              placeholder={`Send message to ${session.peerName}...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  e.currentTarget.value = '';
                }
              }}
            />
            <button className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Completion & Verification Review Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Swap Completed!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                You and {session.peerName} exchanged {session.durationMinutes} minutes of reciprocal learning.
              </p>
            </div>

            {/* Credit Transaction Receipt */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-700">
                <span>Credit Ledger Update:</span>
                <span className="text-emerald-700 font-bold">+{(session.durationMinutes / 60).toFixed(1)}h Barter Credit</span>
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                SkillSwap automatically balances learning debt: 1 hour taught gives you 1 hour of free 1-on-1 coaching.
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Rate {session.peerName}'s Teaching Clarity:
              </label>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-current text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Peer Feedback Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Verified Peer Feedback (Visible on their syllabus)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCompletionModal(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Back to Session
              </button>
              <button
                type="button"
                onClick={handleFinishAndSubmit}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20"
              >
                Sign Off & Collect Hours
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
