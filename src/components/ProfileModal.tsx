import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Sparkles, BookOpen, GraduationCap, Check, Calendar, Clock } from 'lucide-react';
import { CurrentUserProfile, SkillItem, SkillLevel, AvailabilitySlot } from '../types';
import { SkillBadge } from './SkillBadge';

interface ProfileModalProps {
  currentUser: CurrentUserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: CurrentUserProfile) => void;
  prefillSkill?: { name: string; category: SkillItem['category'] } | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onSave,
  prefillSkill,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(currentUser.name);
  const [university, setUniversity] = useState(currentUser.university);
  const [major, setMajor] = useState(currentUser.major);
  const [bio, setBio] = useState(currentUser.bio);

  const [teachingSkills, setTeachingSkills] = useState<SkillItem[]>([
    ...currentUser.teachingSkills,
  ]);
  const [learningSkills, setLearningSkills] = useState<SkillItem[]>([
    ...currentUser.learningSkills,
  ]);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([
    ...(currentUser.availabilitySlots || []),
  ]);

  // Form states for adding new skill
  const [newTeachName, setNewTeachName] = useState(prefillSkill?.name || '');
  const [newTeachLevel, setNewTeachLevel] = useState<SkillLevel>('Intermediate');
  const [newTeachCategory, setNewTeachCategory] = useState<SkillItem['category']>(
    prefillSkill?.category || 'Tech & Code'
  );

  const [newLearnName, setNewLearnName] = useState('');
  const [newLearnLevel, setNewLearnLevel] = useState<SkillLevel>('Beginner');
  const [newLearnCategory, setNewLearnCategory] = useState<SkillItem['category']>('Design & UX');

  // Availability adder state
  const [selectedDay, setSelectedDay] = useState<AvailabilitySlot['day']>('Mon');
  const [selectedTimeWindow, setSelectedTimeWindow] = useState<AvailabilitySlot['timeWindow']>(
    'Evening (6pm-9pm)'
  );

  useEffect(() => {
    if (prefillSkill) {
      setNewTeachName(prefillSkill.name);
      setNewTeachCategory(prefillSkill.category);
    }
  }, [prefillSkill]);

  const handleAddTeaching = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeachName.trim()) return;
    const item: SkillItem = {
      id: `t-${Date.now()}`,
      name: newTeachName.trim(),
      level: newTeachLevel,
      category: newTeachCategory,
      experienceMonths: 12,
    };
    setTeachingSkills([...teachingSkills, item]);
    setNewTeachName('');
  };

  const handleRemoveTeaching = (id: string) => {
    setTeachingSkills(teachingSkills.filter((s) => s.id !== id));
  };

  const handleAddLearning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLearnName.trim()) return;
    const item: SkillItem = {
      id: `l-${Date.now()}`,
      name: newLearnName.trim(),
      level: newLearnLevel,
      category: newLearnCategory,
    };
    setLearningSkills([...learningSkills, item]);
    setNewLearnName('');
  };

  const handleRemoveLearning = (id: string) => {
    setLearningSkills(learningSkills.filter((s) => s.id !== id));
  };

  const handleAddSlot = () => {
    const exists = availabilitySlots.some(
      (s) => s.day === selectedDay && s.timeWindow === selectedTimeWindow
    );
    if (!exists) {
      setAvailabilitySlots([...availabilitySlots, { day: selectedDay, timeWindow: selectedTimeWindow }]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    setAvailabilitySlots(availabilitySlots.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      ...currentUser,
      name,
      university,
      major,
      bio,
      teachingSkills,
      learningSkills,
      availabilitySlots,
    });
    onClose();
  };

  // Profile completeness live calculation
  const completeness = Math.min(
    100,
    (name ? 15 : 0) +
      (bio.length >= 20 ? 15 : 0) +
      (teachingSkills.length >= 2 ? 20 : teachingSkills.length * 10) +
      (learningSkills.length >= 2 ? 20 : learningSkills.length * 10) +
      (availabilitySlots.length >= 2 ? 15 : availabilitySlots.length * 7) +
      (university && major ? 15 : 0)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  Edit Exchange Profile & Availability
                </h2>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 tabular-nums">
                  {completeness}% Complete
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Updating your skills and schedule recalculates mutual matches in real time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                University / Institution
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Major & Field of Study
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bio & Study Style
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
              />
            </div>
          </div>

          {/* Section: Skills I Can Teach */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Skills I Can Teach (Offers)
              </span>
              <span className="text-[11px] text-indigo-700 font-medium">
                {teachingSkills.length} listed
              </span>
            </div>

            {/* List */}
            <div className="space-y-2">
              {teachingSkills.map((sk) => (
                <div
                  key={sk.id}
                  className="bg-white p-2.5 rounded-lg border border-indigo-100 flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {sk.name}
                    </span>
                    <SkillBadge level={sk.level} />
                    <span className="text-[11px] text-slate-400">
                      · {sk.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveTeaching(sk.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleAddTeaching} className="flex flex-wrap items-center gap-2 pt-2">
              <input
                type="text"
                value={newTeachName}
                onChange={(e) => setNewTeachName(e.target.value)}
                placeholder="Skill name (e.g. PyTorch, French, React...)"
                className="flex-1 min-w-[160px] text-xs text-slate-800 bg-white border border-indigo-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <select
                value={newTeachLevel}
                onChange={(e) => setNewTeachLevel(e.target.value as SkillLevel)}
                className="text-xs text-slate-700 bg-white border border-indigo-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              <select
                value={newTeachCategory}
                onChange={(e) => setNewTeachCategory(e.target.value as SkillItem['category'])}
                className="text-xs text-slate-700 bg-white border border-indigo-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Tech & Code">Tech & Code</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Data & Math">Data & Math</option>
                <option value="Languages">Languages</option>
                <option value="Business & Econ">Business & Econ</option>
                <option value="Sciences">Sciences</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </form>
          </div>

          {/* Section: Skills I Want to Learn */}
          <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                Skills I Want to Learn (Requests)
              </span>
              <span className="text-[11px] text-cyan-700 font-medium">
                {learningSkills.length} listed
              </span>
            </div>

            {/* List */}
            <div className="space-y-2">
              {learningSkills.map((sk) => (
                <div
                  key={sk.id}
                  className="bg-white p-2.5 rounded-lg border border-cyan-100 flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {sk.name}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                      Target: {sk.level}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      · {sk.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveLearning(sk.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleAddLearning} className="flex flex-wrap items-center gap-2 pt-2">
              <input
                type="text"
                value={newLearnName}
                onChange={(e) => setNewLearnName(e.target.value)}
                placeholder="Skill to learn (e.g. Econometrics, SwiftUI...)"
                className="flex-1 min-w-[160px] text-xs text-slate-800 bg-white border border-cyan-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <select
                value={newLearnLevel}
                onChange={(e) => setNewLearnLevel(e.target.value as SkillLevel)}
                className="text-xs text-slate-700 bg-white border border-cyan-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </form>
          </div>

          {/* Section: Meeting Availability Slots (Days & Times) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Meeting Availability Schedule
              </span>
              <span className="text-[11px] text-slate-500">
                {availabilitySlots.length} windows set
              </span>
            </div>

            {/* Configured Slots */}
            <div className="flex flex-wrap gap-2">
              {availabilitySlots.map((slot, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 shadow-2xs"
                >
                  <span className="font-bold text-indigo-700">{slot.day}</span>
                  <span className="text-slate-600">{slot.timeWindow}</span>
                  <button
                    onClick={() => handleRemoveSlot(sIdx)}
                    className="text-slate-400 hover:text-red-500 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Slot Adder Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value as AvailabilitySlot['day'])}
                className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                value={selectedTimeWindow}
                onChange={(e) =>
                  setSelectedTimeWindow(e.target.value as AvailabilitySlot['timeWindow'])
                }
                className="text-xs text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Morning (9am-12pm)">Morning (9am-12pm)</option>
                <option value="Afternoon (1pm-5pm)">Afternoon (1pm-5pm)</option>
                <option value="Evening (6pm-9pm)">Evening (6pm-9pm)</option>
              </select>

              <button
                type="button"
                onClick={handleAddSlot}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Availability
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            Save Profile & Recalculate Matches
          </button>
        </div>
      </div>
    </div>
  );
};
