import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const Login = ({ onLogin }: { onLogin: (role: 'student' | 'organizer') => void }) => {
  const [role, setRole] = useState<'student' | 'organizer'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-primary/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-low border border-outline-variant/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-headline font-black uppercase italic tracking-tighter text-primary">SkillSurfer</h1>
          <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mt-2">Select Your Path</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={cn(
                "p-4 rounded-xl border flex flex-col items-center gap-3 transition-all",
                role === 'student' 
                  ? "bg-surface-container-highest border-primary text-primary" 
                  : "bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <User className="w-8 h-8" />
              <span className="font-headline font-bold uppercase tracking-wider text-xs">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('organizer')}
              className={cn(
                "p-4 rounded-xl border flex flex-col items-center gap-3 transition-all",
                role === 'organizer' 
                  ? "bg-surface-container-highest border-secondary text-secondary" 
                  : "bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <Shield className="w-8 h-8" />
              <span className="font-headline font-bold uppercase tracking-wider text-xs">Organizer</span>
            </button>
          </div>

          <div className="pt-4">
             <button type="submit" className="w-full kinetic-gradient py-4 rounded-xl text-background font-headline font-black uppercase italic tracking-wider text-xl hover:shadow-[0_0_30px_rgba(202,253,0,0.3)] transition-all active:scale-95">
               Enter Arena
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
