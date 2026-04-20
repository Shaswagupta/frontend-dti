import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, BarChart2, Users, FileText, MessageSquare, Download,
  CheckCircle, XCircle, Search, Mail, ExternalLink, CalendarDays, MapPin, Shield, Camera, Lock
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, LineChart, Line, Area, AreaChart } from 'recharts';
import { cn } from '../lib/utils';
import { Event } from '../types';

export const ManageEvent = ({ event, onBack }: { event?: Event, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('Analytics');

  // Dummy data for event if none provided
  const e = event || {
    id: '1',
    title: 'Global AI Hackathon 2024',
    sport: 'Hackathon',
    category: 'Pro',
    date: 'Dec 15 - Dec 20',
    time: '10:00 AM',
    location: 'Virtual Area',
    entryFee: 'Free',
    status: 'live',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'
  };

  const tabs = [
    { id: 'Analytics', icon: BarChart2 },
    { id: 'Participants', icon: Users },
    { id: 'Submissions', icon: FileText },
    { id: 'Evaluators', icon: Users },
    { id: 'Proctoring', icon: Shield },
    { id: 'Communication', icon: MessageSquare }
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-xl">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 bg-surface-container-highest/50">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-error-container text-on-surface px-2 py-0.5 rounded text-[10px] font-bold font-label uppercase animate-pulse flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div> LIVE
              </span>
              <span className="text-secondary font-label text-[10px] uppercase tracking-widest font-bold">{e.sport}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter uppercase italic">{e.title}</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-highest rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/30">
            <ExternalLink className="w-4 h-4" /> View Public Page
          </button>
          <button className="px-4 py-2 kinetic-gradient text-on-primary-container rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.2)]">
            Edit Details
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-outline-variant/20 overflow-x-auto no-scrollbar pb-1">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 font-headline font-bold uppercase tracking-widest text-sm transition-all relative whitespace-nowrap",
              activeTab === tab.id ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary" : "text-on-surface-variant")} />
            {tab.id}
            {activeTab === tab.id && (
              <motion.div layoutId="manage-tab-indicator" className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_0_10px_rgba(202,253,0,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'Analytics' && <AnalyticsTab key="analytics" />}
          {activeTab === 'Participants' && <ParticipantsTab key="participants" />}
          {activeTab === 'Submissions' && <SubmissionsTab key="submissions" />}
          {activeTab === 'Evaluators' && <EvaluatorsTab key="evaluators" />}
          {activeTab === 'Proctoring' && <ProctoringTab key="proctoring" />}
          {activeTab === 'Communication' && <CommunicationTab key="communication" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Sub-components for Tabs ---

const AnalyticsTab = () => {
  const funnelData = [
    { name: 'Page Views', count: 12400 },
    { name: 'Started Form', count: 4800 },
    { name: 'Registered', count: 2150 },
    { name: 'Submitted', count: 850 },
  ];

  const timelineData = [
    { day: 'Mon', reg: 120 }, { day: 'Tue', reg: 250 }, { day: 'Wed', reg: 400 },
    { day: 'Thu', reg: 850 }, { day: 'Fri', reg: 1200 }, { day: 'Sat', reg: 1800 }, { day: 'Sun', reg: 2150 }
  ];

  return (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '12.4K', color: 'text-on-surface' },
          { label: 'Registrations', value: '2,150', color: 'text-primary' },
          { label: 'Submissions', value: '850', color: 'text-secondary' },
          { label: 'Conversion', value: '17.3%', color: 'text-tertiary' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={cn("text-4xl font-headline font-black", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#00eefc] mb-6 font-label">Registration Timeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cafd00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#cafd00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#adaaaa" tickLine={false} axisLine={false} tick={{fill: '#adaaaa', fontSize: 10}} />
                <Tooltip cursor={{stroke: 'rgba(255,255,255,0.1)'}} contentStyle={{backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}} />
                <Area type="monotone" dataKey="reg" stroke="#cafd00" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#00eefc] mb-6 font-label">Conversion Funnel</h3>
          <div className="space-y-4">
            {funnelData.map((step, idx) => (
              <div key={step.name} className="relative">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1 z-10 relative px-2 text-on-surface">
                  <span>{step.name}</span>
                  <span>{step.count.toLocaleString()}</span>
                </div>
                <div className="h-8 bg-surface-container-highest rounded-lg overflow-hidden relative">
                  <div 
                    className="absolute left-0 top-0 h-full bg-secondary/30 rounded-lg transition-all duration-1000"
                    style={{ width: `${(step.count / funnelData[0].count) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute left-0 top-0 h-full border-r-4 border-secondary/80 rounded-lg transition-all duration-1000"
                    style={{ width: `${(step.count / funnelData[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ParticipantsTab = () => {
  const participants = [
    { id: 1, name: 'Alex Sterling', team: 'Neon Strikers', role: 'Leader', status: 'Approved', score: 92 },
    { id: 2, name: 'Sarah Chen', team: 'Data Divas', role: 'Leader', status: 'Pending', score: 0 },
    { id: 3, name: 'Marcus Vane', team: 'Iron Grip', role: 'Member', status: 'Approved', score: 85 },
    { id: 4, name: 'Elena Rostova', team: 'Code Crushers', role: 'Leader', status: 'Rejected', score: 45 },
    { id: 5, name: 'James Thorne', team: 'Neon Strikers', role: 'Member', status: 'Approved', score: 92 },
  ];

  return (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search participants or teams..."
            className="w-full bg-surface-container-highest border border-transparent rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <select className="bg-surface-container-highest border border-transparent rounded-lg py-2 px-4 text-sm focus:border-primary focus:outline-none appearance-none">
            <option>All Statuses</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
          <button className="px-4 py-2 bg-surface-container-highest rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/30">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-highest text-xs uppercase font-label tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-6 py-4">Participant</th>
                <th className="px-6 py-4">Team</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {participants.map(p => (
                <tr key={p.id} className="hover:bg-surface-container-highest/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{p.name}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{p.team}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase", p.role === 'Leader' ? 'bg-secondary/20 text-secondary' : 'bg-surface-container text-on-surface-variant')}>
                      {p.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-max",
                      p.status === 'Approved' ? 'bg-primary/20 text-primary' : 
                      p.status === 'Pending' ? 'bg-tertiary/20 text-tertiary' : 
                      'bg-error/20 text-error'
                    )}>
                      {p.status === 'Approved' && <CheckCircle className="w-3 h-3" />}
                      {p.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-primary hover:text-primary-dim font-bold text-xs uppercase tracking-widest">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const SubmissionsTab = () => {
  return (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="space-y-6">
      <div className="bg-surface-container-low p-12 rounded-xl border border-dashed border-outline-variant/30 flex flex-col items-center text-center">
        <FileText className="w-16 h-16 text-on-surface-variant mb-4 opacity-50" />
        <h3 className="text-xl font-headline font-bold text-on-surface mb-2">No Submissions Yet</h3>
        <p className="text-on-surface-variant text-sm max-w-md">
          Participants haven't submitted any projects yet. Once the submission phase begins, they will appear here for evaluation.
        </p>
        <button className="mt-6 px-6 py-3 bg-surface-container-highest rounded-lg font-bold text-sm hover:bg-surface-bright transition-colors border border-outline-variant/30">
          Configure Evaluation Criteria
        </button>
      </div>
    </motion.div>
  );
};

const CommunicationTab = () => {
  return (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-2 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 space-y-6">
        <div>
          <h3 className="text-lg font-headline font-bold text-on-surface mb-1">New Broadcast</h3>
          <p className="text-sm text-on-surface-variant">Send announcements or emails to participants.</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">To</label>
            <select className="w-full bg-surface-container-highest border border-transparent rounded-lg p-3 text-sm focus:border-primary focus:outline-none appearance-none">
              <option>All Registered Participants</option>
              <option>Approved Participants</option>
              <option>Pending Participants</option>
              <option>Shortlisted for Round 2</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Subject</label>
            <input type="text" placeholder="e.g. Welcome to Round 2!" className="w-full bg-surface-container-highest border border-transparent rounded-lg p-3 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Message</label>
            <textarea rows={6} placeholder="Type your message here..." className="w-full bg-surface-container-highest border border-transparent rounded-lg p-3 text-sm focus:border-primary focus:outline-none resize-none"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="px-6 py-3 bg-surface-container-highest rounded-lg font-bold text-sm hover:bg-surface-bright transition-colors border border-outline-variant/30">
              Save Draft
            </button>
            <button className="px-6 py-3 kinetic-gradient text-on-primary-container rounded-lg font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.2)]">
              <Mail className="w-4 h-4" /> Send Broadcast
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4 font-label">Automated Emails</h3>
          <div className="space-y-3">
            {[
              { label: 'Registration Confirmation', active: true },
              { label: 'Submission Received', active: true },
              { label: 'Round Started Alert', active: false },
              { label: 'Shortlist Notification', active: false }
            ].map(email => (
              <div key={email.label} className="flex items-center justify-between p-3 bg-surface-container-highest rounded-lg border border-transparent hover:border-outline-variant/30 transition-colors">
                <span className="text-sm font-medium">{email.label}</span>
                <div className={cn("w-10 h-5 rounded-full relative cursor-pointer transition-colors", email.active ? 'bg-primary' : 'bg-surface-container-lowest')}>
                  <div className={cn("absolute top-1 w-3 h-3 rounded-full bg-white transition-all", email.active ? 'left-6 bg-background' : 'left-1')}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-tertiary mb-4 font-label">Recent History</h3>
          <div className="space-y-4">
             <div className="flex gap-3 text-sm">
               <Mail className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" />
               <div>
                 <p className="font-bold">Registration Opened</p>
                 <p className="text-xs text-on-surface-variant">Sent to 1.2k users • 2d ago</p>
               </div>
             </div>
             <div className="flex gap-3 text-sm">
               <Mail className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" />
               <div>
                 <p className="font-bold">Guidelines Updated</p>
                 <p className="text-xs text-on-surface-variant">Sent to All Participants • 5d ago</p>
               </div>
             </div>
          </div>
          <button className="w-full mt-4 py-2 border border-dashed border-outline-variant/30 rounded-lg text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">
            View All History
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EvaluatorsTab = () => {
  return (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="space-y-6">
      <div className="flex justify-between items-center bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
         <div>
           <h3 className="text-xl font-headline font-bold text-on-surface mb-1">Judging Panel</h3>
           <p className="text-sm text-on-surface-variant">Invite external judges to evaluate submissions.</p>
         </div>
         <button className="px-6 py-3 bg-secondary text-background rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.3)]">
           + Invite Judge
         </button>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-highest text-xs uppercase font-label tracking-widest text-on-surface-variant">
            <tr>
              <th className="px-6 py-4">Judge Name</th>
              <th className="px-6 py-4">Expertise</th>
              <th className="px-6 py-4">Assigned Submissions</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            <tr className="hover:bg-surface-container-highest/50">
              <td className="px-6 py-4 font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-secondary">A</div>
                Dr. Alan Turing
              </td>
              <td className="px-6 py-4"><span className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-secondary">AI / ML</span></td>
              <td className="px-6 py-4">0 / 15</td>
              <td className="px-6 py-4"><span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Accepted</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const ProctoringTab = () => {
  return (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 space-y-6">
        <div>
          <h3 className="text-xl font-headline font-bold text-on-surface mb-1 flex items-center gap-2"><Shield className="w-5 h-5 text-error" /> Security & Proctoring</h3>
          <p className="text-sm text-on-surface-variant">Configure anti-cheating measures for your assessments.</p>
        </div>

        <div className="space-y-4">
          {[
            { id: 'webcam', label: 'Webcam Monitoring', desc: 'Capture periodic images of the participant during the assessment.', icon: Camera, active: true },
            { id: 'tab', label: 'Tab Switch Detection', desc: 'Alert and penalize participants who switch browser tabs.', icon: Lock, active: true },
            { id: 'copy', label: 'Disable Copy/Paste', desc: 'Prevent copying questions or pasting answers.', icon: FileText, active: false }
          ].map(setting => (
            <div key={setting.id} className="flex items-start gap-4 p-4 bg-surface-container-highest rounded-xl border border-transparent hover:border-outline-variant/30 transition-colors">
               <setting.icon className="w-6 h-6 text-on-surface-variant shrink-0 mt-1" />
               <div className="flex-grow">
                 <h4 className="font-bold text-sm mb-1">{setting.label}</h4>
                 <p className="text-xs text-on-surface-variant">{setting.desc}</p>
               </div>
               <div className={cn("w-12 h-6 rounded-full relative cursor-pointer transition-colors shrink-0", setting.active ? 'bg-primary' : 'bg-surface-container-low border border-outline-variant/30')}>
                  <div className={cn("absolute top-1 w-4 h-4 rounded-full transition-all", setting.active ? 'left-7 bg-background' : 'left-1 bg-on-surface-variant')}></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
