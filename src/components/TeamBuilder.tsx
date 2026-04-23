import React, { useState } from 'react';
import { Search, X, UserPlus, MessageCircle, Check, Gamepad2, Swords, Shield, Zap, Star, Globe, Send, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// ── Types ──────────────────────────────────────────────────────────────────
interface GamerProfile {
  id: number;
  name: string;
  gamertag: string;
  avatar: string;
  rank: string;
  rankColor: string;
  game: string;
  role: string;
  games: string[];
  lookingFor: string;
  region: string;
  winRate: string;
  kd?: string;
  online: boolean;
  connected: boolean;
  type: 'player' | 'team';
  teamSize?: string;
}

// ── Static Data ────────────────────────────────────────────────────────────
const RANK_COLORS: Record<string, string> = {
  Bronze: 'text-[#CD7F32]',
  Silver: 'text-[#C0C0C0]',
  Gold: 'text-[#FFD700]',
  Platinum: 'text-[#00FFFF]',
  Diamond: 'text-[#b9f2ff]',
  Elite: 'text-primary',
  Pro: 'text-tertiary',
};

const ALL_PLAYERS: GamerProfile[] = [
  { id: 1, name: 'Elena Rostova', gamertag: 'NeonStrike_X', avatar: 'ER', rank: 'Diamond', rankColor: 'text-[#b9f2ff]', game: 'Valorant', role: 'Duelist', games: ['Valorant', 'CS2', 'Apex'], lookingFor: 'Ranked Squad', region: 'EU', winRate: '72%', kd: '2.4', online: true, connected: false, type: 'player' },
  { id: 2, name: 'Marcus Vane', gamertag: 'DataPhantom', avatar: 'MV', rank: 'Elite', rankColor: 'text-primary', game: 'CS2', role: 'Sniper', games: ['CS2', 'Valorant'], lookingFor: 'Tournament Team', region: 'NA', winRate: '68%', kd: '3.1', online: false, connected: false, type: 'player' },
  { id: 3, name: 'Pixel Vanguards', gamertag: 'Team Pixel', avatar: 'PV', rank: 'Pro', rankColor: 'text-tertiary', game: 'Valorant', role: 'Team', games: ['Valorant', 'Overwatch 2'], lookingFor: 'IGL / Controller', region: 'NA', winRate: '81%', online: true, connected: false, type: 'team', teamSize: '4/5' },
  { id: 4, name: 'Sarah Chen', gamertag: 'GhostBlade99', avatar: 'SC', rank: 'Platinum', rankColor: 'text-[#00FFFF]', game: 'Apex Legends', role: 'Support', games: ['Apex Legends', 'Fortnite'], lookingFor: 'Casual Squad', region: 'ASIA', winRate: '61%', kd: '1.8', online: true, connected: false, type: 'player' },
  { id: 5, name: 'Jordan Park', gamertag: 'VoidRunner', avatar: 'JP', rank: 'Gold', rankColor: 'text-[#FFD700]', game: 'League of Legends', role: 'Mid Laner', games: ['LoL', 'Dota 2'], lookingFor: 'Clash Team', region: 'NA', winRate: '55%', online: false, connected: false, type: 'player' },
  { id: 6, name: 'Cyber Wolves', gamertag: 'CyberWolves', avatar: 'CW', rank: 'Elite', rankColor: 'text-primary', game: 'CS2', role: 'Team', games: ['CS2', 'Valorant', 'R6 Siege'], lookingFor: 'AWPer / Entry Fragger', region: 'EU', winRate: '76%', online: true, connected: false, type: 'team', teamSize: '3/5' },
  { id: 7, name: 'Kai Nakamura', gamertag: 'SilentKai', avatar: 'KN', rank: 'Diamond', rankColor: 'text-[#b9f2ff]', game: 'Overwatch 2', role: 'Tank', games: ['Overwatch 2', 'Apex Legends'], lookingFor: 'Competitive Team', region: 'ASIA', winRate: '69%', kd: '2.0', online: true, connected: false, type: 'player' },
  { id: 8, name: 'Priya Nair', gamertag: 'QuantumFlick', avatar: 'PN', rank: 'Gold', rankColor: 'text-[#FFD700]', game: 'Valorant', role: 'Controller', games: ['Valorant'], lookingFor: 'Ranked Grind', region: 'ASIA', winRate: '58%', kd: '1.4', online: false, connected: false, type: 'player' },
];

const GAMES = ['All Games', 'Valorant', 'CS2', 'Apex Legends', 'League of Legends', 'Overwatch 2', 'Fortnite'];
const REGIONS = ['All Regions', 'NA', 'EU', 'ASIA'];
const ROLES = ['All Roles', 'Duelist', 'Sniper', 'Support', 'Tank', 'Mid Laner', 'Controller', 'Team'];

const GAME_ICONS: Record<string, string> = {
  Valorant: '🎯', CS2: '🔫', 'Apex Legends': '🔥', 'League of Legends': '⚔️',
  'Overwatch 2': '🛡️', Fortnite: '⛏️', 'Dota 2': '🧙', 'R6 Siege': '💣',
};

// ── Message Modal ──────────────────────────────────────────────────────────
const MsgModal = ({ player, onClose }: { player: GamerProfile; onClose: () => void }) => {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const handle = (e: React.FormEvent) => { e.preventDefault(); if (msg.trim()) { setSent(true); setTimeout(onClose, 1500); } };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-highest font-headline font-black text-secondary text-sm flex items-center justify-center">{player.avatar}</div>
            <div>
              <p className="font-bold text-on-surface text-sm">{player.name}</p>
              <p className="text-[10px] text-secondary font-label uppercase tracking-widest">{player.gamertag}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"><X className="w-4 h-4 text-on-surface-variant" /></button>
        </div>
        {sent ? (
          <div className="p-10 text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center"><Check className="w-7 h-7 text-secondary" /></div>
            <p className="font-headline font-bold uppercase text-on-surface">Request Sent!</p>
            <p className="text-sm text-on-surface-variant">Party invite sent to {player.gamertag}.</p>
          </div>
        ) : (
          <form onSubmit={handle} className="p-5 space-y-4">
            <textarea required rows={3} value={msg} onChange={e => setMsg(e.target.value)}
              placeholder={`Hey ${player.gamertag}! I'm looking for a ${player.lookingFor} teammate. Want to squad up?`}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:border-secondary transition-colors resize-none" />
            <button type="submit" className="w-full py-3 bg-secondary text-background rounded-xl font-headline font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
              <Send className="w-4 h-4" /> Send Party Invite
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// ── Player Card ────────────────────────────────────────────────────────────
const PlayerCard = ({ player, onConnect, onMessage }: { key?: React.Key; player: GamerProfile; onConnect: (id: number) => void; onMessage: (p: GamerProfile) => void }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} layout
    className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 hover:border-secondary/40 transition-all group relative overflow-hidden"
  >
    {/* Online dot */}
    {player.online && <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-surface-container-low animate-pulse" />}

    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center font-headline font-black text-xl text-secondary flex-shrink-0">
          {player.avatar}
        </div>
        <span className="absolute -bottom-1 -right-1 text-sm">{GAME_ICONS[player.game] || '🎮'}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-headline font-bold text-base text-on-surface group-hover:text-secondary transition-colors truncate">{player.name}</h3>
        <p className="text-[11px] text-secondary font-label font-bold tracking-widest truncate">@{player.gamertag}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-black uppercase ${player.rankColor}`}>{player.rank}</span>
          <span className="text-outline">•</span>
          <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">{player.role}</span>
          {player.type === 'team' && player.teamSize && (
            <span className="ml-auto text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{player.teamSize} members</span>
          )}
        </div>
      </div>
    </div>

    {/* Stats row */}
    <div className="flex gap-3 mb-4">
      <div className="flex-1 bg-surface-container rounded-xl p-2.5 text-center">
        <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest mb-0.5">Win Rate</p>
        <p className="font-headline font-black text-sm text-primary">{player.winRate}</p>
      </div>
      {player.kd && (
        <div className="flex-1 bg-surface-container rounded-xl p-2.5 text-center">
          <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest mb-0.5">K/D</p>
          <p className="font-headline font-black text-sm text-secondary">{player.kd}</p>
        </div>
      )}
      <div className="flex-1 bg-surface-container rounded-xl p-2.5 text-center">
        <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest mb-0.5">Region</p>
        <p className="font-headline font-black text-sm text-tertiary">{player.region}</p>
      </div>
    </div>

    {/* Games played */}
    <div className="flex flex-wrap gap-1.5 mb-3">
      {player.games.map(g => (
        <span key={g} className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] font-bold text-on-surface-variant font-label uppercase tracking-widest">
          {GAME_ICONS[g]} {g}
        </span>
      ))}
    </div>

    {/* Looking for */}
    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-4">
      <Swords className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
      <span className="truncate">Looking for: <span className="text-on-surface font-bold">{player.lookingFor}</span></span>
    </div>

    {/* Actions */}
    <div className="flex gap-2">
      <button onClick={() => onConnect(player.id)}
        className={cn('flex-1 py-2 rounded-xl font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95',
          player.connected ? 'bg-secondary/10 text-secondary border border-secondary/30 cursor-default' : 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-background'
        )}>
        {player.connected ? <><Check className="w-3.5 h-3.5" /> In Squad</> : <><UserPlus className="w-3.5 h-3.5" /> Invite</>}
      </button>
      <button onClick={() => onMessage(player)} className="px-3 py-2 bg-surface-container-highest rounded-xl text-on-surface-variant hover:bg-surface-bright hover:text-on-surface transition-colors">
        <MessageCircle className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

// ── Create Team Modal ──────────────────────────────────────────────────────
const CreateSquadModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [form, setForm] = useState({ name: '', game: '', role: '', size: '5', region: 'NA' });
  const handle = (e: React.FormEvent) => { e.preventDefault(); onSuccess(); onClose(); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-5 border-b border-outline-variant/20">
          <div>
            <p className="text-[10px] text-primary font-label font-bold uppercase tracking-widest">Form a</p>
            <h3 className="font-headline font-black text-xl uppercase italic text-on-surface">New Squad</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors"><X className="w-4 h-4 text-on-surface-variant" /></button>
        </div>
        <form onSubmit={handle} className="p-5 space-y-4">
          {[
            { label: 'Team / Squad Name', key: 'name', placeholder: 'e.g. Neon Strikers' },
            { label: 'Looking For (Role)', key: 'role', placeholder: 'e.g. AWPer, Healer, IGL...' },
          ].map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">{f.label}</label>
              <input required value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">Game</label>
              <select required value={form.game} onChange={e => setForm({ ...form, game: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors">
                <option value="">Select...</option>
                {GAMES.slice(1).map(g => <option key={g} value={g}>{GAME_ICONS[g]} {g}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-label font-bold uppercase tracking-widest text-outline">Region</label>
              <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors">
                {REGIONS.slice(1).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-3 kinetic-gradient text-background rounded-xl font-headline font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(202,253,0,0.3)] transition-all active:scale-95">
            🎮 Create Squad
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────
export const TeamBuilder = () => {
  const [players, setPlayers] = useState<GamerProfile[]>(ALL_PLAYERS);
  const [search, setSearch] = useState('');
  const [gameFilter, setGameFilter] = useState('All Games');
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [typeFilter, setTypeFilter] = useState<'all' | 'player' | 'team'>('all');
  const [messaging, setMessaging] = useState<GamerProfile | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleConnect = (id: number) => {
    const p = players.find(p => p.id === id);
    if (p && !p.connected) {
      setPlayers(prev => prev.map(pl => pl.id === id ? { ...pl, connected: true } : pl));
      showToast(`Squad invite sent to ${p.gamertag}!`);
    }
  };

  const filtered = players.filter(p => {
    const q = search.toLowerCase();
    return (
      (gameFilter === 'All Games' || p.games.includes(gameFilter)) &&
      (regionFilter === 'All Regions' || p.region === regionFilter) &&
      (typeFilter === 'all' || p.type === typeFilter) &&
      (!q || p.name.toLowerCase().includes(q) || p.gamertag.toLowerCase().includes(q) ||
        p.games.some(g => g.toLowerCase().includes(q)) || p.role.toLowerCase().includes(q))
    );
  });

  const squadCount = players.filter(p => p.connected).length;

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-secondary text-background px-6 py-3 rounded-full font-headline font-bold uppercase tracking-wider text-sm shadow-2xl flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" /> Squad Finder
          </span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter uppercase italic">
            Find Your<br /><span className="text-primary drop-shadow-[0_0_20px_rgba(202,253,0,0.4)]">Squad</span>
          </h2>
          <p className="text-on-surface-variant text-sm mt-2">
            {squadCount > 0 ? `${squadCount} player${squadCount > 1 ? 's' : ''} in your squad` : 'Connect with elite gamers across all titles'}
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowCreate(true)}
            className="px-5 py-3 bg-surface-container-highest rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/30 text-on-surface">
            <Users className="w-4 h-4" /> Form Squad
          </button>
          <button className="px-5 py-3 kinetic-gradient text-background rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.2)]">
            <Zap className="w-4 h-4" /> Update Profile
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, gamertag, game, or role..."
          className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:outline-none focus:border-secondary transition-colors text-sm" />
        {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-on-surface-variant hover:text-on-surface" /></button>}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Type toggle */}
        <div className="flex bg-surface-container-highest rounded-xl p-1 gap-1">
          {(['all', 'player', 'team'] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn('px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
                typeFilter === t ? 'bg-secondary text-background' : 'text-on-surface-variant hover:text-on-surface')}>
              {t === 'all' ? 'All' : t === 'player' ? '👤 Players' : '🛡️ Teams'}
            </button>
          ))}
        </div>

        {/* Game filter */}
        <select value={gameFilter} onChange={e => setGameFilter(e.target.value)}
          className="bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-secondary transition-colors cursor-pointer">
          {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
        </select>

        {/* Region filter */}
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-secondary transition-colors cursor-pointer">
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <span className="ml-auto self-center text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-on-surface-variant opacity-20" />
          <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-on-surface-variant">No players found</h3>
          <button onClick={() => { setSearch(''); setGameFilter('All Games'); setRegionFilter('All Regions'); setTypeFilter('all'); }} className="mt-4 text-secondary text-sm font-bold hover:underline">Clear filters</button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => <PlayerCard key={p.id} player={p} onConnect={handleConnect} onMessage={setMessaging} />)}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {messaging && <MsgModal player={messaging} onClose={() => setMessaging(null)} />}
        {showCreate && <CreateSquadModal onClose={() => setShowCreate(false)} onSuccess={() => showToast('Squad created! Looking for members...')} />}
      </AnimatePresence>
    </div>
  );
};
