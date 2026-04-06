/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  ChevronDown
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
  onMenuClick 
}: { 
  title?: string; 
  showBack?: boolean; 
  onBack?: () => void;
  onMenuClick?: () => void;
}) => (
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
    <div className="flex items-center gap-6">
      <nav className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
        <a href="#" className="text-white hover:text-primary transition-colors">Home</a>
        <a href="#" className="text-white hover:text-primary transition-colors">Explore</a>
        <a href="#" className="text-primary">Events</a>
        <a href="#" className="text-white hover:text-primary transition-colors">Stats</a>
      </nav>
      <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden">
        <img 
          alt="Profile" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuqCB8t5UO73tLceYWC1oFnaSiZLNdsTassO2jxxua4aI_2nWjSm7woybxa84knjkFgnSEs7urJLWB20ykiBIEQHSKUHcIhTNAzs0p3fHEcUi8QqtllwPXk_42-rH5JY98AtCUuVnsoKyOgKOa6bOxWLPWQsaLgYcd4nlxmdszDCltKEyH_y5p7oNhJ5A3AAkN5ztlLvzIRB3awRHuiK_D3X2rzVikAVQ-29pv8V-4JMdbCM0IYIUo74dpU_xWMNKiKl4Zrq0lHduK" 
        />
      </div>
    </div>
  </header>
);

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
        {EVENTS.filter(e => activeSport === 'All Sports' || e.sport === activeSport).map((event) => (
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
        <button className="flex items-center gap-2 px-8 py-4 bg-surface-container-highest text-white rounded-lg border border-outline-variant/20 font-headline font-bold hover:bg-surface-bright transition-all group">
          LOAD MORE CHALLENGES
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const EventDetails = ({ event, onBack }: { event: Event; onBack: () => void }) => {
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
        <button className="kinetic-gradient text-on-primary-container px-8 py-3 rounded-md font-bold uppercase tracking-tighter text-sm active:scale-95 transition-transform">
          Join Tournament
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
    </div>
  );
};

const Profile = () => {
  const weeklyData = [
    { day: 'Mon', intensity: 30 },
    { day: 'Tue', intensity: 45 },
    { day: 'Wed', intensity: 85 },
    { day: 'Thu', intensity: 100 },
    { day: 'Fri', intensity: 60 },
    { day: 'Sat', intensity: 40 },
    { day: 'Sun', intensity: 25 },
  ];

  return (
    <div className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <section className="relative mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative overflow-hidden rounded-xl bg-surface-container-low p-8 flex flex-col justify-end min-h-[320px]">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Athlete background" 
              className="w-full h-full object-cover opacity-40" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJdNxmbuEq6u7za42lV3Xs5CvklS9h6v1af0JjN9Gw6vih_ZwVYY1tb1BqmlxrnCaNmtXzi8JlSKhw6FhnJQmLqka1OIquZHSd2sBpAnEQLIaTWLGLpHg7cMQAL5NXB93a4WNZi98hUcHreQFcEAbyKzApCMtBIzLVd9f5gwaZ8ed95ju-31Xb2U7Cl9CpMgruus7pYe6pncXXmYbI46kHlFRjvjZnrDO5eqWn8Za5mSA6dzK0oY_coBNR7NjoyFBgzciwyU94_Prf" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-4 rounded-md bg-secondary text-on-secondary text-[10px] font-bold uppercase tracking-widest font-headline">All-Star</span>
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-2 italic uppercase leading-none">Alex Sterling</h2>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Total Points</span>
                <span className="text-3xl font-black font-headline text-primary italic leading-none">1,200</span>
              </div>
              <div className="w-px h-10 bg-outline-variant/30"></div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Global Rank</span>
                <span className="text-3xl font-black font-headline text-secondary leading-none">#42</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-highest rounded-xl p-6 flex flex-col justify-between">
          <h3 className="text-xs uppercase tracking-widest text-primary font-bold mb-6">Achievement Badges</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-primary/20 group-hover:bg-primary/10 transition-colors">
                <Rocket className="w-8 h-8 text-primary fill-primary" />
              </div>
              <div>
                <p className="font-headline font-bold text-lg uppercase leading-tight">Game Changer</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-wide">3 Clutch Victories</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center border border-secondary/20 group-hover:bg-secondary/10 transition-colors">
                <Trophy className="w-8 h-8 text-secondary fill-secondary" />
              </div>
              <div>
                <p className="font-headline font-bold text-lg uppercase leading-tight">League Leader</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-wide">Top 5 Division A</p>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-surface-container-high rounded-md text-xs font-bold uppercase tracking-widest hover:bg-surface-bright transition-colors">View All Awards</button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-surface-container-low rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-black text-2xl uppercase italic tracking-tight">Registered Tournaments</h3>
            <span className="text-xs font-bold uppercase text-primary tracking-widest cursor-pointer hover:underline">See Schedule</span>
          </div>
          <div className="space-y-4">
            {EVENTS.slice(0, 2).map((event, idx) => (
              <div key={event.id} className={cn(
                "bg-surface-container-highest p-4 rounded-xl flex items-center justify-between group cursor-pointer border-l-4 border-transparent transition-all",
                idx === 0 ? "hover:border-secondary" : "hover:border-tertiary"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src={event.image} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold uppercase tracking-tight">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <CalendarDays className="w-3 h-3" />
                      <span>{event.date}, 2023</span>
                      <span className="mx-1">•</span>
                      <span>{event.location.split(',')[1] || event.location}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-6 h-6 group-hover:translate-x-1 transition-transform",
                  idx === 0 ? "text-secondary" : "text-tertiary"
                )} />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-highest rounded-xl p-6 flex-1">
            <h3 className="text-xs uppercase tracking-widest text-secondary font-bold mb-4">Weekly Intensity</h3>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <Bar dataKey="intensity" radius={[2, 2, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.intensity === 100 ? '#00eefc' : '#006970'} 
                        fillOpacity={entry.intensity === 100 ? 1 : 0.5}
                      />
                    ))}
                  </Bar>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#adaaaa', fontSize: 10, fontWeight: 'bold' }} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="kinetic-gradient rounded-xl p-6 text-on-primary-container">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase font-black tracking-widest opacity-80">Last Match Score</p>
                <h4 className="text-4xl font-black font-headline italic tracking-tighter">94.2</h4>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[10px] mt-4 uppercase font-bold">+12% from previous season average</p>
          </div>
        </div>

        <div className="md:col-span-12 bg-surface-container-low rounded-xl p-6">
          <h3 className="font-headline font-black text-2xl uppercase italic tracking-tight mb-6">Past Matches</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest border-b border-outline-variant/10">
                <tr>
                  <th className="pb-4 pr-4">Event</th>
                  <th className="pb-4 pr-4">Result</th>
                  <th className="pb-4 pr-4">Score</th>
                  <th className="pb-4 pr-4">Points</th>
                  <th className="pb-4">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {MATCHES.map(match => (
                  <tr key={match.id} className="hover:bg-surface-container-highest transition-colors cursor-pointer">
                    <td className="py-4 pr-4 font-bold uppercase tracking-tight">{match.event}</td>
                    <td className="py-4 pr-4">
                      <span className={cn(
                        "uppercase font-black italic",
                        match.result === 'Win' ? "text-primary" : "text-secondary"
                      )}>{match.result}</span>
                    </td>
                    <td className="py-4 pr-4 font-headline">{match.score}</td>
                    <td className="py-4 pr-4">{match.points}</td>
                    <td className="py-4 text-on-surface-variant">{match.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DirectorDashboard = () => {
  const stats = [
    { label: 'Active Tournaments', value: '12', change: '+2', icon: Trophy, color: 'text-primary' },
    { label: 'Total Athletes', value: '842', change: 'PRO', icon: Users, color: 'text-secondary' },
    { label: 'Registrations', value: '2.4k', change: 'UP', icon: Calendar, color: 'text-tertiary' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">DIRECTOR PANEL</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter">Performance Hub.</h2>
        </div>
        <button className="kinetic-gradient text-on-primary-container px-6 py-4 rounded-md font-bold flex items-center gap-2 hover:scale-95 active:duration-150 transition-all shadow-[0_4px_20px_rgba(202,253,0,0.2)]">
          <Plus className="w-6 h-6" />
          CREATE TOURNAMENT
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={stat.label} className={cn(
            "bg-surface-container-low p-8 rounded-xl relative overflow-hidden group",
            idx === 1 && "border-l-4 border-secondary"
          )}>
            <div className="relative z-10">
              <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-4">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-6xl font-headline font-black", stat.color)}>{stat.value}</span>
                <span className={cn("font-headline font-bold text-xl opacity-60", stat.color)}>{stat.change}</span>
              </div>
            </div>
            <stat.icon className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity" />
          </div>
        ))}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-headline font-bold tracking-tight flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary"></span>
            Managed Events
          </h3>
          <div className="flex gap-2">
            <button className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-wider">All</button>
            <button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-wider hover:bg-surface-container-highest transition-colors">Live</button>
            <button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-wider hover:bg-surface-container-highest transition-colors">Finished</button>
          </div>
        </div>
        <div className="space-y-4">
          {EVENTS.slice(3, 6).map((event, idx) => (
            <div key={event.id} className="bg-surface-container-low hover:bg-surface-container-highest transition-all p-6 rounded-xl group flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={event.image} />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold font-label uppercase",
                    idx === 0 ? "bg-error-container text-white animate-pulse" : "bg-surface-container-highest text-on-surface-variant"
                  )}>
                    {idx === 0 ? 'LIVE NOW' : idx === 1 ? 'Starts in 3 Days' : 'Finished'}
                  </span>
                  <span className="text-on-surface-variant text-xs font-label uppercase">{event.location}</span>
                </div>
                <h4 className="text-xl font-headline font-bold text-on-surface mb-1">{event.title}</h4>
                <p className="text-on-surface-variant text-sm line-clamp-1">Elite competition featuring top global pros.</p>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                    {idx === 2 ? 'Winner' : 'Prize Pool'}
                  </p>
                  <p className="text-primary font-headline font-bold text-lg">
                    {idx === 2 ? 'J. Thorne' : event.prizePool || '$50,000'}
                  </p>
                </div>
                <button className="bg-surface-container-highest border border-outline-variant px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-colors">
                  {idx === 0 ? 'MANAGE' : idx === 1 ? 'EDIT SETUP' : 'REPORTS'}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 rounded-xl">
          <h3 className="text-xl font-headline font-bold mb-6">Recent Registrations</h3>
          <div className="space-y-6">
            {[
              { name: 'Marcus Vane', action: 'Joined Pacific Peak', time: '2m ago', color: 'text-secondary' },
              { name: 'Sarah Sterling', action: 'Joined Neon Sprint', time: '15m ago', color: 'text-primary' },
              { name: 'Alex Chen', action: 'Joined Iron Grip', time: '1h ago', color: 'text-tertiary' },
            ].map(reg => (
              <div key={reg.name} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary overflow-hidden">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h5 className="text-sm font-bold text-on-surface">{reg.name}</h5>
                  <p className="text-xs text-on-surface-variant">{reg.action}</p>
                </div>
                <span className="text-[10px] text-on-surface-variant font-label uppercase">{reg.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl border border-primary/20">
          <h3 className="text-xl font-headline font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Broadcast', icon: Bell, color: 'text-primary' },
              { label: 'Payouts', icon: CreditCard, color: 'text-secondary' },
              { label: 'Analytics', icon: LineChart, color: 'text-tertiary' },
              { label: 'Config', icon: Settings, color: 'text-white' },
            ].map(action => (
              <button key={action.label} className="flex flex-col items-center justify-center gap-3 p-6 bg-surface-container-highest rounded-lg hover:bg-surface-bright transition-colors group">
                <action.icon className={cn("w-8 h-8 group-hover:scale-110 transition-transform", action.color)} />
                <span className="text-[10px] font-bold font-label tracking-widest text-on-surface uppercase">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentScreen('event-details');
  };

  const handleBack = () => {
    setCurrentScreen('events');
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      <TopAppBar 
        title={currentScreen === 'director' ? "Director Hub" : "Skillsurfer"}
        showBack={currentScreen === 'event-details'}
        onBack={handleBack}
        onMenuClick={() => setCurrentScreen('director')}
      />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentScreen === 'events' && <EventsFeed onEventClick={handleEventClick} />}
            {currentScreen === 'event-details' && selectedEvent && (
              <EventDetails event={selectedEvent} onBack={handleBack} />
            )}
            {currentScreen === 'profile' && <Profile />}
            {currentScreen === 'director' && <DirectorDashboard />}
            {['home', 'explore', 'stats'].includes(currentScreen) && (
              <div className="pt-32 flex flex-col items-center justify-center text-on-surface-variant">
                <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-headline font-bold uppercase tracking-widest">
                  {currentScreen} Screen Placeholder
                </p>
                <button 
                  onClick={() => setCurrentScreen('events')}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Back to Events
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavBar 
        currentScreen={currentScreen === 'event-details' ? 'events' : currentScreen} 
        onScreenChange={setCurrentScreen} 
      />

      {/* Floating Action Button */}
      {['home', 'events', 'stats'].includes(currentScreen) && (
        <button className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-14 h-14 kinetic-gradient rounded-full shadow-2xl flex items-center justify-center text-on-primary-container z-40 transition-transform hover:rotate-12 active:scale-90">
          <Plus className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
