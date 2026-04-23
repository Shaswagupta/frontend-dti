import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit2, Activity, Settings, Flame, Trophy, CalendarDays, X, Star, Award, Medal, Check, Gamepad2, Globe, Twitter, Youtube, Bell, Shield, Moon, Zap, Users, Target, Clock, TrendingUp } from 'lucide-react';
import { Screen, Event } from '../types';
import { EVENTS } from '../data';
import { cn } from '../lib/utils';
import { useNotification } from '../hooks/useNotification';

interface ProfileProps { onNavigate?: (screen: Screen) => void; onEventClick?: (event: Event) => void; }

const GAMES_PLAYED = [
  { name: 'Valorant', icon: '🎯', hours: 840, rank: 'Diamond 2', color: 'text-[#ff4655]' },
  { name: 'CS2', icon: '🔫', hours: 620, rank: 'Global Elite', color: 'text-[#f0a500]' },
  { name: 'Apex Legends', icon: '🔥', hours: 310, rank: 'Platinum', color: 'text-[#6a5acd]' },
];

const TROPHIES = [
  { title: 'Diamond Fragger', desc: 'Reached Diamond in Valorant', icon: <Trophy className="w-7 h-7 text-[#b9f2ff]"/>, date: 'Mar 2026' },
  { title: 'Clutch King', desc: '10+ 1v4 clutches recorded', icon: <Star className="w-7 h-7 text-primary"/>, date: 'Feb 2026' },
  { title: 'Top 1%', desc: 'Global ranking tier achieved', icon: <Award className="w-7 h-7 text-[#FFD700]"/>, date: 'Apr 2026' },
  { title: 'Flawless', desc: 'Perfect score in qualifiers', icon: <Medal className="w-7 h-7 text-secondary"/>, date: 'Jan 2026' },
  { title: '7-Day Streak', desc: 'Practiced 7 days in a row', icon: <Flame className="w-7 h-7 text-[#ff7948]"/>, date: 'Apr 2026' },
  { title: 'Squad Leader', desc: 'Formed & led 3 winning teams', icon: <Users className="w-7 h-7 text-tertiary"/>, date: 'Mar 2026' },
];

const MATCH_HISTORY = [
  { id: 1, event: 'Metro Valorant Open', game: 'Valorant', placement: '1st Place 🥇', date: 'April 15, 2026', pts: '+500', win: true, kd: '3.2', hs: '48%' },
  { id: 2, event: 'CS2 City Championship', game: 'CS2', placement: '4th Place', date: 'March 28, 2026', pts: '+150', win: false, kd: '1.4', hs: '31%' },
  { id: 3, event: 'Regional Qualifiers', game: 'Valorant', placement: '2nd Place 🥈', date: 'March 10, 2026', pts: '+300', win: true, kd: '2.7', hs: '42%' },
  { id: 4, event: 'Apex Invitational', game: 'Apex Legends', placement: '1st Place 🥇', date: 'Feb 20, 2026', pts: '+450', win: true, kd: '4.1', hs: '39%' },
  { id: 5, event: 'Friday Night Frags', game: 'CS2', placement: '3rd Place 🥉', date: 'Feb 5, 2026', pts: '+200', win: true, kd: '2.0', hs: '36%' },
];

const SETTING_TOGGLES = [
  { key: 'notifications', label: 'Push Notifications', desc: 'Alerts for tournaments & squad invites', icon: Bell },
  { key: 'publicProfile', label: 'Public Profile', desc: 'Allow others to view your stats', icon: Globe },
  { key: 'twoFactor', label: 'Two-Factor Auth', desc: 'Extra security for your account', icon: Shield },
  { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme across the platform', icon: Moon },
  { key: 'autoJoin', label: 'Auto-join Tournaments', desc: 'Automatically register for open events', icon: Zap },
];

export const Profile: React.FC<ProfileProps> = ({ onNavigate, onEventClick }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Matches' | 'Settings'>('Overview');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { addNotification } = useNotification();

  const [name, setName] = useState('Alex Sterling');
  const [gamertag, setGametag] = useState('NeonStrike_X');
  const [bio, setBio] = useState('Diamond-ranked Valorant IGL & CS2 rifler. Competing since 2021. Love the grind, hate the loss. Building my squad one clutch at a time.');
  const [email, setEmail] = useState('alex@skillsurfer.dev');
  const [mainGame, setMainGame] = useState('Valorant');
  const [settings, setSettings] = useState({ notifications: true, publicProfile: true, twoFactor: false, darkMode: true, autoJoin: false });

  const [editName, setEditName] = useState(name);
  const [editTag, setEditTag] = useState(gamertag);
  const [editBio, setEditBio] = useState(bio);
  const [editEmail, setEditEmail] = useState(email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setName(editName); setGametag(editTag); setBio(editBio); setEmail(editEmail);
    setIsEditOpen(false);
    addNotification('Profile updated successfully!');
  };

  const toggleSetting = (key: string) => setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

  const wins = MATCH_HISTORY.filter(m => m.win).length;
  const winRate = Math.round((wins / MATCH_HISTORY.length) * 100);

  const TABS = ['Overview', 'Matches', 'Settings'] as const;

  return (
    <div className="pt-24 pb-32 px-6 max-w-5xl mx-auto min-h-screen">

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-outline-variant/20">
                <h3 className="font-headline font-black text-xl uppercase italic text-primary">Edit Profile</h3>
                <button onClick={() => setIsEditOpen(false)} className="p-2 hover:bg-surface-container-highest rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSave} className="p-5 space-y-4">
                {[
                  { label: 'Display Name', val: editName, set: setEditName, type: 'text', placeholder: 'Your name' },
                  { label: 'Gamertag', val: editTag, set: setEditTag, type: 'text', placeholder: '@YourTag' },
                  { label: 'Email', val: editEmail, set: setEditEmail, type: 'email', placeholder: 'you@example.com' },
                ].map(f => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">{f.label}</label>
                    <input required type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">Bio</label>
                  <textarea rows={3} value={editBio} onChange={e => setEditBio(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">Main Game</label>
                  <select value={mainGame} onChange={e => setMainGame(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors">
                    {['Valorant', 'CS2', 'Apex Legends', 'League of Legends', 'Overwatch 2'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-3 kinetic-gradient text-background rounded-xl font-headline font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(202,253,0,0.3)] transition-all active:scale-95">
                  <Check className="w-4 h-4 inline mr-2" />Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Header */}
      <div className="relative mb-10">
        {/* Banner */}
        <div className="h-40 rounded-2xl bg-gradient-to-br from-surface-container-low via-primary/10 to-secondary/10 border border-outline-variant/15 overflow-hidden relative">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(202,253,0,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        {/* Avatar + info */}
        <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-12 px-4">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl border-4 border-background bg-surface-container-highest flex items-center justify-center font-headline font-black text-3xl text-secondary shadow-xl">
              AS
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-background text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shadow-[0_0_10px_rgba(202,253,0,0.5)]">
              Diamond
            </span>
          </div>

          <div className="flex-1 min-w-0 pt-4 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <h1 className="font-headline font-black text-3xl md:text-4xl uppercase italic tracking-tighter text-on-surface">
                  {name}
                </h1>
                <p className="text-secondary text-sm font-label font-bold tracking-widest">@{gamertag}</p>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest flex items-center gap-1"><Gamepad2 className="w-3 h-3" />{mainGame} Main</span>
                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest flex items-center gap-1"><Globe className="w-3 h-3" />NA Region</span>
                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest flex items-center gap-1"><Flame className="w-3 h-3 text-[#ff7948]" />7-Day Streak</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditName(name); setEditTag(gamertag); setEditBio(bio); setEditEmail(email); setIsEditOpen(true); }}
                  className="px-5 py-2.5 kinetic-gradient text-background rounded-xl font-headline font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.25)] active:scale-95">
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-5 text-on-surface-variant text-sm leading-relaxed border-l-2 border-primary pl-4 ml-4 max-w-2xl">{bio}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Global Rank', value: '#42', icon: Target, color: 'text-primary' },
          { label: 'Win Rate', value: `${winRate}%`, icon: TrendingUp, color: 'text-secondary' },
          { label: 'Tournaments', value: '14', icon: Trophy, color: 'text-tertiary' },
          { label: 'Hours Played', value: '1,770', icon: Clock, color: 'text-on-surface' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-5 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">{s.label}</p>
            </div>
            <p className={`font-headline font-black text-3xl italic tracking-tighter ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/20 mb-8 overflow-x-auto no-scrollbar">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={cn('px-6 py-3 font-headline font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap',
              activeTab === t ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface')}>
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Overview ── */}
        {activeTab === 'Overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

            {/* Games Played */}
            <section>
              <h2 className="font-headline font-black text-xl uppercase italic tracking-tighter mb-4 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-secondary" /> Game Library
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {GAMES_PLAYED.map((g, i) => (
                  <motion.div key={g.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-5 hover:border-secondary/40 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{g.icon}</span>
                      <div>
                        <h3 className="font-headline font-bold text-base text-on-surface">{g.name}</h3>
                        <p className={`text-xs font-bold ${g.color}`}>{g.rank}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                      <span>{g.hours.toLocaleString()} hrs</span>
                      <span className="text-secondary">{g.name === 'Valorant' ? 'Main' : 'Secondary'}</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, (g.hours / 900) * 100)}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                        className="h-full bg-secondary rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Trophies */}
            <section>
              <h2 className="font-headline font-black text-xl uppercase italic tracking-tighter mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" /> Trophy Case
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TROPHIES.map((t, i) => (
                  <motion.div key={t.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {t.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-headline font-bold text-sm text-on-surface truncate">{t.title}</h3>
                      <p className="text-[10px] text-on-surface-variant font-label leading-snug mt-0.5">{t.desc}</p>
                      <p className="text-[9px] text-outline font-label uppercase tracking-widest mt-1">{t.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Social / Links */}
            <section>
              <h2 className="font-headline font-black text-xl uppercase italic tracking-tighter mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-tertiary" /> Social Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Twitter, label: '@NeonStrike_X', color: 'hover:border-[#1DA1F2]/60 hover:text-[#1DA1F2]' },
                  { icon: Youtube, label: 'NeonStrike Clips', color: 'hover:border-[#FF0000]/60 hover:text-[#FF0000]' },
                  { icon: Globe, label: 'skillsurfer.dev/alex', color: 'hover:border-primary/60 hover:text-primary' },
                ].map(s => (
                  <button key={s.label} className={cn('flex items-center gap-2 px-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface-variant transition-all', s.color)}>
                    <s.icon className="w-4 h-4" /> {s.label}
                  </button>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* ── Matches ── */}
        {activeTab === 'Matches' && (
          <motion.div key="matches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Wins', value: wins, color: 'text-secondary' },
                { label: 'Losses', value: MATCH_HISTORY.length - wins, color: 'text-error' },
                { label: 'Win Rate', value: `${winRate}%`, color: 'text-primary' },
              ].map(s => (
                <div key={s.label} className="bg-surface-container-low border border-outline-variant/15 rounded-xl p-4 text-center">
                  <p className={`font-headline font-black text-3xl italic ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden">
              {MATCH_HISTORY.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className={cn('flex items-center gap-4 p-4 border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors', m.win && 'border-l-4 border-l-secondary')}>
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', m.win ? 'bg-secondary/15 text-secondary' : 'bg-outline/10 text-outline')}>
                    {m.win ? <Trophy className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-on-surface truncate">{m.event}</p>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">{m.game} • {m.date}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-[10px] font-bold font-label uppercase tracking-widest text-on-surface-variant">
                    <span>K/D <span className="text-on-surface">{m.kd}</span></span>
                    <span>HS <span className="text-on-surface">{m.hs}</span></span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={cn('text-sm font-bold', m.win ? 'text-secondary' : 'text-on-surface-variant')}>{m.placement}</p>
                    <p className="font-headline font-black italic text-primary">{m.pts}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Settings ── */}
        {activeTab === 'Settings' && (
          <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 max-w-2xl">
            <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden">
              {SETTING_TOGGLES.map((s, i) => (
                <div key={s.key} className={cn('flex items-center justify-between p-5', i < SETTING_TOGGLES.length - 1 && 'border-b border-outline-variant/10')}>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">{s.label}</p>
                      <p className="text-[10px] text-on-surface-variant font-label">{s.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleSetting(s.key)}
                    className={cn('w-12 h-6 rounded-full p-0.5 transition-colors relative flex-shrink-0',
                      settings[s.key as keyof typeof settings] ? 'bg-primary' : 'bg-surface-container-highest border border-outline-variant/30')}>
                    <motion.div animate={{ x: settings[s.key as keyof typeof settings] ? 24 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={cn('w-5 h-5 rounded-full', settings[s.key as keyof typeof settings] ? 'bg-background' : 'bg-on-surface-variant')} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-5 space-y-4">
              <h3 className="font-headline font-bold uppercase tracking-widest text-sm text-on-surface">Account Details</h3>
              {[{ label: 'Email', val: email, type: 'email' }].map(f => (
                <div key={f.label} className="space-y-1.5">
                  <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">{f.label}</label>
                  <input type={f.type} defaultValue={f.val}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              ))}
              <button className="px-5 py-2.5 bg-surface-container-highest rounded-xl text-sm font-bold text-on-surface hover:bg-surface-bright transition-colors border border-outline-variant/20">
                Change Password
              </button>
            </div>

            <button className="w-full py-3 bg-error/10 border border-error/30 text-error rounded-xl font-headline font-bold uppercase tracking-wider text-sm hover:bg-error/20 transition-colors">
              Delete Account
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
