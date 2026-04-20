import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Calendar, Trophy, Users, User, Bell, CreditCard, LineChart, Settings, ArrowLeft,
  Activity, Zap, Target, Award
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EVENTS } from '../data';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

export const OrganizerDashboard = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const managedEvents = EVENTS.slice(3, 8);

  const stats = [
    { label: 'Active Opportunities', value: '12', change: '+2 this month', icon: Trophy, color: 'text-primary' },
    { label: 'Total Participants', value: '8,420', change: 'Across all events', icon: Users, color: 'text-secondary' },
    { label: 'Avg. Engagement', value: '76%', change: 'Top quartile', icon: Zap, color: 'text-tertiary' },
  ];

  const activityData = [
    { day: 'Mon', reg: 120 }, { day: 'Tue', reg: 250 }, { day: 'Wed', reg: 400 },
    { day: 'Thu', reg: 350 }, { day: 'Fri', reg: 600 }, { day: 'Sat', reg: 800 }, { day: 'Sun', reg: 1250 }
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-12">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">ORGANIZER PANEL</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary drop-shadow-[0_0_15px_rgba(0,238,252,0.3)] mt-2 tracking-tighter uppercase italic">
            Command Center
          </h2>
        </div>
        <button 
          onClick={() => onNavigate('event-wizard')}
          className="kinetic-gradient text-on-primary-container px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_30px_rgba(202,253,0,0.3)] text-lg uppercase tracking-wider font-headline"
        >
          <Plus className="w-6 h-6" />
          Host New Event
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={stat.label} className={cn(
            "bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group border border-outline-variant/10",
            idx === 1 && "border-t-4 border-t-secondary"
          )}>
            <div className="relative z-10">
              <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <stat.icon className={cn("w-4 h-4", stat.color)} /> {stat.label}
              </p>
              <div className="flex flex-col gap-1">
                <span className={cn("text-5xl font-headline font-black", stat.color)}>{stat.value}</span>
                <span className="font-label text-xs uppercase text-on-surface-variant tracking-wider">{stat.change}</span>
              </div>
            </div>
            <stat.icon className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500" />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-headline font-bold flex items-center gap-3">
               <span className="w-8 h-[2px] bg-primary"></span>
               Live Activity Pulse
             </h3>
             <select className="bg-surface-container-highest border-none text-xs font-bold uppercase tracking-widest p-2 rounded focus:outline-none">
               <option>Last 7 Days</option>
               <option>This Month</option>
             </select>
           </div>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00eefc" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00eefc" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#adaaaa" tickLine={false} axisLine={false} tick={{fill: '#adaaaa', fontSize: 10}} />
                  <Tooltip cursor={{stroke: 'rgba(255,255,255,0.1)'}} contentStyle={{backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}} />
                  <Area type="monotone" dataKey="reg" stroke="#00eefc" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
          <h3 className="text-xl font-headline font-bold mb-6 text-[#00eefc]">Recent Actions</h3>
          <div className="space-y-6">
            {[
              { name: 'Global AI Hackathon', action: 'New Registration', time: '2m ago', color: 'text-primary' },
              { name: 'Winter Clash 2024', action: 'Round 1 Ended', time: '1h ago', color: 'text-tertiary' },
              { name: 'Code Sprint', action: 'Draft Saved', time: '3h ago', color: 'text-on-surface-variant' },
            ].map(reg => (
              <div key={reg.name} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-[#00eefc] overflow-hidden shrink-0 mt-1">
                  <Activity className={cn("w-5 h-5", reg.color)} />
                </div>
                <div className="flex-grow">
                  <h5 className="text-sm font-bold text-on-surface leading-tight">{reg.name}</h5>
                  <p className="text-xs text-on-surface-variant mt-1">{reg.action}</p>
                </div>
                <span className="text-[10px] text-on-surface-variant font-label uppercase">{reg.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 border border-dashed border-outline-variant/30 rounded-xl text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">
            View Activity Log
          </button>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-headline font-bold tracking-tight flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary"></span>
            Your Opportunities
          </h3>
          <div className="flex gap-2">
            {['All', 'Live', 'Drafts', 'Completed'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn("px-5 py-2 rounded-full text-xs font-bold font-label uppercase tracking-widest transition-all", filter === f ? 'bg-primary text-background shadow-[0_0_10px_rgba(202,253,0,0.3)]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest')}
              >{f}</button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {managedEvents
            .map((event, idx) => (
            <div key={event.id} className="bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all p-4 md:p-6 rounded-2xl group flex flex-col md:flex-row items-center gap-6 cursor-pointer" onClick={() => onNavigate('manage-event')}>
              <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={event.image || ''} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <span className={cn(
                  "absolute bottom-3 left-3 px-2 py-1 rounded text-[10px] font-black font-label uppercase",
                  idx === 0 ? "bg-error text-on-surface animate-pulse" : "bg-surface-container-highest text-on-surface"
                )}>
                  {idx === 0 ? 'LIVE NOW' : idx === 1 ? 'Starts Soon' : 'Draft'}
                </span>
              </div>
              <div className="flex-grow w-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/30 px-2 py-0.5 rounded">{event.sport}</span>
                  <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">{event.location}</span>
                </div>
                <h4 className="text-2xl font-headline font-black text-on-surface mb-2 uppercase italic group-hover:text-primary transition-colors">{event.title}</h4>
                <div className="flex items-center gap-6 text-sm text-on-surface-variant font-label">
                  <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 1,240 Registered</span>
                  <span className="flex items-center gap-2"><Target className="w-4 h-4" /> 3 Stages</span>
                </div>
              </div>
              <div className="flex w-full md:w-auto shrink-0 mt-4 md:mt-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate('manage-event'); }}
                  className="w-full md:w-auto bg-surface-container-highest border border-outline-variant/30 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-background hover:border-transparent transition-all shadow-none hover:shadow-[0_0_20px_rgba(202,253,0,0.4)]"
                >
                  Manage <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
