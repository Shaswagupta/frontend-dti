import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Trophy, Users, Zap, Star, ChevronDown, Play, Shield, TrendingUp, Globe, CheckCircle, Award, Target } from 'lucide-react';

const STATS = [
  { value: '50K+', label: 'Athletes', color: 'text-primary' },
  { value: '2,400+', label: 'Events Hosted', color: 'text-secondary' },
  { value: '$2.4M', label: 'Total Prize Pool', color: 'text-tertiary' },
  { value: '120+', label: 'Countries', color: 'text-primary' },
];

const FEATURES = [
  { icon: Trophy, color: 'text-primary', bg: 'bg-primary/10 border-primary/20', title: 'Compete Globally', desc: 'Enter tournaments across 12+ sports. Climb worldwide leaderboards from local leagues to international championships.' },
  { icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20', title: 'Track Your Growth', desc: 'Real-time analytics with skill radar charts, match history, and AI-powered insights to sharpen your edge.' },
  { icon: Users, color: 'text-tertiary', bg: 'bg-tertiary/10 border-tertiary/20', title: 'Build Your Team', desc: 'Find teammates, form squads, and collaborate with athletes who match your skill level and goals.' },
  { icon: Shield, color: 'text-primary', bg: 'bg-primary/10 border-primary/20', title: 'Organizer Hub', desc: 'Create events, manage brackets, track submissions, and distribute certificates effortlessly.' },
  { icon: Zap, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20', title: 'Practice Arena', desc: 'Sharpen skills with daily challenges, quizzes, and timed exercises designed by elite coaches.' },
  { icon: Globe, color: 'text-tertiary', bg: 'bg-tertiary/10 border-tertiary/20', title: 'Career Launchpad', desc: 'Access gaming-industry jobs, internships, and sponsorships from top teams worldwide.' },
];

const TESTIMONIALS = [
  { name: 'Alex Sterling', role: 'Basketball • Level 42', quote: 'SkillSurfer took me from local league player to national finalist in 6 months. The analytics alone changed everything.', avatar: 'AS', rating: 5 },
  { name: 'Sarah Chen', role: 'E-Sports • Pro Division', quote: 'Found my entire team on Team Builder. We placed top 5 at the Global AI Hackathon. Absolutely insane platform.', avatar: 'SC', rating: 5 },
  { name: 'Marcus Vane', role: 'Event Organizer', quote: 'Running a 500-person tournament used to be chaos. The organizer hub made it seamless and professional.', avatar: 'MV', rating: 5 },
];

const SPORTS_TICKER = ['⚽ Soccer', '🏀 Basketball', '🎾 Tennis', '🏊 Aquatics', '⚡ E-Sports', '🏃 Sprint', '🎮 Gaming', '💻 Coding', '🏋️ Fitness', '🥊 Boxing'];

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Profile', desc: 'Sign up as a Student or Organizer and set up your athletic profile in under 2 minutes.', icon: Target },
  { step: '02', title: 'Join or Host Events', desc: 'Browse hundreds of live tournaments or launch your own with the powerful event wizard.', icon: Trophy },
  { step: '03', title: 'Compete & Grow', desc: 'Track your performance, climb leaderboards, earn badges, and unlock career opportunities.', icon: Award },
];

const FLOATING_CARDS = [
  { top: '20%', left: '-2%', content: '🏆 #1 Global Rank', sub: 'Street Basketball', color: 'border-primary/30 bg-primary/5' },
  { top: '55%', right: '-2%', content: '⚡ +250 XP Earned', sub: 'Today\'s Session', color: 'border-secondary/30 bg-secondary/5' },
  { top: '78%', left: '5%', content: '👥 Team Found!', sub: '4/5 Members Joined', color: 'border-tertiary/30 bg-tertiary/5' },
];

interface LandingPageProps { onGetStarted: () => void; }

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [activeSport, setActiveSport] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [tickerPaused, setTickerPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t1 = setInterval(() => setActiveSport(p => (p + 1) % SPORTS_TICKER.length), 1600);
    const t2 = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background overflow-x-hidden selection:bg-primary/30">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-16 h-16 bg-background/80 backdrop-blur-xl border-b border-outline-variant/15">
        <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-black font-headline uppercase italic tracking-tighter text-primary">
          SkillSurfer
        </motion.span>
        <nav className="hidden md:flex items-center gap-8 font-headline font-bold text-xs uppercase tracking-widest">
          {[['Features', '#features'], ['How It Works', '#how'], ['Community', '#testimonials']].map(([label, href]) => (
            <a key={label} href={href} className="text-on-surface-variant hover:text-primary transition-colors">{label}</a>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <button onClick={onGetStarted} className="hidden md:block text-on-surface-variant hover:text-primary text-xs font-bold font-headline uppercase tracking-widest transition-colors">Sign In</button>
          <button onClick={onGetStarted} className="px-5 py-2.5 kinetic-gradient text-background rounded-xl font-headline font-black uppercase tracking-wider text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(202,253,0,0.4)] transition-all active:scale-95">
            Get Started →
          </button>
        </motion.div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center text-center px-6 pt-16 overflow-hidden">
        {/* Layered glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] bg-primary/15 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-secondary/12 blur-[140px] rounded-full" />
          <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-tertiary/8 blur-[100px] rounded-full" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-outline) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Floating notification cards */}
        {FLOATING_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.2 }}
            style={{ top: card.top, left: card.left, right: card.right } as any}
            className={`absolute hidden lg:flex flex-col gap-0.5 px-4 py-3 rounded-2xl border backdrop-blur-md ${card.color} shadow-xl z-20`}
          >
            <span className="text-sm font-headline font-black text-on-surface whitespace-nowrap">{card.content}</span>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">{card.sub}</span>
          </motion.div>
        ))}

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-surface-container-low/80 border border-primary/25 text-primary px-5 py-2 rounded-full text-[11px] font-label font-bold uppercase tracking-widest mb-10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            The #1 Competitive Sports Platform  •  Join 50K+ Athletes
          </motion.div>

          {/* Main headline */}
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="font-headline font-black text-[clamp(56px,12vw,120px)] uppercase italic tracking-tighter leading-[0.86] mb-6"
          >
            <span className="text-on-surface">DOMINATE</span><br />
            <span className="relative inline-block">
              <span className="text-primary drop-shadow-[0_0_60px_rgba(202,253,0,0.7)]">YOUR SPORT</span>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/40 rounded-full origin-left"
              />
            </span>
          </motion.h1>

          {/* Sport ticker */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="h-12 flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.span key={activeSport}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.35 }}
                className="text-2xl md:text-3xl font-headline font-bold text-secondary tracking-tight"
              >
                {SPORTS_TICKER[activeSport]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Compete in global tournaments, track your performance with AI analytics, build elite teams, and unlock career opportunities — all in one platform.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={onGetStarted} className="group px-8 py-4 kinetic-gradient text-background rounded-2xl font-headline font-black uppercase italic tracking-wider text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_40px_rgba(202,253,0,0.4)] active:scale-95">
              Start Competing Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onGetStarted} className="group px-8 py-4 bg-surface-container-low/80 border border-outline-variant/30 rounded-2xl font-headline font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-3 hover:border-secondary/50 hover:bg-surface-container-high transition-all text-on-surface backdrop-blur-sm">
              <Play className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" /> Organizer Demo
            </button>
          </motion.div>

          {/* Trust row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap items-center justify-center gap-6 text-on-surface-variant text-xs font-label uppercase tracking-widest">
            {['Free to join', 'No credit card required', '50,000+ athletes'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-secondary" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="text-[10px] font-label uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* Scrolling ticker */}
      <div className="py-5 border-y border-outline-variant/15 overflow-hidden bg-surface-container-low/40">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap w-max"
        >
          {[...SPORTS_TICKER, ...SPORTS_TICKER].map((s, i) => (
            <span key={i} className="text-sm font-headline font-bold text-on-surface-variant uppercase tracking-widest">
              {s} <span className="text-primary mx-4">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <section id="stats" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-surface-container-low border border-outline-variant/15 rounded-2xl p-8 text-center hover:border-primary/30 transition-all group"
            >
              <p className={`font-headline font-black text-4xl md:text-5xl italic ${s.color} group-hover:drop-shadow-[0_0_20px_currentColor] transition-all`}>{s.value}</p>
              <p className="text-on-surface-variant font-label uppercase tracking-widest text-xs mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 bg-surface-container-low/40 border-y border-outline-variant/15">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-secondary font-label text-xs uppercase tracking-[0.2em] font-bold">Simple Process</span>
            <h2 className="font-headline font-black text-4xl md:text-6xl uppercase italic tracking-tighter mt-3 text-on-surface">
              How It <span className="text-secondary">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-tertiary/30" />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center relative">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col items-center justify-center mb-6 relative z-10">
                  <step.icon className="w-8 h-8 text-primary mb-1" />
                  <span className="text-[10px] font-black font-label text-outline uppercase tracking-widest">{step.step}</span>
                </div>
                <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-on-surface mb-3">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-label text-xs uppercase tracking-[0.2em] font-bold">Everything You Need</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl uppercase italic tracking-tighter mt-3">
            Built for <span className="text-primary drop-shadow-[0_0_30px_rgba(202,253,0,0.5)]">Winners</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`border rounded-2xl p-7 transition-all cursor-default group ${f.bg}`}
            >
              <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="font-headline font-bold text-xl uppercase tracking-tight text-on-surface mb-3">{f.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-surface-container-low/40 border-y border-outline-variant/15">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-tertiary font-label text-xs uppercase tracking-[0.2em] font-bold">Community</span>
            <h2 className="font-headline font-black text-4xl md:text-6xl uppercase italic tracking-tighter mt-3 text-on-surface">
              Athlete <span className="text-tertiary">Stories</span>
            </h2>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 kinetic-gradient" />
              <div className="w-16 h-16 rounded-2xl bg-surface-container-highest font-headline font-black text-2xl text-secondary flex items-center justify-center mx-auto mb-6 border border-outline-variant/20">
                {TESTIMONIALS[activeTestimonial].avatar}
              </div>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-on-surface text-lg md:text-xl leading-relaxed mb-8 font-body italic max-w-2xl mx-auto">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </blockquote>
              <p className="font-headline font-bold text-on-surface">{TESTIMONIALS[activeTestimonial].name}</p>
              <p className="text-on-surface-variant text-xs font-label uppercase tracking-widest mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`transition-all rounded-full ${i === activeTestimonial ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-outline/30 hover:bg-outline'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-36 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-3xl mx-auto">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-8 inline-block">🏆</motion.div>
          <span className="block text-primary font-label text-xs uppercase tracking-[0.2em] font-bold mb-4">Join 50,000+ Champions</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl uppercase italic tracking-tighter mb-6 text-on-surface">
            Ready to <span className="text-primary drop-shadow-[0_0_40px_rgba(202,253,0,0.6)]">Surge?</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">
            Create your free account in seconds. Start competing, growing, and winning today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onGetStarted} className="group px-10 py-5 kinetic-gradient text-background rounded-2xl font-headline font-black uppercase italic tracking-wider text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_60px_rgba(202,253,0,0.45)] active:scale-95">
              Enter the Arena <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={onGetStarted} className="px-10 py-5 bg-surface-container-low border border-outline-variant/20 rounded-2xl font-headline font-bold uppercase tracking-wider text-sm text-on-surface hover:border-secondary/40 transition-all">
              I'm an Organizer →
            </button>
          </div>
          <p className="text-on-surface-variant text-xs mt-6 font-label">Free forever • No credit card • Cancel anytime</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-16 border-t border-outline-variant/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-primary font-headline font-black text-2xl italic uppercase">SkillSurfer</span>
            <p className="text-on-surface-variant text-xs font-label mt-1 uppercase tracking-widest">The Competitive Sports Platform</p>
          </div>
          <div className="flex gap-8 text-on-surface-variant text-xs font-label uppercase tracking-widest">
            {['Privacy', 'Terms', 'Contact', 'Blog'].map(l => (
              <a key={l} href="#" className="hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-on-surface-variant text-xs font-label">© 2025 SkillSurfer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
