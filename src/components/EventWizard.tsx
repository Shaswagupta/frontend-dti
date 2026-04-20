import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Check, Plus, Trash2, ChevronRight, Save, Image as ImageIcon, 
  Settings, Users, AlignLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export const EventWizard = ({ onBack, onComplete }: { onBack: () => void, onComplete?: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Basic Details
  const [basicDetails, setBasicDetails] = useState({
    name: '',
    category: 'Hackathon',
    description: '',
    teamSizeMin: 1,
    teamSizeMax: 4
  });

  // Step 2: Rounds
  const [rounds, setRounds] = useState([
    { id: '1', name: 'Registration', type: 'Registration', startDate: '', endDate: '' }
  ]);

  // Step 3: Form Builder
  const [formFields, setFormFields] = useState([
    { id: '1', label: 'Full Name', type: 'text', required: true },
    { id: '2', label: 'Email Address', type: 'email', required: true },
  ]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else if (onComplete) onComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const addRound = () => {
    setRounds([...rounds, { id: Math.random().toString(), name: `Round ${rounds.length + 1}`, type: 'Submission', startDate: '', endDate: '' }]);
  };

  const removeRound = (id: string) => {
    setRounds(rounds.filter(r => r.id !== id));
  };

  const addFormField = () => {
    setFormFields([...formFields, { id: Math.random().toString(), label: 'New Field', type: 'text', required: false }]);
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={handleBack} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
        <div>
          <h2 className="text-3xl font-black font-headline uppercase italic">Create Opportunity</h2>
          <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mt-1">Configure your event</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-container-high rounded-full -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 rounded-full -z-10"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {['Basic Details', 'Rounds & Timeline', 'Registration Form', 'Assessments'].map((label, index) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2",
              step > index + 1 ? "bg-primary border-primary text-background" : 
              step === index + 1 ? "bg-background border-primary text-primary shadow-[0_0_15px_rgba(202,253,0,0.4)]" : 
              "bg-background border-surface-container-high text-on-surface-variant"
            )}>
              {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest hidden md:block",
              step >= index + 1 ? "text-primary" : "text-on-surface-variant"
            )}>{label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-headline font-bold text-[#00eefc] mb-6 border-b border-outline-variant/20 pb-4">General Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Event Name</label>
                  <input 
                    type="text" 
                    value={basicDetails.name}
                    onChange={e => setBasicDetails({...basicDetails, name: e.target.value})}
                    placeholder="e.g., Global AI Hackathon 2024"
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary transition-colors text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Category</label>
                  <select 
                    value={basicDetails.category}
                    onChange={e => setBasicDetails({...basicDetails, category: e.target.value})}
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Ideathon">Ideathon</option>
                    <option value="Hiring Challenge">Hiring Challenge</option>
                    <option value="Quiz">Quiz / Assessment</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Team Size</label>
                  <div className="flex items-center gap-4">
                    <input type="number" min="1" max="10" placeholder="Min" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 focus:border-primary focus:outline-none" />
                    <span className="text-on-surface-variant">to</span>
                    <input type="number" min="1" max="10" placeholder="Max" className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 focus:border-primary focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Description / About</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe what this opportunity is all about..."
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-xs uppercase font-label tracking-wider text-on-surface-variant">Event Banner</label>
                  <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-10 flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors cursor-pointer bg-surface-container-highest/50">
                    <ImageIcon className="w-10 h-10 mb-4 opacity-50" />
                    <span className="font-bold text-sm">Click to upload banner image</span>
                    <span className="text-xs mt-2 opacity-60">1920x1080 recommended</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
                <h3 className="text-xl font-headline font-bold text-[#00eefc]">Stages & Timelines</h3>
                <button onClick={addRound} className="text-primary text-sm font-bold flex items-center gap-2 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> Add Round
                </button>
              </div>

              <div className="space-y-4">
                {rounds.map((round, index) => (
                  <div key={round.id} className="bg-surface-container-highest p-5 rounded-xl border border-outline-variant/20 relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-xl"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-surface-container-low flex items-center justify-center text-xs font-bold">{index + 1}</span>
                        <input 
                          type="text" 
                          value={round.name}
                          onChange={e => {
                            const newRounds = [...rounds];
                            newRounds[index].name = e.target.value;
                            setRounds(newRounds);
                          }}
                          className="bg-transparent border-none text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary rounded px-2"
                        />
                      </div>
                      <button onClick={() => removeRound(round.id)} className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-error/10 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                         <label className="text-[10px] uppercase font-label text-on-surface-variant">Round Type</label>
                         <select 
                            value={round.type}
                            onChange={e => {
                              const newRounds = [...rounds];
                              newRounds[index].type = e.target.value;
                              setRounds(newRounds);
                            }}
                            className="w-full bg-surface-container-low border border-outline-variant/20 rounded p-2.5 text-sm focus:outline-none focus:border-primary"
                          >
                            <option value="Registration">Registration</option>
                            <option value="Submission">Idea Submission</option>
                            <option value="Quiz">Quiz Assessment</option>
                            <option value="Interview">Interview</option>
                          </select>
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] uppercase font-label text-on-surface-variant">Start Date & Time</label>
                         <input type="datetime-local" className="w-full bg-surface-container-low border border-outline-variant/20 rounded p-2 text-sm focus:outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] uppercase font-label text-on-surface-variant">End Date & Time</label>
                         <input type="datetime-local" className="w-full bg-surface-container-low border border-outline-variant/20 rounded p-2 text-sm focus:outline-none focus:border-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
               <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
                <div>
                  <h3 className="text-xl font-headline font-bold text-[#00eefc]">Registration Form</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Customize the data collected from participants.</p>
                </div>
                <button onClick={addFormField} className="text-primary text-sm font-bold flex items-center gap-2 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> Add Field
                </button>
              </div>

              <div className="space-y-3">
                {formFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 bg-surface-container-highest p-4 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-colors">
                    <div className="cursor-move text-on-surface-variant hover:text-on-surface">
                      <AlignLeft className="w-5 h-5" />
                    </div>
                    <div className="flex-grow grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        value={field.label}
                        onChange={e => {
                          const newFields = [...formFields];
                          newFields[index].label = e.target.value;
                          setFormFields(newFields);
                        }}
                        className="bg-surface-container-low border border-outline-variant/20 rounded p-2 text-sm focus:outline-none focus:border-primary"
                      />
                      <select 
                        value={field.type}
                        onChange={e => {
                          const newFields = [...formFields];
                          newFields[index].type = e.target.value;
                          setFormFields(newFields);
                        }}
                        className="bg-surface-container-low border border-outline-variant/20 rounded p-2 text-sm focus:outline-none focus:border-primary"
                      >
                        <option value="text">Short Text</option>
                        <option value="textarea">Long Text</option>
                        <option value="email">Email</option>
                        <option value="file">File Upload</option>
                        <option value="select">Dropdown</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-on-surface-variant flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={field.required} onChange={e => {
                          const newFields = [...formFields];
                          newFields[index].required = e.target.checked;
                          setFormFields(newFields);
                        }} className="accent-primary" /> Required
                      </label>
                      <button onClick={() => {
                        setFormFields(formFields.filter(f => f.id !== field.id));
                      }} className="text-error p-2 hover:bg-error/10 rounded-lg ml-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
               <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
                <div>
                  <h3 className="text-xl font-headline font-bold text-[#00eefc]">Assessment Configuration</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Configure coding tests or quizzes for your rounds.</p>
                </div>
                <button className="text-primary text-sm font-bold flex items-center gap-2 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> Add Assessment
                </button>
              </div>

              <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant/10 text-center">
                <Settings className="w-12 h-12 text-on-surface-variant mx-auto mb-4 opacity-50" />
                <h4 className="font-bold text-on-surface mb-2">No Assessments Configured</h4>
                <p className="text-sm text-on-surface-variant mb-6 max-w-md mx-auto">You can link coding challenges or MCQs to any of your rounds to automatically evaluate participants.</p>
                <div className="flex justify-center gap-4">
                   <button className="px-4 py-2 border border-outline-variant/30 rounded-lg text-sm font-bold hover:bg-surface-container-low transition-colors">Create Quiz</button>
                   <button className="px-4 py-2 border border-outline-variant/30 rounded-lg text-sm font-bold hover:bg-surface-container-low transition-colors">Create Coding Test</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-6 border-t border-outline-variant/20 flex justify-between items-center">
           {step > 1 ? (
             <button onClick={handleBack} className="text-on-surface-variant font-bold uppercase tracking-widest text-sm hover:text-on-surface transition-colors">
               Back
             </button>
           ) : <div></div>}
           
           <button 
             onClick={handleNext} 
             className="kinetic-gradient text-on-primary-container px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(202,253,0,0.2)]"
           >
             {step === totalSteps ? (
               <>Publish Opportunity <Check className="w-5 h-5" /></>
             ) : (
               <>Continue <ChevronRight className="w-5 h-5" /></>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};
