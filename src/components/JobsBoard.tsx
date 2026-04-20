import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Building, Search, Filter, Bookmark, ExternalLink, X, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const JobsBoard = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeJob, setActiveJob] = useState<any>(null);

  const jobs = [
    { id: 1, title: 'Unreal Engine Developer', company: 'Epic Studios', location: 'Remote', type: 'Full-time', category: 'Programming', salary: '$120k - $150k', posted: '2d ago', logo: 'E' },
    { id: 2, title: 'Gameplay Programmer', company: 'Riot Games', location: 'Los Angeles, CA', type: 'Full-time', category: 'Programming', salary: '$130k - $160k', posted: '5h ago', logo: 'R' },
    { id: 3, title: '3D Character Artist', company: 'PolyWorks', location: 'Remote', type: 'Contract', category: 'Art & Animation', salary: '$55/hr', posted: '1w ago', logo: 'P' },
    { id: 4, title: 'Game Design Intern', company: 'NextGen Games', location: 'Austin, TX', type: 'Internship', category: 'Design', salary: '$4,000/mo', posted: '1d ago', logo: 'N' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
        <div>
          <span className="text-tertiary font-label text-xs uppercase tracking-[0.2em] font-bold">Launch Your Career</span>
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter uppercase italic">
            Jobs & Internships
          </h2>
        </div>
        <button className="px-6 py-3 bg-surface-container-highest rounded-xl font-bold flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/30">
           <Bookmark className="w-5 h-5" /> Saved Jobs
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-grow">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
           <input 
             type="text" 
             placeholder="Search for jobs, skills, or companies..." 
             className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-tertiary transition-colors"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
         </div>
         <button className="px-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Filter className="w-5 h-5" /> Filters
         </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {['All', 'Full-time', 'Internship', 'Remote', 'Programming', 'Art & Animation'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={cn("px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors", filter === f ? 'bg-tertiary text-background' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest')}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {jobs.filter(j => {
            const matchesFilter = filter === 'All' || j.type.includes(filter) || j.location.includes(filter) || j.category === filter;
            const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
         }).map((job, idx) => (
           <motion.div 
             initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: idx * 0.1}}
             key={job.id} 
             className="bg-surface-container-low border border-outline-variant/10 p-6 rounded-2xl hover:border-tertiary/50 transition-all group flex flex-col justify-between"
           >
              <div>
                <div className="flex justify-between items-start mb-6">
                   <div className="flex gap-4">
                     <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center text-2xl font-black font-headline text-tertiary shrink-0">
                       {job.logo}
                     </div>
                     <div>
                       <h3 className="text-xl font-headline font-bold group-hover:text-tertiary transition-colors">{job.title}</h3>
                       <p className="text-sm text-on-surface-variant flex items-center gap-2 mt-1">
                         <Building className="w-4 h-4" /> {job.company}
                       </p>
                     </div>
                   </div>
                   <button className="text-on-surface-variant hover:text-on-surface transition-colors p-2"><Bookmark className="w-5 h-5" /></button>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                  <span className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type}</span>
                  <span className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold font-label uppercase tracking-wider flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                 <span className="text-xs text-on-surface-variant flex items-center gap-1 font-label uppercase tracking-widest"><Clock className="w-3 h-3" /> {job.posted}</span>
                 <button onClick={() => setActiveJob(job)} className="px-6 py-2 bg-tertiary/10 text-tertiary rounded-lg font-bold text-sm hover:bg-tertiary hover:text-background transition-colors flex items-center gap-2">
                   Apply <ExternalLink className="w-4 h-4" />
                 </button>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Mock Application Modal */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 max-w-lg w-full relative">
            <button onClick={() => setActiveJob(null)} className="absolute top-4 right-4 p-2 bg-surface-container-highest rounded-full hover:bg-error/20 hover:text-error transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-4 mb-8">
              <div className="w-16 h-16 mx-auto bg-surface-container-highest rounded-xl flex items-center justify-center text-3xl font-black font-headline text-tertiary">
                {activeJob.logo}
              </div>
              <div>
                <h2 className="text-2xl font-headline font-black mt-2">{activeJob.title}</h2>
                <p className="text-on-surface-variant font-bold flex justify-center items-center gap-2 mt-1"><Building className="w-4 h-4"/> {activeJob.company}</p>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Application sent successfully!'); setActiveJob(null); }}>
               <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Resume / Portfolio Link</label>
                 <input required type="url" placeholder="https://your-portfolio.com" className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl py-3 px-4 focus:outline-none focus:border-tertiary transition-colors" />
               </div>
               <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Why are you a good fit?</label>
                 <textarea required rows={4} placeholder="Tell us about your experience..." className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl py-3 px-4 focus:outline-none focus:border-tertiary transition-colors resize-none"></textarea>
               </div>
               <button type="submit" className="w-full mt-6 bg-tertiary text-background px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                 Submit Application <Send className="w-5 h-5" />
               </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
