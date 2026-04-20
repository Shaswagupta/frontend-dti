import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, ArrowLeft, User, Settings, Lock } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useSidebarStore } from '../store/useSidebarStore';
import { cn } from '../lib/utils';
import { Screen } from '../types';

interface NavbarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  currentScreen?: Screen;
  onScreenChange?: (screen: Screen) => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title = 'Skillsurfer',
  showBack = false,
  onBack,
  currentScreen,
  onScreenChange,
  onLogout,
}) => {
  const { toggleSidebar } = useSidebarStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/60 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex items-center gap-4">
        <button
          onClick={showBack ? onBack : toggleSidebar}
          className="hover:bg-surface-container-highest transition-colors p-2 rounded-lg active:scale-95 duration-150"
          aria-label={showBack ? 'Go back' : 'Toggle sidebar'}
        >
          {showBack ? (
            <ArrowLeft className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-on-surface" />
          )}
        </button>
        <h1 className="text-2xl font-black text-primary uppercase tracking-tighter font-headline">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Desktop inline nav links */}
        <nav className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          {['home', 'explore', 'events', 'stats'].map((screen) => (
            <button
              key={screen}
              onClick={() => onScreenChange && onScreenChange(screen as Screen)}
              className={cn(
                'capitalize transition-colors hover:text-primary text-sm',
                currentScreen === screen ? 'text-primary' : 'text-on-surface'
              )}
            >
              {screen}
            </button>
          ))}
        </nav>

        <ThemeToggle />

        {/* Avatar Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden cursor-pointer hover:border-primary transition-colors"
          >
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuqCB8t5UO73tLceYWC1oFnaSiZLNdsTassO2jxxua4aI_2nWjSm7woybxa84knjkFgnSEs7urJLWB20ykiBIEQHSKUHcIhTNAzs0p3fHEcUi8QqtllwPXk_42-rH5JY98AtCUuVnsoKyOgKOa6bOxWLPWQsaLgYcd4nlxmdszDCltKEyH_y5p7oNhJ5A3AAkN5ztlLvzIRB3awRHuiK_D3X2rzVikAVQ-29pv8V-4JMdbCM0IYIUo74dpU_xWMNKiKl4Zrq0lHduK"
            />
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                {/* Backdrop to close on outside click */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-52 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden z-50 flex flex-col"
                >
                  <div className="p-3 border-b border-outline-variant/20">
                    <p className="font-headline font-bold text-sm text-on-surface">Alex Sterling</p>
                    <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">
                      Level 42 Athlete
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onScreenChange && onScreenChange('profile');
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-label hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-on-surface"
                  >
                    <User className="w-4 h-4 text-primary" /> My Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onScreenChange && onScreenChange('profile');
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-label hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-on-surface"
                  >
                    <Settings className="w-4 h-4 text-secondary" /> Settings
                  </button>
                  <div className="w-full h-px bg-outline-variant/20" />
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout && onLogout();
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-label text-error hover:bg-error/10 transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" /> Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
