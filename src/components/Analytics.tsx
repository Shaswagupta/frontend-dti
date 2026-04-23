import React, { useState } from 'react';
import {
  Trophy, Star, Code, TrendingUp, Target, Zap, Award, Calendar,
  ArrowUp, ArrowDown, Filter, Download, RefreshCw, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip,
  BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend, AreaChart, Area
} from 'recharts';
import { cn } from '../lib/utils';

// ── Data ─────────────────────────────────────────────────────────────────
const WEEKLY_DATA = [
  { name: 'Wk 1', points: 400, wins: 1, practiced: 3 },
  { name: 'Wk 2', points: 300, wins: 0, practiced: 5 },
  { name: 'Wk 3', points: 550, wins: 2, practiced: 4 },
  { name: 'Wk 4', points: 800, wins: 3, practiced: 6 },
  { name: 'Wk 5', points: 650, wins: 2, practiced: 7 },
  { name: 'Wk 6', points: 920, wins: 4, practiced: 5 },
  { name: 'Wk 7', points: 1100, wins: 5, practiced: 8 },
  { name: 'Wk 8', points: 980, wins: 3, practiced: 6 },
];

const MONTHLY_DATA = [
  { name: 'Jan', points: 1200, wins: 4 },
  { name: 'Feb', points: 1900, wins: 6 },
  { name: 'Mar', points: 1600, wins: 5 },
  { name: 'Apr', points: 2400, wins: 8 },
  { name: 'May', points: 2100, wins: 7 },
  { name: 'Jun', points: 2900, wins: 10 },
];

const SKILL_DATA = [
  { subject: 'Speed', A: 120, fullMark: 150 },
  { subject: 'Strategy', A: 110, fullMark: 150 },
  { subject: 'Endurance', A: 86, fullMark: 150 },
  { subject: 'Technique', A: 99, fullMark: 150 },
  { subject: 'Teamwork', A: 130, fullMark: 150 },
  { subject: 'Focus', A: 95, fullMark: 150 },
];

const ALL_ACTIVITY = [
  { id: 1, type: 'tournament', title: 'Metro Hoops Open', result: '1st Place 🥇', points: '+500', time: '2 days ago', sport: 'Basketball' },
  { id: 2, type: 'badge', title: 'Speed Demon Badge', result: 'Achievement Unlocked', points: '+50', time: '5 days ago', sport: 'General' },
  { id: 3, type: 'practice', title: 'Dynamic Programming', result: 'Completed ✓', points: '+100', time: '1 week ago', sport: 'Coding' },
  { id: 4, type: 'tournament', title: 'Riverside Soccer Cup', result: '2nd Place 🥈', points: '+300', time: '2 weeks ago', sport: 'Soccer' },
  { id: 5, type: 'practice', title: 'Agility Drills — Lv. 3', result: 'Completed ✓', points: '+75', time: '2 weeks ago', sport: 'Sprint' },
  { id: 6, type: 'tournament', title: 'Clay Court Masterclass', result: '3rd Place 🥉', points: '+150', time: '3 weeks ago', sport: 'Tennis' },
  { id: 7, type: 'badge', title: 'Streak Master', result: 'Achievement Unlocked', points: '+100', time: '1 month ago', sport: 'General' },
  { id: 8, type: 'practice', title: 'Footwork Basics', result: 'Completed ✓', points: '+40', time: '1 month ago', sport: 'Soccer' },
];

const BADGES = [
  { title: 'Neon Pioneer', desc: 'First tournament joined', icon: '🌟', color: 'primary', earned: true },
  { title: 'Speed Demon', desc: 'Sub-10s sprint recorded', icon: '⚡', color: 'secondary', earned: true },
  { title: 'Top Scorer', desc: 'Most points in a week', icon: '🏆', color: 'tertiary', earned: true },
  { title: 'Streak Master', desc: '7-day active streak', icon: '🔥', color: 'primary', earned: true },
  { title: 'Team Builder', desc: 'Form a team of 5', icon: '👥', color: 'secondary', earned: false },
  { title: 'Elite Rank', desc: 'Reach top 10 globally', icon: '💎', color: 'tertiary', earned: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Kai Nakamura', points: 18400, sport: 'Basketball', avatar: 'KN', change: 'same' },
  { rank: 2, name: 'Elena Rostova', points: 16200, sport: 'Tennis', avatar: 'ER', change: 'up' },
  { rank: 3, name: 'Marcus Vane', points: 15900, sport: 'Coding', avatar: 'MV', change: 'down' },
  { rank: 4, name: 'Sarah Chen', points: 14750, sport: 'Soccer', avatar: 'SC', change: 'up' },
  { rank: 5, name: 'Alex Sterling', points: 12400, sport: 'Basketball', avatar: 'AS', isUser: true, change: 'up' },
  { rank: 6, name: 'Jordan Park', points: 11200, sport: 'E-Sports', avatar: 'JP', change: 'down' },
];

const TOOLTIP_STYLE = {
  backgroundColor: 'var(--color-surface-container-highest, #1E1E1E)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: 'inherit',
};

// ── Metric Card ───────────────────────────────────────────────────────────
const MetricCard = ({
  label, value, color, delta, icon: Icon, delay = 0
}: { label: string; value: string; color: string; delta?: string; icon: React.ElementType; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 hover:border-primary/30 transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {delta && (
        <span className={`text-xs font-bold flex items-center gap-1 ${delta.startsWith('+') ? 'text-secondary' : 'text-error'}`}>
          {delta.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {delta}
        </span>
      )}
    </div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
    <p className={`text-4xl font-headline font-black italic tracking-tighter group-hover:drop-shadow-[0_0_15px_currentColor] transition-all ${color}`}>{value}</p>
  </motion.div>
);

// ── Main Analytics Component ──────────────────────────────────────────────
export const Analytics = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'leaderboard' | 'badges'>('overview');
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  const [activityFilter, setActivityFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const chartData = timeRange === 'weekly' ? WEEKLY_DATA : MONTHLY_DATA;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const filteredActivity = ALL_ACTIVITY.filter(a =>
    activityFilter === 'All' || a.type === activityFilter.toLowerCase()
  );

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity Log' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'badges', label: 'Badges' },
  ] as const;

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-primary font-label text-xs uppercase tracking-[0.2em] font-bold">Performance</span>
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase italic text-on-surface mt-1">
            Analytics Hub
          </h2>
        </div>
        <div className="flex gap-3 items-center">
          {/* Time range toggle */}
          <div className="flex bg-surface-container-highest rounded-xl p-1 gap-1">
            {(['weekly', 'monthly'] as const).map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={cn(
                  'px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
                  timeRange === r ? 'bg-primary text-background' : 'text-on-surface-variant hover:text-on-surface'
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={handleRefresh}
            className="p-2.5 bg-surface-container-highest rounded-xl hover:bg-surface-bright transition-colors border border-outline-variant/20"
            title="Refresh data"
          >
            <RefreshCw className={cn('w-4 h-4 text-on-surface-variant', isRefreshing && 'animate-spin text-primary')} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-highest rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-surface-bright transition-colors border border-outline-variant/20">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Global Rank" value="#42" color="text-primary" delta="+8" icon={Target} delay={0} />
        <MetricCard label="Total Points" value="12.4K" color="text-secondary" delta="+920" icon={Zap} delay={0.08} />
        <MetricCard label="Win Rate" value="68%" color="text-tertiary" delta="+4%" icon={Trophy} delay={0.16} />
        <MetricCard label="Tournaments" value="14" color="text-on-surface" delta="+2" icon={Calendar} delay={0.24} />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-outline-variant/20 overflow-x-auto no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 font-headline font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Skill Radar */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
                <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 font-label">Skill Radar</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} />
                      <Radar name="Skills" dataKey="A" stroke="#00eefc" fill="#00eefc" fillOpacity={0.25} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Points Trend */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary font-label">Points Trend</h3>
                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">{timeRange}</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#cafd00" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#cafd00" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="#666" tickLine={false} axisLine={false} tick={{ fill: '#888', fontSize: 10 }} />
                      <YAxis stroke="#666" tickLine={false} axisLine={false} tick={{ fill: '#888', fontSize: 10 }} />
                      <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: 'rgba(202,253,0,0.2)', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="points" stroke="#cafd00" strokeWidth={2} fill="url(#pointsGrad)" dot={{ fill: '#cafd00', r: 3 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Wins vs Practice */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-xs font-bold uppercase tracking-widest text-tertiary mb-6 font-label">Wins vs Practice Sessions</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#666" tickLine={false} axisLine={false} tick={{ fill: '#888', fontSize: 10 }} />
                    <YAxis stroke="#666" tickLine={false} axisLine={false} tick={{ fill: '#888', fontSize: 10 }} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Legend wrapperStyle={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2 }} />
                    <Bar dataKey="wins" name="Wins" fill="#cafd00" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="practiced" name="Practice" fill="#00eefc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skill progress bars */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface mb-6 font-label">Skill Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SKILL_DATA.map((skill, i) => {
                  const pct = Math.round((skill.A / skill.fullMark) * 100);
                  const color = i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-tertiary';
                  return (
                    <div key={skill.subject}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-bold text-on-surface font-label uppercase tracking-widest">{skill.subject}</span>
                        <span className="text-xs font-bold text-on-surface-variant">{pct}%</span>
                      </div>
                      <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                          className={`h-full rounded-full ${color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Activity Log Tab ── */}
        {activeTab === 'activity' && (
          <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              {['All', 'Tournament', 'Practice', 'Badge'].map(f => (
                <button
                  key={f}
                  onClick={() => setActivityFilter(f)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                    activityFilter === f
                      ? 'bg-primary text-background'
                      : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                  )}
                >
                  {f}
                </button>
              ))}
              <span className="ml-auto text-xs font-label text-on-surface-variant self-center">{filteredActivity.length} entries</span>
            </div>

            <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="divide-y divide-outline-variant/10">
                {filteredActivity.map((act, i) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-surface-container-highest transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                        act.type === 'tournament' ? 'bg-primary/15 text-primary' :
                          act.type === 'badge' ? 'bg-tertiary/15 text-tertiary' : 'bg-secondary/15 text-secondary'
                      )}>
                        {act.type === 'tournament' ? <Trophy className="w-5 h-5" /> :
                          act.type === 'badge' ? <Star className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-sm">{act.title}</p>
                        <p className="text-xs text-on-surface-variant font-label mt-0.5">
                          {act.result} • <span className="text-outline">{act.sport}</span> • <Clock className="w-3 h-3 inline mb-0.5" /> {act.time}
                        </p>
                      </div>
                    </div>
                    <span className="font-headline font-black italic text-primary text-lg">{act.points}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Leaderboard Tab ── */}
        {activeTab === 'leaderboard' && (
          <motion.div key="leaderboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="p-4 bg-surface-container-highest flex justify-between items-center border-b border-outline-variant/10">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Global Rankings</span>
                <span className="text-[10px] bg-red-600/80 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse">Live</span>
              </div>
              {LEADERBOARD.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    'flex items-center justify-between p-4 border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors',
                    user.isUser && 'bg-primary/5 border-l-4 border-l-primary'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      'font-headline font-black italic text-2xl w-8 text-center',
                      user.rank === 1 ? 'text-[#FFD700]' : user.rank === 2 ? 'text-[#C0C0C0]' : user.rank === 3 ? 'text-[#CD7F32]' : 'text-outline'
                    )}>
                      #{user.rank}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline font-black text-sm text-secondary border border-outline-variant/20">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">
                        {user.name} {user.isUser && <span className="text-[10px] text-primary font-black ml-1 uppercase">(You)</span>}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">{user.sport}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {user.change === 'up' && <ArrowUp className="w-3 h-3 text-secondary" />}
                    {user.change === 'down' && <ArrowDown className="w-3 h-3 text-error" />}
                    <span className="font-headline font-black italic text-xl">
                      {user.points.toLocaleString()} <span className="text-xs font-medium text-on-surface-variant">pts</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Badges Tab ── */}
        {activeTab === 'badges' && (
          <motion.div key="badges" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                {BADGES.filter(b => b.earned).length}/{BADGES.length} Earned
              </p>
              <div className="h-2 w-48 bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(BADGES.filter(b => b.earned).length / BADGES.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    'rounded-2xl border p-6 text-center transition-all',
                    badge.earned
                      ? `border-${badge.color}/30 bg-${badge.color}/5 hover:border-${badge.color}/60`
                      : 'border-outline-variant/15 bg-surface-container-low opacity-50 grayscale'
                  )}
                >
                  <div className="text-4xl mb-4">{badge.icon}</div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-wide text-on-surface mb-1">{badge.title}</h3>
                  <p className="text-[10px] text-on-surface-variant font-label">{badge.desc}</p>
                  {badge.earned && (
                    <span className="mt-3 inline-block text-[10px] font-black font-label uppercase tracking-widest text-secondary">✓ Earned</span>
                  )}
                  {!badge.earned && (
                    <span className="mt-3 inline-block text-[10px] font-label uppercase tracking-widest text-outline">🔒 Locked</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
