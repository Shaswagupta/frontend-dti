/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { EventWizard } from './components/EventWizard';
import { ManageEvent } from './components/ManageEvent';
import { PracticeArena } from './components/PracticeArena';
import { JobsBoard } from './components/JobsBoard';
import { TeamBuilder } from './components/TeamBuilder';
import { CertificateStudio } from './components/CertificateStudio';
import { Profile } from './components/Profile';
import { ThemeToggle } from './components/ThemeToggle';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Analytics } from './components/Analytics';
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
  Briefcase,
  Code,
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
  Loader2,
  MessageSquare,
  Info,
  FileText
} from 'lucide-react';
import { cn } from './lib/utils';
import { Screen, Event } from './types';
import { EVENTS, ACHIEVEMENTS, MATCHES } from './data';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

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
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/60 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex items-center gap-4">
        <button 
          onClick={showBack ? onBack : onMenuClick}
          className="hover:bg-surface-container-highest transition-colors p-2 rounded-lg scale-95 active:duration-150"
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
      <div className="flex items-center gap-6 relative">
        <nav className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          {['home', 'explore', 'events', 'stats'].map(screen => (
            <button 
              key={screen}
              onClick={() => onScreenChange && onScreenChange(screen as Screen)}
              className={cn(
                "capitalize transition-colors hover:text-primary",
                currentScreen === screen ? "text-primary" : "text-on-surface"
              )}
            >
              {screen}
            </button>
          ))}
        </nav>
        
        <ThemeToggle />
        
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
                <div className="p-3 border-b border-outline-variant/20">
                  <p className="font-headline font-bold text-sm text-on-surface">Alex Sterling</p>
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
                <div className="w-full h-px bg-outline-variant/20"></div>
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
    { id: 'practice', label: 'Practice', icon: Code },
    { id: 'events', label: 'Compete', icon: Calendar },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-background/60 backdrop-blur-md shadow-[0_-4px_40px_0_rgba(0,0,0,0.08)] rounded-t-lg border-t border-outline-variant/20">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onScreenChange(item.id)}
          className={cn(
            "flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-md",
            currentScreen === item.id 
              ? "text-primary bg-surface-container-highest scale-110" 
              : "text-on-surface-variant hover:text-on-surface"
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };

  const sports = ['All Sports', 'Basketball', 'Soccer', 'Tennis', 'Aquatics', 'Agility'];

  const filteredEvents = EVENTS.filter(e => {
    const matchesSport = activeSport === 'All Sports' || e.sport === activeSport;
    const matchesSearch = searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <span className="text-secondary font-label text-sm font-bold uppercase tracking-[0.2em] mb-3 block">Live Pulse</span>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-4 italic">
              UPCOMING <br/>COMPETITIONS
            </h2>
            <p className="text-on-surface-variant font-body text-base max-w-lg">
              Connect with elite local leagues and global tournaments. Your next victory starts here.
            </p>
          </div>
        </div>
        {/* Search bar */}
        <div className="relative max-w-2xl mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search events, sports, locations..."
            className="w-full bg-surface-container border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary transition-colors font-label text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* Sport filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {sports.map(sport => (
            <button
              key={sport}
              onClick={() => { setActiveSport(sport); setVisibleCount(3); }}
              className={cn(
                "px-5 py-2 rounded-full font-label font-bold text-xs uppercase tracking-widest transition-all",
                activeSport === sport
                  ? "bg-secondary text-on-secondary shadow-[0_0_12px_rgba(0,238,252,0.3)]"
                  : "bg-surface-container-highest text-on-surface hover:bg-surface-bright"
              )}
            >
              {sport}
            </button>
          ))}
        </div>
        {/* Results count */}
        <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-6">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </p>
      </section>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-20">
          <Search className="w-16 h-16 mx-auto mb-4 text-on-surface-variant opacity-30" />
          <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-on-surface-variant">No events found</h3>
          <p className="text-sm text-on-surface-variant mt-2">Try adjusting your search or filters.</p>
          <button onClick={() => { setSearchQuery(''); setActiveSport('All Sports'); }} className="mt-4 text-primary text-sm font-bold hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.slice(0, visibleCount).map((event) => (
            <motion.div
              key={event.id}
              layoutId={`event-${event.id}`}
              onClick={() => onEventClick(event)}
              className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 cursor-pointer border border-outline-variant/10 hover:border-primary/30"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={event.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={cn(
                  'absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest',
                  event.sport === 'Basketball' ? 'bg-tertiary text-on-tertiary' : 'bg-secondary text-on-secondary'
                )}>
                  {event.sport}
                </div>
                {event.status === 'live' && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    LIVE
                  </div>
                )}
                {event.status === 'finished' && (
                  <div className="absolute top-3 right-3 bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">
                    ENDED
                  </div>
                )}
                {event.prizePool && (
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-background px-2 py-0.5 rounded text-[10px] font-black uppercase">
                    🏆 {event.prizePool}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-headline text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <span className={cn('font-label font-bold text-sm flex-shrink-0 ml-2', event.entryFee === 'Free' ? 'text-secondary' : 'text-primary')}>
                    {event.entryFee}
                  </span>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs font-label">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs font-label truncate">{event.location}</span>
                  </div>
                  {event.registrations && (
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <Users className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-label">{event.registrations} registered</span>
                    </div>
                  )}
                </div>
                <div className="mt-auto">
                  <button
                    onClick={e => { e.stopPropagation(); onEventClick(event); }}
                    className={cn(
                      'w-full font-headline font-bold py-2.5 rounded-lg uppercase tracking-wider text-xs transition-all active:scale-95',
                      event.status === 'finished'
                        ? 'bg-surface-container-highest text-on-surface-variant cursor-default'
                        : event.entryFee === 'Free'
                          ? 'bg-secondary text-background hover:brightness-110'
                          : 'kinetic-gradient text-background hover:shadow-[0_0_20px_rgba(202,253,0,0.3)]'
                    )}
                  >
                    {event.status === 'finished' ? 'Event Ended' : event.entryFee === 'Free' ? 'Claim Free Spot' : 'Register Now →'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        {filteredEvents.length > visibleCount ? (
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 px-8 py-4 bg-surface-container-highest text-on-surface rounded-xl border border-outline-variant/20 font-headline font-bold hover:bg-surface-bright transition-all group uppercase tracking-wider text-sm"
          >
            {isLoadingMore ? (
              <><Loader2 className="w-5 h-5 animate-spin text-primary" /> Loading...</>
            ) : (
              <>Load More <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
            )}
          </button>
        ) : filteredEvents.length > 0 ? (
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">All {filteredEvents.length} events shown</p>
        ) : null}
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
                 className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary"
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
                   className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary"
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
                   className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:outline-none focus:border-primary"
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
  const [activeTab, setActiveTab] = useState<'Overview' | 'Leaderboard' | 'Rules'>('Overview');
  const [isRulesExpanded, setIsRulesExpanded] = useState(true);
  const [isBracketExpanded, setIsBracketExpanded] = useState(false);
  const { addNotification } = useNotification();

  const leaderboard = [
    { rank: 1, name: 'Alex Sterling', points: 2450, isUser: true },
    { rank: 2, name: 'Sarah Chen', points: 2310, isUser: false },
    { rank: 3, name: 'Marcus Vane', points: 2150, isUser: false },
    { rank: 4, name: 'Elena Rostova', points: 1980, isUser: false },
  ];

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
            {event.status === 'live' && (
              <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-label flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />LIVE NOW
              </span>
            )}
            {event.status === 'upcoming' && (
              <span className="bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-label">UPCOMING</span>
            )}
            {event.status === 'finished' && (
              <span className="bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-label">FINISHED</span>
            )}
            <span className="bg-tertiary text-on-tertiary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm font-label">{event.category}</span>
          </div>
          <h2 className="text-5xl font-black text-white font-headline leading-none tracking-tighter mb-2 uppercase italic">
            {event.title}
          </h2>
          <div className="flex items-center gap-4 text-white/80 font-label text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-surface-container-low border-b border-outline-variant/20 backdrop-blur-md">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Entry Fee</p>
              <p className="text-xl font-bold font-headline text-on-surface">{event.entryFee}</p>
            </div>
            {event.prizePool && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Prize Pool</p>
                <p className="text-xl font-bold font-headline text-primary">{event.prizePool}</p>
              </div>
            )}
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
        <div className="flex border-t border-outline-variant/10 px-6 overflow-x-auto no-scrollbar">
          {['Overview', 'Leaderboard', 'Rules'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "px-6 py-3 font-headline uppercase font-bold tracking-widest text-xs transition-all whitespace-nowrap",
                activeTab === tab ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8 max-w-3xl mx-auto">
        {activeTab === 'Overview' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-10">
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Organizer</h3>
              <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center border border-outline-variant/20">
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
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-outline">Registered Competitors</h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-surface-container bg-surface-container-highest flex-shrink-0 relative overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full rounded-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center flex-shrink-0 bg-surface-container-lowest">
                   <span className="text-xs font-bold text-on-surface-variant">+42</span>
                </div>
              </div>
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
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                  <p className="text-[10px] font-bold text-outline uppercase mb-1">Day 1 • 14:00</p>
                  <p className="font-bold text-sm">Group Stage</p>
                  <p className="text-[10px] text-on-surface-variant mt-2 uppercase">Main Arena</p>
                </div>
                <div className="col-span-2 bg-surface-container-low p-4 rounded-xl flex justify-between items-center border border-outline-variant/10">
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
              <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 hover:border-primary/50 transition-colors">
                <div className="p-4 border-b border-outline-variant/20 bg-surface-container flex justify-between items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Round of 16 • Match 04 — Quarterfinals</p>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="p-6 space-y-6 relative">
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 h-16 w-1 bg-surface-container-highest rounded-full"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center border border-tertiary/30">
                        <span className="text-[10px] font-bold text-tertiary">BK</span>
                      </div>
                      <span className="font-bold text-on-surface">Brooklyn Jets</span>
                    </div>
                    <span className="font-black text-xl font-headline text-on-surface">102</span>
                  </div>
                  <div className="flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                        <span className="text-[10px] font-bold text-secondary">QS</span>
                      </div>
                      <span className="font-bold text-on-surface">Queens Stars</span>
                    </div>
                    <span className="font-black text-xl font-headline text-on-surface">94</span>
                  </div>
                </div>
                <AnimatePresence>
                  {isBracketExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-outline-variant/10 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Full Bracket — Semifinals</p>
                        {[
                          { a: 'Manhattan Kings', sa: 88, b: 'Bronx Bulls', sb: 74 },
                          { a: 'Staten Wolves', sa: 91, b: 'Harlem Heat', sb: 83 },
                        ].map((match, i) => (
                          <div key={i} className="bg-surface-container-highest rounded-lg p-4 space-y-3">
                            <div className="flex justify-between text-sm font-bold"><span className="text-on-surface">{match.a}</span><span>{match.sa}</span></div>
                            <div className="flex justify-between text-sm font-bold opacity-50"><span className="text-on-surface">{match.b}</span><span>{match.sb}</span></div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="p-4 bg-surface-container-highest flex justify-center border-t border-outline-variant/10">
                  <button
                    onClick={() => setIsBracketExpanded(!isBracketExpanded)}
                    className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    {isBracketExpanded ? 'Collapse Bracket' : 'Expand Full Bracket'}
                    <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', isBracketExpanded && 'rotate-180')} />
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'Leaderboard' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-4">
             <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
               <div className="p-4 bg-surface-container-highest flex justify-between items-center border-b border-outline-variant/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Live Standings</span>
                  <span className="text-[10px] bg-error-container text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse">Live</span>
               </div>
               <div className="divide-y divide-outline-variant/10">
                 {leaderboard.map((user) => (
                   <div key={user.rank} className={cn("flex justify-between items-center p-4 transition-colors hover:bg-surface-container-highest", user.isUser ? "bg-primary/5 border-l-4 border-l-primary" : "")}>
                     <div className="flex items-center gap-4">
                        <span className={cn("font-headline font-black italic text-2xl w-8 text-center", user.rank === 1 ? "text-[#CCFF00]" : user.rank === 2 ? "text-[#00FFFF]" : user.rank === 3 ? "text-[#ff7948]" : "text-outline")}>
                          #{user.rank}
                        </span>
                        <div className="flex items-center gap-3">
                           <img src={`https://i.pravatar.cc/100?img=${user.rank + 20}`} className="w-10 h-10 rounded-full object-cover border border-outline-variant/20" />
                           <span className="font-bold text-on-surface">{user.name} {user.isUser && <span className="text-xs text-primary ml-2 uppercase font-black">(You)</span>}</span>
                        </div>
                     </div>
                     <span className="font-headline font-black italic text-xl">{user.points} <span className="text-sm font-medium text-on-surface-variant">pts</span></span>
                   </div>
                 ))}
               </div>
             </div>
          </motion.div>
        )}

        {activeTab === 'Rules' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-4">
             <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setIsRulesExpanded(!isRulesExpanded)}
                  className="w-full flex justify-between items-center p-6 hover:bg-surface-container-highest transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-primary w-6 h-6" />
                    <span className="font-headline font-bold uppercase tracking-widest text-lg">Official Rules & Regulations</span>
                  </div>
                  <ChevronDown className={cn("w-6 h-6 text-on-surface-variant transition-transform duration-300", isRulesExpanded ? "rotate-180" : "")} />
                </button>
                
                <AnimatePresence>
                  {isRulesExpanded && (
                    <motion.div 
                      initial={{height: 0, opacity: 0}}
                      animate={{height: 'auto', opacity: 1}}
                      exit={{height: 0, opacity: 0}}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-outline-variant/10 text-sm text-on-surface-variant leading-relaxed space-y-4">
                        <p>1. <strong className="text-on-surface">Eligibility</strong>: All participants must be registered members of SkillSurfer and possess an active account in good standing.</p>
                        <p>2. <strong className="text-on-surface">Code of Conduct</strong>: Any form of cheating, exploitation of bugs, or unsportsmanlike behavior will result in immediate disqualification.</p>
                        <p>3. <strong className="text-on-surface">Prizing</strong>: Prizes will be distributed within 30 days of tournament completion. Taxes are the sole responsibility of the winners.</p>
                        <p>4. <strong className="text-on-surface">Format</strong>: Double elimination bracket. All matches are Best of 3 until the Grand Finals, which will be Best of 5.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </motion.div>
        )}
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
  
  const skillData = [
    { subject: 'Logic', A: 120, fullMark: 150 },
    { subject: 'Speed', A: 98, fullMark: 150 },
    { subject: 'Algorithms', A: 86, fullMark: 150 },
    { subject: 'UI/UX', A: 99, fullMark: 150 },
    { subject: 'Data', A: 85, fullMark: 150 },
    { subject: 'Math', A: 65, fullMark: 150 },
  ];

  const recentActivity = [
    { id: 1, type: 'tournament', title: 'Metro Hoops Open', result: '1st Place', points: '+500', time: '2 days ago' },
    { id: 2, type: 'badge', title: 'Speed Demon Badge', result: 'Earned', points: '+50', time: '5 days ago' },
    { id: 3, type: 'practice', title: 'Dynamic Programming', result: 'Completed', points: '+100', time: '1 week ago' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">
       <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter uppercase italic text-on-surface">Analytics Hub</h2>
       
       {/* Key Metrics */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Global Rank', value: '#42', color: 'text-primary' },
           { label: 'Total Points', value: '12.4K', color: 'text-secondary' },
           { label: 'Win Rate', value: '68%', color: 'text-tertiary' },
           { label: 'Tournaments', value: '14', color: 'text-on-surface' }
         ].map((stat, i) => (
           <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: i*0.1}} key={stat.label} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
             <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{stat.label}</p>
             <p className={cn("text-4xl font-headline font-black italic tracking-tighter", stat.color)}>{stat.value}</p>
           </motion.div>
         ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Skills Radar */}
         <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-8 font-label">Skill Distribution</h3>
            <div className="h-64 flex-grow w-full relative -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#888', fontSize: 10, fontWeight: 'bold'}} />
                  <Radar name="Skills" dataKey="A" stroke="#00eefc" fill="#00eefc" fillOpacity={0.3} />
                  <Tooltip contentStyle={{backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'}} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Platform Engagement */}
         <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 flex flex-col lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8 font-label">Platform Engagement</h3>
            <div className="h-64 flex-grow w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <Bar dataKey="points" fill="#cafd00" radius={[4,4,0,0]} />
                  <XAxis dataKey="name" stroke="#adaaaa" tickLine={false} axisLine={false} tick={{fill: '#adaaaa', fontSize: 10, fontWeight: 'bold'}} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>
       </div>

       {/* Recent Activity */}
       <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface font-label">Recent Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map(act => (
              <div key={act.id} className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl hover:bg-surface-bright transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", act.type === 'tournament' ? "bg-primary/20 text-primary" : act.type === 'badge' ? "bg-tertiary/20 text-tertiary" : "bg-secondary/20 text-secondary")}>
                     {act.type === 'tournament' ? <Trophy className="w-5 h-5"/> : act.type === 'badge' ? <Star className="w-5 h-5"/> : <Code className="w-5 h-5"/>}
                   </div>
                   <div>
                     <p className="font-bold text-on-surface">{act.title}</p>
                     <p className="text-xs text-on-surface-variant font-label tracking-wide">{act.result} • {act.time}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-headline font-black italic text-primary">{act.points}</p>
                 </div>
              </div>
            ))}
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

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <Layout
      title={activeScreen === 'director' ? 'Organizer Hub' : 'SkillSurfer'}
      showBack={activeScreen === 'event-details'}
      onBack={handleBack}
      currentScreen={activeScreen === 'event-details' ? 'events' : activeScreen}
      onNavigate={handleScreenChange}
      userRole={userRole}
      onLogout={handleLogout}
      activeScreen={activeScreen}
    >
      {activeScreen === 'events' && <EventsFeed onEventClick={handleEventClick} />}
      {activeScreen === 'event-details' && selectedEvent && (
        <EventDetails event={selectedEvent} onBack={handleBack} />
      )}
      {activeScreen === 'profile' && <Profile onNavigate={handleScreenChange} />}
      {activeScreen === 'director' && <OrganizerDashboard onNavigate={handleScreenChange} />}
      {activeScreen === 'event-wizard' && (
        <EventWizard onBack={() => handleScreenChange('director')} onComplete={() => handleScreenChange('director')} />
      )}
      {activeScreen === 'manage-event' && <ManageEvent onBack={() => handleScreenChange('director')} />}
      {activeScreen === 'certificates' && <CertificateStudio onBack={() => handleScreenChange('director')} />}
      {activeScreen === 'home' && <HomeScreen onEventClick={handleEventClick} onNavigate={handleScreenChange} />}
      {activeScreen === 'explore' && <Explore onEventClick={handleEventClick} />}
      {activeScreen === 'stats' && <Analytics />}
      {activeScreen === 'practice' && <PracticeArena />}
      {activeScreen === 'jobs' && <JobsBoard />}
      {activeScreen === 'network' && <TeamBuilder />}

      {/* Floating Action Button for organizers */}
      {['home', 'events', 'stats'].includes(activeScreen) && userRole === 'organizer' && (
        <button
          onClick={() => handleScreenChange('director')}
          className="fixed bottom-12 right-12 w-14 h-14 kinetic-gradient rounded-full shadow-2xl flex items-center justify-center text-on-primary-container z-40 transition-transform hover:rotate-12 active:scale-90"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}
    </Layout>
  );
}

export default function App() {
  const [appState, setAppState] = useState<'landing' | 'login' | 'app'>('landing');
  const [userRole, setUserRole] = useState<'student' | 'organizer' | null>(null);

  if (appState === 'landing') {
    return <LandingPage onGetStarted={() => setAppState('login')} />;
  }

  if (appState === 'login' || !userRole) {
    return (
      <Login
        onLogin={(role) => {
          setUserRole(role);
          setAppState('app');
        }}
      />
    );
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
