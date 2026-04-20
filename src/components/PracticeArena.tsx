import React, { useState } from 'react';
import { Code, BookOpen, Clock, Trophy, ChevronRight, PlayCircle, Star, Target, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const PracticeArena = () => {
  const [activeTab, setActiveTab] = useState('Coding');
  const [activeChallenge, setActiveChallenge] = useState<any>(null);

  const challenges = [
    { id: 1, title: 'Two Sum Optimized', difficulty: 'Easy', time: '15 mins', points: 100, topic: 'Arrays' },
    { id: 2, title: 'Graph Cycle Detection', difficulty: 'Hard', time: '45 mins', points: 300, topic: 'Graphs' },
    { id: 3, title: 'Dynamic Programming Vault', difficulty: 'Medium', time: '30 mins', points: 200, topic: 'DP' },
  ];

  const quizzes = [
    { id: 1, title: 'React Performance Under the Hood', questions: 20, time: '20 mins', points: 150 },
    { id: 2, title: 'System Design Basics', questions: 15, time: '30 mins', points: 250 },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <span className="text-primary font-label text-xs uppercase tracking-[0.2em] font-bold">Sharpen Your Skills</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter uppercase italic">
            Practice Arena
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-container-low p-4 rounded-xl border border-primary/20 text-center min-w-[120px]">
             <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Global Rank</p>
             <p className="text-2xl font-black font-headline text-primary">#4,291</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-xl border border-secondary/20 text-center min-w-[120px]">
             <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Total Score</p>
             <p className="text-2xl font-black font-headline text-secondary">1,450</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-outline-variant/20 pb-2">
        {['Coding', 'Quizzes', 'Case Studies'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn("px-6 py-3 rounded-t-xl font-bold uppercase tracking-widest text-sm transition-all", activeTab === tab ? "bg-primary text-background" : "bg-transparent text-on-surface-variant hover:text-on-surface")}
           >
             {tab}
           </button>
        ))}
      </div>

      {activeTab === 'Coding' && (
        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(c => (
             <div key={c.id} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 hover:border-primary/50 transition-colors group cursor-pointer flex flex-col justify-between h-56">
               <div>
                 <div className="flex justify-between items-start mb-4">
                   <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest", c.difficulty === 'Easy' ? 'bg-primary/20 text-primary' : c.difficulty === 'Medium' ? 'bg-secondary/20 text-secondary' : 'bg-error/20 text-error')}>{c.difficulty}</span>
                   <span className="flex items-center gap-1 text-xs font-bold text-tertiary"><Trophy className="w-3 h-3" /> {c.points}</span>
                 </div>
                 <h3 className="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                 <span className="text-xs text-on-surface-variant uppercase font-label tracking-wider bg-surface-container-highest px-2 py-1 rounded">{c.topic}</span>
               </div>
               <div className="flex justify-between items-center mt-6 pt-4 border-t border-outline-variant/20">
                 <span className="flex items-center gap-2 text-xs text-on-surface-variant font-bold uppercase"><Clock className="w-4 h-4" /> {c.time}</span>
                 <button onClick={() => setActiveChallenge(c)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors"><Code className="w-4 h-4" /></button>
               </div>
             </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'Quizzes' && (
        <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {quizzes.map(q => (
             <div key={q.id} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 hover:border-secondary/50 transition-colors group cursor-pointer flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-8 h-8 text-secondary" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-headline font-bold mb-2">{q.title}</h3>
                  <div className="flex gap-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {q.questions} Qs</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.time}</span>
                  </div>
                </div>
                <button onClick={() => setActiveChallenge(q)} className="px-6 py-3 bg-surface-container-highest rounded-lg text-sm font-bold flex items-center gap-2 group-hover:bg-secondary group-hover:text-background transition-colors">
                  Start
                </button>
             </div>
           ))}
        </motion.div>
      )}

      {/* Mock Active Challenge Modal */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 max-w-2xl w-full relative">
            <button onClick={() => setActiveChallenge(null)} className="absolute top-4 right-4 p-2 bg-surface-container-highest rounded-full hover:bg-error/20 hover:text-error transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-surface-container-highest rounded-full flex items-center justify-center border-4 border-primary/20">
                 {activeChallenge.questions ? <BookOpen className="w-10 h-10 text-secondary" /> : <Code className="w-10 h-10 text-primary" />}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full">{activeChallenge.questions ? 'Quiz Assessment' : 'Coding Challenge'}</span>
                <h2 className="text-3xl font-headline font-black mt-4">{activeChallenge.title}</h2>
                <div className="flex justify-center gap-6 mt-4 text-sm font-bold text-on-surface-variant">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {activeChallenge.time}</span>
                  <span className="flex items-center gap-2 text-tertiary"><Trophy className="w-4 h-4" /> {activeChallenge.points} pts</span>
                  {!activeChallenge.questions && <span className="flex items-center gap-2"><Target className="w-4 h-4" /> {activeChallenge.difficulty}</span>}
                </div>
              </div>
              <div className="pt-6 border-t border-outline-variant/20">
                <p className="text-on-surface-variant mb-6 text-sm max-w-md mx-auto">You are about to enter a timed assessment environment. Make sure you have a stable internet connection.</p>
                <button onClick={() => {
                  alert('This would launch the full assessment environment!');
                  setActiveChallenge(null);
                }} className="kinetic-gradient text-on-primary-container px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 w-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(202,253,0,0.2)]">
                  Begin Assessment <PlayCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
