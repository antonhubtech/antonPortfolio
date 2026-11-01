import { useId } from 'react';
import type { Project } from '../data/content';

/** Generative, image-free project thumbnails — light, sharp at any size, and unique per project. */
export default function ProjectThumb({ hue, motif, className = '' }: Pick<Project, 'hue' | 'motif'> & { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const c1 = `hsl(${hue[0]} 92% 62%)`;
  const c2 = `hsl(${hue[1]} 88% 64%)`;

  const art = (() => {
    switch (motif) {
      case 'rings':
        return [0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx="250" cy="130" r={22 + i * 24} fill="none" stroke={`url(#g${uid})`} strokeOpacity={0.9 - i * 0.15} strokeWidth="1.6" />
        ));
      case 'bars':
        return [38, 72, 54, 96, 66, 118, 84, 130].map((h, i) => (
          <rect key={i} x={70 + i * 36} y={210 - h} width="18" height={h} rx="9" fill={`url(#g${uid})`} opacity={0.35 + i * 0.08} />
        ));
      case 'grid':
        return Array.from({ length: 12 }, (_, i) => {
          const col = i % 4, row = Math.floor(i / 4);
          const on = [0, 5, 6, 11].includes(i);
          return <rect key={i} x={80 + col * 68} y={48 + row * 54} width="56" height="42" rx="12" fill={on ? `url(#g${uid})` : 'none'} stroke={`url(#g${uid})`} strokeOpacity={on ? 0 : 0.5} />;
        });
      case 'wave':
        return [0, 1, 2, 3].map((i) => (
          <path key={i} d={`M0 ${130 + i * 14} C 70 ${70 + i * 10}, 130 ${190 - i * 8}, 200 ${130 + i * 12} S 330 ${80 + i * 10}, 400 ${140 + i * 8}`} fill="none" stroke={`url(#g${uid})`} strokeOpacity={0.9 - i * 0.18} strokeWidth="2" />
        ));
      case 'dots':
        return Array.from({ length: 70 }, (_, i) => {
          const col = i % 10, row = Math.floor(i / 10);
          const d = Math.hypot(col - 6.5, row - 2.5);
          return <circle key={i} cx={52 + col * 34} cy={40 + row * 28} r={Math.max(1.2, 6.5 - d * 0.9)} fill={`url(#g${uid})`} opacity={0.9 - d * 0.08} />;
        });
      case 'nodes': {
        const pts: [number, number][] = [[80, 150], [150, 70], [215, 140], [290, 60], [330, 160], [200, 215]];
        const links = [[0, 1], [1, 2], [2, 3], [2, 4], [2, 5], [0, 5]];
        return (
          <>
            {links.map(([a, b], i) => (
              <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={`url(#g${uid})`} strokeOpacity="0.6" />
            ))}
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 2 ? 11 : 6} fill={`url(#g${uid})`} />
            ))}
          </>
        );
      }
    }
  })();

  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`b${uid}`} cx="70%" cy="30%" r="80%">
          <stop offset="0" stopColor={c1} stopOpacity="0.28" />
          <stop offset="1" stopColor="#070a13" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#0a1020" />
      <rect width="400" height="260" fill={`url(#b${uid})`} />
      {art}
    </svg>
  );
}
