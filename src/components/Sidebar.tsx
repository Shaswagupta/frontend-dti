import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Plus,
  Calendar,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  Briefcase,
  Code,
  Users,
  Home,
  Trophy,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useSidebarStore } from '../store/useSidebarStore';
import { Screen } from '../types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  userRole: 'student' | 'organizer';
  onLogout: () => void;
}

const studentNav = [
  { id: 'home' as Screen, label: 'Home', icon: Home },
  { id: 'events' as Screen, label: 'Compete', icon: Trophy },
  { id: 'practice' as Screen, label: 'Practice', icon: Code },
  { id: 'jobs' as Screen, label: 'Jobs', icon: Briefcase },
  { id: 'stats' as Screen, label: 'Analytics', icon: BarChart2 },
  { id: 'network' as Screen, label: 'Network', icon: Users },
  { id: 'profile' as Screen, label: 'Profile', icon: Settings },
];

const organizerNav = [
  { id: 'director' as Screen, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'event-wizard' as Screen, label: 'Create Event', icon: Plus },
  { id: 'manage-event' as Screen, label: 'My Events', icon: Calendar },
  { id: 'certificates' as Screen, label: 'Submissions', icon: FileText },
  { id: 'stats' as Screen, label: 'Analytics', icon: BarChart2 },
  { id: 'profile' as Screen, label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onLogout,
}) => {
  const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebarStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navItems = userRole === 'organizer' ? organizerNav : studentNav;

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeSidebar]);

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            key="sidebar"
            ref={sidebarRef}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-surface-container-low border-r border-outline-variant/20 shadow-[4px_0_40px_rgba(0,0,0,0.3)]"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-outline-variant/20 flex-shrink-0">
              <span className="text-2xl font-black font-headline uppercase tracking-tighter italic text-primary">
                SkillSurfer
              </span>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-on-surface"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Badge */}
            <div className="px-6 py-4 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/40">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuqCB8t5UO73tLceYWC1oFnaSiZLNdsTassO2jxxua4aI_2nWjSm7woybxa84knjkFgnSEs7urJLWB20ykiBIEQHSKUHcIhTNAzs0p3fHEcUi8QqtllwPXk_42-rH5JY98AtCUuVnsoKyOgKOa6bOxWLPWQsaLgYcd4nlxmdszDCltKEyH_y5p7oNhJ5A3AAkN5ztlLvzIRB3awRHuiK_D3X2rzVikAVQ-29pv8V-4JMdbCM0IYIUo74dpU_xWMNKiKl4Zrq0lHduK"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-headline font-bold text-sm text-on-surface truncate">Alex Sterling</p>
                  <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant truncate">
                    {userRole === 'organizer' ? 'Event Organizer' : 'Level 42 Athlete'}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <p className="text-[10px] font-label uppercase tracking-widest text-outline px-3 mb-3">
                {userRole === 'organizer' ? 'Organizer Tools' : 'Navigation'}
              </p>
              {navItems.map((item) => {
                const isActive = currentScreen === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-headline font-bold uppercase tracking-wider transition-all duration-150',
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_rgba(202,253,0,0.1)]'
                        : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
                    )}
                  >
                    <item.icon
                      className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-primary')}
                    />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="px-3 py-4 border-t border-outline-variant/20 space-y-1">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-headline font-bold uppercase tracking-wider text-error hover:bg-error/10 transition-all duration-150"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
