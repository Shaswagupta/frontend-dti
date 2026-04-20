import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, User, Mail, Lock, Eye, EyeOff, ArrowRight, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const Login = ({ onLogin }: { onLogin: (role: 'student' | 'organizer') => void }) => {
  const [role, setRole] = useState<'student' | 'organizer'>('student');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  const isStudent = role === 'student';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-primary/30 relative overflow-hidden">
      {/* Background glows that swap with role */}
      <motion.div
        animate={{ opacity: isStudent ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/25 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: isStudent ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/25 blur-[120px] rounded-full pointer-events-none"
      />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-headline font-black uppercase italic tracking-tighter text-primary">SkillSurfer</h1>
          <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mt-2">
            {isLogin ? 'Welcome back — choose your path' : 'Create your account'}
          </p>
        </div>

        {/* ── Role Selector ── most important choice, shown ABOVE the form */}
        <div className="mb-5">
          <p className="text-[10px] font-label font-bold uppercase tracking-widest text-outline text-center mb-3">
            I am a...
          </p>
          <div className="grid grid-cols-2 gap-3">

            {/* Student Card */}
            <button
              type="button"
              onClick={() => setRole('student')}
              className={cn(
                'relative p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 overflow-hidden text-center',
                isStudent
                  ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(202,253,0,0.2)]'
                  : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high hover:border-outline-variant/60'
              )}
            >
              <Gamepad2 className="w-8 h-8" />
              <span className="font-headline font-black uppercase tracking-wider text-sm">Student</span>
              <span className="text-[10px] font-label leading-tight opacity-80">
                Compete, practice &amp; grow your skills
              </span>
              {isStudent && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>
              )}
            </button>

            {/* Organizer Card */}
            <button
              type="button"
              onClick={() => setRole('organizer')}
              className={cn(
                'relative p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all duration-200 overflow-hidden text-center',
                !isStudent
                  ? 'bg-secondary/10 border-secondary text-secondary shadow-[0_0_20px_rgba(0,238,252,0.2)]'
                  : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high hover:border-outline-variant/60'
              )}
            >
              <Shield className="w-8 h-8" />
              <span className="font-headline font-black uppercase tracking-wider text-sm">Organizer</span>
              <span className="text-[10px] font-label leading-tight opacity-80">
                Create events &amp; manage tournaments
              </span>
              {!isStudent && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>
              )}
            </button>
          </div>

          {/* Destination hint — makes it 100% clear where they'll land */}
          <motion.p
            key={role}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'text-center text-[11px] font-label mt-3 font-bold uppercase tracking-widest',
              isStudent ? 'text-primary' : 'text-secondary'
            )}
          >
            {isStudent
              ? '→ You will enter the Student Dashboard'
              : '→ You will enter the Organizer Hub'}
          </motion.p>
        </div>

        {/* ── Auth Form Card ── */}
        <div className="bg-surface-container-low border border-outline-variant/20 p-6 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.4)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login-fields' : 'register-fields'}
                initial={{ opacity: 0, x: isLogin ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 12 : -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-3"
              >
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-11 pr-4 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-11 pr-4 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-11 pr-11 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded bg-surface-container" />
                      <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                        Remember me
                      </span>
                    </label>
                    <button type="button" className="text-xs font-bold text-primary hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Submit — label changes with role */}
            <button
              type="submit"
              className={cn(
                'w-full py-3.5 rounded-xl font-headline font-black uppercase italic tracking-wider text-base transition-all active:scale-95 flex items-center justify-center gap-2',
                isStudent
                  ? 'kinetic-gradient text-background hover:shadow-[0_0_30px_rgba(202,253,0,0.35)]'
                  : 'bg-secondary text-background hover:shadow-[0_0_30px_rgba(0,238,252,0.35)]'
              )}
            >
              {isLogin
                ? isStudent ? 'Enter Student Arena' : 'Enter Organizer Hub'
                : 'Join the Ranks'}
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-surface-container-low text-on-surface-variant font-label uppercase tracking-widest text-[10px]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google — also shows the role */}
            <button
              type="button"
              onClick={() => onLogin(role)}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-outline-variant/30 bg-surface-container text-on-surface font-headline font-bold uppercase tracking-wider text-xs hover:bg-surface-container-highest transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                </g>
              </svg>
              Google — {isStudent ? 'Student' : 'Organizer'}
            </button>

            {/* Toggle login/signup */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span className={isStudent ? 'text-primary' : 'text-secondary'}>
                  {isLogin ? 'Sign up' : 'Log in'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
