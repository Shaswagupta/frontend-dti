import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Edit2, Activity, Settings, Flame, Trophy, CalendarDays, ChevronRight, X, User, Star, Award, Medal, Check } from 'lucide-react';
import { Screen, Event } from '../types';
import { EVENTS } from '../data';
import { cn } from '../lib/utils';
import { useNotification } from '../hooks/useNotification';
interface ProfileProps {
  onNavigate?: (screen: Screen) => void;
  onEventClick?: (event: Event) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate, onEventClick }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Activity' | 'Settings'>('Overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { addNotification } = useNotification();
  
  // State Management for settings and profile
  const [username, setUsername] = useState('Alex Sterling');
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState('alex@skillsurfer.dev');

  // Temporary state for the edit modal
  const [editName, setEditName] = useState(username);
  const [editEmail, setEditEmail] = useState(email);
  const [bio, setBio] = useState('Passionate developer and competitive coder. Always looking for the next big challenge.');
  const [editBio, setEditBio] = useState(bio);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(editName);
    setEmail(editEmail);
    setBio(editBio);
    setIsEditModalOpen(false);
    addNotification('Profile saved successfully');
  };

  const registeredEvents = EVENTS.slice(0, 2);

  const skills = [
    { name: 'Problem Solving', score: 92, color: 'text-[#00FFFF]', bg: 'bg-[#00FFFF]' },
    { name: 'Algorithms', score: 85, color: 'text-[#CCFF00]', bg: 'bg-[#CCFF00]' },
    { name: 'System Design', score: 78, color: 'text-[#ff7948]', bg: 'bg-[#ff7948]' },
  ];

  const trophies = [
    { id: 1, title: 'Code Master', desc: 'Won 5 coding tournaments', icon: <Trophy className="w-8 h-8 text-[#CCFF00]"/>, date: 'Mar 2026' },
    { id: 2, title: 'Early Adopter', desc: 'Joined during Beta', icon: <Star className="w-8 h-8 text-[#00FFFF]"/>, date: 'Jan 2026' },
    { id: 3, title: 'Flawless Victory', desc: 'Perfect score in qualifiers', icon: <Medal className="w-8 h-8 text-[#ff7948]"/>, date: 'Feb 2026' },
    { id: 4, title: 'Top 1%', desc: 'Global ranking tier', icon: <Award className="w-8 h-8 text-primary"/>, date: 'Apr 2026' },
  ];

  const matchHistory = [
    { id: 1, event: 'Metro Hoops Open', placement: '1st Place', date: 'April 15, 2026', points: '+500', isWin: true },
    { id: 2, event: 'City Sports League', placement: '4th Place', date: 'March 28, 2026', points: '+150', isWin: false },
    { id: 3, event: 'Regional Qualifiers', placement: '2nd Place', date: 'March 10, 2026', points: '+300', isWin: true },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-5xl mx-auto bg-background min-h-screen text-on-surface font-body selection:bg-[#00FFFF]/30 relative overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.4)] overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuqCB8t5UO73tLceYWC1oFnaSiZLNdsTassO2jxxua4aI_2nWjSm7woybxa84knjkFgnSEs7urJLWB20ykiBIEQHSKUHcIhTNAzs0p3fHEcUi8QqtllwPXk_42-rH5JY98AtCUuVnsoKyOgKOa6bOxWLPWQsaLgYcd4nlxmdszDCltKEyH_y5p7oNhJ5A3AAkN5ztlLvzIRB3awRHuiK_D3X2rzVikAVQ-29pv8V-4JMdbCM0IYIUo74dpU_xWMNKiKl4Zrq0lHduK" 
                alt={username} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#CCFF00] text-background text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(204,255,0,0.6)]">
              Elite
            </div>
          </div>
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-on-surface italic">
              {username.split(' ')[0]} <span className="text-[#00FFFF]">{username.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest mt-1">Level 42 Athlete</p>
            <p className="text-on-surface mt-4 max-w-lg text-sm leading-relaxed border-l-2 border-primary pl-4">{bio}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate && onNavigate('events')}
            className="flex items-center justify-center gap-2 p-3 bg-surface-container-highest rounded-lg border border-outline-variant/30 text-on-surface font-headline text-xs uppercase font-bold tracking-widest hover:border-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00FFFF] to-[#00deec] text-background rounded-lg font-headline text-xs uppercase font-black tracking-widest shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <Edit2 className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-container-highest mb-10 overflow-x-auto no-scrollbar relative z-10">
        {['Overview', 'Activity', 'Settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "px-8 py-4 font-headline uppercase font-bold tracking-widest text-sm transition-all whitespace-nowrap",
              activeTab === tab 
                ? "text-[#CCFF00] border-b-2 border-[#CCFF00]" 
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative z-10">
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            
            {/* Skill Stats */}
            <section>
              <h2 className="font-headline text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                <Trophy className="text-[#CCFF00] w-6 h-6" /> Skill Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-surface-container-low border border-surface-container-highest rounded-2xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-end mb-8 relative z-10">
                      <h3 className="font-headline font-bold text-xl uppercase tracking-tight">{skill.name}</h3>
                      <span className={cn("text-3xl font-black italic shadow-sm", skill.color)}>{skill.score}</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden relative z-10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={cn("h-full", skill.bg)}
                        style={{ boxShadow: `0 0 10px ${skill.score === 92 ? '#00FFFF' : skill.score === 85 ? '#CCFF00' : '#ff7948'}` }}
                      ></motion.div>
                    </div>
                    {/* Subtle Background Glow */}
                    <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity", skill.bg)}></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trophy Case */}
            <section>
              <h2 className="font-headline text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                <Award className="text-[#00FFFF] w-6 h-6" /> Trophy Case
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {trophies.map(trophy => (
                    <motion.div whileHover={{y: -5}} key={trophy.id} className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[#00FFFF]/50 transition-colors relative overflow-hidden">
                       <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 border border-outline-variant/10 group-hover:scale-110 transition-transform">
                          {trophy.icon}
                       </div>
                       <h3 className="font-headline font-bold text-on-surface uppercase text-sm tracking-tight">{trophy.title}</h3>
                       <p className="text-xs text-on-surface-variant mt-2">{trophy.desc}</p>
                       <p className="text-[10px] uppercase tracking-widest font-bold text-outline mt-4">{trophy.date}</p>
                       <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
                    </motion.div>
                 ))}
              </div>
            </section>

            {/* Registered Events */}
            <section>
              <h2 className="font-headline text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                <Flame className="text-[#00FFFF] w-6 h-6" /> Registered Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registeredEvents.map(event => (
                  <div 
                    key={event.id}
                    onClick={() => onEventClick && onEventClick(event)}
                    className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container-high transition-all duration-300 cursor-pointer shadow-xl border border-surface-container-highest"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        src={event.image} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                         <h3 className="font-headline text-2xl font-black uppercase italic leading-none tracking-tighter text-on-surface drop-shadow-md max-w-[70%]">
                           {event.title}
                         </h3>
                         <span className="font-headline bg-[#CCFF00] text-background font-black text-xs px-2 py-1 uppercase rounded-sm tracking-widest">
                           {event.entryFee}
                         </span>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center bg-surface-container-lowest">
                      <div className="flex items-center gap-4 text-on-surface-variant font-label text-xs uppercase tracking-widest font-bold">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-[#00FFFF]" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#00FFFF] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </motion.div>
        )}

        {activeTab === 'Activity' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">
             <h2 className="font-headline text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                <Activity className="text-[#CCFF00] w-6 h-6" /> Tournament History
             </h2>
             <div className="relative border-l-2 border-outline-variant/20 ml-4 space-y-8 pb-8">
               {matchHistory.map((match, idx) => (
                 <div key={match.id} className="relative pl-8">
                   <div className={cn("absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-background", match.isWin ? "bg-primary" : "bg-on-surface-variant")}></div>
                   <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5 hover:bg-surface-container-high transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-headline font-bold text-lg text-on-surface">{match.event}</h3>
                          <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest mt-1">{match.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={cn("text-sm font-bold uppercase tracking-widest", match.isWin ? "text-primary" : "text-on-surface-variant")}>{match.placement}</span>
                          <p className="text-xl font-headline font-black italic text-on-surface mt-1">{match.points}</p>
                        </div>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
          </motion.div>
        )}

        {activeTab === 'Settings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-container-low border border-surface-container-highest rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8 border-b border-surface-container-highest pb-6">
              <Settings className="w-8 h-8 text-[#CCFF00]" />
              <div>
                <h3 className="font-headline text-2xl font-black uppercase tracking-tighter italic">Platform Preferences</h3>
                <p className="text-sm text-on-surface-variant uppercase tracking-widest font-label mt-1">Configure your experience</p>
              </div>
            </div>

            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <label className="text-xs uppercase font-label tracking-widest font-bold text-outline">Change Username</label>
                <div className="flex relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-on-surface font-headline focus:outline-none focus:border-[#00FFFF] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase font-label tracking-widest font-bold text-outline">Email Address</label>
                <div className="flex relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">@</span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-on-surface font-headline focus:outline-none focus:border-[#CCFF00] transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
                <div>
                  <h4 className="font-headline font-bold uppercase tracking-tight">Push Notifications</h4>
                  <p className="text-xs text-on-surface-variant">Receive alerts for upcoming tournaments.</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={cn(
                    "w-14 h-8 rounded-full p-1 transition-colors relative",
                    notifications ? "bg-[#CCFF00]" : "bg-surface-container-highest border border-outline-variant/50"
                  )}
                >
                  <motion.div 
                    animate={{ x: notifications ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "w-6 h-6 rounded-full",
                      notifications ? "bg-background" : "bg-on-surface-variant"
                    )}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-low border border-outline-variant/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-surface-container-highest">
                <h3 className="font-headline text-2xl font-black uppercase italic text-[#00FFFF]">Edit Profile</h3>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
                  <X className="w-5 h-5 text-on-surface" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full border border-dashed border-[#00FFFF] flex justify-center items-center cursor-pointer hover:bg-[#00FFFF]/10 transition-colors">
                     <span className="text-xs uppercase font-label text-on-surface-variant text-center font-bold">Change<br/>Avatar</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-label tracking-widest text-[#00FFFF] font-bold">Public Name</label>
                  <input 
                    required
                    type="text" 
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 text-on-surface font-headline focus:outline-none focus:border-[#00FFFF]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-label tracking-widest text-primary font-bold">Bio</label>
                  <textarea 
                    required
                    rows={3}
                    value={editBio}
                    onChange={e => setEditBio(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 text-on-surface font-headline focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <div className="pt-6 border-t border-surface-container-highest">
                  <button type="submit" className="w-full bg-[#CCFF00] py-4 rounded-xl text-background font-headline font-black uppercase italic tracking-wider text-lg hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
