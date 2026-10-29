export type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Tech & Code' | 'Design & UX' | 'Data & Math' | 'Languages' | 'Business & Econ' | 'Sciences';
  level: SkillLevel;
  experienceMonths?: number;
  tags?: string[];
}

export interface SyllabusTopic {
  title: string;
  durationMinutes: number;
  description: string;
  learningOutcomes: string[];
}

export interface PeerReview {
  id: string;
  reviewerName: string;
  reviewerAvatar?: string;
  reviewerUniversity: string;
  rating: number;
  date: string;
  skillSwapped: string;
  comment: string;
}

export interface AvailabilitySlot {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  timeWindow: 'Morning (9am-12pm)' | 'Afternoon (1pm-5pm)' | 'Evening (6pm-9pm)';
}

export interface PeerStudent {
  id: string;
  name: string;
  avatar: string;
  university: string;
  major: string;
  graduationYear: string;
  bio: string;
  isOnline: boolean;
  teachingSkills: SkillItem[];
  learningSkills: SkillItem[];
  matchScore: number; // 0 - 100
  isMutualMatch: boolean; // Both students have complementary teach/learn pairs
  mutualReason: string; // Plain-text explanation of why they match
  rating: number;
  totalSwaps: number;
  hoursTaught: number;
  hoursLearned: number;
  sampleSyllabus: {
    skillName: string;
    overview: string;
    prerequisites: string;
    topics: SyllabusTopic[];
  };
  reviews: PeerReview[];
  availability: string[];
  availabilitySlots?: AvailabilitySlot[];
}

export interface SwapProposal {
  id: string;
  peerId: string;
  peerName: string;
  peerAvatar: string;
  peerUniversity: string;
  whatYouTeach: string;
  whatPeerTeaches: string;
  durationMinutes: number; // 30, 45, or 60
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  note?: string;
  createdAt: string;
  isOneWay?: boolean;
}

export interface ThreeWaySwapLoop {
  id: string;
  title: string;
  matchScore: number;
  participants: {
    studentA: { id: string; name: string; avatar: string; university: string }; // User
    studentB: { id: string; name: string; avatar: string; university: string }; // Peer B
    studentC: { id: string; name: string; avatar: string; university: string }; // Peer C
  };
  exchanges: {
    aTeachesB: string;
    bTeachesC: string;
    cTeachesA: string;
  };
  durationPerLegMinutes: number;
  explanation: string;
  status: 'available' | 'proposed' | 'active';
}

export interface SkillDemandMetric {
  skillName: string;
  category: 'Tech & Code' | 'Design & UX' | 'Data & Math' | 'Languages' | 'Business & Econ' | 'Sciences';
  learnersSeekingCount: number; // Demand
  teachersOfferingCount: number; // Supply
  demandRatio: number; // learners / teachers
  trend: 'surge' | 'steady' | 'balanced';
  bonusCreditMultiplier: number; // e.g. 1.5x credit bonus for teaching in-demand topics
}

export interface SessionHistoryRecord {
  id: string;
  peerName: string;
  peerAvatar: string;
  peerUniversity: string;
  date: string;
  type: 'reciprocal' | 'taught' | 'learned' | 'three_way';
  durationHours: number;
  skillTaught?: string;
  skillLearned?: string;
  ratingGiven?: number;
  ratingReceived?: number;
  reviewSnippet?: string;
  status: 'completed';
}

export interface CurrentUserProfile {
  name: string;
  avatar: string;
  university: string;
  major: string;
  graduationYear: string;
  bio: string;
  teachingSkills: SkillItem[];
  learningSkills: SkillItem[];
  availabilitySlots: AvailabilitySlot[];
  hoursTaught: number;
  hoursLearned: number;
  reputationBadge: string;
}
