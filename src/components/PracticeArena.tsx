import React, { useState, useEffect, useCallback } from 'react';
import { Target, Zap, Trophy, Clock, Star, X, ChevronRight, RotateCcw, Check, Gamepad2, Flame, Shield, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// ── Data ──────────────────────────────────────────────────────────────────
const DRILLS = [
  { id: 1, title: 'Aim Lab: Flick Shots', game: 'FPS', icon: '🎯', difficulty: 'Medium', xp: 200, time: '5 min', desc: 'Train rapid target acquisition with randomized flick-shot sequences. Builds mouse precision and reaction speed.', tag: 'Aim Training', color: 'border-primary/30 bg-primary/5 hover:border-primary/60' },
  { id: 2, title: 'Map Callout Quiz', game: 'CS2', icon: '🗺️', difficulty: 'Easy', xp: 100, time: '3 min', desc: 'Identify map callouts from screenshots. Essential for team communication and positioning.', tag: 'Game Knowledge', color: 'border-secondary/30 bg-secondary/5 hover:border-secondary/60' },
  { id: 3, title: 'Recoil Control Master', game: 'FPS', icon: '🔫', difficulty: 'Hard', xp: 350, time: '8 min', desc: 'Practice spray patterns and recoil compensation for AK-47, M4A1, and Vandal.', tag: 'Mechanics', color: 'border-error/30 bg-error/5 hover:border-error/60' },
  { id: 4, title: 'Ability Timing — Valorant', game: 'Valorant', icon: '⚡', difficulty: 'Medium', xp: 180, time: '5 min', desc: 'Learn optimal ability usage windows for Sage, Jett, and Sova across all maps.', tag: 'Strategy', color: 'border-tertiary/30 bg-tertiary/5 hover:border-tertiary/60' },
  { id: 5, title: 'CS2 Grenade Lines', game: 'CS2', icon: '💣', difficulty: 'Hard', xp: 300, time: '10 min', desc: 'Master smoke, flash, and molotov lineups for Mirage, Dust2, and Inferno.', tag: 'Utility', color: 'border-primary/30 bg-primary/5 hover:border-primary/60' },
  { id: 6, title: 'LoL Jungle Pathing', game: 'LoL', icon: '🌲', difficulty: 'Medium', xp: 220, time: '6 min', desc: 'Optimize jungle clear routes and gank timings for maximum early game impact.', tag: 'Macro', color: 'border-secondary/30 bg-secondary/5 hover:border-secondary/60' },
  { id: 7, title: 'Reaction Time Test', game: 'All', icon: '⚡', difficulty: 'Easy', xp: 80, time: '2 min', desc: 'Benchmark your raw reaction speed. Sub-200ms is pro level. Click the target the instant it appears.', tag: 'Reflex', color: 'border-tertiary/30 bg-tertiary/5 hover:border-tertiary/60' },
  { id: 8, title: 'Apex Legends — Movement', game: 'Apex', icon: '🔥', difficulty: 'Hard', xp: 280, time: '7 min', desc: 'Learn bunny hopping, wall bouncing, and slide mechanics to maximize mobility.', tag: 'Movement', color: 'border-error/30 bg-error/5 hover:border-error/60' },
];

const TAGS = ['All', 'Aim Training', 'Game Knowledge', 'Mechanics', 'Strategy', 'Utility', 'Macro', 'Reflex', 'Movement'];
const GAMES_F = ['All Games', 'FPS', 'Valorant', 'CS2', 'LoL', 'Apex'];
const DIFF = ['All', 'Easy', 'Medium', 'Hard'];

const DIFF_COLOR: Record<string, string> = {
  Easy: 'bg-secondary/15 text-secondary',
  Medium: 'bg-primary/15 text-primary',
  Hard: 'bg-error/15 text-error',
};

// ── Reflex Mini-Game ──────────────────────────────────────────────────────
const ReflexGame = ({ onClose }: { onClose: () => void }) => {
  const [state, setState] = useState<'wait' | 'ready' | 'clicked' | 'early'>('wait');
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    if (state === 'wait') {
      const delay = 1500 + Math.random() * 3000;
      const t = setTimeout(() => { setState('ready'); setStartTime(Date.now()); }, delay);
      return () => clearTimeout(t);
    }
  }, [state]);

  const handleClick = () => {
    if (state === 'wait') { setState('early'); return; }
    if (state === 'ready') {
      const ms = Date.now() - startTime;
      setReactionMs(ms);
      setScores(prev => [...prev, ms]);
      setState('clicked');
    }
    if (state === 'clicked' || state === 'early') setState('wait');
  };

  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const grade = avg === null ? '' : avg < 200 ? '🏆 Pro' : avg < 250 ? '⭐ Great' : avg < 300 ? '👍 Good' : '📈 Keep Going';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[10px] text-secondary font-label font-bold uppercase tracking-widest">Reflex Drill</p>
            <h3 className="font-headline font-black text-xl uppercase italic text-on-surface">Reaction Time Test</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full"><X className="w-5 h-5 text-on-surface-variant" /></button>
        </div>

        <div
          onClick={handleClick}
          className={cn(
            'h-48 rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150',
            state === 'wait' && 'bg-surface-container border-2 border-dashed border-outline-variant/30',
            state === 'ready' && 'bg-secondary/20 border-2 border-secondary shadow-[0_0_40px_rgba(0,238,252,0.3)] scale-[1.02]',
            state === 'clicked' && 'bg-primary/15 border-2 border-primary',
            state === 'early' && 'bg-error/10 border-2 border-error',
          )}
        >
          {state === 'wait' && <><Target className="w-10 h-10 text-on-surface-variant mb-2 opacity-40" /><p className="text-on-surface-variant font-bold text-sm uppercase tracking-widest">Wait for green...</p></>}
          {state === 'ready' && <><Crosshair className="w-12 h-12 text-secondary mb-2 animate-ping" /><p className="text-secondary font-headline font-black text-xl uppercase">CLICK NOW!</p></>}
          {state === 'clicked' && reactionMs && (
            <><p className="font-headline font-black text-5xl text-primary italic">{reactionMs}<span className="text-lg text-on-surface-variant">ms</span></p>
              <p className="text-on-surface-variant text-sm mt-1 font-bold">{reactionMs < 200 ? '🏆 Insane!' : reactionMs < 250 ? '⚡ Fast!' : reactionMs < 300 ? '👍 Good' : '📈 Keep training'}</p>
              <p className="text-[10px] text-outline mt-2 uppercase tracking-widest">Click to try again</p></>
          )}
          {state === 'early' && <><X className="w-10 h-10 text-error mb-2" /><p className="text-error font-bold text-sm uppercase tracking-widest">Too Early! Click to retry</p></>}
        </div>

        {scores.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-surface-container rounded-xl p-3 text-center">
              <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Best</p>
              <p className="font-headline font-black text-lg text-secondary">{Math.min(...scores)}ms</p>
            </div>
            <div className="bg-surface-container rounded-xl p-3 text-center">
              <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Avg</p>
              <p className="font-headline font-black text-lg text-primary">{avg}ms</p>
            </div>
            <div className="bg-surface-container rounded-xl p-3 text-center">
              <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Grade</p>
              <p className="font-headline font-black text-sm text-tertiary">{grade}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ── Quiz Modal ─────────────────────────────────────────────────────────────
const QUIZ_Q = [
  { q: 'In CS2, which grenade blocks utility and deals fire damage?', opts: ['Flashbang', 'Smoke', 'Molotov', 'HE Grenade'], ans: 2 },
  { q: 'In Valorant, which agent can revive themselves from the dead?', opts: ['Phoenix', 'Sage', 'Reyna', 'Skye'], ans: 0 },
  { q: 'What does "IGL" stand for in esports?', opts: ['In-Game Leader', 'International Gaming League', 'Item Get Locked', 'Instant GG Lose'], ans: 0 },
  { q: 'In League of Legends, what is the Baron Nashor buff called?', opts: ['Dragon Soul', 'Hand of Baron', 'Baron Power', 'Void Rift'], ans: 1 },
  { q: 'Which FPS mechanic involves moving to reduce bullet spread?', opts: ['Bunny Hopping', 'Counter-Strafing', 'Jiggle Peeking', 'Prefiring'], ans: 1 },
];

const QuizModal = ({ drill, onClose }: { drill: typeof DRILLS[0]; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (done || selected !== null) return;
    if (timeLeft === 0) { next(null); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, selected]);

  const next = (pick: number | null) => {
    if (pick === QUIZ_Q[current].ans) setScore(p => p + 1);
    if (current + 1 >= QUIZ_Q.length) { setDone(true); return; }
    setTimeout(() => { setCurrent(p => p + 1); setSelected(null); setTimeLeft(30); }, 800);
  };

  const pick = (i: number) => { if (selected !== null) return; setSelected(i); next(i); };
  const pct = Math.round((score / QUIZ_Q.length) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[10px] text-secondary font-label font-bold uppercase tracking-widest">{drill.tag}</p>
            <h3 className="font-headline font-black text-lg uppercase italic text-on-surface truncate">{drill.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-highest rounded-full"><X className="w-4 h-4 text-on-surface-variant" /></button>
        </div>

        {!done ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Q {current + 1}/{QUIZ_Q.length}</span>
              <div className={cn('flex items-center gap-1 text-xs font-bold', timeLeft <= 10 ? 'text-error' : 'text-on-surface-variant')}>
                <Clock className="w-3.5 h-3.5" /> {timeLeft}s
              </div>
            </div>
            <div className="h-1 bg-surface-container-highest rounded-full mb-4">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((current) / QUIZ_Q.length) * 100}%` }} />
            </div>
            <p className="font-bold text-on-surface mb-4 leading-relaxed">{QUIZ_Q[current].q}</p>
            <div className="space-y-2">
              {QUIZ_Q[current].opts.map((opt, i) => (
                <button key={i} onClick={() => pick(i)}
                  className={cn('w-full text-left px-4 py-3 rounded-xl text-sm font-bold border transition-all',
                    selected === null ? 'border-outline-variant/20 hover:border-secondary/50 hover:bg-secondary/5' :
                      i === QUIZ_Q[current].ans ? 'border-secondary bg-secondary/15 text-secondary' :
                        i === selected ? 'border-error bg-error/15 text-error' : 'border-outline-variant/10 opacity-40'
                  )}>
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl">{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📈'}</div>
            <p className="font-headline font-black text-5xl text-primary italic">{score}/{QUIZ_Q.length}</p>
            <p className="text-on-surface-variant">{pct >= 80 ? 'Outstanding game knowledge!' : pct >= 60 ? 'Good work! Keep practicing.' : 'Study the meta and try again.'}</p>
            <div className="flex gap-2 justify-center mt-4">
              <button onClick={() => { setCurrent(0); setScore(0); setDone(false); setSelected(null); setTimeLeft(30); }}
                className="px-4 py-2.5 bg-surface-container-highest rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-surface-bright transition-colors">
                <RotateCcw className="w-4 h-4" /> Retry
              </button>
              <button onClick={onClose} className="px-4 py-2.5 kinetic-gradient text-background rounded-xl text-sm font-bold flex items-center gap-2">
                <Check className="w-4 h-4" /> Claim {drill.xp} XP
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
export const PracticeArena = () => {
  const [tagFilter, setTagFilter] = useState('All');
  const [gameFilter, setGameFilter] = useState('All Games');
  const [diffFilter, setDiffFilter] = useState('All');
  const [activeDrill, setActiveDrill] = useState<typeof DRILLS[0] | null>(null);
  const [showReflex, setShowReflex] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const filtered = DRILLS.filter(d =>
    (tagFilter === 'All' || d.tag === tagFilter) &&
    (gameFilter === 'All Games' || d.game === gameFilter) &&
    (diffFilter === 'All' || d.difficulty === diffFilter)
  );

  const totalXP = completed.reduce((sum, id) => sum + (DRILLS.find(d => d.id === id)?.xp ?? 0), 0);

  const launch = (drill: typeof DRILLS[0]) => {
    if (drill.tag === 'Reflex') { setShowReflex(true); return; }
    setActiveDrill(drill);
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" /> Skill Lab
          </span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter uppercase italic">
            Practice<br /><span className="text-primary drop-shadow-[0_0_20px_rgba(202,253,0,0.4)]">Arena</span>
          </h2>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-low border border-primary/20 rounded-xl p-4 text-center min-w-[110px]">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">XP Earned</p>
            <p className="text-2xl font-black font-headline text-primary italic">{totalXP.toLocaleString()}</p>
          </div>
          <div className="bg-surface-container-low border border-secondary/20 rounded-xl p-4 text-center min-w-[110px]">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Completed</p>
            <p className="text-2xl font-black font-headline text-secondary italic">{completed.length}/{DRILLS.length}</p>
          </div>
          <div className="bg-surface-container-low border border-tertiary/20 rounded-xl p-4 text-center min-w-[110px]">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Streak</p>
            <p className="text-2xl font-black font-headline text-tertiary italic flex items-center gap-1 justify-center"><Flame className="w-5 h-5" />7</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={gameFilter} onChange={e => setGameFilter(e.target.value)}
          className="bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary transition-colors cursor-pointer">
          {GAMES_F.map(g => <option key={g}>{g}</option>)}
        </select>
        <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)}
          className="bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary transition-colors cursor-pointer">
          {DIFF.map(d => <option key={d}>{d}</option>)}
        </select>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(t => (
            <button key={t} onClick={() => setTagFilter(t)}
              className={cn('px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all',
                tagFilter === t ? 'bg-primary text-background' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright')}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Drills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((drill, i) => (
            <motion.div key={drill.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
              className={cn('border rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all group cursor-default relative overflow-hidden', drill.color, completed.includes(drill.id) && 'opacity-70')}
            >
              {completed.includes(drill.id) && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-background" />
                </div>
              )}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{drill.icon}</span>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest', DIFF_COLOR[drill.difficulty])}>{drill.difficulty}</span>
                    <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container/50 px-2 py-0.5 rounded-full">{drill.game}</span>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors mb-2 leading-tight">{drill.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{drill.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/15">
                <div className="flex items-center gap-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{drill.time}</span>
                  <span className="flex items-center gap-1 text-primary"><Zap className="w-3.5 h-3.5" />+{drill.xp} XP</span>
                </div>
                <button
                  onClick={() => launch(drill)}
                  className="px-4 py-2 kinetic-gradient text-background rounded-xl font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform active:scale-95 shadow-[0_0_12px_rgba(202,253,0,0.25)]"
                >
                  {completed.includes(drill.id) ? <><RotateCcw className="w-3.5 h-3.5" /> Redo</> : <><ChevronRight className="w-3.5 h-3.5" /> Start</>}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showReflex && (
          <ReflexGame onClose={() => { setShowReflex(false); setCompleted(p => p.includes(7) ? p : [...p, 7]); }} />
        )}
        {activeDrill && (
          <QuizModal drill={activeDrill} onClose={() => {
            setCompleted(p => p.includes(activeDrill.id) ? p : [...p, activeDrill.id]);
            setActiveDrill(null);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
};
