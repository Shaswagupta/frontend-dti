import React from 'react';

// Each logo is an inline SVG — crisp at any size, no network request, theme-aware
// Logos are rendered as recognizable wordmarks/symbols of real sports/tech brands

const logos = [
  {
    name: 'Nike',
    svg: (
      <svg viewBox="0 0 80 30" fill="currentColor" className="h-6 w-auto">
        <path d="M6.1 22.7L24.5 7.3c2.1-1.8 4.7-2.8 7.3-2.8c2 0 3.6.8 4.2 2.2c.8 2-1 4.8-5.5 7.7L4.8 24.2C5 23.7 5.5 23.1 6.1 22.7z"/>
        <text x="38" y="22" fontSize="16" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="-0.5">NIKE</text>
      </svg>
    ),
  },
  {
    name: 'Adidas',
    svg: (
      <svg viewBox="0 0 90 30" fill="currentColor" className="h-6 w-auto">
        <path d="M5 24L16 8h4L9 24H5zM13 24L24 8h4L17 24h-4zM21 24L32 8h4L25 24h-4z"/>
        <text x="40" y="22" fontSize="14" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="2">ADIDAS</text>
      </svg>
    ),
  },
  {
    name: 'ESPN',
    svg: (
      <svg viewBox="0 0 70 30" fill="currentColor" className="h-6 w-auto">
        <text x="4" y="23" fontSize="22" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="-1">ESPN</text>
      </svg>
    ),
  },
  {
    name: 'Red Bull',
    svg: (
      <svg viewBox="0 0 90 30" fill="currentColor" className="h-6 w-auto">
        <circle cx="12" cy="15" r="5" opacity="0.8"/>
        <circle cx="22" cy="10" r="5" opacity="0.8"/>
        <text x="32" y="22" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="0.5">RED BULL</text>
      </svg>
    ),
  },
  {
    name: 'EA Sports',
    svg: (
      <svg viewBox="0 0 90 30" fill="currentColor" className="h-6 w-auto">
        <rect x="3" y="5" width="20" height="20" rx="3" opacity="0.15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <text x="5" y="20" fontSize="11" fontWeight="900" fontFamily="Arial,sans-serif">EA</text>
        <text x="28" y="22" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="1">SPORTS</text>
      </svg>
    ),
  },
  {
    name: 'Puma',
    svg: (
      <svg viewBox="0 0 70 30" fill="currentColor" className="h-6 w-auto">
        <path d="M8 24 C8 24 12 8 20 8 C24 8 24 14 20 18 C16 22 10 22 8 24Z" opacity="0.9"/>
        <text x="28" y="22" fontSize="15" fontWeight="900" fontFamily="Arial,sans-serif" letterSpacing="1">PUMA</text>
      </svg>
    ),
  },
  {
    name: 'Twitch',
    svg: (
      <svg viewBox="0 0 80 30" fill="currentColor" className="h-6 w-auto">
        <path d="M6 5h3v10H6V5zm7 0h3v7h-3V5z" opacity="0.9"/>
        <rect x="4" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <text x="22" y="22" fontSize="14" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="0.5">TWITCH</text>
      </svg>
    ),
  },
  {
    name: 'Gatorade',
    svg: (
      <svg viewBox="0 0 95 30" fill="currentColor" className="h-6 w-auto">
        <path d="M8 8 L14 22 L8 22 L5 15Z" opacity="0.9"/>
        <text x="18" y="22" fontSize="13" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="0.5">GATORADE</text>
      </svg>
    ),
  },
];

interface CompanyLogosProps {
  className?: string;
}

export const CompanyLogos: React.FC<CompanyLogosProps> = ({ className = '' }) => {
  // Duplicate for seamless infinite scroll
  const doubled = [...logos, ...logos];

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className="flex animate-[scroll_30s_linear_infinite] gap-16 items-center w-max"
        style={{ animation: 'logo-scroll 30s linear infinite' }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="text-on-surface-variant/40 hover:text-on-surface/80 transition-colors duration-300 flex-shrink-0 flex items-center"
            title={logo.name}
          >
            {logo.svg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogos;
