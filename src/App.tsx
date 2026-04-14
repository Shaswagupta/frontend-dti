/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { Profile } from './components/Profile';
import { useNotification } from './hooks/useNotification';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Home, 
  Compass, 
  Calendar, 
  BarChart2, 
  User, 
  Plus, 
  ArrowLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  Shield,
  Lock,
  TrendingUp,
  Timer,
  PlayCircle,
  Trophy,
  Rocket,
  Star,
  Users,
  Search,
  LayoutDashboard,
  Settings,
  Bell,
  CreditCard,
  LineChart,
  X,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { cn } from './lib/utils';
import { Screen, Event } from './types';
import { EVENTS, ACHIEVEMENTS, MATCHES } from './data';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, Tooltip } from 'recharts';

// --- Components ---

const TopAppBar = ({ 
  title = "Skillsurfer", 
  showBack = false, 
  onBack,
  onMenuClick,
  currentScreen,
  onScreenChange 
}: { 
  title?: string; 
  showBack?: boolean; 
  onBack?: () => void;
  onMenuClick?: () => void;
  currentScreen?: Screen;
  onScreenChange?: (screen: Screen) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/60 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-4">
        <button 
          onClick={showBack ? onBack : onMenuClick}
          className="hover:bg-surface-container-highest transition-colors p-2 rounded-lg scale-95 active:duration-150"
        >
          {showBack ? (
            <ArrowLeft className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
        <h1 className="text-2xl font-black text-primary uppercase tracking-tighter font-headline">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-6 relative">
        <nav className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          {['home', 'explore', 'events', 'stats'].map(screen => (
            <button 
              key={screen}
              onClick={() => onScreenChange && onScreenChange(screen as Screen)}
              className={cn(
                "capitalize transition-colors hover:text-primary",
                currentScreen === screen ? "text-primary" : "text-white"
              )}
            >
              {screen}
            </button>
          ))}
        </nav>
        
        <div 
          className="relative"
        >
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
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden z-50 flex flex-col"
              >
                <div className="p-3 border-b border-white/5">
                  <p className="font-headline font-bold text-sm text-white">Alex Sterling</p>
                  <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest">Level 42 Athlete</p>
                </div>
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onScreenChange && onScreenChange('profile');
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-label hover:bg-surface-container-highest transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-primary" /> My Profile
                </button>
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onScreenChange && onScreenChange('profile'); // Will navigate, but we can't easily trigger the "Settings" tab in Profile component without deep linking or context. For now, navigating to profile is sufficient.
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-label hover:bg-surface-container-highest transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-secondary" /> Settings
                </button>
                <div className="w-full h-px bg-white/5"></div>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full text-left px-4 py-3 text-sm font-label text-error hover:bg-error/10 hover:text-error transition-colors flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const BottomNavBar = ({ 
  currentScreen, 
  onScreenChange 
}: { 
  currentScreen: Screen; 
  onScreenChange: (screen: Screen) => void;
}) => {
  const navItems: { id: Screen; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'stats', label: 'Stats', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-background/60 backdrop-blur-md shadow-[0_-4px_40px_0_rgba(255,255,255,0.08)] rounded-t-lg border-t border-white/5">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onScreenChange(item.id)}
          className={cn(
            "flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-md",
            currentScreen === item.id 
              ? "text-primary bg-surface-container-highest scale-110" 
              : "text-on-surface-variant hover:text-white"
          )}
        >
          <item.icon className={cn("w-6 h-6", currentScreen === item.id && "fill-primary/20")} />
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest mt-1">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

// --- Screens ---

const EventsFeed = ({ onEventClick }: { onEventClick: (event: Event) => void }) => {
  const [activeSport, setActiveSport] = useState('All Sports');
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };

  const sports = ['All Sports', 'Basketball', 'Soccer', 'Tennis'];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <span className="text-secondary font-label text-sm font-bold uppercase tracking-[0.2em] mb-3 block">Live Pulse</span>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-6 italic">
              UPCOMING <br/>COMPETITIONS
            </h2>
            <p className="text-on-surface-variant font-body text-lg max-w-lg">
              Connect with elite local leagues and global tournaments. Your next victory starts here.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {sports.map(sport => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={cn(
                  "px-6 py-2 rounded-full font-label font-bold text-xs uppercase tracking-widest transition-all",
                  activeSport === sport 
                    ? "bg-secondary text-on-secondary hover:brightness-110" 
                    : "bg-surface-container-highest text-on-surface hover:bg-surface-bright"
                )}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full h-1 bg-surface-container-low mb-12">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-primary shadow-[0_0_15px_rgba(243,255,202,0.5)]"></div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.filter(e => activeSport === 'All Sports' || e.sport === activeSport).slice(0, visibleCount).map((event) => (
          <motion.div 
            key={event.id}
            layoutId={`event-${event.id}`}
            onClick={() => onEventClick(event)}
            className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src={event.image} 
              />
              <div className={cn(
                "absolute top-4 left-4 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest",
                event.sport === 'Basketball' ? "bg-tertiary text-on-tertiary" : "bg-secondary text-on-secondary"
              )}>
                {event.sport} / {event.category}
              </div>
              {event.status === 'live' && (
                <div className="absolute top-4 right-4 bg-error-container text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  LIVE NOW
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <span className="font-label text-primary font-bold">{event.entryFee}</span>
              </div>
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-sm font-label">{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-label">{event.location}</span>
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full kinetic-gradient text-on-primary-container font-headline font-bold py-3 rounded-md uppercase tracking-wider text-sm transition-all hover:shadow-[0_0_20px_rgba(202,253,0,0.3)] active:scale-95">
                  {event.entryFee === 'Free' ? 'Claim Spot' : 'Register Now'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        {visibleCount < EVENTS.filter(e => activeSport === 'All Sports' || e.sport === activeSport).length ? (
          <button 
            onClick={handleLoadMore}
            className="flex items-center gap-2 px-8 py-4 bg-surface-container-highest text-white rounded-lg border border-outline-variant/20 font-headline font-bold hover:bg-surface-bright transition-all group"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                LOADING...
              </>
            ) : (
              <>
                LOAD MORE CHALLENGES
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        ) : (
          <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">No more challenges</p>
        )}
      </div>
    </div>
  );
};

const RegistrationModal = ({ 
  isOpen, 
  onClose, 
  eventName, 
  onRegister 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  eventName: string; 
  onRegister: () => void;
}) => {
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [members, setMembers] = useState([{ name: '', email: '' }]);

  const addMember = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const updateMember = (index: number, field: 'name' | 'email', value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const removeMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-outline-variant/20 bg-surface-container-low/95 backdrop-blur">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-label">Team Registration</span>
            <h3 className="text-2xl font-black font-headline uppercase leading-tight italic">{eventName}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 bg-surface-container-highest rounded-full hover:bg-surface-bright transition-colors">
             <X className="w-5 h-5 text-on-surface" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Team Info */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-secondary tracking-widest font-label border-l-2 border-secondary pl-3">1. Team Details</h4>
            <div className="space-y-2">
               <label className="text-xs uppercase font-label">Team Name</label>
               <input 
                 required
                 type="text" 
                 value={teamName}
                 onChange={e => setTeamName(e.target.value)}
                 className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                 placeholder="e.g. Neon Strikers"
               />
            </div>
          </section>

          {/* Captain Info */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-tertiary tracking-widest font-label border-l-2 border-tertiary pl-3">2. Captain Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-xs uppercase font-label">Captain Name</label>
                 <input 
                   required
                   type="text" 
                   value={captainName}
                   onChange={e => setCaptainName(e.target.value)}
                   className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                   placeholder="Your Name"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs uppercase font-label">Email</label>
                 <input 
                   required
                   type="email" 
                   value={captainEmail}
                   onChange={e => setCaptainEmail(e.target.value)}
                   className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                   placeholder="captain@example.com"
                 />
              </div>
            </div>
          </section>

          {/* Team Members */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-primary tracking-widest font-label border-l-2 border-primary pl-3">3. Team Roster</h4>
            {members.map((member, idx) => (
              <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-outline-variant/10 rounded-xl bg-surface-container">
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase font-label text-on-surface-variant">Player {idx + 1} Name</label>
                   <input 
                     required
                     type="text" 
                     value={member.name}
                     onChange={e => updateMember(idx, 'name', e.target.value)}
                     className="w-full bg-surface-container-highest border focus:border-primary border-transparent rounded p-2 text-sm"
                     placeholder="Name"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] uppercase font-label text-on-surface-variant">Player {idx + 1} Email</label>
                   <div className="flex gap-2">
                     <input 
                       required
                       type="email" 
                       value={member.email}
                       onChange={e => updateMember(idx, 'email', e.target.value)}
                       className="w-full bg-surface-container-highest border focus:border-primary border-transparent rounded p-2 text-sm"
                       placeholder="Email"
                     />
                     <button type="button" onClick={() => removeMember(idx)} className="p-2 text-error hover:bg-error/10 rounded border border-error/20">
                       <X className="w-5 h-5" />
                     </button>
                   </div>
                 </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addMember}
              className="w-full py-3 border border-dashed border-outline-variant/30 rounded-xl text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Player
            </button>
          </section>

          <div className="pt-4 border-t border-outline-variant/20">
             <button type="submit" className="w-full kinetic-gradient py-4 rounded-xl text-on-primary-container font-headline font-black uppercase italic tracking-wider text-xl hover:shadow-[0_0_30px_rgba(202,253,0,0.3)] transition-all active:scale-95">
               Confirm Registration
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const EventDetails = ({ event, onBack }: { event: Event; onBack: () => void }) => {
  const [hasJoined, setHasJoined] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addNotification } = useNotification();

  return (
    <div className="pb-32">
      <section className="relative w-full h-[442px] flex items-end">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover" 
            src={event.image} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-6 pb-8 w-full">
          <div className="flex gap-2 mb-3">
            <span className="bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-label">LIVE NOW</span>
            <span className="bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-label">TOURNAMENT</span>
          </div>
          <h2 className="text-5xl font-black text-white font-headline leading-none tracking-tighter mb-2 uppercase italic">
            {event.title}
          </h2>
          <div className="flex items-center gap-4 text-on-surface-variant font-label text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-surface-container-low px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Entry Fee</p>
          <p className="text-xl font-bold font-headline text-white">{event.entryFee}</p>
        </div>
        <button 
          onClick={() => {
            if (!hasJoined) setIsModalOpen(true);
          }}
          disabled={hasJoined}
          className={cn(
            "px-8 py-3 rounded-md font-bold uppercase tracking-tighter text-sm active:scale-95 transition-all text-on-primary-container",
            hasJoined ? "bg-surface-container-highest text-primary border border-primary/30" : "kinetic-gradient"
          )}
        >
          {hasJoined ? 'Registered ✓' : 'Join Tournament'}
        </button>
      </div>

      <div className="px-6 mt-8 space-y-10 max-w-3xl mx-auto">
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Organizer</h3>
          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center border border-white/10">
              <Shield className="w-6 h-6 text-primary fill-primary/20" />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">{event.organizer || "City Sports League"}</h4>
              <p className="text-on-surface-variant text-sm">Verified Professional Partner</p>
            </div>
            <button className="ml-auto text-primary">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Event Brief</h3>
          <p className="text-on-surface-variant leading-relaxed text-sm">
            {event.description || "The Metro Hoops Open returns for its 5th season. 32 teams battle in a double-elimination bracket for the $5,000 grand prize. Professional scouts and live broadcast coverage included for all semi-final matches."}
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Race Schedule</h3>
            <span className="text-secondary text-xs font-bold uppercase cursor-pointer">View All</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-highest p-4 rounded-xl border-l-4 border-primary">
              <p className="text-[10px] font-bold text-primary uppercase mb-1">Day 1 • 09:00</p>
              <p className="font-bold text-sm">Qualifiers Phase</p>
              <p className="text-[10px] text-on-surface-variant mt-2 uppercase">Court A & B</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl">
              <p className="text-[10px] font-bold text-outline uppercase mb-1">Day 1 • 14:00</p>
              <p className="font-bold text-sm">Group Stage</p>
              <p className="text-[10px] text-on-surface-variant mt-2 uppercase">Main Arena</p>
            </div>
            <div className="col-span-2 bg-surface-container-low p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase mb-1">Day 2 • 10:00</p>
                <p className="font-bold text-sm">Quarter Finals</p>
              </div>
              <Lock className="w-5 h-5 text-outline" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Tournament Bracket</h3>
          <div className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5">
            <div className="p-4 border-b border-white/5 bg-surface-container">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Round of 16 • Match 04</p>
            </div>
            <div className="p-6 space-y-6 relative">
              <div className="absolute right-10 top-1/2 -translate-y-1/2 h-16 w-1 bg-surface-container-highest rounded-full"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center border border-tertiary/30">
                    <span className="text-[10px] font-bold text-tertiary">BK</span>
                  </div>
                  <span className="font-bold">Brooklyn Jets</span>
                </div>
                <span className="font-black text-xl font-headline">102</span>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                    <span className="text-[10px] font-bold text-secondary">QS</span>
                  </div>
                  <span className="font-bold">Queens Stars</span>
                </div>
                <span className="font-black text-xl font-headline">94</span>
              </div>
            </div>
            <div className="p-4 bg-surface-container-highest flex justify-center">
              <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Interactive Bracket <TrendingUp className="w-4 h-4 rotate-45" />
              </button>
            </div>
          </div>
        </section>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <RegistrationModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            eventName={event.title}
            onRegister={() => {
               setIsModalOpen(false);
               setHasJoined(true);
               addNotification(`Successfully Registered for ${event.title}!`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};


// Organizer Dashboard has been decoupled to src/components/OrganizerDashboard.tsx;

const HomeScreen = ({ onEventClick, onNavigate }: { onEventClick: (e: Event) => void, onNavigate: (s: Screen) => void }) => {
  const featured = EVENTS[3] || EVENTS[0];
  const upcoming = EVENTS.filter(e => e.status === 'upcoming').slice(0, 3);
  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-12">
      <section>
        <h2 className="text-3xl font-black font-headline uppercase italic mb-6">Featured Match</h2>
        <div onClick={() => onEventClick(featured)} className="relative lg:h-[400px] h-80 rounded-2xl overflow-hidden cursor-pointer group">
          <img src={featured.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={featured.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6">
             <span className="bg-primary text-on-primary px-3 py-1 rounded text-xs font-bold uppercase mb-2 inline-block">Trending</span>
             <h3 className="text-4xl md:text-6xl font-black text-white font-headline uppercase italic">{featured.title}</h3>
          </div>
        </div>
      </section>
      <section>
         <div className="flex justify-between items-end mb-6">
           <h2 className="text-2xl font-black font-headline uppercase italic">Hot Upcoming</h2>
           <button onClick={() => onNavigate('events')} className="text-primary font-bold hover:underline uppercase text-sm font-label tracking-widest">View All</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {upcoming.map(e => (
             <div onClick={() => onEventClick(e)} key={e.id} className="bg-surface-container-low rounded-xl p-4 cursor-pointer hover:bg-surface-container-high transition-colors">
               <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                 <img src={e.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
               </div>
               <h4 className="font-bold text-xl font-headline tracking-tight uppercase line-clamp-1">{e.title}</h4>
               <p className="text-on-surface-variant text-sm flex items-center gap-2 mt-2 font-label">
                 <CalendarDays className="w-4 h-4"/> {e.date}
               </p>
             </div>
           ))}
         </div>
      </section>
    </div>
  );
};

const Explore = ({ onEventClick }: { onEventClick: (e: Event) => void }) => {
  const [query, setQuery] = useState('');
  const filtered = EVENTS.filter(e => e.title.toLowerCase().includes(query.toLowerCase()) || e.sport.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-on-surface-variant" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, sports, locations..." 
          className="w-full shadow-lg bg-surface-container-lowest border border-outline-variant/30 rounded-full py-5 pl-16 pr-6 focus:outline-none focus:border-primary text-white font-headline text-lg"
        />
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        {['All', 'Basketball', 'Soccer', 'Tennis', 'Aquatics'].map(filter => (
           <button key={filter} className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold font-label uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors">
             {filter}
           </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filtered.map(e => (
          <div onClick={() => onEventClick(e)} key={e.id} className="relative h-64 rounded-xl overflow-hidden cursor-pointer group shadow-xl">
            <img src={e.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-colors"></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-xs uppercase text-primary font-bold tracking-widest mb-2 inline-block">{e.sport}</span>
              <h4 className="font-black text-white text-2xl font-headline tracking-tighter uppercase leading-none">{e.title}</h4>
            </div>
            {e.status === 'live' && (
               <div className="absolute top-4 right-4 bg-error-container text-white px-2 py-0.5 rounded text-[10px] font-bold">
                 LIVE
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Stats = () => {
  const chartData = [
     { name: 'Week 1', points: 400 },
     { name: 'Week 2', points: 300 },
     { name: 'Week 3', points: 550 },
     { name: 'Week 4', points: 800 },
  ];
  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">
       <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase italic">Global Rankings</h2>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8 font-label relative z-10">Top Athletes</h3>
            <div className="space-y-4 relative z-10">
              {[ {n: 'Alex Sterling', p: 1200}, {n: 'Marcus Vane', p: 980}, {n: 'Sarah Chen', p: 850} ].map((u, i) => (
                 <div key={u.n} className="flex justify-between items-center p-4 bg-surface-container-highest border border-outline-variant/10 rounded-xl hover:border-primary/50 transition-colors">
                   <div className="flex items-center gap-5">
                      <span className={cn(
                        "text-3xl font-black italic", 
                        i === 0 ? "text-primary" : i === 1 ? "text-secondary" : "text-tertiary"
                      )}>{i+1}</span>
                      <span className="font-bold font-headline text-lg uppercase tracking-tight">{u.n}</span>
                   </div>
                   <span className="text-white font-headline font-black text-xl">{u.p} <span className="text-sm text-on-surface-variant font-medium">pts</span></span>
                 </div>
              ))}
            </div>
            <Trophy className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5 text-primary" />
         </div>
         <div className="bg-surface-container-low p-8 rounded-xl flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8 font-label">Platform Engagement</h3>
            <div className="h-64 flex-grow w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Bar dataKey="points" fill="#00eefc" radius={[4,4,0,0]} />
                  <XAxis dataKey="name" stroke="#adaaaa" tickLine={false} axisLine={false} tick={{fill: '#adaaaa', fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>
       </div>
    </div>
  );
};

// --- Main App ---

function AppLayout({ userRole }: { userRole: 'student' | 'organizer' }) {
  const navigate = useNavigate();
  const { screen } = useParams();
  
  const fallbackScreen = userRole === 'organizer' ? 'director' : 'events';
  const activeScreen = (screen as Screen) || fallbackScreen;

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    navigate(`/${userRole}/event-details`);
  };

  const handleBack = () => {
    setSelectedEvent(null);
    navigate(`/${userRole}/events`);
  };

  const handleScreenChange = (newScreen: Screen) => {
    navigate(`/${userRole}/${newScreen}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      <TopAppBar 
        title={activeScreen === 'director' ? "Organizer Hub" : "Skillsurfer"}
        showBack={activeScreen === 'event-details'}
        onBack={handleBack}
        onMenuClick={() => handleScreenChange('director')}
        currentScreen={activeScreen}
        onScreenChange={handleScreenChange}
      />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeScreen === 'events' && <EventsFeed onEventClick={handleEventClick} />}
            {activeScreen === 'event-details' && selectedEvent && (
              <EventDetails event={selectedEvent} onBack={handleBack} />
            )}
            {activeScreen === 'profile' && <Profile onNavigate={handleScreenChange} />}
            {activeScreen === 'director' && <OrganizerDashboard />}
            {activeScreen === 'home' && <HomeScreen onEventClick={handleEventClick} onNavigate={handleScreenChange} />}
            {activeScreen === 'explore' && <Explore onEventClick={handleEventClick} />}
            {activeScreen === 'stats' && <Stats />}
          </motion.div>
        </AnimatePresence>
      </main>

      {userRole === 'student' && (
        <BottomNavBar 
          currentScreen={activeScreen === 'event-details' ? 'events' : activeScreen} 
          onScreenChange={handleScreenChange} 
        />
      )}

      {/* Floating Action Button */}
      {['home', 'events', 'stats'].includes(activeScreen) && userRole === 'organizer' && (
        <button 
          onClick={() => handleScreenChange('director')}
          className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-14 h-14 kinetic-gradient rounded-full shadow-2xl flex items-center justify-center text-on-primary-container z-40 transition-transform hover:rotate-12 active:scale-90"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState<'student' | 'organizer' | null>(null);

  if (!userRole) {
    return <Login onLogin={setUserRole} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute allowedRole="organizer" userRole={userRole} />}>
          <Route path="/organizer/" element={<Navigate to="/organizer/director" replace />} />
          <Route path="/organizer/dashboard" element={<Navigate to="/organizer/director" replace />} />
          <Route path="/organizer/:screen" element={<AppLayout userRole={userRole} />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRole="student" userRole={userRole} />}>
          <Route path="/student/" element={<Navigate to="/student/events" replace />} />
          <Route path="/student/feed" element={<Navigate to="/student/events" replace />} />
          <Route path="/student/:screen" element={<AppLayout userRole={userRole} />} />
        </Route>

        <Route path="*" element={<Navigate to={userRole === 'organizer' ? '/organizer/director' : '/student/events'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
