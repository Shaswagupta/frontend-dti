import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { cn } from '../lib/utils';
import { useSidebarStore } from '../store/useSidebarStore';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  userRole: 'student' | 'organizer';
  onLogout: () => void;
  activeScreen: Screen;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showBack = false,
  onBack,
  currentScreen,
  onNavigate,
  userRole,
  onLogout,
  activeScreen,
}) => {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      {/* Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={onNavigate}
        userRole={userRole}
        onLogout={onLogout}
      />

      {/* Top Navbar */}
      <Navbar
        title={title}
        showBack={showBack}
        onBack={onBack}
        currentScreen={currentScreen}
        onScreenChange={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content — shifts right on lg when sidebar is open */}
      <motion.main
        animate={{
          // On desktop (≥1024px), push content right when sidebar is open
          paddingLeft: isSidebarOpen ? undefined : 0,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className={cn(
          'min-h-screen transition-all duration-300',
          // CSS-based shift for large screens only
          isSidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
};
