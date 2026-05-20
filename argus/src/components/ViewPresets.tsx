'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { t, type Lang } from '@/lib/i18n';

interface ViewPresetsProps {
  onNavigate: (lat: number, lng: number, zoom: number) => void;
  lang?: Lang;
}

const PRESETS = [
  { labelKey: 'global' as const, lat: 20, lng: 0, zoom: 2.5, icon: '🌍' },
  { labelKey: 'europe' as const, lat: 48, lng: 10, zoom: 4, icon: '🇪🇺' },
  { labelKey: 'middle_east' as const, lat: 30, lng: 45, zoom: 4.5, icon: '🔥', hot: true },
  { labelKey: 'east_asia' as const, lat: 35, lng: 120, zoom: 4, icon: '🌏' },
  { labelKey: 'americas' as const, lat: 25, lng: -90, zoom: 3, icon: '🌎' },
  { labelKey: 'ukraine' as const, lat: 49, lng: 32, zoom: 6, icon: '⚔️', hot: true },
  { labelKey: 'africa' as const, lat: 5, lng: 20, zoom: 3.5, icon: '🌍' },
  { labelKey: 'se_asia' as const, lat: 10, lng: 110, zoom: 4.5, icon: '🌏' },
  { labelKey: 'arctic' as const, lat: 75, lng: 0, zoom: 3.5, icon: '❄️' },
  { labelKey: 'india' as const, lat: 22, lng: 78, zoom: 4.5, icon: '🇮🇳' },
  { labelKey: 'australia' as const, lat: -25, lng: 134, zoom: 4, icon: '🇦🇺' },
  { labelKey: 'sudan' as const, lat: 15, lng: 30, zoom: 5.5, icon: '⚠️', hot: true },
];

export default function ViewPresets({ onNavigate, lang = 'en' }: ViewPresetsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="glass-panel p-2.5 pointer-events-auto"
    >
      <div className="flex items-center gap-2 mb-2">
        <Globe className="w-4 h-4 text-[var(--gold-primary)]" />
        <span className="hud-text text-[12px] text-[var(--text-primary)] tracking-widest">
          {lang === 'ru' ? 'РЕГИОНЫ' : 'REGION PRESETS'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {PRESETS.map(p => (
          <button
            key={p.labelKey}
            onClick={() => onNavigate(p.lat, p.lng, p.zoom)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] font-mono tracking-wider border border-transparent hover:border-[var(--border-primary)] hover:text-[var(--gold-primary)] transition-all hover:scale-[1.02] active:scale-[0.98] ${(p as any).hot ? 'text-[var(--alert-red)] hover:border-[var(--alert-red)]/30 hover:bg-[var(--alert-red)]/5' : 'text-[var(--text-muted)] hover:bg-[var(--hover-accent)]'}`}
          >
            <span className="text-[11px] flex-shrink-0">{p.icon}</span>
            <span>{t(p.labelKey, lang)}</span>
            {(p as any).hot && <span className="w-1.5 h-1.5 rounded-full bg-[var(--alert-red)] animate-argus-pulse ml-auto flex-shrink-0" />}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
