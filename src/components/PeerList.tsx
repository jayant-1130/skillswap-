import React, { useState } from 'react';
import { Search, Sparkles, Filter, ArrowLeftRight, CheckCircle, Tag, UserCheck, HelpCircle } from 'lucide-react';
import { PeerStudent } from '../types';
import { PeerCard } from './PeerCard';

interface PeerListProps {
  peers: PeerStudent[];
  onRequestSwap: (peer: PeerStudent) => void;
  onPreviewSyllabus: (peer: PeerStudent) => void;
  onMessagePeer: (peer: PeerStudent) => void;
}

export const PeerList: React.FC<PeerListProps> = ({
  peers,
  onRequestSwap,
  onPreviewSyllabus,
  onMessagePeer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [matchMode, setMatchMode] = useState<'all' | 'mutual' | 'one_way'>('all');
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);

  const categories = [
    'All',
    'Tech & Code',
    'Design & UX',
    'Data & Math',
    'Languages',
    'Business & Econ',
    'Sciences',
  ];

  const popularSkills = [
    'PyTorch',
    'Figma',
    'React',
    'Tailwind',
    'French',
    'Game Theory',
    'Linear Algebra',
    'Organic Chemistry',
    'Python',
  ];

  // Filtering logic
  const filteredPeers = peers.filter((peer) => {
    // Search query matches name, university, skills taught, skills wanted, or skill tags
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      peer.name.toLowerCase().includes(query) ||
      peer.university.toLowerCase().includes(query) ||
      peer.major.toLowerCase().includes(query) ||
      peer.teachingSkills.some(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.tags?.some((t) => t.toLowerCase().includes(query))
      ) ||
      peer.learningSkills.some(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.tags?.some((t) => t.toLowerCase().includes(query))
      );

    // Category matches any skill taught or wanted
    const matchesCategory =
      selectedCategory === 'All' ||
      peer.teachingSkills.some((s) => s.category === selectedCategory) ||
      peer.learningSkills.some((s) => s.category === selectedCategory);

    // Match mode filter
    let matchesMode = true;
    if (matchMode === 'mutual') {
      matchesMode = peer.isMutualMatch && peer.matchScore >= 85;
    } else if (matchMode === 'one_way') {
      matchesMode = !peer.isMutualMatch;
    }

    // Online toggle
    const matchesOnline = !onlineOnly || peer.isOnline;

    return matchesSearch && matchesCategory && matchesMode && matchesOnline;
  });

  return (
    <div className="space-y-6">
      {/* Educational Concept Banner: Learn by Teaching */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-7 shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>The Protégé & Feynman Effect</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
            Exchange Knowledge. Master by Teaching.
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-xl">
            Students retain <span className="font-bold text-white underline decoration-cyan-400">90% of what they teach</span>. 
            Offer 20 minutes of your skill, and receive 20 minutes of 1-on-1 coaching from a peer in return. Zero cost, pure reciprocal barter.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-indigo-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              1:1 Reciprocal Time Barter
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Structured 45m Split Syllabi
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Mutual Verified Reviews
            </span>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Discovery Search Bar & Match Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill (PyTorch, Figma, French, React), name, or university..."
              className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/15 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Match Mode Selector */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setMatchMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  matchMode === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMatchMode('mutual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  matchMode === 'mutual'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Only peers where A teaches B and B teaches A"
              >
                <ArrowLeftRight className="w-3 h-3" />
                <span>Mutual Matches (90%+)</span>
              </button>
              <button
                onClick={() => setMatchMode('one_way')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  matchMode === 'one_way'
                    ? 'bg-cyan-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Peers who can teach you using accumulated credits"
              >
                One-Way Mentors
              </button>
            </div>

            {/* Online Now Toggle */}
            <button
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={`h-11 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                onlineOnly
                  ? 'bg-indigo-50 text-indigo-900 border-indigo-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlineOnly ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="hidden sm:inline">Live on Campus</span>
            </button>
          </div>
        </div>

        {/* Search by Skill quick chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Popular Skills:
          </span>
          {popularSkills.map((sk) => (
            <button
              key={sk}
              onClick={() => setSearchQuery(sk)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors shrink-0 ${
                searchQuery.toLowerCase() === sk.toLowerCase()
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/60'
              }`}
            >
              {sk}
            </button>
          ))}
        </div>

        {/* Category Filter Pills / Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Discipline:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results Header with Match count and explanation indicator */}
      <div className="flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredPeers.length}</span> peer partners ready for exchange
        </div>
        {matchMode === 'mutual' && (
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Filtered: 100% Reciprocal Pairs (Both Teach & Learn)
          </span>
        )}
        {matchMode === 'one_way' && (
          <span className="text-cyan-800 font-semibold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200/60">
            Filtered: One-Way Mentors (Redeem with Credits)
          </span>
        )}
      </div>

      {/* Peer Cards Grid */}
      {filteredPeers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-900">
            No matching student peers found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, clearing filters, or adding more skills you can teach in your profile.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setMatchMode('all');
              setOnlineOnly(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPeers.map((peer) => (
            <PeerCard
              key={peer.id}
              peer={peer}
              onRequestSwap={onRequestSwap}
              onPreviewSyllabus={onPreviewSyllabus}
              onMessagePeer={onMessagePeer}
            />
          ))}
        </div>
      )}
    </div>
  );
};
