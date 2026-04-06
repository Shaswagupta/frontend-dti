import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Calendar, Trophy, Users, User, Bell, CreditCard, LineChart, Settings, X, ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EVENTS } from '../data';

const CreateTournamentModal = ({ 
  isOpen, 
  onClose,
  onCreate
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onCreate: (data: any) => void;
}) => {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('Basketball');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({name, sport});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/20 bg-surface-container-low/95 backdrop-blur">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00eefc] font-label">Organizer Panel</span>
            <h3 className="text-2xl font-black font-headline uppercase leading-tight italic">Create Tournament</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 bg-surface-container-highest rounded-full hover:bg-surface-bright transition-colors">
             <X className="w-5 h-5 text-on-surface" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase font-label">Tournament Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#00eefc]"
              placeholder="e.g. Winter Clash 2024"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase font-label">Sport Category</label>
            <select 
              value={sport}
              onChange={e => setSport(e.target.value)}
              className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg p-3 text-white focus:outline-none focus:border-primary appearance-none bg-transparent"
            >
              <option className="bg-surface-container-low">Basketball</option>
              <option className="bg-surface-container-low">Soccer</option>
              <option className="bg-surface-container-low">Tennis</option>
              <option className="bg-surface-container-low">Aquatics</option>
            </select>
          </div>
          <div className="pt-4 border-t border-outline-variant/20">
             <button type="submit" className="w-full kinetic-gradient py-4 rounded-xl text-on-primary-container font-headline font-black uppercase italic tracking-wider text-xl hover:shadow-[0_0_30px_rgba(202,253,0,0.3)] transition-all active:scale-95">
               Publish Event
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const OrganizerDashboard = () => {
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [managedEvents, setManagedEvents] = useState(EVENTS.slice(3, 8));

  const handleCreate = (data: any) => {
    setManagedEvents([{
      id: Math.random().toString(),
      title: data.name,
      sport: data.sport,
      category: 'Pro',
      location: 'Virtual Area',
      date: 'TBD',
      time: 'TBD',
      entryFee: '$0',
      prizePool: 'TBD',
      status: 'upcoming',
      image: EVENTS[0].image,
    }, ...managedEvents]);
    setIsModalOpen(false);
  };

  const stats = [
    { label: 'Active Tournaments', value: '12', change: '+2', icon: Trophy, color: 'text-primary' },
    { label: 'Total Athletes', value: '842', change: 'PRO', icon: Users, color: 'text-secondary' },
    { label: 'Registrations', value: '2.4k', change: 'UP', icon: Calendar, color: 'text-tertiary' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">ORGANIZER PANEL</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary drop-shadow-[0_0_15px_rgba(0,238,252,0.3)] mt-2 tracking-tighter uppercase">
            SKILLSURFER: ORGANIZER HUB
          </h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="kinetic-gradient text-on-primary-container px-6 py-4 rounded-md font-bold flex items-center gap-2 hover:scale-95 active:duration-150 transition-all shadow-[0_4px_20px_rgba(202,253,0,0.2)]"
        >
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
            <button 
              onClick={() => setFilter('All')}
              className={cn("px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-wider transition-colors", filter === 'All' ? 'bg-[#00eefc] text-black' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest')}
            >All</button>
            <button 
              onClick={() => setFilter('Live')}
              className={cn("px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-wider transition-colors", filter === 'Live' ? 'bg-[#00eefc] text-black' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest')}
            >Live</button>
            <button 
              onClick={() => setFilter('Finished')}
              className={cn("px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-wider transition-colors", filter === 'Finished' ? 'bg-[#00eefc] text-black' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest')}
            >Finished</button>
          </div>
        </div>
        <div className="space-y-4">
          {managedEvents
            .filter(e => filter === 'All' ? true : filter === 'Live' ? (e.status === 'live' || e.status === 'upcoming') : e.status === 'finished')
            .map((event, idx) => (
            <div key={event.id} className="bg-[#1F2833] hover:bg-surface-container-highest transition-all p-6 rounded-xl group flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={event.image || ''} />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold font-label uppercase",
                    idx === 0 ? "bg-[#00eefc] text-black animate-pulse" : "bg-surface-container-highest text-on-surface-variant"
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
                  <p className="text-[#00eefc] font-headline font-bold text-lg">
                    {idx === 2 ? 'J. Thorne' : event.prizePool || '$50,000'}
                  </p>
                </div>
                <button className="bg-surface-container-highest border border-outline-variant px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-[#00eefc] hover:text-black hover:border-transparent transition-colors shadow-none hover:shadow-[0_0_15px_rgba(0,238,252,0.3)]">
                  {idx === 0 ? 'MANAGE' : idx === 1 ? 'EDIT SETUP' : 'REPORTS'}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111111] border border-white/5 p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-headline font-bold mb-6 text-[#00eefc]">Recent Registrations</h3>
          <div className="space-y-6">
            {[
              { name: 'Marcus Vane', action: 'Joined Pacific Peak', time: '2m ago', color: 'text-[#00eefc]' },
              { name: 'Sarah Sterling', action: 'Joined Neon Sprint', time: '15m ago', color: 'text-[#00eefc]' },
              { name: 'Alex Chen', action: 'Joined Iron Grip', time: '1h ago', color: 'text-[#00eefc]' },
            ].map(reg => (
              <div key={reg.name} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-[#00eefc] overflow-hidden">
                  <User className="w-6 h-6 text-[#00eefc]" />
                </div>
                <div className="flex-grow">
                  <h5 className="text-sm font-bold text-white">{reg.name}</h5>
                  <p className="text-xs text-on-surface-variant">{reg.action}</p>
                </div>
                <span className="text-[10px] text-[#00eefc] font-label uppercase">{reg.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#111111] p-8 rounded-xl border border-[#00eefc]/20 shadow-lg">
          <h3 className="text-xl font-headline font-bold mb-6 text-[#00eefc]">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Broadcast', icon: Bell, color: 'text-primary' },
              { label: 'Payouts', icon: CreditCard, color: 'text-[#00eefc]' },
              { label: 'Analytics', icon: LineChart, color: 'text-[#00eefc]' },
              { label: 'Config', icon: Settings, color: 'text-white' },
            ].map(action => (
              <button 
                key={action.label} 
                onClick={() => {
                  setActiveAction(action.label);
                  setTimeout(() => setActiveAction(null), 1500);
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 p-6 rounded-lg transition-all group overflow-hidden relative border border-transparent hover:border-[#00eefc]/50 hover:shadow-[0_0_15px_rgba(0,238,252,0.2)] hover:scale-105",
                  activeAction === action.label 
                    ? "bg-[#00eefc] text-black scale-[0.98]" 
                    : "bg-surface-container-highest text-on-surface"
                )}
              >
                {activeAction === action.label ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#00eefc] text-black font-bold text-xs tracking-widest uppercase animate-pulse">
                    Launched
                  </div>
                ) : (
                  <>
                    <action.icon className={cn("w-8 h-8 transition-transform", action.color)} />
                    <span className="text-[10px] font-bold font-label tracking-widest uppercase">{action.label}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isModalOpen && (
          <CreateTournamentModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
