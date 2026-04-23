import React, { useState } from 'react';
import {
  Award, Download, Send, Save, ArrowLeft, Check, Search,
  Eye, ChevronDown, ChevronUp, X, Filter, Users, FileText, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// ── Static data ────────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: 'modern', label: 'Modern Dark', bgClass: 'bg-gradient-to-br from-[#1a1f2b] to-[#0d1117] border-primary/50', border: 'border-4', textClass: 'text-white', accentClass: 'text-primary' },
  { id: 'classic', label: 'Classic Gold', bgClass: 'bg-[#f4f1ea] border-[#8b7355]', border: 'border-[10px]', textClass: 'text-gray-800', accentClass: 'text-[#8b7355]' },
  { id: 'tech', label: 'Cyber Glow', bgClass: 'bg-[#0a0a0a] border-[#00eefc]/40', border: 'border', textClass: 'text-white', accentClass: 'text-[#00eefc]' },
  { id: 'minimal', label: 'Minimal White', bgClass: 'bg-white border-gray-200', border: 'border-2', textClass: 'text-gray-900', accentClass: 'text-gray-600' },
];

const EVENTS = [
  { id: 'e1', name: 'Metro Hoops Open', date: 'Aug 24, 2025', participants: 48 },
  { id: 'e2', name: 'Midnight League Open', date: 'Aug 28, 2025', participants: 32 },
  { id: 'e3', name: 'Clay Court Masterclass', date: 'Sep 2, 2025', participants: 16 },
];

const ALL_PARTICIPANTS = [
  { id: 1, name: 'Alex Sterling', email: 'alex@example.com', rank: 1, event: 'e1', status: 'issued', score: '2450 pts' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', rank: 2, event: 'e1', status: 'pending', score: '2310 pts' },
  { id: 3, name: 'Marcus Vane', email: 'marcus@example.com', rank: 3, event: 'e1', status: 'pending', score: '2150 pts' },
  { id: 4, name: 'Elena Rostova', email: 'elena@example.com', rank: 4, event: 'e1', status: 'pending', score: '1980 pts' },
  { id: 5, name: 'Jordan Park', email: 'jordan@example.com', rank: 1, event: 'e2', status: 'issued', score: '1820 pts' },
  { id: 6, name: 'Priya Nair', email: 'priya@example.com', rank: 2, event: 'e2', status: 'pending', score: '1640 pts' },
  { id: 7, name: 'Kai Nakamura', email: 'kai@example.com', rank: 1, event: 'e3', status: 'pending', score: '980 pts' },
];

const VARIABLES = ['{{participant_name}}', '{{event_name}}', '{{date}}', '{{rank}}', '{{score}}'];

interface Participant { id: number; name: string; email: string; rank: number; event: string; status: string; score: string; }

// ── Certificate Preview ────────────────────────────────────────────────────
const CertPreview = ({
  template, participantName, eventName, certType
}: { template: typeof TEMPLATES[0]; participantName: string; eventName: string; certType: string }) => (
  <div className={cn('w-full aspect-[1.41] relative shadow-2xl transition-all duration-500 rounded-lg overflow-hidden', template.bgClass, template.border)}>
    <div className={cn('absolute inset-0 p-8 md:p-12 flex flex-col items-center justify-center text-center', template.textClass)}>
      <Award className={cn('w-14 h-14 mb-4 opacity-80', template.accentClass)} />
      <p className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-2">SkillSurfer Official</p>
      <h1 className="text-2xl md:text-4xl font-black font-headline uppercase tracking-widest mb-3">{certType}</h1>
      <p className="text-sm opacity-70 mb-4">This is proudly presented to</p>
      <h2 className={cn('text-3xl md:text-5xl font-bold italic border-b-2 pb-2 px-8 mb-4', template.accentClass)}>
        {participantName || '{{participant_name}}'}
      </h2>
      <p className="text-sm opacity-70 max-w-xs leading-relaxed">
        For outstanding performance in <br />
        <span className="font-bold opacity-100">{eventName || '{{event_name}}'}</span>
      </p>
      <div className="w-full flex justify-between px-8 mt-8">
        <div className="text-center">
          <div className="w-28 h-px bg-current opacity-30 mb-1 mx-auto" />
          <p className="text-[10px] uppercase tracking-widest opacity-60">Event Director</p>
        </div>
        <div className="text-center">
          <div className="w-28 h-px bg-current opacity-30 mb-1 mx-auto" />
          <p className="text-[10px] uppercase tracking-widest opacity-60">Lead Judge</p>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────
export const CertificateStudio = ({ onBack }: { onBack?: () => void }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'submissions' | 'issue'>('design');
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [certType, setCertType] = useState('Certificate of Achievement');
  const [selectedEvent, setSelectedEvent] = useState('e1');
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [issueToast, setIssueToast] = useState('');
  const [previewParticipant, setPreviewParticipant] = useState<Participant | null>(null);

  const participants = ALL_PARTICIPANTS.filter(p =>
    p.event === selectedEvent &&
    (statusFilter === 'all' || p.status === statusFilter) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const issuedCount = ALL_PARTICIPANTS.filter(p => p.event === selectedEvent && p.status === 'issued').length;
  const totalCount = ALL_PARTICIPANTS.filter(p => p.event === selectedEvent).length;

  const toggleSelect = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === participants.length ? [] : participants.map(p => p.id));

  const handleIssue = () => {
    if (selected.length === 0) return;
    setIssueToast(`Certificates issued to ${selected.length} participant${selected.length > 1 ? 's' : ''}!`);
    setSelected([]);
    setTimeout(() => setIssueToast(''), 3000);
  };

  const currentEvent = EVENTS.find(e => e.id === selectedEvent);

  const TABS = [
    { id: 'design' as const, label: 'Design', icon: FileText },
    { id: 'submissions' as const, label: 'Submissions', icon: Users },
    { id: 'issue' as const, label: 'Issue Certificates', icon: Send },
  ];

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8 min-h-screen">

      {/* Toast */}
      <AnimatePresence>
        {issueToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-secondary text-background px-6 py-3 rounded-full font-headline font-bold text-sm uppercase tracking-wider shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {issueToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewParticipant && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setPreviewParticipant(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-headline font-bold uppercase text-sm text-on-surface">Preview — {previewParticipant.name}</p>
                <button onClick={() => setPreviewParticipant(null)} className="p-2 hover:bg-surface-container-highest rounded-full"><X className="w-4 h-4" /></button>
              </div>
              <CertPreview template={template} participantName={previewParticipant.name} eventName={currentEvent?.name || ''} certType={certType} />
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-3 bg-secondary text-background rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button className="flex-1 py-3 kinetic-gradient text-background rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send to {previewParticipant.email}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/20 pb-6">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2.5 bg-surface-container-highest rounded-full hover:bg-surface-bright transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          <div>
            <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">Organizer Tools</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter uppercase italic mt-1">Certificate Studio</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-surface-container-highest rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/20">
            <Save className="w-4 h-4" /> Save Template
          </button>
          <button onClick={() => setActiveTab('issue')} className="px-5 py-2.5 kinetic-gradient text-background rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.2)]">
            <Send className="w-4 h-4" /> Issue Certificates
          </button>
        </div>
      </div>

      {/* Event selector */}
      <div className="flex gap-3 flex-wrap">
        {EVENTS.map(e => (
          <button
            key={e.id}
            onClick={() => { setSelectedEvent(e.id); setSelected([]); }}
            className={cn(
              'px-4 py-2.5 rounded-xl border text-sm font-bold transition-all',
              selectedEvent === e.id
                ? 'bg-primary/10 border-primary/40 text-primary'
                : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50 bg-surface-container-low'
            )}
          >
            {e.name}
            <span className="ml-2 text-[10px] opacity-60">{e.participants} participants</span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant/20">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 font-headline font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2',
              activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
            )}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Design Tab ── */}
        {activeTab === 'design' && (
          <motion.div key="design" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Controls */}
            <div className="space-y-5">
              {/* Template picker */}
              <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Templates</h3>
                <div className="space-y-2">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t)}
                      className={cn(
                        'w-full px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all border',
                        template.id === t.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-outline-variant/15 text-on-surface-variant hover:border-outline-variant/40'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certificate type */}
              <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Certificate Type</h3>
                <select
                  value={certType}
                  onChange={e => setCertType(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-2.5 text-on-surface text-xs font-bold focus:outline-none focus:border-primary transition-colors"
                >
                  {['Certificate of Achievement', 'Certificate of Participation', 'Winner Certificate', 'Runner-Up Certificate', 'Honorable Mention'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Variables */}
              <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-tertiary mb-4">Dynamic Variables</h3>
                <div className="flex flex-wrap gap-2">
                  {VARIABLES.map(v => (
                    <span key={v} className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold font-mono text-tertiary border border-tertiary/20 cursor-pointer hover:bg-tertiary/20 transition-colors select-all">
                      {v}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-on-surface-variant mt-3 leading-relaxed">Click any variable to copy. These auto-fill during issuance.</p>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-3">
              <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Live Preview</span>
                  <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-label uppercase tracking-widest">
                    <Eye className="w-3.5 h-3.5" /> {template.label}
                  </div>
                </div>
                <CertPreview
                  template={template}
                  participantName="Alex Sterling"
                  eventName={currentEvent?.name || 'Metro Hoops Open'}
                  certType={certType}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Submissions Tab ── */}
        {activeTab === 'submissions' && (
          <motion.div key="submissions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Participants', value: totalCount, color: 'text-on-surface' },
                { label: 'Certificates Issued', value: issuedCount, color: 'text-secondary' },
                { label: 'Pending', value: totalCount - issuedCount, color: 'text-primary' },
              ].map(s => (
                <div key={s.label} className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5 text-center">
                  <p className={`text-3xl font-headline font-black italic ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-grow max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search participants..."
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl py-2.5 pl-9 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              {['all', 'pending', 'issued'].map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                    statusFilter === f ? 'bg-primary text-background' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-surface-container-low rounded-2xl border border-outline-variant/20 overflow-hidden">
              <div className="p-4 bg-surface-container flex items-center gap-4 border-b border-outline-variant/10">
                <input type="checkbox" checked={selected.length === participants.length && participants.length > 0} onChange={toggleAll} className="accent-primary w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex-1">Participant</span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant w-16 text-center">Rank</span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant w-24 text-center">Score</span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant w-20 text-center">Status</span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant w-24 text-center">Actions</span>
              </div>
              {participants.length === 0 ? (
                <div className="py-12 text-center text-on-surface-variant text-sm">No participants found</div>
              ) : (
                participants.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn('flex items-center gap-4 p-4 border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors', selected.includes(p.id) && 'bg-primary/5')}
                  >
                    <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} className="accent-primary w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-on-surface truncate">{p.name}</p>
                      <p className="text-[10px] text-on-surface-variant font-label truncate">{p.email}</p>
                    </div>
                    <span className="font-headline font-black italic text-lg w-16 text-center">#{p.rank}</span>
                    <span className="text-xs font-bold text-on-surface-variant w-24 text-center">{p.score}</span>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-20 text-center',
                      p.status === 'issued' ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary'
                    )}>
                      {p.status === 'issued' ? '✓ Issued' : '⏳ Pending'}
                    </span>
                    <div className="flex gap-2 w-24 justify-center">
                      <button onClick={() => setPreviewParticipant(p)} className="p-1.5 hover:bg-surface-bright rounded-lg transition-colors" title="Preview">
                        <Eye className="w-4 h-4 text-on-surface-variant" />
                      </button>
                      <button className="p-1.5 hover:bg-surface-bright rounded-lg transition-colors" title="Download">
                        <Download className="w-4 h-4 text-on-surface-variant" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* ── Issue Tab ── */}
        {activeTab === 'issue' && (
          <motion.div key="issue" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 space-y-5">
              <h3 className="font-headline font-bold text-lg uppercase tracking-widest text-on-surface">Bulk Issue Certificates</h3>

              {/* Select from table */}
              <div className="space-y-2">
                {ALL_PARTICIPANTS.filter(p => p.event === selectedEvent).map(p => (
                  <div
                    key={p.id}
                    onClick={() => toggleSelect(p.id)}
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all',
                      selected.includes(p.id) ? 'border-primary bg-primary/5' : 'border-outline-variant/15 hover:border-outline-variant/40'
                    )}
                  >
                    <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all', selected.includes(p.id) ? 'bg-primary border-primary' : 'border-outline')}>
                      {selected.includes(p.id) && <Check className="w-3 h-3 text-background" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-on-surface">{p.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{p.email} • Rank #{p.rank} • {p.score}</p>
                    </div>
                    <span className={cn('text-[10px] font-bold uppercase px-2 py-0.5 rounded-full', p.status === 'issued' ? 'bg-secondary/15 text-secondary' : 'bg-outline/15 text-outline')}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15">
                <p className="text-sm text-on-surface-variant">
                  <span className="text-on-surface font-bold">{selected.length}</span> recipient{selected.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setSelected([])} className="px-4 py-2.5 bg-surface-container-highest rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-bright transition-colors">
                    Clear
                  </button>
                  <button
                    onClick={handleIssue}
                    disabled={selected.length === 0}
                    className={cn(
                      'px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all',
                      selected.length > 0
                        ? 'kinetic-gradient text-background hover:scale-105 shadow-[0_0_20px_rgba(202,253,0,0.3)]'
                        : 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed opacity-50'
                    )}
                  >
                    <Send className="w-4 h-4" />
                    Issue {selected.length > 0 ? `(${selected.length})` : ''} Certificates
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
