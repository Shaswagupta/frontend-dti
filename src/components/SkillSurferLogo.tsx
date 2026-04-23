import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// ── Wave path helper ──────────────────────────────────────────────────────
// Generates a sine-wave SVG path across given width
function buildWavePath(width: number, amplitude: number, freq: number, phase: number) {
  const points: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = amplitude + Math.sin((i / steps) * Math.PI * 2 * freq + phase) * amplitude;
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(' ');
}

// ── Logomark (the "S" surfboard icon) ─────────────────────────────────────
export const SkillSurferMark = ({ size = 40, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={className}
    aria-label="SkillSurfer mark"
  >
    {/* Outer glow circle */}
    <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

    {/* Wave body */}
    <motion.path
      d="M6 22 C10 14, 16 28, 20 20 C24 12, 30 26, 34 18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    />

    {/* Surfboard riding on wave */}
    <motion.ellipse
      cx="20" cy="13"
      rx="5" ry="2"
      fill="currentColor"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.9, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    />

    {/* Rider dot */}
    <motion.circle
      cx="20" cy="10"
      r="2.2"
      fill="currentColor"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    />

    {/* Fin */}
    <motion.path
      d="M22 15 L24 19 L20 17Z"
      fill="currentColor"
      fillOpacity="0.6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
    />
  </svg>
);

// ── Animated wave underline SVG ────────────────────────────────────────────
const AnimatedWave = ({ width = 300, color = 'var(--color-primary)' }: { width?: number; color?: string }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const phase = ((ts - startRef.current) / 800) * Math.PI;
      if (pathRef.current) {
        pathRef.current.setAttribute('d', buildWavePath(width, 3, 1.5, phase));
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [width]);

  return (
    <svg
      width={width}
      height={8}
      viewBox={`0 0 ${width} 8`}
      fill="none"
      style={{ overflow: 'visible', display: 'block' }}
      aria-hidden
    >
      {/* Glow copy */}
      <path
        ref={undefined}
        d={buildWavePath(width, 3, 1.5, 0)}
        stroke={color}
        strokeWidth="3"
        strokeOpacity="0.25"
        strokeLinecap="round"
        filter="blur(3px)"
      />
      <path
        ref={pathRef}
        d={buildWavePath(width, 3, 1.5, 0)}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

// ── Full Wordmark ─────────────────────────────────────────────────────────
interface SkillSurferWordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWave?: boolean;
  showMark?: boolean;
  className?: string;
  animate?: boolean;
}

const SIZE_MAP = {
  sm:  { text: 'text-xl',   gap: 'gap-2',  markSize: 22 },
  md:  { text: 'text-2xl',  gap: 'gap-3',  markSize: 28 },
  lg:  { text: 'text-4xl',  gap: 'gap-4',  markSize: 40 },
  xl:  { text: 'text-6xl',  gap: 'gap-5',  markSize: 56 },
};

export const SkillSurferWordmark = ({
  size = 'md',
  showWave = true,
  showMark = true,
  className = '',
  animate = true,
}: SkillSurferWordmarkProps) => {
  const s = SIZE_MAP[size];
  const waveWidth = size === 'xl' ? 360 : size === 'lg' ? 220 : size === 'md' ? 160 : 100;

  const skillLetters = 'SKILL'.split('');
  const surferLetters = 'SURFER'.split('');

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className={`flex items-center ${s.gap}`}>
        {showMark && (
          <motion.div
            initial={animate ? { opacity: 0, rotate: -20, scale: 0.6 } : {}}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-primary"
          >
            <SkillSurferMark size={s.markSize} />
          </motion.div>
        )}

        <div className="flex flex-col leading-none">
          {/* SKILL — white/neutral */}
          <div className="flex">
            {skillLetters.map((l, i) => (
              <motion.span
                key={i}
                initial={animate ? { opacity: 0, y: -12 } : {}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                className={`${s.text} font-headline font-black italic tracking-tighter text-on-surface`}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* SURFER — primary neon */}
          <div className="relative flex">
            {surferLetters.map((l, i) => (
              <motion.span
                key={i}
                initial={animate ? { opacity: 0, y: 12 } : {}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                className={`${s.text} font-headline font-black italic tracking-tighter text-primary`}
                style={{ textShadow: '0 0 30px rgba(202,253,0,0.5)' }}
              >
                {l}
              </motion.span>
            ))}

            {/* Animated wave underline */}
            {showWave && (
              <motion.div
                initial={animate ? { opacity: 0, scaleX: 0 } : {}}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className="absolute -bottom-2 left-0"
              >
                <AnimatedWave width={waveWidth} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Compact Navbar Logo (single line) ─────────────────────────────────────
export const NavLogo = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 group focus:outline-none"
    aria-label="SkillSurfer home"
  >
    <motion.div
      className="text-primary"
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <SkillSurferMark size={26} />
    </motion.div>
    <span className="font-headline font-black text-xl italic tracking-tighter leading-none">
      <span className="text-on-surface">Skill</span>
      <span className="text-primary" style={{ textShadow: '0 0 18px rgba(202,253,0,0.5)' }}>Surfer</span>
    </span>
  </button>
);

// ── Hero Display (giant, centered) ────────────────────────────────────────
export const HeroLogo = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="text-primary"
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <SkillSurferMark size={72} />
      </motion.div>

      <div className="relative text-center">
        {/* SKILL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-[clamp(56px,12vw,120px)] font-headline font-black italic tracking-tighter leading-none text-on-surface"
        >
          SKILL
        </motion.div>

        {/* SURFER */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-[clamp(56px,12vw,120px)] font-headline font-black italic tracking-tighter leading-none text-primary"
          style={{ textShadow: '0 0 80px rgba(202,253,0,0.45)' }}
        >
          SURFER
        </motion.div>

        {/* Wave underline */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          style={{ originX: 0.5 }}
          className="flex justify-center mt-1"
        >
          <AnimatedWave width={420} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-4 text-xs font-label uppercase tracking-[0.3em] text-on-surface-variant"
        >
          Ride the wave of competition
        </motion.p>
      </div>
    </div>
  );
};
