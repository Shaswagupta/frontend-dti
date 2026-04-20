import React, { useState } from 'react';
import { Award, Download, Type, Image as ImageIcon, Send, Palette, Settings2, ZoomIn, ZoomOut, Save, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export const CertificateStudio = ({ onBack }: { onBack?: () => void }) => {
  const [template, setTemplate] = useState('modern');

  return (
    <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-8">
        <div className="flex items-center gap-6">
          {onBack && (
            <button onClick={onBack} className="p-3 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 bg-surface-container-highest/50">
              <ArrowLeft className="w-6 h-6 text-primary" />
            </button>
          )}
          <div>
            <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">Organizer Tools</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mt-2 tracking-tighter uppercase italic">
              Certificate Studio
            </h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-surface-container-highest rounded-xl font-bold flex items-center gap-2 hover:bg-surface-bright transition-colors border border-outline-variant/30">
             <Save className="w-5 h-5" /> Save Template
          </button>
          <button className="px-6 py-3 kinetic-gradient text-on-primary-container rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,253,0,0.2)]">
             <Send className="w-5 h-5" /> Issue to Participants
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tools Panel */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2"><Palette className="w-4 h-4" /> Templates</h3>
             <div className="grid grid-cols-2 gap-3">
                {['modern', 'classic', 'minimal', 'tech'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={cn(
                      "aspect-video rounded-lg border-2 flex items-center justify-center text-xs font-bold uppercase tracking-widest transition-all",
                      template === t ? 'border-primary text-primary bg-primary/10' : 'border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/50'
                    )}
                  >
                    {t}
                  </button>
                ))}
             </div>
           </div>

           <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4 flex items-center gap-2"><Settings2 className="w-4 h-4" /> Elements</h3>
             <div className="space-y-2">
               {[
                 { icon: Type, label: 'Add Text Block' },
                 { icon: ImageIcon, label: 'Add Signature' },
                 { icon: Award, label: 'Add Badge' },
               ].map(tool => (
                 <button key={tool.label} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-highest transition-colors text-sm font-medium">
                   <tool.icon className="w-4 h-4 text-on-surface-variant" /> {tool.label}
                 </button>
               ))}
             </div>
           </div>

           <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-tertiary mb-4 flex items-center gap-2"><Type className="w-4 h-4" /> Dynamic Variables</h3>
             <div className="flex flex-wrap gap-2">
               {['{{participant_name}}', '{{event_name}}', '{{date}}', '{{rank}}', '{{track}}'].map(v => (
                 <span key={v} className="bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold font-mono text-tertiary cursor-grab hover:bg-tertiary/20 transition-colors border border-tertiary/20">
                   {v}
                 </span>
               ))}
             </div>
             <p className="text-xs text-on-surface-variant mt-4 leading-relaxed">Drag these variables into your text blocks to automatically populate participant data during issuance.</p>
           </div>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 h-full min-h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-4 px-4">
              <span className="text-sm font-bold text-on-surface-variant">Canvas Preview</span>
              <div className="flex gap-2">
                <button className="p-2 bg-surface-container-highest rounded hover:text-on-surface transition-colors"><ZoomOut className="w-4 h-4" /></button>
                <button className="p-2 bg-surface-container-highest rounded text-xs font-bold">100%</button>
                <button className="p-2 bg-surface-container-highest rounded hover:text-on-surface transition-colors"><ZoomIn className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-grow bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/30 overflow-hidden flex items-center justify-center p-8 relative">
              {/* Mock Certificate Canvas */}
              <div className={cn(
                "w-full max-w-4xl aspect-[1.414] relative shadow-2xl transition-all duration-500", // A4 Landscape ratio approx
                template === 'modern' ? "bg-gradient-to-br from-[#1a1f2b] to-[#0d1117] border-4 border-primary/50" :
                template === 'classic' ? "bg-[#f4f1ea] border-[12px] border-[#8b7355]" :
                template === 'tech' ? "bg-background border border-[#00eefc]/30 shadow-[0_0_50px_rgba(0,238,252,0.1)]" :
                "bg-white border-2 border-gray-200"
              )}>
                {/* Certificate Content Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center">
                  <Award className={cn("w-20 h-20 mb-8", template === 'classic' ? 'text-[#8b7355]' : 'text-primary opacity-80')} />
                  <h1 className={cn("text-5xl font-black font-headline uppercase tracking-widest mb-4", template === 'classic' ? 'text-background' : 'text-on-surface')}>Certificate of Participation</h1>
                  <p className={cn("text-lg mb-8", template === 'classic' ? 'text-gray-600' : 'text-on-surface-variant')}>This is proudly presented to</p>
                  <h2 className={cn("text-6xl font-bold font-signature italic mb-8 border-b-2 pb-2 px-12", template === 'classic' ? 'text-background border-black/20' : 'text-primary border-primary/20')}>
                    {`{{participant_name}}`}
                  </h2>
                  <p className={cn("text-lg max-w-2xl mb-12", template === 'classic' ? 'text-gray-600' : 'text-on-surface-variant')}>
                    For outstanding performance and successful completion of the <br/><span className="font-bold text-on-surface">{`{{event_name}}`}</span> held on {`{{date}}`}.
                  </p>
                  
                  <div className="w-full flex justify-between px-16 mt-auto">
                    <div className="text-center">
                      <div className="w-40 h-px bg-current mb-2 opacity-30"></div>
                      <p className={cn("text-sm font-bold uppercase tracking-widest", template === 'classic' ? 'text-gray-800' : 'text-on-surface-variant')}>Event Director</p>
                    </div>
                    <div className="text-center">
                      <div className="w-40 h-px bg-current mb-2 opacity-30"></div>
                      <p className={cn("text-sm font-bold uppercase tracking-widest", template === 'classic' ? 'text-gray-800' : 'text-on-surface-variant')}>Lead Judge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
