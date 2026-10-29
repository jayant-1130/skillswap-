/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  BookOpen,
  Award,
  ArrowLeftRight,
  Plus,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  TrendingUp,
  History
} from 'lucide-react';
import {
  initialCurrentUser,
  initialPeers,
  initialProposals,
  initialMessages,
  initialThreeWayLoops,
  initialSkillDemand,
  initialSessionHistory
} from './data/mockData';
import {
  PeerStudent,
  CurrentUserProfile,
  SwapProposal,
  ThreeWaySwapLoop,
  SkillDemandMetric,
  SessionHistoryRecord,
  SkillItem
} from './types';
import { Header, NavTabType } from './components/Header';
import { PeerList } from './components/PeerList';
import { SwapQueuePanel } from './components/SwapQueuePanel';
import { SyllabusDrawer } from './components/SyllabusDrawer';
import { SwapRequestModal } from './components/SwapRequestModal';
import { LiveSessionRoom } from './components/LiveSessionRoom';
import { ProfileModal } from './components/ProfileModal';
import { MessageDrawer } from './components/MessageDrawer';
import { ReputationView } from './components/ReputationView';
import { ThreeWaySwapsView } from './components/ThreeWaySwapsView';
import { DemandInsightsView } from './components/DemandInsightsView';
import { SessionHistoryView } from './components/SessionHistoryView';
import { ProfileCompletenessCard } from './components/ProfileCompletenessCard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile>(() => {
    const saved = localStorage.getItem('skillswap_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [peers, setPeers] = useState<PeerStudent[]>(() => {
    const saved = localStorage.getItem('skillswap_peers');
    return saved ? JSON.parse(saved) : initialPeers;
  });

  const [proposals, setProposals] = useState<SwapProposal[]>(() => {
    const saved = localStorage.getItem('skillswap_proposals');
    return saved ? JSON.parse(saved) : initialProposals;
  });

  const [sessionHistory, setSessionHistory] = useState<SessionHistoryRecord[]>(() => {
    const saved = localStorage.getItem('skillswap_history');
    return saved ? JSON.parse(saved) : initialSessionHistory;
  });

  const [threeWayLoops, setThreeWayLoops] = useState<ThreeWaySwapLoop[]>(initialThreeWayLoops);
  const [skillDemand, setSkillDemand] = useState<SkillDemandMetric[]>(initialSkillDemand);
  const [messages, setMessages] = useState(initialMessages);

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<NavTabType>('peers');

  // Modals and Drawers
  const [selectedSyllabusPeer, setSelectedSyllabusPeer] = useState<PeerStudent | null>(null);
  const [selectedSwapModalPeer, setSelectedSwapModalPeer] = useState<PeerStudent | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [prefillTeachingSkill, setPrefillTeachingSkill] = useState<{
    name: string;
    category: SkillItem['category'];
  } | null>(null);
  const [activeChatPeer, setActiveChatPeer] = useState<PeerStudent | null>(null);

  // Live Room State
  const [activeSession, setActiveSession] = useState<SwapProposal | null>(
    initialProposals.find((p) => p.status === 'accepted') || null
  );

  // Persist critical state to localStorage
  useEffect(() => {
    localStorage.setItem('skillswap_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('skillswap_proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('skillswap_history', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  // Recalculate peer matches when user profile changes
  const handleUpdateProfile = (updatedProfile: CurrentUserProfile) => {
    setCurrentUser(updatedProfile);

    // Compute updated match score for each peer
    const updatedPeers = peers.map((peer) => {
      // Does peer teach what user wants?
      const peerTeachesWhatUserWants = peer.teachingSkills.some((ts) =>
        updatedProfile.learningSkills.some((ls) =>
          ts.name.toLowerCase().includes(ls.name.toLowerCase()) ||
          ls.name.toLowerCase().includes(ts.name.toLowerCase()) ||
          ts.category === ls.category
        )
      );

      // Does user teach what peer wants?
      const userTeachesWhatPeerWants = updatedProfile.teachingSkills.some((ts) =>
        peer.learningSkills.some((ls) =>
          ts.name.toLowerCase().includes(ls.name.toLowerCase()) ||
          ls.name.toLowerCase().includes(ts.name.toLowerCase()) ||
          ts.category === ls.category
        )
      );

      const isMutual = peerTeachesWhatUserWants && userTeachesWhatPeerWants;
      let score = 70;
      if (peerTeachesWhatUserWants) score += 12;
      if (userTeachesWhatPeerWants) score += 12;
      if (isMutual) score = Math.min(98, score + 4);

      let reason = '';
      if (isMutual) {
        reason = `Mutual Match: ${peer.name.split(' ')[0]} teaches what you seek & wants what you offer.`;
      } else if (peerTeachesWhatUserWants) {
        reason = `One-Way Mentor: ${peer.name.split(' ')[0]} can coach you using your barter credits.`;
      } else {
        reason = `Complementary peer in ${peer.major}.`;
      }

      return {
        ...peer,
        isMutualMatch: isMutual,
        matchScore: score,
        mutualReason: reason,
      };
    });

    setPeers(updatedPeers);
    localStorage.setItem('skillswap_peers', JSON.stringify(updatedPeers));
  };

  // Add new proposal
  const handleSubmitProposal = (newProposal: SwapProposal) => {
    setProposals([newProposal, ...proposals]);
  };

  // Accept a proposal
  const handleAcceptProposal = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'accepted' } : p))
    );
  };

  // Decline a proposal
  const handleDeclineProposal = (proposalId: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== proposalId));
  };

  // Enter Live Room
  const handleEnterRoom = (proposal: SwapProposal) => {
    setActiveSession(proposal);
    setCurrentTab('room');
  };

  // Complete a session & log to Session History
  const handleCompleteSession = (sessionHours: number) => {
    if (!activeSession) return;

    const newHistoryRecord: SessionHistoryRecord = {
      id: `hist-${Date.now()}`,
      peerName: activeSession.peerName,
      peerAvatar: activeSession.peerAvatar,
      peerUniversity: activeSession.peerUniversity,
      date: 'Today',
      type: 'reciprocal',
      durationHours: sessionHours,
      skillTaught: activeSession.whatYouTeach,
      skillLearned: activeSession.whatPeerTeaches,
      ratingGiven: 5,
      ratingReceived: 5,
      reviewSnippet: `Completed reciprocal swap with ${activeSession.peerName}. Mutual 5.0 endorsement logged.`,
      status: 'completed',
    };

    setSessionHistory([newHistoryRecord, ...sessionHistory]);

    setCurrentUser((prev) => ({
      ...prev,
      hoursTaught: prev.hoursTaught + sessionHours * 0.5,
      hoursLearned: prev.hoursLearned + sessionHours * 0.5,
    }));
  };

  // Direct Message Peer
  const handleOpenChat = (peer: PeerStudent) => {
    setActiveChatPeer(peer);
  };

  const handleOpenChatById = (peerId: string) => {
    const peer = peers.find((p) => p.id === peerId) || null;
    setActiveChatPeer(peer);
  };

  const handleSendMessage = (peerId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: currentUser.name,
      text,
      timestamp: 'Just now',
      isSelf: true,
    };
    setMessages((prev) => ({
      ...prev,
      [peerId]: [...(prev[peerId] || []), newMsg],
    }));
  };

  // Offer to teach from Demand Insights
  const handleOfferToTeachFromDemand = (skillName: string, category: SkillItem['category']) => {
    setPrefillTeachingSkill({ name: skillName, category });
    setIsProfileModalOpen(true);
  };

  // Propose three-way loop
  const handleProposeLoop = (loopId: string) => {
    setThreeWayLoops((prev) =>
      prev.map((l) => (l.id === loopId ? { ...l, status: 'proposed' } : l))
    );
  };

  const pendingCount = proposals.filter((p) => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        onOpenProfile={() => {
          setPrefillTeachingSkill(null);
          setIsProfileModalOpen(true);
        }}
        pendingCount={pendingCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {/* VIEW 1: PEERS DISCOVERY (Default) */}
        {currentTab === 'peers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Central matching viewport (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Profile Completeness Encouragement Widget */}
              <ProfileCompletenessCard
                currentUser={currentUser}
                onOpenProfile={() => {
                  setPrefillTeachingSkill(null);
                  setIsProfileModalOpen(true);
                }}
              />

              <PeerList
                peers={peers}
                onRequestSwap={(peer) => setSelectedSwapModalPeer(peer)}
                onPreviewSyllabus={(peer) => setSelectedSyllabusPeer(peer)}
                onMessagePeer={handleOpenChat}
              />
            </div>

            {/* Auxiliary Right-Hand Pane: Swap Queue & Reciprocity Meter */}
            <div className="lg:col-span-4 sticky top-24">
              <SwapQueuePanel
                proposals={proposals}
                currentUser={currentUser}
                onAcceptProposal={handleAcceptProposal}
                onDeclineProposal={handleDeclineProposal}
                onEnterRoom={handleEnterRoom}
                onMessagePeer={(peerId) => handleOpenChatById(peerId)}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: THREE-WAY SWAPS (Triangular Barter Loops) */}
        {currentTab === 'three_way' && (
          <ThreeWaySwapsView
            loops={threeWayLoops}
            currentUser={currentUser}
            onProposeLoop={handleProposeLoop}
          />
        )}

        {/* VIEW 3: DEMAND INSIGHTS (Campus Marketplace Trends) */}
        {currentTab === 'demand' && (
          <DemandInsightsView
            metrics={skillDemand}
            onOfferToTeach={handleOfferToTeachFromDemand}
          />
        )}

        {/* VIEW 4: MY SWAPS & INCOMING REQUESTS */}
        {currentTab === 'swaps' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                  My Active Swaps & Session Requests
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Accept or decline incoming requests, set meeting times, and enter live virtual study rooms.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('peers')}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20"
              >
                Find New Peer Partner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 space-y-4">
                <SwapQueuePanel
                  proposals={proposals}
                  currentUser={currentUser}
                  onAcceptProposal={handleAcceptProposal}
                  onDeclineProposal={handleDeclineProposal}
                  onEnterRoom={handleEnterRoom}
                  onMessagePeer={(peerId) => handleOpenChatById(peerId)}
                />
              </div>

              <div className="md:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    How Barter Exchange Protects Students
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unlike standard tutoring platforms, SkillSwap operates strictly on 1:1 reciprocity:
                  </p>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero Cash Out of Pocket:</strong> Your knowledge is your currency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Protégé Effect:</strong> Teaching others forces you to fill your own conceptual gaps.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Synchronized Timer:</strong> Roles switch automatically at the halfway mark.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                    Campus Barter Protocol
                  </span>
                  <h4 className="font-heading font-bold text-xs text-indigo-950">
                    Need More Learning Credits?
                  </h4>
                  <p className="text-xs text-indigo-900/80 leading-relaxed">
                    Check the <button onClick={() => setCurrentTab('demand')} className="font-bold underline text-indigo-700">Demand Insights</button> tab to see which skills grant up to 1.5x credit multipliers!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: SESSION HISTORY & BARTER LEDGER */}
        {currentTab === 'history' && (
          <SessionHistoryView
            history={sessionHistory}
            currentUser={currentUser}
          />
        )}

        {/* VIEW 6: LIVE STUDY ROOM SIMULATION */}
        {currentTab === 'room' && (
          <div>
            {activeSession ? (
              <LiveSessionRoom
                session={activeSession}
                currentUser={currentUser}
                onLeaveRoom={() => setCurrentTab('peers')}
                onCompleteSession={handleCompleteSession}
              />
            ) : (
              <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  No Active Study Session Selected
                </h3>
                <p className="text-xs text-slate-500">
                  Select a confirmed swap from your queue, or propose a new swap with a peer to launch the interactive study room.
                </p>
                <button
                  onClick={() => setCurrentTab('peers')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all"
                >
                  Browse Student Peers
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 7: REPUTATION & CREDITS */}
        {currentTab === 'reputation' && (
          <ReputationView
            currentUser={currentUser}
            onOpenProfile={() => {
              setPrefillTeachingSkill(null);
              setIsProfileModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Persistent 64px Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 flex items-center justify-around px-1 shadow-lg">
        <button
          onClick={() => setCurrentTab('peers')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
            currentTab === 'peers' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>Peers</span>
        </button>

        <button
          onClick={() => setCurrentTab('three_way')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
            currentTab === 'three_way' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <RotateCw className="w-4 h-4 mb-0.5" />
          <span>3-Way</span>
        </button>

        <button
          onClick={() => setCurrentTab('demand')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
            currentTab === 'demand' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          <span>Demand</span>
        </button>

        <button
          onClick={() => setCurrentTab('swaps')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
            currentTab === 'swaps' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Clock className="w-4 h-4 mb-0.5" />
          <span>Queue</span>
          {pendingCount > 0 && (
            <span className="absolute top-2 right-4 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setCurrentTab('history')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
            currentTab === 'history' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <History className="w-4 h-4 mb-0.5" />
          <span>Ledger</span>
        </button>
      </nav>

      {/* Syllabus Preview Drawer */}
      <SyllabusDrawer
        peer={selectedSyllabusPeer}
        onClose={() => setSelectedSyllabusPeer(null)}
        onRequestSwap={(peer) => {
          setSelectedSyllabusPeer(null);
          setSelectedSwapModalPeer(peer);
        }}
      />

      {/* Propose Swap Modal */}
      <SwapRequestModal
        peer={selectedSwapModalPeer}
        currentUser={currentUser}
        onClose={() => setSelectedSwapModalPeer(null)}
        onSubmitProposal={handleSubmitProposal}
      />

      {/* Edit Profile & Availability Modal */}
      <ProfileModal
        currentUser={currentUser}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setPrefillTeachingSkill(null);
        }}
        onSave={handleUpdateProfile}
        prefillSkill={prefillTeachingSkill}
      />

      {/* Direct Peer Message Drawer */}
      <MessageDrawer
        peer={activeChatPeer}
        currentUser={currentUser}
        messages={activeChatPeer ? messages[activeChatPeer.id] || [] : []}
        onClose={() => setActiveChatPeer(null)}
        onSendMessage={handleSendMessage}
        onOpenSwapModal={(peer) => {
          setActiveChatPeer(null);
          setSelectedSwapModalPeer(peer);
        }}
      />
    </div>
  );
}
