import React, { useState } from 'react';
import {
  Users, UserPlus, MessageCircle, Search, ShieldCheck, Zap, X,
  Check, Bell, Send, ChevronRight, Globe, Award, Filter
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Member {
  id: number;
  name: string;
  role: string;
  skills: string[];
  experience: 'Beginner' | 'Intermediate' | 'Pro' | 'Elite';
  lookingFor: string;
  avatar: string;
  sport?: string;
  type: 'individual' | 'team';
  teamName?: string;
  online?: boolean;
  connected?: boolean;
}

interface CreateTeamForm {
  teamName: string;
  sport: string;
  need: string;
  description: string;
}

interface StatusForm {
  role: string;
  lookingFor: string;
}

// ── Static Data ────────────────────────────────────────────────────────────
const ALL_MEMBERS: Member[] = [
  { id: 1, name: 'Elena Rostova', role: 'Frontend Engineer', skills: ['React', 'UI/UX', 'Tailwind'], experience: 'Pro', lookingFor: 'Hackathon Team', avatar: 'ER', sport: 'Engineers', type: 'individual', online: true },
  { id: 2, name: 'Marcus Vane', role: 'Data Scientist', skills: ['Python', 'PyTorch', 'SQL'], experience: 'Elite', lookingFor: 'Kaggle Competition', avatar: 'MV', sport: 'Engineers', type: 'individual', online: false },
  { id: 3, name: 'Code Crushers', role: 'Team — Looking for Backend Dev', skills: ['Node.js', 'PostgreSQL', 'Docker'], experience: 'Pro', lookingFor: 'Backend Developer', avatar: 'CC', sport: 'Teams Looking for Members', type: 'team', teamName: 'Global AI Hackathon 2024', online: true },
  { id: 4, name: 'Sarah Chen', role: 'Product Designer', skills: ['Figma', 'Prototyping', 'User Research'], experience: 'Intermediate', lookingFor: 'Hackathon Team', avatar: 'SC', sport: 'Designers', type: 'individual', online: true },
  { id: 5, name: 'Dev Squad Alpha', role: 'Team — Looking for Frontend Dev', skills: ['Vue.js', 'Django', 'Redis'], experience: 'Elite', lookingFor: 'UI/UX Designer', avatar: 'DS', sport: 'Teams Looking for Members', type: 'team', teamName: 'SportsTech Summit', online: false },
  { id: 6, name: 'James Kim', role: 'Full-Stack Developer', skills: ['Next.js', 'Go', 'MongoDB'], experience: 'Pro', lookingFor: 'Looking for Teams', avatar: 'JK', sport: 'Engineers', type: 'individual', online: true },
  { id: 7, name: 'Anika Sharma', role: 'UX Researcher', skills: ['Maze', 'Dovetail', 'Personas'], experience: 'Intermediate', lookingFor: 'Hackathon Team', avatar: 'AS', sport: 'Designers', type: 'individual', online: false },
  { id: 8, name: 'Pixel Pioneers', role: 'Team — Looking for Data Scientist', skills: ['React Native', 'FastAPI', 'AWS'], experience: 'Elite', lookingFor: 'ML Engineer', avatar: 'PP', sport: 'Teams Looking for Members', type: 'team', teamName: 'National App Challenge', online: true },
];

const FILTER_TABS = ['All', 'Looking for Teams', 'Teams Looking for Members', 'Designers', 'Engineers'];
const SPORTS = ['Basketball', 'Soccer', 'Tennis', 'Gaming', 'E-Sports', 'Coding'];
const EXPERIENCE_COLORS: Record<string, string> = {
  Beginner: 'bg-outline/20 text-outline',
  Intermediate: 'bg-secondary/15 text-secondary',
  Pro: 'bg-primary/15 text-primary',
  Elite: 'bg-tertiary/15 text-tertiary',
};

// ── Message Modal ──────────────────────────────────────────────────────────
const MessageModal = ({ member, onClose }: { member: Member; onClose: () => void }) => {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setSent(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-5 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-black text-secondary font-headline">
              {member.avatar}
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface">{member.name}</h3>
              <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">{member.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>
        {sent ? (
          <div className="p-10 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center">
              <Check className="w-8 h-8 text-secondary" />
            </div>
            <p className="font-headline font-bold uppercase tracking-wider text-on-surface">Message Sent!</p>
            <p className="text-sm text-on-surface-variant">Your connection request has been sent to {member.name}.</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-5 space-y-4">
            <div className="bg-surface-container rounded-xl p-3 text-sm text-on-surface-variant font-label">
              💡 Tip: Introduce yourself and mention what you're looking for to increase response rates.
            </div>
            <textarea
              required
              rows={4}
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder={`Hi ${member.name.split(' ')[0]}, I noticed your profile and think we'd work well together for...`}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-4 text-on-surface text-sm focus:outline-none focus:border-secondary transition-colors resize-none font-body"
            />
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-background rounded-xl font-headline font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// ── Create Team Modal ──────────────────────────────────────────────────────
const CreateTeamModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [form, setForm] = useState<CreateTeamForm>({ teamName: '', sport: '', need: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/20">
          <div>
            <p className="text-[10px] text-primary font-label font-bold uppercase tracking-widest">Create</p>
            <h3 className="font-headline font-black text-xl uppercase italic text-on-surface">New Team</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-label font-bold uppercase tracking-widest text-outline">Team Name</label>
            <input
              required
              value={form.teamName}
              onChange={e => setForm({ ...form, teamName: e.target.value })}
              placeholder="e.g. Neon Strikers"
              className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-label font-bold uppercase tracking-widest text-outline">Sport / Domain</label>
            <select
              required
              value={form.sport}
              onChange={e => setForm({ ...form, sport: e.target.value })}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">Select...</option>
              {SPORTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-label font-bold uppercase tracking-widest text-outline">Looking For</label>
            <input
              required
              value={form.need}
              onChange={e => setForm({ ...form, need: e.target.value })}
              placeholder="e.g. Backend Developer, Data Scientist..."
              className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-label font-bold uppercase tracking-widest text-outline">Team Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your team's goals and what you're building..."
              className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 kinetic-gradient text-background rounded-xl font-headline font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(202,253,0,0.3)] transition-all active:scale-95"
          >
            Create Team
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ── Member Card ─────────────────────────────────────────────────────────────
const MemberCard = ({
  member,
  onConnect,
  onMessage,
}: {
  key?: React.Key;
  member: Member;
  onConnect: (id: number) => void;
  onMessage: (m: Member) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    layout
    className="bg-surface-container-low border border-outline-variant/10 p-5 rounded-2xl hover:border-secondary/40 transition-all group flex gap-5"
  >
    {/* Avatar */}
    <div className="relative shrink-0">
      <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-2xl font-black font-headline text-secondary">
        {member.avatar}
      </div>
      {member.online && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface-container-low" title="Online" />
      )}
    </div>

    {/* Body */}
    <div className="flex-grow min-w-0">
      <div className="flex justify-between items-start mb-1 gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-headline font-bold group-hover:text-secondary transition-colors truncate">
            {member.name}
            {member.experience === 'Elite' && <ShieldCheck className="inline w-4 h-4 text-primary ml-1.5 mb-0.5" />}
          </h3>
          <p className="text-xs text-on-surface-variant truncate">{member.role}</p>
        </div>
        <span className={cn('text-[10px] font-label font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0', EXPERIENCE_COLORS[member.experience])}>
          {member.experience}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3 mt-2">
        {member.skills.map(s => (
          <span key={s} className="bg-surface-container-highest px-2 py-0.5 rounded text-[10px] font-bold font-label uppercase tracking-widest text-on-surface-variant">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 text-xs text-on-surface-variant mb-1">
        <Zap className="w-3 h-3 text-secondary flex-shrink-0" />
        <span className="truncate">{member.lookingFor}</span>
      </div>
      {member.teamName && (
        <div className="flex items-center gap-1 text-[11px] text-primary font-bold mb-2">
          <Globe className="w-3 h-3" />
          <span className="truncate">Target: {member.teamName}</span>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onConnect(member.id)}
          className={cn(
            'flex-grow py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95',
            member.connected
              ? 'bg-secondary/10 text-secondary border border-secondary/30 cursor-default'
              : 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-background'
          )}
        >
          {member.connected ? <><Check className="w-3.5 h-3.5" /> Connected</> : <><UserPlus className="w-3.5 h-3.5" /> Connect</>}
        </button>
        <button
          onClick={() => onMessage(member)}
          className="px-3 py-2 bg-surface-container-highest rounded-lg text-on-surface-variant hover:bg-surface-bright hover:text-on-surface transition-colors"
          title="Send message"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

// ── Main Component ──────────────────────────────────────────────────────────
export const TeamBuilder = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>(ALL_MEMBERS);
  const [messagingMember, setMessagingMember] = useState<Member | null>(null);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [statusForm, setStatusForm] = useState<StatusForm>({ role: '', lookingFor: '' });

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleConnect = (id: number) => {
    setMembers(prev =>
      prev.map(m => m.id === id && !m.connected ? { ...m, connected: true } : m)
    );
    const member = members.find(m => m.id === id);
    if (member && !member.connected) showToast(`Connected with ${member.name}!`);
  };

  const filteredMembers = members.filter(m => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Looking for Teams' && m.type === 'individual') ||
      (filter === 'Teams Looking for Members' && m.type === 'team') ||
      m.sport === filter;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.skills.some(s => s.toLowerCase().includes(q)) ||
      m.lookingFor.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const connectedCount = members.filter(m => m.connected).length;

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">

      {/* Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-secondary text-background px-6 py-3 rounded-full font-headline font-bold uppercase tracking-wider text-sm shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {successToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">Network &amp; Collaborate</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter uppercase italic">
            Team Builder
          </h2>
          <p className="text-on-surface-variant text-sm mt-2">
            {connectedCount > 0 ? `${connectedCount} connection${connectedCount > 1 ? 's' : ''} made` : 'Find teammates for your next big challenge'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateTeam(true)}
            className="px-5 py-3 bg-surface-container-highest rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/30 text-on-surface"
          >
            <Users className="w-4 h-4" /> Create Team
          </button>
          <button
            onClick={() => setShowStatusModal(true)}
            className="px-5 py-3 kinetic-gradient text-background rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.2)]"
          >
            <UserPlus className="w-4 h-4" /> Update My Status
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search for skills, people, or teams..."
          className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:border-secondary transition-colors text-sm"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {FILTER_TABS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all',
              filter === f
                ? 'bg-secondary text-background shadow-[0_0_10px_rgba(0,238,252,0.25)]'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant -mt-4">
        {filteredMembers.length} result{filteredMembers.length !== 1 ? 's' : ''}
        {filter !== 'All' && ` in "${filter}"`}
        {searchQuery && ` for "${searchQuery}"`}
      </p>

      {/* Cards */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-16 h-16 mx-auto mb-4 text-on-surface-variant opacity-20" />
          <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-on-surface-variant">No results found</h3>
          <p className="text-sm text-on-surface-variant mt-2">Try different keywords or clear your filters.</p>
          <button onClick={() => { setSearchQuery(''); setFilter('All'); }} className="mt-4 text-secondary text-sm font-bold hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map(m => (
              <MemberCard
                key={m.id}
                member={m}
                onConnect={handleConnect}
                onMessage={setMessagingMember}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {messagingMember && (
          <MessageModal member={messagingMember} onClose={() => setMessagingMember(null)} />
        )}
        {showCreateTeam && (
          <CreateTeamModal
            onClose={() => setShowCreateTeam(false)}
            onSuccess={() => showToast('Team created successfully!')}
          />
        )}
        {showStatusModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowStatusModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-2xl p-6 space-y-5"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-headline font-black text-xl uppercase italic text-on-surface">Update Status</h3>
                <button onClick={() => setShowStatusModal(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X className="w-5 h-5 text-on-surface-variant" />
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label font-bold uppercase tracking-widest text-outline">My Role</label>
                <input
                  value={statusForm.role}
                  onChange={e => setStatusForm({ ...statusForm, role: e.target.value })}
                  placeholder="e.g. Full-Stack Developer"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label font-bold uppercase tracking-widest text-outline">I'm Looking For</label>
                <input
                  value={statusForm.lookingFor}
                  onChange={e => setStatusForm({ ...statusForm, lookingFor: e.target.value })}
                  placeholder="e.g. Hackathon Team, Co-founder..."
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button
                onClick={() => { setShowStatusModal(false); showToast('Status updated!'); }}
                className="w-full py-3 kinetic-gradient text-background rounded-xl font-headline font-bold uppercase tracking-wider text-sm active:scale-95 transition-all"
              >
                Save Status
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
