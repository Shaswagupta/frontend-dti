import React, { createContext, useState, useCallback, ReactNode, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, X } from 'lucide-react';

interface NotificationType {
  id: string;
  message: string;
}

interface NotificationContextType {
  addNotification: (message: string) => void;
  removeNotification: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
  }, []);

  const addNotification = useCallback((message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message }]);

    // Auto-dismiss after 5 seconds
    const timeoutId = setTimeout(() => {
      removeNotification(id);
    }, 5000);
    
    timeoutRefs.current[id] = timeoutId;
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      
      {/* Notification Container Layer */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none w-[90%] max-w-sm">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              layout
              className="bg-[#1A1A1A] border border-[#CCFF00]/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] rounded-xl p-4 flex items-center justify-between gap-4 pointer-events-auto"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#CCFF00]/10 p-2 rounded-full border border-[#CCFF00]/20">
                  <Activity className="w-5 h-5 text-[#CCFF00]" />
                </div>
                <p className="text-white font-headline text-sm font-bold tracking-wide italic">{notif.message}</p>
              </div>
              <button 
                onClick={() => removeNotification(notif.id)}
                className="text-on-surface-variant hover:text-[#CCFF00] transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
