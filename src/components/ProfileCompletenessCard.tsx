import React from 'react';
import { CheckCircle2, Circle, Sparkles, ChevronRight, UserCheck } from 'lucide-react';
import { CurrentUserProfile } from '../types';

interface ProfileCompletenessCardProps {
  currentUser: CurrentUserProfile;
  onOpenProfile: () => void;
}

export const ProfileCompletenessCard: React.FC<ProfileCompletenessCardProps> = ({
  currentUser,
  onOpenProfile,
}) => {
  // Compute completeness criteria
  const hasAvatar = Boolean(currentUser.avatar);
  const hasBio = Boolean(currentUser.bio && currentUser.bio.length >= 20);
  const hasEnoughTeaching = currentUser.teachingSkills.length >= 2;
  const hasEnoughLearning = currentUser.learningSkills.length >= 2;
  const hasAvailability = Boolean(currentUser.availabilitySlots && currentUser.availabilitySlots.length >= 2);
  const hasAcademic = Boolean(currentUser.university && currentUser.major);

  const criteria = [
    { label: 'Academic profile (University & Major)', met: hasAcademic, weight: 15 },
    { label: 'Bio & learning philosophy', met: hasBio, weight: 15 },
    { label: 'At least 2 teaching skills listed', met: hasEnoughTeaching, weight: 20 },
    { label: 'At least 2 learning goals targeted', met: hasEnoughLearning, weight: 20 },
    { label: 'Weekly availability slots set', met: hasAvailability, weight: 15 },
    { label: 'Profile avatar', met: hasAvatar, weight: 15 },
  ];

  const totalScore = criteria.reduce((acc, curr) => acc + (curr.met ? curr.weight : 0), 0);
  const missingItems = criteria.filter((c) => !c.met);

  if (totalScore === 100) {
    return (
      <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-emerald-200/80 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              100%
            </div>
            <div>
              <div className="font-heading font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                All-Star Exchange Profile
              </div>
              <p className="text-[11px] text-slate-600">
                Your profile has maximum match discoverability across campus.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenProfile}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs tabular-nums border border-indigo-200">
            {totalScore}%
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900">
              Profile Strength
            </h4>
            <p className="text-[11px] text-slate-500">
              Complete your profile to unlock 3x more mutual matches
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          <span>Complete</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
          style={{ width: `${totalScore}%` }}
        />
      </div>

      {/* Next recommendation */}
      {missingItems.length > 0 && (
        <div className="text-[11px] text-slate-600 flex items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-indigo-700 font-semibold shrink-0">Next step:</span>
          <span className="truncate">{missingItems[0].label}</span>
        </div>
      )}
    </div>
  );
};
