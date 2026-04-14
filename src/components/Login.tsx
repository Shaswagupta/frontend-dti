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

          <div className="pt-4 space-y-4">
             <button type="submit" className="w-full kinetic-gradient py-4 rounded-xl text-background font-headline font-black uppercase italic tracking-wider text-xl hover:shadow-[0_0_30px_rgba(202,253,0,0.3)] transition-all active:scale-95">
               Enter Arena
             </button>
             
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface-container-low text-on-surface-variant font-label uppercase tracking-widest text-[10px]">Or continue with</span>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => onLogin(role)}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-outline-variant/30 bg-surface-container text-white font-headline font-bold uppercase tracking-wider text-sm hover:bg-surface-container-highest transition-all active:scale-95"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Sign in with Google
              </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
